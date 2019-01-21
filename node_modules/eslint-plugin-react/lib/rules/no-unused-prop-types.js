/**
 * @fileoverview Prevent definitions of unused prop types
 * @author Evgueni Naverniouk
 */
'use strict';

// As for exceptions for props.children or props.className (and alike) look at
// https://github.com/yannickcr/eslint-plugin-react/issues/7

const has = require('has');
const Components = require('../util/Components');
const variable = require('../util/variable');
const annotations = require('../util/annotations');
const versionUtil = require('../util/version');
const propsUtil = require('../util/props');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DIRECT_PROPS_REGEX = /^props\s*(\.|\[)/;
const DIRECT_NEXT_PROPS_REGEX = /^nextProps\s*(\.|\[)/;
const DIRECT_PREV_PROPS_REGEX = /^prevProps\s*(\.|\[)/;
const LIFE_CYCLE_METHODS = ['componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate'];
const ASYNC_SAFE_LIFE_CYCLE_METHODS = ['getDerivedStateFromProps', 'getSnapshotBeforeUpdate', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definitions of unused prop types',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        customValidators: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        skipShapeProps: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const defaults = {skipShapeProps: true};
    const sourceCode = context.getSourceCode();
    const configuration = Object.assign({}, defaults, context.options[0] || {});
    const skipShapeProps = configuration.skipShapeProps;
    const customValidators = configuration.customValidators || [];
    const propWrapperFunctions = new Set(context.settings.propWrapperFunctions || []);
    const checkAsyncSafeLifeCycles = versionUtil.testReactVersion(context, '16.3.0');

    // Used to track the type annotations in scope.
    // Necessary because babel's scopes do not track type annotations.
    let stack = null;

    const UNUSED_MESSAGE = '\'{{name}}\' PropType is defined but prop is never used';

    /**
     * Helper for accessing the current scope in the stack.
     * @param {string} key The name of the identifier to access. If omitted, returns the full scope.
     * @param {ASTNode} value If provided sets the new value for the identifier.
     * @returns {Object|ASTNode} Either the whole scope or the ASTNode associated with the given identifier.
     */
    function typeScope(key, value) {
      if (arguments.length === 0) {
        return stack[stack.length - 1];
      } else if (arguments.length === 1) {
        return stack[stack.length - 1][key];
      }
      stack[stack.length - 1][key] = value;
      return value;
    }

    /**
     * Check if we are in a lifecycle method
     * @return {boolean} true if we are in a class constructor, false if not
     **/
    function inLifeCycleMethod() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.key) {
          const name = scope.block.parent.key.name;

          if (LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
            return true;
          } else if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
            return true;
          }
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Check if the current node is in a setState updater method
     * @return {boolean} true if we are in a setState updater, false if not
     */
    function inSetStateUpdater() {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent
          && scope.block.parent.type === 'CallExpression'
          && scope.block.parent.callee.property
          && scope.block.parent.callee.property.name === 'setState'
          // Make sure we are in the updater not the callback
          && scope.block.parent.arguments[0].start === scope.block.start
        ) {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    function isPropArgumentInSetStateUpdater(node) {
      let scope = context.getScope();
      while (scope) {
        if (
          scope.block && scope.block.parent
          && scope.block.parent.type === 'CallExpression'
          && scope.block.parent.callee.property
          && scope.block.parent.callee.property.name === 'setState'
          // Make sure we are in the updater not the callback
          && scope.block.parent.arguments[0].start === scope.block.start
          && scope.block.parent.arguments[0].params
          && scope.block.parent.arguments[0].params.length > 1
        ) {
          return scope.block.parent.arguments[0].params[1].name === node.object.name;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Checks if we are using a prop
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using a prop, false if not.
     */
    function isPropTypesUsage(node) {
      const isClassUsage = (
        (utils.getParentES6Component() || utils.getParentES5Component()) &&
        ((node.object.type === 'ThisExpression' && node.property.name === 'props')
        || isPropArgumentInSetStateUpdater(node))
      );
      const isStatelessFunctionUsage = node.object.name === 'props';
      return isClassUsage || isStatelessFunctionUsage || inLifeCycleMethod();
    }

    /**
     * Checks if we are declaring a `props` class property with a flow type annotation.
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node is a type annotated props declaration, false if not.
     */
    function isAnnotatedClassPropsDeclaration(node) {
      if (node && node.type === 'ClassProperty') {
        const tokens = context.getFirstTokens(node, 2);
        if (
          node.typeAnnotation && (
            tokens[0].value === 'props' ||
            (tokens[1] && tokens[1].value === 'props')
          )
        ) {
          return true;
        }
      }
      return false;
    }

    /**
     * Resolve the type annotation for a given class declaration node with superTypeParameters.
     *
     * @param {ASTNode} node The annotation or a node containing the type annotation.
     * @returns {ASTNode} The resolved type annotation for the node.
     */
    function resolveSuperParameterPropsType(node) {
      let propsParameterPosition;
      try {
        // Flow <=0.52 had 3 required TypedParameters of which the second one is the Props.
        // Flow >=0.53 has 2 optional TypedParameters of which the first one is the Props.
        propsParameterPosition = versionUtil.testFlowVersion(context, '0.53.0') ? 0 : 1;
      } catch (e) {
        // In case there is no flow version defined, we can safely assume that when there are 3 Props we are dealing with version <= 0.52
        propsParameterPosition = node.superTypeParameters.params.length <= 2 ? 0 : 1;
      }

      let annotation = node.superTypeParameters.params[propsParameterPosition];
      while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
        annotation = annotation.typeAnnotation;
      }
      if (annotation.type === 'GenericTypeAnnotation' && typeScope(annotation.id.name)) {
        return typeScope(annotation.id.name);
      }
      return annotation;
    }

    /**
     * Checks if we are declaring a props as a generic type in a flow-annotated class.
     *
     * @param {ASTNode} node  the AST node being checked.
     * @returns {Boolean} True if the node is a class with generic prop types, false if not.
     */
    function isSuperTypeParameterPropsDeclaration(node) {
      if (node && node.type === 'ClassDeclaration') {
        if (node.superTypeParameters && node.superTypeParameters.params.length > 0) {
          return true;
        }
      }
      return false;
    }

    /**
     * Checks if prop should be validated by plugin-react-proptypes
     * @param {String} validator Name of validator to check.
     * @returns {Boolean} True if validator should be checked by custom validator.
     */
    function hasCustomValidator(validator) {
      return customValidators.indexOf(validator) !== -1;
    }

    /**
     * Checks if the component must be validated
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component must be validated, false if not.
     */
    function mustBeValidated(component) {
      return Boolean(
        component &&
        !component.ignorePropsValidation
      );
    }

    /**
     * Returns true if the given node is a React Component lifecycle method
     * @param {ASTNode} node The AST node being checked.
     * @return {Boolean} True if the node is a lifecycle method
     */
    function isNodeALifeCycleMethod(node) {
      const nodeKeyName = (node.key || {}).name;

      if (node.kind === 'constructor') {
        return true;
      } else if (LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
        return true;
      } else if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
        return true;
      }

      return false;
    }

    /**
     * Returns true if the given node is inside a React Component lifecycle
     * method.
     * @param {ASTNode} node The AST node being checked.
     * @return {Boolean} True if the node is inside a lifecycle method
     */
    function isInLifeCycleMethod(node) {
      if ((node.type === 'MethodDefinition' || node.type === 'Property') && isNodeALifeCycleMethod(node)) {
        return true;
      }

      if (node.parent) {
        return isInLifeCycleMethod(node.parent);
      }

      return false;
    }

    /**
     * Checks if a prop init name matches common naming patterns
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the prop name matches
     */
    function isPropAttributeName (node) {
      return (
        node.init.name === 'props' ||
        node.init.name === 'nextProps' ||
        node.init.name === 'prevProps'
      );
    }

    /**
     * Checks if a prop is used
     * @param {ASTNode} node The AST node being checked.
     * @param {Object} prop Declared prop object
     * @returns {Boolean} True if the prop is used, false if not.
     */
    function isPropUsed(node, prop) {
      const usedPropTypes = node.usedPropTypes || [];
      for (let i = 0, l = usedPropTypes.length; i < l; i++) {
        const usedProp = usedPropTypes[i];
        if (
          prop.type === 'shape' ||
          prop.name === '__ANY_KEY__' ||
          usedProp.name === prop.name
        ) {
          return true;
        }
      }

      return false;
    }

    /**
     * Checks if the prop has spread operator.
     * @param {ASTNode} node The AST node being marked.
     * @returns {Boolean} True if the prop has spread operator, false if not.
     */
    function hasSpreadOperator(node) {
      const tokens = sourceCode.getTokens(node);
      return tokens.length && tokens[0].value === '...';
    }

    /**
     * Removes quotes from around an identifier.
     * @param {string} the identifier to strip
     */
    function stripQuotes(string) {
      return string.replace(/^\'|\'$/g, '');
    }

    /**
     * Retrieve the name of a key node
     * @param {ASTNode} node The AST node with the key.
     * @return {string} the name of the key
     */
    function getKeyValue(node) {
      if (node.type === 'ObjectTypeProperty') {
        const tokens = context.getFirstTokens(node, 2);
        return (tokens[0].value === '+' || tokens[0].value === '-'
          ? tokens[1].value
          : stripQuotes(tokens[0].value)
        );
      }
      const key = node.key || node.argument;
      return key.type === 'Identifier' ? key.name : key.value;
    }

    /**
     * Iterates through a properties node, like a customized forEach.
     * @param {Object[]} properties Array of properties to iterate.
     * @param {Function} fn Function to call on each property, receives property key
        and property value. (key, value) => void
     */
    function iterateProperties(properties, fn) {
      if (properties.length && typeof fn === 'function') {
        for (let i = 0, j = properties.length; i < j; i++) {
          const node = properties[i];
          const key = getKeyValue(node);

          const value = node.value;
          fn(key, value);
        }
      }
    }

    /**
     * Creates the representation of the React propTypes for the component.
     * The representation is used to verify nested used properties.
     * @param {ASTNode} value Node of the PropTypes for the desired property
     * @param {String} parentName Name of the parent prop node.
     * @return {Object|Boolean} The representation of the declaration, true means
     *    the property is declared without the need for further analysis.
     */
    function buildReactDeclarationTypes(value, parentName) {
      if (
        value &&
        value.callee &&
        value.callee.object &&
        hasCustomValidator(value.callee.object.name)
      ) {
        return {};
      }

      if (
        value &&
        value.type === 'MemberExpression' &&
        value.property &&
        value.property.name &&
        value.property.name === 'isRequired'
      ) {
        value = value.object;
      }

      // Verify PropTypes that are functions
      if (
        value &&
        value.type === 'CallExpression' &&
        value.callee &&
        value.callee.property &&
        value.callee.property.name &&
        value.arguments &&
        value.arguments.length > 0
      ) {
        const callName = value.callee.property.name;
        const argument = value.arguments[0];
        switch (callName) {
          case 'shape':
            if (skipShapeProps) {
              return {};
            }

            if (argument.type !== 'ObjectExpression') {
              // Invalid proptype or cannot analyse statically
              return {};
            }
            const shapeTypeDefinition = {
              type: 'shape',
              children: []
            };
            iterateProperties(argument.properties, (childKey, childValue) => {
              const fullName = [parentName, childKey].join('.');
              const types = buildReactDeclarationTypes(childValue, fullName);
              types.fullName = fullName;
              types.name = childKey;
              types.node = childValue;
              shapeTypeDefinition.children.push(types);
            });
            return shapeTypeDefinition;
          case 'arrayOf':
          case 'objectOf':
            const fullName = [parentName, '*'].join('.');
            const child = buildReactDeclarationTypes(argument, fullName);
            child.fullName = fullName;
            child.name = '__ANY_KEY__';
            child.node = argument;
            return {
              type: 'object',
              children: [child]
            };
          case 'oneOfType':
            if (
              !argument.elements ||
              !argument.elements.length
            ) {
              // Invalid proptype or cannot analyse statically
              return {};
            }
            const unionTypeDefinition = {
              type: 'union',
              children: []
            };
            for (let i = 0, j = argument.elements.length; i < j; i++) {
              const type = buildReactDeclarationTypes(argument.elements[i], parentName);
              // keep only complex type
              if (Object.keys(type).length > 0) {
                if (type.children === true) {
                  // every child is accepted for one type, abort type analysis
                  unionTypeDefinition.children = true;
                  return unionTypeDefinition;
                }
              }

              unionTypeDefinition.children.push(type);
            }
            if (unionTypeDefinition.length === 0) {
              // no complex type found, simply accept everything
              return {};
            }
            return unionTypeDefinition;
          case 'instanceOf':
            return {
              type: 'instance',
              // Accept all children because we can't know what type they are
              children: true
            };
          case 'oneOf':
          default:
            return {};
        }
      }
      // Unknown property or accepts everything (any, object, ...)
      return {};
    }

    /**
     * Creates the representation of the React props type annotation for the component.
     * The representation is used to verify nested used properties.
     * @param {ASTNode} annotation Type annotation for the props class property.
     * @param {String} parentName Name of the parent prop node.
     * @return {Object} The representation of the declaration, an empty object means
     *    the property is declared without the need for further analysis.
     */
    function buildTypeAnnotationDeclarationTypes(annotation, parentName) {
      switch (annotation.type) {
        case 'GenericTypeAnnotation':
          if (typeScope(annotation.id.name)) {
            return buildTypeAnnotationDeclarationTypes(typeScope(annotation.id.name), parentName);
          }
          return {};
        case 'ObjectTypeAnnotation':
          if (skipShapeProps) {
            return {};
          }
          const shapeTypeDefinition = {
            type: 'shape',
            children: []
          };
          iterateProperties(annotation.properties, (childKey, childValue) => {
            const fullName = [parentName, childKey].join('.');
            const types = buildTypeAnnotationDeclarationTypes(childValue, fullName);
            types.fullName = fullName;
            types.name = childKey;
            types.node = childValue;
            shapeTypeDefinition.children.push(types);
          });
          return shapeTypeDefinition;
        case 'UnionTypeAnnotation':
          const unionTypeDefinition = {
            type: 'union',
            children: []
          };
          for (let i = 0, j = annotation.types.length; i < j; i++) {
            const type = buildTypeAnnotationDeclarationTypes(annotation.types[i], parentName);
            // keep only complex type
            if (Object.keys(type).length > 0) {
              if (type.children === true) {
                // every child is accepted for one type, abort type analysis
                unionTypeDefinition.children = true;
                return unionTypeDefinition;
              }
            }

            unionTypeDefinition.children.push(type);
          }
          if (unionTypeDefinition.children.length === 0) {
            // no complex type found
            return {};
          }
          return unionTypeDefinition;
        case 'ArrayTypeAnnotation':
          const fullName = [parentName, '*'].join('.');
          const child = buildTypeAnnotationDeclarationTypes(annotation.elementType, fullName);
          child.fullName = fullName;
          child.name = '__ANY_KEY__';
          child.node = annotation;
          return {
            type: 'object',
            children: [child]
          };
        default:
          // Unknown or accepts everything.
          return {};
      }
    }

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    function inConstructor() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.kind === 'constructor') {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    }

    /**
     * Retrieve the name of a property node
     * @param {ASTNode} node The AST node with the property.
     * @return {string} the name of the property or undefined if not found
     */
    function getPropertyName(node) {
      const isDirectProp = DIRECT_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectNextProp = DIRECT_NEXT_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectPrevProp = DIRECT_PREV_PROPS_REGEX.test(sourceCode.getText(node));
      const isDirectSetStateProp = isPropArgumentInSetStateUpdater(node);
      const isInClassComponent = utils.getParentES6Component() || utils.getParentES5Component();
      const isNotInConstructor = !inConstructor(node);
      const isNotInLifeCycleMethod = !inLifeCycleMethod();
      const isNotInSetStateUpdater = !inSetStateUpdater();
      if ((isDirectProp || isDirectNextProp || isDirectPrevProp || isDirectSetStateProp)
        && isInClassComponent
        && isNotInConstructor
        && isNotInLifeCycleMethod
        && isNotInSetStateUpdater
      ) {
        return void 0;
      }
      if (!isDirectProp && !isDirectNextProp && !isDirectPrevProp && !isDirectSetStateProp) {
        node = node.parent;
      }
      const property = node.property;
      if (property) {
        switch (property.type) {
          case 'Identifier':
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            return property.name;
          case 'MemberExpression':
            return void 0;
          case 'Literal':
            // Accept computed properties that are literal strings
            if (typeof property.value === 'string') {
              return property.value;
            }
            // falls through
          default:
            if (node.computed) {
              return '__COMPUTED_PROP__';
            }
            break;
        }
      }
      return void 0;
    }

    /**
     * Mark a prop type as used
     * @param {ASTNode} node The AST node being marked.
     */
    function markPropTypesAsUsed(node, parentNames) {
      parentNames = parentNames || [];
      let type;
      let name;
      let allNames;
      let properties;
      switch (node.type) {
        case 'MemberExpression':
          name = getPropertyName(node);
          if (name) {
            allNames = parentNames.concat(name);
            if (node.parent.type === 'MemberExpression') {
              markPropTypesAsUsed(node.parent, allNames);
            }
            // Do not mark computed props as used.
            type = name !== '__COMPUTED_PROP__' ? 'direct' : null;
          } else if (
            node.parent.id &&
            node.parent.id.properties &&
            node.parent.id.properties.length &&
            getKeyValue(node.parent.id.properties[0])
          ) {
            type = 'destructuring';
            properties = node.parent.id.properties;
          }
          break;
        case 'ArrowFunctionExpression':
        case 'FunctionDeclaration':
        case 'FunctionExpression':
          if (node.params.length === 0) {
            break;
          }
          type = 'destructuring';
          properties = node.params[0].properties;
          if (inSetStateUpdater()) {
            properties = node.params[1].properties;
          }
          break;
        case 'VariableDeclarator':
          for (let i = 0, j = node.id.properties.length; i < j; i++) {
            // let {props: {firstname}} = this
            const thisDestructuring = (
              node.id.properties[i].key && (
                (node.id.properties[i].key.name === 'props' || node.id.properties[i].key.value === 'props') &&
                node.id.properties[i].value.type === 'ObjectPattern'
              )
            );
            // let {firstname} = props
            const genericDestructuring = isPropAttributeName(node) && (
              utils.getParentStatelessComponent() ||
              isInLifeCycleMethod(node)
            );

            if (thisDestructuring) {
              properties = node.id.properties[i].value.properties;
            } else if (genericDestructuring) {
              properties = node.id.properties;
            } else {
              continue;
            }
            type = 'destructuring';
            break;
          }
          break;
        default:
          throw new Error(`${node.type} ASTNodes are not handled by markPropTypesAsUsed`);
      }

      const component = components.get(utils.getParentComponent());
      const usedPropTypes = component && component.usedPropTypes || [];
      let ignorePropsValidation = component && component.ignorePropsValidation || false;

      switch (type) {
        case 'direct':
          // Ignore Object methods
          if (Object.prototype[name]) {
            break;
          }

          usedPropTypes.push({
            name: name,
            allNames: allNames
          });
          break;
        case 'destructuring':
          for (let k = 0, l = (properties || []).length; k < l; k++) {
            if (hasSpreadOperator(properties[k]) || properties[k].computed) {
              ignorePropsValidation = true;
              break;
            }
            const propName = getKeyValue(properties[k]);

            let currentNode = node;
            allNames = [];
            while (currentNode.property && currentNode.property.name !== 'props') {
              allNames.unshift(currentNode.property.name);
              currentNode = currentNode.object;
            }
            allNames.push(propName);

            if (propName) {
              usedPropTypes.push({
                allNames: allNames,
                name: propName
              });
            }
          }
          break;
        default:
          break;
      }

      components.set(component ? component.node : node, {
        usedPropTypes: usedPropTypes,
        ignorePropsValidation: ignorePropsValidation
      });
    }

    /**
     * Marks all props found inside ObjectTypeAnnotaiton as declared.
     *
     * Modifies the declaredProperties object
     * @param {ASTNode} propTypes
     * @param {Object} declaredPropTypes
     * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
     */
    function declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes) {
      let ignorePropsValidation = false;

      iterateProperties(propTypes.properties, (key, value) => {
        if (!value) {
          ignorePropsValidation = true;
          return;
        }

        const types = buildTypeAnnotationDeclarationTypes(value, key);
        types.fullName = key;
        types.name = key;
        types.node = value;
        declaredPropTypes.push(types);
      });

      return ignorePropsValidation;
    }

    /**
     * Marks all props found inside IntersectionTypeAnnotation as declared.
     * Since InterSectionTypeAnnotations can be nested, this handles recursively.
     *
     * Modifies the declaredPropTypes object
     * @param {ASTNode} propTypes
     * @param {Object} declaredPropTypes
     * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
     */
    function declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes) {
      return propTypes.types.some(annotation => {
        if (annotation.type === 'ObjectTypeAnnotation') {
          return declarePropTypesForObjectTypeAnnotation(annotation, declaredPropTypes);
        }

        if (annotation.type === 'UnionTypeAnnotation') {
          return true;
        }

        const typeNode = typeScope(annotation.id.name);

        if (!typeNode) {
          return true;
        } else if (typeNode.type === 'IntersectionTypeAnnotation') {
          return declarePropTypesForIntersectionTypeAnnotation(typeNode, declaredPropTypes);
        }

        return declarePropTypesForObjectTypeAnnotation(typeNode, declaredPropTypes);
      });
    }

    /**
     * Mark a prop type as declared
     * @param {ASTNode} node The AST node being checked.
     * @param {propTypes} node The AST node containing the proptypes
     */
    function markPropTypesAsDeclared(node, propTypes) {
      const component = components.get(node);
      const declaredPropTypes = component && component.declaredPropTypes || [];
      let ignorePropsValidation = component && component.ignorePropsValidation || false;

      switch (propTypes && propTypes.type) {
        case 'ObjectTypeAnnotation':
          ignorePropsValidation = declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes);
          break;
        case 'ObjectExpression':
          iterateProperties(propTypes.properties, (key, value) => {
            if (!value) {
              ignorePropsValidation = true;
              return;
            }
            const types = buildReactDeclarationTypes(value, key);
            types.fullName = key;
            types.name = key;
            types.node = value;
            declaredPropTypes.push(types);
            // Handle custom prop validators using props inside
            if (
              value.type === 'ArrowFunctionExpression'
              || value.type === 'FunctionExpression'
            ) {
              markPropTypesAsUsed(value);
            }
          });
          break;
        case 'MemberExpression':
          break;
        case 'Identifier':
          const variablesInScope = variable.variablesInScope(context);
          for (let i = 0, j = variablesInScope.length; i < j; i++) {
            if (variablesInScope[i].name !== propTypes.name) {
              continue;
            }
            const defInScope = variablesInScope[i].defs[variablesInScope[i].defs.length - 1];
            markPropTypesAsDeclared(node, defInScope.node && defInScope.node.init);
            return;
          }
          ignorePropsValidation = true;
          break;
        case 'CallExpression':
          if (
            propWrapperFunctions.has(propTypes.callee.name) &&
            propTypes.arguments && propTypes.arguments[0]
          ) {
            markPropTypesAsDeclared(node, propTypes.arguments[0]);
            return;
          }
          break;
        case 'IntersectionTypeAnnotation':
          ignorePropsValidation = declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes);
          break;
        case null:
          break;
        default:
          ignorePropsValidation = true;
          break;
      }

      components.set(node, {
        declaredPropTypes: declaredPropTypes,
        ignorePropsValidation: ignorePropsValidation
      });
    }

    /**
     * Used to recursively loop through each declared prop type
     * @param {Object} component The component to process
     * @param {Array} props List of props to validate
     */
    function reportUnusedPropType (component, props) {
      // Skip props that check instances
      if (props === true) {
        return;
      }

      (props || []).forEach(prop => {
        // Skip props that check instances
        if (prop === true) {
          return;
        }

        if (prop.node && !isPropUsed(component, prop)) {
          context.report(
            prop.node,
            UNUSED_MESSAGE, {
              name: prop.fullName
            }
          );
        }

        if (prop.children) {
          reportUnusedPropType(component, prop.children);
        }
      });
    }

    /**
     * Reports unused proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportUnusedPropTypes(component) {
      reportUnusedPropType(component, component.declaredPropTypes);
    }

    /**
     * Resolve the type annotation for a given node.
     * Flow annotations are sometimes wrapped in outer `TypeAnnotation`
     * and `NullableTypeAnnotation` nodes which obscure the annotation we're
     * interested in.
     * This method also resolves type aliases where possible.
     *
     * @param {ASTNode} node The annotation or a node containing the type annotation.
     * @returns {ASTNode} The resolved type annotation for the node.
     */
    function resolveTypeAnnotation(node) {
      let annotation = node.typeAnnotation || node;
      while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
        annotation = annotation.typeAnnotation;
      }
      if (annotation.type === 'GenericTypeAnnotation' && typeScope(annotation.id.name)) {
        return typeScope(annotation.id.name);
      }
      return annotation;
    }

    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function markDestructuredFunctionArgumentsAsUsed(node) {
      const destructuring = node.params && node.params[0] && node.params[0].type === 'ObjectPattern';
      if (destructuring && components.get(node)) {
        markPropTypesAsUsed(node);
      }
    }

    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function markAnnotatedFunctionArgumentsAsDeclared(node) {
      if (!node.params || !node.params.length || !annotations.isAnnotatedFunctionPropsDeclaration(node, context)) {
        return;
      }
      markPropTypesAsDeclared(node, resolveTypeAnnotation(node.params[0]));
    }

    function handleSetStateUpdater(node) {
      if (!node.params || node.params.length < 2 || !inSetStateUpdater()) {
        return;
      }
      markPropTypesAsUsed(node);
    }

    /**
     * Handle both stateless functions and setState updater functions.
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function handleFunctionLikeExpressions(node) {
      handleSetStateUpdater(node);
      markDestructuredFunctionArgumentsAsUsed(node);
      markAnnotatedFunctionArgumentsAsDeclared(node);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      ClassDeclaration: function(node) {
        if (isSuperTypeParameterPropsDeclaration(node)) {
          markPropTypesAsDeclared(node, resolveSuperParameterPropsType(node));
        }
      },

      ClassProperty: function(node) {
        if (isAnnotatedClassPropsDeclaration(node)) {
          markPropTypesAsDeclared(node, resolveTypeAnnotation(node));
        } else if (propsUtil.isPropTypesDeclaration(node)) {
          markPropTypesAsDeclared(node, node.value);
        }
      },

      VariableDeclarator: function(node) {
        const destructuring = node.init && node.id && node.id.type === 'ObjectPattern';
        // let {props: {firstname}} = this
        const thisDestructuring = destructuring && node.init.type === 'ThisExpression';
        // let {firstname} = props
        const statelessDestructuring = destructuring && isPropAttributeName(node) && (
          utils.getParentStatelessComponent() ||
          isInLifeCycleMethod(node)
        );

        if (!thisDestructuring && !statelessDestructuring) {
          return;
        }
        markPropTypesAsUsed(node);
      },

      FunctionDeclaration: handleFunctionLikeExpressions,

      ArrowFunctionExpression: handleFunctionLikeExpressions,

      FunctionExpression: handleFunctionLikeExpressions,

      MemberExpression: function(node) {
        let type;
        if (isPropTypesUsage(node)) {
          type = 'usage';
        } else if (propsUtil.isPropTypesDeclaration(node)) {
          type = 'declaration';
        }

        switch (type) {
          case 'usage':
            markPropTypesAsUsed(node);
            break;
          case 'declaration':
            const component = utils.getRelatedComponent(node);
            if (!component) {
              return;
            }
            markPropTypesAsDeclared(component.node, node.parent.right || node.parent);
            break;
          default:
            break;
        }
      },

      JSXSpreadAttribute: function(node) {
        const component = components.get(utils.getParentComponent());
        components.set(component ? component.node : node, {
          ignorePropsValidation: true
        });
      },

      MethodDefinition: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        let i = node.value.body.body.length - 1;
        for (; i >= 0; i--) {
          if (node.value.body.body[i].type === 'ReturnStatement') {
            break;
          }
        }

        if (i >= 0) {
          markPropTypesAsDeclared(node, node.value.body.body[i].argument);
        }
      },

      ObjectPattern: function(node) {
        // If the object pattern is a destructured props object in a lifecycle
        // method -- mark it for used props.
        if (isNodeALifeCycleMethod(node.parent.parent)) {
          node.properties.forEach((property, i) => {
            if (i === 0) {
              markPropTypesAsUsed(node.parent);
            }
          });
        }
      },

      ObjectExpression: function(node) {
        // Search for the proptypes declaration
        node.properties.forEach(property => {
          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          markPropTypesAsDeclared(node, property.value);
        });
      },

      TypeAlias: function(node) {
        typeScope(node.id.name, node.right);
      },

      Program: function() {
        stack = [{}];
      },

      BlockStatement: function () {
        stack.push(Object.create(typeScope()));
      },

      'BlockStatement:exit': function () {
        stack.pop();
      },

      'Program:exit': function() {
        stack = null;
        const list = components.list();
        // Report undeclared proptypes for all classes
        for (const component in list) {
          if (!has(list, component) || !mustBeValidated(list[component])) {
            continue;
          }
          reportUnusedPropTypes(list[component]);
        }
      }
    };
  })
};
