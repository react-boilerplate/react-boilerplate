'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jestDiff = require('jest-diff');

var _jestDiff2 = _interopRequireDefault(_jestDiff);

var _jestMatcherUtils = require('jest-matcher-utils');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _plugins = require('./plugins');

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const fileExists = (filePath, hasteFS) =>
  hasteFS.exists(filePath) || _fs2.default.existsSync(filePath);

const cleanup = (hasteFS, update) => {
  const pattern = '\\.' + utils.SNAPSHOT_EXTENSION + '$';
  const files = hasteFS.matchFiles(pattern);
  const filesRemoved = files
    .filter(
      snapshotFile =>
        !fileExists(
          _path2.default.resolve(
            _path2.default.dirname(snapshotFile),
            '..',
            _path2.default.basename(
              snapshotFile,
              '.' + utils.SNAPSHOT_EXTENSION
            )
          ),
          hasteFS
        )
    )
    .map(snapshotFile => {
      if (update === 'all') {
        _fs2.default.unlinkSync(snapshotFile);
      }
    }).length;

  return {
    filesRemoved: filesRemoved
  };
};

const toMatchSnapshot = function(received, propertyMatchers, testName) {
  if (arguments.length === 3 && !propertyMatchers) {
    throw new Error(
      'Property matchers must be an object.\n\nTo provide a snapshot test name without property matchers, use: toMatchSnapshot("name")'
    );
  }

  return _toMatchSnapshot({
    context: this,
    propertyMatchers: propertyMatchers,
    received: received,
    testName: testName
  });
};

const toMatchInlineSnapshot = function(
  received,
  propertyMatchersOrInlineSnapshot,
  inlineSnapshot
) {
  let propertyMatchers;
  if (typeof propertyMatchersOrInlineSnapshot === 'string') {
    inlineSnapshot = propertyMatchersOrInlineSnapshot;
  } else {
    propertyMatchers = propertyMatchersOrInlineSnapshot;
  }
  return _toMatchSnapshot({
    context: this,
    inlineSnapshot: inlineSnapshot || '',
    propertyMatchers: propertyMatchers,
    received: received
  });
};

const _toMatchSnapshot = _ref => {
  let context = _ref.context,
    received = _ref.received,
    propertyMatchers = _ref.propertyMatchers,
    testName = _ref.testName,
    inlineSnapshot = _ref.inlineSnapshot;

  context.dontThrow && context.dontThrow();
  testName = typeof propertyMatchers === 'string' ? propertyMatchers : testName;

  const currentTestName = context.currentTestName,
    isNot = context.isNot,
    snapshotState = context.snapshotState;

  if (isNot) {
    const matcherName =
      typeof inlineSnapshot === 'string'
        ? 'toMatchInlineSnapshot'
        : 'toMatchSnapshot';
    throw new Error(
      `Jest: \`.not\` cannot be used with \`.${matcherName}()\`.`
    );
  }

  if (!snapshotState) {
    throw new Error('Jest: snapshot state must be initialized.');
  }

  const fullTestName =
    testName && currentTestName
      ? `${currentTestName}: ${testName}`
      : currentTestName || '';

  if (typeof propertyMatchers === 'object') {
    if (propertyMatchers === null) {
      throw new Error(`Property matchers must be an object.`);
    }
    const propertyPass = context.equals(received, propertyMatchers, [
      context.utils.iterableEquality,
      context.utils.subsetEquality
    ]);

    if (!propertyPass) {
      const key = snapshotState.fail(fullTestName, received);

      const report = () =>
        `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
          'Received value'
        )} does not match ` +
        `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
          `snapshot properties for "${key}"`
        )}.\n\n` +
        `Expected snapshot to match properties:\n` +
        `  ${context.utils.printExpected(propertyMatchers)}` +
        `\nReceived:\n` +
        `  ${context.utils.printReceived(received)}`;

      return {
        message: () =>
          (0, _jestMatcherUtils.matcherHint)(
            '.toMatchSnapshot',
            'value',
            'properties'
          ) +
          '\n\n' +
          report(),
        name: 'toMatchSnapshot',
        pass: false,
        report: report
      };
    } else {
      received = utils.deepMerge(received, propertyMatchers);
    }
  }

  const result = snapshotState.match({
    error: context.error,
    inlineSnapshot: inlineSnapshot,
    received: received,
    testName: fullTestName
  });
  const pass = result.pass;
  let actual = result.actual,
    expected = result.expected;

  let report;
  if (pass) {
    return {message: () => '', pass: true};
  } else if (!expected) {
    report = () =>
      `New snapshot was ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
        'not written'
      )}. The update flag ` +
      `must be explicitly passed to write a new snapshot.\n\n` +
      `This is likely because this test is run in a continuous integration ` +
      `(CI) environment in which snapshots are not written by default.\n\n` +
      `${(0, _jestMatcherUtils.RECEIVED_COLOR)('Received value')} ` +
      `${actual}`;
  } else {
    expected = (expected || '').trim();
    actual = (actual || '').trim();
    const diffMessage = (0, _jestDiff2.default)(expected, actual, {
      aAnnotation: 'Snapshot',
      bAnnotation: 'Received',
      expand: snapshotState.expand
    });

    report = () =>
      `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
        'Received value'
      )} does not match ` +
      `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
        `stored snapshot "${result.key}"`
      )}.\n\n` +
      (diffMessage ||
        (0, _jestMatcherUtils.EXPECTED_COLOR)('- ' + (expected || '')) +
          '\n' +
          (0, _jestMatcherUtils.RECEIVED_COLOR)('+ ' + actual));
  }
  // Passing the the actual and expected objects so that a custom reporter
  // could access them, for example in order to display a custom visual diff,
  // or create a different error message
  return {
    actual: actual,
    expected: expected,
    message: () =>
      (0, _jestMatcherUtils.matcherHint)('.toMatchSnapshot', 'value', '') +
      '\n\n' +
      report(),
    name: 'toMatchSnapshot',
    pass: false,
    report: report
  };
};

