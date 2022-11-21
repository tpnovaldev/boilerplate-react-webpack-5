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
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map', // Created a source map
    output: {
      // Source files for production server
      path: path.resolve(__dirname, 'dist'),
      // publicPath: '/',
      filename: '[name].bundle.js',
      assetModuleFilename: (pathData) => {
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name].[hash][ext][query]`;
      },
      clean: true,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      // Running source files in development server
      static: path.join(__dirname, 'dist'),
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
            { loader: argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' }, // Inject CSS into the DOM
            { loader: 'css-loader', options: { sourceMap: true } }, // Resolve CSS imports
            { loader: 'postcss-loader', options: { sourceMap: true } }, // Load SCSS and compile to CSS
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
      minimize: true, // Minimize files in development as well
      minimizer: [
        new CssMinimizerPlugin(), // Minify CSS
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }), // Minify JavaScript
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
                                attributes: [
                                  { xmlns: 'http://www.w3.org/2000/svg' },
                                ],
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
        }), // Optimize (compress) all images
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        title: 'Boilerplate React Webpack 5',
        favicon: './public/favicon.png',
        template: './public/index.html',
        filename: 'index.html',
      }), // Create HTML files to serve your webpack bundles
      new ESLintPlugin(),
      ...(argv.mode === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' })] : []), // Extracts CSS into separate files
    ],
  };

  return configs;
};
