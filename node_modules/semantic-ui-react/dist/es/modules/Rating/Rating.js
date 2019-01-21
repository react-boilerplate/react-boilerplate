import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _times from "lodash/times";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly } from '../../lib';
import RatingIcon from './RatingIcon';
/**
 * A rating indicates user interest in content.
 */

var Rating =
/*#__PURE__*/
function (_Component) {
  _inherits(Rating, _Component);

  function Rating() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Rating);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Rating)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIconClick", function (e, _ref) {
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

      if (onRate) onRate(e, _objectSpread({}, _this.props, {
        rating: newRating
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIconMouseEnter", function (e, _ref2) {
      var index = _ref2.index;
      if (_this.props.disabled) return;

      _this.setState({
        selectedIndex: index,
        isSelecting: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseLeave", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _invoke.apply(void 0, [_this.props, 'onMouseLeave'].concat(args));

      if (_this.props.disabled) return;

      _this.setState({
        selectedIndex: -1,
        isSelecting: false
      });
    });

    return _this;
  }

  _createClass(Rating, [{
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
      var classes = cx('ui', icon, size, useKeyOnly(disabled, 'disabled'), useKeyOnly(isSelecting && !disabled && selectedIndex >= 0, 'selected'), 'rating', className);
      var rest = getUnhandledProps(Rating, this.props);
      var ElementType = getElementType(Rating, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        role: "radiogroup",
        onMouseLeave: this.handleMouseLeave
      }), _times(maxRating, function (i) {
        return React.createElement(RatingIcon, {
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
}(Component);

_defineProperty(Rating, "autoControlledProps", ['rating']);

_defineProperty(Rating, "defaultProps", {
  clearable: 'auto',
  maxRating: 1
});

_defineProperty(Rating, "Icon", RatingIcon);

_defineProperty(Rating, "handledProps", ["as", "className", "clearable", "defaultRating", "disabled", "icon", "maxRating", "onRate", "rating", "size"]);

export { Rating as default };
Rating.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]),

  /** The initial rating value. */
  defaultRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled: PropTypes.bool,

  /** A rating can use a set of star or heart icons. */
  icon: PropTypes.oneOf(['star', 'heart']),

  /** The total number of icons. */
  maxRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate: PropTypes.func,

  /** The current number of active icons. */
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big'))
} : {};