import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { AccordionContentProps } from './AccordionContent'
import { AccordionTitleProps } from './AccordionTitle'

export interface AccordionPanelProps extends StrictAccordionPanelProps {
  [key: string]: any
}

export interface StrictAccordionPanelProps {
  /** Whether or not the title is in the open state. */
  active?: boolean

  /** A shorthand for Accordion.Content. */
  content?: SemanticShorthandItem<AccordionContentProps>

  /** A panel index. */
  index?: number | string

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {AccordionTitleProps} data - All item props.
   */
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void

  /** A shorthand for Accordion.Title. */
  title?: SemanticShorthandItem<AccordionTitleProps>
}

declare class AccordionPanel extends React.Component<AccordionPanelProps, {}> {}

export default AccordionPanel
