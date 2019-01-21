import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isNil from "lodash/isNil";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, createHTMLParagraph, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Icon from '../../elements/Icon';
import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import MessageList from './MessageList';
import MessageItem from './MessageItem';
/**
 * A message displays information that explains nearby content.
 * @see Form
 */

var Message =
/*#__PURE__*/
function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Message)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDismiss", function (e) {
      var onDismiss = _this.props.onDismiss;
      if (onDismiss) onDismiss(e, _this.props);
    });

    return _this;
  }

  _createClass(Message, [{
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
      var classes = cx('ui', color, size, useKeyOnly(compact, 'compact'), useKeyOnly(error, 'error'), useKeyOnly(floating, 'floating'), useKeyOnly(hidden, 'hidden'), useKeyOnly(icon, 'icon'), useKeyOnly(info, 'info'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(success, 'success'), useKeyOnly(visible, 'visible'), useKeyOnly(warning, 'warning'), useKeyOrValueAndKey(attached, 'attached'), 'message', className);
      var dismissIcon = onDismiss && React.createElement(Icon, {
        name: "close",
        onClick: this.handleDismiss
      });
      var rest = getUnhandledProps(Message, this.props);
      var ElementType = getElementType(Message, this.props);

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes
        }), dismissIcon, children);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), dismissIcon, Icon.create(icon, {
        autoGenerateKey: false
      }), (!_isNil(header) || !_isNil(content) || !_isNil(list)) && React.createElement(MessageContent, null, MessageHeader.create(header, {
        autoGenerateKey: false
      }), MessageList.create(list, {
        autoGenerateKey: false
      }), createHTMLParagraph(content, {
        autoGenerateKey: false
      })));
    }
  }]);

  return Message;
}(Component);

_defineProperty(Message, "Content", MessageContent);

_defineProperty(Message, "Header", MessageHeader);

_defineProperty(Message, "List", MessageList);

_defineProperty(Message, "Item", MessageItem);

_defineProperty(Message, "handledProps", ["as", "attached", "children", "className", "color", "compact", "content", "error", "floating", "header", "hidden", "icon", "info", "list", "negative", "onDismiss", "positive", "size", "success", "visible", "warning"]);

export { Message as default };
Message.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A message can be formatted to attach itself to other content. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['bottom', 'top'])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A message can be formatted to be different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A message can only take up the width of its content. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A message may be formatted to display a negative message. Same as `negative`. */
  error: PropTypes.bool,

  /** A message can float above content that it is related to. */
  floating: PropTypes.bool,

  /** Shorthand for MessageHeader. */
  header: customPropTypes.itemShorthand,

  /** A message can be hidden. */
  hidden: PropTypes.bool,

  /** A message can contain an icon. */
  icon: PropTypes.oneOfType([customPropTypes.itemShorthand, PropTypes.bool]),

  /** A message may be formatted to display information. */
  info: PropTypes.bool,

  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list: customPropTypes.collectionShorthand,

  /** A message may be formatted to display a negative message. Same as `error`. */
  negative: PropTypes.bool,

  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss: PropTypes.func,

  /** A message may be formatted to display a positive message.  Same as `success`. */
  positive: PropTypes.bool,

  /** A message can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** A message may be formatted to display a positive message.  Same as `positive`. */
  success: PropTypes.bool,

  /** A message can be set to visible to force itself to be shown. */
  visible: PropTypes.bool,

  /** A message may be formatted to display warning messages. */
  warning: PropTypes.bool
} : {};