import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _pick from "lodash/pick";
import _reduce from "lodash/reduce";
import _assign from "lodash/assign";
import _invoke from "lodash/invoke";
import _isArray from "lodash/isArray";
import _mapValues from "lodash/mapValues";
import _isNumber from "lodash/isNumber";
import _includes from "lodash/includes";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { eventStack, childrenUtils, customPropTypes, getElementType, getUnhandledProps, isBrowser, SUI, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Portal from '../../addons/Portal';
import PopupContent from './PopupContent';
import PopupHeader from './PopupHeader';
export var POSITIONS = ['top left', 'top right', 'bottom right', 'bottom left', 'right center', 'left center', 'top center', 'bottom center'];
/**
 * A Popup displays additional information on top of a page.
 */

var Popup =
/*#__PURE__*/
function (_Component) {
  _inherits(Popup, _Component);

  function Popup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideOnScroll", function (e) {
      _this.setState({
        closed: true
      });

      eventStack.unsub('scroll', _this.hideOnScroll, {
        target: window
      });
      _this.timeoutId = setTimeout(function () {
        _this.setState({
          closed: false
        });
      }, 50);

      _this.handleClose(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function (e) {
      _invoke(_this.props, 'onClose', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function (e) {
      _this.coords = _this.getContext().getBoundingClientRect();

      _invoke(_this.props, 'onOpen', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalMount", function (e) {
      var hideOnScroll = _this.props.hideOnScroll;
      if (hideOnScroll) eventStack.sub('scroll', _this.hideOnScroll, {
        target: window
      });

      if (_this.getContext()) {
        _this.setPopupStyle(_this.props.position);
      }

      _invoke(_this.props, 'onMount', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalUnmount", function (e) {
      var hideOnScroll = _this.props.hideOnScroll;
      if (hideOnScroll) eventStack.unsub('scroll', _this.hideOnScroll, {
        target: window
      });

      _invoke(_this.props, 'onUnmount', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePopupRef", function (popupRef) {
      _this.popupCoords = popupRef ? popupRef.getBoundingClientRect() : null;

      _this.setPopupStyle();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerRef", function (triggerRef) {
      _this.triggerRef = triggerRef;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getContext", function () {
      return _this.props.context || _this.triggerRef;
    });

    return _this;
  }

  _createClass(Popup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // if horizontal/vertical offsets change, re-calculate the CSS style
      var _this$props = this.props,
          horizontalOffset = _this$props.horizontalOffset,
          verticalOffset = _this$props.verticalOffset;

      if (horizontalOffset !== prevProps.horizontalOffset || verticalOffset !== prevProps.verticalOffset) {
        this.setPopupStyle();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }
  }, {
    key: "computePopupStyle",
    value: function computePopupStyle(positions) {
      var style = {
        position: 'absolute'
      };
      var context = this.getContext(); // Do not access window/document when server side rendering

      if (!isBrowser()) return style;
      var _this$props2 = this.props,
          horizontalOffset = _this$props2.horizontalOffset,
          verticalOffset = _this$props2.verticalOffset;
      var _window = window,
          pageYOffset = _window.pageYOffset,
          pageXOffset = _window.pageXOffset;
      var _document$documentEle = document.documentElement,
          clientWidth = _document$documentEle.clientWidth,
          clientHeight = _document$documentEle.clientHeight;
      var coords = this.coords || context.getBoundingClientRect();

      if (_includes(positions, 'right')) {
        style.right = Math.round(clientWidth - (coords.right + pageXOffset));
        style.left = 'auto';
      } else if (_includes(positions, 'left')) {
        style.left = Math.round(coords.left + pageXOffset);
        style.right = 'auto';
      } else {
        // if not left nor right, we are horizontally centering the element
        var xOffset = (coords.width - this.popupCoords.width) / 2;
        style.left = Math.round(coords.left + xOffset + pageXOffset);
        style.right = 'auto';
      }

      if (_includes(positions, 'top')) {
        style.bottom = Math.round(clientHeight - (coords.top + pageYOffset));
        style.top = 'auto';
      } else if (_includes(positions, 'bottom')) {
        style.top = Math.round(coords.bottom + pageYOffset);
        style.bottom = 'auto';
      } else {
        // if not top nor bottom, we are vertically centering the element
        var yOffset = (coords.height + this.popupCoords.height) / 2;
        style.top = Math.round(coords.bottom + pageYOffset - yOffset);
        style.bottom = 'auto';

        var _xOffset = this.popupCoords.width + 8;

        if (_includes(positions, 'right')) {
          style.right -= _xOffset;
        } else {
          style.left -= _xOffset;
        }
      }

      if (horizontalOffset) {
        if (_isNumber(style.right)) {
          style.right -= horizontalOffset;
        } else {
          style.left -= horizontalOffset;
        }
      }

      if (verticalOffset) {
        if (_isNumber(style.top)) {
          style.top += verticalOffset;
        } else {
          style.bottom += verticalOffset;
        }
      }

      return style;
    } // check if the style would display
    // the popup outside of the view port

  }, {
    key: "isStyleInViewport",
    value: function isStyleInViewport(style) {
      var _window2 = window,
          pageYOffset = _window2.pageYOffset,
          pageXOffset = _window2.pageXOffset;
      var _document$documentEle2 = document.documentElement,
          clientWidth = _document$documentEle2.clientWidth,
          clientHeight = _document$documentEle2.clientHeight;
      var element = {
        top: style.top,
        left: style.left,
        width: this.popupCoords.width,
        height: this.popupCoords.height
      };

      if (_isNumber(style.right)) {
        element.left = clientWidth - style.right - element.width;
      }

      if (_isNumber(style.bottom)) {
        element.top = clientHeight - style.bottom - element.height;
      } // hidden on top


      if (element.top < pageYOffset) return false; // hidden on the bottom

      if (element.top + element.height > pageYOffset + clientHeight) return false; // hidden the left

      if (element.left < pageXOffset) return false; // hidden on the right

      if (element.left + element.width > pageXOffset + clientWidth) return false;
      return true;
    }
  }, {
    key: "setPopupStyle",
    value: function setPopupStyle() {
      var context = this.getContext();
      if (!this.coords && !context || !this.popupCoords) return;
      var position = this.props.position;
      var style = this.computePopupStyle(position);
      var keepInViewPort = this.props.keepInViewPort;

      if (keepInViewPort) {
        // Lets detect if the popup is out of the viewport and adjust
        // the position accordingly
        var positions = _without(POSITIONS, position).concat([position]);

        for (var i = 0; !this.isStyleInViewport(style) && i < positions.length; i += 1) {
          style = this.computePopupStyle(positions[i]);
          position = positions[i];
        }
      } // Append 'px' to every numerical values in the style


      style = _mapValues(style, function (value) {
        return _isNumber(value) ? "".concat(value, "px") : value;
      });
      this.setState({
        style: style,
        position: position
      });
    }
  }, {
    key: "getPortalProps",
    value: function getPortalProps() {
      var portalProps = {};
      var _this$props3 = this.props,
          on = _this$props3.on,
          hoverable = _this$props3.hoverable;
      var normalizedOn = _isArray(on) ? on : [on];

      if (hoverable) {
        portalProps.closeOnPortalMouseLeave = true;
        portalProps.mouseLeaveDelay = 300;
      }

      if (_includes(normalizedOn, 'click')) {
        portalProps.openOnTriggerClick = true;
        portalProps.closeOnTriggerClick = true;
        portalProps.closeOnDocumentClick = true;
      }

      if (_includes(normalizedOn, 'focus')) {
        portalProps.openOnTriggerFocus = true;
        portalProps.closeOnTriggerBlur = true;
      }

      if (_includes(normalizedOn, 'hover')) {
        portalProps.openOnTriggerMouseEnter = true;
        portalProps.closeOnTriggerMouseLeave = true; // Taken from SUI: https://git.io/vPmCm

        portalProps.mouseLeaveDelay = 70;
        portalProps.mouseEnterDelay = 50;
      }

      return portalProps;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          basic = _this$props4.basic,
          children = _this$props4.children,
          className = _this$props4.className,
          content = _this$props4.content,
          flowing = _this$props4.flowing,
          header = _this$props4.header,
          inverted = _this$props4.inverted,
          size = _this$props4.size,
          trigger = _this$props4.trigger,
          wide = _this$props4.wide;
      var _this$state = this.state,
          position = _this$state.position,
          closed = _this$state.closed;

      var style = _assign({}, this.state.style, this.props.style);

      var classes = cx('ui', position, size, useKeyOrValueAndKey(wide, 'wide'), useKeyOnly(basic, 'basic'), useKeyOnly(flowing, 'flowing'), useKeyOnly(inverted, 'inverted'), 'popup transition visible', className);
      if (closed) return trigger;
      var unhandled = getUnhandledProps(Popup, this.props);
      var portalPropNames = Portal.handledProps;

      var rest = _reduce(unhandled, function (acc, val, key) {
        if (!_includes(portalPropNames, key)) acc[key] = val;
        return acc;
      }, {});

      var portalProps = _pick(unhandled, portalPropNames);

      var ElementType = getElementType(Popup, this.props);
      var popupJSX = React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        style: style,
        ref: this.handlePopupRef
      }), children, childrenUtils.isNil(children) && PopupHeader.create(header, {
        autoGenerateKey: false
      }), childrenUtils.isNil(children) && PopupContent.create(content, {
        autoGenerateKey: false
      }));

      var mergedPortalProps = _objectSpread({}, this.getPortalProps(), portalProps);

      return React.createElement(Portal, _extends({}, mergedPortalProps, {
        onClose: this.handleClose,
        onMount: this.handlePortalMount,
        onOpen: this.handleOpen,
        onUnmount: this.handlePortalUnmount,
        trigger: trigger,
        triggerRef: this.handleTriggerRef
      }), popupJSX);
    }
  }]);

  return Popup;
}(Component);

