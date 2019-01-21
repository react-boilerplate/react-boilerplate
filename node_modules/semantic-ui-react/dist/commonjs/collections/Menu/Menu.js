"use strict";

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

var _map2 = _interopRequireDefault(require("lodash/map"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _MenuHeader = _interopRequireDefault(require("./MenuHeader"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuMenu = _interopRequireDefault(require("./MenuMenu"));

/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */
var Menu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Menu, _Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, itemProps) {
          var index = itemProps.index;

          _this.trySetState({
            activeIndex: index
          });

          (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);
          (0, _invoke2.default)(_this.props, 'onItemClick', e, itemProps);
        }
      };
    });
    return _this;
  }

  (0, _createClass2.default)(Menu, [{
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      var items = this.props.items;
      var activeIndex = this.state.activeIndex;
      return (0, _map2.default)(items, function (item, index) {
        return _MenuItem.default.create(item, {
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
      var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(borderless, 'borderless'), (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(pagination, 'pagination'), (0, _lib.useKeyOnly)(pointing, 'pointing'), (0, _lib.useKeyOnly)(secondary, 'secondary'), (0, _lib.useKeyOnly)(stackable, 'stackable'), (0, _lib.useKeyOnly)(text, 'text'), (0, _lib.useKeyOnly)(vertical, 'vertical'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useKeyOrValueAndKey)(floated, 'floated'), (0, _lib.useKeyOrValueAndKey)(icon, 'icon'), (0, _lib.useKeyOrValueAndKey)(tabular, 'tabular'), (0, _lib.useValueAndKey)(fixed, 'fixed'), (0, _lib.useWidthProp)(widths, 'item'), className, 'menu');
      var rest = (0, _lib.getUnhandledProps)(Menu, this.props);
      var ElementType = (0, _lib.getElementType)(Menu, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes
      }), _lib.childrenUtils.isNil(children) ? this.renderItems() : children);
    }
  }]);
  return Menu;
}(_lib.AutoControlledComponent);

(0, _defineProperty2.default)(Menu, "autoControlledProps", ['activeIndex']);
(0, _defineProperty2.default)(Menu, "Header", _MenuHeader.default);
(0, _defineProperty2.default)(Menu, "Item", _MenuItem.default);
(0, _defineProperty2.default)(Menu, "Menu", _MenuMenu.default);
(0, _defineProperty2.default)(Menu, "handledProps", ["activeIndex", "as", "attached", "borderless", "children", "className", "color", "compact", "defaultActiveIndex", "fixed", "floated", "fluid", "icon", "inverted", "items", "onItemClick", "pagination", "pointing", "secondary", "size", "stackable", "tabular", "text", "vertical", "widths"]);
Menu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Index of the currently active item. */
  activeIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A menu may be attached to other content segments. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** A menu item or menu can have no borders. */
  borderless: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Additional colors can be specified. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A menu can take up only the space necessary to fit its content. */
  compact: _propTypes.default.bool,

  /** Initial activeIndex value. */
  defaultActiveIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A menu can be fixed to a side of its context. */
  fixed: _propTypes.default.oneOf(['left', 'right', 'bottom', 'top']),

  /** A menu can be floated. */
  floated: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['right'])]),

  /** A vertical menu may take the size of its container. */
  fluid: _propTypes.default.bool,

  /** A menu may have just icons (bool) or labeled icons. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['labeled'])]),

  /** A menu may have its colors inverted to show greater contrast. */
  inverted: _propTypes.default.bool,

  /** Shorthand array of props for Menu. */
  items: _lib.customPropTypes.collectionShorthand,

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination: _propTypes.default.bool,

  /** A menu can point to show its relationship to nearby content. */
  pointing: _propTypes.default.bool,

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: _propTypes.default.bool,

  /** A menu can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big')),

  /** A menu can stack at mobile resolutions. */
  stackable: _propTypes.default.bool,

  /** A menu can be formatted to show tabs of information. */
  tabular: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['right'])]),

  /** A menu can be formatted for text content. */
  text: _propTypes.default.bool,

  /** A vertical menu displays elements vertically. */
  vertical: _propTypes.default.bool,

  /** A menu can have its items divided evenly. */
  widths: _propTypes.default.oneOf(_lib.SUI.WIDTHS)
} : {};
Menu.create = (0, _lib.createShorthandFactory)(Menu, function (items) {
  return {
    items: items
  };
});
var _default = Menu;
exports.default = _default;