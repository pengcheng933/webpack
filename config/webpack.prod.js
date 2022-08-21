const path =require('path');
const os = require('os');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length; // 获取CPU核数
console.log(threads);
function getStyleLoader(pre){
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env', // 处理兼容
                        ],
                    ],
                },
            },
        },
        pre

    ].filter(Boolean) // 从右向左
    // filter过滤自动过滤掉pre传进来的null值
}
module.exports={
    // 入口
    entry: './src/main.js', // 相对路径
    // 输出
    output: {
        // 文件输出路径
        // __dirname 当前文件文件夹路径
        path: path.resolve(__dirname,"../dist"), // 绝对路径
        // 文件名
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        clean: true, // 打包前将dist清空
    },
    // 加载器
    module:{
        rules:[
            {
                // 所有loader匹配到第一个就停止
                oneOf: [
                    // loader配置
                    {
                        test: /\.css$/, // 只检测以.css开头文件
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/i,
                        // loader: [ // loader只能处理一个loader
                        //     // compiles Less to CSS
                        //     'style-loader',
                        //     'css-loader',
                        //     'less-loader',
                        // ],
                        use: getStyleLoader('less-loader')
                    },
                    {
                        test: /\.pnh|jpe?g|gif|svg$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                /**
                                 * 小于多少KB转base64
                                 * 优点：减轻服务器压力
                                 * 缺点：图片体积会变大
                                 */
                                maxSize: 10*1024,
                            }
                        },
                        generator: {
                            // 输出图片 hash 扩展名 参数
                            // [hash:10] 10位hash
                            filename: 'static/images/[hash:10][ext][query]'
                        }

                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)/, // 只检测以.css开头文件
                        type: 'asset/resource',
                        generator: {
                            // 输出图片 hash 扩展名 参数
                            // [hash:10] 10位hash
                            filename: 'static/media/[hash:10][ext][query]'
                        }

                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // 排除XXX不处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多线程
                                options: {
                                    works: threads,
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启Babel缓存
                                    cacheCompression: false, // 关闭缓存压缩
                                    plugins: ['@babel/plugin-transform-runtime'], // 减小代码体积
                                }
                            }
                        ]
                    },
                ]
            }
        ]
    },
    // 插件
    plugins:[
        new ESLintPlugin({
            // 检测那些文件
            context: path.resolve(__dirname,'../src'),
            exclude: "node_modules", // 默认值，不对node_modules文件下文件处理
            cache: true,
            cacheLocation: path.resolve(__dirname,"../node_modules/.cache/cacheEslint"),
            threads, // 开启多线程
        }),
        new HtmlWebpackPlugin({
            // 模板
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].chunk.[contenthash:10].css'
        }),
        // new CssMinimizerPlugin(),
        // new TerserWebpackPlugin({
        //     parallel: threads, // 开启多线程和设置进程数
        // })
        new PreloadWebpackPlugin({
            // rel: 'preload', // 采用preload
            // as: 'script', // 优先级
            rel: 'prefetch',
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    // 涉及到压缩放这里
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                parallel: threads, // 开启多线程和设置进程数
            })
        ],
        // 代码分割配置
        splitChunks: {
            chunks: "all",
            // 其他默认值
        },
        runtimeChunk: {
            name:(entrypoint)=> `runtime~${entrypoint.name}.js`
        }
    },
    // 模式
    mode: 'production',
    devtool: 'source-map',
}
