import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { createShorthandFactory, getUnhandledProps } from '../../lib';
import Image from '../../elements/Image';
/**
 * An item can contain an image.
 */

function ItemImage(props) {
  var size = props.size;
  var rest = getUnhandledProps(ItemImage, props);
  return React.createElement(Image, _extends({}, rest, {
    size: size,
    ui: !!size,
    wrapped: true
  }));
}

ItemImage.handledProps = ["size"];
ItemImage.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An image may appear at different sizes. */
  size: Image.propTypes.size
} : {};
ItemImage.create = createShorthandFactory(ItemImage, function (src) {
  return {
    src: src
  };
});
export default ItemImage;