/*
EXPERIMENTAL

const sameContents = (arrayA, arrayB) => arrayA === arrayB || (arrayA.length === arrayB.length && arrayA.every((valueA, index) => valueA === arrayB[ index ]))

const generate = (field, tree = {}, values = {}, path = '', createField, createArray) => {
  const [ all, key, rest ] = /([^.]+)\.?(.+)?/.exec(field) // eslint-disable-line no-unused-vars
  if (/.+\[\]/.test(key)) {
    // is array key
    const noBrackets = key.substring(0, key.length - 2)
    const valuesArray = values[ noBrackets ]
    if (valuesArray && !Array.isArray(valuesArray)) {
      throw new Error(`Expected array value for ${path}${field}, but found ${typeof array}: ${JSON.stringify(valuesArray)}`)
    }
    const treeArray = tree[ noBrackets ] || []
    const results = []
    if (valuesArray) {
      if (rest) {
        valuesArray.forEach((value, index) => {
          results[ index ] = generate(rest, treeArray[ index ], value, `${path}${noBrackets}[${index}].`, createField, createArray)
        })
      } else {
        valuesArray.forEach((value, index) => {
          const fieldKey = `${path}${noBrackets}[${index}]`
          results[ index ] = !treeArray[ index ] || treeArray[ index ].key !== fieldKey ?
            createField(fieldKey) : treeArray[ index ]
        })
      }
    }
    const arrayKey = `${path}${noBrackets}`
    if (!tree[ noBrackets ] || !sameContents(treeArray, results) || treeArray.key !== arrayKey) {
      return {
        ...tree,
        [noBrackets]: createArray(arrayKey, results)
      }
    }
  } else if (rest) {
    // need to recurse
    const result = generate(rest, tree[ key ], values[ key ], `${path}${key}.`, createField, createArray)
    if (!tree[ key ] || tree[ key ] !== result) {
      return {
        ...tree,
        [key]: result
      }
    }
  } else {
    // value key
    const fieldKey = `${path}${key}`
    const existing = tree[ key ]
    if (!existing || existing.key !== fieldKey) {
      return {
        ...tree,
        [key]: createField(fieldKey)
      }
    }
  }
  return tree
}
 */

/**
 * Generates a tree of field objects
 *
 * @param fields The fields array passed to redux-form
 * @param tree The existing field tree
 * @param values The form values from the Redux store
 * @param createField A callback to create a field object
 * @param createArray A callback to create a field array
 */

/*
 EXPERIMENTAL

const generateFields = (fields = [], tree = {}, values, createField, createArray) =>
  fields.reduce((accumulator, field) =>
      generate(field, accumulator, values, undefined, createField, createArray),
    tree)

export default generateFields
*/
"use strict";