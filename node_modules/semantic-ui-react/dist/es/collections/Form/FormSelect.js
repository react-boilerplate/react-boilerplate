import _extends from "@babel/runtime/helpers/extends";
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Select from '../../addons/Select';
import Dropdown from '../../modules/Dropdown';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Select} />.
 * @see Form
 * @see Select
 */

function FormSelect(props) {
  var control = props.control,
      options = props.options;
  var rest = getUnhandledProps(FormSelect, props);
  var ElementType = getElementType(FormSelect, props);
  return React.createElement(ElementType, _extends({}, rest, {
    control: control,
    options: options
  }));
}

FormSelect.handledProps = ["as", "control", "options"];
FormSelect.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: PropTypes.arrayOf(PropTypes.shape(Dropdown.Item.propTypes)).isRequired
} : {};
FormSelect.defaultProps = {
  as: FormField,
  control: Select
};
export default FormSelect;