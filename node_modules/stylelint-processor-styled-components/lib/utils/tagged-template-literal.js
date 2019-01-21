'use strict';

var CssError = require('postcss/lib/css-syntax-error');
var nextNonWhitespaceChar = require('./general').nextNonWhitespaceChar;
var isLastDeclarationCompleted = require('./general').isLastDeclarationCompleted;
var extrapolateShortenedCommand = require('./general').extrapolateShortenedCommand;

/**
 * Check if a node is a tagged template literal
 */
var isTaggedTemplateLiteral = function isTaggedTemplateLiteral(node) {
  return node.type === 'TaggedTemplateExpression';
};

/**
 * Check if a tagged template literal has interpolations
 */
var hasInterpolations = function hasInterpolations(node) {
  return !node.quasi.quasis[0].tail;
};

/**
 * Retrieves all the starting and ending comments of a TTL expression
 */
var retrieveStartEndComments = function retrieveStartEndComments(expression) {
  return (expression.leadingComments || []).concat(expression.trailingComments || []);
};

/**
 * Checks if given comment value is an interpolation tag
 */
var isScTag = function isScTag(comment) {
  return (/^\s*?sc-[a-z]/.test(comment)
  );
};

/**
 * Checks if an interpolation has an sc comment tag
 */
var hasInterpolationTag = function hasInterpolationTag(expression) {
  var relevantComments = retrieveStartEndComments(expression).map(function (commentObject) {
    return commentObject.value;
  });
  return relevantComments.some(isScTag);
};

var extractScTagInformation = function extractScTagInformation(comment) {
  var matchArray = comment.match(/^\s*?sc-([a-z]+)\s*(?:(?:'(.*?)')|(?:"(.*?)"))?\s*$/);
  if (matchArray === null) {
    return null;
  }
  return {
    command: matchArray[1],
    // This is only cared about if command is custom
    customPlaceholder: matchArray[2] || matchArray[3]
  };
};

var interpolationTagAPI = ['block', 'selector', 'declaration', 'property', 'value', 'custom'];
/**
 * Enact the interpolation tagging API
 */
var parseInterpolationTag = function parseInterpolationTag(expression, id, absolutePath) {
  var relevantComments = retrieveStartEndComments(expression);
  var substitute = void 0;
  relevantComments.some(function (comment) {
    if (isScTag(comment.value)) {
      // We always assume that there is only one sc tag in an interpolation
      var scTagInformation = extractScTagInformation(comment.value);
      if (scTagInformation === null) {
        throw new CssError('We were unable to parse your Styled Components interpolation tag, this is most likely due to lack of quotes in an sc-custom tag, refer to the documentation for correct format', comment.loc.start.line, comment.loc.start.column, undefined, absolutePath);
      }
      scTagInformation.command = extrapolateShortenedCommand(interpolationTagAPI, scTagInformation.command, absolutePath, comment.loc.start);
      switch (scTagInformation.command) {
        case 'selector':
          substitute = 'div';
          break;

        case 'block':
        case 'declaration':
          substitute = `-styled-mixin${id}: dummyValue;`;
          break;

        case 'property':
          substitute = `-styled-mixin${id}`;
          break;

        case 'value':
          substitute = '$dummyValue';
          break;

        case 'custom':
          substitute = scTagInformation.customPlaceholder;
          break;

        default:
          throw new CssError('You tagged a Styled Components interpolation with an invalid sc- tag. Refer to the documentation to see valid interpolation tags', comment.loc.start.line, comment.loc.start.column, undefined, absolutePath);
      }
      return true; // Break loop
    }
    return false; // Continue loop
  });
  return substitute;
};

/**
 * Merges the interpolations in a parsed tagged template literals with the strings
 */
var interleave = function interleave(quasis, expressions, absolutePath) {
  // Used for making sure our dummy mixins are all unique
  var count = 0;
  var css = '';
  for (var i = 0, l = expressions.length; i < l; i += 1) {
    var prevText = quasis[i].value.raw;
    var nextText = quasis[i + 1].value.raw;

    css += prevText;
    var substitute = void 0;
    if (hasInterpolationTag(expressions[i])) {
      substitute = parseInterpolationTag(expressions[i], count, absolutePath);
      count += 1;
    } else if (isLastDeclarationCompleted(css)) {
      // No sc tag so we guess defaults
      /** This block assumes that if you put an interpolation in the position
       * of the start of a declaration that the interpolation will
       * contain a full declaration and not later in the template literal
       * be completed by another interpolation / completed by following text
       * in the literal
       */
      substitute = `-styled-mixin${count}: dummyValue`;
      count += 1;
      if (nextNonWhitespaceChar(nextText) !== ';') {
        substitute += ';';
      }
    } else {
      /* This block assumes that we are in the middle of a declaration
       * and that the interpolation is providing a value, not a property
       * or part of a property
       */
      substitute = '$dummyValue';
    }
    // Make sure substituted by same count of lines
    var targetLines = quasis[i + 1].loc.start.line - quasis[i].loc.end.line + 1;
    var currentLines = substitute.split('\n').length;
    while (currentLines < targetLines) {
      substitute += '\n/* dummyComment */';
      currentLines += 1;
    }

    css += substitute;
  }
  css += quasis[quasis.length - 1].value.raw;
  return css;
};

/**
 * Get the content of a tagged template literal
 *
 * TODO Cover edge cases
 */
var getTaggedTemplateLiteralContent = function getTaggedTemplateLiteralContent(node, absolutePath) {
  if (hasInterpolations(node)) {
    return interleave(node.quasi.quasis, node.quasi.expressions, absolutePath);
  } else {
    return node.quasi.quasis[0].value.raw;
  }
};

exports.isTaggedTemplateLiteral = isTaggedTemplateLiteral;
exports.getTaggedTemplateLiteralContent = getTaggedTemplateLiteralContent;
exports.interleave = interleave;
exports.hasInterpolationTag = hasInterpolationTag;
exports.parseInterpolationTag = parseInterpolationTag;
exports.extractScTagInformation = extractScTagInformation;