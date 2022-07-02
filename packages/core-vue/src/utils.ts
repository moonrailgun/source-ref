import { ElementNode, NodeTypes, Node, RootNode } from '@vue/compiler-dom';

export function isElementNode(node: Node): node is ElementNode {
  return node.type === NodeTypes.ELEMENT;
}

export function isRootNode(node: Node): node is RootNode {
  return node.type === NodeTypes.ROOT;
}
