'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestDiff = require('jest-diff');

var _jestDiff2 = _interopRequireDefault(_jestDiff);

var _jestGetType = require('jest-get-type');

var _jestGetType2 = _interopRequireDefault(_jestGetType);

var _jestRegexUtil = require('jest-regex-util');

var _jestMatcherUtils = require('jest-matcher-utils');

var _utils = require('./utils');

var _jasmine_utils = require('./jasmine_utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

const matchers = {
  toBe: function(received, expected) {
    const comment = 'Object.is equality';
    const pass = Object.is(received, expected);

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)('.toBe', undefined, undefined, {
            comment: comment,
            isNot: true
          }) +
          '\n\n' +
          `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const suggestToEqual =
            (0, _jestGetType2.default)(received) ===
              (0, _jestGetType2.default)(expected) &&
            ((0, _jestGetType2.default)(received) === 'object' ||
              (0, _jestGetType2.default)(expected) === 'array') &&
            (0, _jasmine_utils.equals)(received, expected, [
              _utils.iterableEquality
            ]);
          const oneline = (0, _utils.isOneline)(expected, received);
          const diffString = (0, _jestDiff2.default)(expected, received, {
            expand: this.expand
          });

          return (
            (0, _jestMatcherUtils.matcherHint)('.toBe', undefined, undefined, {
              comment: comment,
              isNot: false
            }) +
            '\n\n' +
            `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
            `Received: ${(0, _jestMatcherUtils.printReceived)(received)}` +
            (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : '') +
            (suggestToEqual ? ` ${_jestMatcherUtils.SUGGEST_TO_EQUAL}` : '')
          );
        };

    // Passing the the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message
    return {
      actual: received,
      expected: expected,
      message: message,
      name: 'toBe',
      pass: pass
    };
  },
  toBeCloseTo: function(actual, expected) {
    let precision =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

    const secondArgument = arguments.length === 3 ? 'precision' : null;
    (0, _jestMatcherUtils.ensureNumbers)(actual, expected, '.toBeCloseTo');
    const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeCloseTo', undefined, undefined, {
        isNot: this.isNot,
        secondArgument: secondArgument
      }) +
      '\n\n' +
      `Precision: ${(0, _jestMatcherUtils.printExpected)(precision)}-digit\n` +
      `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;

    return {message: message, pass: pass};
  },
  toBeDefined: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeDefined');
    const pass = actual !== void 0;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeDefined', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeFalsy: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeFalsy');
    const pass = !actual;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeFalsy', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeGreaterThan: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNumbers)(actual, expected, '.toBeGreaterThan');
    const pass = actual > expected;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        '.toBeGreaterThan',
        undefined,
        undefined,
        {
          isNot: this.isNot
        }
      ) +
      '\n\n' +
      `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeGreaterThanOrEqual: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNumbers)(
      actual,
      expected,
      '.toBeGreaterThanOrEqual'
    );
    const pass = actual >= expected;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        '.toBeGreaterThanOrEqual',
        undefined,
        undefined,
        {
          isNot: this.isNot
        }
      ) +
      '\n\n' +
      `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeInstanceOf: function(received, constructor) {
    const constType = (0, _jestGetType2.default)(constructor);

    if (constType !== 'function') {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '.toBeInstanceOf',
          'value',
          'constructor',
          {
            isNot: this.isNot
          }
        ) +
          `\n\n` +
          `Expected constructor to be a function. Instead got:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(constType)}`
      );
    }
    const pass = received instanceof constructor;

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.toBeInstanceOf',
            'value',
            'constructor',
            {
              isNot: this.isNot
            }
          ) +
          '\n\n' +
          `Expected constructor: ${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            constructor.name || String(constructor)
          )}\n` +
          `Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.toBeInstanceOf',
            'value',
            'constructor',
            {
              isNot: this.isNot
            }
          ) +
          '\n\n' +
          `Expected constructor: ${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            constructor.name || String(constructor)
          )}\n` +
          `Received constructor: ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            received != null
              ? received.constructor && received.constructor.name
              : ''
          )}\n` +
          `Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {message: message, pass: pass};
  },
  toBeLessThan: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNumbers)(actual, expected, '.toBeLessThan');
    const pass = actual < expected;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        '.toBeLessThan',
        undefined,
        undefined,
        {
          isNot: this.isNot
        }
      ) +
      '\n\n' +
      `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeLessThanOrEqual: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNumbers)(
      actual,
      expected,
      '.toBeLessThanOrEqual'
    );
    const pass = actual <= expected;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        '.toBeLessThanOrEqual',
        undefined,
        undefined,
        {
          isNot: this.isNot
        }
      ) +
      '\n\n' +
      `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeNaN: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeNaN');
    const pass = Number.isNaN(actual);
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeNaN', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeNull: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeNull');
    const pass = actual === null;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeNull', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeTruthy: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeTruthy');
    const pass = !!actual;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeTruthy', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;
    return {message: message, pass: pass};
  },
  toBeUndefined: function(actual, expected) {
    (0, _jestMatcherUtils.ensureNoExpected)(expected, '.toBeUndefined');
    const pass = actual === void 0;
    const message = () =>
      (0, _jestMatcherUtils.matcherHint)('.toBeUndefined', 'received', '', {
        isNot: this.isNot
      }) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(actual)}`;

    return {message: message, pass: pass};
  },
  toContain: function(collection, value) {
    const collectionType = (0, _jestGetType2.default)(collection);

    let converted = null;
    if (Array.isArray(collection) || typeof collection === 'string') {
      // strings have `indexOf` so we don't need to convert
      // arrays have `indexOf` and we don't want to make a copy
      converted = collection;
    } else {
      try {
        converted = Array.from(collection);
      } catch (e) {
        throw new Error(
          (0, _jestMatcherUtils.matcherHint)(
            '[.not].toContainEqual',
            'collection',
            'value'
          ) +
            '\n\n' +
            `Expected ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
              'collection'
            )} to be an array-like structure.\n` +
            (0, _jestMatcherUtils.printWithType)(
              'Received',
              collection,
              _jestMatcherUtils.printReceived
            )
        );
      }
    }
    // At this point, we're either a string or an Array,
    // which was converted from an array-like structure.
    const pass = converted.indexOf(value) != -1;
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.not.toContain',
            collectionType,
            'value'
          ) +
          '\n\n' +
          `Expected ${collectionType}:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(collection)}\n` +
          `Not to contain value:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(value)}\n`
      : () => {
          const suggestToContainEqual =
            converted !== null &&
            typeof converted !== 'string' &&
            converted instanceof Array &&
            converted.findIndex(item =>
              (0, _jasmine_utils.equals)(item, value, [_utils.iterableEquality])
            ) !== -1;
          return (
            (0, _jestMatcherUtils.matcherHint)(
              '.toContain',
              collectionType,
              'value'
            ) +
            '\n\n' +
            `Expected ${collectionType}:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(collection)}\n` +
            `To contain value:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(value)}` +
            (suggestToContainEqual
              ? `\n\n${_jestMatcherUtils.SUGGEST_TO_CONTAIN_EQUAL}`
              : '')
          );
        };

    return {message: message, pass: pass};
  },
  toContainEqual: function(collection, value) {
    const collectionType = (0, _jestGetType2.default)(collection);
    let converted = null;
    if (Array.isArray(collection)) {
      converted = collection;
    } else {
      try {
        converted = Array.from(collection);
      } catch (e) {
        throw new Error(
          (0, _jestMatcherUtils.matcherHint)(
            '[.not].toContainEqual',
            'collection',
            'value'
          ) +
            '\n\n' +
            `Expected ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
              'collection'
            )} to be an array-like structure.\n` +
            (0, _jestMatcherUtils.printWithType)(
              'Received',
              collection,
              _jestMatcherUtils.printReceived
            )
        );
      }
    }

    const pass =
      converted.findIndex(item =>
        (0, _jasmine_utils.equals)(item, value, [_utils.iterableEquality])
      ) !== -1;
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.not.toContainEqual',
            collectionType,
            'value'
          ) +
          '\n\n' +
          `Expected ${collectionType}:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(collection)}\n` +
          `Not to contain a value equal to:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(value)}\n`
      : () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.toContainEqual',
            collectionType,
            'value'
          ) +
          '\n\n' +
          `Expected ${collectionType}:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(collection)}\n` +
          `To contain a value equal to:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(value)}`;

    return {message: message, pass: pass};
  },
  toEqual: function(received, expected) {
    const pass = (0, _jasmine_utils.equals)(received, expected, [
      _utils.iterableEquality
    ]);

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)('.not.toEqual') +
          '\n\n' +
          `Expected value to not equal:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const oneline = (0, _utils.isOneline)(expected, received);
          const diffString = (0, _jestDiff2.default)(expected, received, {
            expand: this.expand
          });

          return (
            (0, _jestMatcherUtils.matcherHint)('.toEqual') +
            '\n\n' +
            `Expected value to equal:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
            `Received:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(received)}` +
            (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : '')
          );
        };

    // Passing the the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message
    return {
      actual: received,
      expected: expected,
      message: message,
      name: 'toEqual',
      pass: pass
    };
  },
  toHaveLength: function(received, length) {
    if (
      typeof received !== 'string' &&
      (!received || typeof received.length !== 'number')
    ) {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toHaveLength',
          'received',
          'length'
        ) +
          '\n\n' +
          `Expected value to have a 'length' property that is a number. ` +
          `Received:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}\n` +
          (received
            ? `received.length:\n  ${(0, _jestMatcherUtils.printReceived)(
                received.length
              )}`
            : '')
      );
    }

    const pass = received.length === length;
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.not.toHaveLength',
            'received',
            'length'
          ) +
          '\n\n' +
          `Expected value to not have length:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(length)}\n` +
          `Received:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}\n` +
          `received.length:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received.length)}`
      : () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.toHaveLength',
            'received',
            'length'
          ) +
          '\n\n' +
          `Expected value to have length:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(length)}\n` +
          `Received:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}\n` +
          `received.length:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received.length)}`;

    return {message: message, pass: pass};
  },
  toHaveProperty: function(object, keyPath, value) {
    const valuePassed = arguments.length === 3;
    const secondArgument = valuePassed ? 'value' : null;

    if (!object && typeof object !== 'string' && typeof object !== 'number') {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toHaveProperty',
          'object',
          'path',
          {
            secondArgument: secondArgument
          }
        ) +
          '\n\n' +
          `Expected ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'object'
          )} to be an object. Received:\n` +
          `  ${(0, _jestGetType2.default)(object)}: ${(0,
          _jestMatcherUtils.printReceived)(object)}`
      );
    }

    const keyPathType = (0, _jestGetType2.default)(keyPath);

    if (keyPathType !== 'string' && keyPathType !== 'array') {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toHaveProperty',
          'object',
          'path',
          {
            secondArgument: secondArgument
          }
        ) +
          '\n\n' +
          `Expected ${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'path'
          )} to be a string or an array. Received:\n` +
          `  ${(0, _jestGetType2.default)(keyPath)}: ${(0,
          _jestMatcherUtils.printReceived)(keyPath)}`
      );
    }

    const result = (0, _utils.getPath)(object, keyPath);
    const lastTraversedObject = result.lastTraversedObject,
      hasEndProp = result.hasEndProp;

    const pass = valuePassed
      ? (0, _jasmine_utils.equals)(result.value, value, [
          _utils.iterableEquality
        ])
      : hasEndProp;

    const traversedPath = result.traversedPath.join('.');

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.not.toHaveProperty',
            'object',
            'path',
            {
              secondArgument: secondArgument
            }
          ) +
          '\n\n' +
          `Expected the object:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(object)}\n` +
          `Not to have a nested property:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(keyPath)}\n` +
          (valuePassed
            ? `With a value of:\n  ${(0, _jestMatcherUtils.printExpected)(
                value
              )}\n`
            : '')
      : () => {
          const diffString =
            valuePassed && hasEndProp
              ? (0, _jestDiff2.default)(value, result.value, {
                  expand: this.expand
                })
              : '';
          return (
            (0, _jestMatcherUtils.matcherHint)(
              '.toHaveProperty',
              'object',
              'path',
              {
                secondArgument: secondArgument
              }
            ) +
            '\n\n' +
            `Expected the object:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(object)}\n` +
            `To have a nested property:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(keyPath)}\n` +
            (valuePassed
              ? `With a value of:\n  ${(0, _jestMatcherUtils.printExpected)(
                  value
                )}\n`
              : '') +
            (hasEndProp
              ? `Received:\n` +
                `  ${(0, _jestMatcherUtils.printReceived)(result.value)}` +
                (diffString ? `\n\nDifference:\n\n${diffString}` : '')
              : traversedPath
                ? `Received:\n  ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                    'object'
                  )}.${traversedPath}: ${(0, _jestMatcherUtils.printReceived)(
                    lastTraversedObject
                  )}`
                : '')
          );
        };
    if (pass === undefined) {
      throw new Error('pass must be initialized');
    }

    return {message: message, pass: pass};
  },
  toMatch: function(received, expected) {
    if (typeof received !== 'string') {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toMatch',
          'string',
          'expected'
        ) +
          '\n\n' +
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'string'
          )} value must be a string.\n` +
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            received,
            _jestMatcherUtils.printReceived
          )
      );
    }

    if (
      !(expected && typeof expected.test === 'function') &&
      !(typeof expected === 'string')
    ) {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toMatch',
          'string',
          'expected'
        ) +
          '\n\n' +
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} value must be a string or a regular expression.\n` +
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            expected,
            _jestMatcherUtils.printExpected
          )
      );
    }

    const pass = new RegExp(
      typeof expected === 'string'
        ? (0, _jestRegexUtil.escapeStrForRegex)(expected)
        : expected
    ).test(received);
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)('.not.toMatch') +
          `\n\nExpected value not to match:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expected)}` +
          `\nReceived:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () =>
          (0, _jestMatcherUtils.matcherHint)('.toMatch') +
          `\n\nExpected value to match:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expected)}` +
          `\nReceived:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {message: message, pass: pass};
  },
  toMatchObject: function(receivedObject, expectedObject) {
    if (typeof receivedObject !== 'object' || receivedObject === null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toMatchObject',
          'object',
          'expected'
        ) +
          '\n\n' +
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must be an object.\n` +
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            receivedObject,
            _jestMatcherUtils.printReceived
          )
      );
    }

    if (typeof expectedObject !== 'object' || expectedObject === null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherHint)(
          '[.not].toMatchObject',
          'object',
          'expected'
        ) +
          '\n\n' +
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} value must be an object.\n` +
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            expectedObject,
            _jestMatcherUtils.printExpected
          )
      );
    }

    const pass = (0, _jasmine_utils.equals)(receivedObject, expectedObject, [
      _utils.iterableEquality,
      _utils.subsetEquality
    ]);

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)('.not.toMatchObject') +
          `\n\nExpected value not to match object:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expectedObject)}` +
          `\nReceived:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(receivedObject)}`
      : () => {
          const diffString = (0, _jestDiff2.default)(
            expectedObject,
            (0, _utils.getObjectSubset)(receivedObject, expectedObject),
            {
              expand: this.expand
            }
          );
          return (
            (0, _jestMatcherUtils.matcherHint)('.toMatchObject') +
            `\n\nExpected value to match object:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(expectedObject)}` +
            `\nReceived:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(receivedObject)}` +
            (diffString ? `\nDifference:\n${diffString}` : '')
          );
        };

    return {message: message, pass: pass};
  },
  toStrictEqual: function(received, expected) {
    const pass = (0, _jasmine_utils.equals)(
      received,
      expected,
      [_utils.iterableEquality, _utils.typeEquality],
      true
    );

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)('.not.toStrictEqual') +
          '\n\n' +
          `Expected value to not equal:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const diffString = (0, _jestDiff2.default)(expected, received, {
            expand: this.expand
          });
          return (
            (0, _jestMatcherUtils.matcherHint)('.toStrictEqual') +
            '\n\n' +
            `Expected value to equal:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
            `Received:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(received)}` +
            (diffString ? `\n\nDifference:\n\n${diffString}` : '')
          );
        };

    // Passing the the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message
    return {
      actual: received,
      expected: expected,
      message: message,
      name: 'toStrictEqual',
      pass: pass
    };
  }
};
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

exports.default = matchers;
