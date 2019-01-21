import * as React from 'react'

import {
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import { IconProps } from '../../elements/Icon'

export interface TableCellProps extends StrictTableCellProps {
  [key: string]: any
}

export interface StrictTableCellProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A cell can be active or selected by a user. */
  active?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing?: boolean

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A cell can be disabled. */
  disabled?: boolean

  /** A cell may call attention to an error or a negative value. */
  error?: boolean

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon?: SemanticShorthandItem<IconProps>

  /** A cell may let a user know whether a value is bad. */
  negative?: boolean

  /** A cell may let a user know whether a value is good. */
  positive?: boolean

  /** A cell can be selectable. */
  selectable?: boolean

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine?: boolean

  /** A table cell can adjust its text alignment. */
  textAlign?: 'center' | 'left' | 'right'

  /** A table cell can adjust its text alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS

  /** A cell may warn a user. */
  warning?: boolean

  /** A table can specify the width of individual columns independently. */
  width?: SemanticWIDTHS
}

declare const TableCell: React.StatelessComponent<TableCellProps>

export default TableCell
