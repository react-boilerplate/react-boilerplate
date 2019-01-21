import _ from 'lodash'
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
  useKeyOnly,
  useTextAlignProp,
  useVerticalAlignProp,
  useWidthProp,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * A table row can have cells.
 */
function TableCell(props) {
  const {
    active,
    children,
    className,
    collapsing,
    content,
    disabled,
    error,
    icon,
    negative,
    positive,
    selectable,
    singleLine,
    textAlign,
    verticalAlign,
    warning,
    width,
  } = props

  const classes = cx(
    useKeyOnly(active, 'active'),
    useKeyOnly(collapsing, 'collapsing'),
    useKeyOnly(disabled, 'disabled'),
    useKeyOnly(error, 'error'),
    useKeyOnly(negative, 'negative'),
    useKeyOnly(positive, 'positive'),
    useKeyOnly(selectable, 'selectable'),
    useKeyOnly(singleLine, 'single line'),
    useKeyOnly(warning, 'warning'),
    useTextAlignProp(textAlign),
    useVerticalAlignProp(verticalAlign),
    useWidthProp(width, 'wide'),
    className,
  )
  const rest = getUnhandledProps(TableCell, props)
  const ElementType = getElementType(TableCell, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon)}
      {content}
    </ElementType>
  )
}

TableCell.defaultProps = {
  as: 'td',
}

TableCell.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A cell can be active or selected by a user. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A cell can be disabled. */
  disabled: PropTypes.bool,

  /** A cell may call attention to an error or a negative value. */
  error: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: customPropTypes.itemShorthand,

  /** A cell may let a user know whether a value is bad. */
  negative: PropTypes.bool,

  /** A cell may let a user know whether a value is good. */
  positive: PropTypes.bool,

  /** A cell can be selectable. */
  selectable: PropTypes.bool,

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table cell can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table cell can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A cell may warn a user. */
  warning: PropTypes.bool,

  /** A table can specify the width of individual columns independently. */
  width: PropTypes.oneOf(SUI.WIDTHS),
}

TableCell.create = createShorthandFactory(TableCell, content => ({ content }))

export default TableCell
