import * as React from 'react'

import FormField from './FormField'
import FormButton from './FormButton'
import FormCheckbox from './FormCheckbox'
import FormDropdown from './FormDropdown'
import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormRadio from './FormRadio'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'

export interface FormProps extends StrictFormProps {
  [key: string]: any
}

export interface StrictFormProps {
  /** An element type to render as (string or function). */
  as?: any

  /** The HTML form action */
  action?: string

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Automatically show any error Message children. */
  error?: boolean

  /** A form can have its color inverted for contrast. */
  inverted?: boolean

  /** Automatically show a loading indicator. */
  loading?: boolean

  /** The HTML form submit handler. */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply?: boolean

  /** A form can vary in size. */
  size?: string

  /** Automatically show any success Message children. */
  success?: boolean

  /** A form can prevent itself from stacking on mobile. */
  unstackable?: boolean

  /** Automatically show any warning Message children. */
  warning?: boolean

  /** Forms can automatically divide fields to be equal width. */
  widths?: 'equal'
}

export interface FormComponent extends React.StatelessComponent<FormProps> {
  Field: typeof FormField
  Button: typeof FormButton
  Checkbox: typeof FormCheckbox
  Dropdown: typeof FormDropdown
  Group: typeof FormGroup
  Input: typeof FormInput
  Radio: typeof FormRadio
  Select: typeof FormSelect
  TextArea: typeof FormTextArea
}

declare const Form: FormComponent

export default Form
