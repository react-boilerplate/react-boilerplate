"use strict"

var which = require('which')
var npmPath = require('npm-path')

module.exports = function(cwd) {
  function npmWhich(cmd, options, fn) {
    // options is optional
    if (options instanceof Function) fn = options, options = null
    options = options || {}
    options.cwd = options.cwd || cwd
    options.env = options.env || process.env

    function curryWhich(opts, fn) {
      if (opts instanceof Function) fn = opts, opts = null
      opts = opts || {}
      return npmWhich(cmd, mixin(opts, options), fn)
    }

    curryWhich.sync = function(opts) {
      opts = opts || {}
      return npmWhich.sync(cmd, mixin(opts, options))
    }

    if (!(typeof fn === 'function')) return curryWhich

    if (!options.cwd) return fn(new Error('You must specify a cwd.'))

    npmPath.get(options, function(err, newPath) {
      if (err) return fn(err)
      var oldPath = process.env[npmPath.PATH]
      process.env[npmPath.PATH] = newPath
      which(cmd, function(err, result) {
        process.env[npmPath.PATH] = oldPath
        fn(err, result)
      })
    })
  }

  npmWhich.sync = function(cmd, options) {

    options = options || {}
    options.cwd = options.cwd || cwd
    options.env = options.env || process.env

    if (!options.cwd) throw new Error('You must specify a cwd.')
    var err = null
    try {
      var oldPath = process.env[npmPath.PATH]
      var newPath = npmPath.getSync(options)
      process.env[npmPath.PATH] = newPath
      var result = which.sync(cmd)
      return result
    } catch(e) {
      err = e
    } finally {
      process.env[npmPath.PATH] = oldPath
      if (err) throw err
    }
    return result
  }

  if (arguments.length <= 1) return npmWhich
  return module.exports().apply(this, arguments)
}

module.exports.sync = function(cmd, options) {
  options = options || {}
  return module.exports(options.cwd).sync(cmd, options)
}

function mixin(a, b) {
  for (var key in b) {
    a[key] = b[key]
  }
  return a
}
