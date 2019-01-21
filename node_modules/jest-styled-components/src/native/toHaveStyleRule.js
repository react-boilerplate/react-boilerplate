const { matcherTest, buildReturnMessage } = require('../utils')

function toHaveStyleRule(component, property, expected) {
  const styles = component.props.style.filter(x => x)

  /**
   * Convert style name to camel case (so we can compare)
   */
  const camelCasedProperty = property.replace(/-(\w)/, (_, match) =>
    match.toUpperCase()
  )

  /**
   * Merge all styles into one final style object and search for the desired
   * stylename against this object
   */
  const mergedStyles = styles.reduce((acc, item) => ({ ...acc, ...item }), {})
  const received = mergedStyles[camelCasedProperty]
  const pass = matcherTest(received, expected)

  return {
    pass,
    message: buildReturnMessage(this.utils, pass, property, received, expected),
  }
}

module.exports = toHaveStyleRule
