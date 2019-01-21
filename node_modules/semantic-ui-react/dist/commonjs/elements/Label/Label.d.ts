import * as React from 'react'

import {
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
} from '../../generic'
import { IconProps } from '../Icon'
import { default as LabelDetail, LabelDetailProps } from './LabelDetail'
import LabelGroup from './LabelGroup'

export interface LabelProps extends StrictLabelProps {
  [key: string]: any
}

export interface StrictLabelProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A label can be active. */
  active?: boolean

  /** A label can attach to a content segment. */
  attached?: 'top' | 'bottom' | 'top right' | 'top left' | 'bottom left' | 'bottom right'

  /** A label can reduce its complexity. */
  basic?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** A label can be circular. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** Color of the label. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A label can position itself in the corner of an element. */
  corner?: boolean | 'left' | 'right'

  /** Shorthand for LabelDetail. */
  detail?: SemanticShorthandItem<LabelDetailProps>

  /** Formats the label as a dot. */
  empty?: any

  /** Float above another element in the upper right corner. */
  floating?: boolean

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal?: boolean

  /** Add an icon by icon name or pass an <Icon /.> */
  icon?: SemanticShorthandItem<IconProps>

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image?: any

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void

  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onRemove?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void

  /** A label can point to content next to it. */
  pointing?: boolean | 'above' | 'below' | 'left' | 'right'

  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon?: SemanticShorthandItem<IconProps>

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon?: boolean | 'right'

  /** A label can have different sizes. */
  size?: SemanticSIZES

  /** A label can appear as a tag. */
  tag?: boolean
}

interface LabelComponent extends React.ComponentClass<LabelProps> {
  Detail: typeof LabelDetail
  Group: typeof LabelGroup
}

declare const Label: LabelComponent

export default Label
