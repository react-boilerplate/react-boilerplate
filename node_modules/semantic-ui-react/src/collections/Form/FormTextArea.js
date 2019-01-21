import React from 'react'

import { customPropTypes, getElementType, getUnhandledProps } from '../../lib'
import TextArea from '../../addons/TextArea'
import FormField from './FormField'

/**
 * Sugar for <Form.Field control={TextArea} />.
 * @see Form
 * @see TextArea
 */
function FormTextArea(props) {
  const { control } = props
  const rest = getUnhandledProps(FormTextArea, props)
  const ElementType = getElementType(FormTextArea, props)

  return <ElementType {...rest} control={control} />
}

FormTextArea.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A FormField control prop. */
  control: FormField.propTypes.control,
}

FormTextArea.defaultProps = {
  as: FormField,
  control: TextArea,
}

export default FormTextArea
