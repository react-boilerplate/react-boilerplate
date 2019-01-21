import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _round from "lodash/round";
import _clamp from "lodash/clamp";
import _isUndefined from "lodash/isUndefined";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenUtils, createHTMLDivision, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useValueAndKey } from '../../lib';
/**
 * A progress bar shows the progression of a task.
 */

var Progress =
/*#__PURE__*/
function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Progress);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Progress)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calculatePercent", function () {
      var _this$props = _this.props,
          percent = _this$props.percent,
          total = _this$props.total,
          value = _this$props.value;
      if (!_isUndefined(percent)) return percent;
      if (!_isUndefined(total) && !_isUndefined(value)) return value / total * 100;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeValueText", function (percent) {
      var _this$props2 = _this.props,
          progress = _this$props2.progress,
          total = _this$props2.total,
          value = _this$props2.value;
      if (progress === 'value') return value;
      if (progress === 'ratio') return "".concat(value, "/").concat(total);
      return "".concat(percent, "%");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPercent", function () {
      var _this$props3 = _this.props,
          precision = _this$props3.precision,
          progress = _this$props3.progress,
          total = _this$props3.total,
          value = _this$props3.value;

      var percent = _clamp(_this.calculatePercent(), 0, 100);

      if (!_isUndefined(total) && !_isUndefined(value) && progress === 'value') {
        return value / total * 100;
      }

      if (progress === 'value') return value;
      if (_isUndefined(precision)) return percent;
      return _round(percent, precision);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isAutoSuccess", function () {
      var _this$props4 = _this.props,
          autoSuccess = _this$props4.autoSuccess,
          percent = _this$props4.percent,
          total = _this$props4.total,
          value = _this$props4.value;
      return autoSuccess && (percent >= 100 || value >= total);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderLabel", function () {
      var _this$props5 = _this.props,
          children = _this$props5.children,
          content = _this$props5.content,
          label = _this$props5.label;
      if (!childrenUtils.isNil(children)) return React.createElement("div", {
        className: "label"
      }, children);
      if (!childrenUtils.isNil(content)) return React.createElement("div", {
        className: "label"
      }, content);
      return createHTMLDivision(label, {
        autoGenerateKey: false,
        defaultProps: {
          className: 'label'
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderProgress", function (percent) {
      var _this$props6 = _this.props,
          precision = _this$props6.precision,
          progress = _this$props6.progress;
      if (!progress && _isUndefined(precision)) return;
      return React.createElement("div", {
        className: "progress"
      }, _this.computeValueText(percent));
    });

    return _this;
  }

  _createClass(Progress, [{
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          active = _this$props7.active,
          attached = _this$props7.attached,
          className = _this$props7.className,
          color = _this$props7.color,
          disabled = _this$props7.disabled,
          error = _this$props7.error,
          indicating = _this$props7.indicating,
          inverted = _this$props7.inverted,
          size = _this$props7.size,
          success = _this$props7.success,
          warning = _this$props7.warning;
      var classes = cx('ui', color, size, useKeyOnly(active || indicating, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(indicating, 'indicating'), useKeyOnly(inverted, 'inverted'), useKeyOnly(success || this.isAutoSuccess(), 'success'), useKeyOnly(warning, 'warning'), useValueAndKey(attached, 'attached'), 'progress', className);
      var rest = getUnhandledProps(Progress, this.props);
      var ElementType = getElementType(Progress, this.props);
      var percent = this.getPercent() || 0;
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        "data-percent": Math.floor(percent)
      }), React.createElement("div", {
        className: "bar",
        style: {
          width: "".concat(percent, "%")
        }
      }, this.renderProgress(percent)), this.renderLabel());
    }
  }]);

  return Progress;
}(Component);

_defineProperty(Progress, "handledProps", ["active", "as", "attached", "autoSuccess", "children", "className", "color", "content", "disabled", "error", "indicating", "inverted", "label", "percent", "precision", "progress", "size", "success", "total", "value", "warning"]);

Progress.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A progress bar can show activity. */
  active: PropTypes.bool,

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached: PropTypes.oneOf(['top', 'bottom']),

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A progress bar can have different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A progress bar be disabled. */
  disabled: PropTypes.bool,

  /** A progress bar can show a error state. */
  error: PropTypes.bool,

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating: PropTypes.bool,

  /** A progress bar can have its colors inverted. */
  inverted: PropTypes.bool,

  /** Can be set to either to display progress as percent or ratio. */
  label: customPropTypes.itemShorthand,

  /** Current percent complete. */
  percent: customPropTypes.every([customPropTypes.disallow(['total', 'value']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** Decimal point precision for calculated progress. */
  precision: PropTypes.number,

  /** A progress bar can contain a text value indicating current progress. */
  progress: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['percent', 'ratio', 'value'])]),

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'huge', 'massive')),

  /** A progress bar can show a success state. */
  success: PropTypes.bool,

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total: customPropTypes.every([customPropTypes.demand(['value']), customPropTypes.disallow(['percent']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value: customPropTypes.every([customPropTypes.disallow(['percent']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** A progress bar can show a warning state. */
  warning: PropTypes.bool
} : {};
export default Progress;