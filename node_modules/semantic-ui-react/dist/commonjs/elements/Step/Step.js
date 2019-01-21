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

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _StepContent = _interopRequireDefault(require("./StepContent"));

var _StepDescription = _interopRequireDefault(require("./StepDescription"));

var _StepGroup = _interopRequireDefault(require("./StepGroup"));

var _StepTitle = _interopRequireDefault(require("./StepTitle"));

/**
 * A step shows the completion status of an activity in a series of activities.
 */
var Step =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Step, _Component);

  function Step() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Step);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Step)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "computeElementType", function () {
      var onClick = _this.props.onClick;
      if (onClick) return 'a';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          completed = _this$props.completed,
          content = _this$props.content,
          description = _this$props.description,
          disabled = _this$props.disabled,
          href = _this$props.href,
          icon = _this$props.icon,
          link = _this$props.link,
          title = _this$props.title;
      var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(completed, 'completed'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(link, 'link'), 'step', className);
      var rest = (0, _lib.getUnhandledProps)(Step, this.props);
      var ElementType = (0, _lib.getElementType)(Step, this.props, this.computeElementType);

      if (!_lib.childrenUtils.isNil(children)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), children);
      }

      if (!_lib.childrenUtils.isNil(content)) {
        return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), content);
      }

      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        href: href,
        onClick: this.handleClick
      }), _Icon.default.create(icon, {
        autoGenerateKey: false
      }), _StepContent.default.create({
        description: description,
        title: title
      }, {
        autoGenerateKey: false
      }));
    }
  }]);
  return Step;
}(_react.Component);

(0, _defineProperty2.default)(Step, "Content", _StepContent.default);
(0, _defineProperty2.default)(Step, "Description", _StepDescription.default);
(0, _defineProperty2.default)(Step, "Group", _StepGroup.default);
(0, _defineProperty2.default)(Step, "Title", _StepTitle.default);
(0, _defineProperty2.default)(Step, "handledProps", ["active", "as", "children", "className", "completed", "content", "description", "disabled", "href", "icon", "link", "onClick", "ordered", "title"]);
Step.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A step can be highlighted as active. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A step can show that a user has completed it. */
  completed: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: _lib.customPropTypes.itemShorthand,

  /** Show that the Loader is inactive. */
  disabled: _propTypes.default.bool,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: _propTypes.default.string,

  /** Shorthand for Icon. */
  icon: _lib.customPropTypes.itemShorthand,

  /** A step can be link. */
  link: _propTypes.default.bool,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered: _propTypes.default.bool,

  /** Shorthand for StepTitle. */
  title: _lib.customPropTypes.itemShorthand
} : {};
Step.create = (0, _lib.createShorthandFactory)(Step, function (content) {
  return {
    content: content
  };
});
var _default = Step;
exports.default = _default;