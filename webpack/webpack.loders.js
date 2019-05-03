/* 依赖 start */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 最小化插件
/* 依赖 end */

/* 常量 start */
const DNS_HOST = '//img.game.dwstatic.com'; // 图片 dns host
/* 常量 end */

module.exports = function (MetaData) {
    const {mode, isProd, outputPath, publicPath} = MetaData;
    
    return [
        { test: /\.handlebars$/, loader: "handlebars-loader" },
        {
            test: /\.(scss|sass|css)$/,
            use: [
                {
                    loader: isProd?  MiniCssExtractPlugin.loader : 'style-loader',
                    options: isProd? {
                        publicPath: publicPath,
                        sourceMap: true,
                        hmr: !isProd, // 只在开发环境下启用 热模块替换
                        reloadAll: !isProd, // 如果 hmr 无效, 强制重载
                    } : { sourceMap: true },
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
                        config: {
                            ctx: {
                                env: mode,
                                isProd,
                            }
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        data: "$env: " + mode + ";"
                    }
                },
                {
                    loader: 'sass-resources-loader',
                    options: {
                      resources: ['public/sass/common.scss']
                    },
                }
            ]
        },
        {
            test: /\.(ts|tsx)$/,
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
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: outputPath + 'images/',
                        publicPath: isProd ? DNS_HOST + publicPath  + 'images/' : publicPath  + 'images/',
                    }
                }
            ]
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
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
                        outputPath: outputPath + 'fonts/',
                        publicPath: publicPath  + 'fonts/'
                    }
                }
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
    ]
}
