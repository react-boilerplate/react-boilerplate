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
 * A divider visually segments content into groups.
 */
function Divider(props) {
  const {
    children,
    className,
    clearing,
    content,
    fitted,
    hidden,
    horizontal,
    inverted,
    section,
    vertical,
  } = props

  const classes = cx(
    'ui',
    useKeyOnly(clearing, 'clearing'),
    useKeyOnly(fitted, 'fitted'),
    useKeyOnly(hidden, 'hidden'),
    useKeyOnly(horizontal, 'horizontal'),
    useKeyOnly(inverted, 'inverted'),
    useKeyOnly(section, 'section'),
    useKeyOnly(vertical, 'vertical'),
    'divider',
    className,
  )
  const rest = getUnhandledProps(Divider, props)
  const ElementType = getElementType(Divider, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

Divider.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Divider can clear the content above it. */
  clearing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Divider can be fitted without any space above or below it. */
  fitted: PropTypes.bool,

  /** Divider can divide content without creating a dividing line. */
  hidden: PropTypes.bool,

  /** Divider can segment content horizontally. */
  horizontal: PropTypes.bool,

  /** Divider can have its colours inverted. */
  inverted: PropTypes.bool,

  /** Divider can provide greater margins to divide sections of content. */
  section: PropTypes.bool,

  /** Divider can segment content vertically. */
  vertical: PropTypes.bool,
}

export default Divider
