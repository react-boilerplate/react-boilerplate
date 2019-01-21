import * as React from 'react'

import {
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import { DimmerProps } from '../../modules/Dimmer'
import { LabelProps } from '../Label'
import ImageGroup from './ImageGroup'

export interface ImageProps extends StrictImageProps {
  [key: string]: any
}

export interface StrictImageProps {
  /** An element type to render as (string or function). */
  as?: any

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered?: boolean

  /** An image can appear centered in a content block. */
  centered?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** An image may appear circular. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** An image can show that it is disabled and cannot be selected. */
  disabled?: boolean

  /** Shorthand for Dimmer. */
  dimmer?: SemanticShorthandItem<DimmerProps>

  /** An image can sit to the left or right of other content. */
  floated?: SemanticFLOATS

  /** An image can take up the width of its container. */
  fluid?: boolean

  /** An image can be hidden. */
  hidden?: boolean

  /** Renders the Image as an <a> tag with this href. */
  href?: string

  /** An image may appear inline. */
  inline?: boolean

  /** Shorthand for Label. */
  label?: SemanticShorthandItem<LabelProps>

  /** An image may appear rounded. */
  rounded?: boolean

  /** An image may appear at different sizes. */
  size?: SemanticSIZES

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced?: boolean | 'left' | 'right'

  /** Whether or not to add the ui className. */
  ui?: boolean

  /** An image can specify its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped?: boolean
}

interface ImageComponent extends React.StatelessComponent<ImageProps> {
  Group: typeof ImageGroup
}

declare const Image: ImageComponent

export default Image
