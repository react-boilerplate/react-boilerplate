import * as React from 'react'

import { SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { CardDescriptionProps } from './CardDescription'
import { CardHeaderProps } from './CardHeader'
import { CardMetaProps } from './CardMeta'

export interface CardContentProps extends StrictCardContentProps {
  [key: string]: any
}

export interface StrictCardContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Shorthand for CardDescription. */
  description?: SemanticShorthandItem<CardDescriptionProps>

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra?: boolean

  /** Shorthand for CardHeader. */
  header?: SemanticShorthandItem<CardHeaderProps>

  /** Shorthand for CardMeta. */
  meta?: SemanticShorthandItem<CardMetaProps>

  /** A card content can adjust its text alignment. */
  textAlign?: 'center' | 'left' | 'right'
}

declare const CardContent: React.StatelessComponent<CardContentProps>

export default CardContent
