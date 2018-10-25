/*
 * Create Bank Account Form Data
 *
 */

import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
];

const DropdownFormField = props => (
  <Form.Field>
    <Dropdown
      fluid
      multiple
      selection
      options={options}
      defaultValue={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
    />
    <Form.Group widths="equal">
      <Form.Input fluid label="First name" placeholder="First name" />
      <Form.Input fluid label="Last name" placeholder="Last name" />
      <Form.Select
        fluid
        label="Gender"
        options={options}
        placeholder="Gender"
      />
    </Form.Group>
  </Form.Field>
);

DropdownFormField.propTypes = {
  input: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  label: PropTypes.string,
};

const BankAccountFormData = () => (
  <Field
    name="dropdownName"
    component={DropdownFormField}
    label="Dropdown Test"
  />
);

export default BankAccountFormData;
