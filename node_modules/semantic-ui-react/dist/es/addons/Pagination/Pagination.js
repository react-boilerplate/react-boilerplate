import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _map from "lodash/map";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, createPaginationItems, customPropTypes, getUnhandledProps } from '../../lib';
import Menu from '../../collections/Menu';
import PaginationItem from './PaginationItem';
/**
 * A component to render a pagination.
 */

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemClick", function (e, _ref) {
      var nextActivePage = _ref.value;
      var prevActivePage = _this.state.activePage; // Heads up! We need the cast to the "number" type there, as `activePage` can be a string

      if (+prevActivePage === +nextActivePage) return;

      _this.trySetState({
        activePage: nextActivePage
      });

      _invoke(_this.props, 'onPageChange', e, _objectSpread({}, _this.props, {
        activePage: nextActivePage
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemOverrides", function (active, type, value) {
      return function (predefinedProps) {
        return {
          active: active,
          type: type,
          key: "".concat(type, "-").concat(value),
          onClick: function onClick(e, itemProps) {
            _invoke(predefinedProps, 'onClick', e, itemProps);

            _this.handleItemClick(e, itemProps);
          }
        };
      };
    });

    return _this;
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          ariaLabel = _this$props['aria-label'],
          boundaryRange = _this$props.boundaryRange,
          siblingRange = _this$props.siblingRange,
          totalPages = _this$props.totalPages;
      var activePage = this.state.activePage;
      var items = createPaginationItems({
        activePage: activePage,
        boundaryRange: boundaryRange,
        siblingRange: siblingRange,
        totalPages: totalPages
      });
      var rest = getUnhandledProps(Pagination, this.props);
      return React.createElement(Menu, _extends({}, rest, {
        "aria-label": ariaLabel,
        pagination: true,
        role: "navigation"
      }), _map(items, function (_ref2) {
        var active = _ref2.active,
            type = _ref2.type,
            value = _ref2.value;
        return PaginationItem.create(_this2.props[type], {
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
}(Component);

_defineProperty(Pagination, "autoControlledProps", ['activePage']);

_defineProperty(Pagination, "defaultProps", {
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

_defineProperty(Pagination, "Item", PaginationItem);

_defineProperty(Pagination, "handledProps", ["activePage", "aria-label", "boundaryRange", "defaultActivePage", "ellipsisItem", "firstItem", "lastItem", "nextItem", "onPageChange", "pageItem", "prevItem", "siblingRange", "totalPages"]);

export { Pagination as default };
Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can have an aria label. */
  'aria-label': PropTypes.string,

  /** Initial activePage value. */
  defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Index of the currently active page. */
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Number of always visible pages at the beginning and end. */
  boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A shorthand for PaginationItem. */
  ellipsisItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  firstItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  lastItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  nextItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  pageItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  prevItem: customPropTypes.itemShorthand,

  /**
   * Called on change of an active page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onPageChange: PropTypes.func,

  /** Number of always visible pages before and after the current one. */
  siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Total number of pages. */
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
} : {};