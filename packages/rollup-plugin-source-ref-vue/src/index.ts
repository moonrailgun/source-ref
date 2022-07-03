import type { Plugin } from 'rollup';
import { injectTraceIdVue, InjectTraceIdVueOptions } from 'source-ref-core-vue';

interface Options {
  opener?: InjectTraceIdVueOptions['opener'];
}

export default function sourceRef(options?: Options): Plugin {
  return {
    name: 'source-ref-vue',
    transform(code, id) {
      const filepath = id;

      if (filepath.endsWith('.vue')) {
        const output = injectTraceIdVue(code, {
          filepath,
          opener: options?.opener ?? { type: 'vscode' },
        });
        return output;
      }

      return code;
    },
  };
}
