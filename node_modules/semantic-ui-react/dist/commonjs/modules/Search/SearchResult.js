"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

// Note: You technically only need the 'content' wrapper when there's an
// image. However, optionally wrapping it makes this function a lot more
// complicated and harder to read. Since always wrapping it doesn't affect
// the style in any way let's just do that.
//
// Note: To avoid requiring a wrapping div, we return an array here so to
// prevent rendering issues each node needs a unique key.
var defaultRenderer = function defaultRenderer(_ref) {
  var image = _ref.image,
      price = _ref.price,
      title = _ref.title,
      description = _ref.description;
  return [image && _react.default.createElement("div", {
    key: "image",
    className: "image"
  }, (0, _lib.createHTMLImage)(image, {
    autoGenerateKey: false
  })), _react.default.createElement("div", {
    key: "content",
    className: "content"
  }, price && _react.default.createElement("div", {
    className: "price"
  }, price), title && _react.default.createElement("div", {
    className: "title"
  }, title), description && _react.default.createElement("div", {
    className: "description"
  }, description))];
};

defaultRenderer.handledProps = [];

var SearchResult =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SearchResult, _Component);

  function SearchResult() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SearchResult);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SearchResult)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      if (onClick) onClick(e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(SearchResult, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          className = _this$props.className,
          renderer = _this$props.renderer;
      var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), 'result', className);
      var rest = (0, _lib.getUnhandledProps)(SearchResult, this.props);
      var ElementType = (0, _lib.getElementType)(SearchResult, this.props); // Note: You technically only need the 'content' wrapper when there's an
      // image. However, optionally wrapping it makes this function a lot more
      // complicated and harder to read. Since always wrapping it doesn't affect
      // the style in any way let's just do that.

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), renderer(this.props));
    }
  }]);
  return SearchResult;
}(_react.Component);

exports.default = SearchResult;
(0, _defineProperty2.default)(SearchResult, "defaultProps", {
  renderer: defaultRenderer
});
(0, _defineProperty2.default)(SearchResult, "handledProps", ["active", "as", "className", "content", "description", "id", "image", "onClick", "price", "renderer", "title"]);
SearchResult.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: _propTypes.default.string,

  /** A unique identifier. */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Add an image to the item. */
  image: _propTypes.default.string,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** Customized text for price. */
  price: _propTypes.default.string,

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer: _propTypes.default.func,

  /** Display title. */
  title: _propTypes.default.string.isRequired
} : {};