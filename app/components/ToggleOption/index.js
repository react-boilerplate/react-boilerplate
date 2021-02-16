/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  intl: PropTypes.shape(IntlShape),
};

export default injectIntl(ToggleOption);
