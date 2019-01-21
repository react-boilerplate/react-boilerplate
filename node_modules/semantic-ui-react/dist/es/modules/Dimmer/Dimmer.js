import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createShorthandFactory, getUnhandledProps, isBrowser } from '../../lib';
import Portal from '../../addons/Portal';
import DimmerDimmable from './DimmerDimmable';
import DimmerInner from './DimmerInner';
/**
 * A dimmer hides distractions to focus attention on particular content.
 */

var Dimmer =
/*#__PURE__*/
function (_Component) {
  _inherits(Dimmer, _Component);

  function Dimmer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Dimmer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Dimmer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalMount", function () {
      if (!isBrowser()) return; // Heads up, IE doesn't support second argument in add()

      document.body.classList.add('dimmed');
      document.body.classList.add('dimmable');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalUnmount", function () {
      if (!isBrowser()) return; // Heads up, IE doesn't support second argument in add()

      document.body.classList.remove('dimmed');
      document.body.classList.remove('dimmable');
    });

    return _this;
  }

  _createClass(Dimmer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          page = _this$props.page;
      var rest = getUnhandledProps(Dimmer, this.props);

      if (page) {
        return React.createElement(Portal, {
          closeOnEscape: false,
          closeOnDocumentClick: false,
          onMount: this.handlePortalMount,
          onUnmount: this.handlePortalUnmount,
          open: active,
          openOnTriggerClick: false
        }, React.createElement(DimmerInner, _extends({}, rest, {
          active: active,
          page: page
        })));
      }

      return React.createElement(DimmerInner, _extends({}, rest, {
        active: active,
        page: page
      }));
    }
  }]);

  return Dimmer;
}(Component);

_defineProperty(Dimmer, "Dimmable", DimmerDimmable);

_defineProperty(Dimmer, "Inner", DimmerInner);

_defineProperty(Dimmer, "handledProps", ["active", "page"]);

export { Dimmer as default };
Dimmer.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool
} : {};
Dimmer.create = createShorthandFactory(Dimmer, function (value) {
  return {
    content: value
  };
});