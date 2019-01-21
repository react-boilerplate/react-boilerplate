import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { eventStack, customPropTypes, getElementType, getUnhandledProps, isBrowser } from '../../lib';
/**
 * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
 */

var Sticky =
/*#__PURE__*/
function (_Component) {
  _inherits(Sticky, _Component);

  function Sticky() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Sticky);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sticky)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      sticky: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addListeners", function (props) {
      var scrollContext = props.scrollContext;

      if (scrollContext) {
        eventStack.sub('resize', _this.handleUpdate, {
          target: scrollContext
        });
        eventStack.sub('scroll', _this.handleUpdate, {
          target: scrollContext
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeListeners", function () {
      var scrollContext = _this.props.scrollContext;

      if (scrollContext) {
        eventStack.unsub('resize', _this.handleUpdate, {
          target: scrollContext
        });
        eventStack.unsub('scroll', _this.handleUpdate, {
          target: scrollContext
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function (e) {
      var pushing = _this.state.pushing;
      _this.ticking = false;

      _this.assignRects();

      if (pushing) {
        if (_this.didReachStartingPoint()) return _this.stickToContextTop(e);
        if (_this.didTouchScreenBottom()) return _this.stickToScreenBottom(e);
        return _this.stickToContextBottom(e);
      }

      if (_this.isOversized()) {
        if (_this.contextRect.top > 0) return _this.stickToContextTop(e);
        if (_this.contextRect.bottom < window.innerHeight) return _this.stickToContextBottom(e);
      }

      if (_this.didTouchScreenTop()) {
        if (_this.didReachContextBottom()) return _this.stickToContextBottom(e);
        return _this.stickToScreenTop(e);
      }

      return _this.stickToContextTop(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUpdate", function (e) {
      if (!_this.ticking) {
        _this.ticking = true;
        _this.frameId = requestAnimationFrame(function () {
          return _this.update(e);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "assignRects", function () {
      var context = _this.props.context;
      _this.triggerRect = _this.triggerRef.getBoundingClientRect();
      _this.contextRect = (context || document.body).getBoundingClientRect();
      _this.stickyRect = _this.stickyRef.getBoundingClientRect();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "didReachContextBottom", function () {
      var offset = _this.props.offset;
      return _this.stickyRect.height + offset >= _this.contextRect.bottom;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "didReachStartingPoint", function () {
      return _this.stickyRect.top <= _this.triggerRect.top;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "didTouchScreenTop", function () {
      return _this.triggerRect.top < _this.props.offset;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "didTouchScreenBottom", function () {
      var bottomOffset = _this.props.bottomOffset;
      return _this.contextRect.bottom + bottomOffset > window.innerHeight;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isOversized", function () {
      return _this.stickyRect.height > window.innerHeight;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pushing", function (pushing) {
      var possible = _this.props.pushing;
      if (possible) _this.setState({
        pushing: pushing
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stick", function (e, bound) {
      _this.setState({
        bound: bound,
        sticky: true
      });

      _invoke(_this.props, 'onStick', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unstick", function (e, bound) {
      _this.setState({
        bound: bound,
        sticky: false
      });

      _invoke(_this.props, 'onUnstick', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stickToContextBottom", function (e) {
      _invoke(_this.props, 'onBottom', e, _this.props);

      _this.stick(e, true);

      _this.pushing(true);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stickToContextTop", function (e) {
      _invoke(_this.props, 'onTop', e, _this.props);

      _this.unstick(e, false);

      _this.pushing(false);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stickToScreenBottom", function (e) {
      var bottom = _this.props.bottomOffset;

      _this.stick(e, false);

      _this.setState({
        bottom: bottom,
        top: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stickToScreenTop", function (e) {
      var top = _this.props.offset;

      _this.stick(e, false);

      _this.setState({
        top: top,
        bottom: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStickyRef", function (c) {
      return _this.stickyRef = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerRef", function (c) {
      return _this.triggerRef = c;
    });

    return _this;
  }

  _createClass(Sticky, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!isBrowser()) return;
      var active = this.props.active;

      if (active) {
        this.handleUpdate();
        this.addListeners(this.props);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          current = _this$props.active,
          currentScrollContext = _this$props.scrollContext;
      var next = nextProps.active,
          nextScrollContext = nextProps.scrollContext;

      if (current === next) {
        if (currentScrollContext !== nextScrollContext) {
          this.removeListeners();
          this.addListeners(nextProps);
        }

        return;
      }

      if (next) {
        this.handleUpdate();
        this.addListeners(nextProps);
        return;
      }

      this.removeListeners();
      this.setState({
        sticky: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!isBrowser()) return;
      var active = this.props.active;

      if (active) {
        this.removeListeners();
        cancelAnimationFrame(this.frameId);
      }
    } // ----------------------------------------
    // Events
    // ----------------------------------------

  }, {
    key: "computeStyle",
    value: function computeStyle() {
      var styleElement = this.props.styleElement;
      var _this$state = this.state,
          bottom = _this$state.bottom,
          bound = _this$state.bound,
          sticky = _this$state.sticky,
          top = _this$state.top;
      if (!sticky) return styleElement;
      return _objectSpread({
        bottom: bound ? 0 : bottom,
        top: bound ? undefined : top,
        width: this.triggerRect.width
      }, styleElement);
    } // Return true when the component reached the bottom of the context

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className;
      var _this$state2 = this.state,
          bottom = _this$state2.bottom,
          bound = _this$state2.bound,
          sticky = _this$state2.sticky;
      var rest = getUnhandledProps(Sticky, this.props);
      var ElementType = getElementType(Sticky, this.props);
      var containerClasses = cx(sticky && 'ui', sticky && 'stuck-container', sticky && (bound ? 'bound-container' : 'fixed-container'), className);
      var elementClasses = cx('ui', sticky && (bound ? 'bound bottom' : 'fixed'), sticky && !bound && (bottom === null ? 'top' : 'bottom'), 'sticky');
      return React.createElement(ElementType, _extends({}, rest, {
        className: containerClasses
      }), React.createElement("div", {
        ref: this.handleTriggerRef
      }), React.createElement("div", {
        className: cx(elementClasses),
        ref: this.handleStickyRef,
        style: this.computeStyle()
      }, children));
    }
  }]);

  return Sticky;
}(Component);

_defineProperty(Sticky, "defaultProps", {
  active: true,
  bottomOffset: 0,
  offset: 0,
  scrollContext: isBrowser() ? window : null
});

_defineProperty(Sticky, "handledProps", ["active", "as", "bottomOffset", "children", "className", "context", "offset", "onBottom", "onStick", "onTop", "onUnstick", "pushing", "scrollContext", "styleElement"]);

export { Sticky as default };
Sticky.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A Sticky can be active. */
  active: PropTypes.bool,

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset: PropTypes.number,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Context which sticky element should stick to. */
  context: PropTypes.object,

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset: PropTypes.number,

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom: PropTypes.func,

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick: PropTypes.func,

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop: PropTypes.func,

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick: PropTypes.func,

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing: PropTypes.bool,

  /** Context which sticky should attach onscroll events. */
  scrollContext: PropTypes.object,

  /** Custom style for sticky element. */
  styleElement: PropTypes.object
} : {};