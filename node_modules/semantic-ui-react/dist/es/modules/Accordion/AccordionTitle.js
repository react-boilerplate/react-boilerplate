import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isNil from "lodash/isNil";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A title sub-component for Accordion component.
 */

var AccordionTitle =
/*#__PURE__*/
function (_Component) {
  _inherits(AccordionTitle, _Component);

  function AccordionTitle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AccordionTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccordionTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      return _invoke(_this.props, 'onClick', e, _this.props);
    });

    return _this;
  }

  _createClass(AccordionTitle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content;
      var classes = cx(useKeyOnly(active, 'active'), 'title', className);
      var rest = getUnhandledProps(AccordionTitle, this.props);
      var ElementType = getElementType(AccordionTitle, this.props);

      if (_isNil(content)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), children);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), React.createElement(Icon, {
        name: "dropdown"
      }), content);
    }
  }]);

  return AccordionTitle;
}(Component);

_defineProperty(AccordionTitle, "handledProps", ["active", "as", "children", "className", "content", "index", "onClick"]);

export { AccordionTitle as default };
AccordionTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Whether or not the title is in the open state. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** AccordionTitle index inside Accordion. */
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func
} : {};
AccordionTitle.create = createShorthandFactory(AccordionTitle, function (content) {
  return {
    content: content
  };
});