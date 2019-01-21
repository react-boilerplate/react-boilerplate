'use strict'

const findParentDir = require('find-parent-dir')

module.exports = function resolveGitDir() {
  return findParentDir.sync(process.cwd(), '.git')
}
