import * as React from 'react'

import { StrictSelectProps } from '../../addons/Select'
import { DropdownItemProps } from '../../modules/Dropdown/DropdownItem'
import { StrictFormFieldProps } from './FormField'

export interface FormSelectProps extends StrictFormSelectProps {
  [key: string]: any
}

export interface StrictFormSelectProps extends StrictFormFieldProps, StrictSelectProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A FormField control prop. */
  control?: any

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: DropdownItemProps[]
}

declare const FormSelect: React.StatelessComponent<FormSelectProps>

export default FormSelect
