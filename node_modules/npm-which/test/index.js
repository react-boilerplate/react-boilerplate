"use strict"

var test = require('tape')

var path = require('path')
var join = path.join

var npmWhich = require('../')

var level0 = join(__dirname, 'fixtures', 'level0')
var level1 = join(level0, 'node_modules', 'level1')
var level2 = join(level1, 'node_modules', 'level2')

var LEVEL = [level0, level1, level2]

var BINPATH_FOR_LEVEL = LEVEL.map(function(levelPath) {
  return join(levelPath, "node_modules", ".bin")
})

var before = process.env.PATH

test('includes all .bin dirs in all parent node_modules folders', function(t) {
  t.test('no nesting', function(t) {
    var level1Bin = npmWhich(LEVEL[0]).sync('level1')
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
    t.end()
  })

  t.test('nesting', function(t) {
    var which = npmWhich(LEVEL[1])
    var level1Bin = which.sync('level1')
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
    var level2Bin = which.sync('level2')
    t.equal(level2Bin, join(BINPATH_FOR_LEVEL[1], 'level2'), 'got level2 path')
    t.end()
  })

  t.test('more nesting', function(t) {
    var which = npmWhich(LEVEL[1])
    var level1Bin = which.sync('level1')
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
    var level2Bin = which.sync('level2')
    t.equal(level2Bin, join(BINPATH_FOR_LEVEL[1], 'level2'), 'got level2 path')
    t.end()
  })

  t.end()
})

test('which.sync requires a cwd', function(t) {
  t.throws(function() {
    npmWhich().sync('level1')
  })
  t.end()
})

test('which.sync requires a cwd, can be supplied in options', function(t) {
  var level1Bin = npmWhich().sync('level1', {cwd: LEVEL[0]})
  t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
  t.end()
})

test('which requires a cwd', function(t) {
  npmWhich()('level1', function(err) {
    t.ok(err)
    t.end()
  })
})

test('which can be curried', function(t) {
  var which = npmWhich(LEVEL[0])('level1')
  which(function(err, level1Bin) {
    t.ifError(err)
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
    t.end()
  })
})

test('which can be curried, options overridden', function(t) {
  var which = npmWhich(LEVEL[1])('level1')
  which({cwd: LEVEL[0]}, function(err, level1Bin) {
    t.ifError(err)
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
  })
  t.end()
})

test('which can be curried with sync', function(t) {
  var which = npmWhich(LEVEL[0])('level1')
  var level1Bin = which.sync()
  t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
  t.end()
})

test('which can be curried with sync, options overridden', function(t) {
  var which = npmWhich(LEVEL[1])('level1')
  var level1Bin = which.sync({cwd: LEVEL[0]})
  t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
  t.end()
})

test('which requires a cwd, can be supplied in options', function(t) {
  npmWhich()('level1', {cwd: LEVEL[0]}, function(err, level1Bin) {
    t.ifError(err)
    t.equal(level1Bin, join(BINPATH_FOR_LEVEL[0], 'level1'), 'got level1 path')
    t.end()
  })
})

test('cwd can be overridden in options', function(t) {
  npmWhich(LEVEL[0])('level2', {cwd: LEVEL[1]}, function(err, level2Bin) {
    t.ifError(err)
    t.equal(level2Bin, join(BINPATH_FOR_LEVEL[1], 'level2'), 'got level2 path')
    t.end()
  })
})

test('which.sync does not mutate PATH', function(t) {
  npmWhich(__dirname).sync('level1', {env: {PATH: BINPATH_FOR_LEVEL[0]}})
  var after = process.env.PATH
  t.deepEqual(after, before, 'PATH unmodified')
  t.end()
})

test('which.sync does not mutate PATH after failed find', function(t) {
  t.throws(function() {
    npmWhich(__dirname).sync('asdasd', {env: {PATH: BINPATH_FOR_LEVEL[0]}})
  })
  var after = process.env.PATH
  t.deepEqual(after, before, 'PATH unmodified')
  t.end()
})

test('which does not mutate PATH', function(t) {
  var level1Bin = npmWhich(__dirname)('level1', {env: {PATH: BINPATH_FOR_LEVEL[0]}}, function(err) {
    t.ifError(err)
    var after = process.env.PATH
    t.deepEqual(after, before, 'PATH unmodified')
    t.end()
  })
})

test('which does not mutate PATH after failed find', function(t) {
  npmWhich('asdasdb/jhbhj')('asdasd', function(err) {
    t.ok(err)
    var after = process.env.PATH
    t.deepEqual(after, before, 'PATH unmodified')
    t.end()
  })
})

test('can find path with bad cwd', function(t) {
  npmWhich('/asdasdb/jhbhj')('node', function(err, path) {
    t.ifError(err)
    t.ok(path)
    t.equal(path.split('/').pop(), 'node')
    var after = process.env.PATH
    t.deepEqual(after, before, 'PATH unmodified')
    t.end()
  })
})

test('which does not mutate PATH with bad cmd & cwd', function(t) {
  npmWhich('asdasdb/jhbhj')('asdasd', function(err) {
    t.ok(err)
    var after = process.env.PATH
    t.deepEqual(after, before, 'PATH unmodified')
    t.end()
  })
})

test('which.sync on default export will error without cwd', function(t) {
  t.throws(function() {
    npmWhich.sync('level1')
  })
  t.end()
})

if (process.version.indexOf('v0.10') !== -1) {
  // can't test this on 0.11 as process.platform is (rightfully) read-only
  test('which does not mutate PATH with bad cwd/cmd on "windows"', function(t) {
    var actualPlatform = process.platform
    process.platform = "win32"
    npmWhich('asdasdb/jhbhj')('asdasd', function(err) {
      process.platform = actualPlatform
      t.ok(err)
      var after = process.env.PATH
      t.deepEqual(after, before, 'PATH unmodified')
      t.end()
    })
  })
}



// Ensure old 1.0.0 tests function, except for the breakages.
require('./1.0.0-interface')
