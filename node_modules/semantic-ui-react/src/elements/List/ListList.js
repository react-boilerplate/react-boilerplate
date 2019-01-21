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
 * A list can contain a sub list.
 */
function ListList(props) {
  const { children, className, content } = props

  const rest = getUnhandledProps(ListList, props)
  const ElementType = getElementType(ListList, props)
  const classes = cx(useKeyOnly(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ListList.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

export default ListList
