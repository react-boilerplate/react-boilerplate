import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _difference from "lodash/fp/difference";
import _trim from "lodash/fp/trim";
import _isObject from "lodash/fp/isObject";
import _pick from "lodash/fp/pick";
import _keys from "lodash/fp/keys";
import _isPlainObject from "lodash/fp/isPlainObject";
import _isFunction from "lodash/fp/isFunction";
import _compact from "lodash/fp/compact";
import _isNil from "lodash/fp/isNil";
import _take from "lodash/fp/take";
import _sortBy from "lodash/fp/sortBy";
import _sum from "lodash/fp/sum";
import _min from "lodash/fp/min";
import _map from "lodash/fp/map";
import _flow from "lodash/fp/flow";
import _memoize from "lodash/fp/memoize";
import PropTypes from 'prop-types';
import leven from './leven';

var typeOf = function typeOf() {
  var _Object$prototype$toS;

  return (_Object$prototype$toS = Object.prototype.toString).call.apply(_Object$prototype$toS, arguments);
};
/**
 * Ensure a component can render as a give prop value.
 */


export var as = function as() {
  return PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string, PropTypes.symbol]).apply(void 0, arguments);
};
/**
 * Ensure a prop is a valid DOM node.
 */

export var domNode = function domNode(props, propName) {
  // skip if prop is undefined
  if (props[propName] === undefined) return; // skip if prop is valid

  if (props[propName] instanceof Element) return;
  throw new Error("Invalid prop \"".concat(propName, "\" supplied, expected a DOM node."));
};
/**
 * Similar to PropTypes.oneOf but shows closest matches.
 * Word order is ignored allowing `left chevron` to match `chevron left`.
 * Useful for very large lists of options (e.g. Icon name, Flag name, etc.)
 * @param {string[]} suggestions An array of allowed values.
 */

export var suggest = function suggest(suggestions) {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.');
  }
  /* eslint-disable max-nested-callbacks */


  var findBestSuggestions = _memoize(function (str) {
    var propValueWords = str.split(' ');
    return _flow(_map(function (suggestion) {
      var suggestionWords = suggestion.split(' ');

      var propValueScore = _flow(_map(function (x) {
        return _map(function (y) {
          return leven(x, y);
        }, suggestionWords);
      }), _map(_min), _sum)(propValueWords);

      var suggestionScore = _flow(_map(function (x) {
        return _map(function (y) {
          return leven(x, y);
        }, propValueWords);
      }), _map(_min), _sum)(suggestionWords);

      return {
        suggestion: suggestion,
        score: propValueScore + suggestionScore
      };
    }), _sortBy(['score', 'suggestion']), _take(3))(suggestions);
  });
  /* eslint-enable max-nested-callbacks */
  // Convert the suggestions list into a hash map for O(n) lookup times. Ensure
  // the words in each key are sorted alphabetically so that we have a consistent
  // way of looking up a value in the map, i.e. we can sort the words in the
  // incoming propValue and look that up without having to check all permutations.


  var suggestionsLookup = suggestions.reduce(function (acc, key) {
    acc[key.split(' ').sort().join(' ')] = true;
    return acc;
  }, {});
  return function (props, propName, componentName) {
    var propValue = props[propName]; // skip if prop is undefined or is included in the suggestions

    if (!propValue || suggestionsLookup[propValue]) return; // check if the words were correct but ordered differently.
    // Since we're matching for classNames we need to allow any word order
    // to pass validation, e.g. `left chevron` vs `chevron left`.

    var propValueSorted = propValue.split(' ').sort().join(' ');
    if (suggestionsLookup[propValueSorted]) return; // find best suggestions

    var bestMatches = findBestSuggestions(propValue); // skip if a match scored 0

    if (bestMatches.some(function (x) {
      return x.score === 0;
    })) return;
    return new Error(["Invalid prop `".concat(propName, "` of value `").concat(propValue, "` supplied to `").concat(componentName, "`."), "\n\nInstead of `".concat(propValue, "`, did you mean:"), bestMatches.map(function (x) {
      return "\n  - ".concat(x.suggestion);
    }).join(''), '\n'].join(''));
  };
};
/**
 * Disallow other props from being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */

