"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _MessageContent = _interopRequireDefault(require("./MessageContent"));

var _MessageHeader = _interopRequireDefault(require("./MessageHeader"));

var _MessageList = _interopRequireDefault(require("./MessageList"));

var _MessageItem = _interopRequireDefault(require("./MessageItem"));

/**
 * A message displays information that explains nearby content.
 * @see Form
 */
var Message =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Message, _Component);

  function Message() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Message);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Message)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDismiss", function (e) {
      var onDismiss = _this.props.onDismiss;
      if (onDismiss) onDismiss(e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(Message, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attached = _this$props.attached,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          compact = _this$props.compact,
          content = _this$props.content,
          error = _this$props.error,
          floating = _this$props.floating,
          header = _this$props.header,
          hidden = _this$props.hidden,
          icon = _this$props.icon,
          info = _this$props.info,
          list = _this$props.list,
          negative = _this$props.negative,
          onDismiss = _this$props.onDismiss,
          positive = _this$props.positive,
          size = _this$props.size,
          success = _this$props.success,
          visible = _this$props.visible,
          warning = _this$props.warning;
      var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(floating, 'floating'), (0, _lib.useKeyOnly)(hidden, 'hidden'), (0, _lib.useKeyOnly)(icon, 'icon'), (0, _lib.useKeyOnly)(info, 'info'), (0, _lib.useKeyOnly)(negative, 'negative'), (0, _lib.useKeyOnly)(positive, 'positive'), (0, _lib.useKeyOnly)(success, 'success'), (0, _lib.useKeyOnly)(visible, 'visible'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), 'message', className);

      var dismissIcon = onDismiss && _react.default.createElement(_Icon.default, {
        name: "close",
        onClick: this.handleDismiss
      });

      var rest = (0, _lib.getUnhandledProps)(Message, this.props);
      var ElementType = (0, _lib.getElementType)(Message, this.props);

      if (!_lib.childrenUtils.isNil(children)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes
        }), dismissIcon, children);
      }

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes
      }), dismissIcon, _Icon.default.create(icon, {
        autoGenerateKey: false
      }), (!(0, _isNil2.default)(header) || !(0, _isNil2.default)(content) || !(0, _isNil2.default)(list)) && _react.default.createElement(_MessageContent.default, null, _MessageHeader.default.create(header, {
        autoGenerateKey: false
      }), _MessageList.default.create(list, {
        autoGenerateKey: false
      }), (0, _lib.createHTMLParagraph)(content, {
        autoGenerateKey: false
      })));
    }
  }]);
  return Message;
}(_react.Component);

exports.default = Message;
(0, _defineProperty2.default)(Message, "Content", _MessageContent.default);
(0, _defineProperty2.default)(Message, "Header", _MessageHeader.default);
(0, _defineProperty2.default)(Message, "List", _MessageList.default);
(0, _defineProperty2.default)(Message, "Item", _MessageItem.default);
(0, _defineProperty2.default)(Message, "handledProps", ["as", "attached", "children", "className", "color", "compact", "content", "error", "floating", "header", "hidden", "icon", "info", "list", "negative", "onDismiss", "positive", "size", "success", "visible", "warning"]);
Message.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A message can be formatted to attach itself to other content. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['bottom', 'top'])]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A message can be formatted to be different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A message can only take up the width of its content. */
  compact: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A message may be formatted to display a negative message. Same as `negative`. */
  error: _propTypes.default.bool,

  /** A message can float above content that it is related to. */
  floating: _propTypes.default.bool,

  /** Shorthand for MessageHeader. */
  header: _lib.customPropTypes.itemShorthand,

  /** A message can be hidden. */
  hidden: _propTypes.default.bool,

  /** A message can contain an icon. */
  icon: _propTypes.default.oneOfType([_lib.customPropTypes.itemShorthand, _propTypes.default.bool]),

  /** A message may be formatted to display information. */
  info: _propTypes.default.bool,

  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list: _lib.customPropTypes.collectionShorthand,

  /** A message may be formatted to display a negative message. Same as `error`. */
  negative: _propTypes.default.bool,

  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss: _propTypes.default.func,

  /** A message may be formatted to display a positive message.  Same as `success`. */
  positive: _propTypes.default.bool,

  /** A message can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** A message may be formatted to display a positive message.  Same as `positive`. */
  success: _propTypes.default.bool,

  /** A message can be set to visible to force itself to be shown. */
  visible: _propTypes.default.bool,

  /** A message may be formatted to display warning messages. */
  warning: _propTypes.default.bool
} : {};