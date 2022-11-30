/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'assets/js/[name].[contenthash].js',
    chunkFilename: 'assets/js/components/[name].chunk.bundle.js',
    clean: true, // Clean source files
  },
  devtool: 'source-map', // Created a source map
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Loads ES2015+ code and transpiles to ES5 using Babel
          options: {
            sourceMap: false,
          },
        },
      },
      {
        // Load SCSS and CSS module files
        test: /\.module\.s(a|c)ss|css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          {
            loader: 'css-loader', // Loads CSS file with resolved imports and returns CSS code
            options: {
              modules: true,
              sourceMap: false,
            },
          },
          'postcss-loader', // Loads and transforms a CSS/SSS file using PostCSS
          {
            loader: 'sass-loader', // Loads and compiles a SASS/SCSS file
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        // Load SCSS and CSS files
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Loads CSS file with resolved imports and returns CSS code
          'postcss-loader', // Loads and transforms a CSS/SSS file using PostCSS
          {
            loader: 'sass-loader', // Loads and compiles a SASS/SCSS file
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // This extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].min.css',
      chunkFilename: 'assets/css/[id].min.css',
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    // Code splitting
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // '...',
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
});
