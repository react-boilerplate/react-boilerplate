"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  var JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  var visitor = (0, _babelHelperBuilderReactJsx2.default)({
    pre: function pre(state) {
      var tagName = state.tagName;
      var args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },
    post: function post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    }
  });

  visitor.Program = function (path, state) {
    var file = state.file;

    var id = state.opts.pragma || "React.createElement";

    for (var _iterator = file.ast.comments, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var comment = _ref2;

      var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        if (id === "React.DOM") {
          throw file.buildCodeFrameError(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
        } else {
          break;
        }
      }
    }

    state.set("jsxIdentifier", function () {
      return id.split(".").map(function (name) {
        return t.identifier(name);
      }).reduce(function (object, property) {
        return t.memberExpression(object, property);
      });
    });
  };

  return {
    inherits: _babelPluginSyntaxJsx2.default,
    visitor: visitor
  };
};

var _babelPluginSyntaxJsx = require("babel-plugin-syntax-jsx");

var _babelPluginSyntaxJsx2 = _interopRequireDefault(_babelPluginSyntaxJsx);

var _babelHelperBuilderReactJsx = require("babel-helper-builder-react-jsx");

var _babelHelperBuilderReactJsx2 = _interopRequireDefault(_babelHelperBuilderReactJsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];