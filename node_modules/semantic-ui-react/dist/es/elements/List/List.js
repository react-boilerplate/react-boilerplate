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
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useVerticalAlignProp } from '../../lib';
import ListContent from './ListContent';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import ListIcon from './ListIcon';
import ListItem from './ListItem';
import ListList from './ListList';
/**
 * A list groups related content.
 */

var List =
/*#__PURE__*/
function (_Component) {
  _inherits(List, _Component);

  function List() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, List);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(List)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleItemOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, itemProps) {
          _invoke(predefinedProps, 'onClick', e, itemProps);

          _invoke(_this.props, 'onItemClick', e, itemProps);
        }
      };
    });

    return _this;
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          animated = _this$props.animated,
          bulleted = _this$props.bulleted,
          celled = _this$props.celled,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          divided = _this$props.divided,
          floated = _this$props.floated,
          horizontal = _this$props.horizontal,
          inverted = _this$props.inverted,
          items = _this$props.items,
          link = _this$props.link,
          ordered = _this$props.ordered,
          relaxed = _this$props.relaxed,
          selection = _this$props.selection,
          size = _this$props.size,
          verticalAlign = _this$props.verticalAlign;
      var classes = cx('ui', size, useKeyOnly(animated, 'animated'), useKeyOnly(bulleted, 'bulleted'), useKeyOnly(celled, 'celled'), useKeyOnly(divided, 'divided'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useKeyOnly(link, 'link'), useKeyOnly(ordered, 'ordered'), useKeyOnly(selection, 'selection'), useKeyOrValueAndKey(relaxed, 'relaxed'), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), 'list', className);
      var rest = getUnhandledProps(List, this.props);
      var ElementType = getElementType(List, this.props);

      if (!childrenUtils.isNil(children)) {
        return React.createElement(ElementType, _extends({
          role: "list",
          className: classes
        }, rest), children);
      }

      if (!childrenUtils.isNil(content)) {
        return React.createElement(ElementType, _extends({
          role: "list",
          className: classes
        }, rest), content);
      }

      return React.createElement(ElementType, _extends({
        role: "list",
        className: classes
      }, rest), _map(items, function (item) {
        return ListItem.create(item, {
          overrideProps: _this2.handleItemOverrides
        });
      }));
    }
  }]);

  return List;
}(Component);

_defineProperty(List, "Content", ListContent);

_defineProperty(List, "Description", ListDescription);

_defineProperty(List, "Header", ListHeader);

_defineProperty(List, "Icon", ListIcon);

_defineProperty(List, "Item", ListItem);

_defineProperty(List, "List", ListList);

_defineProperty(List, "handledProps", ["animated", "as", "bulleted", "celled", "children", "className", "content", "divided", "floated", "horizontal", "inverted", "items", "link", "onItemClick", "ordered", "relaxed", "selection", "size", "verticalAlign"]);

List.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A list can animate to set the current item apart from the list. */
  animated: PropTypes.bool,

  /** A list can mark items with a bullet. */
  bulleted: PropTypes.bool,

  /** A list can divide its items into cells. */
  celled: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A list can show divisions between content. */
  divided: PropTypes.bool,

  /** An list can be floated left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A list can be formatted to have items appear horizontally. */
  horizontal: PropTypes.bool,

  /** A list can be inverted to appear on a dark background. */
  inverted: PropTypes.bool,

  /** Shorthand array of props for ListItem. */
  items: customPropTypes.collectionShorthand,

  /** A list can be specially formatted for navigation links. */
  link: PropTypes.bool,

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** A list can be ordered numerically. */
  ordered: PropTypes.bool,

  /** A list can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** A selection list formats list items as possible choices. */
  selection: PropTypes.bool,

  /** A list can vary in size. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS)
} : {};
export default List;