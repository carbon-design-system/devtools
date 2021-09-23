const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');

module.exports = {
  mode: 'production',
  performance: {
    maxAssetSize: 4000000,
    maxEntrypointSize: 4000000,
  },
  entry: ['./src/index.js'],
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
  plugins: [
    new webpack.DefinePlugin({
      window: 'global',
    }),
  ],
  target: 'node',
  //     node: {
  //       global: true,
  //       __filename: true,
  //       __dirname: true,
  //     },
};
