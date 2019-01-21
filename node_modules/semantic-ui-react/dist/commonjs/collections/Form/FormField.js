"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Checkbox = _interopRequireDefault(require("../../modules/Checkbox"));

var _Radio = _interopRequireDefault(require("../../addons/Radio"));

/**
 * A field is a form element containing a label and an input.
 * @see Form
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Radio
 * @see Select
 * @see Visibility
 */
function FormField(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      control = props.control,
      disabled = props.disabled,
      error = props.error,
      inline = props.inline,
      label = props.label,
      required = props.required,
      type = props.type,
      width = props.width;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(inline, 'inline'), (0, _lib.useKeyOnly)(required, 'required'), (0, _lib.useWidthProp)(width, 'wide'), 'field', className);
  var rest = (0, _lib.getUnhandledProps)(FormField, props);
  var ElementType = (0, _lib.getElementType)(FormField, props); // ----------------------------------------
  // No Control
  // ----------------------------------------

  if ((0, _isNil2.default)(control)) {
    if ((0, _isNil2.default)(label)) {
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes
      }), _lib.childrenUtils.isNil(children) ? content : children);
    }

    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), (0, _lib.createHTMLLabel)(label, {
      autoGenerateKey: false
    }));
  } // ----------------------------------------
  // Checkbox/Radio Control
  // ----------------------------------------


  var controlProps = (0, _objectSpread2.default)({}, rest, {
    content: content,
    children: children,
    disabled: disabled,
    required: required,
    type: type // wrap HTML checkboxes/radios in the label

  });

  if (control === 'input' && (type === 'checkbox' || type === 'radio')) {
    return _react.default.createElement(ElementType, {
      className: classes
    }, _react.default.createElement("label", null, (0, _react.createElement)(control, controlProps), " ", label));
  } // pass label prop to controls that support it


  if (control === _Checkbox.default || control === _Radio.default) {
    return _react.default.createElement(ElementType, {
      className: classes
    }, (0, _react.createElement)(control, (0, _objectSpread2.default)({}, controlProps, {
      label: label
    })));
  } // ----------------------------------------
  // Other Control
  // ----------------------------------------


  return _react.default.createElement(ElementType, {
    className: classes
  }, (0, _lib.createHTMLLabel)(label, {
    defaultProps: {
      htmlFor: (0, _get2.default)(controlProps, 'id')
    },
    autoGenerateKey: false
  }), (0, _react.createElement)(control, controlProps));
}

FormField.handledProps = ["as", "children", "className", "content", "control", "disabled", "error", "inline", "label", "required", "type", "width"];
FormField.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /**
   * A form control component (i.e. Dropdown) or HTML tagName (i.e. 'input').
   * Extra FormField props are passed to the control component.
   * Mutually exclusive with children.
   */
  control: _lib.customPropTypes.some([_propTypes.default.func, _propTypes.default.oneOf(['button', 'input', 'select', 'textarea'])]),

  /** Individual fields may be disabled. */
  disabled: _propTypes.default.bool,

  /** Individual fields may display an error state. */
  error: _propTypes.default.bool,

  /** A field can have its label next to instead of above it. */
  inline: _propTypes.default.bool,
  // Heads Up!
  // Do not disallow children with `label` shorthand
  // The `control` might accept a `label` prop and `children`

  /** Mutually exclusive with children. */
  label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]),

  /** A field can show that input is mandatory. */
  required: _propTypes.default.bool,

  /** Passed to the control component (i.e. <input type='password' />) */
  type: _lib.customPropTypes.every([_lib.customPropTypes.demand(['control'])]),

  /** A field can specify its width in grid columns */
  width: _propTypes.default.oneOf(_lib.SUI.WIDTHS)
} : {};
var _default = FormField;
exports.default = _default;