import * as React from 'react'

import { SemanticTEXTALIGNMENTS, SemanticVERTICALALIGNMENTS, SemanticWIDTHS } from '../../generic'
import GridColumn from './GridColumn'
import GridRow from './GridRow'

export type GridReversedProp =
  | string
  | 'computer'
  | 'computer vertically'
  | 'mobile'
  | 'mobile vertically'
  | 'tablet'
  | 'tablet vertically'

export interface GridProps extends StrictGridProps {
  [key: string]: any
}

export interface StrictGridProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A grid can have rows divided into cells. */
  celled?: boolean | 'internally'

  /** A grid can have its columns centered. */
  centered?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Represents column count per row in Grid. */
  columns?: SemanticWIDTHS | 'equal'

  /** A grid can be combined with a container to use avaiable layout and alignment. */
  container?: boolean

  /** A grid can have dividers between its columns. */
  divided?: boolean | 'vertically'

  /** A grid can double its column width on tablet and mobile sizes. */
  doubling?: boolean

  /** A grid's colors can be inverted. */
  inverted?: boolean

  /** A grid can preserve its vertical and horizontal gutters on first and last columns. */
  padded?: boolean | 'horizontally' | 'vertically'

  /** A grid can increase its gutters to allow for more negative space. */
  relaxed?: boolean | 'very'

  /** A grid can specify that its columns should reverse order at different device sizes. */
  reversed?: GridReversedProp

  /** A grid can have its columns stack on-top of each other after reaching mobile breakpoints. */
  stackable?: boolean

  /** An can stretch its contents to take up the entire grid height. */
  stretched?: boolean

  /** A grid can specify its text alignment. */
  textAlign?: SemanticTEXTALIGNMENTS

  /** A grid can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign?: SemanticVERTICALALIGNMENTS
}

interface GridComponent extends React.StatelessComponent<GridProps> {
  Column: typeof GridColumn
  Row: typeof GridRow
}

declare const Grid: GridComponent

export default Grid
