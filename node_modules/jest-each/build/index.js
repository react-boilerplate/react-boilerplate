'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.bind = undefined;

var _bind;

function _load_bind() {
  return (_bind = _interopRequireDefault(require('./bind')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

const install = function(g) {
  for (
    var _len = arguments.length,
      args = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  const test = (title, test, timeout) =>
    (0, (_bind || _load_bind()).default)(g.test).apply(undefined, args)(
      title,
      test,
      timeout
    );
  test.skip = (0, (_bind || _load_bind()).default)(g.test.skip).apply(
    undefined,
    args
  );
  test.only = (0, (_bind || _load_bind()).default)(g.test.only).apply(
    undefined,
    args
  );

  const it = (title, test, timeout) =>
    (0, (_bind || _load_bind()).default)(g.it).apply(undefined, args)(
      title,
      test,
      timeout
    );
  it.skip = (0, (_bind || _load_bind()).default)(g.it.skip).apply(
    undefined,
    args
  );
  it.only = (0, (_bind || _load_bind()).default)(g.it.only).apply(
    undefined,
    args
  );

  const xit = (0, (_bind || _load_bind()).default)(g.xit).apply(
    undefined,
    args
  );
  const fit = (0, (_bind || _load_bind()).default)(g.fit).apply(
    undefined,
    args
  );
  const xtest = (0, (_bind || _load_bind()).default)(g.xtest).apply(
    undefined,
    args
  );

  const describe = (title, suite, timeout) =>
    (0, (_bind || _load_bind()).default)(g.describe, false).apply(
      undefined,
      args
    )(title, suite, timeout);
  describe.skip = (0, (_bind || _load_bind()).default)(
    g.describe.skip,
    false
  ).apply(undefined, args);
  describe.only = (0, (_bind || _load_bind()).default)(
    g.describe.only,
    false
  ).apply(undefined, args);
  const fdescribe = (0, (_bind || _load_bind()).default)(
    g.fdescribe,
    false
  ).apply(undefined, args);
  const xdescribe = (0, (_bind || _load_bind()).default)(
    g.xdescribe,
    false
  ).apply(undefined, args);

  return {
    describe: describe,
    fdescribe: fdescribe,
    fit: fit,
    it: it,
    test: test,
    xdescribe: xdescribe,
    xit: xit,
    xtest: xtest
  };
};
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const each = function() {
  for (
    var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    args[_key2] = arguments[_key2];
  }

  return install.apply(undefined, [global].concat(args));
};

each.withGlobal = g =>
  function() {
    for (
      var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3];
    }

    return install.apply(undefined, [g].concat(args));
  };

exports.bind = (_bind || _load_bind()).default;
exports.default = each;
