import { Form } from 'semantic-ui-react/';
import React from 'react';
import PropTypes from 'prop-types';

const inputField = props => (
  <Form.Input
    fluid
    label={props.label}
    placeholder={props.label}
    onChange={(param, data) => props.input.onChange(data.value)}
  />
);

inputField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
};
export default inputField;
