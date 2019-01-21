"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * Visibility provides a set of callbacks for when a content appears in the viewport.
 */
var Visibility =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Visibility, _Component);

  function Visibility() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Visibility);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Visibility)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "calculations", {
      bottomPassed: false,
      bottomVisible: false,
      fits: false,
      passing: false,
      offScreen: false,
      onScreen: false,
      topPassed: false,
      topVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "firedCallbacks", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "fire", function (_ref, value) {
      var callback = _ref.callback,
          name = _ref.name;
      var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _this$props = _this.props,
          continuous = _this$props.continuous,
          once = _this$props.once; // Heads up! For the execution is required:
      // - current value correspond to the fired direction
      // - `continuous` is true or calculation values are different

      var matchesDirection = _this.calculations[value] !== reverse;
      var executionPossible = continuous || _this.calculations[value] !== _this.oldCalculations[value];
      if (matchesDirection && executionPossible) _this.execute(callback, name); // Heads up! We should remove callback from the happened when it's not `once`

      if (!once) _this.firedCallbacks = (0, _without2.default)(_this.firedCallbacks, name);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUpdate", function () {
      if (_this.ticking) return;
      _this.ticking = true;
      _this.frameId = requestAnimationFrame(_this.update);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "update", function () {
      if (!_this.mounted) return;
      _this.ticking = false;
      _this.oldCalculations = _this.calculations;
      _this.calculations = _this.computeCalculations();
      _this.pageYOffset = window.pageYOffset;
      var _this$props2 = _this.props,
          onBottomPassed = _this$props2.onBottomPassed,
          onBottomPassedReverse = _this$props2.onBottomPassedReverse,
          onBottomVisible = _this$props2.onBottomVisible,
          onBottomVisibleReverse = _this$props2.onBottomVisibleReverse,
          onPassing = _this$props2.onPassing,
          onPassingReverse = _this$props2.onPassingReverse,
          onTopPassed = _this$props2.onTopPassed,
          onTopPassedReverse = _this$props2.onTopPassedReverse,
          onTopVisible = _this$props2.onTopVisible,
          onTopVisibleReverse = _this$props2.onTopVisibleReverse,
          onOffScreen = _this$props2.onOffScreen,
          onOnScreen = _this$props2.onOnScreen,
          updateOn = _this$props2.updateOn;
      var forward = {
        bottomPassed: {
          callback: onBottomPassed,
          name: 'onBottomPassed'
        },
        bottomVisible: {
          callback: onBottomVisible,
          name: 'onBottomVisible'
        },
        passing: {
          callback: onPassing,
          name: 'onPassing'
        },
        offScreen: {
          callback: onOffScreen,
          name: 'onOffScreen'
        },
        onScreen: {
          callback: onOnScreen,
          name: 'onOnScreen'
        },
        topPassed: {
          callback: onTopPassed,
          name: 'onTopPassed'
        },
        topVisible: {
          callback: onTopVisible,
          name: 'onTopVisible'
        }
      };
      var reverse = {
        bottomPassed: {
          callback: onBottomPassedReverse,
          name: 'onBottomPassedReverse'
        },
        bottomVisible: {
          callback: onBottomVisibleReverse,
          name: 'onBottomVisibleReverse'
        },
        passing: {
          callback: onPassingReverse,
          name: 'onPassingReverse'
        },
        topPassed: {
          callback: onTopPassedReverse,
          name: 'onTopPassedReverse'
        },
        topVisible: {
          callback: onTopVisibleReverse,
          name: 'onTopVisibleReverse'
        }
      };
      (0, _invoke2.default)(_this.props, 'onUpdate', null, (0, _objectSpread2.default)({}, _this.props, {
        calculations: _this.calculations
      }));

      _this.fireOnPassed(); // Heads up! Reverse callbacks should be fired first


      (0, _forEach2.default)(reverse, function (data, value) {
        return _this.fire(data, value, true);
      });
      (0, _forEach2.default)(forward, function (data, value) {
        return _this.fire(data, value);
      });
      if (updateOn === 'repaint') _this.handleUpdate();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });
    return _this;
  }

  (0, _createClass2.default)(Visibility, [{
    key: "componentWillReceiveProps",
    // ----------------------------------------
    // Lifecycle
    // ----------------------------------------
    value: function componentWillReceiveProps(_ref2) {
      var continuous = _ref2.continuous,
          once = _ref2.once,
          context = _ref2.context,
          updateOn = _ref2.updateOn;
      var cleanHappened = continuous !== this.props.continuous || once !== this.props.once || updateOn !== this.props.updateOn; // Heads up! We should clean up array of happened callbacks, if values of these props are changed

      if (cleanHappened) this.firedCallbacks = [];

      if (context !== this.props.context || updateOn !== this.props.updateOn) {
        this.unattachHandlers(this.props.context);
        this.attachHandlers(context, updateOn);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      if (!(0, _lib.isBrowser)()) return;
      var _this$props3 = this.props,
          context = _this$props3.context,
          fireOnMount = _this$props3.fireOnMount,
          updateOn = _this$props3.updateOn;
      this.pageYOffset = window.pageYOffset;
      this.attachHandlers(context, updateOn);
      if (fireOnMount) this.update();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var context = this.props.context;
      this.unattachHandlers(context);
      this.mounted = false;
    }
  }, {
    key: "attachHandlers",
    value: function attachHandlers(context, updateOn) {
      if (updateOn === 'events') {
        if (context) {
          _lib.eventStack.sub('resize', this.handleUpdate, {
            target: context
          });

          _lib.eventStack.sub('scroll', this.handleUpdate, {
            target: context
          });
        }

        return;
      } // Heads up!
      // We will deal with `repaint` there


      this.handleUpdate();
    }
  }, {
    key: "unattachHandlers",
    value: function unattachHandlers(context) {
      if (context) {
        _lib.eventStack.unsub('resize', this.handleUpdate, {
          target: context
        });

        _lib.eventStack.unsub('scroll', this.handleUpdate, {
          target: context
        });
      }

      if (this.frameId) cancelAnimationFrame(this.frameId);
    } // ----------------------------------------
    // Callback handling
    // ----------------------------------------

  }, {
    key: "execute",
    value: function execute(callback, name) {
      var continuous = this.props.continuous;
      if (!callback) return; // Heads up! When `continuous` is true, callback will be fired always

      if (!continuous && (0, _includes2.default)(this.firedCallbacks, name)) return;
      callback(null, (0, _objectSpread2.default)({}, this.props, {
        calculations: this.calculations
      }));
      this.firedCallbacks.push(name);
    }
  }, {
    key: "fireOnPassed",
    value: function fireOnPassed() {
      var _this2 = this;

      var _this$calculations = this.calculations,
          percentagePassed = _this$calculations.percentagePassed,
          pixelsPassed = _this$calculations.pixelsPassed;
      var onPassed = this.props.onPassed;
      (0, _forEach2.default)(onPassed, function (callback, passed) {
        var pixelsValue = Number(passed);

        if (pixelsValue && pixelsPassed >= pixelsValue) {
          _this2.execute(callback, passed);

          return;
        }

        var matchPercentage = "".concat(passed).match(/^(\d+)%$/);
        if (!matchPercentage) return;
        var percentageValue = Number(matchPercentage[1]) / 100;
        if (percentagePassed >= percentageValue) _this2.execute(callback, passed);
      });
    }
  }, {
    key: "computeCalculations",
    // ----------------------------------------
    // Helpers
    // ----------------------------------------
    value: function computeCalculations() {
      var offset = this.props.offset;

      var _this$ref$getBounding = this.ref.getBoundingClientRect(),
          bottom = _this$ref$getBounding.bottom,
          height = _this$ref$getBounding.height,
          top = _this$ref$getBounding.top,
          width = _this$ref$getBounding.width;

      var _normalizeOffset = (0, _lib.normalizeOffset)(offset),
          _normalizeOffset2 = (0, _slicedToArray2.default)(_normalizeOffset, 2),
          topOffset = _normalizeOffset2[0],
          bottomOffset = _normalizeOffset2[1];

      var direction = window.pageYOffset > this.pageYOffset ? 'down' : 'up';
      var topPassed = top < topOffset;
      var bottomPassed = bottom < bottomOffset;
      var pixelsPassed = bottomPassed ? 0 : Math.max(top * -1, 0);
      var percentagePassed = pixelsPassed / height;
      var bottomVisible = bottom >= bottomOffset && bottom <= window.innerHeight;
      var topVisible = top >= topOffset && top <= window.innerHeight;
      var fits = topVisible && bottomVisible;
      var passing = topPassed && !bottomPassed;
      var onScreen = (topVisible || topPassed) && !bottomPassed;
      var offScreen = !onScreen;
      return {
        bottomPassed: bottomPassed,
        bottomVisible: bottomVisible,
        direction: direction,
        fits: fits,
        height: height,
        passing: passing,
        percentagePassed: percentagePassed,
        pixelsPassed: pixelsPassed,
        offScreen: offScreen,
        onScreen: onScreen,
        topPassed: topPassed,
        topVisible: topVisible,
        width: width
      };
    } // ----------------------------------------
    // Refs
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var children = this.props.children;
      var ElementType = (0, _lib.getElementType)(Visibility, this.props);
      var rest = (0, _lib.getUnhandledProps)(Visibility, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        ref: this.handleRef
      }), children);
    }
  }]);
  return Visibility;
}(_react.Component);

