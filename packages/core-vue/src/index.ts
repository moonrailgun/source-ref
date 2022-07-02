import { parse, serialize, DefaultTreeAdapterMap } from 'parse5';
import { traverse } from './traverse';
type Element = DefaultTreeAdapterMap['element'];

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
  const ast = parse(vue, {
    sourceCodeLocationInfo: true,
  });
  const root = (ast.childNodes[0] as Element).childNodes[0] as Element;
  const template = root.childNodes.find(
    (node) => node.nodeName === 'template'
  ) as Element;

  traverse(template, {
    pre: (node) => {
      const loc = node.sourceCodeLocation;

      if (loc) {
        node.attrs.push({
          name: ATTR_ID,
          value: `${filepath}:${loc.startLine}:${loc.startCol}`,
        });
      }

      return true;
    },
  });

  return { code: serialize(root) };
}
