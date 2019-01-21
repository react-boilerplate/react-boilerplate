"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _isAnnotatedForRemoval = _interopRequireDefault(require("./isAnnotatedForRemoval"));

var _isStatelessComponent = _interopRequireDefault(require("./isStatelessComponent"));

var _remove = _interopRequireDefault(require("./remove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function isPathReactClass(path, globalOptions) {
  var node = path.node;
  var matchers = globalOptions.classNameMatchers;

  if (path.matchesPattern('React.Component') || path.matchesPattern('React.PureComponent')) {
    return true;
  }

  if (node && (node.name === 'Component' || node.name === 'PureComponent')) {
    return true;
  }

  if (node && matchers && node.name.match(matchers)) {
    return true;
  }

  return false;
}

function isReactClass(superClass, scope, globalOptions) {
  if (!superClass.node) {
    return false;
  }

  var answer = false;

  if (isPathReactClass(superClass, globalOptions)) {
    answer = true;
  } else if (superClass.node.name) {
    // Check for inheritance
    var className = superClass.node.name;
    var binding = scope.getBinding(className);

    if (!binding) {
      answer = false;
    } else {
      var bindingSuperClass = binding.path.get('superClass');

      if (isPathReactClass(bindingSuperClass, globalOptions)) {
        answer = true;
      }
    }
  }

  return answer;
}

function _default(_ref) {
  var template = _ref.template,
      types = _ref.types,
      traverse = _ref.traverse;
  return {
    visitor: {
      Program: function Program(programPath, state) {
        var ignoreFilenames;
        var classNameMatchers;

        if (state.opts.ignoreFilenames) {
          ignoreFilenames = new RegExp(state.opts.ignoreFilenames.join('|'), 'gi');
        } else {
          ignoreFilenames = undefined;
        }

        if (state.opts.classNameMatchers) {
          classNameMatchers = new RegExp(state.opts.classNameMatchers.join('|'), 'g');
        } else {
          classNameMatchers = undefined;
        }

        var globalOptions = {
          visitedKey: "transform-react-remove-prop-types".concat(Date.now()),
          unsafeWrapTemplate: template("\n              if (process.env.NODE_ENV !== \"production\") {\n                NODE;\n              }\n            ", {
            placeholderPattern: /^NODE$/
          }),
          wrapTemplate: template("\n              LEFT = process.env.NODE_ENV !== \"production\" ? RIGHT : {}\n            ", {
            placeholderPattern: /^(LEFT|RIGHT)$/
          }),
          mode: state.opts.mode || 'remove',
          ignoreFilenames: ignoreFilenames,
          types: types,
          removeImport: state.opts.removeImport || false,
          libraries: (state.opts.additionalLibraries || []).concat('prop-types'),
          classNameMatchers: classNameMatchers
        };

        if (state.opts.plugins) {
          var pluginsState = state;
          var pluginsVisitors = state.opts.plugins.map(function (pluginOpts) {
            var pluginName = typeof pluginOpts === 'string' ? pluginOpts : pluginOpts[0];

            if (typeof pluginOpts !== 'string') {
              pluginsState.opts = _extends({}, pluginsState.opts, pluginOpts[1]);
            }

            var plugin = require(pluginName);

            if (typeof plugin !== 'function') {
              plugin = plugin.default;
            }

            return plugin({
              template: template,
              types: types
            }).visitor;
          });
          traverse(programPath.parent, traverse.visitors.merge(pluginsVisitors), programPath.scope, pluginsState, programPath.parentPath);
        } // On program start, do an explicit traversal up front for this plugin.


        programPath.traverse({
          ObjectProperty: {
            exit: function exit(path) {
              var node = path.node;

              if (node.computed || node.key.name !== 'propTypes') {
                return;
              }

              var parent = path.findParent(function (currentNode) {
                if (currentNode.type !== 'CallExpression') {
                  return false;
                }

                return currentNode.get('callee').node.name === 'createReactClass';
              });

              if (parent) {
                (0, _remove.default)(path, globalOptions, {
                  type: 'createClass'
                });
              }
            }
          },
          // Here to support stage-1 transform-class-properties.
          ClassProperty: function ClassProperty(path) {
            var node = path.node,
                scope = path.scope;

            if (node.key.name === 'propTypes') {
              var pathClassDeclaration = scope.path;

              if (isReactClass(pathClassDeclaration.get('superClass'), scope, globalOptions)) {
                (0, _remove.default)(path, globalOptions, {
                  type: 'class static',
                  pathClassDeclaration: pathClassDeclaration
                });
              }
            }
          },
          AssignmentExpression: function AssignmentExpression(path) {
            var node = path.node,
                scope = path.scope;

            if (node.left.computed || !node.left.property || node.left.property.name !== 'propTypes') {
              return;
            }

            var forceRemoval = (0, _isAnnotatedForRemoval.default)(path.node.left);

            if (forceRemoval) {
              (0, _remove.default)(path, globalOptions, {
                type: 'assign'
              });
              return;
            }

            var className = node.left.object.name;
            var binding = scope.getBinding(className);

            if (!binding) {
              return;
            }

            if (binding.path.isClassDeclaration()) {
              var superClass = binding.path.get('superClass');

              if (isReactClass(superClass, scope, globalOptions)) {
                (0, _remove.default)(path, globalOptions, {
                  type: 'assign'
                });
              }
            } else if ((0, _isStatelessComponent.default)(binding.path)) {
              (0, _remove.default)(path, globalOptions, {
                type: 'assign'
              });
            }
          }
        });

        if (globalOptions.removeImport) {
          if (globalOptions.mode === 'remove') {
            programPath.scope.crawl();
            programPath.traverse({
              ImportDeclaration: function ImportDeclaration(path) {
                var _path$node = path.node,
                    source = _path$node.source,
                    specifiers = _path$node.specifiers;

                if (globalOptions.libraries.indexOf(source.value) === -1) {
                  return;
                }

                var haveUsedSpecifiers = specifiers.some(function (specifier) {
                  var importedIdentifierName = specifier.local.name;

                  var _path$scope$getBindin = path.scope.getBinding(importedIdentifierName),
                      referencePaths = _path$scope$getBindin.referencePaths;

                  return referencePaths.length > 0;
                });

                if (!haveUsedSpecifiers) {
                  path.remove();
                }
              }
            });
          } else {
            throw new Error('react-remove-prop-types: removeImport and mode=remove can not be used at the same time.');
          }
        }
      }
    }
  };
}