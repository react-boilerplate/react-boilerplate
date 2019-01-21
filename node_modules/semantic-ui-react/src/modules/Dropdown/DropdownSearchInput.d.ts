import * as React from 'react'

export interface DropdownSearchInputProps extends StrictDropdownSearchInputProps {
  [key: string]: any
}

export interface StrictDropdownSearchInputProps {
  /** An element type to render as (string or function). */
  as?: any

  /** An input can have the auto complete. */
  autoComplete?: string

  /** Additional classes. */
  className?: string

  /** A ref handler for input. */
  inputRef?: React.Ref<HTMLInputElement>

  /** An input can receive focus. */
  tabIndex?: number | string

  /** The HTML input type. */
  type?: string

  /** Stored value. */
  value?: number | string
}

declare const DropdownSearchInput: React.ComponentClass<DropdownSearchInputProps>

export default DropdownSearchInput
