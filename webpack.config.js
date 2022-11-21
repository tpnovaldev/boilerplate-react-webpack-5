const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    devtool: 'source-map', // created a source map
    output: {
      // Source files for production server
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      assetModuleFilename: (pathData) => {
        const filepath = path.dirname(pathData.filename).split("/").slice(1).join("/");
        return `${filepath}/[name].[hash][ext][query]`;
      },
      clean: true,
    },
    devServer: {
      // Running source files in development server
      static: path.join(__dirname, 'dist'),
      port: 3000,
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          // Compile ES6+ JavaScript into ES5
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Transform JSX into normal JavaScript
            options: {
              sourceMap: true
            }
          }
        },
        {
          // Convert SCSS files into CSS file
          test: /\.(scss|css)$/,
          use: [
            { loader: argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' }, // Injects CSS into the DOM using multiple <style></style> and works faster
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          // Optimize (compress) all images 
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset',
        },
      ]
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
        }) // Optimize (compress) all images
      ]
    },
    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body',
      }), // Create HTML files to serve your webpack bundles
      ...(argv.mode === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' })] : []), // Extracts CSS into separate files
    ]
  }
}
