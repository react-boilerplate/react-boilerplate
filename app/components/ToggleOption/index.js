/**
*
* ToggleOption
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';  // eslint-disable-line import/no-unresolved

function ToggleOption(props) {
  return (
    <option value={props.value}>
      <FormattedMessage {...props.message} />
    </option>
  );
}

ToggleOption.propTypes = {
  value: React.PropTypes.string.isRequired,
  message: React.PropTypes.object.isRequired,
};

export default ToggleOption;
