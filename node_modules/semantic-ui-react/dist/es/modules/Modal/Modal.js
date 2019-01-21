import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _pick from "lodash/pick";
import _includes from "lodash/includes";
import _reduce from "lodash/reduce";
import _isEmpty from "lodash/isEmpty";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { isValidElement } from 'react';
import { AutoControlledComponent as Component, childrenUtils, customPropTypes, doesNodeContainClick, eventStack, getElementType, getUnhandledProps, isBrowser, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
import MountNode from '../../addons/MountNode';
import Portal from '../../addons/Portal';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import ModalDescription from './ModalDescription';
import Ref from '../../addons/Ref';

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
var Modal =
/*#__PURE__*/
function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMountNode", function () {
      return isBrowser() ? _this.props.mountNode || document.body : null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleActionsOverrides", function (predefinedProps) {
      return {
        onActionClick: function onActionClick(e, actionProps) {
          _invoke(predefinedProps, 'onActionClick', e, actionProps);

          _invoke(_this.props, 'onActionClick', e, _this.props);

          _this.handleClose(e);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function (e) {
      _invoke(_this.props, 'onClose', e, _this.props);

      _this.trySetState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentClick", function (e) {
      var closeOnDimmerClick = _this.props.closeOnDimmerClick;
      if (!closeOnDimmerClick || doesNodeContainClick(_this.ref, e)) return;

      _invoke(_this.props, 'onClose', e, _this.props);

      _this.trySetState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIconOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e) {
          _invoke(predefinedProps, 'onClick', e);

          _this.handleClose(e);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function (e) {
      _invoke(_this.props, 'onOpen', e, _this.props);

      _this.trySetState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalMount", function (e) {
      var eventPool = _this.props.eventPool;

      _this.setState({
        scrolling: false
      });

      _this.setPositionAndClassNames();

      eventStack.sub('click', _this.handleDocumentClick, {
        pool: eventPool,
        target: _this.dimmerRef
      });

      _invoke(_this.props, 'onMount', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalUnmount", function (e) {
      var eventPool = _this.props.eventPool;
      cancelAnimationFrame(_this.animationRequestId);
      eventStack.unsub('click', _this.handleDocumentClick, {
        pool: eventPool,
        target: _this.dimmerRef
      });

      _invoke(_this.props, 'onUnmount', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDimmerRef", function (c) {
      return _this.dimmerRef = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setDimmerNodeStyle", function () {
      if (_this.dimmerRef) {
        _this.dimmerRef.style.setProperty('display', 'flex', 'important');
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPositionAndClassNames", function () {
      var dimmer = _this.props.dimmer;
      var classes;

      if (dimmer) {
        classes = 'dimmable dimmed';

        if (dimmer === 'blurring') {
          classes += ' blurring';
        }
      }

      var newState = {};

      if (_this.ref) {
        var _this$ref$getBounding = _this.ref.getBoundingClientRect(),
            height = _this$ref$getBounding.height; // Leaving the old calculation here since we may need it as an older browser fallback
        // SEE: https://github.com/Semantic-Org/Semantic-UI/issues/6185#issuecomment-376725956
        // const marginTop = -Math.round(height / 2)


        var marginTop = null;
        var scrolling = height > window.innerHeight;

        if (_this.state.marginTop !== marginTop) {
          newState.marginTop = marginTop;
        }

        if (_this.state.scrolling !== scrolling) {
          newState.scrolling = scrolling;
        }

        if (scrolling) classes += ' scrolling';
      }

      if (_this.state.mountClasses !== classes) newState.mountClasses = classes;
      if (!_isEmpty(newState)) _this.setState(newState);
      _this.animationRequestId = requestAnimationFrame(_this.setPositionAndClassNames);

      _this.setDimmerNodeStyle();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderContent", function (rest) {
      var _this$props = _this.props,
          actions = _this$props.actions,
          basic = _this$props.basic,
          children = _this$props.children,
          className = _this$props.className,
          closeIcon = _this$props.closeIcon,
          content = _this$props.content,
          header = _this$props.header,
          mountNode = _this$props.mountNode,
          size = _this$props.size,
          style = _this$props.style;
      var _this$state = _this.state,
          marginTop = _this$state.marginTop,
          mountClasses = _this$state.mountClasses,
          scrolling = _this$state.scrolling;
      var classes = cx('ui', size, useKeyOnly(basic, 'basic'), useKeyOnly(scrolling, 'scrolling'), 'modal transition visible active', className);
      var ElementType = getElementType(Modal, _this.props);
      var closeIconName = closeIcon === true ? 'close' : closeIcon;
      var closeIconJSX = Icon.create(closeIconName, {
        overrideProps: _this.handleIconOverrides
      });

      if (!childrenUtils.isNil(children)) {
        // TODO: remove when ref with "as" is resolved: PR #2306
        return React.createElement(Ref, {
          innerRef: _this.handleRef
        }, React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          style: _objectSpread({
            marginTop: marginTop
          }, style)
        }), React.createElement(MountNode, {
          className: mountClasses,
          node: mountNode
        }), closeIconJSX, children));
      } // TODO: remove when ref with "as" is resolved: PR #2306


      return React.createElement(Ref, {
        innerRef: _this.handleRef
      }, React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        style: _objectSpread({
          marginTop: marginTop
        }, style)
      }), React.createElement(MountNode, {
        className: mountClasses,
        node: mountNode
      }), closeIconJSX, ModalHeader.create(header, {
        autoGenerateKey: false
      }), ModalContent.create(content, {
        autoGenerateKey: false
      }), ModalActions.create(actions, {
        overrideProps: _this.handleActionsOverrides
      })));
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handlePortalUnmount();
    } // Do not access document when server side rendering

  }, {
    key: "render",
    value: function render() {
      var open = this.state.open;
      var _this$props2 = this.props,
          centered = _this$props2.centered,
          closeOnDocumentClick = _this$props2.closeOnDocumentClick,
          dimmer = _this$props2.dimmer,
          eventPool = _this$props2.eventPool,
          trigger = _this$props2.trigger;
      var mountNode = this.getMountNode(); // Short circuit when server side rendering

      if (!isBrowser()) {
        return isValidElement(trigger) ? trigger : null;
      }

      var unhandled = getUnhandledProps(Modal, this.props);
      var portalPropNames = Portal.handledProps;

      var rest = _reduce(unhandled, function (acc, val, key) {
        if (!_includes(portalPropNames, key)) acc[key] = val;
        return acc;
      }, {});

      var portalProps = _pick(unhandled, portalPropNames); // wrap dimmer modals


      var dimmerClasses = cx('ui', dimmer === 'inverted' && 'inverted', !centered && 'top aligned', 'page modals dimmer transition visible active'); // Heads up!
      //
      // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
      // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
      //
      // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
      // We need the immediate child to be the dimmer to :not() blur the modal itself!
      // Otherwise, the portal div is also blurred, blurring the modal.
      //
      // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

      return React.createElement(Portal, _extends({
        closeOnDocumentClick: closeOnDocumentClick
      }, portalProps, {
        trigger: trigger,
        eventPool: eventPool,
        mountNode: mountNode,
        open: open,
        onClose: this.handleClose,
        onMount: this.handlePortalMount,
        onOpen: this.handleOpen,
        onUnmount: this.handlePortalUnmount
      }), React.createElement("div", {
        className: dimmerClasses,
        ref: this.handleDimmerRef
      }, this.renderContent(rest)));
    }
  }]);

  return Modal;
}(Component);

