import type { LoaderContext } from 'webpack';
import { injectTraceIdJSX, InjectTraceIdJSXOptions } from 'source-ref-core';

interface Options {
  available?: boolean;
  opener?: InjectTraceIdJSXOptions['opener'];
}

async function loader(
  this: LoaderContext<Options>,
  source: string
): Promise<void> {
  const done = this.async();

  const { available = true, opener = { type: 'vscode' } } = this.getOptions();
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

  const code = injectTraceIdJSX(source, { filepath, opener }).code;

  done(null, code);
}

export default loader;
