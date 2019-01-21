"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getAutoControlledStateValue = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _difference2 = _interopRequireDefault(require("lodash/difference"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _react = require("react");

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


var getAutoControlledStateValue = function getAutoControlledStateValue(propName, props, state) {
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

exports.getAutoControlledStateValue = getAutoControlledStateValue;

var AutoControlledComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AutoControlledComponent, _Component);

  function AutoControlledComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, AutoControlledComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(AutoControlledComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "trySetState", function (maybeState, state) {
      var autoControlledProps = _this.constructor.autoControlledProps;

      if (process.env.NODE_ENV !== 'production') {
        var name = _this.constructor.name; // warn about failed attempts to setState for keys not listed in autoControlledProps

        var illegalKeys = (0, _difference2.default)((0, _keys2.default)(maybeState), autoControlledProps);

        if (!(0, _isEmpty2.default)(illegalKeys)) {
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
      if (state) newState = (0, _objectSpread2.default)({}, newState, state);
      if (Object.keys(newState).length > 0) _this.setState(newState);
    });
    var _autoControlledProps = _this.constructor.autoControlledProps;

    var _state = (0, _invoke2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'getInitialAutoControlledState', _this.props) || {};

    if (process.env.NODE_ENV !== 'production') {
      var _this$constructor = _this.constructor,
          defaultProps = _this$constructor.defaultProps,
          name = _this$constructor.name,
          propTypes = _this$constructor.propTypes; // require static autoControlledProps

      if (!_autoControlledProps) {
        console.error("Auto controlled ".concat(name, " must specify a static autoControlledProps array."));
      } // require propTypes


      (0, _each2.default)(_autoControlledProps, function (prop) {
        var defaultProp = getDefaultPropName(prop); // regular prop

        if (!(0, _has2.default)(propTypes, defaultProp)) {
          console.error("".concat(name, " is missing \"").concat(defaultProp, "\" propTypes validation for auto controlled prop \"").concat(prop, "\"."));
        } // its default prop


        if (!(0, _has2.default)(propTypes, prop)) {
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

      var illegalDefaults = (0, _intersection2.default)(_autoControlledProps, (0, _keys2.default)(defaultProps));

      if (!(0, _isEmpty2.default)(illegalDefaults)) {
        console.error(['Do not set defaultProps for autoControlledProps. You can set defaults by', 'setting state in the constructor or using an ES7 property initializer', '(https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers)', "See ".concat(name, " props: \"").concat(illegalDefaults, "\".")].join(' '));
      } // prevent listing defaultProps in autoControlledProps
      //
      // Default props are automatically handled.
      // Listing defaults in autoControlledProps would result in allowing defaultDefaultValue props.


      var illegalAutoControlled = (0, _filter2.default)(_autoControlledProps, function (prop) {
        return (0, _startsWith2.default)(prop, 'default');
      });

      if (!(0, _isEmpty2.default)(illegalAutoControlled)) {
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

        if (!(0, _isUndefined2.default)(_this.props[defaultPropName]) && !(0, _isUndefined2.default)(_this.props[prop])) {
          console.error("".concat(_name, " prop \"").concat(prop, "\" is auto controlled. Specify either ").concat(defaultPropName, " or ").concat(prop, ", but not both."));
        }
      }

      return acc;
    }, {});

    _this.state = (0, _objectSpread2.default)({}, _state, initialAutoControlledState);
    return _this;
  }

  (0, _createClass2.default)(AutoControlledComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var autoControlledProps = this.constructor.autoControlledProps; // Solve the next state for autoControlledProps

      var newState = autoControlledProps.reduce(function (acc, prop) {
        var isNextUndefined = (0, _isUndefined2.default)(nextProps[prop]);
        var propWasRemoved = !(0, _isUndefined2.default)(_this2.props[prop]) && isNextUndefined; // if next is defined then use its value

        if (!isNextUndefined) acc[prop] = nextProps[prop]; // reinitialize state for props just removed / set undefined
        else if (propWasRemoved) acc[prop] = getAutoControlledStateValue(prop, nextProps);
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
}(_react.Component);

exports.default = AutoControlledComponent;