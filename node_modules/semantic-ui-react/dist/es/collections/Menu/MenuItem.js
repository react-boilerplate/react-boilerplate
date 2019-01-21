import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _startCase from "lodash/startCase";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A menu can contain an item.
 */

var MenuItem =
/*#__PURE__*/
function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) _invoke(_this.props, 'onClick', e, _this.props);
    });

    return _this;
  }

  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          content = _this$props.content,
          disabled = _this$props.disabled,
          fitted = _this$props.fitted,
          header = _this$props.header,
          icon = _this$props.icon,
          link = _this$props.link,
          name = _this$props.name,
          onClick = _this$props.onClick,
          position = _this$props.position;
      var classes = cx(color, position, useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(icon === true || icon && !(name || content), 'icon'), useKeyOnly(header, 'header'), useKeyOnly(link, 'link'), useKeyOrValueAndKey(fitted, 'fitted'), 'item', className);
      var ElementType = getElementType(MenuItem, this.props, function () {
        if (onClick) return 'a';
      });
      var rest = getUnhandledProps(MenuItem, this.props);

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), children);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), Icon.create(icon, {
        autoGenerateKey: false
      }), childrenUtils.isNil(content) ? _startCase(name) : content);
    }
  }]);

  return MenuItem;
}(Component);

_defineProperty(MenuItem, "handledProps", ["active", "as", "children", "className", "color", "content", "disabled", "fitted", "header", "icon", "index", "link", "name", "onClick", "position"]);

export { MenuItem as default };
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A menu item can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Additional colors can be specified. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A menu item can be disabled. */
  disabled: PropTypes.bool,

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),

  /** A menu item may include a header or may itself be a header. */
  header: PropTypes.bool,

  /** MenuItem can be only icon. */
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** MenuItem index inside Menu. */
  index: PropTypes.number,

  /** A menu item can be link. */
  link: PropTypes.bool,

  /** Internal name of the MenuItem. */
  name: PropTypes.string,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A menu item can take left or right position. */
  position: PropTypes.oneOf(['left', 'right'])
} : {};
MenuItem.create = createShorthandFactory(MenuItem, function (val) {
  return {
    content: val,
    name: val
  };
});