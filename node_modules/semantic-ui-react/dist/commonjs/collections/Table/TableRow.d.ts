import * as React from 'react'

import { SemanticShorthandCollection, SemanticVERTICALALIGNMENTS } from '../../generic'
import { TableCellProps } from './TableCell'

export interface TableRowProps extends StrictTableRowProps {
  [key: string]: any
}

export interface StrictTableRowProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A row can be active or selected by a user. */
  active?: boolean

  /** An element type to render as (string or function). */
  cellAs?: any

  /** Shorthand array of props for TableCell. */
  cells?: SemanticShorthandCollection<TableCellProps>

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A row can be disabled. */
  disabled?: boolean

  /** A row may call attention to an error or a negative value. */
  error?: boolean

  /** A row may let a user know whether a value is bad. */
  negative?: boolean

  /** A row may let a user know whether a value is good. */
  positive?: boolean

  /** A table row can adjust its text alignment. */
  textAlign?: 'center' | 'left' | 'right'

  /** A table row can adjust its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS

  /** A row may warn a user. */
  warning?: boolean
}

declare const TableRow: React.StatelessComponent<TableRowProps>

export default TableRow
