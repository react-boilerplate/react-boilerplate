import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _get from "lodash/get";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { childrenUtils, createHTMLLabel, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useWidthProp } from '../../lib';
import Checkbox from '../../modules/Checkbox';
import Radio from '../../addons/Radio';
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
  var classes = cx(useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(inline, 'inline'), useKeyOnly(required, 'required'), useWidthProp(width, 'wide'), 'field', className);
  var rest = getUnhandledProps(FormField, props);
  var ElementType = getElementType(FormField, props); // ----------------------------------------
  // No Control
  // ----------------------------------------

  if (_isNil(control)) {
    if (_isNil(label)) {
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), childrenUtils.isNil(children) ? content : children);
    }

    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), createHTMLLabel(label, {
      autoGenerateKey: false
    }));
  } // ----------------------------------------
  // Checkbox/Radio Control
  // ----------------------------------------


  var controlProps = _objectSpread({}, rest, {
    content: content,
    children: children,
    disabled: disabled,
    required: required,
    type: type // wrap HTML checkboxes/radios in the label

  });

  if (control === 'input' && (type === 'checkbox' || type === 'radio')) {
    return React.createElement(ElementType, {
      className: classes
    }, React.createElement("label", null, createElement(control, controlProps), " ", label));
  } // pass label prop to controls that support it


  if (control === Checkbox || control === Radio) {
    return React.createElement(ElementType, {
      className: classes
    }, createElement(control, _objectSpread({}, controlProps, {
      label: label
    })));
  } // ----------------------------------------
  // Other Control
  // ----------------------------------------


  return React.createElement(ElementType, {
    className: classes
  }, createHTMLLabel(label, {
    defaultProps: {
      htmlFor: _get(controlProps, 'id')
    },
    autoGenerateKey: false
  }), createElement(control, controlProps));
}

FormField.handledProps = ["as", "children", "className", "content", "control", "disabled", "error", "inline", "label", "required", "type", "width"];
FormField.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /**
   * A form control component (i.e. Dropdown) or HTML tagName (i.e. 'input').
   * Extra FormField props are passed to the control component.
   * Mutually exclusive with children.
   */
  control: customPropTypes.some([PropTypes.func, PropTypes.oneOf(['button', 'input', 'select', 'textarea'])]),

  /** Individual fields may be disabled. */
  disabled: PropTypes.bool,

  /** Individual fields may display an error state. */
  error: PropTypes.bool,

  /** A field can have its label next to instead of above it. */
  inline: PropTypes.bool,
  // Heads Up!
  // Do not disallow children with `label` shorthand
  // The `control` might accept a `label` prop and `children`

  /** Mutually exclusive with children. */
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  /** A field can show that input is mandatory. */
  required: PropTypes.bool,

  /** Passed to the control component (i.e. <input type='password' />) */
  type: customPropTypes.every([customPropTypes.demand(['control'])]),

  /** A field can specify its width in grid columns */
  width: PropTypes.oneOf(SUI.WIDTHS)
} : {};
export default FormField;