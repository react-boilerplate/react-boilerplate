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

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * A section sub-component for Breadcrumb component.
 */
var BreadcrumbSection =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BreadcrumbSection, _Component);

  function BreadcrumbSection() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, BreadcrumbSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(BreadcrumbSection)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeElementType", function () {
      var _this$props = _this.props,
          link = _this$props.link,
          onClick = _this$props.onClick;
      if (link || onClick) return 'a';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      return (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(BreadcrumbSection, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          active = _this$props2.active,
          children = _this$props2.children,
          className = _this$props2.className,
          content = _this$props2.content,
          href = _this$props2.href;
      var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), 'section', className);
      var rest = (0, _lib.getUnhandledProps)(BreadcrumbSection, this.props);
      var ElementType = (0, _lib.getElementType)(BreadcrumbSection, this.props, this.computeElementType);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        href: href,
        onClick: this.handleClick
      }), _lib.childrenUtils.isNil(children) ? content : children);
    }
  }]);
  return BreadcrumbSection;
}(_react.Component);

exports.default = BreadcrumbSection;
(0, _defineProperty2.default)(BreadcrumbSection, "handledProps", ["active", "as", "children", "className", "content", "href", "link", "onClick"]);
BreadcrumbSection.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Style as the currently active section. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['link']), _propTypes.default.string]),

  /** Render as an `a` tag instead of a `div`. */
  link: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['href']), _propTypes.default.bool]),

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func
} : {};
BreadcrumbSection.create = (0, _lib.createShorthandFactory)(BreadcrumbSection, function (content) {
  return {
    content: content,
    link: true
  };
});