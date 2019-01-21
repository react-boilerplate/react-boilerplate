module.exports = {
  root: true, // So parent files don't get applied
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    preval: false,
  },
  extends: ['airbnb', 'plugin:import/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'flowtype', 'import', 'jsx-a11y', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        // As configured in webpack
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    'arrow-body-style': 'off', // Not our taste?
    'max-len': 'off', // Not our taste?
    'arrow-parens': 'off', // Incompatible with prettier
    'no-confusing-arrow': 'off', // Incompatible with prettier
    indent: 'off', // Incompatible with prettier
    'space-before-function-paren': 'off', // Incompatible with prettier
    semi: ['error', 'never'],
    'consistent-this': ['error', 'self'],
    'no-console': ['error', { allow: ['time', 'timeEnd'] }], // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn
    'function-paren-newline': 'off', // Incompatible with prettier
    'prefer-destructuring': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'semi-style': 'off', // Incompatible with prettier
    'object-curly-spacing': 'off', // use babel plugin rule
    'no-restricted-properties': 'off', // To remove once react-docgen support ** operator.
    'no-mixed-operators': 'off', // allow a + b * c instead of a + (b * c), prettier conflict
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    'babel/object-curly-spacing': ['error', 'always'],

    'import/unambiguous': 'off',
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-indent': 'off', // Incompatible with prettier
    'react/jsx-wrap-multilines': 'off', // Incompatible with prettier
    'react/jsx-indent-props': 'off', // Incompatible with prettier
    'react/jsx-closing-bracket-location': 'off', // Incompatible with prettier
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
    'react/no-danger': 'error', // airbnb is using warn
    'react/no-direct-mutation-state': 'error', // airbnb is disabling this rule
    'react/no-find-dom-node': 'off', // I don't know
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/sort-prop-types': 'error', // airbnb do nothing here.
    'react/sort-comp': [
      2,
      {
        order: [
          'type-annotations',
          'static-methods',
          'props',
          'lifecycle',
          // '/^handle.+$/', // wishlist -- needs above first
          // '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/', // wishlist -- needs above first
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],
    'react/jsx-curly-brace-presence': 'off', // Incompatible with prettier
    'react/jsx-closing-tag-location': 'off', // Incompatible with prettier

    'prettier/prettier': 'error',

    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-for': 'off', // Buggy
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['route'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
  },
}
