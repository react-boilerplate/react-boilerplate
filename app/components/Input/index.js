import React from 'react';
import PropTypes from 'prop-types';

import Input from './StyledInput';
import Label from '../Label';

const customInput = props => {
  const { labelColor, label, inputType } = props;
  return (
    <Label color={labelColor}>
      {label}
      <Input type={inputType} />
    </Label>
  );
};

customInput.propTypes = {
  labelColor: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
};

customInput.defaultProps = {
  label: '',
};

export default customInput;
