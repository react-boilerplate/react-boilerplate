'use strict'

const parse = require('string-argv')
const npmWhich = require('npm-which')(process.cwd())
const checkPkgScripts = require('./checkPkgScripts')

const debug = require('debug')('lint-staged:find-bin')

// Find and load the package.json at the root of the project.
let pkg
try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  pkg = require(`${process.cwd()}/package.json`)
  debug('Loaded package.json using `process.cwd()`')
} catch (ignore) {
  debug('Could not load package.json using `process.cwd()`')
  pkg = {}
}

const cache = new Map()

module.exports = function findBin(cmd) {
  debug('Resolving binary for command `%s`', cmd)

  /*
   *  Try to locate the binary in node_modules/.bin and if this fails, in
   *  $PATH.
   *
   *  This allows to use linters installed for the project:
   *
   *  "lint-staged": {
   *    "*.js": "eslint"
   *  }
   */
  const [binName, ...args] = parse(cmd)

  if (cache.has(binName)) {
    debug('Resolving binary for `%s` from cache', binName)
    return { bin: cache.get(binName), args }
  }

  try {
    /* npm-which tries to resolve the bin in local node_modules/.bin */
    /* and if this fails it look in $PATH */
    const bin = npmWhich.sync(binName)
    debug('Binary for `%s` resolved to `%s`', cmd, bin)
    cache.set(binName, bin)
    return { bin, args }
  } catch (err) {
    // throw helpful error if matching script is present in package.json
    checkPkgScripts(pkg, cmd, binName, args)
    throw new Error(`${binName} could not be found. Try \`npm install ${binName}\`.`)
  }
}
