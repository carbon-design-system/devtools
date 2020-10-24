module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
    'postcss-rem-to-pixel': {
      rootValue: 16,
      propList: ['*'],
      replace: true,
      mediaQuery: true,
    },
  },
};
