import { Inspector } from './Inspector';
import { compressToSr } from './utils';

let timer = null;
let currentInspector: Inspector | null = null;

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

        if (currentInspector) {
          currentInspector.close();
          currentInspector = null;
        }

        const inspector = new Inspector(e.target);
        inspector.renderHTML();
        currentInspector = inspector;
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
    }, 400);
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
