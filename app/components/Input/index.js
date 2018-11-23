import React from 'react';
import PropTypes from 'prop-types';

import Input from './StyledInput';
import Label from '../Label';

const customInput = props => {
  const { labelColor, label, inputType, onChange, value } = props;
  return (
    <Label color={labelColor}>
      {label}
      <Input type={inputType} value={value} onChange={e => onChange(e)} />
    </Label>
  );
};

customInput.propTypes = {
  labelColor: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

customInput.defaultProps = {
  label: '',
  value: '',
};

export default customInput;
