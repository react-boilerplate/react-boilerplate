import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _map from "lodash/map";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, childrenUtils, customPropTypes, createShorthandFactory, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useWidthProp } from '../../lib';
import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';
import MenuMenu from './MenuMenu';
/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */

var Menu =
/*#__PURE__*/
function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, itemProps) {
          var index = itemProps.index;

          _this.trySetState({
            activeIndex: index
          });

          _invoke(predefinedProps, 'onClick', e, itemProps);

          _invoke(_this.props, 'onItemClick', e, itemProps);
        }
      };
    });

    return _this;
  }

  _createClass(Menu, [{
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      var items = this.props.items;
      var activeIndex = this.state.activeIndex;
      return _map(items, function (item, index) {
        return MenuItem.create(item, {
          defaultProps: {
            active: parseInt(activeIndex, 10) === index,
            index: index
          },
          overrideProps: _this2.handleItemOverrides
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attached = _this$props.attached,
          borderless = _this$props.borderless,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          compact = _this$props.compact,
          fixed = _this$props.fixed,
          floated = _this$props.floated,
          fluid = _this$props.fluid,
          icon = _this$props.icon,
          inverted = _this$props.inverted,
          pagination = _this$props.pagination,
          pointing = _this$props.pointing,
          secondary = _this$props.secondary,
          size = _this$props.size,
          stackable = _this$props.stackable,
          tabular = _this$props.tabular,
          text = _this$props.text,
          vertical = _this$props.vertical,
          widths = _this$props.widths;
      var classes = cx('ui', color, size, useKeyOnly(borderless, 'borderless'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), useKeyOnly(pagination, 'pagination'), useKeyOnly(pointing, 'pointing'), useKeyOnly(secondary, 'secondary'), useKeyOnly(stackable, 'stackable'), useKeyOnly(text, 'text'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useKeyOrValueAndKey(floated, 'floated'), useKeyOrValueAndKey(icon, 'icon'), useKeyOrValueAndKey(tabular, 'tabular'), useValueAndKey(fixed, 'fixed'), useWidthProp(widths, 'item'), className, 'menu');
      var rest = getUnhandledProps(Menu, this.props);
      var ElementType = getElementType(Menu, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), childrenUtils.isNil(children) ? this.renderItems() : children);
    }
  }]);

  return Menu;
}(Component);

_defineProperty(Menu, "autoControlledProps", ['activeIndex']);

_defineProperty(Menu, "Header", MenuHeader);

_defineProperty(Menu, "Item", MenuItem);

_defineProperty(Menu, "Menu", MenuMenu);

_defineProperty(Menu, "handledProps", ["activeIndex", "as", "attached", "borderless", "children", "className", "color", "compact", "defaultActiveIndex", "fixed", "floated", "fluid", "icon", "inverted", "items", "onItemClick", "pagination", "pointing", "secondary", "size", "stackable", "tabular", "text", "vertical", "widths"]);

Menu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Index of the currently active item. */
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A menu may be attached to other content segments. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** A menu item or menu can have no borders. */
  borderless: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Additional colors can be specified. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A menu can take up only the space necessary to fit its content. */
  compact: PropTypes.bool,

  /** Initial activeIndex value. */
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A menu can be fixed to a side of its context. */
  fixed: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),

  /** A menu can be floated. */
  floated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),

  /** A vertical menu may take the size of its container. */
  fluid: PropTypes.bool,

  /** A menu may have just icons (bool) or labeled icons. */
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['labeled'])]),

  /** A menu may have its colors inverted to show greater contrast. */
  inverted: PropTypes.bool,

  /** Shorthand array of props for Menu. */
  items: customPropTypes.collectionShorthand,

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination: PropTypes.bool,

  /** A menu can point to show its relationship to nearby content. */
  pointing: PropTypes.bool,

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: PropTypes.bool,

  /** A menu can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big')),

  /** A menu can stack at mobile resolutions. */
  stackable: PropTypes.bool,

  /** A menu can be formatted to show tabs of information. */
  tabular: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),

  /** A menu can be formatted for text content. */
  text: PropTypes.bool,

  /** A vertical menu displays elements vertically. */
  vertical: PropTypes.bool,

  /** A menu can have its items divided evenly. */
  widths: PropTypes.oneOf(SUI.WIDTHS)
} : {};
Menu.create = createShorthandFactory(Menu, function (items) {
  return {
    items: items
  };
});
export default Menu;