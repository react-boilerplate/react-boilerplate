"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _MountNode = _interopRequireDefault(require("../../addons/MountNode"));

var _Portal = _interopRequireDefault(require("../../addons/Portal"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _ModalContent = _interopRequireDefault(require("./ModalContent"));

var _ModalActions = _interopRequireDefault(require("./ModalActions"));

var _ModalDescription = _interopRequireDefault(require("./ModalDescription"));

var _Ref = _interopRequireDefault(require("../../addons/Ref"));

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
var Modal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Modal, _Component);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getMountNode", function () {
      return (0, _lib.isBrowser)() ? _this.props.mountNode || document.body : null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleActionsOverrides", function (predefinedProps) {
      return {
        onActionClick: function onActionClick(e, actionProps) {
          (0, _invoke2.default)(predefinedProps, 'onActionClick', e, actionProps);
          (0, _invoke2.default)(_this.props, 'onActionClick', e, _this.props);

          _this.handleClose(e);
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClose", function (e) {
      (0, _invoke2.default)(_this.props, 'onClose', e, _this.props);

      _this.trySetState({
        open: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDocumentClick", function (e) {
      var closeOnDimmerClick = _this.props.closeOnDimmerClick;
      if (!closeOnDimmerClick || (0, _lib.doesNodeContainClick)(_this.ref, e)) return;
      (0, _invoke2.default)(_this.props, 'onClose', e, _this.props);

      _this.trySetState({
        open: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIconOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e);

          _this.handleClose(e);
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleOpen", function (e) {
      (0, _invoke2.default)(_this.props, 'onOpen', e, _this.props);

      _this.trySetState({
        open: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalMount", function (e) {
      var eventPool = _this.props.eventPool;

      _this.setState({
        scrolling: false
      });

      _this.setPositionAndClassNames();

      _lib.eventStack.sub('click', _this.handleDocumentClick, {
        pool: eventPool,
        target: _this.dimmerRef
      });

      (0, _invoke2.default)(_this.props, 'onMount', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalUnmount", function (e) {
      var eventPool = _this.props.eventPool;
      cancelAnimationFrame(_this.animationRequestId);

      _lib.eventStack.unsub('click', _this.handleDocumentClick, {
        pool: eventPool,
        target: _this.dimmerRef
      });

      (0, _invoke2.default)(_this.props, 'onUnmount', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDimmerRef", function (c) {
      return _this.dimmerRef = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setDimmerNodeStyle", function () {
      if (_this.dimmerRef) {
        _this.dimmerRef.style.setProperty('display', 'flex', 'important');
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setPositionAndClassNames", function () {
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
      if (!(0, _isEmpty2.default)(newState)) _this.setState(newState);
      _this.animationRequestId = requestAnimationFrame(_this.setPositionAndClassNames);

      _this.setDimmerNodeStyle();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderContent", function (rest) {
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
      var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(scrolling, 'scrolling'), 'modal transition visible active', className);
      var ElementType = (0, _lib.getElementType)(Modal, _this.props);
      var closeIconName = closeIcon === true ? 'close' : closeIcon;

      var closeIconJSX = _Icon.default.create(closeIconName, {
        overrideProps: _this.handleIconOverrides
      });

      if (!_lib.childrenUtils.isNil(children)) {
        // TODO: remove when ref with "as" is resolved: PR #2306
        return _react.default.createElement(_Ref.default, {
          innerRef: _this.handleRef
        }, _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes,
          style: (0, _objectSpread2.default)({
            marginTop: marginTop
          }, style)
        }), _react.default.createElement(_MountNode.default, {
          className: mountClasses,
          node: mountNode
        }), closeIconJSX, children));
      } // TODO: remove when ref with "as" is resolved: PR #2306


      return _react.default.createElement(_Ref.default, {
        innerRef: _this.handleRef
      }, _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        style: (0, _objectSpread2.default)({
          marginTop: marginTop
        }, style)
      }), _react.default.createElement(_MountNode.default, {
        className: mountClasses,
        node: mountNode
      }), closeIconJSX, _ModalHeader.default.create(header, {
        autoGenerateKey: false
      }), _ModalContent.default.create(content, {
        autoGenerateKey: false
      }), _ModalActions.default.create(actions, {
        overrideProps: _this.handleActionsOverrides
      })));
    });
    return _this;
  }

  (0, _createClass2.default)(Modal, [{
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

      if (!(0, _lib.isBrowser)()) {
        return (0, _react.isValidElement)(trigger) ? trigger : null;
      }

      var unhandled = (0, _lib.getUnhandledProps)(Modal, this.props);
      var portalPropNames = _Portal.default.handledProps;
      var rest = (0, _reduce2.default)(unhandled, function (acc, val, key) {
        if (!(0, _includes2.default)(portalPropNames, key)) acc[key] = val;
        return acc;
      }, {});
      var portalProps = (0, _pick2.default)(unhandled, portalPropNames); // wrap dimmer modals

      var dimmerClasses = (0, _classnames.default)('ui', dimmer === 'inverted' && 'inverted', !centered && 'top aligned', 'page modals dimmer transition visible active'); // Heads up!
      //
      // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
      // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
      //
      // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
      // We need the immediate child to be the dimmer to :not() blur the modal itself!
      // Otherwise, the portal div is also blurred, blurring the modal.
      //
      // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

      return _react.default.createElement(_Portal.default, (0, _extends2.default)({
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
      }), _react.default.createElement("div", {
        className: dimmerClasses,
        ref: this.handleDimmerRef
      }, this.renderContent(rest)));
    }
  }]);
  return Modal;
}(_lib.AutoControlledComponent);

