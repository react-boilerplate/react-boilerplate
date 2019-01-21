import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly } from '../../lib';
import Image from '../../elements/Image';
import CardContent from './CardContent';
import CardDescription from './CardDescription';
import CardGroup from './CardGroup';
import CardHeader from './CardHeader';
import CardMeta from './CardMeta';
/**
 * A card displays site content in a manner similar to a playing card.
 */

var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Card)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      if (onClick) onClick(e, _this.props);
    });

    return _this;
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          centered = _this$props.centered,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          content = _this$props.content,
          description = _this$props.description,
          extra = _this$props.extra,
          fluid = _this$props.fluid,
          header = _this$props.header,
          href = _this$props.href,
          image = _this$props.image,
          link = _this$props.link,
          meta = _this$props.meta,
          onClick = _this$props.onClick,
          raised = _this$props.raised;
      var classes = cx('ui', color, useKeyOnly(centered, 'centered'), useKeyOnly(fluid, 'fluid'), useKeyOnly(link, 'link'), useKeyOnly(raised, 'raised'), 'card', className);
      var rest = getUnhandledProps(Card, this.props);
      var ElementType = getElementType(Card, this.props, function () {
        if (onClick) return 'a';
      });

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), children);
      }

      if (!childrenUtils.isNil(content)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), content);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        href: href,
        onClick: this.handleClick
      }), Image.create(image, {
        autoGenerateKey: false
      }), (description || header || meta) && React.createElement(CardContent, {
        description: description,
        header: header,
        meta: meta
      }), extra && React.createElement(CardContent, {
        extra: true
      }, extra));
    }
  }]);

  return Card;
}(Component);

_defineProperty(Card, "Content", CardContent);

_defineProperty(Card, "Description", CardDescription);

_defineProperty(Card, "Group", CardGroup);

_defineProperty(Card, "Header", CardHeader);

_defineProperty(Card, "Meta", CardMeta);

_defineProperty(Card, "handledProps", ["as", "centered", "children", "className", "color", "content", "description", "extra", "fluid", "header", "href", "image", "link", "meta", "onClick", "raised"]);

export { Card as default };
Card.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A Card can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A Card can be formatted to display different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for primary content of CardContent. */
  extra: customPropTypes.contentShorthand,

  /** A Card can be formatted to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: customPropTypes.itemShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** A card can contain an Image component. */
  image: customPropTypes.itemShorthand,

  /** A card can be formatted to link to other content. */
  link: PropTypes.bool,

  /** Shorthand for CardMeta. */
  meta: customPropTypes.itemShorthand,

  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A Card can be formatted to raise above the page. */
  raised: PropTypes.bool
} : {};