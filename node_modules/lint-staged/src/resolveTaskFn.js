'use strict'

const chunk = require('lodash/chunk')
const dedent = require('dedent')
const isWindows = require('is-windows')
const execa = require('execa')
const symbols = require('log-symbols')
const pMap = require('p-map')
const calcChunkSize = require('./calcChunkSize')
const findBin = require('./findBin')

const debug = require('debug')('lint-staged:task')

/**
 * Execute the given linter binary with arguments and file paths using execa and
 * return the promise.
 *
 * @param {string} bin
 * @param {Array<string>} args
 * @param {Object} execaOptions
 * @param {Array<string>} pathsToLint
 * @return {Promise}
 */
function execLinter(bin, args, execaOptions, pathsToLint) {
  const binArgs = args.concat(pathsToLint)

  debug('bin:', bin)
  debug('args: %O', binArgs)
  debug('opts: %o', execaOptions)

  return execa(bin, binArgs, Object.assign({}, execaOptions))
}

const successMsg = linter => `${symbols.success} ${linter} passed!`

/**
 * Create and returns an error instance with given stdout and stderr. If we set
 * the message on the error instance, it gets logged multiple times(see #142).
 * So we set the actual error message in a private field and extract it later,
 * log only once.
 *
 * @param {string} linter
 * @param {string} errStdout
 * @param {string} errStderr
 * @returns {Error}
 */
function makeErr(linter, errStdout, errStderr) {
  const err = new Error()
  err.privateMsg = dedent`
    ${symbols.error} "${linter}" found some errors. Please fix them and try committing again.
    ${errStdout}
    ${errStderr}
  `
  return err
}

/**
 * Returns the task function for the linter. It handles chunking for file paths
 * if the OS is Windows.
 *
 * @param {Object} options
 * @param {string} options.linter
 * @param {string} options.gitDir
 * @param {Array<string>} options.pathsToLint
 * @param {number} options.chunkSize
 * @param {number} options.subTaskConcurrency
 * @returns {function(): Promise<string>}
 */
module.exports = function resolveTaskFn(options) {
  const { linter, gitDir, pathsToLint } = options
  const { bin, args } = findBin(linter)

  const execaOptions = { reject: false }
  // Only use gitDir as CWD if we are using the git binary
  // e.g `npm` should run tasks in the actual CWD
  if (/git(\.exe)?$/i.test(bin) && gitDir !== process.cwd()) {
    execaOptions.cwd = gitDir
  }

  if (!isWindows()) {
    debug('%s  OS: %s; File path chunking unnecessary', symbols.success, process.platform)
    return () =>
      execLinter(bin, args, execaOptions, pathsToLint).then(result => {
        if (!result.failed) return successMsg(linter)

        throw makeErr(linter, result.stdout, result.stderr)
      })
  }

  const { chunkSize, subTaskConcurrency: concurrency } = options

  const filePathChunks = chunk(pathsToLint, calcChunkSize(pathsToLint, chunkSize))
  const mapper = execLinter.bind(null, bin, args, execaOptions)

  debug(
    'OS: %s; Creating linter task with %d chunked file paths',
    process.platform,
    filePathChunks.length
  )
  return () =>
    pMap(filePathChunks, mapper, { concurrency })
      .catch(err => {
        /* This will probably never be called. But just in case.. */
        throw new Error(dedent`
        ${symbols.error} ${linter} got an unexpected error.
        ${err.message}
      `)
      })
      .then(results => {
        const errors = results.filter(res => res.failed)
        if (errors.length === 0) return successMsg(linter)

        const errStdout = errors.map(err => err.stdout).join('')
        const errStderr = errors.map(err => err.stderr).join('')

        throw makeErr(linter, errStdout, errStderr)
      })
}
