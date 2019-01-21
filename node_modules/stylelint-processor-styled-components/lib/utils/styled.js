'use strict';

var path = require('path');
var isTaggedTemplateLiteral = require('./tagged-template-literal').isTaggedTemplateLiteral;

/**
 * Check if something is a styled-components import declaration
 */
var isStyledImport = function isStyledImport(node, moduleName) {
  return node.type === 'ImportDeclaration' && path.basename(node.source.value) === moduleName;
};

/**
 * Check if something is a styled shorthand call
 * e.g. styled.div``
 *
 * TODO Lint that the tagname exists
 */
var isStyledShorthand = function isStyledShorthand(node, styledVariableName) {
  return (
    // Check that it's an object
    node.tag && node.tag.object &&
    // Check that the object matches the imported name
    node.tag.object.name === styledVariableName &&
    // Check that a property exists, otherwise it's just styled
    // without any call
    node.tag.property
  );
};

/**
 * Check if a node is a styld call
 * e.g. styled(Component)`` or styled('tagname')``
 */
var isStyledCall = function isStyledCall(node, styledVariableName) {
  return (
    // Check that it's a function call
    node.tag && node.tag.callee &&
    // And that the function name matches the imported name
    node.tag.callee.name === styledVariableName
  );
};

/**
 * Check if it has a .attrs postfix which we in that case handle specially
 */
var hasAttrsCall = function hasAttrsCall(node) {
  return (
    // Check that it's a function call
    node.tag && node.tag.callee &&
    // Check that the last member of the call is attrs
    node.tag.callee.property && node.tag.callee.property.name === 'attrs'
  );
};

// We don't need the checks here as they were checked in hasAttrsCall
var getAttrsObject = function getAttrsObject(node) {
  return node.tag.callee.object;
};

/**
 * Check if something is a styled component call
 */
var isStyled = function isStyled(node, styledVariableName) {
  return isTaggedTemplateLiteral(node) && (isStyledCall(node, styledVariableName) || isStyledShorthand(node, styledVariableName));
};

/**
 * Check if it is a .extend call and we pretty reasonable assume that any TTL that ends
 * in a .extend must be a styled components call as there is no way to check if it was
 * called on a Styled Component
 */
var isExtendCall = function isExtendCall(node) {
  return node.tag && node.tag.property && node.tag.property.name === 'extend';
};

/**
 * Check if something is a call to one of our helper methods
 *
 * Returns either a string (the name of the helper) or false
 */
var isHelper = function isHelper(node, importedNames) {
  if (!isTaggedTemplateLiteral(node)) return false;
  var helper = void 0;
  Object.keys(importedNames).forEach(function (name) {
    if (importedNames[name] === node.tag.name) {
      helper = name;
      // eslint-disable-next-line no-useless-return
      return;
    }
  });
  return helper || false;
};

exports.isStyledImport = isStyledImport;
exports.isStyledShorthand = isStyledShorthand;
exports.isStyledCall = isStyledCall;
exports.isStyled = isStyled;
exports.isHelper = isHelper;
exports.hasAttrsCall = hasAttrsCall;
exports.getAttrsObject = getAttrsObject;
exports.isExtendCall = isExtendCall;