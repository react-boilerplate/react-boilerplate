'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util;

function _load_util() {
  return (_util = _interopRequireDefault(require('util')));
}

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _prettyFormat;

function _load_prettyFormat() {
  return (_prettyFormat = _interopRequireDefault(require('pretty-format')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

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
 * Copyright (c) 2018-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const EXPECTED_COLOR = (_chalk || _load_chalk()).default.green;
const RECEIVED_COLOR = (_chalk || _load_chalk()).default.red;
const SUPPORTED_PLACEHOLDERS = /%[sdifjoOp%]/g;
const PRETTY_PLACEHOLDER = '%p';
const INDEX_PLACEHOLDER = '%#';

exports.default = function(cb) {
  let supportsDone =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return function eachBind(title, test, timeout) {
      if (args.length === 1) {
        const table = args[0].every(Array.isArray)
          ? args[0]
          : args[0].map(entry => [entry]);
        return table.forEach((row, i) =>
          cb(
            arrayFormat.apply(
              undefined,
              [title, i].concat(_toConsumableArray(row))
            ),
            applyRestParams(supportsDone, row, test),
            timeout
          )
        );
      }

      const templateStrings = args[0];
      const data = args.slice(1);

      const keys = getHeadingKeys(templateStrings[0]);
      const table = buildTable(data, keys.length, keys);

      const missingData = data.length % keys.length;

      if (missingData > 0) {
        const error = new Error(
          'Not enough arguments supplied for given headings:\n' +
            EXPECTED_COLOR(keys.join(' | ')) +
            '\n\n' +
            'Received:\n' +
            RECEIVED_COLOR(
              (0, (_prettyFormat || _load_prettyFormat()).default)(data)
            ) +
            '\n\n' +
            `Missing ${RECEIVED_COLOR(missingData.toString())} ${pluralize(
              'argument',
              missingData
            )}`
        );

        if (Error.captureStackTrace) {
          Error.captureStackTrace(error, eachBind);
        }

        return cb(title, () => {
          throw error;
        });
      }

      return table.forEach(row =>
        cb(
          interpolate(title, row),
          applyObjectParams(supportsDone, row, test),
          timeout
        )
      );
    };
  };
};

const getPrettyIndexes = placeholders =>
  placeholders.reduce(
    (indexes, placeholder, index) =>
      placeholder === PRETTY_PLACEHOLDER ? indexes.concat(index) : indexes,
    []
  );

const arrayFormat = function(title, rowIndex) {
  for (
    var _len2 = arguments.length,
      args = Array(_len2 > 2 ? _len2 - 2 : 0),
      _key2 = 2;
    _key2 < _len2;
    _key2++
  ) {
    args[_key2 - 2] = arguments[_key2];
  }

  const placeholders = title.match(SUPPORTED_PLACEHOLDERS) || [];
  const prettyIndexes = getPrettyIndexes(placeholders);

  var _args$reduce = args.reduce(
    (acc, arg, index) => {
      if (prettyIndexes.indexOf(index) !== -1) {
        return {
          args: acc.args,
          title: acc.title.replace(
            PRETTY_PLACEHOLDER,
            (0, (_prettyFormat || _load_prettyFormat()).default)(arg, {
              maxDepth: 1,
              min: true
            })
          )
        };
      }

      return {
        args: acc.args.concat([arg]),
        title: acc.title
      };
    },
    {args: [], title: title}
  );

  const prettyTitle = _args$reduce.title,
    remainingArgs = _args$reduce.args;

  return (_util || _load_util()).default.format.apply(
    (_util || _load_util()).default,
    [prettyTitle.replace(INDEX_PLACEHOLDER, rowIndex.toString())].concat(
      _toConsumableArray(
        remainingArgs.slice(0, placeholders.length - prettyIndexes.length)
      )
    )
  );
};

const applyRestParams = (supportsDone, params, test) =>
  supportsDone && params.length < test.length
    ? done => test.apply(undefined, _toConsumableArray(params).concat([done]))
    : () => test.apply(undefined, _toConsumableArray(params));

const getHeadingKeys = headings => headings.replace(/\s/g, '').split('|');

const buildTable = (data, rowSize, keys) =>
  Array.from({length: data.length / rowSize})
    .map((_, index) => data.slice(index * rowSize, index * rowSize + rowSize))
    .map(row =>
      row.reduce(
        (acc, value, index) => Object.assign({}, acc, {[keys[index]]: value}),
        {}
      )
    );

const getMatchingKeyPaths = title => (matches, key) =>
  matches.concat(title.match(new RegExp(`\\$${key}[\\.\\w]*`, 'g')) || []);

const replaceKeyPathWithValue = data => (title, match) => {
  const keyPath = match.replace('$', '').split('.');
  const value = getPath(data, keyPath);
  return title.replace(
    match,
    (0, (_prettyFormat || _load_prettyFormat()).default)(value, {
      maxDepth: 1,
      min: true
    })
  );
};

const interpolate = (title, data) =>
  Object.keys(data)
    .reduce(getMatchingKeyPaths(title), []) // aka flatMap
    .reduce(replaceKeyPathWithValue(data), title);

const applyObjectParams = (supportsDone, obj, test) =>
  supportsDone && test.length > 1 ? done => test(obj, done) : () => test(obj);

const pluralize = (word, count) => word + (count === 1 ? '' : 's');

const getPath = (o, _ref) => {
  var _ref2 = _toArray(_ref);

  let head = _ref2[0],
    tail = _ref2.slice(1);

  if (!head || !o.hasOwnProperty || !o.hasOwnProperty(head)) return o;
  return getPath(o[head], tail);
};
