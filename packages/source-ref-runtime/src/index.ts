import { Selector } from './Selector';
import { sourceToId } from './utils';

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
        const selector = new Selector(e.target);
        selector.renderHTML();
      }
    },
    true
  );

  const mo = new MutationObserver(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      // recal sid
      document
        .querySelectorAll('[data-source]')
        .forEach((node) => sourceToId(node));
    }, 500);
  });

  mo.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
