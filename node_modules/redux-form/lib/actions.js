'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./actionTypes');

var arrayInsert = function arrayInsert(form, field, index, value) {
  return {
    type: _actionTypes.ARRAY_INSERT,
    meta: { form: form, field: field, index: index },
    payload: value
  };
};

var arrayMove = function arrayMove(form, field, from, to) {
  return {
    type: _actionTypes.ARRAY_MOVE,
    meta: { form: form, field: field, from: from, to: to }
  };
};

var arrayPop = function arrayPop(form, field) {
  return {
    type: _actionTypes.ARRAY_POP,
    meta: { form: form, field: field }
  };
};

var arrayPush = function arrayPush(form, field, value) {
  return {
    type: _actionTypes.ARRAY_PUSH,
    meta: { form: form, field: field },
    payload: value
  };
};

var arrayRemove = function arrayRemove(form, field, index) {
  return {
    type: _actionTypes.ARRAY_REMOVE,
    meta: { form: form, field: field, index: index }
  };
};

var arrayRemoveAll = function arrayRemoveAll(form, field) {
  return {
    type: _actionTypes.ARRAY_REMOVE_ALL,
    meta: { form: form, field: field }
  };
};

var arrayShift = function arrayShift(form, field) {
  return {
    type: _actionTypes.ARRAY_SHIFT,
    meta: { form: form, field: field }
  };
};

var arraySplice = function arraySplice(form, field, index, removeNum, value) {
  var action = {
    type: _actionTypes.ARRAY_SPLICE,
    meta: { form: form, field: field, index: index, removeNum: removeNum }
  };
  if (value !== undefined) {
    action.payload = value;
  }
  return action;
};

var arraySwap = function arraySwap(form, field, indexA, indexB) {
  if (indexA === indexB) {
    throw new Error('Swap indices cannot be equal');
  }
  if (indexA < 0 || indexB < 0) {
    throw new Error('Swap indices cannot be negative');
  }
  return { type: _actionTypes.ARRAY_SWAP, meta: { form: form, field: field, indexA: indexA, indexB: indexB } };
};

var arrayUnshift = function arrayUnshift(form, field, value) {
  return {
    type: _actionTypes.ARRAY_UNSHIFT,
    meta: { form: form, field: field },
    payload: value
  };
};

var autofill = function autofill(form, field, value) {
  return {
    type: _actionTypes.AUTOFILL,
    meta: { form: form, field: field },
    payload: value
  };
};

var blur = function blur(form, field, value, touch) {
  return {
    type: _actionTypes.BLUR,
    meta: { form: form, field: field, touch: touch },
    payload: value
  };
};

var change = function change(form, field, value, touch, persistentSubmitErrors) {
  return {
    type: _actionTypes.CHANGE,
    meta: { form: form, field: field, touch: touch, persistentSubmitErrors: persistentSubmitErrors },
    payload: value
  };
};

var clearSubmit = function clearSubmit(form) {
  return {
    type: _actionTypes.CLEAR_SUBMIT,
    meta: { form: form }
  };
};

var clearSubmitErrors = function clearSubmitErrors(form) {
  return {
    type: _actionTypes.CLEAR_SUBMIT_ERRORS,
    meta: { form: form }
  };
};

var clearAsyncError = function clearAsyncError(form, field) {
  return {
    type: _actionTypes.CLEAR_ASYNC_ERROR,
    meta: { form: form, field: field }
  };
};

var clearFields = function clearFields(form, keepTouched, persistentSubmitErrors) {
  for (var _len = arguments.length, fields = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    fields[_key - 3] = arguments[_key];
  }

  return {
    type: _actionTypes.CLEAR_FIELDS,
    meta: { form: form, keepTouched: keepTouched, persistentSubmitErrors: persistentSubmitErrors, fields: fields }
  };
};

var destroy = function destroy() {
  for (var _len2 = arguments.length, form = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    form[_key2] = arguments[_key2];
  }

  return {
    type: _actionTypes.DESTROY,
    meta: { form: form }
  };
};

var focus = function focus(form, field) {
  return {
    type: _actionTypes.FOCUS,
    meta: { form: form, field: field }
  };
};

var initialize = function initialize(form, values, keepDirty) {
  var otherMeta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (keepDirty instanceof Object) {
    otherMeta = keepDirty;
    keepDirty = false;
  }
  return {
    type: _actionTypes.INITIALIZE,
    meta: _extends({ form: form, keepDirty: keepDirty }, otherMeta),
    payload: values
  };
};

var registerField = function registerField(form, name, type) {
  return {
    type: _actionTypes.REGISTER_FIELD,
    meta: { form: form },
    payload: { name: name, type: type }
  };
};

