import * as React from 'react'

export interface PlaceholderImageProps extends StrictPlaceholderImageProps {
  [key: string]: any
}

export interface StrictPlaceholderImageProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional classes. */
  className?: string

  /** An image can modify size correctly with responsive styles. */
  square?: boolean

  /** An image can modify size correctly with responsive styles. */
  rectangular?: boolean
}

interface PlaceholderImageComponent extends React.StatelessComponent<PlaceholderImageProps> {}

declare const PlaceholderImage: PlaceholderImageComponent

export default PlaceholderImage
