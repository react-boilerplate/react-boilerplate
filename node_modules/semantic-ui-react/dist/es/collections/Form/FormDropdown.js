import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Dropdown from '../../modules/Dropdown';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Dropdown} />.
 * @see Dropdown
 * @see Form
 */

function FormDropdown(props) {
  var control = props.control;
  var rest = getUnhandledProps(FormDropdown, props);
  var ElementType = getElementType(FormDropdown, props);
  return React.createElement(ElementType, _extends({}, rest, {
    control: control
  }));
}

FormDropdown.handledProps = ["as", "control"];
FormDropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormDropdown.defaultProps = {
  as: FormField,
  control: Dropdown
};
export default FormDropdown;