import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface DimmerInnerProps extends StrictDimmerInnerProps {
  [key: string]: any
}

export interface StrictDimmerInnerProps {
  /** An element type to render as (string or function). */
  as?: any

  /** An active dimmer will dim its parent container. */
  active?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A disabled dimmer cannot be activated */
  disabled?: boolean

  /**
   * Called when the dimmer is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void

  /** A dimmer can be formatted to have its colors inverted. */
  inverted?: boolean

  /** A dimmer can be formatted to be fixed to the page. */
  page?: boolean

  /** A dimmer can be controlled with simple prop. */
  simple?: boolean

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign?: 'bottom' | 'top'
}

declare class DimmerInner extends React.Component<DimmerInnerProps, {}> {}

export default DimmerInner
