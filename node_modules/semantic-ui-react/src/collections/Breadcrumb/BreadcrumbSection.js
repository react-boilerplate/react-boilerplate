import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  getElementType,
  useKeyOnly,
} from '../../lib'

/**
 * A section sub-component for Breadcrumb component.
 */
export default class BreadcrumbSection extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Style as the currently active section. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: customPropTypes.every([customPropTypes.disallow(['link']), PropTypes.string]),

    /** Render as an `a` tag instead of a `div`. */
    link: customPropTypes.every([customPropTypes.disallow(['href']), PropTypes.bool]),

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,
  }

  computeElementType = () => {
    const { link, onClick } = this.props

    if (link || onClick) return 'a'
  }

  handleClick = e => _.invoke(this.props, 'onClick', e, this.props)

  render() {
    const { active, children, className, content, href } = this.props

    const classes = cx(useKeyOnly(active, 'active'), 'section', className)
    const rest = getUnhandledProps(BreadcrumbSection, this.props)
    const ElementType = getElementType(BreadcrumbSection, this.props, this.computeElementType)

    return (
      <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    )
  }
}

BreadcrumbSection.create = createShorthandFactory(BreadcrumbSection, content => ({
  content,
  link: true,
}))
