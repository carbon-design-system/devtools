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
      // './src/setPrefix.js',
      './src/popup/index.js',
    ],
    options: [
      // './src/setPrefix.js',
      './src/options/index.js',
    ],
    background: [
      // './src/setPrefix.js',
      './src/background/index.js',
    ],
    validate: [
      // './src/setPrefix.js',
      './src/validate/index.js',
    ],
    inject: ['./src/globals/setPrefix.js', './src/inject/index.js'],
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
        sideEffects: false,
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
        {
          from: './src/validate/validationScript.js',
          to: './validate',
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
