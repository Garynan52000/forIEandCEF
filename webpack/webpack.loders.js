/* 依赖 start */
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 最小化插件
/* 依赖 end */

/* 常量 start */
const DNS_PERFIX = 'http://img.game.dwstatic.com/intra4test'; // 图片 dns url 前缀
/* 常量 end */

modules.exports = function (MetaData) {
    const {mode, isProd, publicPath} = MetaData;
    
    return [
        {
            test: /\.(scss|sass|css)$/,
            use: [
                {
                    loader: isProd ?  MiniCssExtractPlugin.loader : 'style-loader',
                    options: {
                        publicPath: publicPath,
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
                            env: mode
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        data: "$env: " + mode + ";"
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
                        publicPath: isProd ? DNS_PERFIX + publicPath : publicPath
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
            sideEffects: [
                "*.css",
                "*.scss",
                "*.sass",
                "*.js",
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
}
