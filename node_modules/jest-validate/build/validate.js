'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _default_config;

function _load_default_config() {
  return (_default_config = _interopRequireDefault(
    require('./default_config')
  ));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

let hasDeprecationWarnings = false;

const shouldSkipValidationForPath = (path, key, blacklist) =>
  blacklist
    ? blacklist.includes([].concat(_toConsumableArray(path), [key]).join('.'))
    : false;

const _validate = function(config, exampleConfig, options) {
  let path =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (
    typeof config !== 'object' ||
    config == null ||
    typeof exampleConfig !== 'object' ||
    exampleConfig == null
  ) {
    return {hasDeprecationWarnings: hasDeprecationWarnings};
  }

  for (const key in config) {
    if (
      options.deprecatedConfig &&
      key in options.deprecatedConfig &&
      typeof options.deprecate === 'function'
    ) {
      const isDeprecatedKey = options.deprecate(
        config,
        key,
        options.deprecatedConfig,
        options
      );

      hasDeprecationWarnings = hasDeprecationWarnings || isDeprecatedKey;
    } else if (hasOwnProperty.call(exampleConfig, key)) {
      if (
        typeof options.condition === 'function' &&
        typeof options.error === 'function' &&
        !options.condition(config[key], exampleConfig[key])
      ) {
        options.error(key, config[key], exampleConfig[key], options, path);
      }
    } else if (
      shouldSkipValidationForPath(path, key, options.recursiveBlacklist)
    ) {
      // skip validating unknown options inside blacklisted paths
    } else {
      options.unknown &&
        options.unknown(config, exampleConfig, key, options, path);
    }

    if (
      options.recursive &&
      !Array.isArray(exampleConfig[key]) &&
      options.recursiveBlacklist &&
      !shouldSkipValidationForPath(path, key, options.recursiveBlacklist)
    ) {
      _validate(
        config[key],
        exampleConfig[key],
        options,
        [].concat(_toConsumableArray(path), [key])
      );
    }
  }

  return {hasDeprecationWarnings: hasDeprecationWarnings};
};

const validate = (config, options) => {
  hasDeprecationWarnings = false;

  const defaultedOptions = Object.assign(
    {},
    (_default_config || _load_default_config()).default,
    options,
    {
      title: Object.assign(
        {},
        (_default_config || _load_default_config()).default.title,
        options.title
      )
    }
  );

  var _validate2 = _validate(config, options.exampleConfig, defaultedOptions);

  const hdw = _validate2.hasDeprecationWarnings;

  return {
    hasDeprecationWarnings: hdw,
    isValid: true
  };
};

exports.default = validate;
