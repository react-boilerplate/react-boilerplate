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

var _map2 = _interopRequireDefault(require("lodash/map"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _ListContent = _interopRequireDefault(require("./ListContent"));

var _ListDescription = _interopRequireDefault(require("./ListDescription"));

var _ListHeader = _interopRequireDefault(require("./ListHeader"));

var _ListIcon = _interopRequireDefault(require("./ListIcon"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _ListList = _interopRequireDefault(require("./ListList"));

/**
 * A list groups related content.
 */
var List =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(List, _Component);

  function List() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, List);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(List)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, itemProps) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);
          (0, _invoke2.default)(_this.props, 'onItemClick', e, itemProps);
        }
      };
    });
    return _this;
  }

  (0, _createClass2.default)(List, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          animated = _this$props.animated,
          bulleted = _this$props.bulleted,
          celled = _this$props.celled,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          divided = _this$props.divided,
          floated = _this$props.floated,
          horizontal = _this$props.horizontal,
          inverted = _this$props.inverted,
          items = _this$props.items,
          link = _this$props.link,
          ordered = _this$props.ordered,
          relaxed = _this$props.relaxed,
          selection = _this$props.selection,
          size = _this$props.size,
          verticalAlign = _this$props.verticalAlign;
      var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(animated, 'animated'), (0, _lib.useKeyOnly)(bulleted, 'bulleted'), (0, _lib.useKeyOnly)(celled, 'celled'), (0, _lib.useKeyOnly)(divided, 'divided'), (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(ordered, 'ordered'), (0, _lib.useKeyOnly)(selection, 'selection'), (0, _lib.useKeyOrValueAndKey)(relaxed, 'relaxed'), (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useVerticalAlignProp)(verticalAlign), 'list', className);
      var rest = (0, _lib.getUnhandledProps)(List, this.props);
      var ElementType = (0, _lib.getElementType)(List, this.props);

      if (!_lib.childrenUtils.isNil(children)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({
          role: "list",
          className: classes
        }, rest), children);
      }

      if (!_lib.childrenUtils.isNil(content)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({
          role: "list",
          className: classes
        }, rest), content);
      }

      return _react.default.createElement(ElementType, (0, _extends2.default)({
        role: "list",
        className: classes
      }, rest), (0, _map2.default)(items, function (item) {
        return _ListItem.default.create(item, {
          overrideProps: _this2.handleItemOverrides
        });
      }));
    }
  }]);
  return List;
}(_react.Component);

(0, _defineProperty2.default)(List, "Content", _ListContent.default);
(0, _defineProperty2.default)(List, "Description", _ListDescription.default);
(0, _defineProperty2.default)(List, "Header", _ListHeader.default);
(0, _defineProperty2.default)(List, "Icon", _ListIcon.default);
(0, _defineProperty2.default)(List, "Item", _ListItem.default);
(0, _defineProperty2.default)(List, "List", _ListList.default);
(0, _defineProperty2.default)(List, "handledProps", ["animated", "as", "bulleted", "celled", "children", "className", "content", "divided", "floated", "horizontal", "inverted", "items", "link", "onItemClick", "ordered", "relaxed", "selection", "size", "verticalAlign"]);
List.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A list can animate to set the current item apart from the list. */
  animated: _propTypes.default.bool,

  /** A list can mark items with a bullet. */
  bulleted: _propTypes.default.bool,

  /** A list can divide its items into cells. */
  celled: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A list can show divisions between content. */
  divided: _propTypes.default.bool,

  /** An list can be floated left or right. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A list can be formatted to have items appear horizontally. */
  horizontal: _propTypes.default.bool,

  /** A list can be inverted to appear on a dark background. */
  inverted: _propTypes.default.bool,

  /** Shorthand array of props for ListItem. */
  items: _lib.customPropTypes.collectionShorthand,

  /** A list can be specially formatted for navigation links. */
  link: _propTypes.default.bool,

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** A list can be ordered numerically. */
  ordered: _propTypes.default.bool,

  /** A list can relax its padding to provide more negative space. */
  relaxed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** A selection list formats list items as possible choices. */
  selection: _propTypes.default.bool,

  /** A list can vary in size. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES),

  /** An element inside a list can be vertically aligned. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS)
} : {};
var _default = List;
exports.default = _default;