"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _isVisible = _interopRequireDefault(require("./lib/isVisible"));

/**
 * Responsive can control visibility of content.
 */
var Responsive =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Responsive, _Component);

  function Responsive() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Responsive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Responsive)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleResize", function (e) {
      if (_this.ticking) return;
      _this.ticking = true;
      _this.frameId = requestAnimationFrame(function () {
        return _this.handleUpdate(e);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUpdate", function (e) {
      _this.ticking = false;
      var visible = _this.state.visible;
      var width = (0, _invoke2.default)(_this.props, 'getWidth');
      var nextVisible = (0, _isVisible.default)(width, _this.props);
      if (visible !== nextVisible) _this.setState({
        visible: nextVisible
      });
      (0, _invoke2.default)(_this.props, 'onUpdate', e, (0, _objectSpread2.default)({}, _this.props, {
        width: width
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(Responsive, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fireOnMount = this.props.fireOnMount;

      _lib.eventStack.sub('resize', this.handleResize, {
        target: 'window'
      });

      if (fireOnMount) this.handleUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _lib.eventStack.unsub('resize', this.handleResize, {
        target: 'window'
      });

      cancelAnimationFrame(this.frameId);
    } // ----------------------------------------
    // Event handlers
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var children = this.props.children;
      var visible = this.state.visible;
      var ElementType = (0, _lib.getElementType)(Responsive, this.props);
      var rest = (0, _lib.getUnhandledProps)(Responsive, this.props);
      if (visible) return _react.default.createElement(ElementType, rest, children);
      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var width = (0, _invoke2.default)(props, 'getWidth');
      var visible = (0, _isVisible.default)(width, props);
      return {
        visible: visible
      };
    }
  }]);
  return Responsive;
}(_react.Component);

exports.default = Responsive;
(0, _defineProperty2.default)(Responsive, "defaultProps", {
  getWidth: function getWidth() {
    return (0, _lib.isBrowser)() ? window.innerWidth : 0;
  }
});
(0, _defineProperty2.default)(Responsive, "onlyMobile", {
  minWidth: 320,
  maxWidth: 767
});
(0, _defineProperty2.default)(Responsive, "onlyTablet", {
  minWidth: 768,
  maxWidth: 991
});
(0, _defineProperty2.default)(Responsive, "onlyComputer", {
  minWidth: 992
});
(0, _defineProperty2.default)(Responsive, "onlyLargeScreen", {
  minWidth: 1200,
  maxWidth: 1919
});
(0, _defineProperty2.default)(Responsive, "onlyWidescreen", {
  minWidth: 1920
});
(0, _defineProperty2.default)(Responsive, "handledProps", ["as", "children", "fireOnMount", "getWidth", "maxWidth", "minWidth", "onUpdate"]);
Responsive.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Fires callbacks immediately after mount. */
  fireOnMount: _propTypes.default.bool,

  /**
   * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
   * otherwise, assumes a width of 0.
   */
  getWidth: _propTypes.default.func,

  /** The maximum width at which content will be displayed. */
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** The minimum width at which content will be displayed. */
  minWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate: _propTypes.default.func
} : {};