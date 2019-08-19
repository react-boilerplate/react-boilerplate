/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const ToggleOption = ({ value, message }) => {
  const intl = useIntl();

  return (
    <option value={value}>
      {message ? intl.formatMessage(message) : value}
    </option>
  );
};

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
};

export default ToggleOption;
