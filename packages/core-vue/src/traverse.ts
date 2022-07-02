/**
 * Fork from https://github.com/olov/ast-traverse.
 */

import { DefaultTreeAdapterMap, defaultTreeAdapter } from 'parse5';
type Element = DefaultTreeAdapterMap['element'];
type Template = DefaultTreeAdapterMap['template'];

interface Options {
  pre?: (node: Element, parent: Element) => boolean;
  post?: (node: Element, parent: Element) => void;
  skipProperty?: (node: Element) => boolean;
}
export function traverse(root: Element, options: Options = {}) {
  const { pre, post, skipProperty } = options;

  const visit = (node: Element, parent: Element) => {
    let res: boolean;

    if (!node) {
      return;
    }

    if (pre) {
      res = pre(node, parent);
    }

    let { childNodes } = node;

    if (node.tagName === 'template') {
      ({ childNodes } = (node as Template).content);
    }

    if (res !== false && Array.isArray(childNodes) && childNodes.length >= 0) {
      childNodes.forEach((child) => {
        if (skipProperty && skipProperty(node)) {
          return;
        }

        if (defaultTreeAdapter.isElementNode(child)) {
          visit(child, node);
        }
      });
    }

    if (post) {
      post(node, parent);
    }
  };

  visit(root, null);
}
