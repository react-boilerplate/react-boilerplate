"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.valueMock = valueMock;
exports.dragStartMock = dragStartMock;
exports.dropMock = dropMock;
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

function valueMock(value) {
  return getEvent({ target: { value: value } });
}

function dragStartMock(setData) {
  return getEvent({
    dataTransfer: { setData: setData }
  });
}

function dropMock(getData) {
  return getEvent({
    dataTransfer: { getData: getData }
  });
}