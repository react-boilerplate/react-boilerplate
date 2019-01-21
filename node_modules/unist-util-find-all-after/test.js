'use strict'

var assert = require('assert')
var test = require('tape')
var remark = require('remark')
var findAllAfter = require('.')

var tree = remark().parse('Some *emphasis*, **importance**, and `code`.')
var paragraph = tree.children[0]
var children = paragraph.children

test('unist-util-find-all-after', function(t) {
  t.throws(
    function() {
      findAllAfter()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  t.throws(
    function() {
      findAllAfter({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  t.doesNotThrow(function() {
    assert.throws(function() {
      findAllAfter({type: 'foo', children: []})
    }, /Expected positive finite index or child node/)

    assert.throws(function() {
      findAllAfter({type: 'foo', children: []}, -1)
    }, /Expected positive finite index or child node/)

    assert.throws(function() {
      findAllAfter({type: 'foo', children: []}, {type: 'bar'})
    }, /Expected positive finite index or child node/)
  }, 'should fail without index')

  t.doesNotThrow(function() {
    assert.throws(function() {
      findAllAfter(
        {
          type: 'foo',
          children: [{type: 'bar'}, {type: 'baz'}]
        },
        0,
        false
      )
    }, /Expected function, string, or object as test/)

    assert.throws(function() {
      findAllAfter(
        {
          type: 'foo',
          children: [{type: 'bar'}, {type: 'baz'}]
        },
        0,
        true
      )
    }, /Expected function, string, or object as test/)
  }, 'should fail for invalid `test`')

  t.doesNotThrow(function() {
    var res = children.slice(2)

    assert.deepEqual(findAllAfter(paragraph, children[1]), res)
    assert.deepEqual(findAllAfter(paragraph, 1), res)
    assert.deepEqual(findAllAfter(paragraph, 7), [])
  }, 'should return the following node when without `test`')

  t.doesNotThrow(function() {
    assert.deepEqual(findAllAfter(paragraph, 0, children[6]), [children[6]])
    assert.deepEqual(findAllAfter(paragraph, children[0], children[1]), [
      children[1]
    ])
    assert.deepEqual(findAllAfter(paragraph, 0, children[1]), [children[1]])
    assert.deepEqual(findAllAfter(paragraph, children[0], children[0]), [])
    assert.deepEqual(findAllAfter(paragraph, 0, children[0]), [])
    assert.deepEqual(findAllAfter(paragraph, 1, children[1]), [])
  }, 'should return `node` when given a `node` and existing')

  t.doesNotThrow(function() {
    assert.deepEqual(findAllAfter(paragraph, 0, 'strong'), [children[3]])
    assert.deepEqual(findAllAfter(paragraph, 3, 'strong'), [])
    assert.deepEqual(findAllAfter(paragraph, children[0], 'strong'), [
      children[3]
    ])
    assert.deepEqual(findAllAfter(paragraph, children[3], 'strong'), [])
  }, 'should return a child when given a `type` and existing')

  t.doesNotThrow(function() {
    var res = children.slice(5)

    assert.deepEqual(findAllAfter(paragraph, 0, test), res)
    assert.deepEqual(findAllAfter(paragraph, 6, test), [])
    assert.deepEqual(findAllAfter(paragraph, children[4], test), res)
    assert.deepEqual(findAllAfter(paragraph, children[6], test), [])

    function test(node, n) {
      return n >= 5
    }
  }, 'should return a child when given a `test` and existing')

  t.end()
})
