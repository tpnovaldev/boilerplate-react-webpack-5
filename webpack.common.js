/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
  },
  watchOptions: {
    ignored: /node_modules/,
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
        test: /\.(s[ac]ss)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader }, // Inject CSS into the DOM
          { loader: 'css-loader' }, // Resolve CSS imports
          { loader: 'postcss-loader' }, // Transforming styles with JS plugins
          { loader: 'sass-loader' }, // Load SCSS and compile to CSS
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
        use: [
          { loader: 'file-loader' },
        ],
      },
    ],
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
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['loader', 'main'],
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
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      formatter: 'visualstudio',
    }),
    new NodePolyfillPlugin(),
  ],
};
