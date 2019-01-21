'use strict'

const test = require('tape')

const path = require('path')
const fs = require('fs')
const os = require('os')

const which = require('which')

const npmPath = require('../')

const SEP = npmPath.SEPARATOR
const PATH = npmPath.PATH

const level0 = path.join(__dirname, 'fixture', 'level0')
const level1 = path.join(level0, 'node_modules', 'level1')
const level2 = path.join(level1, 'node_modules', 'level2')

const level = [level0, level1, level2]
const binPath = level.map(function (levelPath) {
  return path.join(levelPath, 'node_modules', '.bin')
})

test('exports separator', function (t) {
  t.ok(npmPath.SEPARATOR)
  t.end()
})

test('exports $PATH key', function (t) {
  t.ok(npmPath.PATH)
  t.end()
})

test('includes current node executable dir', function (t) {
  const level0Path = npmPath.getSync({cwd: level0})
  t.notEqual(level0Path.indexOf(path.dirname(process.execPath) + SEP), -1)
  t.end()
})

test('async version works', function (t) {
  let isAsync = false
  npmPath.get({cwd: level0}, function (err, level0Path) {
    t.ifError(err)
    t.ok(isAsync)
    t.notEqual(level0Path.indexOf(path.dirname(process.execPath) + SEP), -1)
    t.end()
  })
  isAsync = true // can only be set if above callback not synchronous
})

test('no fn == sync', function (t) {
  const level0Path = npmPath.get({cwd: level0})
  t.notEqual(level0Path.indexOf(path.dirname(process.execPath) + SEP), -1)
  t.end()
})

test('sync options is optional', function (t) {
  const newPath = npmPath.get()
  t.notEqual(newPath.indexOf(path.dirname(process.execPath) + SEP), -1)
  t.end()
})

test('async options is optional', function (t) {
  let isAsync = false
  npmPath.get(function (err, newPath) {
    t.ifError(err)
    t.notEqual(newPath.indexOf(path.dirname(process.execPath) + SEP), -1)
    t.ok(isAsync)
    t.end()
  })
  isAsync = true // can only be set if above callback not synchronous
})

test('includes bin from sibling dirs', { skip: true }, function (t) {
  t.test('from existing sibling directory', function (t) {
    const level1Path = npmPath.getSync({cwd: path.join(level[0], 'test')})
    t.notEqual(level1Path.indexOf(binPath[0] + SEP), -1, 'should include level 0 .bin')
    t.equal(level1Path.indexOf(binPath[2] + SEP), -1, 'should not include child paths')
    t.end()
  })

  t.test('from existing sibling directory async', function (t) {
    npmPath({cwd: path.join(level[0], 'test')}, function (err, level1Path) {
      t.ifError(err)
      t.notEqual(level1Path.indexOf(binPath[0] + SEP), -1, 'should include level 0 .bin')
      t.equal(level1Path.indexOf(binPath[2] + SEP), -1, 'should not include child paths')
      t.end()
    })
  })
})

test('includes all .bin dirs in all parent node_modules folders', function (t) {
  t.test('no nesting', function (t) {
    const level0Path = npmPath.getSync({cwd: level[0]})
    t.notEqual(level0Path.indexOf(binPath[0] + SEP), -1, 'should include level 0 .bin')
    t.equal(level0Path.indexOf(binPath[1] + SEP), -1, 'should not include child paths')
    t.equal(level0Path.indexOf(binPath[2] + SEP), -1, 'should not include child paths')
    t.end()
  })

  t.test('1 level of nesting', function (t) {
    const level1Path = npmPath.getSync({cwd: level[1]})
    t.notEqual(level1Path.indexOf(binPath[0] + SEP), -1, 'should include level 0 .bin')
    t.notEqual(level1Path.indexOf(binPath[1] + SEP), -1, 'should include level 1 .bin')
    t.equal(level1Path.indexOf(binPath[2] + SEP), -1, 'should not include child paths')
    t.end()
  })

  t.test('2 levels of nesting', function (t) {
    const level1Path = npmPath.getSync({cwd: level[2]})
    t.notEqual(level1Path.indexOf(binPath[0] + SEP), -1, 'should include level 0 .bin')
    t.notEqual(level1Path.indexOf(binPath[1] + SEP), -1, 'should include level 1 .bin')
    t.notEqual(level1Path.indexOf(binPath[2] + SEP), -1, 'should include level 2 .bin')
    t.end()
  })

  t.end()
})

