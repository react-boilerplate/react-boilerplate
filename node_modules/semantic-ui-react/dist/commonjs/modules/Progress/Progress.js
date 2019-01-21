"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _round2 = _interopRequireDefault(require("lodash/round"));

var _clamp2 = _interopRequireDefault(require("lodash/clamp"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * A progress bar shows the progression of a task.
 */
var Progress =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Progress, _Component);

  function Progress() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Progress);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Progress)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "calculatePercent", function () {
      var _this$props = _this.props,
          percent = _this$props.percent,
          total = _this$props.total,
          value = _this$props.value;
      if (!(0, _isUndefined2.default)(percent)) return percent;
      if (!(0, _isUndefined2.default)(total) && !(0, _isUndefined2.default)(value)) return value / total * 100;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeValueText", function (percent) {
      var _this$props2 = _this.props,
          progress = _this$props2.progress,
          total = _this$props2.total,
          value = _this$props2.value;
      if (progress === 'value') return value;
      if (progress === 'ratio') return "".concat(value, "/").concat(total);
      return "".concat(percent, "%");
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getPercent", function () {
      var _this$props3 = _this.props,
          precision = _this$props3.precision,
          progress = _this$props3.progress,
          total = _this$props3.total,
          value = _this$props3.value;
      var percent = (0, _clamp2.default)(_this.calculatePercent(), 0, 100);

      if (!(0, _isUndefined2.default)(total) && !(0, _isUndefined2.default)(value) && progress === 'value') {
        return value / total * 100;
      }

      if (progress === 'value') return value;
      if ((0, _isUndefined2.default)(precision)) return percent;
      return (0, _round2.default)(percent, precision);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isAutoSuccess", function () {
      var _this$props4 = _this.props,
          autoSuccess = _this$props4.autoSuccess,
          percent = _this$props4.percent,
          total = _this$props4.total,
          value = _this$props4.value;
      return autoSuccess && (percent >= 100 || value >= total);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderLabel", function () {
      var _this$props5 = _this.props,
          children = _this$props5.children,
          content = _this$props5.content,
          label = _this$props5.label;
      if (!_lib.childrenUtils.isNil(children)) return _react.default.createElement("div", {
        className: "label"
      }, children);
      if (!_lib.childrenUtils.isNil(content)) return _react.default.createElement("div", {
        className: "label"
      }, content);
      return (0, _lib.createHTMLDivision)(label, {
        autoGenerateKey: false,
        defaultProps: {
          className: 'label'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderProgress", function (percent) {
      var _this$props6 = _this.props,
          precision = _this$props6.precision,
          progress = _this$props6.progress;
      if (!progress && (0, _isUndefined2.default)(precision)) return;
      return _react.default.createElement("div", {
        className: "progress"
      }, _this.computeValueText(percent));
    });
    return _this;
  }

  (0, _createClass2.default)(Progress, [{
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
      var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(active || indicating, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(indicating, 'indicating'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(success || this.isAutoSuccess(), 'success'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useValueAndKey)(attached, 'attached'), 'progress', className);
      var rest = (0, _lib.getUnhandledProps)(Progress, this.props);
      var ElementType = (0, _lib.getElementType)(Progress, this.props);
      var percent = this.getPercent() || 0;
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        "data-percent": Math.floor(percent)
      }), _react.default.createElement("div", {
        className: "bar",
        style: {
          width: "".concat(percent, "%")
        }
      }, this.renderProgress(percent)), this.renderLabel());
    }
  }]);
  return Progress;
}(_react.Component);

(0, _defineProperty2.default)(Progress, "handledProps", ["active", "as", "attached", "autoSuccess", "children", "className", "color", "content", "disabled", "error", "indicating", "inverted", "label", "percent", "precision", "progress", "size", "success", "total", "value", "warning"]);
Progress.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A progress bar can show activity. */
  active: _propTypes.default.bool,

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached: _propTypes.default.oneOf(['top', 'bottom']),

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A progress bar can have different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A progress bar be disabled. */
  disabled: _propTypes.default.bool,

  /** A progress bar can show a error state. */
  error: _propTypes.default.bool,

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating: _propTypes.default.bool,

  /** A progress bar can have its colors inverted. */
  inverted: _propTypes.default.bool,

  /** Can be set to either to display progress as percent or ratio. */
  label: _lib.customPropTypes.itemShorthand,

  /** Current percent complete. */
  percent: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['total', 'value']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** Decimal point precision for calculated progress. */
  precision: _propTypes.default.number,

  /** A progress bar can contain a text value indicating current progress. */
  progress: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['percent', 'ratio', 'value'])]),

  /** A progress bar can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'mini', 'huge', 'massive')),

  /** A progress bar can show a success state. */
  success: _propTypes.default.bool,

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total: _lib.customPropTypes.every([_lib.customPropTypes.demand(['value']), _lib.customPropTypes.disallow(['percent']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['percent']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** A progress bar can show a warning state. */
  warning: _propTypes.default.bool
} : {};
var _default = Progress;
exports.default = _default;