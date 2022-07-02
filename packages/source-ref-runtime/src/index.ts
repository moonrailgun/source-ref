import { Inspector } from './Inspector';
import { compressToSr } from './utils';

let timer = null;

/**
 * Start bind dom
 */
export function start() {
  document.body.addEventListener(
    'click',
    (e) => {
      if (e.altKey) {
        e.preventDefault();
        e.stopPropagation();

        const inspector = new Inspector(e.target);
        inspector.renderHTML();
      }
    },
    true
  );

  const observer = new MutationObserver(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      document
        .querySelectorAll('[data-source]')
        .forEach((node) => compressToSr(node));
    }, 500);
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
