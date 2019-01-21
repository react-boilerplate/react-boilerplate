import * as React from 'react'

import {
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticWIDTHS,
} from '../../generic'
import { StatisticProps, StatisticSizeProp } from './Statistic'

export interface StatisticGroupProps extends StrictStatisticGroupProps {
  [key: string]: any
}

export interface StrictStatisticGroupProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A statistic group can be formatted to be different colors. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A statistic group can present its measurement horizontally. */
  horizontal?: boolean

  /** A statistic group can present its measurement horizontally. */
  inverted?: boolean

  /** Array of props for Statistic. */
  items?: SemanticShorthandCollection<StatisticProps>

  /** A statistic group can vary in size. */
  size?: StatisticSizeProp

  /** A statistic group can have its items divided evenly. */
  widths?: SemanticWIDTHS
}

declare const StatisticGroup: React.StatelessComponent<StatisticGroupProps>

export default StatisticGroup
