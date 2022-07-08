import { AttributeNode, NodeTypes } from '@vue/compiler-dom';
import { parseSfc } from './parse';
import { traverse } from './traverse';
import { generate } from './generate';
import { isElementNode } from './utils';
import pathUtils from 'path';

const ATTR_ID = 'data-source';

export interface InjectTraceIdVueOptions {
  filepath: string;
  opener:
    | {
        type: 'vscode';
      }
    | {
        type: 'github';
        url: string;
        branch?: string;
        cwd?: string;
      }
    | {
        type: 'jetbrains';
        port?: number;
      };
}

/**
 * inject Trace Id in jsx code
 */
export function injectTraceIdVue(
  vue: string,
  options: InjectTraceIdVueOptions
) {
  const { filepath, opener } = options;

  const ast = parseSfc(vue);
  traverse(ast, {
    pre: (node) => {
      if (isElementNode(node)) {
        const line = node.loc.start.line;
        const column = node.loc.start.column;
        let uri = `${filepath}:${line}:${column}`;

        if (opener.type === 'github') {
          const relativeFilepath = pathUtils.relative(
            opener.cwd ?? process.cwd(),
            filepath
          );
          uri = `${opener.url}/blob/${
            opener.branch ?? 'main'
          }/${relativeFilepath}#L${line}`;
        } else if (opener.type === 'jetbrains') {
          uri = `http://localhost:${opener.port ?? 63342}/api/file/${uri}`;
        }

        node.props.push({
          type: NodeTypes.ATTRIBUTE,
          name: ATTR_ID,
          value: {
            type: NodeTypes.TEXT,
            content: uri,
          },
        } as AttributeNode);
      }

      return true;
    },
  });

  const code = generate(ast);
  return { code };
}
