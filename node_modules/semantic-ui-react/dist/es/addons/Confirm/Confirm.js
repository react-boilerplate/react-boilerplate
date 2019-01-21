import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _has from "lodash/has";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
import Modal from '../../modules/Modal';
/**
 * A Confirm modal gives the user a choice to confirm or cancel an action/
 * @see Modal
 */

var Confirm =
/*#__PURE__*/
function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Confirm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Confirm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCancel", function (e) {
      _invoke(_this.props, 'onCancel', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCancelOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          _invoke(predefinedProps, 'onClick', e, buttonProps);

          _this.handleCancel(e);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleConfirmOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          _invoke(predefinedProps, 'onClick', e, buttonProps);

          _invoke(_this.props, 'onConfirm', e, _this.props);
        }
      };
    });

    return _this;
  }

  _createClass(Confirm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cancelButton = _this$props.cancelButton,
          confirmButton = _this$props.confirmButton,
          content = _this$props.content,
          header = _this$props.header,
          open = _this$props.open,
          size = _this$props.size;
      var rest = getUnhandledProps(Confirm, this.props); // `open` is auto controlled by the Modal
      // It cannot be present (even undefined) with `defaultOpen`
      // only apply it if the user provided an open prop

      var openProp = {};
      if (_has(this.props, 'open')) openProp.open = open;
      return React.createElement(Modal, _extends({}, rest, openProp, {
        size: size,
        onClose: this.handleCancel
      }), Modal.Header.create(header, {
        autoGenerateKey: false
      }), Modal.Content.create(content, {
        autoGenerateKey: false
      }), React.createElement(Modal.Actions, null, Button.create(cancelButton, {
        autoGenerateKey: false,
        overrideProps: this.handleCancelOverrides
      }), Button.create(confirmButton, {
        autoGenerateKey: false,
        defaultProps: {
          primary: true
        },
        overrideProps: this.handleConfirmOverrides
      })));
    }
  }]);

  return Confirm;
}(Component);

_defineProperty(Confirm, "defaultProps", {
  cancelButton: 'Cancel',
  confirmButton: 'OK',
  content: 'Are you sure?',
  size: 'small'
});

_defineProperty(Confirm, "handledProps", ["cancelButton", "confirmButton", "content", "header", "onCancel", "onConfirm", "open", "size"]);

Confirm.propTypes = process.env.NODE_ENV !== "production" ? {
  /** The cancel button text. */
  cancelButton: customPropTypes.itemShorthand,

  /** The OK button text. */
  confirmButton: customPropTypes.itemShorthand,

  /** The ModalContent text. */
  content: customPropTypes.itemShorthand,

  /** The ModalHeader text. */
  header: customPropTypes.itemShorthand,

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel: PropTypes.func,

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm: PropTypes.func,

  /** Whether or not the modal is visible. */
  open: PropTypes.bool,

  /** A Confirm can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
} : {};
export default Confirm;