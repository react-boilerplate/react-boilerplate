"use strict";

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

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _lib = require("../../lib");

var _TransitionGroup = _interopRequireDefault(require("./TransitionGroup"));

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
  (0, _inherits2.default)(Transition, _Component);

  function Transition() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Transition);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Transition)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleStart", function () {
      var duration = _this.props.duration;
      var status = _this.nextStatus;
      _this.nextStatus = null;

      _this.setState({
        status: status,
        animating: true
      }, function () {
        var durationType = TRANSITION_TYPE[status];
        var durationValue = (0, _lib.normalizeTransitionDuration)(duration, durationType);
        (0, _invoke2.default)(_this.props, 'onStart', null, (0, _objectSpread2.default)({}, _this.props, {
          status: status
        }));
        _this.timeoutId = setTimeout(_this.handleComplete, durationValue);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleComplete", function () {
      var current = _this.state.status;
      (0, _invoke2.default)(_this.props, 'onComplete', null, (0, _objectSpread2.default)({}, _this.props, {
        status: current
      }));

      if (_this.nextStatus) {
        _this.handleStart();

        return;
      }

      var status = _this.computeCompletedStatus();

      var callback = current === Transition.ENTERING ? 'onShow' : 'onHide';

      _this.setState({
        status: status,
        animating: false
      }, function () {
        (0, _invoke2.default)(_this.props, callback, null, (0, _objectSpread2.default)({}, _this.props, {
          status: status
        }));
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateStatus", function () {
      var animating = _this.state.animating;

      if (_this.nextStatus) {
        _this.nextStatus = _this.computeNextStatus();
        if (!animating) _this.handleStart();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeClasses", function () {
      var _this$props = _this.props,
          animation = _this$props.animation,
          children = _this$props.children;
      var _this$state = _this.state,
          animating = _this$state.animating,
          status = _this$state.status;
      var childClasses = (0, _get2.default)(children, 'props.className');
      var directional = (0, _includes2.default)(_lib.SUI.DIRECTIONAL_TRANSITIONS, animation);

      if (directional) {
        return (0, _classnames.default)(animation, childClasses, (0, _lib.useKeyOnly)(animating, 'animating'), (0, _lib.useKeyOnly)(status === Transition.ENTERING, 'in'), (0, _lib.useKeyOnly)(status === Transition.EXITING, 'out'), (0, _lib.useKeyOnly)(status === Transition.EXITED, 'hidden'), (0, _lib.useKeyOnly)(status !== Transition.EXITED, 'visible'), 'transition');
      }

      return (0, _classnames.default)(animation, childClasses, (0, _lib.useKeyOnly)(animating, 'animating transition'));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeCompletedStatus", function () {
      var unmountOnHide = _this.props.unmountOnHide;
      var status = _this.state.status;
      if (status === Transition.ENTERING) return Transition.ENTERED;
      return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeInitialStatuses", function () {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeNextStatus", function () {
      var _this$state2 = _this.state,
          animating = _this$state2.animating,
          status = _this$state2.status;
      if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING;
      return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeStatuses", function (props) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeStyle", function () {
      var _this$props3 = _this.props,
          children = _this$props3.children,
          duration = _this$props3.duration;
      var status = _this.state.status;
      var childStyle = (0, _get2.default)(children, 'props.style');
      var type = TRANSITION_TYPE[status];
      var animationDuration = type && "".concat((0, _lib.normalizeTransitionDuration)(duration, type), "ms");
      return (0, _objectSpread2.default)({}, childStyle, {
        animationDuration: animationDuration
      });
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


  (0, _createClass2.default)(Transition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateStatus();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$computeStatuses = this.computeStatuses(nextProps),
          status = _this$computeStatuses.current,
          next = _this$computeStatuses.next;

      this.nextStatus = next;
      if (status) this.setState({
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
      clearTimeout(this.timeoutId);
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
      return (0, _react.cloneElement)(children, {
        className: this.computeClasses(),
        style: this.computeStyle()
      });
    }
  }]);
  return Transition;
}(_react.Component);

exports.default = Transition;
(0, _defineProperty2.default)(Transition, "defaultProps", {
  animation: 'fade',
  duration: 500,
  visible: true,
  mountOnShow: true,
  transitionOnMount: false,
  unmountOnHide: false
});
(0, _defineProperty2.default)(Transition, "ENTERED", 'ENTERED');
(0, _defineProperty2.default)(Transition, "ENTERING", 'ENTERING');
(0, _defineProperty2.default)(Transition, "EXITED", 'EXITED');
(0, _defineProperty2.default)(Transition, "EXITING", 'EXITING');
(0, _defineProperty2.default)(Transition, "UNMOUNTED", 'UNMOUNTED');
(0, _defineProperty2.default)(Transition, "Group", _TransitionGroup.default);
(0, _defineProperty2.default)(Transition, "handledProps", ["animation", "children", "duration", "mountOnShow", "onComplete", "onHide", "onShow", "onStart", "reactKey", "transitionOnMount", "unmountOnHide", "visible"]);
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Named animation event to used. Must be defined in CSS. */
  animation: _propTypes.default.oneOf(_lib.SUI.TRANSITIONS),

  /** Primary content. */
  children: _propTypes.default.element.isRequired,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    hide: _propTypes.default.number,
    show: _propTypes.default.number
  }), _propTypes.default.string]),

  /** Show the component; triggers the enter or exit animation. */
  visible: _propTypes.default.bool,

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow: _propTypes.default.bool,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete: _propTypes.default.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide: _propTypes.default.func,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow: _propTypes.default.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart: _propTypes.default.func,

  /** React's key of the element. */
  reactKey: _propTypes.default.string,

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount: _propTypes.default.bool,

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide: _propTypes.default.bool
} : {};