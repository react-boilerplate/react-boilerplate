import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface SearchResultsProps extends StrictSearchResultsProps {
  [key: string]: any
}

export interface StrictSearchResultsProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const SearchResults: React.StatelessComponent<SearchResultsProps>

export default SearchResults
