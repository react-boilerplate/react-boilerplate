const { getCSS } = require('./utils')

const shouldDive = node =>
  typeof node.dive === 'function' && typeof node.type() !== 'string'

const isTagWithClassName = node =>
  node.prop('className') && typeof node.type() === 'string'

const getClassNames = received => {
  let className

  if (received) {
    if (received.$$typeof === Symbol.for('react.test.json')) {
      className = received.props.className || received.props.class
    } else if (typeof received.findWhere === 'function') {
      const tree = shouldDive(received) ? received.dive() : received
      const components = tree.findWhere(isTagWithClassName)
      if (components.length) {
        className = components.first().prop('className')
      }
    }
  }

  return className ? className.split(/\s/) : []
}

const hasAtRule = options =>
  Object.keys(options).some(option => ['media', 'supports'].includes(option))

const getAtRules = (ast, options) => {
  const mediaRegex = /(\([a-z-]+:)\s?([a-z0-9]+\))/g

  return Object.keys(options)
    .map(option =>
      ast.stylesheet.rules
        .filter(
          rule =>
            rule.type === option &&
            rule[option] === options[option].replace(mediaRegex, '$1$2')
        )
        .map(rule => rule.rules)
        .reduce((acc, rules) => acc.concat(rules), [])
    )
    .reduce((acc, rules) => acc.concat(rules), [])
}

const getModifiedClassName = (className, modifier = '') => {
  const classNameSelector = `.${className}`
  let prefix = ''
  modifier = modifier.trim()
  if (modifier.includes('&')) {
    modifier = modifier.replace('&', classNameSelector)
  } else {
    prefix += classNameSelector
  }
  const first = modifier[0]
  if (first !== ':' && first !== '[') {
    prefix += ' '
  }
  return `${prefix}${modifier}`.trim()
}

const hasClassNames = (classNames, selectors, options) =>
  classNames.some(className =>
    selectors.includes(getModifiedClassName(className, options.modifier))
  )

const getRules = (ast, classNames, options) => {
  const rules = hasAtRule(options)
    ? getAtRules(ast, options)
    : ast.stylesheet.rules

  return rules.filter(
    rule =>
      rule.type === 'rule' && hasClassNames(classNames, rule.selectors, options)
  )
}

const die = (utils, property) => ({
  pass: false,
  message: () => `Property not found: ${utils.printReceived(property)}`,
})

const getDeclaration = (rule, property) =>
  rule.declarations
    .filter(
      declaration =>
        declaration.type === 'declaration' && declaration.property === property
    )
    .pop()

const getDeclarations = (rules, property) =>
  rules.map(rule => getDeclaration(rule, property)).filter(Boolean)

const normalizeModifierOption = modifier =>
  Array.isArray(modifier) ? modifier.join('') : modifier

function toHaveStyleRule(received, property, value, options = {}) {
  const classNames = getClassNames(received)
  const ast = getCSS()
  options.modifier = normalizeModifierOption(options.modifier)
  const rules = getRules(ast, classNames, options)

  if (!rules.length) {
    return die(this.utils, property)
  }

  const declarations = getDeclarations(rules, property)

  if (!declarations.length) {
    return die(this.utils, property)
  }

  const declaration = declarations.pop()

  const pass =
    value instanceof RegExp
      ? value.test(declaration.value)
      : value === declaration.value

  const message = () =>
    `Expected ${property}${pass ? ' not ' : ' '}to match:\n` +
    `  ${this.utils.printExpected(value)}\n` +
    'Received:\n' +
    `  ${this.utils.printReceived(declaration.value)}`

  return {
    pass,
    message,
  }
}

module.exports = toHaveStyleRule