exports.default = Visibility;
(0, _defineProperty2.default)(Visibility, "defaultProps", {
  context: (0, _lib.isBrowser)() ? window : null,
  continuous: false,
  offset: [0, 0],
  once: true,
  updateOn: 'events'
});
(0, _defineProperty2.default)(Visibility, "handledProps", ["as", "children", "context", "continuous", "fireOnMount", "offset", "onBottomPassed", "onBottomPassedReverse", "onBottomVisible", "onBottomVisibleReverse", "onOffScreen", "onOnScreen", "onPassed", "onPassing", "onPassingReverse", "onTopPassed", "onTopPassedReverse", "onTopVisible", "onTopVisibleReverse", "onUpdate", "once", "updateOn"]);
Visibility.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Context which visibility should attach onscroll events. */
  context: _propTypes.default.object,

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous: _propTypes.default.bool,

  /** Fires callbacks immediately after mount. */
  fireOnMount: _propTypes.default.bool,

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed: _propTypes.default.func,

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse: _propTypes.default.func,

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible: _propTypes.default.func,

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse: _propTypes.default.func,

  /**
   * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
   * page.
   */
  offset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]))]),

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once: _propTypes.default.bool,

  /** Element is not visible on the screen. */
  onPassed: _propTypes.default.object,

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing: _propTypes.default.func,

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse: _propTypes.default.func,

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen: _propTypes.default.func,

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen: _propTypes.default.func,

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed: _propTypes.default.func,

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse: _propTypes.default.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible: _propTypes.default.func,

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse: _propTypes.default.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate: _propTypes.default.func,

  /**
   * Allows to choose the mode of the position calculations:
   * - `events` - (default) update and fire callbacks only on scroll/resize events
   * - `repaint` - update and fire callbacks on browser repaint (animation frames)
   */
  updateOn: _propTypes.default.oneOf(['events', 'repaint'])
} : {};