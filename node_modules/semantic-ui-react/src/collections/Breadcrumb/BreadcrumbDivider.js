import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  getElementType,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * A divider sub-component for Breadcrumb component.
 */
function BreadcrumbDivider(props) {
  const { children, className, content, icon } = props

  const classes = cx('divider', className)
  const rest = getUnhandledProps(BreadcrumbDivider, props)
  const ElementType = getElementType(BreadcrumbDivider, props)

  if (!_.isNil(icon)) {
    return Icon.create(icon, {
      defaultProps: { ...rest, className: classes },
      autoGenerateKey: false,
    })
  }

  if (!_.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? '/' : children}
    </ElementType>
  )
}

BreadcrumbDivider.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: customPropTypes.itemShorthand,
}

BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, icon => ({ icon }))

export default BreadcrumbDivider
