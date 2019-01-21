"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _AccordionTitle = _interopRequireDefault(require("./AccordionTitle"));

var _AccordionContent = _interopRequireDefault(require("./AccordionContent"));

/**
 * A panel sub-component for Accordion component.
 */
var AccordionPanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AccordionPanel, _Component);

  function AccordionPanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, AccordionPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(AccordionPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTitleOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, titleProps) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, titleProps);
          (0, _invoke2.default)(_this.props, 'onTitleClick', e, titleProps);
        }
      };
    });
    return _this;
  }

  (0, _createClass2.default)(AccordionPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          content = _this$props.content,
          index = _this$props.index,
          title = _this$props.title;
      return _react.default.createElement(_react.Fragment, null, _AccordionTitle.default.create(title, {
        autoGenerateKey: false,
        defaultProps: {
          active: active,
          index: index
        },
        overrideProps: this.handleTitleOverrides
      }), _AccordionContent.default.create(content, {
        autoGenerateKey: false,
        defaultProps: {
          active: active
        }
      }));
    }
  }]);
  return AccordionPanel;
}(_react.Component);

(0, _defineProperty2.default)(AccordionPanel, "handledProps", ["active", "content", "index", "onTitleClick", "title"]);
AccordionPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Whether or not the title is in the open state. */
  active: _propTypes.default.bool,

  /** A shorthand for Accordion.Content. */
  content: _lib.customPropTypes.itemShorthand,

  /** A panel index. */
  index: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: _propTypes.default.func,

  /** A shorthand for Accordion.Title. */
  title: _lib.customPropTypes.itemShorthand
} : {};
AccordionPanel.create = (0, _lib.createShorthandFactory)(AccordionPanel, null);
var _default = AccordionPanel;
exports.default = _default;