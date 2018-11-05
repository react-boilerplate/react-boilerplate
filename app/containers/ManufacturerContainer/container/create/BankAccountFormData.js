/*
 * Create Bank Account Form Data
 *
 */

import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

const options = [
  { key: 'saving', text: 'Saving', value: 'SAVING' },
  { key: 'current', text: 'Current', value: 'CURRENT' },
];

const dropdownField = props => (
  <Form.Field>
    <label>{props.label}</label>
    <Dropdown
      fluid
      selection
      options={options}
      defaultValue={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
    />
  </Form.Field>
);

dropdownField.propTypes = {
  input: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  label: PropTypes.string,
};

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

const BankAccountFormData = () => (
  <div>
    <Field
      name="bankAccount.displayName"
      label="Display Name"
      component={inputField}
    />
    <Form.Group widths="equal">
      <Field name="bankAccount.name" label="Name" component={inputField} />
      <Field
        name="bankAccount.vpaLink"
        label="VPA(Virtual Private Address)"
        component={inputField}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="bankAccount.accountNumber"
        label="Account Number"
        component={inputField}
      />
      <Field
        name="bankAccount.ifscCode"
        label="IFSC Code"
        component={inputField}
      />
    </Form.Group>
    <Field
      name="bankAccount.accountType"
      label="Account Type"
      component={dropdownField}
    />
  </div>
);

export default BankAccountFormData;
