/*
 * Create Bank Account Form Data
 *
 */

import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const inputField = props => {
  return  <Form.Input
    fluid
    label={props.label}
    placeholder={props.meta.initial || props.label}
    onChange={(event, data) => {console.log('input updated', event, data); return props.input.onChange(data.value)}}
  />
};

inputField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
};

const CoreDetails = () => (
  <div>
    <Form.Group widths="equal">
      <Field
        name="displayName"
        label="Manufacturer Name"
        component={inputField}
      />
      <Field
        name="legalName"
        label="Manufacturer Legal Name"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="gstNumber" label="GST Number" component={inputField} />
      <Field
        name="stateOfGstRegistration"
        label="GST State"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="customerCareNumber"
        label="Customer Care Number"
        component={inputField}
      />
      <Field
        name="customerCareEmail"
        label="Customer Care Email"
        component={inputField}
      />
    </Form.Group>
  </div>
);

export default CoreDetails;
