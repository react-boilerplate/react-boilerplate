import * as React from 'react'

import { StrictRadioProps } from '../../addons/Radio'
import { StrictFormFieldProps } from './FormField'

export interface FormRadioProps extends StrictFormRadioProps {
  [key: string]: any
}

export interface StrictFormRadioProps extends StrictFormFieldProps, StrictRadioProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A FormField control prop. */
  control?: any

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio'
}

declare const FormRadio: React.StatelessComponent<FormRadioProps>

export default FormRadio
