import React from 'react';
import { createRoot } from 'react-dom/client';
import { start as startSR } from 'source-ref-runtime';
import { Webpack } from './integrate/Webpack';
import { Rollup } from './integrate/Rollup';
import { ViteVue } from './integrate/ViteVue';
import { Runtime } from './Runtime';
import './index.css';

startSR();

const App = React.memo(() => {
  return (
    <div>
      <h2>Source Ref</h2>

      <p>This is amazing tool which can help you find your source quickly</p>

      <p>
        Fast try with <code>Alt + Mouse Left Click</code> Anything DOM element
        in this page.
      </p>

      <p>
        And <code>source-ref</code> can fast integrate with <code>React</code>、{' '}
        <code>Vue</code> by <code>webpack</code> or <code>rollup</code> or{' '}
        <code>vite</code>{' '}
      </p>

      <Runtime />

      <Webpack />

      <Rollup />

      <ViteVue />
    </div>
  );
});

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
