import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * A title sub-component for Accordion component.
 */
export default class AccordionTitle extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Whether or not the title is in the open state. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** AccordionTitle index inside Accordion. */
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,
  }

  handleClick = e => _.invoke(this.props, 'onClick', e, this.props)

  render() {
    const { active, children, className, content } = this.props

    const classes = cx(useKeyOnly(active, 'active'), 'title', className)
    const rest = getUnhandledProps(AccordionTitle, this.props)
    const ElementType = getElementType(AccordionTitle, this.props)

    if (_.isNil(content)) {
      return (
        <ElementType {...rest} className={classes} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick}>
        <Icon name='dropdown' />
        {content}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory(AccordionTitle, content => ({ content }))
