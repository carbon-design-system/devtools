const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            extractComments: 'all',
            cache: true
          }),
        ],
    },
});