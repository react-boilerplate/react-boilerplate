"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function addDisplayName(id, call) {
    var props = call.arguments[0].properties;
    var safe = true;

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var key = t.toComputedKey(prop);
      if (t.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(t.objectProperty(t.identifier("displayName"), t.stringLiteral(id)));
    }
  }

  var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");
  var isCreateClassAddon = function isCreateClassAddon(callee) {
    return callee.name === "createReactClass";
  };

  function isCreateClass(node) {
    if (!node || !t.isCallExpression(node)) return false;

    if (!isCreateClassCallExpression(node.callee) && !isCreateClassAddon(node.callee)) return false;

    var args = node.arguments;
    if (args.length !== 1) return false;

    var first = args[0];
    if (!t.isObjectExpression(first)) return false;

    return true;
  }

  return {
    visitor: {
      ExportDefaultDeclaration: function ExportDefaultDeclaration(_ref2, state) {
        var node = _ref2.node;

        if (isCreateClass(node.declaration)) {
          var displayName = state.file.opts.basename;

          if (displayName === "index") {
            displayName = _path2.default.basename(_path2.default.dirname(state.file.opts.filename));
          }

          addDisplayName(displayName, node.declaration);
        }
      },
      CallExpression: function CallExpression(path) {
        var node = path.node;

        if (!isCreateClass(node)) return;

        var id = void 0;

        path.find(function (path) {
          if (path.isAssignmentExpression()) {
            id = path.node.left;
          } else if (path.isObjectProperty()) {
            id = path.node.key;
          } else if (path.isVariableDeclarator()) {
            id = path.node.id;
          } else if (path.isStatement()) {
            return true;
          }

          if (id) return true;
        });

        if (!id) return;

        if (t.isMemberExpression(id)) {
          id = id.property;
        }

        if (t.isIdentifier(id)) {
          addDisplayName(id.name, node);
        }
      }
    }
  };
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];