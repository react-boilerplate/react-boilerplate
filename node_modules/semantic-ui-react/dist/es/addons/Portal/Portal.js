import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { AutoControlledComponent as Component, doesNodeContainClick, eventStack } from '../../lib';
import Ref from '../Ref';
import PortalInner from './PortalInner';

/**
 * A component that allows you to render children outside their parent.
 * @see Modal
 * @see Popup
 * @see Dimmer
 * @see Confirm
 */
var Portal =
/*#__PURE__*/
function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentClick", function (e) {
      var closeOnDocumentClick = _this.props.closeOnDocumentClick;

      if (!_this.portalNode || // no portal
      doesNodeContainClick(_this.triggerNode, e) || // event happened in trigger (delegate to trigger handlers)
      doesNodeContainClick(_this.portalNode, e) // event happened in the portal
      ) {
          return;
        } // ignore the click


      if (closeOnDocumentClick) {
        _this.close(e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEscape", function (e) {
      if (!_this.props.closeOnEscape) return;
      if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;

      _this.close(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalMouseLeave", function (e) {
      var _this$props = _this.props,
          closeOnPortalMouseLeave = _this$props.closeOnPortalMouseLeave,
          mouseLeaveDelay = _this$props.mouseLeaveDelay;
      if (!closeOnPortalMouseLeave) return;
      _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalMouseEnter", function () {
      // In order to enable mousing from the trigger to the portal, we need to
      // clear the mouseleave timer that was set when leaving the trigger.
      var closeOnPortalMouseLeave = _this.props.closeOnPortalMouseLeave;
      if (!closeOnPortalMouseLeave) return;
      clearTimeout(_this.mouseLeaveTimer);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerBlur", function (e) {
      var _this$props2 = _this.props,
          trigger = _this$props2.trigger,
          closeOnTriggerBlur = _this$props2.closeOnTriggerBlur; // Call original event handler

      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      _invoke.apply(void 0, [trigger, 'props.onBlur', e].concat(rest)); // do not close if focus is given to the portal


      var didFocusPortal = _invoke(_assertThisInitialized(_assertThisInitialized(_this)), 'portalNode.contains', e.relatedTarget);

      if (!closeOnTriggerBlur || didFocusPortal) return;

      _this.close(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerClick", function (e) {
      var _this$props3 = _this.props,
          trigger = _this$props3.trigger,
          closeOnTriggerClick = _this$props3.closeOnTriggerClick,
          openOnTriggerClick = _this$props3.openOnTriggerClick;
      var open = _this.state.open; // Call original event handler

      for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3];
      }

      _invoke.apply(void 0, [trigger, 'props.onClick', e].concat(rest));

      if (open && closeOnTriggerClick) {
        _this.close(e);
      } else if (!open && openOnTriggerClick) {
        _this.open(e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerFocus", function (e) {
      var _this$props4 = _this.props,
          trigger = _this$props4.trigger,
          openOnTriggerFocus = _this$props4.openOnTriggerFocus; // Call original event handler

      for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4];
      }

      _invoke.apply(void 0, [trigger, 'props.onFocus', e].concat(rest));

      if (!openOnTriggerFocus) return;

      _this.open(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerMouseLeave", function (e) {
      clearTimeout(_this.mouseEnterTimer);
      var _this$props5 = _this.props,
          trigger = _this$props5.trigger,
          closeOnTriggerMouseLeave = _this$props5.closeOnTriggerMouseLeave,
          mouseLeaveDelay = _this$props5.mouseLeaveDelay; // Call original event handler

      for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        rest[_key5 - 1] = arguments[_key5];
      }

      _invoke.apply(void 0, [trigger, 'props.onMouseLeave', e].concat(rest));

      if (!closeOnTriggerMouseLeave) return;
      _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerMouseEnter", function (e) {
      clearTimeout(_this.mouseLeaveTimer);
      var _this$props6 = _this.props,
          trigger = _this$props6.trigger,
          mouseEnterDelay = _this$props6.mouseEnterDelay,
          openOnTriggerMouseEnter = _this$props6.openOnTriggerMouseEnter; // Call original event handler

      for (var _len6 = arguments.length, rest = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        rest[_key6 - 1] = arguments[_key6];
      }

      _invoke.apply(void 0, [trigger, 'props.onMouseEnter', e].concat(rest));

      if (!openOnTriggerMouseEnter) return;
      _this.mouseEnterTimer = _this.openWithTimeout(e, mouseEnterDelay);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "open", function (e) {
      var onOpen = _this.props.onOpen;
      if (onOpen) onOpen(e, _this.props);

      _this.trySetState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openWithTimeout", function (e, delay) {
      // React wipes the entire event object and suggests using e.persist() if
      // you need the event for async access. However, even with e.persist
      // certain required props (e.g. currentTarget) are null so we're forced to clone.
      var eventClone = _objectSpread({}, e);

      return setTimeout(function () {
        return _this.open(eventClone);
      }, delay || 0);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function (e) {
      var onClose = _this.props.onClose;
      if (onClose) onClose(e, _this.props);

      _this.trySetState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeWithTimeout", function (e, delay) {
      // React wipes the entire event object and suggests using e.persist() if
      // you need the event for async access. However, even with e.persist
      // certain required props (e.g. currentTarget) are null so we're forced to clone.
      var eventClone = _objectSpread({}, e);

      return setTimeout(function () {
        return _this.close(eventClone);
      }, delay || 0);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (e, _ref) {
      var target = _ref.node;
      var eventPool = _this.props.eventPool;
      _this.portalNode = target;
      eventStack.sub('mouseleave', _this.handlePortalMouseLeave, {
        pool: eventPool,
        target: target
      });
      eventStack.sub('mouseenter', _this.handlePortalMouseEnter, {
        pool: eventPool,
        target: target
      });
      eventStack.sub('click', _this.handleDocumentClick, {
        pool: eventPool
      });
      eventStack.sub('keydown', _this.handleEscape, {
        pool: eventPool
      });

      _invoke(_this.props, 'onMount', null, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUnmount", function (e, _ref2) {
      var target = _ref2.node;
      var eventPool = _this.props.eventPool;
      _this.portalNode = null;
      eventStack.unsub('mouseleave', _this.handlePortalMouseLeave, {
        pool: eventPool,
        target: target
      });
      eventStack.unsub('mouseenter', _this.handlePortalMouseEnter, {
        pool: eventPool,
        target: target
      });
      eventStack.unsub('click', _this.handleDocumentClick, {
        pool: eventPool
      });
      eventStack.unsub('keydown', _this.handleEscape, {
        pool: eventPool
      });

      _invoke(_this.props, 'onUnmount', null, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTriggerRef", function (c) {
      _this.triggerNode = c;

      _invoke(_this.props, 'triggerRef', c);
    });

    return _this;
  }

  _createClass(Portal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Clean up timers
      clearTimeout(this.mouseEnterTimer);
      clearTimeout(this.mouseLeaveTimer);
    } // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------

  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          children = _this$props7.children,
          mountNode = _this$props7.mountNode,
          trigger = _this$props7.trigger;
      var open = this.state.open;
      return [open ? React.createElement(PortalInner, {
        key: "inner",
        mountNode: mountNode,
        onMount: this.handleMount,
        onUnmount: this.handleUnmount
      }, children) : null, trigger ? React.createElement(Ref, {
        innerRef: this.handleTriggerRef,
        key: "trigger"
      }, cloneElement(trigger, {
        onBlur: this.handleTriggerBlur,
        onClick: this.handleTriggerClick,
        onFocus: this.handleTriggerFocus,
        onMouseLeave: this.handleTriggerMouseLeave,
        onMouseEnter: this.handleTriggerMouseEnter
      })) : null];
    }
  }]);

  return Portal;
}(Component);

