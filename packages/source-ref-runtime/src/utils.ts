const sourceMap: Record<string, string> = {};
const sourceMapReverse: Record<string, string> = {};
let cursor = 0;

/**
 * Transform full source ref to sr
 */
export function compressToSr(node: Element) {
  if (!(node instanceof HTMLElement)) {
    return;
  }

  if (!node.dataset.source) {
    return;
  }

  const source = node.dataset.source;

  if (!sourceMap[source]) {
    cursor++;
    const hash = cursor.toString(36);
    sourceMap[source] = hash;
    sourceMapReverse[hash] = source;
  }
  const id = sourceMap[source];
  node.removeAttribute('data-source');
  node.setAttribute('data-sr', `${id}`);
}

/**
 * Transform sr to file URI
 */
export function srToURI(sr: string) {
  const source = sourceMapReverse[sr];

  if (!source) {
    return '(unknown)';
  }

  if (source.includes('://')) {
    return source;
  }

  // Default use vscode schema
  return 'vscode://file/' + sourceMapReverse[sr];
}
