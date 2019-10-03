const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: {
        inject: './App/inject/index.js',
        popup: './App/popup/index.js'
    },
    devtool: 'source-map', // any "source-map"-like devtool is possible
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            includePaths: ['./node_modules'],
                        }
                    },
                },
            ],
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }]
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]/index.css',
            chunkFilename: '[id]/index.css',
        }),
        new HtmlWebpackPlugin({
            title: 'Injected – IBM Dotcom Devtools',
            chunks: ['inject'],
            filename: 'inject/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Popup – IBM Dotcom Devtools',
            chunks: ['popup'],
            filename: 'popup/index.html'
        })
    ],
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'chrome-extension/static')
    },
};