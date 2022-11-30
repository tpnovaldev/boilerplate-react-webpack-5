/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    mainFields: ['loader', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // Generate HTML files from template
    new HtmlWebpackPlugin({
      title: 'Boilerplate React Webpack 5',
      favicon: './public/favicon.png',
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    // Checking & fixing JavaScript code
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      formatter: 'visualstudio',
    }),
    new NodePolyfillPlugin(),
  ],
};
