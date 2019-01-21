import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useValueAndKey,
  useVerticalAlignProp,
} from '../../lib'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'

/**
 * A list item can contain a content.
 */
function ListContent(props) {
  const { children, className, content, description, floated, header, verticalAlign } = props

  const classes = cx(
    useValueAndKey(floated, 'floated'),
    useVerticalAlignProp(verticalAlign),
    'content',
    className,
  )
  const rest = getUnhandledProps(ListContent, props)
  const ElementType = getElementType(ListContent, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {ListHeader.create(header)}
      {ListDescription.create(description)}
      {content}
    </ElementType>
  )
}

ListContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for ListDescription. */
  description: customPropTypes.itemShorthand,

  /** An list content can be floated left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** Shorthand for ListHeader. */
  header: customPropTypes.itemShorthand,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}

ListContent.create = createShorthandFactory(ListContent, content => ({ content }))

export default ListContent
