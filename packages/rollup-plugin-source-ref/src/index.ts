import type { Plugin } from 'rollup';
import { injectTraceIdJSX } from 'source-ref-core';

export default function sourceRef(): Plugin {
  return {
    name: 'source-ref',
    transform(code, id) {
      const filepath = id;

      return injectTraceIdJSX(code, {
        filepath,
      });
    },
  };
}
