"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _binding = _interopRequireDefault(require("../binding"));

function _helperSplitExportDeclaration() {
  var data = _interopRequireDefault(require("@babel/helper-split-export-declaration"));

  _helperSplitExportDeclaration = function _helperSplitExportDeclaration() {
    return data;
  };

  return data;
}

function t() {
  var data = _interopRequireWildcard(require("@babel/types"));

  t = function t() {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renameVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(_ref, state) {
    var node = _ref.node;

    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },
  Scope: function Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier)) {
      path.skip();
    }
  },
  "AssignmentExpression|Declaration": function AssignmentExpressionDeclaration(path, state) {
    var ids = path.getOuterBindingIdentifiers();

    for (var name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  }
};

var Renamer = function () {
  function Renamer(binding, oldName, newName) {
    this.newName = newName;
    this.oldName = oldName;
    this.binding = binding;
  }

  var _proto = Renamer.prototype;

  _proto.maybeConvertFromExportDeclaration = function maybeConvertFromExportDeclaration(parentDeclar) {
    var maybeExportDeclar = parentDeclar.parentPath;

    if (!maybeExportDeclar.isExportDeclaration()) {
      return;
    }

    if (maybeExportDeclar.isExportDefaultDeclaration() && !maybeExportDeclar.get("declaration").node.id) {
      return;
    }

    (0, _helperSplitExportDeclaration().default)(maybeExportDeclar);
  };

  _proto.maybeConvertFromClassFunctionDeclaration = function maybeConvertFromClassFunctionDeclaration(path) {
    return;
    if (!path.isFunctionDeclaration() && !path.isClassDeclaration()) return;
    if (this.binding.kind !== "hoisted") return;
    path.node.id = t().identifier(this.oldName);
    path.node._blockHoist = 3;
    path.replaceWith(t().variableDeclaration("let", [t().variableDeclarator(t().identifier(this.newName), t().toExpression(path.node))]));
  };

  _proto.maybeConvertFromClassFunctionExpression = function maybeConvertFromClassFunctionExpression(path) {
    return;
    if (!path.isFunctionExpression() && !path.isClassExpression()) return;
    if (this.binding.kind !== "local") return;
    path.node.id = t().identifier(this.oldName);
    this.binding.scope.parent.push({
      id: t().identifier(this.newName)
    });
    path.replaceWith(t().assignmentExpression("=", t().identifier(this.newName), path.node));
  };

  _proto.rename = function rename(block) {
    var binding = this.binding,
        oldName = this.oldName,
        newName = this.newName;
    var scope = binding.scope,
        path = binding.path;
    var parentDeclar = path.find(function (path) {
      return path.isDeclaration() || path.isFunctionExpression() || path.isClassExpression();
    });

    if (parentDeclar) {
      this.maybeConvertFromExportDeclaration(parentDeclar);
    }

    scope.traverse(block || scope.block, renameVisitor, this);

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = binding;
      this.binding.identifier.name = newName;
    }

    if (binding.type === "hoisted") {}

    if (parentDeclar) {
      this.maybeConvertFromClassFunctionDeclaration(parentDeclar);
      this.maybeConvertFromClassFunctionExpression(parentDeclar);
    }
  };

  return Renamer;
}();

exports.default = Renamer;