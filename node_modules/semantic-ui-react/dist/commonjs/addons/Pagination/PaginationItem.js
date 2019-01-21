"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _lib = require("../../lib");

var _MenuItem = _interopRequireDefault(require("../../collections/Menu/MenuItem"));

/**
 * An item of a pagination.
 */
var PaginationItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PaginationItem, _Component);

  function PaginationItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PaginationItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PaginationItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var type = _this.props.type;
      if (type !== 'ellipsisItem') (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleKeyDown", function (e) {
      (0, _invoke2.default)(_this.props, 'onKeyDown', e, _this.props);
      if (_keyboardKey.default.getCode(e) === _keyboardKey.default.Enter) (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleOverrides", function () {
      return {
        onClick: _this.handleClick,
        onKeyDown: _this.handleKeyDown
      };
    });
    return _this;
  }

  (0, _createClass2.default)(PaginationItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          type = _this$props.type;
      var disabled = this.props.disabled || type === 'ellipsisItem';
      return _MenuItem.default.create(this.props, {
        defaultProps: {
          active: active,
          disabled: disabled,
          'aria-current': active,
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? -1 : 0
        },
        overrideProps: this.handleOverrides
      });
    }
  }]);
  return PaginationItem;
}(_react.Component);

(0, _defineProperty2.default)(PaginationItem, "handledProps", ["active", "disabled", "onClick", "onKeyDown", "type"]);
PaginationItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can be active. */
  active: _propTypes.default.bool,

  /** A pagination item can be disabled. */
  disabled: _propTypes.default.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Called on key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyDown: _propTypes.default.func,

  /** A pagination should have a type. */
  type: _propTypes.default.oneOf(['ellipsisItem', 'firstItem', 'prevItem', 'pageItem', 'nextItem', 'lastItem'])
} : {};
PaginationItem.create = (0, _lib.createShorthandFactory)(PaginationItem, function (content) {
  return {
    content: content
  };
});
var _default = PaginationItem;
exports.default = _default;