var reset = function reset(form) {
  return {
    type: _actionTypes.RESET,
    meta: { form: form }
  };
};

var resetSection = function resetSection(form) {
  for (var _len3 = arguments.length, sections = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    sections[_key3 - 1] = arguments[_key3];
  }

  return {
    type: _actionTypes.RESET_SECTION,
    meta: { form: form, sections: sections }
  };
};

var startAsyncValidation = function startAsyncValidation(form, field) {
  return {
    type: _actionTypes.START_ASYNC_VALIDATION,
    meta: { form: form, field: field }
  };
};

var startSubmit = function startSubmit(form) {
  return {
    type: _actionTypes.START_SUBMIT,
    meta: { form: form }
  };
};

var stopAsyncValidation = function stopAsyncValidation(form, errors) {
  return {
    type: _actionTypes.STOP_ASYNC_VALIDATION,
    meta: { form: form },
    payload: errors,
    error: !!(errors && Object.keys(errors).length)
  };
};

var stopSubmit = function stopSubmit(form, errors) {
  return {
    type: _actionTypes.STOP_SUBMIT,
    meta: { form: form },
    payload: errors,
    error: !!(errors && Object.keys(errors).length)
  };
};

var submit = function submit(form) {
  return {
    type: _actionTypes.SUBMIT,
    meta: { form: form }
  };
};

var setSubmitFailed = function setSubmitFailed(form) {
  for (var _len4 = arguments.length, fields = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    fields[_key4 - 1] = arguments[_key4];
  }

  return {
    type: _actionTypes.SET_SUBMIT_FAILED,
    meta: { form: form, fields: fields },
    error: true
  };
};

var setSubmitSucceeded = function setSubmitSucceeded(form) {
  for (var _len5 = arguments.length, fields = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    fields[_key5 - 1] = arguments[_key5];
  }

  return {
    type: _actionTypes.SET_SUBMIT_SUCCEEDED,
    meta: { form: form, fields: fields },
    error: false
  };
};

var touch = function touch(form) {
  for (var _len6 = arguments.length, fields = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    fields[_key6 - 1] = arguments[_key6];
  }

  return {
    type: _actionTypes.TOUCH,
    meta: { form: form, fields: fields }
  };
};

var unregisterField = function unregisterField(form, name) {
  var destroyOnUnmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return {
    type: _actionTypes.UNREGISTER_FIELD,
    meta: { form: form },
    payload: { name: name, destroyOnUnmount: destroyOnUnmount }
  };
};

var untouch = function untouch(form) {
  for (var _len7 = arguments.length, fields = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    fields[_key7 - 1] = arguments[_key7];
  }

  return {
    type: _actionTypes.UNTOUCH,
    meta: { form: form, fields: fields }
  };
};

var updateSyncErrors = function updateSyncErrors(form) {
  var syncErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var error = arguments[2];
  return {
    type: _actionTypes.UPDATE_SYNC_ERRORS,
    meta: { form: form },
    payload: { syncErrors: syncErrors, error: error }
  };
};

var updateSyncWarnings = function updateSyncWarnings(form) {
  var syncWarnings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var warning = arguments[2];
  return {
    type: _actionTypes.UPDATE_SYNC_WARNINGS,
    meta: { form: form },
    payload: { syncWarnings: syncWarnings, warning: warning }
  };
};

var actions = {
  arrayInsert: arrayInsert,
  arrayMove: arrayMove,
  arrayPop: arrayPop,
  arrayPush: arrayPush,
  arrayRemove: arrayRemove,
  arrayRemoveAll: arrayRemoveAll,
  arrayShift: arrayShift,
  arraySplice: arraySplice,
  arraySwap: arraySwap,
  arrayUnshift: arrayUnshift,
  autofill: autofill,
  blur: blur,
  change: change,
  clearFields: clearFields,
  clearSubmit: clearSubmit,
  clearSubmitErrors: clearSubmitErrors,
  clearAsyncError: clearAsyncError,
  destroy: destroy,
  focus: focus,
  initialize: initialize,
  registerField: registerField,
  reset: reset,
  resetSection: resetSection,
  startAsyncValidation: startAsyncValidation,
  startSubmit: startSubmit,
  stopAsyncValidation: stopAsyncValidation,
  stopSubmit: stopSubmit,
  submit: submit,
  setSubmitFailed: setSubmitFailed,
  setSubmitSucceeded: setSubmitSucceeded,
  touch: touch,
  unregisterField: unregisterField,
  untouch: untouch,
  updateSyncErrors: updateSyncErrors,
  updateSyncWarnings: updateSyncWarnings
};

exports.default = actions;