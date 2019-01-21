import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, eventStack, getElementType, getUnhandledProps, isBrowser } from '../../lib';
import isVisible from './lib/isVisible';
/**
 * Responsive can control visibility of content.
 */

var Responsive =
/*#__PURE__*/
function (_Component) {
  _inherits(Responsive, _Component);

  function Responsive() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Responsive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Responsive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      visible: true
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function (e) {
      if (_this.ticking) return;
      _this.ticking = true;
      _this.frameId = requestAnimationFrame(function () {
        return _this.handleUpdate(e);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUpdate", function (e) {
      _this.ticking = false;
      var visible = _this.state.visible;

      var width = _invoke(_this.props, 'getWidth');

      var nextVisible = isVisible(width, _this.props);
      if (visible !== nextVisible) _this.setState({
        visible: nextVisible
      });

      _invoke(_this.props, 'onUpdate', e, _objectSpread({}, _this.props, {
        width: width
      }));
    });

    return _this;
  }

  _createClass(Responsive, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fireOnMount = this.props.fireOnMount;
      eventStack.sub('resize', this.handleResize, {
        target: 'window'
      });
      if (fireOnMount) this.handleUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventStack.unsub('resize', this.handleResize, {
        target: 'window'
      });
      cancelAnimationFrame(this.frameId);
    } // ----------------------------------------
    // Event handlers
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var children = this.props.children;
      var visible = this.state.visible;
      var ElementType = getElementType(Responsive, this.props);
      var rest = getUnhandledProps(Responsive, this.props);
      if (visible) return React.createElement(ElementType, rest, children);
      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var width = _invoke(props, 'getWidth');

      var visible = isVisible(width, props);
      return {
        visible: visible
      };
    }
  }]);

  return Responsive;
}(Component);

_defineProperty(Responsive, "defaultProps", {
  getWidth: function getWidth() {
    return isBrowser() ? window.innerWidth : 0;
  }
});

_defineProperty(Responsive, "onlyMobile", {
  minWidth: 320,
  maxWidth: 767
});

_defineProperty(Responsive, "onlyTablet", {
  minWidth: 768,
  maxWidth: 991
});

_defineProperty(Responsive, "onlyComputer", {
  minWidth: 992
});

_defineProperty(Responsive, "onlyLargeScreen", {
  minWidth: 1200,
  maxWidth: 1919
});

_defineProperty(Responsive, "onlyWidescreen", {
  minWidth: 1920
});

_defineProperty(Responsive, "handledProps", ["as", "children", "fireOnMount", "getWidth", "maxWidth", "minWidth", "onUpdate"]);

export { Responsive as default };
Responsive.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Fires callbacks immediately after mount. */
  fireOnMount: PropTypes.bool,

  /**
   * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
   * otherwise, assumes a width of 0.
   */
  getWidth: PropTypes.func,

  /** The maximum width at which content will be displayed. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The minimum width at which content will be displayed. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate: PropTypes.func
} : {};