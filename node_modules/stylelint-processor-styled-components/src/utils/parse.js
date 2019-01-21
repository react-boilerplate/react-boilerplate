/**
 * Parsing helpers
 */

const parseImports = (node, currentNames) => {
  const names = Object.assign({}, currentNames)
  const imports = node.specifiers.filter(
    specifier => specifier.type === 'ImportDefaultSpecifier' || specifier.type === 'ImportSpecifier'
  )

  imports.forEach(singleImport => {
    if (singleImport.imported) {
      // Is helper method
      names[singleImport.imported.name] = singleImport.local.name
    } else {
      // Is default import
      names.default = singleImport.local.name
    }
  })

  return names
}

const getSourceMap = (fullCSS, fragmentCSS, startInSource) => {
  const correction = {}
  // Save which line in the full CSS is which line in the source
  const fullCSSLength = fullCSS.split(/\n/).length
  const currentCSSLength = fragmentCSS.split(/\n/).length
  const currentCSSStart = fullCSSLength - currentCSSLength + 1
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < currentCSSLength + 1; i++) {
    correction[currentCSSStart + i] = startInSource + i
  }
  return correction
}

exports.parseImports = parseImports
exports.getSourceMap = getSourceMap
