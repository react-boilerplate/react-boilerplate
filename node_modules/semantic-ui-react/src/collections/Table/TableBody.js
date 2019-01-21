import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, getElementType, getUnhandledProps } from '../../lib'

function TableBody(props) {
  const { children, className } = props
  const classes = cx(className)
  const rest = getUnhandledProps(TableBody, props)
  const ElementType = getElementType(TableBody, props)

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  )
}

TableBody.defaultProps = {
  as: 'tbody',
}

TableBody.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
}

export default TableBody
