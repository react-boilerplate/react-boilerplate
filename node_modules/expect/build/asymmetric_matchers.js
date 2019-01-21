'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stringNotMatching = exports.stringMatching = exports.stringNotContaining = exports.stringContaining = exports.objectNotContaining = exports.objectContaining = exports.arrayNotContaining = exports.arrayContaining = exports.anything = exports.any = exports.AsymmetricMatcher = undefined;

var _jasmine_utils = require('./jasmine_utils');

var _utils = require('./utils');

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

class AsymmetricMatcher {
  constructor() {
    this.$$typeof = Symbol.for('jest.asymmetricMatcher');
  }
}

exports.AsymmetricMatcher = AsymmetricMatcher;
class Any extends AsymmetricMatcher {
  constructor(sample) {
    super();
    if (typeof sample === 'undefined') {
      throw new TypeError(
        'any() expects to be passed a constructor function. ' +
          'Please pass one or use anything() to match any object.'
      );
    }
    this.sample = sample;
  }

  asymmetricMatch(other) {
    if (this.sample == String) {
      return typeof other == 'string' || other instanceof String;
    }

    if (this.sample == Number) {
      return typeof other == 'number' || other instanceof Number;
    }

    if (this.sample == Function) {
      return typeof other == 'function' || other instanceof Function;
    }

    if (this.sample == Object) {
      return typeof other == 'object';
    }

    if (this.sample == Boolean) {
      return typeof other == 'boolean';
    }

    return other instanceof this.sample;
  }

  toString() {
    return 'Any';
  }

  getExpectedType() {
    if (this.sample == String) {
      return 'string';
    }

    if (this.sample == Number) {
      return 'number';
    }

    if (this.sample == Function) {
      return 'function';
    }

    if (this.sample == Object) {
      return 'object';
    }

    if (this.sample == Boolean) {
      return 'boolean';
    }

    return (0, _jasmine_utils.fnNameFor)(this.sample);
  }

  toAsymmetricMatcher() {
    return 'Any<' + (0, _jasmine_utils.fnNameFor)(this.sample) + '>';
  }
}

class Anything extends AsymmetricMatcher {
  asymmetricMatch(other) {
    return !(0, _jasmine_utils.isUndefined)(other) && other !== null;
  }

  toString() {
    return 'Anything';
  }

  // No getExpectedType method, because it matches either null or undefined.

  toAsymmetricMatcher() {
    return 'Anything';
  }
}

class ArrayContaining extends AsymmetricMatcher {
  constructor(sample) {
    let inverse =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    super();
    this.sample = sample;
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (!Array.isArray(this.sample)) {
      throw new Error(
        `You must provide an array to ${this.toString()}, not '` +
          typeof this.sample +
          "'."
      );
    }

    const result =
      this.sample.length === 0 ||
      (Array.isArray(other) &&
        this.sample.every(item =>
          other.some(another => (0, _jasmine_utils.equals)(item, another))
        ));

    return this.inverse ? !result : result;
  }

  toString() {
    return `Array${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'array';
  }
}

class ObjectContaining extends AsymmetricMatcher {
  constructor(sample) {
    let inverse =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    super();
    this.sample = sample;
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (typeof this.sample !== 'object') {
      throw new Error(
        `You must provide an object to ${this.toString()}, not '` +
          typeof this.sample +
          "'."
      );
    }

    if (this.inverse) {
      for (const property in this.sample) {
        if (
          (0, _jasmine_utils.hasProperty)(other, property) &&
          (0, _jasmine_utils.equals)(this.sample[property], other[property]) &&
          !(0, _utils.emptyObject)(this.sample[property]) &&
          !(0, _utils.emptyObject)(other[property])
        ) {
          return false;
        }
      }

      return true;
    } else {
      for (const property in this.sample) {
        if (
          !(0, _jasmine_utils.hasProperty)(other, property) ||
          !(0, _jasmine_utils.equals)(this.sample[property], other[property])
        ) {
          return false;
        }
      }

      return true;
    }
  }

  toString() {
    return `Object${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'object';
  }
}

class StringContaining extends AsymmetricMatcher {
  constructor(sample) {
    let inverse =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    super();
    if (!(0, _jasmine_utils.isA)('String', sample)) {
      throw new Error('Expected is not a string');
    }
    this.sample = sample;
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (!(0, _jasmine_utils.isA)('String', other)) {
      throw new Error('Actual is not a string');
    }

    const result = other.includes(this.sample);

    return this.inverse ? !result : result;
  }

  toString() {
    return `String${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'string';
  }
}

class StringMatching extends AsymmetricMatcher {
  constructor(sample) {
    let inverse =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    super();
    if (
      !(0, _jasmine_utils.isA)('String', sample) &&
      !(0, _jasmine_utils.isA)('RegExp', sample)
    ) {
      throw new Error('Expected is not a String or a RegExp');
    }

    this.sample = new RegExp(sample);
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (!(0, _jasmine_utils.isA)('String', other)) {
      throw new Error('Actual is not a string');
    }

    const result = this.sample.test(other);

    return this.inverse ? !result : result;
  }

  toString() {
    return `String${this.inverse ? 'Not' : ''}Matching`;
  }

  getExpectedType() {
    return 'string';
  }
}

const any = (exports.any = expectedObject => new Any(expectedObject));
const anything = (exports.anything = () => new Anything());
const arrayContaining = (exports.arrayContaining = sample =>
  new ArrayContaining(sample));
const arrayNotContaining = (exports.arrayNotContaining = sample =>
  new ArrayContaining(sample, true));
const objectContaining = (exports.objectContaining = sample =>
  new ObjectContaining(sample));
const objectNotContaining = (exports.objectNotContaining = sample =>
  new ObjectContaining(sample, true));
const stringContaining = (exports.stringContaining = expected =>
  new StringContaining(expected));
const stringNotContaining = (exports.stringNotContaining = expected =>
  new StringContaining(expected, true));
const stringMatching = (exports.stringMatching = expected =>
  new StringMatching(expected));
const stringNotMatching = (exports.stringNotMatching = expected =>
  new StringMatching(expected, true));
