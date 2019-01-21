import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isPlainObject from "lodash/isPlainObject";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, isValidElement } from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Image from '../../elements/Image';
import ListContent from './ListContent';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import ListIcon from './ListIcon';
/**
 * A list item can contain a set of items.
 */

var ListItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) _invoke(_this.props, 'onClick', e, _this.props);
    });

    return _this;
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          description = _this$props.description,
          disabled = _this$props.disabled,
          header = _this$props.header,
          icon = _this$props.icon,
          image = _this$props.image,
          value = _this$props.value;
      var ElementType = getElementType(ListItem, this.props);
      var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(ElementType !== 'li', 'item'), className);
      var rest = getUnhandledProps(ListItem, this.props);
      var valueProp = ElementType === 'li' ? {
        value: value
      } : {
        'data-value': value
      };

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, valueProp, {
          role: "listitem",
          className: classes,
          onClick: this.handleClick
        }, rest), children);
      }

      var iconElement = ListIcon.create(icon, {
        autoGenerateKey: false
      });
      var imageElement = Image.create(image, {
        autoGenerateKey: false
      }); // See description of `content` prop for explanation about why this is necessary.

      if (!isValidElement(content) && _isPlainObject(content)) {
        return React.createElement(ElementType, _extends({}, valueProp, {
          role: "listitem",
          className: classes,
          onClick: this.handleClick
        }, rest), iconElement || imageElement, ListContent.create(content, {
          autoGenerateKey: false,
          defaultProps: {
            header: header,
            description: description
          }
        }));
      }

      var headerElement = ListHeader.create(header, {
        autoGenerateKey: false
      });
      var descriptionElement = ListDescription.create(description, {
        autoGenerateKey: false
      });

      if (iconElement || imageElement) {
        return React.createElement(ElementType, _extends({}, valueProp, {
          role: "listitem",
          className: classes,
          onClick: this.handleClick
        }, rest), iconElement || imageElement, (content || headerElement || descriptionElement) && React.createElement(ListContent, null, headerElement, descriptionElement, content));
      }

      return React.createElement(ElementType, _extends({}, valueProp, {
        role: "listitem",
        className: classes,
        onClick: this.handleClick
      }, rest), headerElement, descriptionElement, content);
    }
  }]);

  return ListItem;
}(Component);

_defineProperty(ListItem, "handledProps", ["active", "as", "children", "className", "content", "description", "disabled", "header", "icon", "image", "onClick", "value"]);

ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A list item can active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * Shorthand for primary content.
   *
   * Heads up!
   *
   * This is handled slightly differently than the typical `content` prop since
   * the wrapping ListContent is not used when there's no icon or image.
   *
   * If you pass content as:
   * - an element/literal, it's treated as the sibling node to
   * header/description (whether wrapped in Item.Content or not).
   * - a props object, it forces the presence of Item.Content and passes those
   * props to it. If you pass a content prop within that props object, it
   * will be treated as the sibling node to header/description.
   */
  content: customPropTypes.itemShorthand,

  /** Shorthand for ListDescription. */
  description: customPropTypes.itemShorthand,

  /** A list item can disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for ListHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ListIcon. */
  icon: customPropTypes.every([customPropTypes.disallow(['image']), customPropTypes.itemShorthand]),

  /** Shorthand for Image. */
  image: customPropTypes.every([customPropTypes.disallow(['icon']), customPropTypes.itemShorthand]),

  /** A ListItem can be clicked */
  onClick: PropTypes.func,

  /** A value for an ordered list. */
  value: PropTypes.string
} : {};
ListItem.create = createShorthandFactory(ListItem, function (content) {
  return {
    content: content
  };
});
export default ListItem;