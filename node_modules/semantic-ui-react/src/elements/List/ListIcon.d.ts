import * as React from 'react'

import { SemanticVERTICALALIGNMENTS } from '../../generic'
import { StrictIconProps } from '../Icon'

export interface ListIconProps extends StrictListIconProps {
  [key: string]: any
}

export interface StrictListIconProps extends StrictIconProps {
  /** Additional classes. */
  className?: string

  /** An element inside a list can be vertically aligned. */
  verticalAlign?: SemanticVERTICALALIGNMENTS
}

declare const ListIcon: React.StatelessComponent<ListIconProps>

export default ListIcon
