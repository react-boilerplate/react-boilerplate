"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
var Embed =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Embed, _Component);

  function Embed() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Embed);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Embed)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      var active = _this.state.active;
      if (onClick) onClick(e, (0, _objectSpread2.default)({}, _this.props, {
        active: true
      }));
      if (!active) _this.trySetState({
        active: true
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Embed, [{
    key: "getSrc",
    value: function getSrc() {
      var _this$props = this.props,
          _this$props$autoplay = _this$props.autoplay,
          autoplay = _this$props$autoplay === void 0 ? true : _this$props$autoplay,
          _this$props$brandedUI = _this$props.brandedUI,
          brandedUI = _this$props$brandedUI === void 0 ? false : _this$props$brandedUI,
          _this$props$color = _this$props.color,
          color = _this$props$color === void 0 ? '#444444' : _this$props$color,
          _this$props$hd = _this$props.hd,
          hd = _this$props$hd === void 0 ? true : _this$props$hd,
          id = _this$props.id,
          source = _this$props.source,
          url = _this$props.url;

      if (source === 'youtube') {
        return ["//www.youtube.com/embed/".concat(id), '?autohide=true', "&amp;autoplay=".concat(autoplay), "&amp;color=".concat(encodeURIComponent(color)), "&amp;hq=".concat(hd), '&amp;jsapi=false', "&amp;modestbranding=".concat(brandedUI), "&amp;rel=".concat(brandedUI ? 0 : 1)].join('');
      }

      if (source === 'vimeo') {
        return ["//player.vimeo.com/video/".concat(id), '?api=false', "&amp;autoplay=".concat(autoplay), '&amp;byline=false', "&amp;color=".concat(encodeURIComponent(color)), '&amp;portrait=false', '&amp;title=false'].join('');
      }

      return url;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          aspectRatio = _this$props2.aspectRatio,
          className = _this$props2.className,
          icon = _this$props2.icon,
          placeholder = _this$props2.placeholder;
      var active = this.state.active;
      var classes = (0, _classnames.default)('ui', aspectRatio, (0, _lib.useKeyOnly)(active, 'active'), 'embed', className);
      var rest = (0, _lib.getUnhandledProps)(Embed, this.props);
      var ElementType = (0, _lib.getElementType)(Embed, this.props);
      var iconShorthand = icon !== undefined ? icon : 'video play';
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), _Icon.default.create(iconShorthand, {
        autoGenerateKey: false
      }), placeholder && _react.default.createElement("img", {
        className: "placeholder",
        src: placeholder
      }), this.renderEmbed());
    }
  }, {
    key: "renderEmbed",
    value: function renderEmbed() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          content = _this$props3.content,
          iframe = _this$props3.iframe,
          source = _this$props3.source;
      var active = this.state.active;
      if (!active) return null;
      if (!_lib.childrenUtils.isNil(children)) return _react.default.createElement("div", {
        className: "embed"
      }, children);
      if (!_lib.childrenUtils.isNil(content)) return _react.default.createElement("div", {
        className: "embed"
      }, content);
      return _react.default.createElement("div", {
        className: "embed"
      }, (0, _lib.createHTMLIframe)(_lib.childrenUtils.isNil(iframe) ? this.getSrc() : iframe, {
        defaultProps: {
          allowFullScreen: false,
          frameBorder: 0,
          height: '100%',
          scrolling: 'no',
          src: this.getSrc(),
          title: "Embedded content from ".concat(source, "."),
          width: '100%'
        },
        autoGenerateKey: false
      }));
    }
  }]);
  return Embed;
}(_lib.AutoControlledComponent);

exports.default = Embed;
(0, _defineProperty2.default)(Embed, "autoControlledProps", ['active']);
(0, _defineProperty2.default)(Embed, "handledProps", ["active", "as", "aspectRatio", "autoplay", "brandedUI", "children", "className", "color", "content", "defaultActive", "hd", "icon", "id", "iframe", "onClick", "placeholder", "source", "url"]);
Embed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** An embed can be active. */
  active: _propTypes.default.bool,

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio: _propTypes.default.oneOf(['4:3', '16:9', '21:9']),

  /** Setting to true or false will force autoplay. */
  autoplay: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.string]),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Initial value of active. */
  defaultActive: _propTypes.default.bool,

  /** Whether to prefer HD content. */
  hd: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Specifies an icon to use with placeholder content. */
  icon: _lib.customPropTypes.itemShorthand,

  /** Specifies an id for source. */
  id: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.string]),

  /** Shorthand for HTML iframe. */
  iframe: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _lib.customPropTypes.itemShorthand]),

  /**
   * Сalled on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick: _propTypes.default.func,

  /** A placeholder image for embed. */
  placeholder: _propTypes.default.string,

  /** Specifies a source to use. */
  source: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['sourceUrl']), _propTypes.default.oneOf(['youtube', 'vimeo'])]),

  /** Specifies a url to use for embed. */
  url: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['source']), _propTypes.default.string])
} : {};