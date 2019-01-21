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

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _FormCheckbox = _interopRequireDefault(require("./FormCheckbox"));

var _FormDropdown = _interopRequireDefault(require("./FormDropdown"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _FormGroup = _interopRequireDefault(require("./FormGroup"));

var _FormInput = _interopRequireDefault(require("./FormInput"));

var _FormRadio = _interopRequireDefault(require("./FormRadio"));

var _FormSelect = _interopRequireDefault(require("./FormSelect"));

var _FormTextArea = _interopRequireDefault(require("./FormTextArea"));

/**
 * A Form displays a set of related user input fields in a structured way.
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Message
 * @see Radio
 * @see Select
 * @see Visibility
 */
var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Form, _Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSubmit", function (e) {
      var action = _this.props.action; // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
      // method.

      if (typeof action !== 'string') (0, _invoke2.default)(e, 'preventDefault');

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      _invoke2.default.apply(void 0, [_this.props, 'onSubmit', e, _this.props].concat(args));
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          action = _this$props.action,
          children = _this$props.children,
          className = _this$props.className,
          error = _this$props.error,
          inverted = _this$props.inverted,
          loading = _this$props.loading,
          reply = _this$props.reply,
          size = _this$props.size,
          success = _this$props.success,
          unstackable = _this$props.unstackable,
          warning = _this$props.warning,
          widths = _this$props.widths;
      var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(reply, 'reply'), (0, _lib.useKeyOnly)(success, 'success'), (0, _lib.useKeyOnly)(unstackable, 'unstackable'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useWidthProp)(widths, null, true), 'form', className);
      var rest = (0, _lib.getUnhandledProps)(Form, this.props);
      var ElementType = (0, _lib.getElementType)(Form, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        action: action,
        className: classes,
        onSubmit: this.handleSubmit
      }), children);
    }
  }]);
  return Form;
}(_react.Component);

(0, _defineProperty2.default)(Form, "defaultProps", {
  as: 'form'
});
(0, _defineProperty2.default)(Form, "Field", _FormField.default);
(0, _defineProperty2.default)(Form, "Button", _FormButton.default);
(0, _defineProperty2.default)(Form, "Checkbox", _FormCheckbox.default);
(0, _defineProperty2.default)(Form, "Dropdown", _FormDropdown.default);
(0, _defineProperty2.default)(Form, "Group", _FormGroup.default);
(0, _defineProperty2.default)(Form, "Input", _FormInput.default);
(0, _defineProperty2.default)(Form, "Radio", _FormRadio.default);
(0, _defineProperty2.default)(Form, "Select", _FormSelect.default);
(0, _defineProperty2.default)(Form, "TextArea", _FormTextArea.default);
(0, _defineProperty2.default)(Form, "handledProps", ["action", "as", "children", "className", "error", "inverted", "loading", "onSubmit", "reply", "size", "success", "unstackable", "warning", "widths"]);
Form.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The HTML form action */
  action: _propTypes.default.string,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Automatically show any error Message children. */
  error: _propTypes.default.bool,

  /** A form can have its color inverted for contrast. */
  inverted: _propTypes.default.bool,

  /** Automatically show a loading indicator. */
  loading: _propTypes.default.bool,

  /** The HTML form submit handler. */
  onSubmit: _propTypes.default.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: _propTypes.default.bool,

  /** A form can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Automatically show any success Message children. */
  success: _propTypes.default.bool,

  /** A form can prevent itself from stacking on mobile. */
  unstackable: _propTypes.default.bool,

  /** Automatically show any warning Message children. */
  warning: _propTypes.default.bool,

  /** Forms can automatically divide fields to be equal width. */
  widths: _propTypes.default.oneOf(['equal'])
} : {};
var _default = Form;
exports.default = _default;