import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import {
  isJSXIdentifier,
  isJSXMemberExpression,
  jsxAttribute,
  jsxIdentifier,
  stringLiteral,
} from '@babel/types';
import pathUtils from 'path';

const ATTR_ID = 'data-source';

export interface InjectTraceIdJSXOptions {
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
      };
}

/**
 * inject Trace Id in jsx code
 */
export function injectTraceIdJSX(
  jsx: string,
  options: InjectTraceIdJSXOptions
) {
  const { filepath, opener } = options;

  const ast = parse(jsx, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      const location = path.node.loc;
      if (!location) {
        return;
      }

      if (Array.isArray(location)) {
        return;
      }

      const name = path.node.name;
      if (isJSXIdentifier(name) && name.name === 'Fragment') {
        return;
      }
      if (isJSXMemberExpression(name) && name.property.name === 'Fragment') {
        return;
      }

      const line = location.start.line;
      const col = location.start.column;

      const attrs = path.node.attributes;

      if (
        attrs.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === ATTR_ID
        )
      ) {
        return;
      }

      let uri = `${filepath}:${line}:${col}`;
      if (opener.type === 'github') {
        const relativeFilepath = pathUtils.relative(
          opener.cwd ?? process.cwd(),
          filepath
        );
        uri = `${opener.url}/blob/${
          opener.branch ?? 'main'
        }/${relativeFilepath}#L${line}`;
      }

      attrs.push(jsxAttribute(jsxIdentifier(ATTR_ID), stringLiteral(uri)));
    },
  });

  const res = generate(ast);

  return { code: res.code, map: res.map };
}
