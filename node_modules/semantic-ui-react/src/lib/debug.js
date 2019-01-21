import _debug from 'debug'
import isBrowser from './isBrowser'

if (isBrowser() && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  // Heads Up!
  // https://github.com/visionmedia/debug/pull/331
  //
  // debug now clears storage on load, grab the debug settings before require('debug').
  // We try/catch here as Safari throws on localStorage access in private mode or with cookies disabled.
  let DEBUG
  try {
    DEBUG = window.localStorage.debug
  } catch (e) {
    /* eslint-disable no-console */
    console.error('Semantic-UI-React could not enable debug.')
    console.error(e)
    /* eslint-enable no-console */
  }

  // enable what ever settings we got from storage
  _debug.enable(DEBUG)
}

/**
 * Create a namespaced debug function.
 * @param {String} namespace Usually a component name.
 * @example
 * import { makeDebugger } from 'src/lib'
 * const debug = makeDebugger('namespace')
 *
 * debug('Some message')
 * @returns {Function}
 */
export const makeDebugger = namespace => _debug(`semanticUIReact:${namespace}`)

/**
 * Default debugger, simple log.
 * @example
 * import { debug } from 'src/lib'
 * debug('Some message')
 */
export const debug = makeDebugger('log')
