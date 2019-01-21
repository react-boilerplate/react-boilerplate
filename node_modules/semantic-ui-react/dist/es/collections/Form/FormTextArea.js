import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import TextArea from '../../addons/TextArea';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={TextArea} />.
 * @see Form
 * @see TextArea
 */

function FormTextArea(props) {
  var control = props.control;
  var rest = getUnhandledProps(FormTextArea, props);
  var ElementType = getElementType(FormTextArea, props);
  return React.createElement(ElementType, _extends({}, rest, {
    control: control
  }));
}

FormTextArea.handledProps = ["as", "control"];
FormTextArea.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormTextArea.defaultProps = {
  as: FormField,
  control: TextArea
};
export default FormTextArea;