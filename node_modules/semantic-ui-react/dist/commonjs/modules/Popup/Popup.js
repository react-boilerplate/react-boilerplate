"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.POSITIONS = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Portal = _interopRequireDefault(require("../../addons/Portal"));

var _PopupContent = _interopRequireDefault(require("./PopupContent"));

var _PopupHeader = _interopRequireDefault(require("./PopupHeader"));

var POSITIONS = ['top left', 'top right', 'bottom right', 'bottom left', 'right center', 'left center', 'top center', 'bottom center'];
/**
 * A Popup displays additional information on top of a page.
 */

exports.POSITIONS = POSITIONS;

var Popup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popup, _Component);

  function Popup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hideOnScroll", function (e) {
      _this.setState({
        closed: true
      });

      _lib.eventStack.unsub('scroll', _this.hideOnScroll, {
        target: window
      });

      _this.timeoutId = setTimeout(function () {
        _this.setState({
          closed: false
        });
      }, 50);

      _this.handleClose(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClose", function (e) {
      (0, _invoke2.default)(_this.props, 'onClose', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleOpen", function (e) {
      _this.coords = _this.getContext().getBoundingClientRect();
      (0, _invoke2.default)(_this.props, 'onOpen', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalMount", function (e) {
      var hideOnScroll = _this.props.hideOnScroll;
      if (hideOnScroll) _lib.eventStack.sub('scroll', _this.hideOnScroll, {
        target: window
      });

      if (_this.getContext()) {
        _this.setPopupStyle(_this.props.position);
      }

      (0, _invoke2.default)(_this.props, 'onMount', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalUnmount", function (e) {
      var hideOnScroll = _this.props.hideOnScroll;
      if (hideOnScroll) _lib.eventStack.unsub('scroll', _this.hideOnScroll, {
        target: window
      });
      (0, _invoke2.default)(_this.props, 'onUnmount', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePopupRef", function (popupRef) {
      _this.popupCoords = popupRef ? popupRef.getBoundingClientRect() : null;

      _this.setPopupStyle();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerRef", function (triggerRef) {
      _this.triggerRef = triggerRef;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getContext", function () {
      return _this.props.context || _this.triggerRef;
    });
    return _this;
  }

  (0, _createClass2.default)(Popup, [{
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

      if (!(0, _lib.isBrowser)()) return style;
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

      if ((0, _includes2.default)(positions, 'right')) {
        style.right = Math.round(clientWidth - (coords.right + pageXOffset));
        style.left = 'auto';
      } else if ((0, _includes2.default)(positions, 'left')) {
        style.left = Math.round(coords.left + pageXOffset);
        style.right = 'auto';
      } else {
        // if not left nor right, we are horizontally centering the element
        var xOffset = (coords.width - this.popupCoords.width) / 2;
        style.left = Math.round(coords.left + xOffset + pageXOffset);
        style.right = 'auto';
      }

      if ((0, _includes2.default)(positions, 'top')) {
        style.bottom = Math.round(clientHeight - (coords.top + pageYOffset));
        style.top = 'auto';
      } else if ((0, _includes2.default)(positions, 'bottom')) {
        style.top = Math.round(coords.bottom + pageYOffset);
        style.bottom = 'auto';
      } else {
        // if not top nor bottom, we are vertically centering the element
        var yOffset = (coords.height + this.popupCoords.height) / 2;
        style.top = Math.round(coords.bottom + pageYOffset - yOffset);
        style.bottom = 'auto';

        var _xOffset = this.popupCoords.width + 8;

        if ((0, _includes2.default)(positions, 'right')) {
          style.right -= _xOffset;
        } else {
          style.left -= _xOffset;
        }
      }

      if (horizontalOffset) {
        if ((0, _isNumber2.default)(style.right)) {
          style.right -= horizontalOffset;
        } else {
          style.left -= horizontalOffset;
        }
      }

      if (verticalOffset) {
        if ((0, _isNumber2.default)(style.top)) {
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

      if ((0, _isNumber2.default)(style.right)) {
        element.left = clientWidth - style.right - element.width;
      }

      if ((0, _isNumber2.default)(style.bottom)) {
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
        var positions = (0, _without2.default)(POSITIONS, position).concat([position]);

        for (var i = 0; !this.isStyleInViewport(style) && i < positions.length; i += 1) {
          style = this.computePopupStyle(positions[i]);
          position = positions[i];
        }
      } // Append 'px' to every numerical values in the style


      style = (0, _mapValues2.default)(style, function (value) {
        return (0, _isNumber2.default)(value) ? "".concat(value, "px") : value;
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
      var normalizedOn = (0, _isArray2.default)(on) ? on : [on];

      if (hoverable) {
        portalProps.closeOnPortalMouseLeave = true;
        portalProps.mouseLeaveDelay = 300;
      }

      if ((0, _includes2.default)(normalizedOn, 'click')) {
        portalProps.openOnTriggerClick = true;
        portalProps.closeOnTriggerClick = true;
        portalProps.closeOnDocumentClick = true;
      }

      if ((0, _includes2.default)(normalizedOn, 'focus')) {
        portalProps.openOnTriggerFocus = true;
        portalProps.closeOnTriggerBlur = true;
      }

      if ((0, _includes2.default)(normalizedOn, 'hover')) {
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
      var style = (0, _assign2.default)({}, this.state.style, this.props.style);
      var classes = (0, _classnames.default)('ui', position, size, (0, _lib.useKeyOrValueAndKey)(wide, 'wide'), (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(flowing, 'flowing'), (0, _lib.useKeyOnly)(inverted, 'inverted'), 'popup transition visible', className);
      if (closed) return trigger;
      var unhandled = (0, _lib.getUnhandledProps)(Popup, this.props);
      var portalPropNames = _Portal.default.handledProps;
      var rest = (0, _reduce2.default)(unhandled, function (acc, val, key) {
        if (!(0, _includes2.default)(portalPropNames, key)) acc[key] = val;
        return acc;
      }, {});
      var portalProps = (0, _pick2.default)(unhandled, portalPropNames);
      var ElementType = (0, _lib.getElementType)(Popup, this.props);

      var popupJSX = _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        style: style,
        ref: this.handlePopupRef
      }), children, _lib.childrenUtils.isNil(children) && _PopupHeader.default.create(header, {
        autoGenerateKey: false
      }), _lib.childrenUtils.isNil(children) && _PopupContent.default.create(content, {
        autoGenerateKey: false
      }));

      var mergedPortalProps = (0, _objectSpread2.default)({}, this.getPortalProps(), portalProps);
      return _react.default.createElement(_Portal.default, (0, _extends2.default)({}, mergedPortalProps, {
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
}(_react.Component);

exports.default = Popup;
(0, _defineProperty2.default)(Popup, "defaultProps", {
  position: 'top left',
  on: 'hover',
  keepInViewPort: true
});
(0, _defineProperty2.default)(Popup, "Content", _PopupContent.default);
(0, _defineProperty2.default)(Popup, "Header", _PopupHeader.default);
(0, _defineProperty2.default)(Popup, "handledProps", ["as", "basic", "children", "className", "content", "context", "flowing", "header", "hideOnScroll", "horizontalOffset", "hoverable", "inverted", "keepInViewPort", "on", "onClose", "onMount", "onOpen", "onUnmount", "position", "size", "style", "trigger", "verticalOffset", "wide"]);
Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Display the popup without the pointing arrow. */
  basic: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Simple text content for the popover. */
  content: _lib.customPropTypes.itemShorthand,

  /** Existing element the pop-up should be bound to. */
  context: _propTypes.default.object,

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing: _propTypes.default.bool,

  /** Takes up the entire width of its offset container. */
  // TODO: implement the Popup fluid layout
  // fluid: PropTypes.bool,

  /** Header displayed above the content in bold. */
  header: _lib.customPropTypes.itemShorthand,

  /** Hide the Popup when scrolling the window. */
  hideOnScroll: _propTypes.default.bool,

  /** Whether the popup should not close on hover. */
  hoverable: _propTypes.default.bool,

  /** Invert the colors of the Popup. */
  inverted: _propTypes.default.bool,

  /** Horizontal offset in pixels to be applied to the Popup. */
  horizontalOffset: _propTypes.default.number,

  /** Vertical offset in pixels to be applied to the Popup. */
  verticalOffset: _propTypes.default.number,

  /** Events triggering the popup. */
  on: _propTypes.default.oneOfType([_propTypes.default.oneOf(['hover', 'click', 'focus']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['hover', 'click', 'focus']))]),

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

  /** Position for the popover. */
  position: _propTypes.default.oneOf(POSITIONS),

  /** Popup size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big', 'massive')),

  /** Custom Popup style. */
  style: _propTypes.default.object,

  /** Element to be rendered in-place where the popup is defined. */
  trigger: _propTypes.default.node,

  /** Popup width. */
  wide: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** Element to be rendered within the confines of the viewport whenever possible. */
  keepInViewPort: _propTypes.default.bool
} : {};