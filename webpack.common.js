/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const configs = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.bundle.js',
      assetModuleFilename: (pathData) => {
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name].[hash][ext][query]`;
      },
      clean: true,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.jsx'],
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
            {
              // Inject CSS into the DOM
              loader: argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              // Resolve CSS imports
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              // Load SCSS and compile to CSS
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              // Load SCSS and compile to CSS
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
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
      new NodePolyfillPlugin(),
      // Generate HTML files from template
      new HtmlWebpackPlugin({
        title: 'Boilerplate React Webpack 5',
        favicon: './public/favicon.png',
        template: './public/index.html',
        filename: 'index.html',
      }),
      // Checking & fixing JavaScript code
      new ESLintPlugin(),
      // Extracts CSS into separate files
      ...(argv.mode === 'production'
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].css',
              chunkFilename: '[id].css',
            }),
          ]
        : []),
    ],
  };

  return configs;
};
