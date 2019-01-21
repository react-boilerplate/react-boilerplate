import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'

/**
 * Headers may contain subheaders.
 */
function HeaderSubheader(props) {
  const { children, className, content } = props
  const classes = cx('sub header', className)
  const rest = getUnhandledProps(HeaderSubheader, props)
  const ElementType = getElementType(HeaderSubheader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

HeaderSubheader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }))

export default HeaderSubheader
