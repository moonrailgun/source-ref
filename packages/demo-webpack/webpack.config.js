const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const mode = isDev ? 'development' : 'production';

module.exports = {
  mode,
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash].js',
  },
  devServer: {
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
              tsconfigRaw: require('./tsconfig.json'),
            },
          },
          {
            loader: 'source-ref-loader',
            options: {
              available: isDev,
              opener: {
                type: 'github',
                url: 'https://github.com/moonrailgun/source-ref',
                branch: 'master',
                cwd: path.resolve(__dirname, '../../'),
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
};