export var disallow = function disallow(disallowedProps) {
  return function (props, propName, componentName) {
    if (!Array.isArray(disallowedProps)) {
      throw new Error(['Invalid argument supplied to disallow, expected an instance of array.', " See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(''));
    } // skip if prop is undefined


    if (_isNil(props[propName]) || props[propName] === false) return; // find disallowed props with values

    var disallowed = disallowedProps.reduce(function (acc, disallowedProp) {
      if (!_isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
        return _toConsumableArray(acc).concat([disallowedProp]);
      }

      return acc;
    }, []);

    if (disallowed.length > 0) {
      return new Error(["Prop `".concat(propName, "` in `").concat(componentName, "` conflicts with props: `").concat(disallowed.join('`, `'), "`."), 'They cannot be defined together, choose one or the other.'].join(' '));
    }
  };
};
/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {function[]} validators An array of propType functions.
 */

export var every = function every(validators) {
  return function (props, propName, componentName) {
    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    if (!Array.isArray(validators)) {
      throw new Error(['Invalid argument supplied to every, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var errors = _flow(_map(function (validator) {
      if (typeof validator !== 'function') {
        throw new Error("every() argument \"validators\" should contain functions, found: ".concat(typeOf(validator), "."));
      }

      return validator.apply(void 0, [props, propName, componentName].concat(rest));
    }), _compact)(validators); // we can only return one error at a time


    return errors[0];
  };
};
/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {function[]} validators An array of propType functions.
 */

export var some = function some(validators) {
  return function (props, propName, componentName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    if (!Array.isArray(validators)) {
      throw new Error(['Invalid argument supplied to some, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var errors = _compact(_map(validators, function (validator) {
      if (!_isFunction(validator)) {
        throw new Error("some() argument \"validators\" should contain functions, found: ".concat(typeOf(validator), "."));
      }

      return validator.apply(void 0, [props, propName, componentName].concat(rest));
    })); // fail only if all validators failed


    if (errors.length === validators.length) {
      var error = new Error('One of these validators must pass:');
      error.message += "\n".concat(_map(errors, function (err, i) {
        return "[".concat(i + 1, "]: ").concat(err.message);
      }).join('\n'));
      return error;
    }
  };
};
/**
 * Ensure a validator passes only when a component has a given propsShape.
 * @param {object} propsShape An object describing the prop shape.
 * @param {function} validator A propType function.
 */

export var givenProps = function givenProps(propsShape, validator) {
  return function (props, propName, componentName) {
    for (var _len3 = arguments.length, rest = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      rest[_key3 - 3] = arguments[_key3];
    }

    if (!_isPlainObject(propsShape)) {
      throw new Error(['Invalid argument supplied to givenProps, expected an object.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    if (typeof validator !== 'function') {
      throw new Error(['Invalid argument supplied to givenProps, expected a function.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var shouldValidate = _keys(propsShape).every(function (key) {
      var val = propsShape[key]; // require propShape validators to pass or prop values to match

      return typeof val === 'function' ? !val.apply(void 0, [props, key, componentName].concat(rest)) : val === props[propName];
    });

    if (!shouldValidate) return;
    var error = validator.apply(void 0, [props, propName, componentName].concat(rest));

    if (error) {
      // poor mans shallow pretty print, prevents JSON circular reference errors
      var prettyProps = "{ ".concat(_keys(_pick(_keys(propsShape), props)).map(function (key) {
        var val = props[key];
        var renderedValue = val;
        if (typeof val === 'string') renderedValue = "\"".concat(val, "\"");else if (Array.isArray(val)) renderedValue = "[".concat(val.join(', '), "]");else if (_isObject(val)) renderedValue = '{...}';
        return "".concat(key, ": ").concat(renderedValue);
      }).join(', '), " }");
      error.message = "Given props ".concat(prettyProps, ": ").concat(error.message);
      return error;
    }
  };
};
/**
 * Define prop dependencies by requiring other props.
 * @param {string[]} requiredProps An array of required prop names.
 */

export var demand = function demand(requiredProps) {
  return function (props, propName, componentName) {
    if (!Array.isArray(requiredProps)) {
      throw new Error(['Invalid `requiredProps` argument supplied to require, expected an instance of array.', " See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(''));
    } // skip if prop is undefined


    if (props[propName] === undefined) return;
    var missingRequired = requiredProps.filter(function (requiredProp) {
      return props[requiredProp] === undefined;
    });

    if (missingRequired.length > 0) {
      return new Error("`".concat(propName, "` prop in `").concat(componentName, "` requires props: `").concat(missingRequired.join('`, `'), "`."));
    }
  };
};
/**
 * Ensure an multiple prop contains a string with only possible values.
 * @param {string[]} possible An array of possible values to prop.
 */

export var multipleProp = function multipleProp(possible) {
  return function (props, propName, componentName) {
    if (!Array.isArray(possible)) {
      throw new Error(['Invalid argument supplied to some, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var propValue = props[propName]; // skip if prop is undefined

    if (_isNil(propValue) || propValue === false) return;
    var values = propValue.replace('large screen', 'large-screen').replace(/ vertically/g, '-vertically').split(' ').map(function (val) {
      return _trim(val).replace('-', ' ');
    });

    var invalid = _difference(values, possible); // fail only if there are invalid values


    if (invalid.length > 0) {
      return new Error("`".concat(propName, "` prop in `").concat(componentName, "` has invalid values: `").concat(invalid.join('`, `'), "`."));
    }
  };
};
/**
 * Ensure a component can render as a node passed as a prop value in place of children.
 */

export var contentShorthand = function contentShorthand() {
  return every([disallow(['children']), PropTypes.node]).apply(void 0, arguments);
};
/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, or an element.
 */

export var itemShorthand = function itemShorthand() {
  return every([disallow(['children']), PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.object, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object]))])]).apply(void 0, arguments);
};
/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */

export var collectionShorthand = function collectionShorthand() {
  return every([disallow(['children']), PropTypes.arrayOf(itemShorthand)]).apply(void 0, arguments);
};
/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param {string} help A help message to display with the deprecation warning.
 * @param {function} [validator] A propType function.
 */

export var deprecate = function deprecate(help, validator) {
  return function (props, propName, componentName) {
    if (typeof help !== 'string') {
      throw new Error(['Invalid `help` argument supplied to deprecate, expected a string.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    } // skip if prop is undefined


    if (props[propName] === undefined) return; // deprecation error and help

    var error = new Error("The `".concat(propName, "` prop in `").concat(componentName, "` is deprecated."));
    if (help) error.message += " ".concat(help); // add optional validation error message

    if (validator) {
      if (typeof validator === 'function') {
        for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
          args[_key4 - 3] = arguments[_key4];
        }

        var validationError = validator.apply(void 0, [props, propName, componentName].concat(args));

        if (validationError) {
          error.message = "".concat(error.message, " ").concat(validationError.message);
        }
      } else {
        throw new Error(['Invalid argument supplied to deprecate, expected a function.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
      }
    }

    return error;
  };
};