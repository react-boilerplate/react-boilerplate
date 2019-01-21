import * as React from 'react'

import { SemanticShorthandCollection, SemanticShorthandContent } from '../../generic'
import { StepProps } from './Step'

export interface StepGroupProps extends StrictStepGroupProps {
  [key: string]: any
}

export interface StrictStepGroupProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Steps can be attached to other elements. */
  attached?: boolean | 'bottom' | 'top'

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A fluid step takes up the width of its container. */
  fluid?: boolean

  /** Shorthand array of props for Step. */
  items?: SemanticShorthandCollection<StepProps>

  /** A step can show a ordered sequence of steps. */
  ordered?: boolean

  /** Steps can have different sizes. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'

  /** A step can stack vertically only on smaller screens. */
  stackable?: 'tablet'

  /** A step can prevent itself from stacking on mobile. */
  unstackable?: boolean

  /** A step can be displayed stacked vertically. */
  vertical?: boolean

  /** Steps can be divided evenly inside their parent. */
  widths?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
}

declare const StepGroup: React.StatelessComponent<StepGroupProps>

export default StepGroup
