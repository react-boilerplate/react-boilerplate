import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useWidthProp,
} from '../../lib'
import FormButton from './FormButton'
import FormCheckbox from './FormCheckbox'
import FormDropdown from './FormDropdown'
import FormField from './FormField'
import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormRadio from './FormRadio'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'

/**
 * A Form displays a set of related user input fields in a structured way.
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Message
 * @see Radio
 * @see Select
 * @see Visibility
 */
class Form extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** The HTML form action */
    action: PropTypes.string,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Automatically show any error Message children. */
    error: PropTypes.bool,

    /** A form can have its color inverted for contrast. */
    inverted: PropTypes.bool,

    /** Automatically show a loading indicator. */
    loading: PropTypes.bool,

    /** The HTML form submit handler. */
    onSubmit: PropTypes.func,

    /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
    reply: PropTypes.bool,

    /** A form can vary in size. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

    /** Automatically show any success Message children. */
    success: PropTypes.bool,

    /** A form can prevent itself from stacking on mobile. */
    unstackable: PropTypes.bool,

    /** Automatically show any warning Message children. */
    warning: PropTypes.bool,

    /** Forms can automatically divide fields to be equal width. */
    widths: PropTypes.oneOf(['equal']),
  }

  static defaultProps = {
    as: 'form',
  }

  static Field = FormField
  static Button = FormButton
  static Checkbox = FormCheckbox
  static Dropdown = FormDropdown
  static Group = FormGroup
  static Input = FormInput
  static Radio = FormRadio
  static Select = FormSelect
  static TextArea = FormTextArea

  handleSubmit = (e, ...args) => {
    const { action } = this.props

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (typeof action !== 'string') _.invoke(e, 'preventDefault')
    _.invoke(this.props, 'onSubmit', e, this.props, ...args)
  }

  render() {
    const {
      action,
      children,
      className,
      error,
      inverted,
      loading,
      reply,
      size,
      success,
      unstackable,
      warning,
      widths,
    } = this.props

    const classes = cx(
      'ui',
      size,
      useKeyOnly(error, 'error'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(loading, 'loading'),
      useKeyOnly(reply, 'reply'),
      useKeyOnly(success, 'success'),
      useKeyOnly(unstackable, 'unstackable'),
      useKeyOnly(warning, 'warning'),
      useWidthProp(widths, null, true),
      'form',
      className,
    )
    const rest = getUnhandledProps(Form, this.props)
    const ElementType = getElementType(Form, this.props)

    return (
      <ElementType {...rest} action={action} className={classes} onSubmit={this.handleSubmit}>
        {children}
      </ElementType>
    )
  }
}

export default Form
