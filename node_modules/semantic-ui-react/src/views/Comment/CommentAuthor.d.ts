import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface CommentAuthorProps extends StrictCommentAuthorProps {
  [key: string]: any
}

export interface StrictCommentAuthorProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const CommentAuthor: React.StatelessComponent<CommentAuthorProps>

export default CommentAuthor
