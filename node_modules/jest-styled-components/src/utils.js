const css = require('css')
const { ServerStyleSheet, isStyledComponent } = require('styled-components')

let StyleSheet

/* eslint-disable */
if (!!isStyledComponent) {
  const secretInternals = require('styled-components')
    .__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS

  if (
    secretInternals === undefined ||
    secretInternals.StyleSheet === undefined
  ) {
    throw new Error(
      'Could neither find styled-components secret internals nor styled-components/lib/models/StyleSheet.js'
    )
  } else {
    StyleSheet = secretInternals.StyleSheet
  }
} else {
  StyleSheet = require('styled-components/lib/models/StyleSheet').default
}
/* eslint-enable */

const isServer = () => typeof document === 'undefined'

const resetStyleSheet = () => StyleSheet.reset(isServer())

const getHTML = () =>
  isServer()
    ? new ServerStyleSheet().getStyleTags()
    : StyleSheet.instance.toHTML()

const extract = regex => {
  let style = ''
  let matches

  while ((matches = regex.exec(getHTML())) !== null) {
    style += `${matches[1]} `
  }

  return style.trim()
}

const getStyle = () => extract(/<style[^>]*>([^<]*)</g)

const getCSS = () => css.parse(getStyle())

const getClassNames = () =>
  extract(/data-styled-components="([^"]*)"/g).split(/\s/)

const getComponentIDs = () =>
  extract(/sc-component-id: ([^\\*\\/]*) \*\//g).split(/\s/)

const getHashes = () =>
  getClassNames()
    .concat(getComponentIDs())
    .filter(Boolean)

module.exports = {
  resetStyleSheet,
  getCSS,
  getHashes,
}
