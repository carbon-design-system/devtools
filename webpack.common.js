const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        popup: [
            // './App/setPrefix.js',
            './App/popup/index.js'
        ],
        options: [
            // './App/setPrefix.js',
            './App/options/index.js'
        ],
        background: [
            // './App/setPrefix.js',
            './App/background/index.js'
        ],
        validate: [
            // './App/setPrefix.js',
            './App/validate/index.js'
        ],
        inject: [
            './App/setPrefix.js',
            './App/inject/index.js'
        ]
    },
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            sideEffects: true,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            includePaths: ['./node_modules'],
                        }
                    },
                }
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
            title: 'Options – IBM Dotcom Devtools',
            chunks: ['options'],
            filename: 'options/index.html',
            cache: false
        }),
        new HtmlWebpackPlugin({
            title: 'Popup – IBM Dotcom Devtools',
            chunks: ['popup'],
            filename: 'popup/index.html',
            cache: false
        })
    ],
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'extension/static')
    },
    resolve: {
        alias: {
            react: "preact/compat",
            "react-dom": "preact/compat"
        }
    }
};