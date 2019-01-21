import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _includes from "lodash/includes";
import _get from "lodash/get";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import { cloneElement, Component } from 'react';
import { normalizeTransitionDuration, SUI, useKeyOnly } from '../../lib';
import TransitionGroup from './TransitionGroup';
var TRANSITION_TYPE = {
  ENTERING: 'show',
  EXITING: 'hide'
  /**
   * A transition is an animation usually used to move content in or out of view.
   */

};

var Transition =
/*#__PURE__*/
function (_Component) {
  _inherits(Transition, _Component);

  function Transition() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Transition);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Transition)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStart", function () {
      var duration = _this.props.duration;
      var status = _this.nextStatus;
      _this.nextStatus = null;

      _this.setSafeState({
        status: status,
        animating: true
      }, function () {
        var durationType = TRANSITION_TYPE[status];
        var durationValue = normalizeTransitionDuration(duration, durationType);

        _invoke(_this.props, 'onStart', null, _objectSpread({}, _this.props, {
          status: status
        }));

        setTimeout(_this.handleComplete, durationValue);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleComplete", function () {
      var current = _this.state.status;

      _invoke(_this.props, 'onComplete', null, _objectSpread({}, _this.props, {
        status: current
      }));

      if (_this.nextStatus) {
        _this.handleStart();

        return;
      }

      var status = _this.computeCompletedStatus();

      var callback = current === Transition.ENTERING ? 'onShow' : 'onHide';

      _this.setSafeState({
        status: status,
        animating: false
      }, function () {
        _invoke(_this.props, callback, null, _objectSpread({}, _this.props, {
          status: status
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateStatus", function () {
      var animating = _this.state.animating;

      if (_this.nextStatus) {
        _this.nextStatus = _this.computeNextStatus();
        if (!animating) _this.handleStart();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeClasses", function () {
      var _this$props = _this.props,
          animation = _this$props.animation,
          children = _this$props.children;
      var _this$state = _this.state,
          animating = _this$state.animating,
          status = _this$state.status;

      var childClasses = _get(children, 'props.className');

      var directional = _includes(SUI.DIRECTIONAL_TRANSITIONS, animation);

      if (directional) {
        return cx(animation, childClasses, useKeyOnly(animating, 'animating'), useKeyOnly(status === Transition.ENTERING, 'in'), useKeyOnly(status === Transition.EXITING, 'out'), useKeyOnly(status === Transition.EXITED, 'hidden'), useKeyOnly(status !== Transition.EXITED, 'visible'), 'transition');
      }

      return cx(animation, childClasses, useKeyOnly(animating, 'animating transition'));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeCompletedStatus", function () {
      var unmountOnHide = _this.props.unmountOnHide;
      var status = _this.state.status;
      if (status === Transition.ENTERING) return Transition.ENTERED;
      return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeInitialStatuses", function () {
      var _this$props2 = _this.props,
          visible = _this$props2.visible,
          mountOnShow = _this$props2.mountOnShow,
          transitionOnMount = _this$props2.transitionOnMount,
          unmountOnHide = _this$props2.unmountOnHide;

      if (visible) {
        if (transitionOnMount) {
          return {
            initial: Transition.EXITED,
            next: Transition.ENTERING
          };
        }

        return {
          initial: Transition.ENTERED
        };
      }

      if (mountOnShow || unmountOnHide) return {
        initial: Transition.UNMOUNTED
      };
      return {
        initial: Transition.EXITED
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeNextStatus", function () {
      var _this$state2 = _this.state,
          animating = _this$state2.animating,
          status = _this$state2.status;
      if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING;
      return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeStatuses", function (props) {
      var status = _this.state.status;
      var visible = props.visible;

      if (visible) {
        return {
          current: status === Transition.UNMOUNTED && Transition.EXITED,
          next: status !== Transition.ENTERING && status !== Transition.ENTERED && Transition.ENTERING
        };
      }

      return {
        next: (status === Transition.ENTERING || status === Transition.ENTERED) && Transition.EXITING
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeStyle", function () {
      var _this$props3 = _this.props,
          children = _this$props3.children,
          duration = _this$props3.duration;
      var status = _this.state.status;

      var childStyle = _get(children, 'props.style');

      var type = TRANSITION_TYPE[status];
      var animationDuration = type && "".concat(normalizeTransitionDuration(duration, type), "ms");
      return _objectSpread({}, childStyle, {
        animationDuration: animationDuration
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSafeState", function () {
      var _this2;

      return _this.mounted && (_this2 = _this).setState.apply(_this2, arguments);
    });

    var _this$computeInitialS = _this.computeInitialStatuses(),
        _status = _this$computeInitialS.initial,
        next = _this$computeInitialS.next;

    _this.nextStatus = next;
    _this.state = {
      status: _status
    };
    return _this;
  } // ----------------------------------------
  // Lifecycle
  // ----------------------------------------


  _createClass(Transition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.updateStatus();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$computeStatuses = this.computeStatuses(nextProps),
          status = _this$computeStatuses.current,
          next = _this$computeStatuses.next;

      this.nextStatus = next;
      if (status) this.setSafeState({
        status: status
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateStatus();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    } // ----------------------------------------
    // Callback handling
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var children = this.props.children;
      var status = this.state.status;
      if (status === Transition.UNMOUNTED) return null;
      return cloneElement(children, {
        className: this.computeClasses(),
        style: this.computeStyle()
      });
    }
  }]);

  return Transition;
}(Component);

_defineProperty(Transition, "defaultProps", {
  animation: 'fade',
  duration: 500,
  visible: true,
  mountOnShow: true,
  transitionOnMount: false,
  unmountOnHide: false
});

_defineProperty(Transition, "ENTERED", 'ENTERED');

_defineProperty(Transition, "ENTERING", 'ENTERING');

_defineProperty(Transition, "EXITED", 'EXITED');

_defineProperty(Transition, "EXITING", 'EXITING');

_defineProperty(Transition, "UNMOUNTED", 'UNMOUNTED');

_defineProperty(Transition, "Group", TransitionGroup);

_defineProperty(Transition, "handledProps", ["animation", "children", "duration", "mountOnShow", "onComplete", "onHide", "onShow", "onStart", "reactKey", "transitionOnMount", "unmountOnHide", "visible"]);

export { Transition as default };
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Named animation event to used. Must be defined in CSS. */
  animation: PropTypes.oneOf(SUI.TRANSITIONS),

  /** Primary content. */
  children: PropTypes.element.isRequired,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    hide: PropTypes.number,
    show: PropTypes.number
  }), PropTypes.string]),

  /** Show the component; triggers the enter or exit animation. */
  visible: PropTypes.bool,

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow: PropTypes.bool,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow: PropTypes.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart: PropTypes.func,

  /** React's key of the element. */
  reactKey: PropTypes.string,

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount: PropTypes.bool,

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide: PropTypes.bool
} : {};