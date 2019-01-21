import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _map from "lodash/map";
import _invoke from "lodash/invoke";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
/**
 * A modal can contain a row of actions.
 */

var ModalActions =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalActions, _Component);

  function ModalActions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ModalActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ModalActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleButtonOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, buttonProps) {
          _invoke(predefinedProps, 'onClick', e, buttonProps);

          _invoke(_this.props, 'onActionClick', e, buttonProps);
        }
      };
    });

    return _this;
  }

  _createClass(ModalActions, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          actions = _this$props.actions,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content;
      var classes = cx('actions', className);
      var rest = getUnhandledProps(ModalActions, this.props);
      var ElementType = getElementType(ModalActions, this.props);

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes
        }), children);
      }

      if (!childrenUtils.isNil(content)) {
        return React.createElement(ElementType, _extends({}, rest, {
          className: classes
        }), content);
      }

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), _map(actions, function (action) {
        return Button.create(action, {
          overrideProps: _this2.handleButtonOverrides
        });
      }));
    }
  }]);

  return ModalActions;
}(Component);

_defineProperty(ModalActions, "handledProps", ["actions", "as", "children", "className", "content", "onActionClick"]);

export { ModalActions as default };
ModalActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Array of shorthand buttons. */
  actions: customPropTypes.collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props from the clicked action.
   */
  onActionClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func])
} : {};
ModalActions.create = createShorthandFactory(ModalActions, function (actions) {
  return {
    actions: actions
  };
});