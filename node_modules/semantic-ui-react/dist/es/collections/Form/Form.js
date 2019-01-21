import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useWidthProp } from '../../lib';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormDropdown from './FormDropdown';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormInput from './FormInput';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
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
  _inherits(Form, _Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (e) {
      var action = _this.props.action; // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
      // method.

      if (typeof action !== 'string') _invoke(e, 'preventDefault');

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      _invoke.apply(void 0, [_this.props, 'onSubmit', e, _this.props].concat(args));
    });

    return _this;
  }

  _createClass(Form, [{
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
      var classes = cx('ui', size, useKeyOnly(error, 'error'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(reply, 'reply'), useKeyOnly(success, 'success'), useKeyOnly(unstackable, 'unstackable'), useKeyOnly(warning, 'warning'), useWidthProp(widths, null, true), 'form', className);
      var rest = getUnhandledProps(Form, this.props);
      var ElementType = getElementType(Form, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        action: action,
        className: classes,
        onSubmit: this.handleSubmit
      }), children);
    }
  }]);

  return Form;
}(Component);

_defineProperty(Form, "defaultProps", {
  as: 'form'
});

_defineProperty(Form, "Field", FormField);

_defineProperty(Form, "Button", FormButton);

_defineProperty(Form, "Checkbox", FormCheckbox);

_defineProperty(Form, "Dropdown", FormDropdown);

_defineProperty(Form, "Group", FormGroup);

_defineProperty(Form, "Input", FormInput);

_defineProperty(Form, "Radio", FormRadio);

_defineProperty(Form, "Select", FormSelect);

_defineProperty(Form, "TextArea", FormTextArea);

_defineProperty(Form, "handledProps", ["action", "as", "children", "className", "error", "inverted", "loading", "onSubmit", "reply", "size", "success", "unstackable", "warning", "widths"]);

Form.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The HTML form action */
  action: PropTypes.string,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Automatically show any error Message children. */
  error: PropTypes.bool,

  /** A form can have its color inverted for contrast. */
  inverted: PropTypes.bool,

  /** Automatically show a loading indicator. */
  loading: PropTypes.bool,

  /** The HTML form submit handler. */
  onSubmit: PropTypes.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: PropTypes.bool,

  /** A form can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** Automatically show any success Message children. */
  success: PropTypes.bool,

  /** A form can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** Automatically show any warning Message children. */
  warning: PropTypes.bool,

  /** Forms can automatically divide fields to be equal width. */
  widths: PropTypes.oneOf(['equal'])
} : {};
export default Form;