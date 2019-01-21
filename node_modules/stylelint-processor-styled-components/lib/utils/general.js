'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CssError = require('postcss/lib/css-syntax-error');
// selector count
var count = 0;

/**
 * Based on https://github.com/mapbox/stylelint-processor-markdown
 * @author @davidtheclark
 * @author @sindresorhus
 */
var fixIndentation = function fixIndentation(str) {
  // Get whitespaces
  var match = str.match(/^[ \t]*(?=\S|$)/gm);

  // Handle oneline TTL case and empty line etc.
  if (!match || match.length <= 1) {
    return {
      text: str,
      indentColumns: 0
    };
  }

  // We enforce that final backtick should be at base indentation level
  var baseIndentationLength = match[match.length - 1].length;
  // Remove whitespace on empty lines before reindenting
  var emptyLinesHandled = str.replace(/^[ \t]$/gm, '');
  // Normalize indentation by removing common indent
  var re = new RegExp(String.raw`^[ \t]{${baseIndentationLength}}`, 'gm');
  var reIndentedString = emptyLinesHandled.replace(re, '');
  return {
    text: reIndentedString,
    indentColumns: baseIndentationLength
  };
};

var removeBaseIndentation = function removeBaseIndentation(str) {
  // Remove empty lines
  var emptyLinesRemoved = str.replace(/^[ \t]*$/gm, '');
  // Get whitespaces
  var match = emptyLinesRemoved.match(/^[ \t]*(?=\S|$)/gm);

  if (!match || match.length <= 1) {
    return str.trim();
  }

  var indentationLevels = match.map(function (indent) {
    return indent.length;
  }).filter(function (indent) {
    return indent > 0;
  });
  // Math,min would return infinity if list is empty
  if (indentationLevels.length === 0) {
    return str;
  }
  var baseIndentationLevel = Math.min.apply(Math, _toConsumableArray(indentationLevels));
  // Remove baseIndentation from string
  var regex = new RegExp(String.raw`^[ \t]{${baseIndentationLevel}}`, 'gm');
  var baseIndentationRemoved = emptyLinesRemoved.replace(regex, '');
  return baseIndentationRemoved;
};

var nextNonWhitespaceChar = function nextNonWhitespaceChar(text) {
  var matches = text.match(/^\s*([^\s])/);
  if (matches) {
    return matches[1];
  } else {
    return null;
  }
};

var reverseString = function reverseString(str) {
  return str.split('').reverse().join('');
};

var isLastDeclarationCompleted = function isLastDeclarationCompleted(text) {
  // We disregard all comments in this assessment of declaration completion
  var commentsRemoved = text.replace(/\/\*[\s\S]*?\*\//g, '');
  var reversedText = reverseString(commentsRemoved);
  var lastNonWhitespaceChar = nextNonWhitespaceChar(reversedText);
  if (lastNonWhitespaceChar === ';' || lastNonWhitespaceChar === '}' || lastNonWhitespaceChar === '{' || lastNonWhitespaceChar === null) {
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line no-return-assign
var wrapSelector = function wrapSelector(content) {
  return `.selector${count += 1} {${content}}\n`;
};
var wrapKeyframes = function wrapKeyframes(content) {
  return `@keyframes {${content}}\n`;
};

/**
 * The reason we put a \s before .* in the last part of the regex is to make sure we don't
 * match stylelint-disable-line and stylelint-disable-next-line or, for now, any future extensions
 * as these line specific disables should not be placed outside a css TTL
 */
var isStylelintComment = function isStylelintComment(comment) {
  return (/^\s*stylelint-(?:enable|disable)(?:\s.*)?$/.test(comment)
  );
};

var extrapolateShortenedCommand = function extrapolateShortenedCommand(commands, shortCommand, absolutePath, location) {
  var extrapolatedCommand = null;
  // We use .some so we can break the loop using return true
  commands.some(function (singleCommand) {
    if (singleCommand.substr(0, shortCommand.length) === shortCommand) {
      if (extrapolatedCommand === null) {
        // This is the first time we found a match
        extrapolatedCommand = singleCommand;
      } else {
        // We have already found another command which means this is not a unique short command.
        // This will probably never throw, as all our current commands start with different letters
        throw new CssError('You shortened a Styled Components interpolation tag ambiguously, add a few more characters to fix this error', location.line, location.column, undefined, absolutePath);
      }
    }
    // continue loop
    return false;
  });
  return extrapolatedCommand;
};

exports.wrapKeyframes = wrapKeyframes;
exports.wrapSelector = wrapSelector;
exports.fixIndentation = fixIndentation;
exports.reverseString = reverseString;
exports.nextNonWhitespaceChar = nextNonWhitespaceChar;
exports.isLastDeclarationCompleted = isLastDeclarationCompleted;
exports.isStylelintComment = isStylelintComment;
exports.extrapolateShortenedCommand = extrapolateShortenedCommand;
exports.removeBaseIndentation = removeBaseIndentation;