import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isNil from "lodash/isNil";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, eventStack, getElementType, getUnhandledProps, isBrowser, shallowEqual } from '../../lib';
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

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Responsive)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fitsMaxWidth", function () {
      var maxWidth = _this.props.maxWidth;
      var width = _this.state.width;
      return _isNil(maxWidth) ? true : width <= maxWidth;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fitsMinWidth", function () {
      var minWidth = _this.props.minWidth;
      var width = _this.state.width;
      return _isNil(minWidth) ? true : width >= minWidth;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSafeState", function () {
      var _this2;

      return _this.mounted && (_this2 = _this).setState.apply(_this2, arguments);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isVisible", function () {
      return _this.fitsMinWidth() && _this.fitsMaxWidth();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function (e) {
      if (_this.ticking) return;
      _this.ticking = true;
      requestAnimationFrame(function () {
        return _this.handleUpdate(e);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUpdate", function (e) {
      _this.ticking = false;

      var width = _invoke(_this.props, 'getWidth');

      _this.setSafeState({
        width: width
      });

      _invoke(_this.props, 'onUpdate', e, _objectSpread({}, _this.props, {
        width: width
      }));
    });

    _this.state = {
      width: _invoke(_this.props, 'getWidth')
    };
    return _this;
  }

  _createClass(Responsive, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fireOnMount = this.props.fireOnMount;
      this.mounted = true;
      eventStack.sub('resize', this.handleResize, {
        target: 'window'
      });
      if (fireOnMount) this.handleUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      eventStack.unsub('resize', this.handleResize, {
        target: 'window'
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Update when any prop changes or the width changes. If width does not change, no update is required.
      return this.state.width !== nextState.width || !shallowEqual(this.props, nextProps);
    } // ----------------------------------------
    // Helpers
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var children = this.props.children;
      var ElementType = getElementType(Responsive, this.props);
      var rest = getUnhandledProps(Responsive, this.props);
      if (this.isVisible()) return React.createElement(ElementType, rest, children);
      return null;
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