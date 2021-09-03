const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const packageJSON = require('./package');

process.traceDeprecation = true;

module.exports = {
  entry: {
    background: [
      // './src/globals/setPrefix.js',
      './src/background/index.js',
    ],
    inject: ['./src/globals/setPrefix.js', './src/inject/index.js'],
    options: [
      // './src/globals/setPrefix.js',
      './src/options/index.js',
    ],
    popup: [
      // './src/globals/setPrefix.js',
      './src/popup/index.js',
    ],
    validate: [
      // './src/globals/setPrefix.js',
      './src/validate/index.js',
    ],
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
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
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
      chunkFilename: '[id]/index.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Options – Carbon Devtools',
      chunks: ['options'],
      filename: 'options/index.html',
      cache: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Popup – Carbon Devtools',
      chunks: ['popup'],
      filename: 'popup/index.html',
      cache: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/media',
          to: './media',
        },
        {
          from: './src/manifest.json',
          to: './',
          transform(content) {
            return syncManifestPackage(content.toString());
          },
        },
      ],
    }),
  ],
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '@carbon/devtools-utilities': path.resolve(__dirname, '../utilities'),
    },
    fallback: {
      buffer: false,
      path: false,
      util: false,
      stream: false,
      zlib: false,
      crypto: false,
      http: false,
      fs: false,
      net: false,
    },
  },
};

function syncManifestPackage(content) {
  const manifest = JSON.parse(content);

  manifest.name = formatName(packageJSON.name);
  manifest.version = packageJSON.version;
  manifest.description = packageJSON.description;
  manifest.author = packageJSON.author;

  return JSON.stringify(manifest);
}

function formatName(name) {
  let cleanName = '';

  name
    .split('-')
    .forEach(
      (name) =>
        (cleanName += name.charAt(0).toUpperCase() + name.slice(1) + ' ')
    );

  return cleanName.trim();
}
