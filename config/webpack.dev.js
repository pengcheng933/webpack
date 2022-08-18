const path =require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    // 入口
    entry: './src/main.js', // 相对路径
    // 输出
    output: {
        // 文件输出路径
        // __dirname 当前文件文件夹路径
        // path: path.resolve(__dirname,"dist"), // 绝对路径
        // 开发模式没有输出
        path: undefined,
        // 文件名
        filename: "static/js/main.js",
    },
    // 加载器
    module:{
        rules:[
            // loader配置
            {
                test: /\.css$/, // 只检测以.css开头文件
                use: ["style-loader", "css-loader"], // 从右向左
            },
            {
                test: /\.less$/i,
                // loader: [ // loader只能处理一个loader
                //     // compiles Less to CSS
                //     'style-loader',
                //     'css-loader',
                //     'less-loader',
                // ],
                use: [ // use可以处理多个loader
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
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
                use: {
                    loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                }
            },
        ]
    },
    // 插件
    plugins:[
        new ESLintPlugin({
            // 检测那些文件
            context: path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            // 模板
            template:path.resolve(__dirname,'../public/index.html')
        }),
    ],
    // 开发服务器
    devServer:{
        host:"localhost", // 地址
        port: "8080", // 端口
        open: true, // 自动打开
    },
    // 模式
    mode: 'development',
}
