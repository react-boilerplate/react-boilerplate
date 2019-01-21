import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface CommentContentProps extends StrictCommentContentProps {
  [key: string]: any
}

export interface StrictCommentContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const CommentContent: React.StatelessComponent<CommentContentProps>

export default CommentContent
