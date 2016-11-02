/**
*
* LocaleToggle
*
*/

import React from 'react';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = (<option>--</option>);

  // If we have items, render them
  if (props.values) {
    content = props.values.map((value) => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Select onChange={props.onToggle}>
      {content}
    </Select>
  );
}

Toggle.propTypes = {
  onToggle: React.PropTypes.func,
  values: React.PropTypes.array,
  messages: React.PropTypes.object,
};

export default Toggle;
