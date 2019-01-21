import isPromise from 'is-promise';

var asyncValidation = function asyncValidation(fn, start, stop, field) {
  start(field);
  var promise = fn();
  if (!isPromise(promise)) {
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

export default asyncValidation;