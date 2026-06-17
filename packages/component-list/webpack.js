const webpack = require('webpack');
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
      // Allow ESM modules in node_modules (e.g. @carbon/react, @floating-ui)
      // to be resolved without requiring fully-specified extensions.
      {
        test: /\.m?js/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'],
    alias: {
      // React 16 does not ship jsx-runtime; provide a compatibility shim path
      'react/jsx-runtime': require.resolve('react/cjs/react.development.js'),
      'react/jsx-dev-runtime':
        require.resolve('react/cjs/react.development.js'),
    },
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
