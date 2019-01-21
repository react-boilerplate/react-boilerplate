import * as React from 'react'

import { SemanticCOLORS, SemanticICONS } from '../../generic'
import IconGroup from './IconGroup'

export type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'

export interface IconProps extends StrictIconProps {
  [key: string]: any
}

export interface StrictIconProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Formatted to appear bordered */
  bordered?: boolean

  /** Icon can formatted to appear circular. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** Color of the icon. */
  color?: SemanticCOLORS

  /** Icons can display a smaller corner icon. */
  corner?: boolean

  /** Show that the icon is inactive. */
  disabled?: boolean

  /** Fitted, without space to left or right of Icon. */
  fitted?: boolean

  /** Icon can flipped. */
  flipped?: 'horizontally' | 'vertically'

  /** Formatted to have its colors inverted for contrast. */
  inverted?: boolean

  /** Icon can be formatted as a link. */
  link?: boolean

  /** Icon can be used as a simple loader. */
  loading?: boolean

  /** Name of the icon. */
  name?: SemanticICONS

  /** Icon can rotated. */
  rotated?: 'clockwise' | 'counterclockwise'

  /** Size of the icon. */
  size?: IconSizeProp

  /** Icon can have an aria hidden. */
  'aria-hidden'?: string

  /** Icon can have an aria label. */
  'aria-label'?: string
}

declare class Icon extends React.PureComponent<IconProps, {}> {
  static Group: typeof IconGroup
}

export default Icon
