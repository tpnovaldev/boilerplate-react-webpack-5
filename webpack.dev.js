/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.bundle.js',
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
    clean: true,
  },
  devtool: 'inline-source-map', // Created a source map
  devServer: {
    // Running source files in development server
    static: './build',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // It supports history for react router DOM
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Loads ES2015+ code and transpiles to ES5 using Babel
          options: {
            sourceMap: true,
          },
        },
      },
      {
        // Load SCSS and CSS module files
        test: /\.module\.(s(a|c)ss|css)$/,
        use: [
          'style-loader', // Add exports of a module as style to DOM
          {
            loader: 'css-loader', // Loads CSS file with resolved imports and returns CSS code
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          'postcss-loader', // Loads and transforms a CSS/SSS file using PostCSS
          {
            loader: 'sass-loader', // Loads and compiles a SASS/SCSS file
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        // Load SCSS and CSS files
        test: /\.(s(a|c)ss|css)$/,
        exclude: /\.module.(s(a|c)ss|css)$/,
        use: [
          'style-loader', // Add exports of a module as style to DOM
          'css-loader', // Loads CSS file with resolved imports and returns CSS code
          'postcss-loader', // Loads and transforms a CSS/SSS file using PostCSS
          {
            loader: 'sass-loader', // Loads and compiles a SASS/SCSS file
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
});
