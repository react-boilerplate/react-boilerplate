import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _map from "lodash/map";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import _includes from "lodash/includes";
import _isArray from "lodash/isArray";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import AccordionPanel from './AccordionPanel';

var warnIfPropsAreInvalid = function warnIfPropsAreInvalid(props, state) {
  var exclusive = props.exclusive;
  var activeIndex = state.activeIndex;
  /* eslint-disable no-console */

  if (exclusive && typeof activeIndex !== 'number') {
    console.error('`activeIndex` must be a number if `exclusive` is true');
  } else if (!exclusive && !_isArray(activeIndex)) {
    console.error('`activeIndex` must be an array if `exclusive` is false');
  }
  /* eslint-enable no-console */

};
/**
 * An Accordion can contain sub-accordions.
 */


var AccordionAccordion =
/*#__PURE__*/
function (_Component) {
  _inherits(AccordionAccordion, _Component);

  function AccordionAccordion() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AccordionAccordion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccordionAccordion)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeNewIndex", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      if (exclusive) return index === activeIndex ? -1 : index; // check to see if index is in array, and remove it, if not then add it

      return _includes(activeIndex, index) ? _without(activeIndex, index) : _toConsumableArray(activeIndex).concat([index]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTitleClick", function (e, titleProps) {
      var index = titleProps.index;

      _this.trySetState({
        activeIndex: _this.computeNewIndex(index)
      });

      _invoke(_this.props, 'onTitleClick', e, titleProps);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isIndexActive", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      return exclusive ? activeIndex === index : _includes(activeIndex, index);
    });

    return _this;
  }

  _createClass(AccordionAccordion, [{
    key: "getInitialAutoControlledState",
    value: function getInitialAutoControlledState(_ref) {
      var exclusive = _ref.exclusive;
      return {
        activeIndex: exclusive ? -1 : []
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV !== 'production') {
        warnIfPropsAreInvalid(this.props, this.state);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (process.env.NODE_ENV !== 'production') {
        warnIfPropsAreInvalid(this.props, this.state);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          panels = _this$props.panels;
      var classes = cx('accordion', className);
      var rest = getUnhandledProps(AccordionAccordion, this.props);
      var ElementType = getElementType(AccordionAccordion, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), childrenUtils.isNil(children) ? _map(panels, function (panel, index) {
        return AccordionPanel.create(panel, {
          defaultProps: {
            active: _this2.isIndexActive(index),
            index: index,
            onTitleClick: _this2.handleTitleClick
          }
        });
      }) : children);
    }
  }]);

  return AccordionAccordion;
}(Component);

_defineProperty(AccordionAccordion, "defaultProps", {
  exclusive: true
});

_defineProperty(AccordionAccordion, "autoControlledProps", ['activeIndex']);

_defineProperty(AccordionAccordion, "handledProps", ["activeIndex", "as", "children", "className", "defaultActiveIndex", "exclusive", "onTitleClick", "panels"]);

export { AccordionAccordion as default };
AccordionAccordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Index of the currently active panel. */
  activeIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Only allow one panel open at a time. */
  exclusive: PropTypes.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** Shorthand array of props for Accordion. */
  panels: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(PropTypes.shape({
    content: customPropTypes.itemShorthand,
    title: customPropTypes.itemShorthand
  }))])
} : {};
AccordionAccordion.create = createShorthandFactory(AccordionAccordion, function (content) {
  return {
    content: content
  };
});