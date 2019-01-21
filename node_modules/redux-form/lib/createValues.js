'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createValues = function createValues(_ref) {
  var getIn = _ref.getIn;
  return function (config) {
    var _prop$getFormState$co = _extends({
      prop: 'values',
      getFormState: function getFormState(state) {
        return getIn(state, 'form');
      }
    }, config),
        form = _prop$getFormState$co.form,
        prop = _prop$getFormState$co.prop,
        getFormState = _prop$getFormState$co.getFormState;

    return (0, _reactRedux.connect)(function (state) {
      return _defineProperty({}, prop, getIn(getFormState(state), form + '.values'));
    }
    // ignore dispatch
    );
  };
};

exports.default = createValues;