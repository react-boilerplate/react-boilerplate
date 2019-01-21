import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';

function SearchCategory(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      renderer = props.renderer;
  var classes = cx(useKeyOnly(active, 'active'), 'category', className);
  var rest = getUnhandledProps(SearchCategory, props);
  var ElementType = getElementType(SearchCategory, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), React.createElement("div", {
    className: "name"
  }, renderer(props)), React.createElement("div", {
    className: "results"
  }, childrenUtils.isNil(children) ? content : children));
}

SearchCategory.handledProps = ["active", "as", "children", "className", "content", "name", "renderer", "results"];
SearchCategory.defaultProps = {
  renderer: function renderer(_ref) {
    var name = _ref.name;
    return name;
  }
};
SearchCategory.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Display name. */
  name: PropTypes.string,

  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable category contents.
   */
  renderer: PropTypes.func,

  /** Array of Search.Result props. */
  results: PropTypes.array
} : {};
export default SearchCategory;