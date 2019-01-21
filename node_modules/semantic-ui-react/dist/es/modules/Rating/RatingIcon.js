import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * An internal icon sub-component for Rating component
 */

var RatingIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(RatingIcon, _Component);

  function RatingIcon() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RatingIcon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RatingIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      _invoke(_this.props, 'onClick', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyUp", function (e) {
      _invoke(_this.props, 'onKeyUp', e, _this.props);

      switch (keyboardKey.getCode(e)) {
        case keyboardKey.Enter:
        case keyboardKey.Spacebar:
          e.preventDefault();

          _invoke(_this.props, 'onClick', e, _this.props);

          break;

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseEnter", function (e) {
      _invoke(_this.props, 'onMouseEnter', e, _this.props);
    });

    return _this;
  }

  _createClass(RatingIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          className = _this$props.className,
          selected = _this$props.selected;
      var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(selected, 'selected'), 'icon', className);
      var rest = getUnhandledProps(RatingIcon, this.props);
      var ElementType = getElementType(RatingIcon, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick,
        onKeyUp: this.handleKeyUp,
        onMouseEnter: this.handleMouseEnter,
        tabIndex: 0,
        role: "radio"
      }));
    }
  }]);

  return RatingIcon;
}(Component);

_defineProperty(RatingIcon, "defaultProps", {
  as: 'i'
});

_defineProperty(RatingIcon, "handledProps", ["active", "as", "className", "index", "onClick", "onKeyUp", "onMouseEnter", "selected"]);

export { RatingIcon as default };
RatingIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Indicates activity of an icon. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** An index of icon inside Rating. */
  index: PropTypes.number,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyUp: PropTypes.func,

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter: PropTypes.func,

  /** Indicates selection of an icon. */
  selected: PropTypes.bool
} : {};