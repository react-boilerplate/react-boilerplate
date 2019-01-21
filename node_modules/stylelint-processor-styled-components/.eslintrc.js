module.exports = {
  "extends": "airbnb-base",
  "env": {
    "jest": true,
    "node": true
  },
  "rules": {
    // Ignored because prettier handles this
    "semi": 0,
    "comma-dangle": 0,
    "no-mixed-operators": 0,
    "arrow-parens": 0,

    // Repo preferences
    "class-methods-use-this": 0,
    "symbol-description": 0,
    "no-unused-vars": [2, { "varsIgnorePattern": "^_+$" }],
    "import/no-extraneous-dependencies": 0,
    "no-confusing-arrow": 0,
    "no-else-return": 0,
    "no-prototype-builtins": 0
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
