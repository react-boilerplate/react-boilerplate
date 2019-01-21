import * as React from 'react'

import { StrictCheckboxProps } from '../../modules/Checkbox'
import { StrictFormFieldProps } from './FormField'

export interface FormCheckboxProps extends StrictFormCheckboxProps {
  [key: string]: any
}

export interface StrictFormCheckboxProps extends StrictFormFieldProps, StrictCheckboxProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A FormField control prop. */
  control?: any

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio'
}

declare const FormCheckbox: React.StatelessComponent<FormCheckboxProps>

export default FormCheckbox
