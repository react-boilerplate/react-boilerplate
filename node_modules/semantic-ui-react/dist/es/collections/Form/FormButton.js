import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Button} />.
 * @see Button
 * @see Form
 */

function FormButton(props) {
  var control = props.control;
  var rest = getUnhandledProps(FormButton, props);
  var ElementType = getElementType(FormButton, props);
  return React.createElement(ElementType, _extends({}, rest, {
    control: control
  }));
}

FormButton.handledProps = ["as", "control"];
FormButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormButton.defaultProps = {
  as: FormField,
  control: Button
};
export default FormButton;