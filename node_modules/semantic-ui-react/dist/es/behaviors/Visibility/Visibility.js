import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import _forEach from "lodash/forEach";
import _without from "lodash/without";
import _includes from "lodash/includes";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { eventStack, customPropTypes, getElementType, getUnhandledProps, normalizeOffset, isBrowser } from '../../lib';
/**
 * Visibility provides a set of callbacks for when a content appears in the viewport.
 */

var Visibility =
/*#__PURE__*/
function (_Component) {
  _inherits(Visibility, _Component);

  function Visibility() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Visibility);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Visibility)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calculations", {
      bottomPassed: false,
      bottomVisible: false,
      fits: false,
      passing: false,
      offScreen: false,
      onScreen: false,
      topPassed: false,
      topVisible: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "firedCallbacks", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fire", function (_ref, value) {
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

      if (!once) _this.firedCallbacks = _without(_this.firedCallbacks, name);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUpdate", function () {
      if (_this.ticking) return;
      _this.ticking = true;
      _this.frameId = requestAnimationFrame(_this.update);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function () {
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

      _invoke(_this.props, 'onUpdate', null, _objectSpread({}, _this.props, {
        calculations: _this.calculations
      }));

      _this.fireOnPassed(); // Heads up! Reverse callbacks should be fired first


      _forEach(reverse, function (data, value) {
        return _this.fire(data, value, true);
      });

      _forEach(forward, function (data, value) {
        return _this.fire(data, value);
      });

      if (updateOn === 'repaint') _this.handleUpdate();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    return _this;
  }

  _createClass(Visibility, [{
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
      if (!isBrowser()) return;
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
          eventStack.sub('resize', this.handleUpdate, {
            target: context
          });
          eventStack.sub('scroll', this.handleUpdate, {
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
        eventStack.unsub('resize', this.handleUpdate, {
          target: context
        });
        eventStack.unsub('scroll', this.handleUpdate, {
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

      if (!continuous && _includes(this.firedCallbacks, name)) return;
      callback(null, _objectSpread({}, this.props, {
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

      _forEach(onPassed, function (callback, passed) {
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

      var _normalizeOffset = normalizeOffset(offset),
          _normalizeOffset2 = _slicedToArray(_normalizeOffset, 2),
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
      var ElementType = getElementType(Visibility, this.props);
      var rest = getUnhandledProps(Visibility, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        ref: this.handleRef
      }), children);
    }
  }]);

  return Visibility;
}(Component);

_defineProperty(Visibility, "defaultProps", {
  context: isBrowser() ? window : null,
  continuous: false,
  offset: [0, 0],
  once: true,
  updateOn: 'events'
});

_defineProperty(Visibility, "handledProps", ["as", "children", "context", "continuous", "fireOnMount", "offset", "onBottomPassed", "onBottomPassedReverse", "onBottomVisible", "onBottomVisibleReverse", "onOffScreen", "onOnScreen", "onPassed", "onPassing", "onPassingReverse", "onTopPassed", "onTopPassedReverse", "onTopVisible", "onTopVisibleReverse", "onUpdate", "once", "updateOn"]);

export { Visibility as default };
Visibility.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Context which visibility should attach onscroll events. */
  context: PropTypes.object,

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous: PropTypes.bool,

  /** Fires callbacks immediately after mount. */
  fireOnMount: PropTypes.bool,

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed: PropTypes.func,

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse: PropTypes.func,

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible: PropTypes.func,

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse: PropTypes.func,

  /**
   * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
   * page.
   */
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))]),

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once: PropTypes.bool,

  /** Element is not visible on the screen. */
  onPassed: PropTypes.object,

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing: PropTypes.func,

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse: PropTypes.func,

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen: PropTypes.func,

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen: PropTypes.func,

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed: PropTypes.func,

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse: PropTypes.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible: PropTypes.func,

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse: PropTypes.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate: PropTypes.func,

  /**
   * Allows to choose the mode of the position calculations:
   * - `events` - (default) update and fire callbacks only on scroll/resize events
   * - `repaint` - update and fire callbacks on browser repaint (animation frames)
   */
  updateOn: PropTypes.oneOf(['events', 'repaint'])
} : {};