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
import EventStack from '@semantic-ui-react/event-stack';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Ref from '../../addons/Ref';
import { childrenUtils, customPropTypes, doesNodeContainClick, getUnhandledProps, getElementType, useKeyOnly } from '../../lib';
import SidebarPushable from './SidebarPushable';
import SidebarPusher from './SidebarPusher';
/**
 * A sidebar hides additional content beside a page.
 */

var Sidebar =
/*#__PURE__*/
function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Sidebar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sidebar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAnimationStart", function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          visible = _this$props.visible;
      var callback = visible ? 'onVisible' : 'onHide';

      _this.setState({
        animating: true
      }, function () {
        clearTimeout(_this.animationTimer);
        _this.animationTimer = setTimeout(_this.handleAnimationEnd, duration);

        if (_this.skipNextCallback) {
          _this.skipNextCallback = false;
          return;
        }

        _invoke(_this.props, callback, null, _this.props);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAnimationEnd", function () {
      var visible = _this.props.visible;
      var callback = visible ? 'onShow' : 'onHidden';

      _this.setState({
        animating: false
      });

      _invoke(_this.props, callback, null, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentClick", function (e) {
      if (!doesNodeContainClick(_this.ref, e)) {
        _this.skipNextCallback = true;

        _invoke(_this.props, 'onHide', e, _objectSpread({}, _this.props, {
          visible: false
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    return _this;
  }

  _createClass(Sidebar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevVisible = prevProps.visible;
      var currentVisible = this.props.visible;
      if (prevVisible !== currentVisible) this.handleAnimationStart();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.animationTimer);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          animation = _this$props2.animation,
          className = _this$props2.className,
          children = _this$props2.children,
          content = _this$props2.content,
          direction = _this$props2.direction,
          target = _this$props2.target,
          visible = _this$props2.visible,
          width = _this$props2.width;
      var animating = this.state.animating;
      var classes = cx('ui', animation, direction, width, useKeyOnly(animating, 'animating'), useKeyOnly(visible, 'visible'), 'sidebar', className);
      var rest = getUnhandledProps(Sidebar, this.props);
      var ElementType = getElementType(Sidebar, this.props);
      return React.createElement(Ref, {
        innerRef: this.handleRef
      }, React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), childrenUtils.isNil(children) ? content : children, visible && React.createElement(EventStack, {
        name: "click",
        on: this.handleDocumentClick,
        target: target
      })));
    }
  }]);

  return Sidebar;
}(Component);

_defineProperty(Sidebar, "defaultProps", {
  direction: 'left',
  duration: 500
});

_defineProperty(Sidebar, "autoControlledProps", ['visible']);

_defineProperty(Sidebar, "Pushable", SidebarPushable);

_defineProperty(Sidebar, "Pusher", SidebarPusher);

_defineProperty(Sidebar, "handledProps", ["animation", "as", "children", "className", "content", "direction", "duration", "onHidden", "onHide", "onShow", "onVisible", "target", "visible", "width"]);

Sidebar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Animation style. */
  animation: PropTypes.oneOf(['overlay', 'push', 'scale down', 'uncover', 'slide out', 'slide along']),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Direction the sidebar should appear on. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /** Duration of sidebar animation. */
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide: PropTypes.func,

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden: PropTypes.func,

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow: PropTypes.func,

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible: PropTypes.func,

  /** A sidebar can handle clicks on the passed element. */
  target: PropTypes.object,

  /** Controls whether or not the sidebar is visible on the page. */
  visible: PropTypes.bool,

  /** Sidebar width. */
  width: PropTypes.oneOf(['very thin', 'thin', 'wide', 'very wide'])
} : {};
export default Sidebar;