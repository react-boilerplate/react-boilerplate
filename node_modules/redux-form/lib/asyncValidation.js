'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncValidation = function asyncValidation(fn, start, stop, field) {
  start(field);
  var promise = fn();
  if (!(0, _isPromise2.default)(promise)) {
    throw new Error('asyncValidate function passed to reduxForm must return a promise');
  }
  var handleErrors = function handleErrors(rejected) {
    return function (errors) {
      if (rejected) {
        if (errors && Object.keys(errors).length) {
          stop(errors);
          return errors;
        } else {
          stop();
          throw new Error('Asynchronous validation promise was rejected without errors.');
        }
      }
      stop();
      return Promise.resolve();
    };
  };
  return promise.then(handleErrors(false), handleErrors(true));
};
exports.default = asyncValidation;