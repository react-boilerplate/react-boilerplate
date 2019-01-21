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

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * A search item sub-component for Dropdown component.
 */
var DropdownSearchInput =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropdownSearchInput, _Component);

  function DropdownSearchInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DropdownSearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DropdownSearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var value = (0, _get2.default)(e, 'target.value');
      (0, _invoke2.default)(_this.props, 'onChange', e, (0, _objectSpread2.default)({}, _this.props, {
        value: value
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return (0, _invoke2.default)(_this.props, 'inputRef', c);
    });
    return _this;
  }

  (0, _createClass2.default)(DropdownSearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoComplete = _this$props.autoComplete,
          className = _this$props.className,
          tabIndex = _this$props.tabIndex,
          type = _this$props.type,
          value = _this$props.value;
      var classes = (0, _classnames.default)('search', className);
      var rest = (0, _lib.getUnhandledProps)(DropdownSearchInput, this.props);
      return _react.default.createElement("input", (0, _extends2.default)({}, rest, {
        "aria-autocomplete": "list",
        autoComplete: autoComplete,
        className: classes,
        onChange: this.handleChange,
        ref: this.handleRef,
        tabIndex: tabIndex,
        type: type,
        value: value
      }));
    }
  }]);
  return DropdownSearchInput;
}(_react.Component);

(0, _defineProperty2.default)(DropdownSearchInput, "defaultProps", {
  autoComplete: 'off',
  type: 'text'
});
(0, _defineProperty2.default)(DropdownSearchInput, "handledProps", ["as", "autoComplete", "className", "inputRef", "tabIndex", "type", "value"]);
DropdownSearchInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** An input can have the auto complete. */
  autoComplete: _propTypes.default.string,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A ref handler for input. */
  inputRef: _propTypes.default.func,

  /** An input can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** The HTML input type. */
  type: _propTypes.default.string,

  /** Stored value. */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
DropdownSearchInput.create = (0, _lib.createShorthandFactory)(DropdownSearchInput, function (type) {
  return {
    type: type
  };
});
var _default = DropdownSearchInput;
exports.default = _default;