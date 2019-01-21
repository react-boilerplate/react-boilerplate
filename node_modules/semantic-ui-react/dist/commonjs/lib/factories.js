"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShorthand = createShorthand;
exports.createShorthandFactory = createShorthandFactory;
exports.createHTMLParagraph = exports.createHTMLLabel = exports.createHTMLInput = exports.createHTMLImage = exports.createHTMLIframe = exports.createHTMLDivision = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

// ============================================================
// Factories
// ============================================================

/**
 * A more robust React.createElement. It can create elements from primitive values.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @param {string|object|function} val The value to create a ReactElement from
 * @param {Object} [options={}]
 * @param {object} [options.defaultProps={}] Default props object
 * @param {object|function} [options.overrideProps={}] Override props object or function (called with regular props)
 * @param {boolean} [options.autoGenerateKey=true] Whether or not automatic key generation is allowed
 * @returns {object|null}
 */
function createShorthand(Component, mapValueToProps, val) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthand() Component must be a string or function.');
  } // short circuit noop values


  if ((0, _isNil2.default)(val) || (0, _isBoolean2.default)(val)) return null;
  var valIsString = (0, _isString2.default)(val);
  var valIsNumber = (0, _isNumber2.default)(val);
  var valIsFunction = (0, _isFunction2.default)(val);
  var valIsReactElement = (0, _react.isValidElement)(val);
  var valIsPropsObject = (0, _isPlainObject2.default)(val);
  var valIsPrimitiveValue = valIsString || valIsNumber || (0, _isArray2.default)(val); // unhandled type return null

  /* eslint-disable no-console */

  if (!valIsFunction && !valIsReactElement && !valIsPropsObject && !valIsPrimitiveValue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(['Shorthand value must be a string|number|array|object|ReactElement|function.', ' Use null|undefined|boolean for none', " Received ".concat((0, _typeof2.default)(val), ".")].join(''));
    }

    return null;
  }
  /* eslint-enable no-console */
  // ----------------------------------------
  // Build up props
  // ----------------------------------------


  var _options$defaultProps = options.defaultProps,
      defaultProps = _options$defaultProps === void 0 ? {} : _options$defaultProps; // User's props

  var usersProps = valIsReactElement && val.props || valIsPropsObject && val || valIsPrimitiveValue && mapValueToProps(val); // Override props

  var _options$overrideProp = options.overrideProps,
      overrideProps = _options$overrideProp === void 0 ? {} : _options$overrideProp;
  overrideProps = (0, _isFunction2.default)(overrideProps) ? overrideProps((0, _objectSpread2.default)({}, defaultProps, usersProps)) : overrideProps; // Merge props

  /* eslint-disable react/prop-types */

  var props = (0, _objectSpread2.default)({}, defaultProps, usersProps, overrideProps); // Merge className

  if (defaultProps.className || overrideProps.className || usersProps.className) {
    var mergedClassesNames = (0, _classnames.default)(defaultProps.className, overrideProps.className, usersProps.className);
    props.className = (0, _uniq2.default)(mergedClassesNames.split(' ')).join(' ');
  } // Merge style


  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = (0, _objectSpread2.default)({}, defaultProps.style, usersProps.style, overrideProps.style);
  } // ----------------------------------------
  // Get key
  // ----------------------------------------
  // Use key, childKey, or generate key


  if ((0, _isNil2.default)(props.key)) {
    var childKey = props.childKey;
    var _options$autoGenerate = options.autoGenerateKey,
        autoGenerateKey = _options$autoGenerate === void 0 ? true : _options$autoGenerate;

    if (!(0, _isNil2.default)(childKey)) {
      // apply and consume the childKey
      props.key = typeof childKey === 'function' ? childKey(props) : childKey;
      delete props.childKey;
    } else if (autoGenerateKey && (valIsString || valIsNumber)) {
      // use string/number shorthand values as the key
      props.key = val;
    }
  } // ----------------------------------------
  // Create Element
  // ----------------------------------------
  // Clone ReactElements


  if (valIsReactElement) return (0, _react.cloneElement)(val, props); // Create ReactElements from built up props

  if (valIsPrimitiveValue || valIsPropsObject) return _react.default.createElement(Component, props); // Call functions with args similar to createElement()

  if (valIsFunction) return val(Component, props, props.children);
  /* eslint-enable react/prop-types */
} // ============================================================
// Factory Creators
// ============================================================

/**
 * Creates a `createShorthand` function that is waiting for a value and options.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */


createShorthand.handledProps = [];

function createShorthandFactory(Component, mapValueToProps) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.');
  }

  return function (val, options) {
    return createShorthand(Component, mapValueToProps, val, options);
  };
} // ============================================================
// HTML Factories
// ============================================================


var createHTMLDivision = createShorthandFactory('div', function (val) {
  return {
    children: val
  };
});
exports.createHTMLDivision = createHTMLDivision;
var createHTMLIframe = createShorthandFactory('iframe', function (src) {
  return {
    src: src
  };
});
exports.createHTMLIframe = createHTMLIframe;
var createHTMLImage = createShorthandFactory('img', function (val) {
  return {
    src: val
  };
});
exports.createHTMLImage = createHTMLImage;
var createHTMLInput = createShorthandFactory('input', function (val) {
  return {
    type: val
  };
});
exports.createHTMLInput = createHTMLInput;
var createHTMLLabel = createShorthandFactory('label', function (val) {
  return {
    children: val
  };
});
exports.createHTMLLabel = createHTMLLabel;
var createHTMLParagraph = createShorthandFactory('p', function (val) {
  return {
    children: val
  };
});
exports.createHTMLParagraph = createHTMLParagraph;