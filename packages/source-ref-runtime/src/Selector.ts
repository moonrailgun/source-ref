import { sidToURI } from './utils';

export class Selector {
  sids = [];
  containerId = '__source-ref-panel';
  focusBlock = null;

  constructor(node: EventTarget) {
    this.sids = this.getParentSids(node);
  }

  getParentSids = (node: EventTarget) => {
    const sids = [];
    let cur = node;
    while (cur !== document.body) {
      if (!(cur instanceof HTMLElement)) {
        break;
      }

      if (cur.dataset.sid) {
        sids.push(cur.dataset.sid);
      }
      cur = cur.parentElement;
    }
    return sids;
  };

  setFocusBlock = (target) => {
    if (target === null) {
      // clear if target is null
      if (this.focusBlock) {
        document.body.removeChild(this.focusBlock);
        this.focusBlock = null;
      }
      return;
    }

    if (!this.focusBlock) {
      this.focusBlock = document.createElement('div');
      this.focusBlock.className = '__source-ref-mask';
      this.focusBlock.style.position = 'absolute';
      this.focusBlock.style.backgroundColor = 'rgba(134, 185, 242, 0.5)';

      document.body.appendChild(this.focusBlock);
    }

    const rect = target.getBoundingClientRect();

    this.focusBlock.style.height = rect.height + 'px';
    this.focusBlock.style.width = rect.width + 'px';
    this.focusBlock.style.left = rect.x + 'px';
    this.focusBlock.style.top = rect.y + 'px';
  };

  getContainer = () => {
    const container = document.getElementById(this.containerId);
    if (!container) {
      const div = document.createElement('div');
      div.id = this.containerId;
      document.body.appendChild(div);

      // Add dom red border on hover
      div.addEventListener('mouseover', (e) => {
        const node = e.target;
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.dataset.tid) {
          const target = document.querySelector(
            `[data-sid="${node.dataset.tid}"]`
          );
          if (target) {
            target.classList.add('__source-ref-selected');
            this.setFocusBlock(target);
          }
        }
      });

      // Remove dom red border when leave
      div.addEventListener('mouseout', (e) => {
        const node = e.target;
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.dataset.tid) {
          const target = document.querySelector(
            `[data-sid="${node.dataset.tid}"]`
          );
          if (target) {
            target.classList.remove('__source-ref-selected');
          }
        }
      });

      const close = () => {
        this.setFocusBlock(null);
        document.body.removeChild(div);
      };

      // click event
      div.addEventListener('click', (e) => {
        const node = e.target;
        if (!(node instanceof HTMLElement)) {
          return;
        }
        const command = node.dataset.command;
        switch (command) {
          case 'close': {
            e.stopPropagation();
            close();
            return;
          }
          default:
            console.warn('Unknown command', command);
        }
      });

      // keyboard event
      const escKeyHandler = (e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          close();
          document.removeEventListener('keydown', escKeyHandler);
        }
      };
      document.addEventListener('keydown', escKeyHandler);

      return div;
    }
    return container;
  };

  renderHTML = () => {
    const html = `
      <div style="
        position: fixed;
        background: white;
        bottom: 0;
        left: 0;
        z-index: 9999;
        opacity: 0.6;
        border-radius: 0 10px 0 0;
        box-shadow: 0px 0 4px 0px;
        max-width: 90vw;
      ">
        <div style="cursor:pointer;margin:10px;text-align:right;font-size:18px;" data-command="close">×</div>
        ${this.sids
          .map((sid) => {
            const uri = sidToURI(sid);
            return `<a href="${uri}" style="
              display: block;
              margin: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              direction: rtl;
              text-align: left;
            " data-tid="${sid}">source-ref: ${uri}</a>`;
          })
          .join('')}
      </div>
    `;
    const container = this.getContainer();
    container.innerHTML = html;
  };
}
