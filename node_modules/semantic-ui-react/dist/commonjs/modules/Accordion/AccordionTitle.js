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

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A title sub-component for Accordion component.
 */
var AccordionTitle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AccordionTitle, _Component);

  function AccordionTitle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, AccordionTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(AccordionTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      return (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(AccordionTitle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content;
      var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), 'title', className);
      var rest = (0, _lib.getUnhandledProps)(AccordionTitle, this.props);
      var ElementType = (0, _lib.getElementType)(AccordionTitle, this.props);

      if ((0, _isNil2.default)(content)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), children);
      }

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), _react.default.createElement(_Icon.default, {
        name: "dropdown"
      }), content);
    }
  }]);
  return AccordionTitle;
}(_react.Component);

exports.default = AccordionTitle;
(0, _defineProperty2.default)(AccordionTitle, "handledProps", ["active", "as", "children", "className", "content", "index", "onClick"]);
AccordionTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Whether or not the title is in the open state. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** AccordionTitle index inside Accordion. */
  index: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func
} : {};
AccordionTitle.create = (0, _lib.createShorthandFactory)(AccordionTitle, function (content) {
  return {
    content: content
  };
});