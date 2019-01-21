import * as React from 'react'

import DimmerDimmable from './DimmerDimmable'
import DimmerInner from './DimmerInner'

export interface DimmerProps extends StrictDimmerProps {
  [key: string]: any
}

export interface StrictDimmerProps {
  /** An active dimmer will dim its parent container. */
  active?: boolean

  /** A dimmer can be formatted to be fixed to the page. */
  page?: boolean
}

interface DimmerComponent extends React.ComponentClass<DimmerProps> {
  Dimmable: typeof DimmerDimmable
  Inner: typeof DimmerInner
}

declare const Dimmer: DimmerComponent

export default Dimmer
