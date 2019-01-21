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
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
import StepContent from './StepContent';
import StepDescription from './StepDescription';
import StepGroup from './StepGroup';
import StepTitle from './StepTitle';
/**
 * A step shows the completion status of an activity in a series of activities.
 */

var Step =
/*#__PURE__*/
function (_Component) {
  _inherits(Step, _Component);

  function Step() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Step)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeElementType", function () {
      var onClick = _this.props.onClick;
      if (onClick) return 'a';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) _invoke(_this.props, 'onClick', e, _this.props);
    });

    return _this;
  }

  _createClass(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          completed = _this$props.completed,
          content = _this$props.content,
          description = _this$props.description,
          disabled = _this$props.disabled,
          href = _this$props.href,
          icon = _this$props.icon,
          link = _this$props.link,
          title = _this$props.title;
      var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(completed, 'completed'), useKeyOnly(disabled, 'disabled'), useKeyOnly(link, 'link'), 'step', className);
      var rest = getUnhandledProps(Step, this.props);
      var ElementType = getElementType(Step, this.props, this.computeElementType);

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), children);
      }

      if (!childrenUtils.isNil(content)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), content);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        href: href,
        onClick: this.handleClick
      }), Icon.create(icon, {
        autoGenerateKey: false
      }), StepContent.create({
        description: description,
        title: title
      }, {
        autoGenerateKey: false
      }));
    }
  }]);

  return Step;
}(Component);

_defineProperty(Step, "Content", StepContent);

_defineProperty(Step, "Description", StepDescription);

_defineProperty(Step, "Group", StepGroup);

_defineProperty(Step, "Title", StepTitle);

_defineProperty(Step, "handledProps", ["active", "as", "children", "className", "completed", "content", "description", "disabled", "href", "icon", "link", "onClick", "ordered", "title"]);

Step.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A step can be highlighted as active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A step can show that a user has completed it. */
  completed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Show that the Loader is inactive. */
  disabled: PropTypes.bool,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** A step can be link. */
  link: PropTypes.bool,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered: PropTypes.bool,

  /** Shorthand for StepTitle. */
  title: customPropTypes.itemShorthand
} : {};
Step.create = createShorthandFactory(Step, function (content) {
  return {
    content: content
  };
});
export default Step;