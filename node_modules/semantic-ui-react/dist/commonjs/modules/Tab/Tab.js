"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Grid = _interopRequireDefault(require("../../collections/Grid/Grid"));

var _GridColumn = _interopRequireDefault(require("../../collections/Grid/GridColumn"));

var _Menu = _interopRequireDefault(require("../../collections/Menu/Menu"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */
var Tab =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tab, _Component);

  function Tab() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemClick", function (e, _ref) {
      var index = _ref.index;
      (0, _invoke2.default)(_this.props, 'onTabChange', e, (0, _objectSpread2.default)({}, _this.props, {
        activeIndex: index
      }));

      _this.trySetState({
        activeIndex: index
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Tab, [{
    key: "getInitialAutoControlledState",
    value: function getInitialAutoControlledState() {
      return {
        activeIndex: 0
      };
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this$props = this.props,
          panes = _this$props.panes,
          renderActiveOnly = _this$props.renderActiveOnly;
      var activeIndex = this.state.activeIndex;
      if (renderActiveOnly) return (0, _invoke2.default)((0, _get2.default)(panes, "[".concat(activeIndex, "]")), 'render', this.props);
      return (0, _map2.default)(panes, function (_ref2, index) {
        var pane = _ref2.pane;
        return _TabPane.default.create(pane, {
          overrideProps: {
            active: index === activeIndex
          }
        });
      });
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$props2 = this.props,
          menu = _this$props2.menu,
          panes = _this$props2.panes,
          menuPosition = _this$props2.menuPosition;
      var activeIndex = this.state.activeIndex;

      if (menu.tabular === true && menuPosition === 'right') {
        menu.tabular = 'right';
      }

      return _Menu.default.create(menu, {
        autoGenerateKey: false,
        overrideProps: {
          items: (0, _map2.default)(panes, 'menuItem'),
          onItemClick: this.handleItemClick,
          activeIndex: activeIndex
        }
      });
    }
  }, {
    key: "renderVertical",
    value: function renderVertical(menu) {
      var _this$props3 = this.props,
          grid = _this$props3.grid,
          menuPosition = _this$props3.menuPosition;
      var paneWidth = grid.paneWidth,
          tabWidth = grid.tabWidth,
          gridProps = (0, _objectWithoutProperties2.default)(grid, ["paneWidth", "tabWidth"]);
      var position = menuPosition || menu.props.tabular === 'right' && 'right' || 'left';
      return _react.default.createElement(_Grid.default, gridProps, position === 'left' && _GridColumn.default.create({
        width: tabWidth,
        children: menu
      }, {
        autoGenerateKey: false
      }), _GridColumn.default.create({
        width: paneWidth,
        children: this.renderItems(),
        stretched: true
      }, {
        autoGenerateKey: false
      }), position === 'right' && _GridColumn.default.create({
        width: tabWidth,
        children: menu
      }, {
        autoGenerateKey: false
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var menu = this.renderMenu();
      var rest = (0, _lib.getUnhandledProps)(Tab, this.props);
      var ElementType = (0, _lib.getElementType)(Tab, this.props);

      if (menu.props.vertical) {
        return _react.default.createElement(ElementType, rest, this.renderVertical(menu));
      }

      return _react.default.createElement(ElementType, rest, menu.props.attached !== 'bottom' && menu, this.renderItems(), menu.props.attached === 'bottom' && menu);
    }
  }]);
  return Tab;
}(_lib.AutoControlledComponent);

(0, _defineProperty2.default)(Tab, "autoControlledProps", ['activeIndex']);
(0, _defineProperty2.default)(Tab, "defaultProps", {
  grid: {
    paneWidth: 12,
    tabWidth: 4
  },
  menu: {
    attached: true,
    tabular: true
  },
  renderActiveOnly: true
});
(0, _defineProperty2.default)(Tab, "Pane", _TabPane.default);
(0, _defineProperty2.default)(Tab, "handledProps", ["activeIndex", "as", "defaultActiveIndex", "grid", "menu", "menuPosition", "onTabChange", "panes", "renderActiveOnly"]);
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The initial activeIndex. */
  defaultActiveIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Index of the currently active tab. */
  activeIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Shorthand props for the Menu.
   * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
   */
  menu: _propTypes.default.object,

  /** Align vertical menu */
  menuPosition: _propTypes.default.oneOf(['left', 'right']),

  /** Shorthand props for the Grid. */
  grid: _propTypes.default.object,

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed new activeIndex.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   */
  onTabChange: _propTypes.default.func,

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * { menuItem: 'Home', render: () => <Tab.Pane /> }
   * or
   * { menuItem: 'Home', pane: 'Welcome' }
   */
  panes: _propTypes.default.arrayOf(_propTypes.default.shape({
    menuItem: _lib.customPropTypes.itemShorthand,
    pane: _lib.customPropTypes.itemShorthand,
    render: _propTypes.default.func
  })),

  /** A Tab can render only active pane. */
  renderActiveOnly: _propTypes.default.bool
} : {};
var _default = Tab;
exports.default = _default;