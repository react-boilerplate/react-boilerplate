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

var _has2 = _interopRequireDefault(require("lodash/has"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Button = _interopRequireDefault(require("../../elements/Button"));

var _Modal = _interopRequireDefault(require("../../modules/Modal"));

/**
 * A Confirm modal gives the user a choice to confirm or cancel an action/
 * @see Modal
 */
var Confirm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Confirm, _Component);

  function Confirm() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Confirm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Confirm)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleCancel", function (e) {
      (0, _invoke2.default)(_this.props, 'onCancel', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleCancelOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, buttonProps);

          _this.handleCancel(e);
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleConfirmOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, buttonProps);
          (0, _invoke2.default)(_this.props, 'onConfirm', e, _this.props);
        }
      };
    });
    return _this;
  }

  (0, _createClass2.default)(Confirm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cancelButton = _this$props.cancelButton,
          confirmButton = _this$props.confirmButton,
          content = _this$props.content,
          header = _this$props.header,
          open = _this$props.open,
          size = _this$props.size;
      var rest = (0, _lib.getUnhandledProps)(Confirm, this.props); // `open` is auto controlled by the Modal
      // It cannot be present (even undefined) with `defaultOpen`
      // only apply it if the user provided an open prop

      var openProp = {};
      if ((0, _has2.default)(this.props, 'open')) openProp.open = open;
      return _react.default.createElement(_Modal.default, (0, _extends2.default)({}, rest, openProp, {
        size: size,
        onClose: this.handleCancel
      }), _Modal.default.Header.create(header, {
        autoGenerateKey: false
      }), _Modal.default.Content.create(content, {
        autoGenerateKey: false
      }), _react.default.createElement(_Modal.default.Actions, null, _Button.default.create(cancelButton, {
        autoGenerateKey: false,
        overrideProps: this.handleCancelOverrides
      }), _Button.default.create(confirmButton, {
        autoGenerateKey: false,
        defaultProps: {
          primary: true
        },
        overrideProps: this.handleConfirmOverrides
      })));
    }
  }]);
  return Confirm;
}(_react.Component);

(0, _defineProperty2.default)(Confirm, "defaultProps", {
  cancelButton: 'Cancel',
  confirmButton: 'OK',
  content: 'Are you sure?',
  size: 'small'
});
(0, _defineProperty2.default)(Confirm, "handledProps", ["cancelButton", "confirmButton", "content", "header", "onCancel", "onConfirm", "open", "size"]);
Confirm.propTypes = process.env.NODE_ENV !== "production" ? {
  /** The cancel button text. */
  cancelButton: _lib.customPropTypes.itemShorthand,

  /** The OK button text. */
  confirmButton: _lib.customPropTypes.itemShorthand,

  /** The ModalContent text. */
  content: _lib.customPropTypes.itemShorthand,

  /** The ModalHeader text. */
  header: _lib.customPropTypes.itemShorthand,

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel: _propTypes.default.func,

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm: _propTypes.default.func,

  /** Whether or not the modal is visible. */
  open: _propTypes.default.bool,

  /** A Confirm can vary in size */
  size: _propTypes.default.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
} : {};
var _default = Confirm;
exports.default = _default;