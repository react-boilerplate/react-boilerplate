/**
 * @fileoverview Enforce component methods order
 * @author Yannick Croissant
 */
'use strict';

const has = require('has');
const util = require('util');

const Components = require('../util/Components');
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');

const defaultConfig = {
  order: [
    'static-methods',
    'lifecycle',
    'everything-else',
    'render'
  ],
  groups: {
    lifecycle: [
      'displayName',
      'propTypes',
      'contextTypes',
      'childContextTypes',
      'mixins',
      'statics',
      'defaultProps',
      'constructor',
      'getDefaultProps',
      'state',
      'getInitialState',
      'getChildContext',
      'getDerivedStateFromProps',
      'componentWillMount',
      'UNSAFE_componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'UNSAFE_componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'UNSAFE_componentWillUpdate',
      'getSnapshotBeforeUpdate',
      'componentDidUpdate',
      'componentDidCatch',
      'componentWillUnmount'
    ]
  }
};

/**
 * Get the methods order from the default config and the user config
 * @param {Object} userConfig The user configuration.
 * @returns {Array} Methods order
 */
function getMethodsOrder(userConfig) {
  userConfig = userConfig || {};

  const groups = util._extend(defaultConfig.groups, userConfig.groups);
  const order = userConfig.order || defaultConfig.order;

  let config = [];
  let entry;
  for (let i = 0, j = order.length; i < j; i++) {
    entry = order[i];
    if (has(groups, entry)) {
      config = config.concat(groups[entry]);
    } else {
      config.push(entry);
    }
  }

  return config;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce component methods order',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-comp')
    },

    schema: [{
      type: 'object',
      properties: {
        order: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        groups: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const errors = {};

    const MISPOSITION_MESSAGE = '{{propA}} should be placed {{position}} {{propB}}';

    const methodsOrder = getMethodsOrder(context.options[0]);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    const regExpRegExp = /\/(.*)\/([g|y|i|m]*)/;

    /**
     * Get indexes of the matching patterns in methods order configuration
     * @param {Object} method - Method metadata.
     * @returns {Array} The matching patterns indexes. Return [Infinity] if there is no match.
     */
    function getRefPropIndexes(method) {
      let isRegExp;
      let matching;
      let i;
      let j;
      const indexes = [];

      if (method.getter) {
        const getterIndex = methodsOrder.indexOf('getters');
        if (getterIndex >= 0) {
          indexes.push(getterIndex);
        }
      }

      if (method.setter) {
        const setterIndex = methodsOrder.indexOf('setters');
        if (setterIndex >= 0) {
          indexes.push(setterIndex);
        }
      }

      if (method.typeAnnotation) {
        const annotationIndex = methodsOrder.indexOf('type-annotations');
        if (annotationIndex >= 0) {
          indexes.push(annotationIndex);
        }
      }

      if (indexes.length === 0) {
        for (i = 0, j = methodsOrder.length; i < j; i++) {
          isRegExp = methodsOrder[i].match(regExpRegExp);
          if (isRegExp) {
            matching = new RegExp(isRegExp[1], isRegExp[2]).test(method.name);
          } else {
            matching = methodsOrder[i] === method.name;
          }
          if (matching) {
            indexes.push(i);
          }
        }
      }

      if (indexes.length === 0 && method.static) {
        const staticIndex = methodsOrder.indexOf('static-methods');
        if (staticIndex >= 0) {
          indexes.push(staticIndex);
        }
      }

      if (indexes.length === 0 && method.instanceVariable) {
        const annotationIndex = methodsOrder.indexOf('instance-variables');
        if (annotationIndex >= 0) {
          indexes.push(annotationIndex);
        }
      }

      if (indexes.length === 0 && method.instanceMethod) {
        const annotationIndex = methodsOrder.indexOf('instance-methods');
        if (annotationIndex >= 0) {
          indexes.push(annotationIndex);
        }
      }

      // No matching pattern, return 'everything-else' index
      if (indexes.length === 0) {
        for (i = 0, j = methodsOrder.length; i < j; i++) {
          if (methodsOrder[i] === 'everything-else') {
            indexes.push(i);
            break;
          }
        }
      }

      // No matching pattern and no 'everything-else' group
      if (indexes.length === 0) {
        indexes.push(Infinity);
      }

      return indexes;
    }

    /**
     * Get properties name
     * @param {Object} node - Property.
     * @returns {String} Property name.
     */
    function getPropertyName(node) {
      if (node.kind === 'get') {
        return 'getter functions';
      }

      if (node.kind === 'set') {
        return 'setter functions';
      }

      return astUtil.getPropertyName(node);
    }

    /**
     * Store a new error in the error list
     * @param {Object} propA - Mispositioned property.
     * @param {Object} propB - Reference property.
     */
    function storeError(propA, propB) {
      // Initialize the error object if needed
      if (!errors[propA.index]) {
        errors[propA.index] = {
          node: propA.node,
          score: 0,
          closest: {
            distance: Infinity,
            ref: {
              node: null,
              index: 0
            }
          }
        };
      }
      // Increment the prop score
      errors[propA.index].score++;
      // Stop here if we already have pushed another node at this position
      if (getPropertyName(errors[propA.index].node) !== getPropertyName(propA.node)) {
        return;
      }
      // Stop here if we already have a closer reference
      if (Math.abs(propA.index - propB.index) > errors[propA.index].closest.distance) {
        return;
      }
      // Update the closest reference
      errors[propA.index].closest.distance = Math.abs(propA.index - propB.index);
      errors[propA.index].closest.ref.node = propB.node;
      errors[propA.index].closest.ref.index = propB.index;
    }

    /**
     * Dedupe errors, only keep the ones with the highest score and delete the others
     */
    function dedupeErrors() {
      for (const i in errors) {
        if (!has(errors, i)) {
          continue;
        }
        const index = errors[i].closest.ref.index;
        if (!errors[index]) {
          continue;
        }
        if (errors[i].score > errors[index].score) {
          delete errors[index];
        } else {
          delete errors[i];
        }
      }
    }

    /**
     * Report errors
     */
    function reportErrors() {
      dedupeErrors();

      let nodeA;
      let nodeB;
      let indexA;
      let indexB;
      for (const i in errors) {
        if (!has(errors, i)) {
          continue;
        }

        nodeA = errors[i].node;
        nodeB = errors[i].closest.ref.node;
        indexA = i;
        indexB = errors[i].closest.ref.index;

        context.report({
          node: nodeA,
          message: MISPOSITION_MESSAGE,
          data: {
            propA: getPropertyName(nodeA),
            propB: getPropertyName(nodeB),
            position: indexA < indexB ? 'before' : 'after'
          }
        });
      }
    }

    /**
     * Compare two properties and find out if they are in the right order
     * @param {Array} propertiesInfos Array containing all the properties metadata.
     * @param {Object} propA First property name and metadata
     * @param {Object} propB Second property name.
     * @returns {Object} Object containing a correct true/false flag and the correct indexes for the two properties.
     */
    function comparePropsOrder(propertiesInfos, propA, propB) {
      let i;
      let j;
      let k;
      let l;
      let refIndexA;
      let refIndexB;

      // Get references indexes (the correct position) for given properties
      const refIndexesA = getRefPropIndexes(propA);
      const refIndexesB = getRefPropIndexes(propB);

      // Get current indexes for given properties
      const classIndexA = propertiesInfos.indexOf(propA);
      const classIndexB = propertiesInfos.indexOf(propB);

      // Loop around the references indexes for the 1st property
      for (i = 0, j = refIndexesA.length; i < j; i++) {
        refIndexA = refIndexesA[i];

        // Loop around the properties for the 2nd property (for comparison)
        for (k = 0, l = refIndexesB.length; k < l; k++) {
          refIndexB = refIndexesB[k];

          if (
            // Comparing the same properties
            refIndexA === refIndexB ||
            // 1st property is placed before the 2nd one in reference and in current component
            refIndexA < refIndexB && classIndexA < classIndexB ||
            // 1st property is placed after the 2nd one in reference and in current component
            refIndexA > refIndexB && classIndexA > classIndexB
          ) {
            return {
              correct: true,
              indexA: classIndexA,
              indexB: classIndexB
            };
          }
        }
      }

      // We did not find any correct match between reference and current component
      return {
        correct: false,
        indexA: refIndexA,
        indexB: refIndexB
      };
    }

    /**
     * Check properties order from a properties list and store the eventual errors
     * @param {Array} properties Array containing all the properties.
     */
    function checkPropsOrder(properties) {
      const propertiesInfos = properties.map(node => ({
        name: getPropertyName(node),
        getter: node.kind === 'get',
        setter: node.kind === 'set',
        static: node.static,
        instanceVariable: !node.static &&
          node.type === 'ClassProperty' &&
          node.value &&
          node.value.type !== 'ArrowFunctionExpression' &&
          node.value.type !== 'FunctionExpression',
        instanceMethod: !node.static &&
          node.type === 'ClassProperty' &&
          node.value &&
          (node.value.type === 'ArrowFunctionExpression' ||
            node.value.type === 'FunctionExpression'),
        typeAnnotation: !!node.typeAnnotation && node.value === null
      }));

      let i;
      let j;
      let k;
      let l;
      let propA;
      let propB;
      let order;

      // Loop around the properties
      for (i = 0, j = propertiesInfos.length; i < j; i++) {
        propA = propertiesInfos[i];

        // Loop around the properties a second time (for comparison)
        for (k = 0, l = propertiesInfos.length; k < l; k++) {
          propB = propertiesInfos[k];

          // Compare the properties order
          order = comparePropsOrder(propertiesInfos, propA, propB);

          // Continue to next comparison is order is correct
          if (order.correct === true) {
            continue;
          }

          // Store an error if the order is incorrect
          storeError({
            node: properties[i],
            index: order.indexA
          }, {
            node: properties[k],
            index: order.indexB
          });
        }
      }
    }

    return {
      'Program:exit': function() {
        const list = components.list();
        for (const component in list) {
          if (!has(list, component)) {
            continue;
          }
          const properties = astUtil.getComponentProperties(list[component].node);
          checkPropsOrder(properties);
        }

        reportErrors();
      }
    };
  }),

  defaultConfig
};
