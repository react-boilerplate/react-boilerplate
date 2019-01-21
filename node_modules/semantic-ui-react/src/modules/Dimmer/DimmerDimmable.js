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

/**
 * A dimmable sub-component for Dimmer.
 */
function DimmerDimmable(props) {
  const { blurring, className, children, content, dimmed } = props

  const classes = cx(
    useKeyOnly(blurring, 'blurring'),
    useKeyOnly(dimmed, 'dimmed'),
    'dimmable',
    className,
  )
  const rest = getUnhandledProps(DimmerDimmable, props)
  const ElementType = getElementType(DimmerDimmable, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

DimmerDimmable.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A dimmable element can blur its contents. */
  blurring: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool,
}

export default DimmerDimmable
