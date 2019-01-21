"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

function SearchCategory(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      renderer = props.renderer;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), 'category', className);
  var rest = (0, _lib.getUnhandledProps)(SearchCategory, props);
  var ElementType = (0, _lib.getElementType)(SearchCategory, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _react.default.createElement("div", {
    className: "name"
  }, renderer(props)), _react.default.createElement("div", {
    className: "results"
  }, _lib.childrenUtils.isNil(children) ? content : children));
}

SearchCategory.handledProps = ["active", "as", "children", "className", "content", "name", "renderer", "results"];
SearchCategory.defaultProps = {
  renderer: function renderer(_ref) {
    var name = _ref.name;
    return name;
  }
};
SearchCategory.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Display name. */
  name: _propTypes.default.string,

  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable category contents.
   */
  renderer: _propTypes.default.func,

  /** Array of Search.Result props. */
  results: _propTypes.default.array
} : {};
var _default = SearchCategory;
exports.default = _default;