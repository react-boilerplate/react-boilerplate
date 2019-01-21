import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _typeof from "@babel/runtime/helpers/typeof";
import _uniq from "lodash/uniq";
import _isArray from "lodash/isArray";
import _isPlainObject from "lodash/isPlainObject";
import _isFunction from "lodash/isFunction";
import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";
import _isBoolean from "lodash/isBoolean";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import React, { cloneElement, isValidElement } from 'react'; // ============================================================
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

export function createShorthand(Component, mapValueToProps, val) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthand() Component must be a string or function.');
  } // short circuit noop values


  if (_isNil(val) || _isBoolean(val)) return null;

  var valIsString = _isString(val);

  var valIsNumber = _isNumber(val);

  var valIsFunction = _isFunction(val);

  var valIsReactElement = isValidElement(val);

  var valIsPropsObject = _isPlainObject(val);

  var valIsPrimitiveValue = valIsString || valIsNumber || _isArray(val); // unhandled type return null

  /* eslint-disable no-console */


  if (!valIsFunction && !valIsReactElement && !valIsPropsObject && !valIsPrimitiveValue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(['Shorthand value must be a string|number|array|object|ReactElement|function.', ' Use null|undefined|boolean for none', " Received ".concat(_typeof(val), ".")].join(''));
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
  overrideProps = _isFunction(overrideProps) ? overrideProps(_objectSpread({}, defaultProps, usersProps)) : overrideProps; // Merge props

  /* eslint-disable react/prop-types */

  var props = _objectSpread({}, defaultProps, usersProps, overrideProps); // Merge className


  if (defaultProps.className || overrideProps.className || usersProps.className) {
    var mergedClassesNames = cx(defaultProps.className, overrideProps.className, usersProps.className);
    props.className = _uniq(mergedClassesNames.split(' ')).join(' ');
  } // Merge style


  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = _objectSpread({}, defaultProps.style, usersProps.style, overrideProps.style);
  } // ----------------------------------------
  // Get key
  // ----------------------------------------
  // Use key, childKey, or generate key


  if (_isNil(props.key)) {
    var childKey = props.childKey;
    var _options$autoGenerate = options.autoGenerateKey,
        autoGenerateKey = _options$autoGenerate === void 0 ? true : _options$autoGenerate;

    if (!_isNil(childKey)) {
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


  if (valIsReactElement) return cloneElement(val, props); // Create ReactElements from built up props

  if (valIsPrimitiveValue || valIsPropsObject) return React.createElement(Component, props); // Call functions with args similar to createElement()

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
export function createShorthandFactory(Component, mapValueToProps) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.');
  }

  return function (val, options) {
    return createShorthand(Component, mapValueToProps, val, options);
  };
} // ============================================================
// HTML Factories
// ============================================================

export var createHTMLDivision = createShorthandFactory('div', function (val) {
  return {
    children: val
  };
});
export var createHTMLIframe = createShorthandFactory('iframe', function (src) {
  return {
    src: src
  };
});
export var createHTMLImage = createShorthandFactory('img', function (val) {
  return {
    src: val
  };
});
export var createHTMLInput = createShorthandFactory('input', function (val) {
  return {
    type: val
  };
});
export var createHTMLLabel = createShorthandFactory('label', function (val) {
  return {
    children: val
  };
});
export var createHTMLParagraph = createShorthandFactory('p', function (val) {
  return {
    children: val
  };
});