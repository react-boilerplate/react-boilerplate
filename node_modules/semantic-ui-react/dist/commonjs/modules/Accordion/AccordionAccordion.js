"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _AccordionPanel = _interopRequireDefault(require("./AccordionPanel"));

/**
 * An Accordion can contain sub-accordions.
 */
var AccordionAccordion =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AccordionAccordion, _Component);

  function AccordionAccordion() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, AccordionAccordion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(AccordionAccordion)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeNewIndex", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      if (exclusive) return index === activeIndex ? -1 : index; // check to see if index is in array, and remove it, if not then add it

      return (0, _includes2.default)(activeIndex, index) ? (0, _without2.default)(activeIndex, index) : (0, _toConsumableArray2.default)(activeIndex).concat([index]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTitleClick", function (e, titleProps) {
      var index = titleProps.index;

      _this.trySetState({
        activeIndex: _this.computeNewIndex(index)
      });

      (0, _invoke2.default)(_this.props, 'onTitleClick', e, titleProps);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isIndexActive", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      return exclusive ? activeIndex === index : (0, _includes2.default)(activeIndex, index);
    });
    return _this;
  }

  (0, _createClass2.default)(AccordionAccordion, [{
    key: "getInitialAutoControlledState",
    value: function getInitialAutoControlledState(_ref) {
      var exclusive = _ref.exclusive;
      return {
        activeIndex: exclusive ? -1 : []
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          panels = _this$props.panels;
      var classes = (0, _classnames.default)('accordion', className);
      var rest = (0, _lib.getUnhandledProps)(AccordionAccordion, this.props);
      var ElementType = (0, _lib.getElementType)(AccordionAccordion, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes
      }), _lib.childrenUtils.isNil(children) ? (0, _map2.default)(panels, function (panel, index) {
        return _AccordionPanel.default.create(panel, {
          defaultProps: {
            active: _this2.isIndexActive(index),
            index: index,
            onTitleClick: _this2.handleTitleClick
          }
        });
      }) : children);
    }
  }]);
  return AccordionAccordion;
}(_lib.AutoControlledComponent);

exports.default = AccordionAccordion;
(0, _defineProperty2.default)(AccordionAccordion, "defaultProps", {
  exclusive: true
});
(0, _defineProperty2.default)(AccordionAccordion, "autoControlledProps", ['activeIndex']);
(0, _defineProperty2.default)(AccordionAccordion, "handledProps", ["activeIndex", "as", "children", "className", "defaultActiveIndex", "exclusive", "onTitleClick", "panels"]);
AccordionAccordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Index of the currently active panel. */
  activeIndex: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number])]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number])]),

  /** Only allow one panel open at a time. */
  exclusive: _propTypes.default.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** Shorthand array of props for Accordion. */
  panels: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.arrayOf(_propTypes.default.shape({
    content: _lib.customPropTypes.itemShorthand,
    title: _lib.customPropTypes.itemShorthand
  }))])
} : {};
AccordionAccordion.create = (0, _lib.createShorthandFactory)(AccordionAccordion, function (content) {
  return {
    content: content
  };
});