import {
  ElementNode,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-dom';
import { isElementNode } from './utils';

export function generate(ast: RootNode) {
  return ast.children
    .map((node) => {
      if (isElementNode(node)) {
        if (node.tag === 'template') {
          return generateTemplate(node);
        }
      }

      return node.loc.source;
    })
    .join('\n\n');
}

function generateTemplate(node: ElementNode): string {
  return `<template>${node.children
    .map((node) => generateNode(node))
    .join('')}</template>`;
}

function generateNode(node: TemplateChildNode): string {
  if (isElementNode(node)) {
    return generateElement(node);
  }

  return node.loc.source;
}

function generateElement(node: ElementNode): string {
  if (node.isSelfClosing) {
    return `<${node.tag} ${generateAttrs(node)} />`;
  }

  const children = node.children.map((child) => generateNode(child)).join('');
  return `<${node.tag} ${generateAttrs(node)}>${children}</${node.tag}>`;
}

function generateAttrs(node: ElementNode): string {
  const props = node.props;

  return props
    .map((prop) => {
      if (prop.type === NodeTypes.ATTRIBUTE) {
        if (prop.value) {
          return `${prop.name}="${prop.value.content}"`;
        } else {
          return prop.name;
        }
      }

      return prop.loc.source;
    })
    .join(' ');
}
