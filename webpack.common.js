/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.bundle.js',
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
    clean: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // Generate HTML files from template
    new HtmlWebpackPlugin({
      title: 'Boilerplate React Webpack 5',
      favicon: './public/favicon.png',
      template: './public/index.html',
      filename: 'index.html',
    }),
    // Checking & fixing JavaScript code
    new ESLintPlugin(),
    new NodePolyfillPlugin(),
  ],
};
