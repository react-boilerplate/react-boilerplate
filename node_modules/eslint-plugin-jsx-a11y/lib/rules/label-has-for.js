'use strict';

var _jsxAstUtils = require('jsx-ast-utils');

var _schemas = require('../util/schemas');

var _hasAccessibleChild = require('../util/hasAccessibleChild');

var _hasAccessibleChild2 = _interopRequireDefault(_hasAccessibleChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorMessage = 'Form label must have associated control'; /**
                                                               * @fileoverview Enforce label tags have htmlFor attribute.
                                                               * @author Ethan Cohen
                                                               */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

var enumValues = ['nesting', 'id'];
var schema = {
  type: 'object',
  properties: {
    components: _schemas.arraySchema,
    required: {
      oneOf: [{ type: 'string', enum: enumValues }, (0, _schemas.generateObjSchema)({ some: (0, _schemas.enumArraySchema)(enumValues) }, ['some']), (0, _schemas.generateObjSchema)({ every: (0, _schemas.enumArraySchema)(enumValues) }, ['every'])]
    },
    allowChildren: { type: 'boolean' }
  }
};

var validateNesting = function validateNesting(node) {
  return node.parent.children.some(function (child) {
    return child.type === 'JSXElement';
  });
};

var validateId = function validateId(node) {
  var htmlForAttr = (0, _jsxAstUtils.getProp)(node.attributes, 'htmlFor');
  var htmlForValue = (0, _jsxAstUtils.getPropValue)(htmlForAttr);

  return htmlForAttr !== false && !!htmlForValue;
};

var validate = function validate(node, required, allowChildren) {
  if (allowChildren === true) {
    return (0, _hasAccessibleChild2.default)(node.parent);
  }
  if (required === 'nesting') {
    return validateNesting(node);
  }
  return validateId(node);
};

var isValid = function isValid(node, required, allowChildren) {
  if (Array.isArray(required.some)) {
    return required.some.some(function (rule) {
      return validate(node, rule, allowChildren);
    });
  } else if (Array.isArray(required.every)) {
    return required.every.every(function (rule) {
      return validate(node, rule, allowChildren);
    });
  }

  return validate(node, required, allowChildren);
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },

  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var options = context.options[0] || {};
        var componentOptions = options.components || [];
        var typesToValidate = ['label'].concat(componentOptions);
        var nodeType = (0, _jsxAstUtils.elementType)(node);

        // Only check 'label' elements and custom types.
        if (typesToValidate.indexOf(nodeType) === -1) {
          return;
        }

        var required = options.required || { every: ['nesting', 'id'] };
        var allowChildren = options.allowChildren || false;

        if (!isValid(node, required, allowChildren)) {
          context.report({
            node: node,
            message: errorMessage
          });
        }
      }
    };
  }
};