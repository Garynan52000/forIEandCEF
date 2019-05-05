/* 依赖 start */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 最小化插件
/* 依赖 end */


/* 常量 start */
const DNS_HOST = '//img.game.dwstatic.com'; // 图片 dns host
const JS_LOADERS = [ // js 的 loaders
    {
        loader: "babel-loader",
    },
];
/* 常量 end */

/* 公共变量 start */
/* 公共变量 end */

module.exports = function (MetaData) {
    const {mode, isProd, outputPath, publicPath, isCDN} = MetaData;
    
    return [
        { test: /\.handlebars$/, loader: "handlebars-loader" },
        {
            test: /\.(scss|sass|css)$/,
            use: [
                {
                    loader: isProd?  MiniCssExtractPlugin.loader : 'style-loader',
                    options: isProd? {
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
            test: /\.js$/,
            use: [
                ...JS_LOADERS
            ],
            exclude: /node_modules/
        },
        {
            test: /\.(ts|tsx)$/,
            use: [
                ...JS_LOADERS,
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
        // { 
        //     test: /\.(png|jpe?g|bmp|gif)$/,
        //     use: [
        //         {
        //             loader:'url-loader',
        //             options: {
        //                 fallback: 'file-loader',
        //                 limit: 8192,//限制打包图片的大小：如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
        //                 //images:图片打包的文件夹；
        //                 //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
        //                 //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
        //             }
        //         }
        //     ]
        // },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        publicPath: isCDN ? DNS_HOST + publicPath  + 'images/' : publicPath  + 'images/',
                        name: '[name]-[hash:8].[ext]',
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
