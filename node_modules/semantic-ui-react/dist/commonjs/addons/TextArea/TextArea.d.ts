import * as React from 'react'

export interface TextAreaProps extends StrictTextAreaProps {
  [key: string]: any
}

export interface StrictTextAreaProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Indicates whether height of the textarea fits the content or not. */
  autoHeight?: boolean

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void

  /**
   * Called on input.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void

  /** Indicates row count for a TextArea. */
  rows?: number | string

  /** Custom TextArea style. */
  style?: Object

  /** The value of the textarea. */
  value?: number | string
}

declare class TextArea extends React.Component<TextAreaProps, {}> {
  focus: () => void
}

export default TextArea
