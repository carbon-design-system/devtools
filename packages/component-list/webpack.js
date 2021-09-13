const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  performance: {
    maxAssetSize: 4000000,
    maxEntrypointSize: 4000000,
  },
  entry: './src/index.js',
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
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'carbonLibraries',
    globalObject: 'this',
  },
  plugins: [new CleanWebpackPlugin()],
};
