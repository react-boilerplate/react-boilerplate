"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Image = _interopRequireDefault(require("../../elements/Image"));

/**
 * An item can contain an image.
 */
function ItemImage(props) {
  var size = props.size;
  var rest = (0, _lib.getUnhandledProps)(ItemImage, props);
  return _react.default.createElement(_Image.default, (0, _extends2.default)({}, rest, {
    size: size,
    ui: !!size,
    wrapped: true
  }));
}

ItemImage.handledProps = ["size"];
ItemImage.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An image may appear at different sizes. */
  size: _Image.default.propTypes.size
} : {};
ItemImage.create = (0, _lib.createShorthandFactory)(ItemImage, function (src) {
  return {
    src: src
  };
});
var _default = ItemImage;
exports.default = _default;