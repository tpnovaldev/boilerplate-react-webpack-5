/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Created a source map
  devServer: {
    // Running source files in development server
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
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
        // Convert SCSS files into CSS file
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' }, // Inject CSS into the DOM
          { loader: 'css-loader', options: { sourceMap: true } }, // Resolve CSS imports
          { loader: 'postcss-loader', options: { sourceMap: true } }, // Transforming styles with JS plugins
          { loader: 'sass-loader', options: { sourceMap: true } }, // Load SCSS and compile to CSS
        ],
      },
      {
        // Optimize (compress) all images
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    // Code splitting
    splitChunks: {
      chunks: 'all',
    },
    minimize: true, // Minimize files in development as well
    minimizer: [
      // Minify CSS
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [],
});
