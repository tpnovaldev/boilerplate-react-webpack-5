/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');

// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: paths.build,
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.bundle.js',
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
    clean: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      images: path.resolve(__dirname, '../src/assets/images'),
      styles: path.resolve(__dirname, '../src/styles'),
    },
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
      // title: 'Boilerplate React Webpack 5',
      // favicon: './public/favicon.png',
      // template: './public/index.html',
      // filename: 'index.html',
      // inject: 'body',
      title: 'Boilerplate React Webpack 5',
      favicon: `${paths.src}/assets/images/favicon.png`,
      template: `${paths.src}/template.html`, // template file
      filename: 'index.html', // output file
    }),
    // Checking & fixing JavaScript code
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      formatter: 'visualstudio',
    }),
    new NodePolyfillPlugin(),
  ],
};
