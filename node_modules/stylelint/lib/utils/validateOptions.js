/* @flow */
"use strict";

const _ = require("lodash");

const ignoredOptions = ["severity", "message"];

/**
 * Validate a rule's options.
 *
 * See existing rules for examples.
 *
 * @param {Result} result - postcss result
 * @param {string} ruleName
 * @param {...object} ...optionDescriptions - Each optionDescription can
 *   have the following properties:
 *   	- `actual` (required): the actual passed option value or object.
 *   	- `possible` (required): a schema representation of what values are
 *      valid for those options. `possible` should be an object if the
 *      options are an object, with corresponding keys; if the options are not an
 *      object, `possible` isn't, either. All `possible` value representations
 *      should be **arrays of either values or functions**. Values are === checked
 *      against `actual`. Functions are fed `actual` as an argument and their
 *      return value is interpreted: truthy = valid, falsy = invalid.
 *    - `optional` (optional): If this is `true`, `actual` can be undefined.
 * @return {boolean} Whether or not the options are valid (true = valid)
 */
module.exports = function(
  result /*: Object*/,
  ruleName /*: string*/
) /*: boolean*/ {
  let noErrors = true;

  const optionDescriptions = Array.from(arguments).slice(2);

  optionDescriptions.forEach(optionDescription => {
    validate(optionDescription, ruleName, complain);
  });

  function complain(message) {
    noErrors = false;
    result.warn(message, {
      stylelintType: "invalidOption"
    });
    _.set(result, "stylelint.stylelintError", true);
  }

  return noErrors;
};

function validate(opts, ruleName, complain) {
  const possible = opts.possible;
  const actual = opts.actual;
  const optional = opts.optional;

  if (actual === null || _.isEqual(actual, [null])) {
    return;
  }

  const nothingPossible =
    possible === undefined ||
    (Array.isArray(possible) && possible.length === 0);

  if (nothingPossible && actual === true) {
    return;
  }

  if (actual === undefined) {
    if (nothingPossible || optional) {
      return;
    }
    complain(`Expected option value for rule "${ruleName}"`);
    return;
  } else if (nothingPossible) {
    if (optional) {
      complain(
        `Incorrect configuration for rule "${ruleName}". Rule should have "possible" values for options validation`
      );

      return;
    }

    complain(`Unexpected option value "${actual}" for rule "${ruleName}"`);
    return;
  }

  // If `possible` is a function ...
  if (_.isFunction(possible)) {
    if (!possible(actual)) {
      complain(
        `Invalid option "${JSON.stringify(actual)}" for rule ${ruleName}`
      );
    }
    return;
  }

  // If `possible` is an array instead of an object ...
  if (!_.isPlainObject(possible)) {
    [].concat(actual).forEach(a => {
      if (isValid(possible, a)) {
        return;
      }
      complain(`Invalid option value "${a}" for rule "${ruleName}"`);
    });
    return;
  }

  // If possible is an object ...
  if (!_.isPlainObject(actual)) {
    complain(
      `Invalid option value ${JSON.stringify(
        actual
      )} for rule "${ruleName}": ` + "should be an object"
    );
    return;
  }

  Object.keys(actual).forEach(optionName => {
    if (ignoredOptions.indexOf(optionName) !== -1) {
      return;
    }

    if (!possible[optionName]) {
      complain(`Invalid option name "${optionName}" for rule "${ruleName}"`);
      return;
    }

    const actualOptionValue = actual[optionName];
    [].concat(actualOptionValue).forEach(a => {
      if (isValid(possible[optionName], a)) {
        return;
      }
      complain(
        `Invalid value "${a}" for option "${optionName}" of rule "${ruleName}"`
      );
    });
  });
}

function isValid(possible, actual) {
  const possibleList = [].concat(possible);
  for (let i = 0, l = possibleList.length; i < l; i++) {
    const possibility = possibleList[i];
    if (typeof possibility === "function" && possibility(actual)) {
      return true;
    }
    if (actual === possibility) {
      return true;
    }
  }
}
