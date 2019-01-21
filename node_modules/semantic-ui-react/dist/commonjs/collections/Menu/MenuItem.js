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

var _startCase2 = _interopRequireDefault(require("lodash/startCase"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A menu can contain an item.
 */
var MenuItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MenuItem, _Component);

  function MenuItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(MenuItem, [{
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
      var classes = (0, _classnames.default)(color, position, (0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(icon === true || icon && !(name || content), 'icon'), (0, _lib.useKeyOnly)(header, 'header'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOrValueAndKey)(fitted, 'fitted'), 'item', className);
      var ElementType = (0, _lib.getElementType)(MenuItem, this.props, function () {
        if (onClick) return 'a';
      });
      var rest = (0, _lib.getUnhandledProps)(MenuItem, this.props);

      if (!_lib.childrenUtils.isNil(children)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), children);
      }

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), _Icon.default.create(icon, {
        autoGenerateKey: false
      }), _lib.childrenUtils.isNil(content) ? (0, _startCase2.default)(name) : content);
    }
  }]);
  return MenuItem;
}(_react.Component);

exports.default = MenuItem;
(0, _defineProperty2.default)(MenuItem, "handledProps", ["active", "as", "children", "className", "color", "content", "disabled", "fitted", "header", "icon", "index", "link", "name", "onClick", "position"]);
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A menu item can be active. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Additional colors can be specified. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A menu item can be disabled. */
  disabled: _propTypes.default.bool,

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['horizontally', 'vertically'])]),

  /** A menu item may include a header or may itself be a header. */
  header: _propTypes.default.bool,

  /** MenuItem can be only icon. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand]),

  /** MenuItem index inside Menu. */
  index: _propTypes.default.number,

  /** A menu item can be link. */
  link: _propTypes.default.bool,

  /** Internal name of the MenuItem. */
  name: _propTypes.default.string,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** A menu item can take left or right position. */
  position: _propTypes.default.oneOf(['left', 'right'])
} : {};
MenuItem.create = (0, _lib.createShorthandFactory)(MenuItem, function (val) {
  return {
    content: val,
    name: val
  };
});