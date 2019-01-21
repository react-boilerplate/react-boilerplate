import * as React from 'react'
import {
  HtmlLabelProps,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'

export interface ProgressProps extends StrictProgressProps {
  [key: string]: any
}

export interface StrictProgressProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A progress bar can show activity. */
  active?: boolean

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached?: 'top' | 'bottom'

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A progress bar can have different colors. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A progress bar be disabled. */
  disabled?: boolean

  /** A progress bar can show a error state. */
  error?: boolean

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating?: boolean

  /** A progress bar can have its colors inverted. */
  inverted?: boolean

  /** Can be set to either to display progress as percent or ratio. */
  label?: SemanticShorthandItem<HtmlLabelProps>

  /** Current percent complete. */
  percent?: number | string

  /** Decimal point precision for calculated progress. */
  precision?: number

  /** A progress bar can contain a text value indicating current progress. */
  progress?: boolean | 'percent' | 'ratio' | 'value'

  /** A progress bar can vary in size. */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'big'

  /** A progress bar can show a success state. */
  success?: boolean

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total?: number | string

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value?: number | string

  /** A progress bar can show a warning state. */
  warning?: boolean
}

declare const Progress: React.ComponentClass<ProgressProps>

export default Progress
