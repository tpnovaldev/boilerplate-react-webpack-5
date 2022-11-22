/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.bundle.js',
  },
  devtool: 'inline-source-map', // Created a source map
  devServer: {
    // Running source files in development server
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    // This extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].min.css',
      chunkFilename: '[id].min.css',
    }),
  ],
});
