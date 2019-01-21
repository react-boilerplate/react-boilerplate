import isEvent from './isEvent';

var silenceEvent = function silenceEvent(event) {
  var is = isEvent(event);
  if (is) {
    event.preventDefault();
  }
  return is;
};

export default silenceEvent;