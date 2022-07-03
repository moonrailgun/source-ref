import React from 'react';

export const ViteVue: React.FC = React.memo(() => {
  return (
    <div>
      <h2>Integrate with vite(Vue)</h2>

      <pre>
        <code>npm install rollup-plugin-source-ref-vue</code>
      </pre>

      <p>
        in <code>vite.config.ts</code>:
      </p>

      <pre>
        <code>
          {`
import sourceRef from 'rollup-plugin-source-ref-vue';

export default {
  // ...
  plugins: [ sourceRef(), ...plugins ]
};`}
        </code>
      </pre>

      <b>
        Make sure <code>rollup-plugin-source-ref-vue</code> is before other
        plugins
      </b>

      <p>
        Full demo:{' '}
        <a
          href="https://github.com/moonrailgun/source-ref/tree/master/packages/demo-vite"
          target="_blank"
        >
          https://github.com/moonrailgun/source-ref/tree/master/packages/demo-vite
        </a>
      </p>
    </div>
  );
});
ViteVue.displayName = 'ViteVue';
