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