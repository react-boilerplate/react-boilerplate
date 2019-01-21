#!/usr/bin/env node

"use strict"

var program = require('commander');
var pkg = require('../package.json')

var npmWhich = require('../')

program
  .version(pkg.version)
  .option('-c, --silent', 'No output, just return 0 if any of the executables are found, or 1 if none are found.')
  .usage('<command>')
  .parse(process.argv)

if (!program.args.length) return program.help()

var cmd = program.args[0]

if (program.silent) {
  try {
    npmWhich(process.cwd()).sync(cmd)
    process.exit(0)
  } catch (e) {
    if (!e.message.match('not found:')) throw e
    process.exit(1)
  }
}

try {
  console.log(npmWhich(process.cwd()).sync(cmd))
} catch (e) {
  if (!e.message.match('not found:')) throw e
  console.error('%s not found', cmd)
}
