const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ZipPlugin = require('zip-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const package = require('./package');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new ZipPlugin({
            filename: package.name + '-' + package.version + '' + '.zip'
        })
    ]
});