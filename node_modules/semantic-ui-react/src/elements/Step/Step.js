import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'

import StepContent from './StepContent'
import StepDescription from './StepDescription'
import StepGroup from './StepGroup'
import StepTitle from './StepTitle'

/**
 * A step shows the completion status of an activity in a series of activities.
 */
class Step extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A step can be highlighted as active. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A step can show that a user has completed it. */
    completed: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for StepDescription. */
    description: customPropTypes.itemShorthand,

    /** Show that the Loader is inactive. */
    disabled: PropTypes.bool,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: PropTypes.string,

    /** Shorthand for Icon. */
    icon: customPropTypes.itemShorthand,

    /** A step can be link. */
    link: PropTypes.bool,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A step can show a ordered sequence of steps. Passed from StepGroup. */
    ordered: PropTypes.bool,

    /** Shorthand for StepTitle. */
    title: customPropTypes.itemShorthand,
  }

  static Content = StepContent
  static Description = StepDescription
  static Group = StepGroup
  static Title = StepTitle

  computeElementType = () => {
    const { onClick } = this.props

    if (onClick) return 'a'
  }

  handleClick = (e) => {
    const { disabled } = this.props

    if (!disabled) _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const {
      active,
      children,
      className,
      completed,
      content,
      description,
      disabled,
      href,
      icon,
      link,
      title,
    } = this.props

    const classes = cx(
      useKeyOnly(active, 'active'),
      useKeyOnly(completed, 'completed'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(link, 'link'),
      'step',
      className,
    )
    const rest = getUnhandledProps(Step, this.props)
    const ElementType = getElementType(Step, this.props, this.computeElementType)

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    if (!childrenUtils.isNil(content)) {
      return (
        <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
          {content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
        {Icon.create(icon, { autoGenerateKey: false })}
        {StepContent.create({ description, title }, { autoGenerateKey: false })}
      </ElementType>
    )
  }
}

Step.create = createShorthandFactory(Step, content => ({ content }))

export default Step
