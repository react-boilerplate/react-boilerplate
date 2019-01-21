import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, getUnhandledProps, useValueAndKey } from '../../lib'
import TableCell from './TableCell'

/**
 * A table can have a header cell.
 */
function TableHeaderCell(props) {
  const { as, className, sorted } = props
  const classes = cx(useValueAndKey(sorted, 'sorted'), className)
  const rest = getUnhandledProps(TableHeaderCell, props)

  return <TableCell {...rest} as={as} className={classes} />
}

TableHeaderCell.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** A header cell can be sorted in ascending or descending order. */
  sorted: PropTypes.oneOf(['ascending', 'descending']),
}

TableHeaderCell.defaultProps = {
  as: 'th',
}

export default TableHeaderCell
