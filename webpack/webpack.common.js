const PackJson = require('../package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


/* 是否是开发模式 */
const IS_DEV_MODE = process.env.NODE_ENV !== 'production'
/* 图片 dns url 前缀 */
const DNS_PERFIX = 'http://img.game.dwstatic.com/intra4test';
/* html template url */
const TEMPLATE_URL = '../public/index.html';
/* html title */
const HTML_TITLE = PackJson.projectTitle;
/* 是否开启 tslint */
const IS_TSLINT = true;

module.exports = function(MetaData){
  const {version, outputPath, publicPath} = MetaData;
  
  return {
    context: __dirname,
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: { 
                sourceMap: true,
                modules: true, 
                importLoaders: 1 
              } 
            },
            {
              loader: 'postcss-loader', 
              options: {
                sourceMap: true,
                ctx: {
                  env: process.env.NODE_ENV
                }
              }
            },
            {
              loader: "sass-loader", 
              options: {
                sourceMap: true,
                data: "$env: " + process.env.NODE_ENV + ";"
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: IS_DEV_MODE? DNS_PERFIX + publicPath : publicPathpublicPath
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: publicPath
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
          exclude: /node_modules/,
          sideEffects: [
            "*.css"
          ]
        }
        // {
        //   test: /\.(csv|tsv)$/,
        //   use: [
        //     'csv-loader'
        //   ]
        // },
        // {
        //   test: /\.xml$/,
        //   use: [
        //     'xml-loader'
        //   ]
        // },
        // {
        //   test: /\.(png|jpg|gif)$/i,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: 8192
        //       }
        //     }
        //   ]
        // }
      ]
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
        Assets: path.resolve(__dirname, 'src/assets')
      },
      extensions: [ '.tsx', '.ts', '.js', 'json', '*' ],
      mainFiles: ['index'],
      modules: ['node_modules']
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['../dist/*'],
      }),
      new HtmlWebpackPlugin({
        template: TEMPLATE_URL,
        title: HTML_TITLE,
        filename: version? '../index.html':'index.html'
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: IS_TSLINT, useTypescriptIncrementalApi: true
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css'
      })
    ],
  };
}

