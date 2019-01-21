'use strict';

exports.__esModule = true;
exports.throttleHelper = exports.takeLatestHelper = exports.takeEveryHelper = exports.throttle = exports.takeLatest = exports.takeEvery = undefined;

var _takeEvery = /*#__PURE__*/require('./takeEvery');

var _takeEvery2 = /*#__PURE__*/_interopRequireDefault(_takeEvery);

var _takeLatest = /*#__PURE__*/require('./takeLatest');

var _takeLatest2 = /*#__PURE__*/_interopRequireDefault(_takeLatest);

var _throttle = /*#__PURE__*/require('./throttle');

var _throttle2 = /*#__PURE__*/_interopRequireDefault(_throttle);

var _utils = /*#__PURE__*/require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};

var takeEvery = /*#__PURE__*/(0, _utils.deprecate)(_takeEvery2.default, /*#__PURE__*/deprecationWarning('takeEvery'));
var takeLatest = /*#__PURE__*/(0, _utils.deprecate)(_takeLatest2.default, /*#__PURE__*/deprecationWarning('takeLatest'));
var throttle = /*#__PURE__*/(0, _utils.deprecate)(_throttle2.default, /*#__PURE__*/deprecationWarning('throttle'));

exports.takeEvery = takeEvery;
exports.takeLatest = takeLatest;
exports.throttle = throttle;
exports.takeEveryHelper = _takeEvery2.default;
exports.takeLatestHelper = _takeLatest2.default;
exports.throttleHelper = _throttle2.default;