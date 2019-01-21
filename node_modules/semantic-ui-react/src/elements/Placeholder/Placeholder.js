import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'
import PlaceholderHeader from './PlaceholderHeader'
import PlaceholderImage from './PlaceholderImage'
import PlaceholderLine from './PlaceholderLine'
import PlaceholderParagraph from './PlaceholderParagraph'

/**
 * A placeholder is used to reserve splace for content that soon will appear in a layout.
 */
function Placeholder(props) {
  const { children, className, content, fluid, inverted } = props
  const classes = cx(
    'ui',
    useKeyOnly(fluid, 'fluid'),
    useKeyOnly(inverted, 'inverted'),
    'placeholder',
    className,
  )
  const rest = getUnhandledProps(Placeholder, props)
  const ElementType = getElementType(Placeholder, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

Placeholder.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: PropTypes.bool,

  /** A placeholder can have their colors inverted. */
  inverted: PropTypes.bool,
}

Placeholder.Header = PlaceholderHeader
Placeholder.Image = PlaceholderImage
Placeholder.Line = PlaceholderLine
Placeholder.Paragraph = PlaceholderParagraph

export default Placeholder
