/**
 * @fileoverview Prevent usage of setState in lifecycle methods
 * @author Yannick Croissant
 */
'use strict';

const docsUrl = require('./docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function makeNoMethodSetStateRule(methodName) {
  return {
    meta: {
      docs: {
        description: `Prevent usage of setState in ${methodName}`,
        category: 'Best Practices',
        recommended: false,
        url: docsUrl(methodName)
      },

      schema: [{
        enum: ['disallow-in-func']
      }]
    },

    create: function(context) {
      const mode = context.options[0] || 'allow-in-func';

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {

        CallExpression: function(node) {
          const callee = node.callee;
          if (
            callee.type !== 'MemberExpression' ||
            callee.object.type !== 'ThisExpression' ||
            callee.property.name !== 'setState'
          ) {
            return;
          }
          const ancestors = context.getAncestors(callee).reverse();
          let depth = 0;
          for (let i = 0, j = ancestors.length; i < j; i++) {
            if (/Function(Expression|Declaration)$/.test(ancestors[i].type)) {
              depth++;
            }
            if (
              (ancestors[i].type !== 'Property' && ancestors[i].type !== 'MethodDefinition') ||
              ancestors[i].key.name !== methodName ||
              (mode !== 'disallow-in-func' && depth > 1)
            ) {
              continue;
            }
            context.report({
              node: callee,
              message: `Do not use setState in ${methodName}`
            });
            break;
          }
        }
      };
    }
  };
}

module.exports = makeNoMethodSetStateRule;
