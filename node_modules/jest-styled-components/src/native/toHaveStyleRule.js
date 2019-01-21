function toHaveStyleRule(component, name, expected) {
  const styles = component.props.style.filter(x => x)

  /**
   * Convert style name to camel case (so we can compare)
   */
  const camelCasedName = name.replace(/-(\w)/, (_, match) =>
    match.toUpperCase()
  )

  /**
   * Merge all styles into one final style object and search for the desired
   * stylename against this object
   */
  const mergedStyles = styles.reduce((acc, item) => ({ ...acc, ...item }), {})
  const received = mergedStyles[camelCasedName]
  const pass = received === expected

  if (!received) {
    const error = `${name} isn't in the style rules`
    return {
      message: () =>
        `${this.utils.matcherHint('.toHaveStyleRule')}\n\n` +
        `Expected ${component.type} to have a style rule:\n` +
        `  ${this.utils.printExpected(`${name}: ${expected}`)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(error)}`,
      pass: false,
    }
  }

  const diff =
    '' +
    `  ${this.utils.printExpected(`${name}: ${expected}`)}\n` +
    'Received:\n' +
    `  ${this.utils.printReceived(`${name}: ${received}`)}`

  const message = pass
    ? () =>
        `${this.utils.matcherHint('.not.toHaveStyleRule')}\n\n` +
        `Expected ${component.type} not to contain:\n${diff}`
    : () =>
        `${this.utils.matcherHint('.toHaveStyleRule')}\n\n` +
        `Expected ${component.type} to have a style rule:\n${diff}`

  return { message, pass }
}

module.exports = toHaveStyleRule
