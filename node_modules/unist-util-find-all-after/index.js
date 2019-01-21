'use strict'

var is = require('unist-util-is')

module.exports = findAllAfter

/* Find nodes after `index` in `parent` which pass `test`. */
function findAllAfter(parent, index, test) {
  var results = []
  var children
  var child
  var length

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node')
  }

  children = parent.children
  length = children.length

  if (index && index.type) {
    index = children.indexOf(index)
  }

  if (isNaN(index) || index < 0 || index === Infinity) {
    throw new Error('Expected positive finite index or child node')
  }

  while (++index < length) {
    child = children[index]

    if (is(test, child, index, parent)) {
      results.push(child)
    }
  }

  return results
}
