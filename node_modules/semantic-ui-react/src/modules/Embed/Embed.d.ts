import * as React from 'react'

import { HtmlIframeProps, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../../elements/Icon'

export interface EmbedProps extends StrictEmbedProps {
  [key: string]: any
}

export interface StrictEmbedProps {
  /** An element type to render as (string or function). */
  as?: any

  /** An embed can be active. */
  active?: boolean

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio?: '4:3' | '16:9' | '21:9'

  /** Setting to true or false will force autoplay. */
  autoplay?: boolean

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Initial value of active. */
  defaultActive?: boolean

  /** Whether to prefer HD content. */
  hd?: boolean

  /** Specifies an icon to use with placeholder content. */
  icon?: SemanticShorthandItem<IconProps>

  /** Specifies an id for source. */
  id?: string

  /** Shorthand for HTML iframe. */
  iframe?: SemanticShorthandItem<HtmlIframeProps>

  /**
   * Сalled on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: EmbedProps) => void

  /** A placeholder image for embed. */
  placeholder?: string

  /** Specifies a source to use. */
  source?: 'youtube' | 'vimeo'

  /** Specifies a url to use for embed. */
  url?: string
}

declare const Embed: React.ComponentClass<EmbedProps>

export default Embed
