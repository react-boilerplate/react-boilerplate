import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface SearchResultProps extends StrictSearchResultProps {
  [key: string]: any
}

export interface StrictSearchResultProps {
  /** An element type to render as (string or function). */
  as?: any

  /** The item currently selected by keyboard shortcut. */
  active?: boolean

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Additional text with less emphasis. */
  description?: string

  /** A unique identifier. */
  id?: number | string

  /** Add an image to the item. */
  image?: string

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultProps) => void

  /** Customized text for price. */
  price?: string

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer?: (props: SearchResultProps) => React.ReactElement<any>[]

  /** Display title. */
  title: string
}

declare const SearchResult: React.ComponentClass<SearchResultProps>

export default SearchResult