const toThrowErrorMatchingSnapshot = function(received, testName, fromPromise) {
  return _toThrowErrorMatchingSnapshot({
    context: this,
    fromPromise: fromPromise,
    received: received,
    testName: testName
  });
};

const toThrowErrorMatchingInlineSnapshot = function(
  received,
  inlineSnapshot,
  fromPromise
) {
  return _toThrowErrorMatchingSnapshot({
    context: this,
    fromPromise: fromPromise,
    inlineSnapshot: inlineSnapshot || '',
    received: received
  });
};

const _toThrowErrorMatchingSnapshot = _ref2 => {
  let context = _ref2.context,
    received = _ref2.received,
    testName = _ref2.testName,
    fromPromise = _ref2.fromPromise,
    inlineSnapshot = _ref2.inlineSnapshot;

  context.dontThrow && context.dontThrow();
  const isNot = context.isNot;

  const matcherName =
    typeof inlineSnapshot === 'string'
      ? 'toThrowErrorMatchingInlineSnapshot'
      : 'toThrowErrorMatchingSnapshot';

  if (isNot) {
    throw new Error(
      `Jest: \`.not\` cannot be used with \`.${matcherName}()\`.`
    );
  }

  let error;

  if (fromPromise) {
    error = received;
  } else {
    try {
      received();
    } catch (e) {
      error = e;
    }
  }

  if (error === undefined) {
    throw new Error(
      (0, _jestMatcherUtils.matcherHint)(`.${matcherName}`, '() => {}', '') +
        '\n\n' +
        `Expected the function to throw an error.\n` +
        `But it didn't throw anything.`
    );
  }

  return _toMatchSnapshot({
    context: context,
    inlineSnapshot: inlineSnapshot,
    received: error.message,
    testName: testName
  });
};

module.exports = {
  EXTENSION: utils.SNAPSHOT_EXTENSION,
  SnapshotState: _State2.default,
  addSerializer: _plugins.addSerializer,
  cleanup: cleanup,
  getSerializers: _plugins.getSerializers,
  toMatchInlineSnapshot: toMatchInlineSnapshot,
  toMatchSnapshot: toMatchSnapshot,
  toThrowErrorMatchingInlineSnapshot: toThrowErrorMatchingInlineSnapshot,
  toThrowErrorMatchingSnapshot: toThrowErrorMatchingSnapshot,
  utils: utils
};
