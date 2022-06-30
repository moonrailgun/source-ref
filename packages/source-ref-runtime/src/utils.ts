const sourceMap = {};
const sourceMapReverse = {};
let cursor = 0;

/**
 * Transform full source ref to sid
 */
export function sourceToId(node: Element) {
  if (!(node instanceof HTMLElement)) {
    return;
  }

  if (!node.dataset.source) {
    return;
  }

  const source = node.dataset.source;

  if (!sourceMap[source]) {
    cursor++;
    sourceMap[source] = cursor;
    sourceMapReverse[cursor] = source;
  }
  const id = sourceMap[source];
  node.removeAttribute('data-source');
  node.setAttribute('data-sid', `${id}`);
}

/**
 * Transform sid to file URI
 */
export function sidToURI(sid: string) {
  const path = 'vscode://file/' + sourceMapReverse[sid];
  return path;
}
