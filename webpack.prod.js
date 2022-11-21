/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Created a source map
  plugins: [
    // Manage dist/build directory structure
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: './dist/*.{css,css.map}', destination: './dist/assets/css/' },
            { source: './dist/*.{js,js.map,js.LICENSE.txt}', destination: './dist/assets/js/' },
          ],
          delete: ['./dist/*.js', './dist/*.js.map', './dist/*.js.LICENSE.txt', './dist/*.css', './dist/*.css.map'],
          mkdir: ['./dist/assets/css/', './dist/assets/fonts/', './dist/assets/js/', './dist/assets/sass/'],
        },
      },
    }),
  ],
});
