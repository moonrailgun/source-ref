import React from 'react';

export const Webpack: React.FC = React.memo(() => {
  return (
    <div>
      <h2>Integrate with webpack(JSX)</h2>

      <pre>
        <code>npm install source-ref-loader</code>
      </pre>

      <p>
        in <code>webpack.json</code>:
      </p>

      <pre>
        <code>
          {`
{
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    },
    {
      loader: 'source-ref-loader',
    },
  ],
}`}
        </code>
      </pre>

      <b>
        Make sure <code>source-ref-loader</code> is below than other parser like
        <code>esbuild-loader</code>, <code>typescript-loader</code>{' '}
      </b>

      <p>
        Full demo:{' '}
        <a
          href="https://github.com/moonrailgun/source-ref/tree/master/packages/demo-webpack"
          target="_blank"
        >
          https://github.com/moonrailgun/source-ref/tree/master/packages/demo-webpack
        </a>
      </p>
    </div>
  );
});
Webpack.displayName = 'Webpack';
