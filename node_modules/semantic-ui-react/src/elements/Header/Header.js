import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useValueAndKey,
  useTextAlignProp,
  useKeyOrValueAndKey,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'
import Image from '../../elements/Image'

import HeaderSubheader from './HeaderSubheader'
import HeaderContent from './HeaderContent'

/**
 * A header provides a short summary of content
 */
function Header(props) {
  const {
    attached,
    block,
    children,
    className,
    color,
    content,
    disabled,
    dividing,
    floated,
    icon,
    image,
    inverted,
    size,
    sub,
    subheader,
    textAlign,
  } = props

  const classes = cx(
    'ui',
    color,
    size,
    useKeyOnly(block, 'block'),
    useKeyOnly(disabled, 'disabled'),
    useKeyOnly(dividing, 'dividing'),
    useValueAndKey(floated, 'floated'),
    useKeyOnly(icon === true, 'icon'),
    useKeyOnly(image === true, 'image'),
    useKeyOnly(inverted, 'inverted'),
    useKeyOnly(sub, 'sub'),
    useKeyOrValueAndKey(attached, 'attached'),
    useTextAlignProp(textAlign),
    'header',
    className,
  )
  const rest = getUnhandledProps(Header, props)
  const ElementType = getElementType(Header, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  const iconElement = Icon.create(icon, { autoGenerateKey: false })
  const imageElement = Image.create(image, { autoGenerateKey: false })
  const subheaderElement = HeaderSubheader.create(subheader, { autoGenerateKey: false })

  if (iconElement || imageElement) {
    return (
      <ElementType {...rest} className={classes}>
        {iconElement || imageElement}
        {(content || subheaderElement) && (
          <HeaderContent>
            {content}
            {subheaderElement}
          </HeaderContent>
        )}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {subheaderElement}
    </ElementType>
  )
}

Header.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Attach header  to other content, like a segment. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** Format header to appear inside a content block. */
  block: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the header. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Show that the header is inactive. */
  disabled: PropTypes.bool,

  /** Divide header from the content below it. */
  dividing: PropTypes.bool,

  /** Header can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** Add an icon by icon name or pass an Icon. */
  icon: customPropTypes.every([
    customPropTypes.disallow(['image']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),

  /** Add an image by img src or pass an Image. */
  image: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),

  /** Inverts the color of the header for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Content headings are sized with em and are based on the font-size of their container. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'mini')),

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub: PropTypes.bool,

  /** Shorthand for Header.Subheader. */
  subheader: customPropTypes.itemShorthand,

  /** Align header content. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
}

Header.Content = HeaderContent
Header.Subheader = HeaderSubheader

export default Header
