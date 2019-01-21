"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sum2 = _interopRequireDefault(require("lodash/sum"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */
var TextArea =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TextArea, _Component);

  function TextArea() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "focus", function () {
      return _this.ref.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var value = (0, _get2.default)(e, 'target.value');
      (0, _invoke2.default)(_this.props, 'onChange', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleInput", function (e) {
      var value = (0, _get2.default)(e, 'target.value');
      (0, _invoke2.default)(_this.props, 'onInput', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));

      _this.updateHeight();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "removeAutoHeightStyles", function () {
      _this.ref.style.height = null;
      _this.ref.style.resize = null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateHeight", function () {
      var autoHeight = _this.props.autoHeight;
      if (!_this.ref || !autoHeight) return;

      var _window$getComputedSt = window.getComputedStyle(_this.ref),
          minHeight = _window$getComputedSt.minHeight,
          borderBottomWidth = _window$getComputedSt.borderBottomWidth,
          borderTopWidth = _window$getComputedSt.borderTopWidth;

      var borderHeight = (0, _sum2.default)([borderBottomWidth, borderTopWidth].map(function (x) {
        return parseFloat(x);
      })); // Measure the scrollHeight and update the height to match.

      _this.ref.style.height = 'auto';
      _this.ref.style.overflowY = 'hidden';
      _this.ref.style.height = "".concat(Math.max(parseFloat(minHeight), Math.ceil(_this.ref.scrollHeight + borderHeight)), "px");
      _this.ref.style.overflowY = '';
    });
    return _this;
  }

  (0, _createClass2.default)(TextArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // removed autoHeight
      if (!this.props.autoHeight && prevProps.autoHeight) {
        this.removeAutoHeightStyles();
      } // added autoHeight or value changed


      if (this.props.autoHeight && !prevProps.autoHeight || prevProps.value !== this.props.value) {
        this.updateHeight();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoHeight = _this$props.autoHeight,
          rows = _this$props.rows,
          style = _this$props.style,
          value = _this$props.value;
      var rest = (0, _lib.getUnhandledProps)(TextArea, this.props);
      var ElementType = (0, _lib.getElementType)(TextArea, this.props);
      var resize = autoHeight ? 'none' : '';
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        onChange: this.handleChange,
        onInput: this.handleInput,
        ref: this.handleRef,
        rows: rows,
        style: (0, _objectSpread2.default)({
          resize: resize
        }, style),
        value: value
      }));
    }
  }]);
  return TextArea;
}(_react.Component);

(0, _defineProperty2.default)(TextArea, "defaultProps", {
  as: 'textarea',
  rows: 3
});
(0, _defineProperty2.default)(TextArea, "handledProps", ["as", "autoHeight", "onChange", "onInput", "rows", "style", "value"]);
TextArea.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Indicates whether height of the textarea fits the content or not. */
  autoHeight: _propTypes.default.bool,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: _propTypes.default.func,

  /**
   * Called on input.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput: _propTypes.default.func,

  /** Indicates row count for a TextArea. */
  rows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Custom TextArea style. */
  style: _propTypes.default.object,

  /** The value of the textarea. */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
var _default = TextArea;
exports.default = _default;