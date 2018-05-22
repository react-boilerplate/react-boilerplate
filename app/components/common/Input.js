import React, { PropTypes } from 'react';

const Input = ({
  label,
  type,
  name,
  input,
  meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <input name={name} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

Input.propTypes = {
  input: PropTypes.input.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Input;
