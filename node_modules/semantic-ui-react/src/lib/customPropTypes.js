import _ from 'lodash/fp'
import PropTypes from 'prop-types'
import leven from './leven'

const typeOf = (...args) => Object.prototype.toString.call(...args)

/**
 * Ensure a component can render as a give prop value.
 */
export const as = (...args) =>
  PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string, PropTypes.symbol])(
    ...args,
  )

/**
 * Ensure a prop is a valid DOM node.
 */
export const domNode = (props, propName) => {
  // skip if prop is undefined
  if (props[propName] === undefined) return
  // skip if prop is valid
  if (props[propName] instanceof Element) return

  throw new Error(`Invalid prop "${propName}" supplied, expected a DOM node.`)
}

/**
 * Similar to PropTypes.oneOf but shows closest matches.
 * Word order is ignored allowing `left chevron` to match `chevron left`.
 * Useful for very large lists of options (e.g. Icon name, Flag name, etc.)
 * @param {string[]} suggestions An array of allowed values.
 */
export const suggest = (suggestions) => {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.')
  }

  /* eslint-disable max-nested-callbacks */
  const findBestSuggestions = _.memoize((str) => {
    const propValueWords = str.split(' ')

    return _.flow(
      _.map((suggestion) => {
        const suggestionWords = suggestion.split(' ')

        const propValueScore = _.flow(
          _.map(x => _.map(y => leven(x, y), suggestionWords)),
          _.map(_.min),
          _.sum,
        )(propValueWords)

        const suggestionScore = _.flow(
          _.map(x => _.map(y => leven(x, y), propValueWords)),
          _.map(_.min),
          _.sum,
        )(suggestionWords)

        return { suggestion, score: propValueScore + suggestionScore }
      }),
      _.sortBy(['score', 'suggestion']),
      _.take(3),
    )(suggestions)
  })
  /* eslint-enable max-nested-callbacks */

  // Convert the suggestions list into a hash map for O(n) lookup times. Ensure
  // the words in each key are sorted alphabetically so that we have a consistent
  // way of looking up a value in the map, i.e. we can sort the words in the
  // incoming propValue and look that up without having to check all permutations.
  const suggestionsLookup = suggestions.reduce((acc, key) => {
    acc[
      key
        .split(' ')
        .sort()
        .join(' ')
    ] = true
    return acc
  }, {})

  return (props, propName, componentName) => {
    const propValue = props[propName]

    // skip if prop is undefined or is included in the suggestions
    if (!propValue || suggestionsLookup[propValue]) return

    // check if the words were correct but ordered differently.
    // Since we're matching for classNames we need to allow any word order
    // to pass validation, e.g. `left chevron` vs `chevron left`.
    const propValueSorted = propValue
      .split(' ')
      .sort()
      .join(' ')
    if (suggestionsLookup[propValueSorted]) return

    // find best suggestions
    const bestMatches = findBestSuggestions(propValue)

    // skip if a match scored 0
    if (bestMatches.some(x => x.score === 0)) return

    return new Error(
      [
        `Invalid prop \`${propName}\` of value \`${propValue}\` supplied to \`${componentName}\`.`,
        `\n\nInstead of \`${propValue}\`, did you mean:`,
        bestMatches.map(x => `\n  - ${x.suggestion}`).join(''),
        '\n',
      ].join(''),
    )
  }
}

/**
 * Disallow other props from being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */
export const disallow = disallowedProps => (props, propName, componentName) => {
  if (!Array.isArray(disallowedProps)) {
    throw new Error(
      [
        'Invalid argument supplied to disallow, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    )
  }

  // skip if prop is undefined
  if (_.isNil(props[propName]) || props[propName] === false) return

  // find disallowed props with values
  const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
    if (!_.isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
      return [...acc, disallowedProp]
    }
    return acc
  }, [])

  if (disallowed.length > 0) {
    return new Error(
      [
        `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join(
          '`, `',
        )}\`.`,
        'They cannot be defined together, choose one or the other.',
      ].join(' '),
    )
  }
}

/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const every = validators => (props, propName, componentName, ...rest) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to every, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  const errors = _.flow(
    _.map((validator) => {
      if (typeof validator !== 'function') {
        throw new Error(
          `every() argument "validators" should contain functions, found: ${typeOf(validator)}.`,
        )
      }
      return validator(props, propName, componentName, ...rest)
    }),
    _.compact,
  )(validators)

  // we can only return one error at a time
  return errors[0]
}

