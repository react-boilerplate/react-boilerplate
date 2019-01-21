import * as React from 'react'

import { HtmlSpanProps, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FlagProps } from '../../elements/Flag'
import { IconProps } from '../../elements/Icon'
import { ImageProps } from '../../elements/Image'
import { LabelProps } from '../../elements/Label'

export interface DropdownItemProps extends StrictDropdownItemProps {
  [key: string]: any
}

export interface StrictDropdownItemProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Style as the currently chosen item. */
  active?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Additional text with less emphasis. */
  description?: SemanticShorthandItem<HtmlSpanProps>

  /** A dropdown item can be disabled. */
  disabled?: boolean

  /** Shorthand for Flag. */
  flag?: SemanticShorthandItem<FlagProps>

  /** Shorthand for Icon. */
  icon?: SemanticShorthandItem<IconProps>

  /** Shorthand for Image. */
  image?: SemanticShorthandItem<ImageProps>

  /** Shorthand for Label. */
  label?: SemanticShorthandItem<LabelProps>

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DropdownItemProps) => void

  /**
   * The item currently selected by keyboard shortcut.
   * This is not the active item.
   */
  selected?: boolean

  /** Display text. */
  text?: SemanticShorthandContent

  /** Stored value. */
  value?: boolean | number | string
}

declare const DropdownItem: React.ComponentClass<DropdownItemProps>

export default DropdownItem
