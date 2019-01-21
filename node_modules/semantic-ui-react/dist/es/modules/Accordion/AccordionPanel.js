import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { createShorthandFactory, customPropTypes } from '../../lib';
import AccordionTitle from './AccordionTitle';
import AccordionContent from './AccordionContent';
/**
 * A panel sub-component for Accordion component.
 */

var AccordionPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(AccordionPanel, _Component);

  function AccordionPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AccordionPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccordionPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTitleOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, titleProps) {
          _invoke(predefinedProps, 'onClick', e, titleProps);

          _invoke(_this.props, 'onTitleClick', e, titleProps);
        }
      };
    });

    return _this;
  }

  _createClass(AccordionPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          content = _this$props.content,
          index = _this$props.index,
          title = _this$props.title;
      return React.createElement(Fragment, null, AccordionTitle.create(title, {
        autoGenerateKey: false,
        defaultProps: {
          active: active,
          index: index
        },
        overrideProps: this.handleTitleOverrides
      }), AccordionContent.create(content, {
        autoGenerateKey: false,
        defaultProps: {
          active: active
        }
      }));
    }
  }]);

  return AccordionPanel;
}(Component);

_defineProperty(AccordionPanel, "handledProps", ["active", "content", "index", "onTitleClick", "title"]);

AccordionPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Whether or not the title is in the open state. */
  active: PropTypes.bool,

  /** A shorthand for Accordion.Content. */
  content: customPropTypes.itemShorthand,

  /** A panel index. */
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: PropTypes.func,

  /** A shorthand for Accordion.Title. */
  title: customPropTypes.itemShorthand
} : {};
AccordionPanel.create = createShorthandFactory(AccordionPanel, null);
export default AccordionPanel;