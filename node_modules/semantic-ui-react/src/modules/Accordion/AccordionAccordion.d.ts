import * as React from 'react'

import { SemanticShorthandCollection } from '../../generic'
import { AccordionPanelProps } from './AccordionPanel'
import { AccordionTitleProps } from './AccordionTitle'

export interface AccordionAccordionProps extends StrictAccordionAccordionProps {
  [key: string]: any
}

export interface StrictAccordionAccordionProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Index of the currently active panel. */
  activeIndex?: number | number[]

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | number[]

  /** Only allow one panel open at a time. */
  exclusive?: boolean

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {AccordionTitleProps} data - All item props.
   */
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void

  /** Shorthand array of props for Accordion. */
  panels?: SemanticShorthandCollection<AccordionPanelProps>
}

declare const AccordionAccordion: React.ComponentClass<AccordionAccordionProps>

export default AccordionAccordion
