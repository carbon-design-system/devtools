const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// TODO: webpack may not be necessary anymore

module.exports = {
  mode: 'production',
  entry: {
    elements: ['./src/elements.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'packages/[name].js',
    path: path.resolve(__dirname, 'public'),
  },
};
