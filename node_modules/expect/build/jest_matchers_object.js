'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setMatchers = exports.getMatchers = exports.setState = exports.getState = exports.INTERNAL_MATCHER_FLAG = undefined;

var _asymmetric_matchers = require('./asymmetric_matchers');

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

// Global matchers object holds the list of available matchers and
// the state, that can hold matcher specific values that change over time.
const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object');

// Notes a built-in/internal Jest matcher.
// Jest may override the stack trace of Errors thrown by internal matchers.
const INTERNAL_MATCHER_FLAG = (exports.INTERNAL_MATCHER_FLAG = Symbol.for(
  '$$jest-internal-matcher'
));

if (!global[JEST_MATCHERS_OBJECT]) {
  Object.defineProperty(global, JEST_MATCHERS_OBJECT, {
    value: {
      matchers: Object.create(null),
      state: {
        assertionCalls: 0,
        expectedAssertionsNumber: null,
        isExpectingAssertions: false,
        suppressedErrors: [] // errors that are not thrown immediately.
      }
    }
  });
}

const getState = (exports.getState = () => global[JEST_MATCHERS_OBJECT].state);

const setState = (exports.setState = state => {
  Object.assign(global[JEST_MATCHERS_OBJECT].state, state);
});

const getMatchers = (exports.getMatchers = () =>
  global[JEST_MATCHERS_OBJECT].matchers);

const setMatchers = (exports.setMatchers = (matchers, isInternal, expect) => {
  Object.keys(matchers).forEach(key => {
    const matcher = matchers[key];
    Object.defineProperty(matcher, INTERNAL_MATCHER_FLAG, {
      value: isInternal
    });

    if (!isInternal) {
      // expect is defined

      class CustomMatcher extends _asymmetric_matchers.AsymmetricMatcher {
        constructor() {
          let inverse =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;

          super();
          this.inverse = inverse;

          for (
            var _len = arguments.length,
              sample = Array(_len > 1 ? _len - 1 : 0),
              _key = 1;
            _key < _len;
            _key++
          ) {
            sample[_key - 1] = arguments[_key];
          }

          this.sample = sample;
        }

        asymmetricMatch(other) {
          var _ref = matcher.apply(
            undefined,
            [other].concat(_toConsumableArray(this.sample))
          );

          const pass = _ref.pass;

          return this.inverse ? !pass : pass;
        }

        toString() {
          return `${this.inverse ? 'not.' : ''}${key}`;
        }

        getExpectedType() {
          return 'any';
        }

        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.join(', ')}>`;
        }
      }

      expect[key] = function() {
        for (
          var _len2 = arguments.length, sample = Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          sample[_key2] = arguments[_key2];
        }

        return new (Function.prototype.bind.apply(
          CustomMatcher,
          [null].concat([false], sample)
        ))();
      };
      if (!expect.not) {
        expect.not = {};
      }
      expect.not[key] = function() {
        for (
          var _len3 = arguments.length, sample = Array(_len3), _key3 = 0;
          _key3 < _len3;
          _key3++
        ) {
          sample[_key3] = arguments[_key3];
        }

        return new (Function.prototype.bind.apply(
          CustomMatcher,
          [null].concat([true], sample)
        ))();
      };
    }
  });

  Object.assign(global[JEST_MATCHERS_OBJECT].matchers, matchers);
});
