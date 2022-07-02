import { parse } from '@vue/compiler-dom';

export function parseSfc(vue: string) {
  const rootNode = parse(vue);

  return rootNode;
}
