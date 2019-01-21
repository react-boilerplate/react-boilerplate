'use strict'

const path = require('path')
const micromatch = require('micromatch')
const pathIsInside = require('path-is-inside')
const { getConfig } = require('./getConfig')
const resolveGitDir = require('./resolveGitDir')

const debug = require('debug')('lint-staged:gen-tasks')

module.exports = function generateTasks(config, stagedRelFiles) {
  debug('Generating linter tasks')

  const normalizedConfig = getConfig(config) // Ensure we have a normalized config
  const { linters, globOptions } = normalizedConfig
  const ignorePatterns = normalizedConfig.ignore.map(pattern => `!${pattern}`)

  const gitDir = resolveGitDir()
  const cwd = process.cwd()
  const stagedFiles = stagedRelFiles.map(file => path.resolve(gitDir, file))

  return Object.keys(linters).map(pattern => {
    const isParentDirPattern = pattern.startsWith('../')
    const patterns = [pattern].concat(ignorePatterns)
    const commands = linters[pattern]

    const fileList = micromatch(
      stagedFiles
        // Only worry about children of the CWD unless the pattern explicitly
        // specifies that it concerns a parent directory.
        .filter(file => isParentDirPattern || pathIsInside(file, cwd))
        // Make the paths relative to CWD for filtering
        .map(file => path.relative(cwd, file)),
      patterns,
      globOptions
    )
      // Return absolute path after the filter is run
      .map(file => path.resolve(cwd, file))

    const task = { pattern, commands, fileList }
    debug('Generated task: \n%O', task)

    return task
  })
}
