import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'

function SearchCategory(props) {
  const { active, children, className, content, renderer } = props
  const classes = cx(useKeyOnly(active, 'active'), 'category', className)
  const rest = getUnhandledProps(SearchCategory, props)
  const ElementType = getElementType(SearchCategory, props)

  return (
    <ElementType {...rest} className={classes}>
      <div className='name'>{renderer(props)}</div>
      <div className='results'>{childrenUtils.isNil(children) ? content : children}</div>
    </ElementType>
  )
}

SearchCategory.defaultProps = {
  renderer: ({ name }) => name,
}

SearchCategory.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Display name. */
  name: PropTypes.string,

  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable category contents.
   */
  renderer: PropTypes.func,

  /** Array of Search.Result props. */
  results: PropTypes.array,
}

export default SearchCategory
