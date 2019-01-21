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
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, customPropTypes, doesNodeContainClick, getElementType, getUnhandledProps, useKeyOnly, useVerticalAlignProp } from '../../lib';
/**
 *
 */

var DimmerInner =
/*#__PURE__*/
function (_Component) {
  _inherits(DimmerInner, _Component);

  function DimmerInner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DimmerInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DimmerInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      _invoke(_this.props, 'onClick', e, _this.props);

      if (_this.contentRef && _this.contentRef !== e.target && doesNodeContainClick(_this.contentRef, e)) {
        return;
      }

      _invoke(_this.props, 'onClickOutside', e, _this.props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleContentRef", function (c) {
      return _this.contentRef = c;
    });

    return _this;
  }

  _createClass(DimmerInner, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var nextActive = _ref.active;
      var prevActive = this.props.active;
      if (prevActive !== nextActive) this.toggleStyles(nextActive);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var active = this.props.active;
      this.toggleStyles(active);
    }
  }, {
    key: "toggleStyles",
    value: function toggleStyles(active) {
      if (!this.ref) return;

      if (active) {
        this.ref.style.setProperty('display', 'flex', 'important');
        return;
      }

      this.ref.style.removeProperty('display');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          disabled = _this$props.disabled,
          inverted = _this$props.inverted,
          page = _this$props.page,
          simple = _this$props.simple,
          verticalAlign = _this$props.verticalAlign;
      var classes = cx('ui', useKeyOnly(active, 'active transition visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(inverted, 'inverted'), useKeyOnly(page, 'page'), useKeyOnly(simple, 'simple'), useVerticalAlignProp(verticalAlign), 'dimmer', className);
      var rest = getUnhandledProps(DimmerInner, this.props);
      var ElementType = getElementType(DimmerInner, this.props);
      var childrenContent = childrenUtils.isNil(children) ? content : children;
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick,
        ref: this.handleRef
      }), childrenContent && React.createElement("div", {
        className: "content",
        ref: this.handleContentRef
      }, childrenContent));
    }
  }]);

  return DimmerInner;
}(Component);

_defineProperty(DimmerInner, "handledProps", ["active", "as", "children", "className", "content", "disabled", "inverted", "onClick", "onClickOutside", "page", "simple", "verticalAlign"]);

export { DimmerInner as default };
DimmerInner.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A disabled dimmer cannot be activated */
  disabled: PropTypes.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside: PropTypes.func,

  /** A dimmer can be formatted to have its colors inverted. */
  inverted: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool,

  /** A dimmer can be controlled with simple prop. */
  simple: PropTypes.bool,

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign: PropTypes.oneOf(['bottom', 'top'])
} : {};