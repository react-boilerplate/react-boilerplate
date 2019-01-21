import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import _get from "lodash/get";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createShorthandFactory, customPropTypes, getUnhandledProps } from '../../lib';
/**
 * A search item sub-component for Dropdown component.
 */

var DropdownSearchInput =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownSearchInput, _Component);

  function DropdownSearchInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownSearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownSearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var value = _get(e, 'target.value');

      _invoke(_this.props, 'onChange', e, _objectSpread({}, _this.props, {
        value: value
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _invoke(_this.props, 'inputRef', c);
    });

    return _this;
  }

  _createClass(DropdownSearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoComplete = _this$props.autoComplete,
          className = _this$props.className,
          tabIndex = _this$props.tabIndex,
          type = _this$props.type,
          value = _this$props.value;
      var classes = cx('search', className);
      var rest = getUnhandledProps(DropdownSearchInput, this.props);
      return React.createElement("input", _extends({}, rest, {
        "aria-autocomplete": "list",
        autoComplete: autoComplete,
        className: classes,
        onChange: this.handleChange,
        ref: this.handleRef,
        tabIndex: tabIndex,
        type: type,
        value: value
      }));
    }
  }]);

  return DropdownSearchInput;
}(Component);

_defineProperty(DropdownSearchInput, "defaultProps", {
  autoComplete: 'off',
  type: 'text'
});

_defineProperty(DropdownSearchInput, "handledProps", ["as", "autoComplete", "className", "inputRef", "tabIndex", "type", "value"]);

DropdownSearchInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An input can have the auto complete. */
  autoComplete: PropTypes.string,

  /** Additional classes. */
  className: PropTypes.string,

  /** A ref handler for input. */
  inputRef: PropTypes.func,

  /** An input can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The HTML input type. */
  type: PropTypes.string,

  /** Stored value. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : {};
DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, function (type) {
  return {
    type: type
  };
});
export default DropdownSearchInput;