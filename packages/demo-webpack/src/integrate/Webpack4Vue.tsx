import React from 'react';

export const Webpack4Vue: React.FC = React.memo(() => {
  return (
    <div>
      <h2>Integrate with Webpack(Vue)</h2>

      <pre>
        <code>npm install source-ref-loader-vue</code>
      </pre>

      <p>
        in <code>webpack.js</code>:
      </p>

      <pre>
        <code>
          {`
module: {
  rules: [
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: {/* ... */},
        },
        {
          loader: 'source-ref-loader-vue',
        },
      ],
    }
  ]
}`}
        </code>
      </pre>

      <b>
        Make sure <code>source-ref-loader-vue</code> is load before other
        loaders
      </b>

      <p>
        Full demo:{' '}
        <a
          href="https://github.com/moonrailgun/source-ref/tree/master/packages/demo-webpack-vue"
          target="_blank"
        >
          https://github.com/moonrailgun/source-ref/tree/master/packages/demo-webpack-vue
        </a>
      </p>
    </div>
  );
});
Webpack4Vue.displayName = 'Webpack4Vue';
