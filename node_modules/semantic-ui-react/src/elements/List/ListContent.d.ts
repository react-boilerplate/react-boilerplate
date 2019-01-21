import * as React from 'react'

import {
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { ListDescriptionProps } from './ListDescription'
import { ListHeaderProps } from './ListHeader'

export interface ListContentProps extends StrictListContentProps {
  [key: string]: any
}

export interface StrictListContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Shorthand for ListDescription. */
  description?: SemanticShorthandItem<ListDescriptionProps>

  /** An list content can be floated left or right. */
  floated?: SemanticFLOATS

  /** Shorthand for ListHeader. */
  header?: SemanticShorthandItem<ListHeaderProps>

  /** An element inside a list can be vertically aligned. */
  verticalAlign?: SemanticVERTICALALIGNMENTS
}

declare const ListContent: React.StatelessComponent<ListContentProps>

export default ListContent
