/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Control how source maps are generated
  // ENABLE "target: 'web'"  for use Hot Reload / HMR in Chrome ( not in IE 11 )
  // DISABLE ['web', 'es5'] for use IE 11 during testing =>
  // Hot Reload / HMR will stop working in Chrome due to a bug in Webpack 5
  // target: ['web', 'es5'],
  target: 'web',
  devServer: {
    // Running source files in development server
    static: paths.build,
    port: 3000,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true, // It supports history for react router DOM
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Loads ES2015+ code and transpiled to ES5 using Babel
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
