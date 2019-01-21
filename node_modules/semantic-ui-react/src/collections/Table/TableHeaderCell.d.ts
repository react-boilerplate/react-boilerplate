import * as React from 'react'
import { StrictTableCellProps } from './TableCell'

export interface TableHeaderCellProps extends StrictTableHeaderCellProps {
  [key: string]: any
}

export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional classes. */
  className?: string

  /** A header cell can be sorted in ascending or descending order. */
  sorted?: 'ascending' | 'descending'
}

declare const TableHeaderCell: React.StatelessComponent<TableHeaderCellProps>

export default TableHeaderCell
