"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneNode;

var _definitions = require("../definitions");

var has = Function.call.bind(Object.prototype.hasOwnProperty);

function cloneIfNode(obj, deep) {
  if (obj && typeof obj.type === "string" && obj.type !== "CommentLine" && obj.type !== "CommentBlock") {
    return cloneNode(obj, deep);
  }

  return obj;
}

function cloneIfNodeOrArray(obj, deep) {
  if (Array.isArray(obj)) {
    return obj.map(function (node) {
      return cloneIfNode(node, deep);
    });
  }

  return cloneIfNode(obj, deep);
}

function cloneNode(node, deep) {
  if (deep === void 0) {
    deep = true;
  }

  if (!node) return node;
  var type = node.type;
  var newNode = {
    type: type
  };

  if (type === "Identifier") {
    newNode.name = node.name;
  } else if (!has(_definitions.NODE_FIELDS, type)) {
    throw new Error("Unknown node type: \"" + type + "\"");
  } else {
    var _arr = Object.keys(_definitions.NODE_FIELDS[type]);

    for (var _i = 0; _i < _arr.length; _i++) {
      var field = _arr[_i];

      if (has(node, field)) {
        newNode[field] = deep ? cloneIfNodeOrArray(node[field], true) : node[field];
      }
    }
  }

  if (has(node, "loc")) {
    newNode.loc = node.loc;
  }

  if (has(node, "leadingComments")) {
    newNode.leadingComments = node.leadingComments;
  }

  if (has(node, "innerComments")) {
    newNode.innerComments = node.innerCmments;
  }

  if (has(node, "trailingComments")) {
    newNode.trailingComments = node.trailingComments;
  }

  if (has(node, "extra")) {
    newNode.extra = Object.assign({}, node.extra);
  }

  return newNode;
}