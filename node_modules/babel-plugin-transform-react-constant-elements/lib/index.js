"use strict";

exports.__esModule = true;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function (_ref) {
  var t = _ref.types;

  var immutabilityVisitor = {
    enter: function enter(path, state) {
      var stop = function stop() {
        state.isImmutable = false;
        path.stop();
      };

      if (path.isJSXClosingElement()) {
        path.skip();
        return;
      }

      if (path.isJSXIdentifier({ name: "ref" }) && path.parentPath.isJSXAttribute({ name: path.node })) {
        return stop();
      }

      if (path.isJSXIdentifier() || path.isIdentifier() || path.isJSXMemberExpression()) {
        return;
      }

      if (!path.isImmutable()) {
        if (path.isPure()) {
          var expressionResult = path.evaluate();
          if (expressionResult.confident) {
            var value = expressionResult.value;

            var isMutable = value && (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === "object" || typeof value === "function";
            if (!isMutable) {
              return;
            }
          } else if (t.isIdentifier(expressionResult.deopt)) {
            return;
          }
        }
        stop();
      }
    }
  };

  return {
    visitor: {
      JSXElement: function JSXElement(path) {
        if (path.node._hoisted) return;

        var state = { isImmutable: true };
        path.traverse(immutabilityVisitor, state);

        if (state.isImmutable) {
          path.hoist();
        } else {
          path.node._hoisted = true;
        }
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];