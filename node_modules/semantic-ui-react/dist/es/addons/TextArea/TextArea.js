import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _sum from "lodash/sum";
import _invoke from "lodash/invoke";
import _get from "lodash/get";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */

var TextArea =
/*#__PURE__*/
function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", function () {
      return _this.ref.focus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var value = _get(e, 'target.value');

      _invoke(_this.props, 'onChange', e, _objectSpread({}, _this.props, {
        value: value
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInput", function (e) {
      var value = _get(e, 'target.value');

      _invoke(_this.props, 'onInput', e, _objectSpread({}, _this.props, {
        value: value
      }));

      _this.updateHeight();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeAutoHeightStyles", function () {
      _this.ref.style.height = null;
      _this.ref.style.resize = null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateHeight", function () {
      var autoHeight = _this.props.autoHeight;
      if (!_this.ref || !autoHeight) return;

      var _window$getComputedSt = window.getComputedStyle(_this.ref),
          minHeight = _window$getComputedSt.minHeight,
          borderBottomWidth = _window$getComputedSt.borderBottomWidth,
          borderTopWidth = _window$getComputedSt.borderTopWidth;

      var borderHeight = _sum([borderBottomWidth, borderTopWidth].map(function (x) {
        return parseFloat(x);
      })); // Measure the scrollHeight and update the height to match.


      _this.ref.style.height = 'auto';
      _this.ref.style.overflowY = 'hidden';
      _this.ref.style.height = "".concat(Math.max(parseFloat(minHeight), Math.ceil(_this.ref.scrollHeight + borderHeight)), "px");
      _this.ref.style.overflowY = '';
    });

    return _this;
  }

  _createClass(TextArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // removed autoHeight
      if (!this.props.autoHeight && prevProps.autoHeight) {
        this.removeAutoHeightStyles();
      } // added autoHeight or value changed


      if (this.props.autoHeight && !prevProps.autoHeight || prevProps.value !== this.props.value) {
        this.updateHeight();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoHeight = _this$props.autoHeight,
          rows = _this$props.rows,
          style = _this$props.style,
          value = _this$props.value;
      var rest = getUnhandledProps(TextArea, this.props);
      var ElementType = getElementType(TextArea, this.props);
      var resize = autoHeight ? 'none' : '';
      return React.createElement(ElementType, _extends({}, rest, {
        onChange: this.handleChange,
        onInput: this.handleInput,
        ref: this.handleRef,
        rows: rows,
        style: _objectSpread({
          resize: resize
        }, style),
        value: value
      }));
    }
  }]);

  return TextArea;
}(Component);

_defineProperty(TextArea, "defaultProps", {
  as: 'textarea',
  rows: 3
});

_defineProperty(TextArea, "handledProps", ["as", "autoHeight", "onChange", "onInput", "rows", "style", "value"]);

TextArea.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Indicates whether height of the textarea fits the content or not. */
  autoHeight: PropTypes.bool,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: PropTypes.func,

  /**
   * Called on input.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput: PropTypes.func,

  /** Indicates row count for a TextArea. */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Custom TextArea style. */
  style: PropTypes.object,

  /** The value of the textarea. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : {};
export default TextArea;