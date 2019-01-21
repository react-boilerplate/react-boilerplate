const babylon = require('babylon')

module.exports = type => input =>
  babylon.parse(input, {
    sourceType: 'module',
    plugins: [
      'jsx',
      type,
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'optionalCatchBinding'
    ]
  })
