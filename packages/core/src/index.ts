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

const TRACE_ID = 'data-source';

interface Options {
  filepath: string;
  startRow?: number;
}

/**
 * inject Trace Id in jsx code
 */
export function injectTraceIdJSX(jsx: string, options: Options) {
  const { startRow = 0, filepath } = options;

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
      if (isJSXIdentifier(name) && name.name === 'template') {
        return;
      }
      if (isJSXIdentifier(name) && name.name === 'Fragment') {
        return;
      }
      if (isJSXMemberExpression(name) && name.property.name === 'Fragment') {
        return;
      }

      const line = location.start.line + startRow;
      const col = location.start.column;

      const attrs = path.node.attributes;
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.type === 'JSXAttribute' && attr.name.name === TRACE_ID) {
          // existed
          return;
        }
      }

      const traceId = `${filepath}:${line}:${col}`;

      attrs.push(jsxAttribute(jsxIdentifier(TRACE_ID), stringLiteral(traceId)));
    },
  });

  const res = generate(ast);

  return { code: res.code, map: res.map };
}
