import type { LoaderContext } from 'webpack';
import { injectTraceIdJSX } from 'source-ref-core';

async function loader(this: LoaderContext<any>, source: string): Promise<void> {
  const done = this.async();

  const { available } = this.getOptions();
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

  const code = injectTraceIdJSX(source, { filepath }).code;

  done(null, code);
}

export default loader;
