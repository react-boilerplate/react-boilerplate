'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (_ref) {
  var t = _ref.types;
  var template = _ref.template;

  function matchesPatterns(path, patterns) {
    return !!(0, _find2.default)(patterns, function (pattern) {
      return t.isIdentifier(path.node, { name: pattern }) || path.matchesPattern(pattern);
    });
  }

  function isReactLikeClass(node) {
    return !!(0, _find2.default)(node.body.body, function (classMember) {
      return t.isClassMethod(classMember) && t.isIdentifier(classMember.key, { name: 'render' });
    });
  }

  function isReactLikeComponentObject(node) {
    return t.isObjectExpression(node) && !!(0, _find2.default)(node.properties, function (objectMember) {
      return (t.isObjectProperty(objectMember) || t.isObjectMethod(objectMember)) && (t.isIdentifier(objectMember.key, { name: 'render' }) || t.isStringLiteral(objectMember.key, { value: 'render' }));
    });
  }

  // `foo({ displayName: 'NAME' });` => 'NAME'
  function getDisplayName(node) {
    var property = (0, _find2.default)(node.arguments[0].properties, function (node) {
      return node.key.name === 'displayName';
    });
    return property && property.value.value;
  }

  function hasParentFunction(path) {
    return !!path.findParent(function (parentPath) {
      return parentPath.isFunction();
    });
  }

  // wrapperFunction("componentId")(node)
  function wrapComponent(node, componentId, wrapperFunctionId) {
    return t.callExpression(t.callExpression(wrapperFunctionId, [t.stringLiteral(componentId)]), [node]);
  }

  // `{ name: foo }` => Node { type: "ObjectExpression", properties: [...] }
  function toObjectExpression(object) {
    var properties = Object.keys(object).map(function (key) {
      return t.objectProperty(t.identifier(key), object[key]);
    });

    return t.objectExpression(properties);
  }

  var wrapperFunctionTemplate = template('\n    function WRAPPER_FUNCTION_ID(ID_PARAM) {\n      return function(COMPONENT_PARAM) {\n        return EXPRESSION;\n      };\n    }\n  ');

  var VISITED_KEY = 'react-transform-' + Date.now();

  var componentVisitor = {
    Class: function Class(path) {
      if (path.node[VISITED_KEY] || !matchesPatterns(path.get('superClass'), this.superClasses) || !isReactLikeClass(path.node)) {
        return;
      }

      path.node[VISITED_KEY] = true;

      var componentName = path.node.id && path.node.id.name || null;
      var componentId = componentName || path.scope.generateUid('component');
      var isInFunction = hasParentFunction(path);

      this.components.push({
        id: componentId,
        name: componentName,
        isInFunction: isInFunction
      });

      // Can't wrap ClassDeclarations
      var isStatement = t.isStatement(path.node);
      var expression = t.toExpression(path.node);

      // wrapperFunction("componentId")(node)
      var wrapped = wrapComponent(expression, componentId, this.wrapperFunctionId);
      var constId = void 0;

      if (isStatement) {
        // wrapperFunction("componentId")(class Foo ...) => const Foo = wrapperFunction("componentId")(class Foo ...)
        constId = t.identifier(componentName || componentId);
        wrapped = t.variableDeclaration('const', [t.variableDeclarator(constId, wrapped)]);
      }

      if (t.isExportDefaultDeclaration(path.parent)) {
        path.parentPath.insertBefore(wrapped);
        path.parent.declaration = constId;
      } else {
        path.replaceWith(wrapped);
      }
    },
    CallExpression: function CallExpression(path) {
      if (path.node[VISITED_KEY] || !matchesPatterns(path.get('callee'), this.factoryMethods) || !isReactLikeComponentObject(path.node.arguments[0])) {
        return;
      }

      path.node[VISITED_KEY] = true;

      // `foo({ displayName: 'NAME' });` => 'NAME'
      var componentName = getDisplayName(path.node);
      var componentId = componentName || path.scope.generateUid('component');
      var isInFunction = hasParentFunction(path);

      this.components.push({
        id: componentId,
        name: componentName,
        isInFunction: isInFunction
      });

      path.replaceWith(wrapComponent(path.node, componentId, this.wrapperFunctionId));
    }
  };

  var ReactTransformBuilder = function () {
    function ReactTransformBuilder(file, options) {
      _classCallCheck(this, ReactTransformBuilder);

      this.file = file;
      this.program = file.path;
      this.options = this.normalizeOptions(options);

      // @todo: clean this shit up
      this.configuredTransformsIds = [];
    }

    _createClass(ReactTransformBuilder, [{
      key: 'normalizeOptions',
      value: function normalizeOptions(options) {
        return {
          factoryMethods: options.factoryMethods || ['React.createClass'],
          superClasses: options.superClasses || ['React.Component', 'React.PureComponent', 'Component', 'PureComponent'],
          transforms: options.transforms.map(function (opts) {
            return {
              transform: opts.transform,
              locals: opts.locals || [],
              imports: opts.imports || []
            };
          })
        };
      }
    }, {
      key: 'build',
      value: function build() {
        var componentsDeclarationId = this.file.scope.generateUidIdentifier('components');
        var wrapperFunctionId = this.file.scope.generateUidIdentifier('wrapComponent');

        var components = this.collectAndWrapComponents(wrapperFunctionId);

        if (!components.length) {
          return;
        }

        var componentsDeclaration = this.initComponentsDeclaration(componentsDeclarationId, components);
        var configuredTransforms = this.initTransformers(componentsDeclarationId);
        var wrapperFunction = this.initWrapperFunction(wrapperFunctionId);

        var body = this.program.node.body;

        body.unshift(wrapperFunction);
        configuredTransforms.reverse().forEach(function (node) {
          return body.unshift(node);
        });
        body.unshift(componentsDeclaration);
      }

      /**
       * const Foo = _wrapComponent('Foo')(class Foo extends React.Component {});
       * ...
       * const Bar = _wrapComponent('Bar')(React.createClass({
       *   displayName: 'Bar'
       * }));
       */

    }, {
      key: 'collectAndWrapComponents',
      value: function collectAndWrapComponents(wrapperFunctionId) {
        var components = [];

        this.file.path.traverse(componentVisitor, {
          wrapperFunctionId: wrapperFunctionId,
          components: components,
          factoryMethods: this.options.factoryMethods,
          superClasses: this.options.superClasses,
          currentlyInFunction: false
        });

        return components;
      }

      /**
       * const _components = {
       *   Foo: {
       *     displayName: "Foo"
       *   }
       * };
       */

    }, {
      key: 'initComponentsDeclaration',
      value: function initComponentsDeclaration(componentsDeclarationId, components) {
        var uniqueId = 0;

        var props = components.map(function (component) {
          var componentId = component.id;
          var componentProps = [];

          if (component.name) {
            componentProps.push(t.objectProperty(t.identifier('displayName'), t.stringLiteral(component.name)));
          }

          if (component.isInFunction) {
            componentProps.push(t.objectProperty(t.identifier('isInFunction'), t.booleanLiteral(true)));
          }

          var objectKey = void 0;

          if (t.isValidIdentifier(componentId)) {
            objectKey = t.identifier(componentId);
          } else {
            objectKey = t.stringLiteral(componentId);
          }

          return t.objectProperty(objectKey, t.objectExpression(componentProps));
        });

        return t.variableDeclaration('const', [t.variableDeclarator(componentsDeclarationId, t.objectExpression(props))]);
      }

      /**
       * import _transformLib from "transform-lib";
       * ...
       * const _transformLib2 = _transformLib({
       *   filename: "filename",
       *   components: _components,
       *   locals: [],
       *   imports: []
       * });
       */

    }, {
      key: 'initTransformers',
      value: function initTransformers(componentsDeclarationId) {
        var _this = this;

        return this.options.transforms.map(function (transform) {
          var transformName = transform.transform;
          var transformImportId = _this.file.addImport(transformName, 'default', transformName);

          var transformLocals = transform.locals.map(function (local) {
            return t.identifier(local);
          });

          var transformImports = transform.imports.map(function (importName) {
            return _this.file.addImport(importName, 'default', importName);
          });

          var configuredTransformId = _this.file.scope.generateUidIdentifier(transformName);
          var configuredTransform = t.variableDeclaration('const', [t.variableDeclarator(configuredTransformId, t.callExpression(transformImportId, [toObjectExpression({
            filename: t.stringLiteral(_this.file.opts.filename),
            components: componentsDeclarationId,
            locals: t.arrayExpression(transformLocals),
            imports: t.arrayExpression(transformImports)
          })]))]);

          _this.configuredTransformsIds.push(configuredTransformId);

          return configuredTransform;
        });
      }

      /**
       * function _wrapComponent(id) {
       *   return function (Component) {
       *     return _transformLib2(Component, id);
       *   };
       * }
       */

    }, {
      key: 'initWrapperFunction',
      value: function initWrapperFunction(wrapperFunctionId) {
        var idParam = t.identifier('id');
        var componentParam = t.identifier('Component');

        var expression = this.configuredTransformsIds.reverse().reduce(function (memo, transformId) {
          return t.callExpression(transformId, [memo, idParam]);
        }, componentParam);

        return wrapperFunctionTemplate({
          WRAPPER_FUNCTION_ID: wrapperFunctionId,
          ID_PARAM: idParam,
          COMPONENT_PARAM: componentParam,
          EXPRESSION: expression
        });
      }
    }], [{
      key: 'validateOptions',
      value: function validateOptions(options) {
        return (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && Array.isArray(options.transforms);
      }
    }, {
      key: 'assertValidOptions',
      value: function assertValidOptions(options) {
        if (!ReactTransformBuilder.validateOptions(options)) {
          throw new Error('babel-plugin-react-transform requires that you specify options ' + 'in .babelrc or from the Babel Node API, and that it is an object ' + 'with a transforms property which is an array.');
        }
      }
    }]);

    return ReactTransformBuilder;
  }();

  return {
    visitor: {
      Program: function Program(path, _ref2) {
        var file = _ref2.file;
        var opts = _ref2.opts;

        ReactTransformBuilder.assertValidOptions(opts);
        var builder = new ReactTransformBuilder(file, opts);
        builder.build();
      }
    }
  };
};

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }