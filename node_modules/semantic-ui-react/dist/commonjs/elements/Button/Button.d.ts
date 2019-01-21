import * as React from 'react'

import {
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
} from '../../generic'
import { IconProps } from '../Icon'
import { LabelProps } from '../Label'
import ButtonContent from './ButtonContent'
import ButtonGroup from './ButtonGroup'
import ButtonOr from './ButtonOr'

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any
}

export interface StrictButtonProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A button can show it is currently the active user selection. */
  active?: boolean

  /** A button can animate to show hidden content. */
  animated?: boolean | 'fade' | 'vertical'

  /** A button can be attached to other content. */
  attached?: boolean | 'left' | 'right' | 'top' | 'bottom'

  /** A basic button is less pronounced. */
  basic?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** A button can be circular. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** A button can have different colors. */
  color?:
    | SemanticCOLORS
    | 'facebook'
    | 'google plus'
    | 'vk'
    | 'twitter'
    | 'linkedin'
    | 'instagram'
    | 'youtube'

  /** A button can reduce its padding to fit into tighter spaces. */
  compact?: boolean

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** A button can be aligned to the left or right of its container. */
  floated?: SemanticFLOATS

  /** A button can take the width of its container. */
  fluid?: boolean

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon?: boolean | SemanticShorthandItem<IconProps>

  /** A button can be formatted to appear on dark backgrounds. */
  inverted?: boolean

  /** Add a Label by text, props object, or pass a <Label />. */
  label?: SemanticShorthandItem<LabelProps>

  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition?: 'right' | 'left'

  /** A button can show a loading indicator. */
  loading?: boolean

  /** A button can hint towards a negative consequence. */
  negative?: boolean

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void

  /** A button can hint towards a positive consequence. */
  positive?: boolean

  /** A button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /** The role of the HTML element. */
  role?: string

  /** A button can be formatted to show different levels of emphasis. */
  secondary?: boolean

  /** A button can have different sizes. */
  size?: SemanticSIZES

  /** A button can receive focus. */
  tabIndex?: number | string

  /** A button can be formatted to toggle on and off. */
  toggle?: boolean
}

declare class Button extends React.Component<ButtonProps, {}> {
  static Content: typeof ButtonContent
  static Group: typeof ButtonGroup
  static Or: typeof ButtonOr

  focus: () => void
}

export default Button
