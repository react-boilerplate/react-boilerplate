"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecate = exports.collectionShorthand = exports.itemShorthand = exports.contentShorthand = exports.multipleProp = exports.demand = exports.givenProps = exports.some = exports.every = exports.disallow = exports.suggest = exports.domNode = exports.as = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _difference2 = _interopRequireDefault(require("lodash/fp/difference"));

var _trim2 = _interopRequireDefault(require("lodash/fp/trim"));

var _isObject2 = _interopRequireDefault(require("lodash/fp/isObject"));

var _pick2 = _interopRequireDefault(require("lodash/fp/pick"));

var _keys2 = _interopRequireDefault(require("lodash/fp/keys"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/fp/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/fp/isFunction"));

var _compact2 = _interopRequireDefault(require("lodash/fp/compact"));

var _isNil2 = _interopRequireDefault(require("lodash/fp/isNil"));

var _take2 = _interopRequireDefault(require("lodash/fp/take"));

var _sortBy2 = _interopRequireDefault(require("lodash/fp/sortBy"));

var _sum2 = _interopRequireDefault(require("lodash/fp/sum"));

var _min2 = _interopRequireDefault(require("lodash/fp/min"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var _memoize2 = _interopRequireDefault(require("lodash/fp/memoize"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _leven = _interopRequireDefault(require("./leven"));

var typeOf = function typeOf() {
  var _Object$prototype$toS;

  return (_Object$prototype$toS = Object.prototype.toString).call.apply(_Object$prototype$toS, arguments);
};
/**
 * Ensure a component can render as a give prop value.
 */


var as = function as() {
  return _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.string, _propTypes.default.symbol]).apply(void 0, arguments);
};
/**
 * Ensure a prop is a valid DOM node.
 */


exports.as = as;

var domNode = function domNode(props, propName) {
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


exports.domNode = domNode;

var suggest = function suggest(suggestions) {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.');
  }
  /* eslint-disable max-nested-callbacks */


  var findBestSuggestions = (0, _memoize2.default)(function (str) {
    var propValueWords = str.split(' ');
    return (0, _flow2.default)((0, _map2.default)(function (suggestion) {
      var suggestionWords = suggestion.split(' ');
      var propValueScore = (0, _flow2.default)((0, _map2.default)(function (x) {
        return (0, _map2.default)(function (y) {
          return (0, _leven.default)(x, y);
        }, suggestionWords);
      }), (0, _map2.default)(_min2.default), _sum2.default)(propValueWords);
      var suggestionScore = (0, _flow2.default)((0, _map2.default)(function (x) {
        return (0, _map2.default)(function (y) {
          return (0, _leven.default)(x, y);
        }, propValueWords);
      }), (0, _map2.default)(_min2.default), _sum2.default)(suggestionWords);
      return {
        suggestion: suggestion,
        score: propValueScore + suggestionScore
      };
    }), (0, _sortBy2.default)(['score', 'suggestion']), (0, _take2.default)(3))(suggestions);
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


exports.suggest = suggest;

var disallow = function disallow(disallowedProps) {
  return function (props, propName, componentName) {
    if (!Array.isArray(disallowedProps)) {
      throw new Error(['Invalid argument supplied to disallow, expected an instance of array.', " See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(''));
    } // skip if prop is undefined


    if ((0, _isNil2.default)(props[propName]) || props[propName] === false) return; // find disallowed props with values

    var disallowed = disallowedProps.reduce(function (acc, disallowedProp) {
      if (!(0, _isNil2.default)(props[disallowedProp]) && props[disallowedProp] !== false) {
        return (0, _toConsumableArray2.default)(acc).concat([disallowedProp]);
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


exports.disallow = disallow;

var every = function every(validators) {
  return function (props, propName, componentName) {
    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    if (!Array.isArray(validators)) {
      throw new Error(['Invalid argument supplied to every, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var errors = (0, _flow2.default)((0, _map2.default)(function (validator) {
      if (typeof validator !== 'function') {
        throw new Error("every() argument \"validators\" should contain functions, found: ".concat(typeOf(validator), "."));
      }

      return validator.apply(void 0, [props, propName, componentName].concat(rest));
    }), _compact2.default)(validators); // we can only return one error at a time

    return errors[0];
  };
};
/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {function[]} validators An array of propType functions.
 */


exports.every = every;

var some = function some(validators) {
  return function (props, propName, componentName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    if (!Array.isArray(validators)) {
      throw new Error(['Invalid argument supplied to some, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var errors = (0, _compact2.default)((0, _map2.default)(validators, function (validator) {
      if (!(0, _isFunction2.default)(validator)) {
        throw new Error("some() argument \"validators\" should contain functions, found: ".concat(typeOf(validator), "."));
      }

      return validator.apply(void 0, [props, propName, componentName].concat(rest));
    })); // fail only if all validators failed

    if (errors.length === validators.length) {
      var error = new Error('One of these validators must pass:');
      error.message += "\n".concat((0, _map2.default)(errors, function (err, i) {
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


exports.some = some;

var givenProps = function givenProps(propsShape, validator) {
  return function (props, propName, componentName) {
    for (var _len3 = arguments.length, rest = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      rest[_key3 - 3] = arguments[_key3];
    }

    if (!(0, _isPlainObject2.default)(propsShape)) {
      throw new Error(['Invalid argument supplied to givenProps, expected an object.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    if (typeof validator !== 'function') {
      throw new Error(['Invalid argument supplied to givenProps, expected a function.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var shouldValidate = (0, _keys2.default)(propsShape).every(function (key) {
      var val = propsShape[key]; // require propShape validators to pass or prop values to match

      return typeof val === 'function' ? !val.apply(void 0, [props, key, componentName].concat(rest)) : val === props[propName];
    });
    if (!shouldValidate) return;
    var error = validator.apply(void 0, [props, propName, componentName].concat(rest));

    if (error) {
      // poor mans shallow pretty print, prevents JSON circular reference errors
      var prettyProps = "{ ".concat((0, _keys2.default)((0, _pick2.default)((0, _keys2.default)(propsShape), props)).map(function (key) {
        var val = props[key];
        var renderedValue = val;
        if (typeof val === 'string') renderedValue = "\"".concat(val, "\"");else if (Array.isArray(val)) renderedValue = "[".concat(val.join(', '), "]");else if ((0, _isObject2.default)(val)) renderedValue = '{...}';
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


exports.givenProps = givenProps;

var demand = function demand(requiredProps) {
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


exports.demand = demand;

var multipleProp = function multipleProp(possible) {
  return function (props, propName, componentName) {
    if (!Array.isArray(possible)) {
      throw new Error(['Invalid argument supplied to some, expected an instance of array.', "See `".concat(propName, "` prop in `").concat(componentName, "`.")].join(' '));
    }

    var propValue = props[propName]; // skip if prop is undefined

    if ((0, _isNil2.default)(propValue) || propValue === false) return;
    var values = propValue.replace('large screen', 'large-screen').replace(/ vertically/g, '-vertically').split(' ').map(function (val) {
      return (0, _trim2.default)(val).replace('-', ' ');
    });
    var invalid = (0, _difference2.default)(values, possible); // fail only if there are invalid values

    if (invalid.length > 0) {
      return new Error("`".concat(propName, "` prop in `").concat(componentName, "` has invalid values: `").concat(invalid.join('`, `'), "`."));
    }
  };
};
/**
 * Ensure a component can render as a node passed as a prop value in place of children.
 */


exports.multipleProp = multipleProp;

var contentShorthand = function contentShorthand() {
  return every([disallow(['children']), _propTypes.default.node]).apply(void 0, arguments);
};
/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, or an element.
 */


exports.contentShorthand = contentShorthand;

var itemShorthand = function itemShorthand() {
  return every([disallow(['children']), _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node, _propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]))])]).apply(void 0, arguments);
};
/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */


exports.itemShorthand = itemShorthand;

var collectionShorthand = function collectionShorthand() {
  return every([disallow(['children']), _propTypes.default.arrayOf(itemShorthand)]).apply(void 0, arguments);
};
/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param {string} help A help message to display with the deprecation warning.
 * @param {function} [validator] A propType function.
 */


exports.collectionShorthand = collectionShorthand;

var deprecate = function deprecate(help, validator) {
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

exports.deprecate = deprecate;