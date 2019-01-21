import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface CommentGroupProps extends StrictCommentGroupProps {
  [key: string]: any
}

export interface StrictCommentGroupProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Comments can be collapsed, or hidden from view. */
  collapsed?: boolean

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Comments can hide extra information unless a user shows intent to interact with a comment */
  minimal?: boolean

  /** Comments can have different sizes. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'

  /** A comment list can be threaded to showing the relationship between conversations */
  threaded?: boolean
}

declare const CommentGroup: React.StatelessComponent<CommentGroupProps>

export default CommentGroup
