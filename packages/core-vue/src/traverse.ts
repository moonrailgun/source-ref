/**
 * Fork from https://github.com/olov/ast-traverse.
 */

import { Node } from '@vue/compiler-dom';
import { isElementNode, isRootNode } from './utils';

interface Options {
  pre?: (node: Node, parent: Node) => boolean;
  post?: (node: Node, parent: Node) => void;
  skipProperty?: (node: Node) => boolean;
}
export function traverse(root: Node, options: Options = {}) {
  const { pre, post, skipProperty } = options;

  const visit = (node: Node, parent: Node) => {
    let res: boolean;

    if (!node) {
      return;
    }

    if (pre) {
      res = pre(node, parent);
    }

    if (isElementNode(node) || isRootNode(node)) {
      let { children } = node;

      if (res !== false && Array.isArray(children) && children.length >= 0) {
        children.forEach((child) => {
          if (skipProperty && skipProperty(node)) {
            return;
          }

          if (isElementNode(child)) {
            visit(child, node);
          }
        });
      }

      if (post) {
        post(node, parent);
      }
    }
  };

  visit(root, null);
}