_defineProperty(Portal, "defaultProps", {
  closeOnDocumentClick: true,
  closeOnEscape: true,
  eventPool: 'default',
  openOnTriggerClick: true
});

_defineProperty(Portal, "autoControlledProps", ['open']);

_defineProperty(Portal, "Inner", PortalInner);

_defineProperty(Portal, "handledProps", ["children", "closeOnDocumentClick", "closeOnEscape", "closeOnPortalMouseLeave", "closeOnTriggerBlur", "closeOnTriggerClick", "closeOnTriggerMouseLeave", "defaultOpen", "eventPool", "mountNode", "mouseEnterDelay", "mouseLeaveDelay", "onClose", "onMount", "onOpen", "onUnmount", "open", "openOnTriggerClick", "openOnTriggerFocus", "openOnTriggerMouseEnter", "trigger", "triggerRef"]);

Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** Controls whether or not the portal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape: PropTypes.bool,

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave: PropTypes.bool,

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur: PropTypes.bool,

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave: PropTypes.bool,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay: PropTypes.number,

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay: PropTypes.number,

  /**
   * Called when a close event happens
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
   * Called when an open event happens
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

  /** Controls whether or not the portal is displayed. */
  open: PropTypes.bool,

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus: PropTypes.bool,

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter: PropTypes.bool,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: PropTypes.node,

  /**
   * Called with a ref to the trigger node.
   *
   * @param {HTMLElement} node - Referred node.
   */
  triggerRef: PropTypes.func
} : {};
export default Portal;