_defineProperty(Popup, "defaultProps", {
  position: 'top left',
  on: 'hover',
  keepInViewPort: true
});

_defineProperty(Popup, "Content", PopupContent);

_defineProperty(Popup, "Header", PopupHeader);

_defineProperty(Popup, "handledProps", ["as", "basic", "children", "className", "content", "context", "flowing", "header", "hideOnScroll", "horizontalOffset", "hoverable", "inverted", "keepInViewPort", "on", "onClose", "onMount", "onOpen", "onUnmount", "position", "size", "style", "trigger", "verticalOffset", "wide"]);

export { Popup as default };
Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Display the popup without the pointing arrow. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Simple text content for the popover. */
  content: customPropTypes.itemShorthand,

  /** Existing element the pop-up should be bound to. */
  context: PropTypes.object,

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing: PropTypes.bool,

  /** Takes up the entire width of its offset container. */
  // TODO: implement the Popup fluid layout
  // fluid: PropTypes.bool,

  /** Header displayed above the content in bold. */
  header: customPropTypes.itemShorthand,

  /** Hide the Popup when scrolling the window. */
  hideOnScroll: PropTypes.bool,

  /** Whether the popup should not close on hover. */
  hoverable: PropTypes.bool,

  /** Invert the colors of the Popup. */
  inverted: PropTypes.bool,

  /** Horizontal offset in pixels to be applied to the Popup. */
  horizontalOffset: PropTypes.number,

  /** Vertical offset in pixels to be applied to the Popup. */
  verticalOffset: PropTypes.number,

  /** Events triggering the popup. */
  on: PropTypes.oneOfType([PropTypes.oneOf(['hover', 'click', 'focus']), PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus']))]),

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Position for the popover. */
  position: PropTypes.oneOf(POSITIONS),

  /** Popup size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big', 'massive')),

  /** Custom Popup style. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the popup is defined. */
  trigger: PropTypes.node,

  /** Popup width. */
  wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** Element to be rendered within the confines of the viewport whenever possible. */
  keepInViewPort: PropTypes.bool
} : {};