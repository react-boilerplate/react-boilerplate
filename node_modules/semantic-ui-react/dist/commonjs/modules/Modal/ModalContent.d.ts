import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ModalContentProps extends StrictModalContentProps {
  [key: string]: any
}

export interface StrictModalContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A modal can contain image content. */
  image?: boolean

  /** A modal can use the entire size of the screen. */
  scrolling?: boolean
}

declare const ModalContent: React.StatelessComponent<ModalContentProps>

export default ModalContent
