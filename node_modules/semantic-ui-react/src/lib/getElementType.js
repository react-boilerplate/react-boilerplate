/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @param {function} [getDefault] A function that returns a default element type.
 * @returns {string|function} A ReactElement type
 */
function getElementType(Component, props, getDefault) {
  const { defaultProps = {} } = Component

  // ----------------------------------------
  // user defined "as" element type

  if (props.as && props.as !== defaultProps.as) return props.as

  // ----------------------------------------
  // computed default element type

  if (getDefault) {
    const computedDefault = getDefault()
    if (computedDefault) return computedDefault
  }

  // ----------------------------------------
  // infer anchor links

  if (props.href) return 'a'

  // ----------------------------------------
  // use defaultProp or 'div'

  return defaultProps.as || 'div'
}

export default getElementType
