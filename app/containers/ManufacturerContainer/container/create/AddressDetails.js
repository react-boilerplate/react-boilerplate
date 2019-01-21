/*
 * Create Bank Account Form Data
 *
 */

import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const inputField = props => (
  <Form.Input
    fluid
    label={props.label}
    placeholder={props.meta.initial || props.label}
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

const AddressDetails = () => (
  <div>
    <Form.Group widths="equal">
      <Field name="addressName" label="Address Name" component={inputField} />
      <Field
        name="addressLine1"
        label="Address Line 1"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="addressLine2"
        label="Address Line 2"
        component={inputField}
      />
      <Field name="city" label="City" component={inputField} />
    </Form.Group>

    <Form.Group widths="equal">
      <Field name="state" label="State" component={inputField} />
      <Field name="country" label="Country" component={inputField} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="pincode" label="Pincode" component={inputField} />
      <Field name="landmark" label="Landmark" component={inputField} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="contactPerson"
        label="Contact Person"
        component={inputField}
      />
      <Field name="contactPhone" label="Contact Phone" component={inputField} />
    </Form.Group>
  </div>
);

export default AddressDetails;
