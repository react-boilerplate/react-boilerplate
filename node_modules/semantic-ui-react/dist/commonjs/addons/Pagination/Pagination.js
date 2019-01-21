"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Menu = _interopRequireDefault(require("../../collections/Menu"));

var _PaginationItem = _interopRequireDefault(require("./PaginationItem"));

/**
 * A component to render a pagination.
 */
var Pagination =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pagination, _Component);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemClick", function (e, _ref) {
      var nextActivePage = _ref.value;
      var prevActivePage = _this.state.activePage; // Heads up! We need the cast to the "number" type there, as `activePage` can be a string

      if (+prevActivePage === +nextActivePage) return;

      _this.trySetState({
        activePage: nextActivePage
      });

      (0, _invoke2.default)(_this.props, 'onPageChange', e, (0, _objectSpread2.default)({}, _this.props, {
        activePage: nextActivePage
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleItemOverrides", function (active, type, value) {
      return function (predefinedProps) {
        return {
          active: active,
          type: type,
          key: "".concat(type, "-").concat(value),
          onClick: function onClick(e, itemProps) {
            (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);

            _this.handleItemClick(e, itemProps);
          }
        };
      };
    });
    return _this;
  }

  (0, _createClass2.default)(Pagination, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          ariaLabel = _this$props['aria-label'],
          boundaryRange = _this$props.boundaryRange,
          siblingRange = _this$props.siblingRange,
          totalPages = _this$props.totalPages;
      var activePage = this.state.activePage;
      var items = (0, _lib.createPaginationItems)({
        activePage: activePage,
        boundaryRange: boundaryRange,
        siblingRange: siblingRange,
        totalPages: totalPages
      });
      var rest = (0, _lib.getUnhandledProps)(Pagination, this.props);
      return _react.default.createElement(_Menu.default, (0, _extends2.default)({}, rest, {
        "aria-label": ariaLabel,
        pagination: true,
        role: "navigation"
      }), (0, _map2.default)(items, function (_ref2) {
        var active = _ref2.active,
            type = _ref2.type,
            value = _ref2.value;
        return _PaginationItem.default.create(_this2.props[type], {
          defaultProps: {
            content: value,
            value: value
          },
          overrideProps: _this2.handleItemOverrides(active, type, value)
        });
      }));
    }
  }]);
  return Pagination;
}(_lib.AutoControlledComponent);

exports.default = Pagination;
(0, _defineProperty2.default)(Pagination, "autoControlledProps", ['activePage']);
(0, _defineProperty2.default)(Pagination, "defaultProps", {
  'aria-label': 'Pagination Navigation',
  boundaryRange: 1,
  ellipsisItem: '...',
  firstItem: {
    'aria-label': 'First item',
    content: '«'
  },
  lastItem: {
    'aria-label': 'Last item',
    content: '»'
  },
  nextItem: {
    'aria-label': 'Next item',
    content: '⟩'
  },
  pageItem: {},
  prevItem: {
    'aria-label': 'Previous item',
    content: '⟨'
  },
  siblingRange: 1
});
(0, _defineProperty2.default)(Pagination, "Item", _PaginationItem.default);
(0, _defineProperty2.default)(Pagination, "handledProps", ["activePage", "aria-label", "boundaryRange", "defaultActivePage", "ellipsisItem", "firstItem", "lastItem", "nextItem", "onPageChange", "pageItem", "prevItem", "siblingRange", "totalPages"]);
Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can have an aria label. */
  'aria-label': _propTypes.default.string,

  /** Initial activePage value. */
  defaultActivePage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Index of the currently active page. */
  activePage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Number of always visible pages at the beginning and end. */
  boundaryRange: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A shorthand for PaginationItem. */
  ellipsisItem: _lib.customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  firstItem: _lib.customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  lastItem: _lib.customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  nextItem: _lib.customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  pageItem: _lib.customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  prevItem: _lib.customPropTypes.itemShorthand,

  /**
   * Called on change of an active page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onPageChange: _propTypes.default.func,

  /** Number of always visible pages before and after the current one. */
  siblingRange: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Total number of pages. */
  totalPages: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
} : {};