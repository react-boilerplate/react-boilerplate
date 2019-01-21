const prettierConfig = require('./prettier.config')

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      classes: true,
    },
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['json', 'prettier'],
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
}
