import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { LabelProps } from '../../elements/Label'
import { StrictInputProps } from '../../elements/Input'
import { StrictFormFieldProps } from './FormField'

export interface FormInputProps extends StrictFormInputProps {
  [key: string]: any
}

export interface StrictFormInputProps extends StrictFormFieldProps, StrictInputProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A FormField control prop. */
  control?: any

  /** Shorthand for a Label. */
  label?: SemanticShorthandItem<LabelProps>
}

declare const FormInput: React.StatelessComponent<FormInputProps>

export default FormInput
