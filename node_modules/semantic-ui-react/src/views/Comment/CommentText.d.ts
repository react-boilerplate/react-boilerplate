import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface CommentTextProps extends StrictCommentTextProps {
  [key: string]: any
}

export interface StrictCommentTextProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const CommentText: React.StatelessComponent<CommentTextProps>

export default CommentText
