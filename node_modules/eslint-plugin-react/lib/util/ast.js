/**
 * @fileoverview Utility functions for AST
 */
'use strict';

/**
 * Find a return statment in the current node
 *
 * @param {ASTNode} ASTnode The AST node being checked
 */
function findReturnStatement(node) {
  if (
    (!node.value || !node.value.body || !node.value.body.body) &&
    (!node.body || !node.body.body)
  ) {
    return false;
  }

  const bodyNodes = (node.value ? node.value.body.body : node.body.body);

  let i = bodyNodes.length - 1;
  for (; i >= 0; i--) {
    if (bodyNodes[i].type === 'ReturnStatement') {
      return bodyNodes[i];
    }
  }
  return false;
}

/**
 * Get properties name
 * @param {Object} node - Property.
 * @returns {String} Property name.
 */
function getPropertyName(node) {
  if (node.key || ['MethodDefinition', 'Property'].indexOf(node.type) !== -1) {
    return node.key.name;
  } else if (node.type === 'MemberExpression') {
    return node.property.name;
  }
  return '';
}

/**
 * Get properties for a given AST node
 * @param {ASTNode} node The AST node being checked.
 * @returns {Array} Properties array.
 */
function getComponentProperties(node) {
  switch (node.type) {
    case 'ClassDeclaration':
    case 'ClassExpression':
      return node.body.body;
    case 'ObjectExpression':
      // return node.properties;
      return node.properties;
    default:
      return [];
  }
}

/**
     * Checks if the node is the first in its line, excluding whitespace.
     * @param {Object} context The node to check
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the first node in its line
     */
function isNodeFirstInLine(context, node) {
  const sourceCode = context.getSourceCode();
  let token = node;
  let lines;
  do {
    token = sourceCode.getTokenBefore(token);
    lines = token.type === 'JSXText'
      ? token.value.split('\n')
      : null;
  } while (
    token.type === 'JSXText' &&
        /^\s*$/.test(lines[lines.length - 1])
  );

  const startLine = node.loc.start.line;
  const endLine = token ? token.loc.end.line : -1;
  return startLine !== endLine;
}


module.exports = {
  findReturnStatement: findReturnStatement,
  getPropertyName: getPropertyName,
  getComponentProperties: getComponentProperties,
  isNodeFirstInLine: isNodeFirstInLine
};
