import * as React from 'react'

import { SemanticCOLORS, SemanticFLOATS, SemanticShorthandContent } from '../../generic'
import StatisticGroup from './StatisticGroup'
import StatisticLabel from './StatisticLabel'
import StatisticValue from './StatisticValue'

export type StatisticSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'huge'

export interface StatisticProps extends StrictStatisticProps {
  [key: string]: any
}

export interface StrictStatisticProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A statistic can be formatted to be different colors. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A statistic can sit to the left or right of other content. */
  floated?: SemanticFLOATS

  /** A statistic can present its measurement horizontally. */
  horizontal?: boolean

  /** A statistic can be formatted to fit on a dark background. */
  inverted?: boolean

  /** Label content of the Statistic. */
  label?: SemanticShorthandContent

  /** A statistic can vary in size. */
  size?: StatisticSizeProp

  /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
  text?: boolean

  /** Value content of the Statistic. */
  value?: SemanticShorthandContent
}

interface StatisticComponent extends React.StatelessComponent<StatisticProps> {
  Group: typeof StatisticGroup
  Label: typeof StatisticLabel
  Value: typeof StatisticValue
}

declare const Statistic: StatisticComponent

export default Statistic
