import type { LoaderContext } from 'webpack';
import { injectTraceIdVue, InjectTraceIdVueOptions } from 'source-ref-core-vue';

interface Options {
  available?: boolean;
  opener?: InjectTraceIdVueOptions['opener'];
}

async function loader(
  this: LoaderContext<Options>,
  source: string
): Promise<void> {
  const done = this.async();

  const { available = true, opener = { type: 'vscode' } } =
    this.getOptions?.() ?? {}; // webpack4 has no `this.getOptions`, shim it
  if (!available) {
    // skip if not
    done(null, source);
    return;
  }

  const filepath = this.resourcePath;
  if (filepath.includes('node_modules')) {
    done(null, source);
    return;
  }

  const code = injectTraceIdVue(source, { filepath, opener }).code;

  done(null, code);
}

export default loader;
