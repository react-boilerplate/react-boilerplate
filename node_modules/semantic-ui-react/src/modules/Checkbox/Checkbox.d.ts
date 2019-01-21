import * as React from 'react'
import { HtmlLabelProps, SemanticShorthandItem } from '../../generic'

export interface CheckboxProps extends StrictCheckboxProps {
  [key: string]: any
}

export interface StrictCheckboxProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Whether or not checkbox is checked. */
  checked?: boolean

  /** Additional classes. */
  className?: string

  /** The initial value of checked. */
  defaultChecked?: boolean

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate?: boolean

  /** A checkbox can appear disabled and be unable to change states */
  disabled?: boolean

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted?: boolean

  /** A unique identifier. */
  id?: number | string

  /** Whether or not checkbox is indeterminate. */
  indeterminate?: boolean

  /** The text of the associated label element. */
  label?: SemanticShorthandItem<HtmlLabelProps>

  /** The HTML input name. */
  name?: string

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange?: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void

  /**
   * Called when the user presses down on the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void

  /**
   * Called when the user releases the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void

  /** Format as a radio element. This means it is an exclusive option. */
  radio?: boolean

  /** A checkbox can be read-only and unable to change states. */
  readOnly?: boolean

  /** Format to emphasize the current selection state. */
  slider?: boolean

  /** A checkbox can receive focus. */
  tabIndex?: number | string

  /** Format to show an on or off choice. */
  toggle?: boolean

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio'

  /** The HTML input value. */
  value?: number | string
}

declare const Checkbox: React.ComponentClass<CheckboxProps>

export default Checkbox