/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const some = validators => (props, propName, componentName, ...rest) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  const errors = _.compact(
    _.map(validators, (validator) => {
      if (!_.isFunction(validator)) {
        throw new Error(
          `some() argument "validators" should contain functions, found: ${typeOf(validator)}.`,
        )
      }
      return validator(props, propName, componentName, ...rest)
    }),
  )

  // fail only if all validators failed
  if (errors.length === validators.length) {
    const error = new Error('One of these validators must pass:')
    error.message += `\n${_.map(errors, (err, i) => `[${i + 1}]: ${err.message}`).join('\n')}`
    return error
  }
}

/**
 * Ensure a validator passes only when a component has a given propsShape.
 * @param {object} propsShape An object describing the prop shape.
 * @param {function} validator A propType function.
 */
export const givenProps = (propsShape, validator) => (props, propName, componentName, ...rest) => {
  if (!_.isPlainObject(propsShape)) {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected an object.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  if (typeof validator !== 'function') {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected a function.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  const shouldValidate = _.keys(propsShape).every((key) => {
    const val = propsShape[key]
    // require propShape validators to pass or prop values to match
    return typeof val === 'function'
      ? !val(props, key, componentName, ...rest)
      : val === props[propName]
  })

  if (!shouldValidate) return

  const error = validator(props, propName, componentName, ...rest)

  if (error) {
    // poor mans shallow pretty print, prevents JSON circular reference errors
    const prettyProps = `{ ${_.keys(_.pick(_.keys(propsShape), props))
      .map((key) => {
        const val = props[key]
        let renderedValue = val
        if (typeof val === 'string') renderedValue = `"${val}"`
        else if (Array.isArray(val)) renderedValue = `[${val.join(', ')}]`
        else if (_.isObject(val)) renderedValue = '{...}'

        return `${key}: ${renderedValue}`
      })
      .join(', ')} }`

    error.message = `Given props ${prettyProps}: ${error.message}`
    return error
  }
}

/**
 * Define prop dependencies by requiring other props.
 * @param {string[]} requiredProps An array of required prop names.
 */
export const demand = requiredProps => (props, propName, componentName) => {
  if (!Array.isArray(requiredProps)) {
    throw new Error(
      [
        'Invalid `requiredProps` argument supplied to require, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    )
  }

  // skip if prop is undefined
  if (props[propName] === undefined) return

  const missingRequired = requiredProps.filter(requiredProp => props[requiredProp] === undefined)
  if (missingRequired.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` requires props: \`${missingRequired.join(
        '`, `',
      )}\`.`,
    )
  }
}

/**
 * Ensure an multiple prop contains a string with only possible values.
 * @param {string[]} possible An array of possible values to prop.
 */
export const multipleProp = possible => (props, propName, componentName) => {
  if (!Array.isArray(possible)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  const propValue = props[propName]

  // skip if prop is undefined
  if (_.isNil(propValue) || propValue === false) return

  const values = propValue
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map(val => _.trim(val).replace('-', ' '))
  const invalid = _.difference(values, possible)

  // fail only if there are invalid values
  if (invalid.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` has invalid values: \`${invalid.join(
        '`, `',
      )}\`.`,
    )
  }
}

/**
 * Ensure a component can render as a node passed as a prop value in place of children.
 */
export const contentShorthand = (...args) =>
  every([disallow(['children']), PropTypes.node])(...args)

/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, or an element.
 */
export const itemShorthand = (...args) =>
  every([
    disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])),
    ]),
  ])(...args)

/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */
export const collectionShorthand = (...args) =>
  every([disallow(['children']), PropTypes.arrayOf(itemShorthand)])(...args)

/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param {string} help A help message to display with the deprecation warning.
 * @param {function} [validator] A propType function.
 */
export const deprecate = (help, validator) => (props, propName, componentName, ...args) => {
  if (typeof help !== 'string') {
    throw new Error(
      [
        'Invalid `help` argument supplied to deprecate, expected a string.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }

  // skip if prop is undefined
  if (props[propName] === undefined) return

  // deprecation error and help
  const error = new Error(`The \`${propName}\` prop in \`${componentName}\` is deprecated.`)
  if (help) error.message += ` ${help}`

  // add optional validation error message
  if (validator) {
    if (typeof validator === 'function') {
      const validationError = validator(props, propName, componentName, ...args)
      if (validationError) {
        error.message = `${error.message} ${validationError.message}`
      }
    } else {
      throw new Error(
        [
          'Invalid argument supplied to deprecate, expected a function.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      )
    }
  }

  return error
}
