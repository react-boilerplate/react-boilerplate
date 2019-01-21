/**
 * @fileoverview Enforce propTypes declarations alphabetical sorting
 */
'use strict';

const variableUtil = require('../util/variable');
const propsUtil = require('../util/props');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce propTypes declarations alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        requiredFirst: {
          type: 'boolean'
        },
        callbacksLast: {
          type: 'boolean'
        },
        ignoreCase: {
          type: 'boolean'
        },
        sortShapeProp: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();
    const configuration = context.options[0] || {};
    const requiredFirst = configuration.requiredFirst || false;
    const callbacksLast = configuration.callbacksLast || false;
    const ignoreCase = configuration.ignoreCase || false;
    const sortShapeProp = configuration.sortShapeProp || false;
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);

    function getKey(node) {
      return sourceCode.getText(node.key || node.argument);
    }

    function getValueName(node) {
      return node.type === 'Property' && node.value.property && node.value.property.name;
    }

    function isCallbackPropName(propName) {
      return /^on[A-Z]/.test(propName);
    }

    function isRequiredProp(node) {
      return getValueName(node) === 'isRequired';
    }

    function isShapeProp(node) {
      return Boolean(
        node && node.callee && node.callee.property && node.callee.property.name === 'shape'
      );
    }

    /**
     * Checks if propTypes declarations are sorted
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkSorted(declarations) {
      // Declarations will be `undefined` if the `shape` is not a literal. For
      // example, if it is a propType imported from another file.
      if (!declarations) {
        return;
      }

      declarations.reduce((prev, curr, idx, decls) => {
        if (curr.type === 'ExperimentalSpreadProperty' || curr.type === 'SpreadElement') {
          return decls[idx + 1];
        }

        let prevPropName = getKey(prev);
        let currentPropName = getKey(curr);
        const previousIsRequired = isRequiredProp(prev);
        const currentIsRequired = isRequiredProp(curr);
        const previousIsCallback = isCallbackPropName(prevPropName);
        const currentIsCallback = isCallbackPropName(currentPropName);

        if (ignoreCase) {
          prevPropName = prevPropName.toLowerCase();
          currentPropName = currentPropName.toLowerCase();
        }

        if (requiredFirst) {
          if (previousIsRequired && !currentIsRequired) {
            // Transition between required and non-required. Don't compare for alphabetical.
            return curr;
          }
          if (!previousIsRequired && currentIsRequired) {
            // Encountered a non-required prop after a required prop
            context.report({
              node: curr,
              message: 'Required prop types must be listed before all other prop types'
            });
            return curr;
          }
        }

        if (callbacksLast) {
          if (!previousIsCallback && currentIsCallback) {
            // Entering the callback prop section
            return curr;
          }
          if (previousIsCallback && !currentIsCallback) {
            // Encountered a non-callback prop after a callback prop
            context.report({
              node: prev,
              message: 'Callback prop types must be listed after all other prop types'
            });
            return prev;
          }
        }

        if (currentPropName < prevPropName) {
          context.report({
            node: curr,
            message: 'Prop types declarations should be sorted alphabetically'
          });
          return prev;
        }

        return curr;
      }, declarations[0]);
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkSorted(node.properties);
          break;
        case 'Identifier':
          const propTypesObject = variableUtil.findVariableByName(context, node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkSorted(propTypesObject.properties);
          }
          break;
        case 'CallExpression':
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperFunctions.has(node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        default:
          break;
      }
    }

    return {
      CallExpression: function(node) {
        if (!sortShapeProp || !isShapeProp(node) || (!node.arguments && !node.arguments[0])) {
          return;
        }
        checkSorted(node.arguments[0].properties);
      },

      ClassProperty: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        checkNode(node.value);
      },

      MemberExpression: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        checkNode(node.parent.right);
      },

      ObjectExpression: function(node) {
        node.properties.forEach(property => {
          if (!property.key) {
            return;
          }

          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          if (property.value.type === 'ObjectExpression') {
            checkSorted(property.value.properties);
          }
        });
      }

    };
  }
};
