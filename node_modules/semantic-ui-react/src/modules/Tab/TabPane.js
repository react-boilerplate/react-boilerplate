import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'
import Segment from '../../elements/Segment/Segment'

/**
 * A tab pane holds the content of a tab.
 */
function TabPane(props) {
  const { active, children, className, content, loading } = props

  const classes = cx(useKeyOnly(active, 'active'), useKeyOnly(loading, 'loading'), 'tab', className)
  const rest = getUnhandledProps(TabPane, props)
  const ElementType = getElementType(TabPane, props)

  const calculatedDefaultProps = {}
  if (ElementType === Segment) {
    calculatedDefaultProps.attached = 'bottom'
  }

  return (
    <ElementType {...calculatedDefaultProps} {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

TabPane.defaultProps = {
  as: Segment,
  active: true,
}

TabPane.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A tab pane can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A Tab.Pane can display a loading indicator. */
  loading: PropTypes.bool,
}

TabPane.create = createShorthandFactory(TabPane, content => ({ content }))

export default TabPane
