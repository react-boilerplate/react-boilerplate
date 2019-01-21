import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createHTMLImage, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib'; // Note: You technically only need the 'content' wrapper when there's an
// image. However, optionally wrapping it makes this function a lot more
// complicated and harder to read. Since always wrapping it doesn't affect
// the style in any way let's just do that.
//
// Note: To avoid requiring a wrapping div, we return an array here so to
// prevent rendering issues each node needs a unique key.

var defaultRenderer = function defaultRenderer(_ref) {
  var image = _ref.image,
      price = _ref.price,
      title = _ref.title,
      description = _ref.description;
  return [image && React.createElement("div", {
    key: "image",
    className: "image"
  }, createHTMLImage(image, {
    autoGenerateKey: false
  })), React.createElement("div", {
    key: "content",
    className: "content"
  }, price && React.createElement("div", {
    className: "price"
  }, price), title && React.createElement("div", {
    className: "title"
  }, title), description && React.createElement("div", {
    className: "description"
  }, description))];
};

defaultRenderer.handledProps = [];

var SearchResult =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchResult, _Component);

  function SearchResult() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchResult);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchResult)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      if (onClick) onClick(e, _this.props);
    });

    return _this;
  }

  _createClass(SearchResult, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          className = _this$props.className,
          renderer = _this$props.renderer;
      var classes = cx(useKeyOnly(active, 'active'), 'result', className);
      var rest = getUnhandledProps(SearchResult, this.props);
      var ElementType = getElementType(SearchResult, this.props); // Note: You technically only need the 'content' wrapper when there's an
      // image. However, optionally wrapping it makes this function a lot more
      // complicated and harder to read. Since always wrapping it doesn't affect
      // the style in any way let's just do that.

      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), renderer(this.props));
    }
  }]);

  return SearchResult;
}(Component);

_defineProperty(SearchResult, "defaultProps", {
  renderer: defaultRenderer
});

_defineProperty(SearchResult, "handledProps", ["active", "as", "className", "content", "description", "id", "image", "onClick", "price", "renderer", "title"]);

export { SearchResult as default };
SearchResult.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: PropTypes.string,

  /** A unique identifier. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Add an image to the item. */
  image: PropTypes.string,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** Customized text for price. */
  price: PropTypes.string,

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer: PropTypes.func,

  /** Display title. */
  title: PropTypes.string.isRequired
} : {};