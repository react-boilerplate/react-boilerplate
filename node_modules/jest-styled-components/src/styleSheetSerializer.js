const css = require('css')
const { getCSS, getHashes } = require('./utils')

const KEY = '__jest-styled-components__'

const getNodes = (node, nodes = []) => {
  if (typeof node === 'object') {
    nodes.push(node)
  }

  if (node.children) {
    Array.from(node.children).forEach(child => getNodes(child, nodes))
  }

  return nodes
}

const markNodes = nodes => nodes.forEach(node => (node[KEY] = true))

const getClassNamesFromDOM = node => Array.from(node.classList)
const getClassNamesFromProps = node => {
  const classNameProp = node.props && (node.props.class || node.props.className)

  if (classNameProp) {
    return classNameProp.trim().split(/\s+/)
  }

  return []
}

const getClassNames = nodes =>
  nodes.reduce((classNames, node) => {
    let newClassNames = null

    if (global.Element && node instanceof global.Element) {
      newClassNames = getClassNamesFromDOM(node)
    } else {
      newClassNames = getClassNamesFromProps(node)
    }

    newClassNames.forEach(className => classNames.add(className))

    return classNames
  }, new Set())

const filterClassNames = (classNames, hashes) =>
  classNames.filter(className => hashes.includes(className))

const includesClassNames = (classNames, selectors) =>
  classNames.some(className =>
    selectors.some(selector => selector.includes(className))
  )

const filterRules = classNames => rule =>
  rule.type === 'rule' &&
  includesClassNames(classNames, rule.selectors) &&
  rule.declarations.length

const getAtRules = (ast, filter) =>
  ast.stylesheet.rules
    .filter(rule => rule.type === 'media' || rule.type === 'supports')
    .reduce((acc, atRule) => {
      atRule.rules = atRule.rules.filter(filter)

      if (atRule.rules.length) {
        return acc.concat(atRule)
      }

      return acc
    }, [])

const getStyle = classNames => {
  const ast = getCSS()
  const filter = filterRules(classNames)
  const rules = ast.stylesheet.rules.filter(filter)
  const atRules = getAtRules(ast, filter)

  ast.stylesheet.rules = rules.concat(atRules)

  return css.stringify(ast)
}

const getClassNamesFromSelectorsByHashes = (classNames, hashes) => {
  const ast = getCSS()
  const filter = filterRules(classNames)
  const rules = ast.stylesheet.rules.filter(filter)

  const selectors = rules.map(rule => rule.selectors)
  const classNamesIncludingFromSelectors = new Set(classNames)
  const addHashFromSelectorListToClassNames = hash =>
    selectors.forEach(
      selectorList =>
        selectorList[0].includes(hash) &&
        classNamesIncludingFromSelectors.add(hash)
    )

  hashes.forEach(addHashFromSelectorListToClassNames)

  return [...classNamesIncludingFromSelectors]
}

const replaceClassNames = (result, classNames, style) =>
  classNames
    .filter(className => style.includes(className))
    .reduce(
      (acc, className, index) =>
        acc.replace(new RegExp(className, 'g'), `c${index++}`),
      result
    )

const replaceHashes = (result, hashes) =>
  hashes.reduce(
    (acc, className) =>
      acc.replace(
        new RegExp(`((class|className)="[^"]*?)${className}\\s?([^"]*")`, 'g'),
        '$1$3'
      ),
    result
  )

const styleSheetSerializer = {
  test(val) {
    return (
      val &&
      !val[KEY] &&
      (val.$$typeof === Symbol.for('react.test.json') ||
        (global.Element && val instanceof global.Element))
    )
  },

  print(val, print) {
    const nodes = getNodes(val)
    markNodes(nodes)

    const hashes = getHashes()
    let classNames = [...getClassNames(nodes)]
    classNames = filterClassNames(classNames, hashes)

    const style = getStyle(classNames)
    const classNamesToReplace = getClassNamesFromSelectorsByHashes(
      classNames,
      hashes
    )
    const code = print(val)

    let result = `${style}${style ? '\n\n' : ''}${code}`
    result = replaceClassNames(result, classNamesToReplace, style)
    result = replaceHashes(result, hashes)

    return result
  },
}

module.exports = styleSheetSerializer
