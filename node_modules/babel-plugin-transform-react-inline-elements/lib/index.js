"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function hasRefOrSpread(attrs) {
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (t.isJSXSpreadAttribute(attr)) return true;
      if (isJSXAttributeOfName(attr, "ref")) return true;
    }
    return false;
  }

  function isJSXAttributeOfName(attr, name) {
    return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
  }

  function getAttributeValue(attr) {
    var value = attr.value;
    if (!value) return t.identifier("true");
    if (t.isJSXExpressionContainer(value)) value = value.expression;
    return value;
  }

  return {
    visitor: {
      JSXElement: function JSXElement(path, file) {
        var node = path.node;

        var open = node.openingElement;
        if (hasRefOrSpread(open.attributes)) return;

        var props = t.objectExpression([]);
        var key = null;
        var type = open.name;

        if (t.isJSXIdentifier(type) && t.react.isCompatTag(type.name)) {
          type = t.stringLiteral(type.name);
        }

        function pushProp(objProps, key, value) {
          objProps.push(t.objectProperty(key, value));
        }

        for (var _iterator = open.attributes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var attr = _ref2;

          if (isJSXAttributeOfName(attr, "key")) {
            key = getAttributeValue(attr);
          } else {
            var name = attr.name.name;
            var propertyKey = t.isValidIdentifier(name) ? t.identifier(name) : t.stringLiteral(name);
            pushProp(props.properties, propertyKey, getAttributeValue(attr));
          }
        }

        var args = [type, props];
        if (key || node.children.length) {
          var children = t.react.buildChildren(node);
          args.push.apply(args, [key || t.unaryExpression("void", t.numericLiteral(0), true)].concat(children));
        }

        var el = t.callExpression(file.addHelper("jsx"), args);
        path.replaceWith(el);
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];