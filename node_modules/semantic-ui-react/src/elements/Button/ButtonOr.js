import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * Button groups can contain conditionals.
 */
function ButtonOr(props) {
  const { className, text } = props
  const classes = cx('or', className)
  const rest = getUnhandledProps(ButtonOr, props)
  const ElementType = getElementType(ButtonOr, props)

  return <ElementType {...rest} className={classes} data-text={text} />
}

ButtonOr.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default ButtonOr
