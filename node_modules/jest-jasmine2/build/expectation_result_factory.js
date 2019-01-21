'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = expectationResultFactory;

var _prettyFormat = require('pretty-format');

var _prettyFormat2 = _interopRequireDefault(_prettyFormat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function messageFormatter(_ref) {
  let error = _ref.error,
    message = _ref.message,
    passed = _ref.passed;

  if (passed) {
    return 'Passed.';
  }
  if (message) {
    return message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (
    // duck-type Error, see #2549
    error &&
    typeof error === 'object' &&
    typeof error.message === 'string' &&
    typeof error.name === 'string'
  ) {
    return `${error.name}: ${error.message}`;
  }
  return `thrown: ${(0, _prettyFormat2.default)(error, {maxDepth: 3})}`;
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

function stackFormatter(options, initError, errorMessage) {
  if (options.passed) {
    return '';
  }

  if (options.error) {
    if (options.error.stack) {
      return options.error.stack;
    }

    if (options.error === errorMessage) {
      return errorMessage;
    }
  }

  if (initError) {
    return errorMessage.trimRight() + '\n\n' + initError.stack;
  }

  return new Error(errorMessage).stack;
}

function expectationResultFactory(options, initError) {
  const message = messageFormatter(options);
  const stack = stackFormatter(options, initError, message);

  if (options.passed) {
    return {
      error: options.error,
      matcherName: options.matcherName,
      message: message,
      passed: options.passed,
      stack: stack
    };
  }

  return {
    actual: options.actual,
    error: options.error,
    expected: options.expected,
    matcherName: options.matcherName,
    message: message,
    passed: options.passed,
    stack: stack
  };
}