test('handles directories with node_modules in the name', function (t) {
  const trickyL0 = level[0].replace('level0', 'level0_node_modules')
  const trickyL1 = level[1].replace('level0', 'level0_node_modules')
  const trickyL2 = level[2].replace('level0', 'level0_node_modules')

  t.test('no nesting', function (t) {
    const level0Path = npmPath.getSync({cwd: trickyL0})
    t.notEqual(level0Path.indexOf(path.join(trickyL0, 'node_modules', '.bin') + SEP), -1, 'should include level 0 .bin')
    t.end()
  })

  t.test('1 level of nesting', function (t) {
    const level1Path = npmPath.getSync({cwd: trickyL1})

    t.notEqual(level1Path.indexOf(path.join(trickyL0, 'node_modules', '.bin') + SEP), -1, 'should include level 0 .bin')
    t.notEqual(level1Path.indexOf(path.join(trickyL1, 'node_modules', '.bin') + SEP), -1, 'should include level 1 .bin')
    t.end()
  })

  t.test('2 levels of nesting', function (t) {
    const level2Path = npmPath.getSync({cwd: trickyL2})

    t.notEqual(level2Path.indexOf(path.join(trickyL0, 'node_modules', '.bin') + SEP), -1, 'should include level 0 .bin')
    t.notEqual(level2Path.indexOf(path.join(trickyL1, 'node_modules', '.bin') + SEP), -1, 'should include level 1 .bin')
    t.notEqual(level2Path.indexOf(path.join(trickyL2, 'node_modules', '.bin') + SEP), -1, 'should include level 1 .bin')
    t.end()
  })

  t.end()
})

test('can set path', function (t) {
  const oldPath = process.env[PATH]
  npmPath.set.sync()
  const newPath = process.env[PATH]
  t.notDeepEqual(oldPath, newPath)
  process.env[PATH] = oldPath
  t.end()
})

test('includes node-gyp bundled with current npm', { skip: true }, function (t) {
  const oldPath = process.env[PATH]
  npmPath()
  const newGypPath = which.sync('node-gyp')
  t.ok(newGypPath)
  t.ok(fs.existsSync(newGypPath))
  t.notEqual(newGypPath.indexOf(path.join('npm', 'bin', 'node-gyp-bin') + SEP), -1)
  process.env[PATH] = oldPath
  t.end()
})

test('remove duplicated entries', function (t) {
  const pathWithDuplicates = '/bin:/sbin:/bin'

  const newPath = npmPath({env: {PATH: pathWithDuplicates}}).split(':')

  // Set size is equal to array length if there are no duplicates
  t.equal(newPath.length, (new Set(newPath)).size)

  t.end()
})

test('can set path to npm root to use for node-gyp lookup', { skip: true }, function (t) {
  const oldPath = process.env[PATH]
  const pathToNpm = path.resolve(
    fs.realpathSync(which.sync('npm')),
    '..',
    '..'
  )

  const tmpFile = path.join(os.tmpdir(), 'npm-path-custom-npm')
  try {
    fs.unlinkSync(tmpFile)
  } catch (err) {
    err // ignore
  }

  fs.linkSync(pathToNpm, tmpFile)
  const newPath = npmPath.get({
    npm: tmpFile
  })
  t.notEqual(newPath.indexOf(path.join(tmpFile, 'bin', 'node-gyp-bin') + SEP), -1)
  process.env[PATH] = oldPath
  fs.unlinkSync(tmpFile)
  t.end()
})

test('error if passing bad path to npm root', { skip: true }, function (t) {
  const oldPath = process.env[PATH]

  const tmpFile = path.join(os.tmpdir(), 'npm-path-custom-npm')
  try {
    fs.unlinkSync(tmpFile)
  } catch (err) {
    err // ignore
  }
  t.throws(() => {
    npmPath.get({
      npm: tmpFile
    })
  })
  process.env[PATH] = oldPath
  t.end()
})

test('no error if no npm on existing path', function (t) {
  const oldPath = process.env[PATH]

  process.env[PATH] = ''

  const newPath = npmPath.get()

  t.equal(newPath.indexOf(path.join('bin', 'node-gyp-bin') + SEP), -1)

  process.env[PATH] = oldPath
  t.end()
})

