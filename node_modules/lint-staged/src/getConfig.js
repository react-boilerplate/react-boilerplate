/* eslint no-prototype-builtins: 0 */

'use strict'

const chalk = require('chalk')
const format = require('stringify-object')
const intersection = require('lodash/intersection')
const defaultsDeep = require('lodash/defaultsDeep')
const isObject = require('lodash/isObject')
const { validate, logValidationWarning } = require('jest-validate')
const { unknownOptionWarning } = require('jest-validate/build/warnings')
const isGlob = require('is-glob')

const debug = require('debug')('lint-staged:cfg')

/**
 * Default config object
 *
 * @type {{concurrent: boolean, chunkSize: number, globOptions: {matchBase: boolean, dot: boolean}, linters: {}, subTaskConcurrency: number, renderer: string}}
 */
const defaultConfig = {
  concurrent: true,
  chunkSize: Number.MAX_SAFE_INTEGER,
  globOptions: {
    matchBase: true,
    dot: true
  },
  linters: {},
  ignore: [],
  subTaskConcurrency: 1,
  renderer: 'update'
}

/**
 * Check if the config is "simple" i.e. doesn't contains any of full config keys
 *
 * @param config
 * @returns {boolean}
 */
function isSimple(config) {
  return (
    isObject(config) &&
    !config.hasOwnProperty('linters') &&
    intersection(Object.keys(defaultConfig), Object.keys(config)).length === 0
  )
}

/**
 * Custom jest-validate reporter for unknown options
 * @param config
 * @param example
 * @param option
 * @param options
 * @returns {void}
 */
function unknownValidationReporter(config, example, option, options) {
  /**
   * If the unkonwn property is a glob this is probably
   * a typical mistake of mixing simple and advanced configs
   */
  if (isGlob(option)) {
    // prettier-ignore
    const message = `  Unknown option ${chalk.bold(`"${option}"`)} with value ${chalk.bold(
    format(config[option], { inlineCharacterLimit: Number.POSITIVE_INFINITY })
  )} was found in the config root.

  You are probably trying to mix simple and advanced config formats. Adding

  ${chalk.bold(`"linters": {
    "${option}": ${JSON.stringify(config[option])}
  }`)}

  will fix it and remove this message.`

    const { comment } = options
    const name = options.title.warning
    return logValidationWarning(name, message, comment)
  }
  // If it is not glob pattern, use default jest-validate reporter
  return unknownOptionWarning(config, example, option, options)
}

/**
 * For a given configuration object that we retrive from .lintstagedrc or package.json
 * construct a full configuration with all options set.
 *
 * This is a bit tricky since we support 2 different syntxes: simple and full
 * For simple config, only the `linters` configuration is provided.
 *
 * @param {Object} sourceConfig
 * @returns {{
 *  concurrent: boolean, chunkSize: number, globOptions: {matchBase: boolean, dot: boolean}, linters: {}, subTaskConcurrency: number, renderer: string
 * }}
 */
function getConfig(sourceConfig, debugMode) {
  debug('Normalizing config')
  const config = defaultsDeep(
    {}, // Do not mutate sourceConfig!!!
    isSimple(sourceConfig) ? { linters: sourceConfig } : sourceConfig,
    defaultConfig
  )

  // Check if renderer is set in sourceConfig and if not, set accordingly to verbose
  if (isObject(sourceConfig) && !sourceConfig.hasOwnProperty('renderer')) {
    config.renderer = debugMode ? 'verbose' : 'update'
  }

  return config
}

const optRmMsg = (opt, helpMsg) => `  Option ${chalk.bold(opt)} was removed.

  ${helpMsg}

  Please remove ${chalk.bold(opt)} from your configuration.`

/**
 * Runs config validation. Throws error if the config is not valid.
 * @param config {Object}
 * @returns config {Object}
 */
function validateConfig(config) {
  debug('Validating config')
  const exampleConfig = Object.assign({}, defaultConfig, {
    linters: {
      '*.js': ['eslint --fix', 'git add'],
      '*.css': 'stylelint'
    }
  })

  const deprecatedConfig = {
    gitDir: () => optRmMsg('gitDir', "lint-staged now automatically resolves '.git' directory."),
    verbose: () =>
      optRmMsg('verbose', `Use the command line flag ${chalk.bold('--debug')} instead.`)
  }

  validate(config, {
    exampleConfig,
    deprecatedConfig,
    unknown: unknownValidationReporter,
    recursive: false,
    comment:
      'Please refer to https://github.com/okonet/lint-staged#configuration for more information...'
  })

  return config
}

module.exports = {
  getConfig,
  validateConfig
}
