/**
*
* ToggleOption
*
*/

import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>
    {message ? intl.formatMessage(message) : value}
  </option>
);

ToggleOption.propTypes = {
  value: React.PropTypes.string.isRequired,
  message: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
