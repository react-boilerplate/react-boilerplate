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

const AddressDetails = props => (
  <div>
    <Form.Group widths="equal">
      <Field
        name={`${props.addressType}.addressName`}
        label="Address Name"
        component={inputField}
      />
      <Field
        name={`${props.addressType}.addressLine1`}
        label="Address Line 1"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name={`${props.addressType}.addressLine2`}
        label="Address Line 2"
        component={inputField}
      />
      <Field
        name={`${props.addressType}.city`}
        label="City"
        component={inputField}
      />
    </Form.Group>

    <Form.Group widths="equal">
      <Field
        name={`${props.addressType}.state`}
        label="State"
        component={inputField}
      />
      <Field
        name={`${props.addressType}.country`}
        label="Country"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name={`${props.addressType}.pincode`}
        label="Pincode"
        component={inputField}
      />
      <Field
        name={`${props.addressType}.landmark`}
        label="Landmark"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name={`${props.addressType}.contactPerson`}
        label="Contact Person"
        component={inputField}
      />
      <Field
        name={`${props.addressType}.contactPhone`}
        label="Contact Phone"
        component={inputField}
      />
    </Form.Group>
  </div>
);

AddressDetails.propTypes = {
  addressType: PropTypes.string,
};

export default AddressDetails;
