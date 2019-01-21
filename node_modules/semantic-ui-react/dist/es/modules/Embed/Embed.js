import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, childrenUtils, createHTMLIframe, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */

var Embed =
/*#__PURE__*/
function (_Component) {
  _inherits(Embed, _Component);

  function Embed() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Embed);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Embed)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var onClick = _this.props.onClick;
      var active = _this.state.active;
      if (onClick) onClick(e, _objectSpread({}, _this.props, {
        active: true
      }));
      if (!active) _this.trySetState({
        active: true
      });
    });

    return _this;
  }

  _createClass(Embed, [{
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
      var classes = cx('ui', aspectRatio, useKeyOnly(active, 'active'), 'embed', className);
      var rest = getUnhandledProps(Embed, this.props);
      var ElementType = getElementType(Embed, this.props);
      var iconShorthand = icon !== undefined ? icon : 'video play';
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), Icon.create(iconShorthand, {
        autoGenerateKey: false
      }), placeholder && React.createElement("img", {
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
      if (!childrenUtils.isNil(children)) return React.createElement("div", {
        className: "embed"
      }, children);
      if (!childrenUtils.isNil(content)) return React.createElement("div", {
        className: "embed"
      }, content);
      return React.createElement("div", {
        className: "embed"
      }, createHTMLIframe(childrenUtils.isNil(iframe) ? this.getSrc() : iframe, {
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
}(Component);

_defineProperty(Embed, "autoControlledProps", ['active']);

_defineProperty(Embed, "handledProps", ["active", "as", "aspectRatio", "autoplay", "brandedUI", "children", "className", "color", "content", "defaultActive", "hd", "icon", "id", "iframe", "onClick", "placeholder", "source", "url"]);

export { Embed as default };
Embed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An embed can be active. */
  active: PropTypes.bool,

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio: PropTypes.oneOf(['4:3', '16:9', '21:9']),

  /** Setting to true or false will force autoplay. */
  autoplay: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Initial value of active. */
  defaultActive: PropTypes.bool,

  /** Whether to prefer HD content. */
  hd: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Specifies an icon to use with placeholder content. */
  icon: customPropTypes.itemShorthand,

  /** Specifies an id for source. */
  id: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

  /** Shorthand for HTML iframe. */
  iframe: customPropTypes.every([customPropTypes.demand(['source']), customPropTypes.itemShorthand]),

  /**
   * Сalled on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick: PropTypes.func,

  /** A placeholder image for embed. */
  placeholder: PropTypes.string,

  /** Specifies a source to use. */
  source: customPropTypes.every([customPropTypes.disallow(['sourceUrl']), PropTypes.oneOf(['youtube', 'vimeo'])]),

  /** Specifies a url to use for embed. */
  url: customPropTypes.every([customPropTypes.disallow(['source']), PropTypes.string])
} : {};