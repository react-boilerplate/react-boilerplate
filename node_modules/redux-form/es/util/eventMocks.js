var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getEvent = function getEvent(rest) {
  return _extends({
    stopPropagation: function stopPropagation(id) {
      return id;
    },
    preventDefault: function preventDefault(id) {
      return id;
    }
  }, rest);
};

export function valueMock(value) {
  return getEvent({ target: { value: value } });
}

export function dragStartMock(setData) {
  return getEvent({
    dataTransfer: { setData: setData }
  });
}

export function dropMock(getData) {
  return getEvent({
    dataTransfer: { getData: getData }
  });
}