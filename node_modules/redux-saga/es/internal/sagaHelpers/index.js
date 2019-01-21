import takeEveryHelper from './takeEvery';
import takeLatestHelper from './takeLatest';
import throttleHelper from './throttle';

import { deprecate } from '../utils';

var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};

var takeEvery = /*#__PURE__*/deprecate(takeEveryHelper, /*#__PURE__*/deprecationWarning('takeEvery'));
var takeLatest = /*#__PURE__*/deprecate(takeLatestHelper, /*#__PURE__*/deprecationWarning('takeLatest'));
var throttle = /*#__PURE__*/deprecate(throttleHelper, /*#__PURE__*/deprecationWarning('throttle'));

export { takeEvery, takeLatest, throttle, takeEveryHelper, takeLatestHelper, throttleHelper };