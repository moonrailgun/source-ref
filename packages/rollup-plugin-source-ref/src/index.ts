import type { Plugin } from 'rollup';
import { injectTraceIdJSX, InjectTraceIdJSXOptions } from 'source-ref-core';

interface Options {
  opener?: InjectTraceIdJSXOptions['opener'];
}

export default function sourceRef(options?: Options): Plugin {
  return {
    name: 'source-ref',
    transform(code, id) {
      const filepath = id;

      return injectTraceIdJSX(code, {
        filepath,
        opener: options?.opener ?? { type: 'vscode' },
      });
    },
  };
}
