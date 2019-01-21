import * as React from 'react'
import { SemanticFLOATS, SemanticShorthandContent } from '../../generic'

export interface RailProps extends StrictRailProps {
  [key: string]: any
}

export interface StrictRailProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A rail can appear attached to the main viewport. */
  attached?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A rail can appear closer to the main viewport. */
  close?: boolean | 'very'

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A rail can create a division between itself and a container. */
  dividing?: boolean

  /** A rail can attach itself to the inside of a container. */
  internal?: boolean

  /** A rail can be presented on the left or right side of a container. */
  position: SemanticFLOATS

  /** A rail can have different sizes. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}

declare const Rail: React.StatelessComponent<RailProps>

export default Rail
