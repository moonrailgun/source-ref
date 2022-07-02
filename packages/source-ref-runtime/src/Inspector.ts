import { srToURI } from './utils';

const selectedClassName = '__source-ref-selected';
const selectedMaskClassName = '__source-ref-mask';

export class Inspector {
  srs = [];
  containerId = '__source-ref-panel';
  focusBlock = null;

  constructor(node: EventTarget) {
    this.srs = this.getParentSrs(node);
  }

  getParentSrs = (node: EventTarget) => {
    const srs = [];
    let cur = node;
    while (cur !== document.body) {
      if (!(cur instanceof HTMLElement)) {
        break;
      }

      if (cur.dataset.sr) {
        srs.push(cur.dataset.sr);
      }
      cur = cur.parentElement;
    }
    return srs;
  };

  setFocusBlock = (target: Element) => {
    if (target === null) {
      // clear if target is null
      if (this.focusBlock) {
        document.body.removeChild(this.focusBlock);
        this.focusBlock = null;
      }
      return;
    }

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!this.focusBlock) {
      this.focusBlock = document.createElement('div');
      this.focusBlock.className = selectedMaskClassName;
      this.focusBlock.style.position = 'absolute';
      this.focusBlock.style.backgroundColor = 'rgba(134, 185, 242, 0.5)';

      document.body.appendChild(this.focusBlock);
    }

    this.focusBlock.style.height = target.offsetHeight + 'px';
    this.focusBlock.style.width = target.offsetWidth + 'px';
    this.focusBlock.style.left = target.offsetLeft + 'px';
    this.focusBlock.style.top = target.offsetTop + 'px';
  };

  close = () => {
    this.setFocusBlock(null);
    document.body.removeChild(this.getContainer());
  };

  getContainer = () => {
    const container = document.getElementById(this.containerId);
    if (container) {
      return container;
    }

    const div = document.createElement('div');
    div.id = this.containerId;
    document.body.appendChild(div);

    // Add dom red border on hover
    div.addEventListener('mouseover', (e) => {
      const node = e.target;
      if (!(node instanceof HTMLElement)) {
        return;
      }

      if (node.dataset.sr) {
        const target = document.querySelector(`[data-sr="${node.dataset.sr}"]`);
        if (target) {
          target.classList.add(selectedClassName);
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

      if (node.dataset.sr) {
        const target = document.querySelector(`[data-sr="${node.dataset.sr}"]`);
        if (target) {
          target.classList.remove(selectedClassName);
          this.setFocusBlock(null);
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
        max-height: 80vh;
        overflow: auto;
        padding: 10px;
      ">
        <div style="display: flex; align-items: center;">
          <div style="flex: 1;">SourceRef</div>
          <div style="
            cursor: pointer;
            text-align: right;
            font-size: 24px;
            line-height: 24px;
          " data-command="close" title="Close(esc)">×</div>
        </div>

        ${this.srs
          .map((sr) => {
            const uri = srToURI(sr);
            return `<a href="${uri}" style="
              display: block;
              margin: 6px 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              direction: rtl;
              text-align: left;
            " data-sr="${sr}">source-ref: ${uri}</a>`;
          })
          .join('')}

      </div>
    `;
    const container = this.getContainer();
    container.innerHTML = html;
  };
}
