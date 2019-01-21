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

var _times2 = _interopRequireDefault(require("lodash/times"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _RatingIcon = _interopRequireDefault(require("./RatingIcon"));

/**
 * A rating indicates user interest in content.
 */
var Rating =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Rating, _Component);

  function Rating() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Rating);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Rating)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIconClick", function (e, _ref) {
      var index = _ref.index;
      var _this$props = _this.props,
          clearable = _this$props.clearable,
          disabled = _this$props.disabled,
          maxRating = _this$props.maxRating,
          onRate = _this$props.onRate;
      var rating = _this.state.rating;
      if (disabled) return; // default newRating is the clicked icon
      // allow toggling a binary rating
      // allow clearing ratings

      var newRating = index + 1;

      if (clearable === 'auto' && maxRating === 1) {
        newRating = +!rating;
      } else if (clearable === true && newRating === rating) {
        newRating = 0;
      } // set rating


      _this.trySetState({
        rating: newRating
      }, {
        isSelecting: false
      });

      if (onRate) onRate(e, (0, _objectSpread2.default)({}, _this.props, {
        rating: newRating
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIconMouseEnter", function (e, _ref2) {
      var index = _ref2.index;
      if (_this.props.disabled) return;

      _this.setState({
        selectedIndex: index,
        isSelecting: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseLeave", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _invoke2.default.apply(void 0, [_this.props, 'onMouseLeave'].concat(args));

      if (_this.props.disabled) return;

      _this.setState({
        selectedIndex: -1,
        isSelecting: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Rating, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          icon = _this$props2.icon,
          maxRating = _this$props2.maxRating,
          size = _this$props2.size;
      var _this$state = this.state,
          rating = _this$state.rating,
          selectedIndex = _this$state.selectedIndex,
          isSelecting = _this$state.isSelecting;
      var classes = (0, _classnames.default)('ui', icon, size, (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(isSelecting && !disabled && selectedIndex >= 0, 'selected'), 'rating', className);
      var rest = (0, _lib.getUnhandledProps)(Rating, this.props);
      var ElementType = (0, _lib.getElementType)(Rating, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        role: "radiogroup",
        onMouseLeave: this.handleMouseLeave
      }), (0, _times2.default)(maxRating, function (i) {
        return _react.default.createElement(_RatingIcon.default, {
          active: rating >= i + 1,
          "aria-checked": rating === i + 1,
          "aria-posinset": i + 1,
          "aria-setsize": maxRating,
          index: i,
          key: i,
          onClick: _this2.handleIconClick,
          onMouseEnter: _this2.handleIconMouseEnter,
          selected: selectedIndex >= i && isSelecting
        });
      }));
    }
  }]);
  return Rating;
}(_lib.AutoControlledComponent);

exports.default = Rating;
(0, _defineProperty2.default)(Rating, "autoControlledProps", ['rating']);
(0, _defineProperty2.default)(Rating, "defaultProps", {
  clearable: 'auto',
  maxRating: 1
});
(0, _defineProperty2.default)(Rating, "Icon", _RatingIcon.default);
(0, _defineProperty2.default)(Rating, "handledProps", ["as", "className", "clearable", "defaultRating", "disabled", "icon", "maxRating", "onRate", "rating", "size"]);
Rating.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _propTypes.default.string,

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['auto'])]),

  /** The initial rating value. */
  defaultRating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled: _propTypes.default.bool,

  /** A rating can use a set of star or heart icons. */
  icon: _propTypes.default.oneOf(['star', 'heart']),

  /** The total number of icons. */
  maxRating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate: _propTypes.default.func,

  /** The current number of active icons. */
  rating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A progress bar can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big'))
} : {};