(0, _defineProperty2.default)(Modal, "defaultProps", {
  centered: true,
  dimmer: true,
  closeOnDimmerClick: true,
  closeOnDocumentClick: false,
  eventPool: 'Modal'
});
(0, _defineProperty2.default)(Modal, "autoControlledProps", ['open']);
(0, _defineProperty2.default)(Modal, "Header", _ModalHeader.default);
(0, _defineProperty2.default)(Modal, "Content", _ModalContent.default);
(0, _defineProperty2.default)(Modal, "Description", _ModalDescription.default);
(0, _defineProperty2.default)(Modal, "Actions", _ModalActions.default);
(0, _defineProperty2.default)(Modal, "handledProps", ["actions", "as", "basic", "centered", "children", "className", "closeIcon", "closeOnDimmerClick", "closeOnDocumentClick", "content", "defaultOpen", "dimmer", "eventPool", "header", "mountNode", "onActionClick", "onClose", "onMount", "onOpen", "onUnmount", "open", "size", "style", "trigger"]);
Modal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions: _lib.customPropTypes.itemShorthand,

  /** A modal can reduce its complexity */
  basic: _propTypes.default.bool,

  /** A modal can be vertically centered in the viewport */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for the close icon. Closes the modal on click. */
  closeIcon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object, _propTypes.default.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: _propTypes.default.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: _propTypes.default.bool,

  /** Simple text content for the Modal. */
  content: _lib.customPropTypes.itemShorthand,

  /** Initial value of open. */
  defaultOpen: _propTypes.default.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: _propTypes.default.oneOf([true, 'inverted', 'blurring']),

  /** Event pool namespace that is used to handle component events */
  eventPool: _propTypes.default.string,

  /** Modal displayed above the content in bold. */
  header: _lib.customPropTypes.itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: _propTypes.default.any,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick: _propTypes.default.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: _propTypes.default.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: _propTypes.default.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: _propTypes.default.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: _propTypes.default.func,

  /** Controls whether or not the Modal is displayed. */
  open: _propTypes.default.bool,

  /** A modal can vary in size */
  size: _propTypes.default.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

  /** Custom styles. */
  style: _propTypes.default.object,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: _propTypes.default.node
  /**
   * NOTE: Any unhandled props that are defined in Portal are passed-through
   * to the wrapping Portal.
   */

} : {};
var _default = Modal;
exports.default = _default;