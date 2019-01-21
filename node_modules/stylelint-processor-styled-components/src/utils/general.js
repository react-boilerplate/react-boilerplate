const CssError = require('postcss/lib/css-syntax-error')
// selector count
let count = 0

/**
 * Based on https://github.com/mapbox/stylelint-processor-markdown
 * @author @davidtheclark
 * @author @sindresorhus
 */
const fixIndentation = str => {
  // Get whitespaces
  const match = str.match(/^[ \t]*(?=\S|$)/gm)

  // Handle oneline TTL case and empty line etc.
  if (!match || match.length <= 1) {
    return {
      text: str,
      indentColumns: 0
    }
  }

  // We enforce that final backtick should be at base indentation level
  const baseIndentationLength = match[match.length - 1].length
  // Remove whitespace on empty lines before reindenting
  const emptyLinesHandled = str.replace(/^[ \t]$/gm, '')
  // Normalize indentation by removing common indent
  const re = new RegExp(String.raw`^[ \t]{${baseIndentationLength}}`, 'gm')
  const reIndentedString = emptyLinesHandled.replace(re, '')
  return {
    text: reIndentedString,
    indentColumns: baseIndentationLength
  }
}

const removeBaseIndentation = str => {
  // Remove empty lines
  const emptyLinesRemoved = str.replace(/^[ \t]*$/gm, '')
  // Get whitespaces
  const match = emptyLinesRemoved.match(/^[ \t]*(?=\S|$)/gm)

  if (!match || match.length <= 1) {
    return str.trim()
  }

  const indentationLevels = match.map(indent => indent.length).filter(indent => indent > 0)
  // Math,min would return infinity if list is empty
  if (indentationLevels.length === 0) {
    return str
  }
  const baseIndentationLevel = Math.min(...indentationLevels)
  // Remove baseIndentation from string
  const regex = new RegExp(String.raw`^[ \t]{${baseIndentationLevel}}`, 'gm')
  const baseIndentationRemoved = emptyLinesRemoved.replace(regex, '')
  return baseIndentationRemoved
}

const nextNonWhitespaceChar = text => {
  const matches = text.match(/^\s*([^\s])/)
  if (matches) {
    return matches[1]
  } else {
    return null
  }
}

const reverseString = str => str.split('').reverse().join('')

const isLastDeclarationCompleted = text => {
  // We disregard all comments in this assessment of declaration completion
  const commentsRemoved = text.replace(/\/\*[\s\S]*?\*\//g, '')
  const reversedText = reverseString(commentsRemoved)
  const lastNonWhitespaceChar = nextNonWhitespaceChar(reversedText)
  if (
    lastNonWhitespaceChar === ';' ||
    lastNonWhitespaceChar === '}' ||
    lastNonWhitespaceChar === '{' ||
    lastNonWhitespaceChar === null
  ) {
    return true
  } else {
    return false
  }
}

// eslint-disable-next-line no-return-assign
const wrapSelector = content => `.selector${(count += 1)} {${content}}\n`
const wrapKeyframes = content => `@keyframes {${content}}\n`

/**
 * The reason we put a \s before .* in the last part of the regex is to make sure we don't
 * match stylelint-disable-line and stylelint-disable-next-line or, for now, any future extensions
 * as these line specific disables should not be placed outside a css TTL
 */
const isStylelintComment = comment => /^\s*stylelint-(?:enable|disable)(?:\s.*)?$/.test(comment)

const extrapolateShortenedCommand = (commands, shortCommand, absolutePath, location) => {
  let extrapolatedCommand = null
  // We use .some so we can break the loop using return true
  commands.some(singleCommand => {
    if (singleCommand.substr(0, shortCommand.length) === shortCommand) {
      if (extrapolatedCommand === null) {
        // This is the first time we found a match
        extrapolatedCommand = singleCommand
      } else {
        // We have already found another command which means this is not a unique short command.
        // This will probably never throw, as all our current commands start with different letters
        throw new CssError(
          'You shortened a Styled Components interpolation tag ambiguously, add a few more characters to fix this error',
          location.line,
          location.column,
          undefined,
          absolutePath
        )
      }
    }
    // continue loop
    return false
  })
  return extrapolatedCommand
}

exports.wrapKeyframes = wrapKeyframes
exports.wrapSelector = wrapSelector
exports.fixIndentation = fixIndentation
exports.reverseString = reverseString
exports.nextNonWhitespaceChar = nextNonWhitespaceChar
exports.isLastDeclarationCompleted = isLastDeclarationCompleted
exports.isStylelintComment = isStylelintComment
exports.extrapolateShortenedCommand = extrapolateShortenedCommand
exports.removeBaseIndentation = removeBaseIndentation
