import React from 'react';

export const Rollup: React.FC = React.memo(() => {
  return (
    <div>
      <h2>Integrate with rollup(JSX)</h2>

      <pre>
        <code>npm install rollup-plugin-source-ref</code>
      </pre>

      <p>
        in <code>rollup.config.js</code>:
      </p>

      <pre>
        <code>
          {`
const sourceRef = require('rollup-plugin-source-ref').default;

export default {
  // ...
  plugins: [ sourceRef(), ...plugins ]
};`}
        </code>
      </pre>

      <b>
        Make sure <code>rollup-plugin-source-ref</code> is before other plugins
      </b>
    </div>
  );
});
Rollup.displayName = 'Rollup';
