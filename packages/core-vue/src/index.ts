// import { parse, serialize, DefaultTreeAdapterMap } from 'parse5';
// import { traverse } from './traverse';
// type Element = DefaultTreeAdapterMap['element'];

import { AttributeNode, NodeTypes } from '@vue/compiler-dom';
import { parseSfc } from './parse';
import { traverse } from './traverse';
import { generate } from './generate';
import { isElementNode } from './utils';

const ATTR_ID = 'data-source';

interface Options {
  filepath: string;
  startRow?: number;
}

/**
 * inject Trace Id in jsx code
 */
export function injectTraceIdVue(vue: string, options: Options) {
  const filepath = options.filepath;

  const ast = parseSfc(vue);
  traverse(ast, {
    pre: (node) => {
      if (isElementNode(node)) {
        node.props.push({
          type: NodeTypes.ATTRIBUTE,
          name: ATTR_ID,
          value: {
            type: NodeTypes.TEXT,
            content: `${filepath}:${node.loc.start.line}:${node.loc.start.column}`,
          },
        } as AttributeNode);
      }

      return true;
    },
  });

  const code = generate(ast);
  return { code };

  // const ast = parse(vue, {
  //   sourceCodeLocationInfo: true,
  // });
  // const root = (ast.childNodes[0] as Element).childNodes[0] as Element;
  // const template = root.childNodes.find(
  //   (node) => node.nodeName === 'template'
  // ) as Element;
  // traverse(template, {
  //   pre: (node) => {
  //     const loc = node.sourceCodeLocation;
  //     if (loc) {
  //       node.attrs.push({
  //         name: ATTR_ID,
  //         value: `${filepath}:${loc.startLine}:${loc.startCol}`,
  //       });
  //     }
  //     return true;
  //   },
  // });
  // return { code: serialize(root) };
}
