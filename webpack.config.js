const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [{
    mode: 'development',
    entry: './SRC/Script/MainParts/main.ts',
    target: 'electron-main',
    module: {
        rules: [{
            test: /\.ts$/,
            include: /SRC/,
            use: [{
                loader: 'ts-loader'
            }]
        }]
    },
    output: {
        path: __dirname + '/SRC/Script/Comped',
        filename: 'main.js'
    }
}, {
    mode: 'development',
    entry: './SRC/Script/MainParts/UIParts/MainPart.ts',
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                include: path.resolve(__dirname, 'SRC'),
                use: [{
                    loader: 'ts-loader',
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                loader: 'url-loader',
                //webpack和url-loader的作者你🐎死了
                options: {
                    esModule: false,
                },
                //就这一段傻逼东西搞得font-awesome的font丢失
            }
        ]
    },
    output: {
        path: __dirname + '/SRC/Script/Comped/UIParts',
        filename: 'MainPart.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './SRC/HTML/index.html'
        })
    ]
}, ];