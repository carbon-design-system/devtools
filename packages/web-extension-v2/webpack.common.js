const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const Dotenv = require('dotenv-webpack');
const packageJSON = require('./package');

module.exports = {
  performance: {
    maxAssetSize: 4000000,
    maxEntrypointSize: 4000000,
  },
  entry: {
    popup: [
      path.resolve(__dirname, '../web-extension/src/popup/index.js'),
      path.resolve(__dirname, '../web-extension/src/popup/index.scss'),
    ],
    options: [
      path.resolve(__dirname, '../web-extension/src/options/index.js'),
      path.resolve(__dirname, '../web-extension/src/options/index.scss'),
    ],
    background: [
      path.resolve(__dirname, '../web-extension/src/background/index.js'),
    ],
    validate: ['./src/validate/index.js'],
    inject: [
      path.resolve(__dirname, '../web-extension/src/globals/setPrefix.js'),
      path.resolve(__dirname, '../web-extension/src/inject/index.js'),
    ],
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
                includePaths: ['../web-extension/node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
            ],
          },
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
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: true }],
                floatPrecision: 2,
              },
            },
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
          from: path.resolve(__dirname, '../web-extension/src/media'),
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
    new Visualizer(),
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
      '@carbon/devtools-component-list': path.resolve(
        __dirname,
        '../component-list'
      ),
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
