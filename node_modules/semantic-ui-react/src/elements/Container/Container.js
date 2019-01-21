import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useTextAlignProp,
} from '../../lib'

/**
 * A container limits content to a maximum width.
 */
function Container(props) {
  const { children, className, content, fluid, text, textAlign } = props
  const classes = cx(
    'ui',
    useKeyOnly(text, 'text'),
    useKeyOnly(fluid, 'fluid'),
    useTextAlignProp(textAlign),
    'container',
    className,
  )
  const rest = getUnhandledProps(Container, props)
  const ElementType = getElementType(Container, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

Container.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Container has no maximum width. */
  fluid: PropTypes.bool,

  /** Reduce maximum width to more naturally accommodate text. */
  text: PropTypes.bool,

  /** Align container text. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
}

export default Container
