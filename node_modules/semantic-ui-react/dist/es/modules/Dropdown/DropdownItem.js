import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, createShorthand, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Flag from '../../elements/Flag';
import Icon from '../../elements/Icon';
import Image from '../../elements/Image';
import Label from '../../elements/Label';
/**
 * An item sub-component for Dropdown component.
 */

var DropdownItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      if (onClick) onClick(e, _this.props);
    });

    return _this;
  }

  _createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          disabled = _this$props.disabled,
          description = _this$props.description,
          flag = _this$props.flag,
          icon = _this$props.icon,
          image = _this$props.image,
          label = _this$props.label,
          selected = _this$props.selected,
          text = _this$props.text;
      var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(selected, 'selected'), 'item', className); // add default dropdown icon if item contains another menu

      var iconName = _isNil(icon) ? childrenUtils.someByType(children, 'DropdownMenu') && 'dropdown' : icon;
      var rest = getUnhandledProps(DropdownItem, this.props);
      var ElementType = getElementType(DropdownItem, this.props);
      var ariaOptions = {
        role: 'option',
        'aria-disabled': disabled,
        'aria-checked': active,
        'aria-selected': selected
      };

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, ariaOptions, {
          className: classes,
          onClick: this.handleClick
        }), children);
      }

      var flagElement = Flag.create(flag, {
        autoGenerateKey: false
      });
      var iconElement = Icon.create(iconName, {
        autoGenerateKey: false
      });
      var imageElement = Image.create(image, {
        autoGenerateKey: false
      });
      var labelElement = Label.create(label, {
        autoGenerateKey: false
      });
      var descriptionElement = createShorthand('span', function (val) {
        return {
          children: val
        };
      }, description, {
        defaultProps: {
          className: 'description'
        },
        autoGenerateKey: false
      });
      var textElement = createShorthand('span', function (val) {
        return {
          children: val
        };
      }, childrenUtils.isNil(content) ? text : content, {
        defaultProps: {
          className: 'text'
        },
        autoGenerateKey: false
      });
      return React.createElement(ElementType, _extends({}, rest, ariaOptions, {
        className: classes,
        onClick: this.handleClick
      }), imageElement, iconElement, flagElement, labelElement, descriptionElement, textElement);
    }
  }]);

  return DropdownItem;
}(Component);

_defineProperty(DropdownItem, "handledProps", ["active", "as", "children", "className", "content", "description", "disabled", "flag", "icon", "image", "label", "onClick", "selected", "text", "value"]);

DropdownItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Style as the currently chosen item. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: customPropTypes.itemShorthand,

  /** A dropdown item can be disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for Flag. */
  flag: customPropTypes.itemShorthand,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** Shorthand for Image. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * The item currently selected by keyboard shortcut.
   * This is not the active item.
   */
  selected: PropTypes.bool,

  /** Display text. */
  text: customPropTypes.contentShorthand,

  /** Stored value. */
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
} : {};
DropdownItem.create = createShorthandFactory(DropdownItem, function (opts) {
  return opts;
});
export default DropdownItem;