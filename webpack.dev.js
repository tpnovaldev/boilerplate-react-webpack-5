/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
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
    historyApiFallback: true, // It supports history for react router DOM
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile files with Babel and webpack
          options: {
            sourceMap: true,
          },
        },
      },
      {
        // Load SCSS and CSS module files
        test: /\.module\.(s(a|c)ss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // Resolve CSS module imports
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
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
          'style-loader', // Resolve CSS imports
          'css-loader', // Resolve CSS imports
          'postcss-loader', // Transforming styles with JS plugins
          {
            loader: 'sass-loader', // Load SCSS and compile to CSS
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        // Compatibility for images
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        // Compatibility for fonts
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  plugins: [],
});
