import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface DimmerDimmableProps extends StrictDimmerDimmableProps {
  [key: string]: any
}

export interface StrictDimmerDimmableProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A dimmable element can blur its contents. */
  blurring?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Controls whether or not the dim is displayed. */
  dimmed?: boolean
}

declare const DimmerDimmable: React.ComponentClass<DimmerDimmableProps>

export default DimmerDimmable
