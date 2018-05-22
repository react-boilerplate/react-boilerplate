import React, { PropTypes } from 'react';

import { Field } from './index';

const Input = ({
  label,
  type,
  input,
  meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <Field {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Input;
