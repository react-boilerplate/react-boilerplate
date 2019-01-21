import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Radio from '../../addons/Radio';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Radio} />.
 * @see Form
 * @see Radio
 */

function FormRadio(props) {
  var control = props.control;
  var rest = getUnhandledProps(FormRadio, props);
  var ElementType = getElementType(FormRadio, props);
  return React.createElement(ElementType, _extends({}, rest, {
    control: control
  }));
}

FormRadio.handledProps = ["as", "control"];
FormRadio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormRadio.defaultProps = {
  as: FormField,
  control: Radio
};
export default FormRadio;