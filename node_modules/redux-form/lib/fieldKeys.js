/**
EXPERIMENTAL
 
function* generate(field, values, path = '') {
  const [ , key, rest ] = /([^.]+)\.?(.+)?/.exec(field)

  if (/.+\[\]/.test(key)) {
    // is array key
    const noBrackets = key.substring(0, key.length - 2)
    const array = values && values[ noBrackets ]
    if (array && !Array.isArray(array)) {
      throw new Error(`Expected array value for ${path}${field}, but found ${typeof array}: ${JSON.stringify(array)}`)
    }
    if (array) {
      if (rest) {
        for (let index in array) {
          yield * generate(rest, array[ index ], `${path}${noBrackets}[${index}].`)
        }
      } else {
        for (let index in array) {
          yield `${path}${noBrackets}[${index}]`
        }
      }
    } else {
      yield `${path}${key}`
    }
  } else if (rest) {
    // need to recurse
    yield * generate(rest, values && values[ key ], `${path}${key}.`)
  } else {
    // value key
    yield `${path}${key}`
  }
}
*/

/**
 * Iterates over all the fields specified by a fields array and store values.
 *
 * @param fields The fields array given to redux-form
 * @param values The current values of the form in the Redux store
 */

/**
 EXPERIMENTAL

 export default function* fieldKeys(fields = [], values = {}) {
  for (let field of fields) {
    yield * generate(field, values)
  }
}
*/
"use strict";