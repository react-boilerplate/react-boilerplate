import * as React from 'react'
import { StrictTableHeaderProps } from './TableHeader'

export interface TableFooterProps extends StrictTableFooterProps {
  [key: string]: any
}

export interface StrictTableFooterProps extends StrictTableHeaderProps {
  /** An element type to render as (string or function). */
  as?: any
}

declare const TableFooter: React.StatelessComponent<TableFooterProps>

export default TableFooter
