import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { getUnhandledProps } from '../../lib';
import Checkbox from '../../modules/Checkbox';
/**
 * A Radio is sugar for <Checkbox radio />.
 * Useful for exclusive groups of sliders or toggles.
 * @see Checkbox
 * @see Form
 */

function Radio(props) {
  var slider = props.slider,
      toggle = props.toggle,
      type = props.type;
  var rest = getUnhandledProps(Radio, props); // const ElementType = getElementType(Radio, props)
  // radio, slider, toggle are exclusive
  // use an undefined radio if slider or toggle are present

  var radio = !(slider || toggle) || undefined;
  return React.createElement(Checkbox, _extends({}, rest, {
    type: type,
    radio: radio,
    slider: slider,
    toggle: toggle
  }));
}

Radio.handledProps = ["slider", "toggle", "type"];
Radio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Format to emphasize the current selection state. */
  slider: Checkbox.propTypes.slider,

  /** Format to show an on or off choice. */
  toggle: Checkbox.propTypes.toggle,

  /** HTML input type, either checkbox or radio. */
  type: Checkbox.propTypes.type
} : {};
Radio.defaultProps = {
  type: 'radio'
};
export default Radio;