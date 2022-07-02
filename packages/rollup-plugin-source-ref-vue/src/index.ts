import type { Plugin } from 'rollup';
import { injectTraceIdVue } from 'source-ref-core-vue';

export default function sourceRef(): Plugin {
  return {
    name: 'source-ref-vue',
    transform(code, id) {
      const filepath = id;

      if (filepath.endsWith('.vue')) {
        const output = injectTraceIdVue(code, {
          filepath,
        });
        return output;
      }

      return code;
    },
  };
}