_defineProperty(Modal, "defaultProps", {
  centered: true,
  dimmer: true,
  closeOnDimmerClick: true,
  closeOnDocumentClick: false,
  eventPool: 'Modal'
});

_defineProperty(Modal, "autoControlledProps", ['open']);

_defineProperty(Modal, "Header", ModalHeader);

_defineProperty(Modal, "Content", ModalContent);

_defineProperty(Modal, "Description", ModalDescription);

_defineProperty(Modal, "Actions", ModalActions);

_defineProperty(Modal, "handledProps", ["actions", "as", "basic", "centered", "children", "className", "closeIcon", "closeOnDimmerClick", "closeOnDocumentClick", "content", "defaultOpen", "dimmer", "eventPool", "header", "mountNode", "onActionClick", "onClose", "onMount", "onOpen", "onUnmount", "open", "size", "style", "trigger"]);

Modal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions: customPropTypes.itemShorthand,

  /** A modal can reduce its complexity */
  basic: PropTypes.bool,

  /** A modal can be vertically centered in the viewport */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for the close icon. Closes the modal on click. */
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: PropTypes.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Simple text content for the Modal. */
  content: customPropTypes.itemShorthand,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** Modal displayed above the content in bold. */
  header: customPropTypes.itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: PropTypes.any,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick: PropTypes.func,

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

  /** Controls whether or not the Modal is displayed. */
  open: PropTypes.bool,

  /** A modal can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

  /** Custom styles. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: PropTypes.node
  /**
   * NOTE: Any unhandled props that are defined in Portal are passed-through
   * to the wrapping Portal.
   */

} : {};
export default Modal;