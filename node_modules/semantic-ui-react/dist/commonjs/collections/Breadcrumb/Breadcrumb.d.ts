import * as React from 'react'

import {
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
import BreadcrumbDivider from './BreadcrumbDivider'
import { default as BreadcrumbSection, BreadcrumbSectionProps } from './BreadcrumbSection'

export interface BreadcrumbProps extends StrictBreadcrumbProps {
  [key: string]: any
}

export interface StrictBreadcrumbProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider?: SemanticShorthandContent

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider.
   */
  icon?: SemanticShorthandItem<IconProps>

  /** Shorthand array of props for Breadcrumb.Section. */
  sections?: SemanticShorthandCollection<BreadcrumbSectionProps>

  /** Size of Breadcrumb */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}

interface BreadcrumbComponent extends React.ComponentClass<BreadcrumbProps> {
  Divider: typeof BreadcrumbDivider
  Section: typeof BreadcrumbSection
}

declare const Breadcrumb: BreadcrumbComponent

export default Breadcrumb
