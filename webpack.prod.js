/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Created a source map
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
          { loader: MiniCssExtractPlugin.loader }, // Inject CSS into the DOM
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
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
      },
    },
    minimize: true, // Minimize files in development as well
    minimizer: [
      // Minify CSS
      new CssMinimizerPlugin(),
      // Optimize and minimize JavaScript
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      // Optimize (compress) all images
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
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
