import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _difference from "lodash/difference";
import _isUndefined from "lodash/isUndefined";
import _startsWith from "lodash/startsWith";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
import _keys from "lodash/keys";
import _intersection from "lodash/intersection";
import _has from "lodash/has";
import _each from "lodash/each";
import _invoke from "lodash/invoke";
import { Component } from 'react';

var getDefaultPropName = function getDefaultPropName(prop) {
  return "default".concat(prop[0].toUpperCase() + prop.slice(1));
};
/**
 * Return the auto controlled state value for a give prop. The initial value is chosen in this order:
 *  - regular props
 *  - then, default props
 *  - then, initial state
 *  - then, `checked` defaults to false
 *  - then, `value` defaults to '' or [] if props.multiple
 *  - else, undefined
 *
 *  @param {string} propName A prop name
 *  @param {object} [props] A props object
 *  @param {object} [state] A state object
 *  @param {boolean} [includeDefaults=false] Whether or not to heed the default props or initial state
 */


export var getAutoControlledStateValue = function getAutoControlledStateValue(propName, props, state) {
  var includeDefaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // regular props
  var propValue = props[propName];
  if (propValue !== undefined) return propValue;

  if (includeDefaults) {
    // defaultProps
    var defaultProp = props[getDefaultPropName(propName)];
    if (defaultProp !== undefined) return defaultProp; // initial state - state may be null or undefined

    if (state) {
      var initialState = state[propName];
      if (initialState !== undefined) return initialState;
    }
  } // React doesn't allow changing from uncontrolled to controlled components,
  // default checked/value if they were not present.


  if (propName === 'checked') return false;
  if (propName === 'value') return props.multiple ? [] : ''; // otherwise, undefined
};

var AutoControlledComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoControlledComponent, _Component);

  function AutoControlledComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AutoControlledComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutoControlledComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "trySetState", function (maybeState, state) {
      var autoControlledProps = _this.constructor.autoControlledProps;

      if (process.env.NODE_ENV !== 'production') {
        var name = _this.constructor.name; // warn about failed attempts to setState for keys not listed in autoControlledProps

        var illegalKeys = _difference(_keys(maybeState), autoControlledProps);

        if (!_isEmpty(illegalKeys)) {
          console.error(["".concat(name, " called trySetState() with controlled props: \"").concat(illegalKeys, "\"."), 'State will not be set.', 'Only props in static autoControlledProps will be set on state.'].join(' '));
        }
      }

      var newState = Object.keys(maybeState).reduce(function (acc, prop) {
        // ignore props defined by the parent
        if (_this.props[prop] !== undefined) return acc; // ignore props not listed in auto controlled props

        if (autoControlledProps.indexOf(prop) === -1) return acc;
        acc[prop] = maybeState[prop];
        return acc;
      }, {});
      if (state) newState = _objectSpread({}, newState, state);
      if (Object.keys(newState).length > 0) _this.setState(newState);
    });

    var _autoControlledProps = _this.constructor.autoControlledProps;

    var _state = _invoke(_assertThisInitialized(_assertThisInitialized(_this)), 'getInitialAutoControlledState', _this.props) || {};

    if (process.env.NODE_ENV !== 'production') {
      var _this$constructor = _this.constructor,
          defaultProps = _this$constructor.defaultProps,
          name = _this$constructor.name,
          propTypes = _this$constructor.propTypes; // require static autoControlledProps

      if (!_autoControlledProps) {
        console.error("Auto controlled ".concat(name, " must specify a static autoControlledProps array."));
      } // require propTypes


      _each(_autoControlledProps, function (prop) {
        var defaultProp = getDefaultPropName(prop); // regular prop

        if (!_has(propTypes, defaultProp)) {
          console.error("".concat(name, " is missing \"").concat(defaultProp, "\" propTypes validation for auto controlled prop \"").concat(prop, "\"."));
        } // its default prop


        if (!_has(propTypes, prop)) {
          console.error("".concat(name, " is missing propTypes validation for auto controlled prop \"").concat(prop, "\"."));
        }
      }); // prevent autoControlledProps in defaultProps
      //
      // When setting state, auto controlled props values always win (so the parent can manage them).
      // It is not reasonable to decipher the difference between props from the parent and defaultProps.
      // Allowing defaultProps results in trySetState always deferring to the defaultProp value.
      // Auto controlled props also listed in defaultProps can never be updated.
      //
      // To set defaults for an AutoControlled prop, you can set the initial state in the
      // constructor or by using an ES7 property initializer:
      // https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers


      var illegalDefaults = _intersection(_autoControlledProps, _keys(defaultProps));

      if (!_isEmpty(illegalDefaults)) {
        console.error(['Do not set defaultProps for autoControlledProps. You can set defaults by', 'setting state in the constructor or using an ES7 property initializer', '(https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers)', "See ".concat(name, " props: \"").concat(illegalDefaults, "\".")].join(' '));
      } // prevent listing defaultProps in autoControlledProps
      //
      // Default props are automatically handled.
      // Listing defaults in autoControlledProps would result in allowing defaultDefaultValue props.


      var illegalAutoControlled = _filter(_autoControlledProps, function (prop) {
        return _startsWith(prop, 'default');
      });

      if (!_isEmpty(illegalAutoControlled)) {
        console.error(['Do not add default props to autoControlledProps.', 'Default props are automatically handled.', "See ".concat(name, " autoControlledProps: \"").concat(illegalAutoControlled, "\".")].join(' '));
      }
    } // Auto controlled props are copied to state.
    // Set initial state by copying auto controlled props to state.
    // Also look for the default prop for any auto controlled props (foo => defaultFoo)
    // so we can set initial values from defaults.


    var initialAutoControlledState = _autoControlledProps.reduce(function (acc, prop) {
      acc[prop] = getAutoControlledStateValue(prop, _this.props, _state, true);

      if (process.env.NODE_ENV !== 'production') {
        var defaultPropName = getDefaultPropName(prop);
        var _name = _this.constructor.name; // prevent defaultFoo={} along side foo={}

        if (!_isUndefined(_this.props[defaultPropName]) && !_isUndefined(_this.props[prop])) {
          console.error("".concat(_name, " prop \"").concat(prop, "\" is auto controlled. Specify either ").concat(defaultPropName, " or ").concat(prop, ", but not both."));
        }
      }

      return acc;
    }, {});

    _this.state = _objectSpread({}, _state, initialAutoControlledState);
    return _this;
  }

  _createClass(AutoControlledComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var autoControlledProps = this.constructor.autoControlledProps; // Solve the next state for autoControlledProps

      var newState = autoControlledProps.reduce(function (acc, prop) {
        var isNextDefined = !_isUndefined(nextProps[prop]); // if next is defined then use its value

        if (isNextDefined) acc[prop] = nextProps[prop];
        return acc;
      }, {});
      if (Object.keys(newState).length > 0) this.setState(newState);
    }
    /**
     * Safely attempt to set state for props that might be controlled by the user.
     * Second argument is a state object that is always passed to setState.
     * @param {object} maybeState State that corresponds to controlled props.
     * @param {object} [state] Actual state, useful when you also need to setState.
     */

  }]);

  return AutoControlledComponent;
}(Component);

export { AutoControlledComponent as default };