'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var syntax = _interopDefault(require('babel-plugin-syntax-dynamic-import'));

function babel (_ref) {
  var t = _ref.types;

  return {
    inherits: syntax,

    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        var source = path.node.source.value;
        if (source !== 'loadable-components') return;

        var defaultSpecifier = path.get('specifiers').find(function (specifier) {
          return specifier.isImportDefaultSpecifier();
        });

        if (!defaultSpecifier) return;

        var bindingName = defaultSpecifier.node.local.name;
        var binding = path.scope.getBinding(bindingName);

        binding.referencePaths.forEach(function (refPath) {
          var callExpression = refPath.parentPath;

          if (callExpression.isMemberExpression() && callExpression.node.computed === false && callExpression.get('property').isIdentifier({ name: 'Map' })) {
            callExpression = callExpression.parentPath;
          }

          if (!callExpression.isCallExpression()) return;

          var args = callExpression.get('arguments');
          var loaderMethod = args[0];

          if (!loaderMethod) return;

          var dynamicImports = [];

          loaderMethod.traverse({
            Import: function Import(_ref2) {
              var parentPath = _ref2.parentPath;

              dynamicImports.push(parentPath);
            }
          });

          if (!dynamicImports.length) return;

          var options = args[1];
          if (args[1]) {
            options = options.node;
          } else {
            options = t.objectExpression([]);
            callExpression.node.arguments.push(options);
          }

          options.properties.push(t.objectProperty(t.identifier('modules'), t.arrayExpression(dynamicImports.map(function (dynamicImport) {
            return dynamicImport.get('arguments')[0].node;
          }))));
        });
      }
    }
  };
}

exports.default = babel;
//# sourceMappingURL=loadable-components.babel.cjs.js.map
