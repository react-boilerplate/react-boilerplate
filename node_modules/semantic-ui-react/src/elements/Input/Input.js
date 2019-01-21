import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Children, cloneElement, Component } from 'react'

import {
  childrenUtils,
  createHTMLInput,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  handleRef,
  partitionHTMLProps,
  SUI,
  useKeyOnly,
  useValueAndKey,
} from '../../lib'
import Button from '../../elements/Button'
import Icon from '../../elements/Icon'
import Label from '../../elements/Label'

/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */
class Input extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** An Input can be formatted to alert the user to an action they may perform. */
    action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** An action can appear along side an Input on the left or right. */
    actionPosition: PropTypes.oneOf(['left']),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** An Input field can show that it is disabled. */
    disabled: PropTypes.bool,

    /** An Input field can show the data contains errors. */
    error: PropTypes.bool,

    /** Take on the size of its container. */
    fluid: PropTypes.bool,

    /** An Input field can show a user is currently interacting with it. */
    focus: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** An Icon can appear inside an Input on the left or right. */
    iconPosition: PropTypes.oneOf(['left']),

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** Format to appear on dark backgrounds. */
    inverted: PropTypes.bool,

    /** Optional Label to display along side the Input. */
    label: customPropTypes.itemShorthand,

    /** A Label can appear outside an Input on the left or right. */
    labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),

    /** An Icon Input field can show that it is currently loading data. */
    loading: PropTypes.bool,

    /**
     * Called on change.
     *
     * @param {ChangeEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and a proposed value.
     */
    onChange: PropTypes.func,

    /** An Input can vary in size. */
    size: PropTypes.oneOf(SUI.SIZES),

    /** An Input can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Transparent Input has no background. */
    transparent: PropTypes.bool,

    /** The HTML input type. */
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  computeIcon = () => {
    const { loading, icon } = this.props

    if (!_.isNil(icon)) return icon
    if (loading) return 'spinner'
  }

  computeTabIndex = () => {
    const { disabled, tabIndex } = this.props

    if (!_.isNil(tabIndex)) return tabIndex
    if (disabled) return -1
  }

  focus = () => this.inputRef.focus()

  select = () => this.inputRef.select()

  handleChange = (e) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }

  handleChildOverrides = (child, defaultProps) => ({
    ...defaultProps,
    ...child.props,
    ref: (c) => {
      handleRef(child.ref, c)
      this.handleInputRef(c)
    },
  })

  handleInputRef = c => (this.inputRef = c)

  partitionProps = () => {
    const { disabled, type } = this.props

    const tabIndex = this.computeTabIndex()
    const unhandled = getUnhandledProps(Input, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled)

    return [
      {
        ...htmlInputProps,
        disabled,
        type,
        tabIndex,
        onChange: this.handleChange,
        ref: this.handleInputRef,
      },
      rest,
    ]
  }

  render() {
    const {
      action,
      actionPosition,
      children,
      className,
      disabled,
      error,
      fluid,
      focus,
      icon,
      iconPosition,
      input,
      inverted,
      label,
      labelPosition,
      loading,
      size,
      transparent,
      type,
    } = this.props

    const classes = cx(
      'ui',
      size,
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(error, 'error'),
      useKeyOnly(fluid, 'fluid'),
      useKeyOnly(focus, 'focus'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(loading, 'loading'),
      useKeyOnly(transparent, 'transparent'),
      useValueAndKey(actionPosition, 'action') || useKeyOnly(action, 'action'),
      useValueAndKey(iconPosition, 'icon') || useKeyOnly(icon || loading, 'icon'),
      useValueAndKey(labelPosition, 'labeled') || useKeyOnly(label, 'labeled'),
      'input',
      className,
    )
    const ElementType = getElementType(Input, this.props)
    const [htmlInputProps, rest] = this.partitionProps()

    // Render with children
    // ----------------------------------------
    if (!childrenUtils.isNil(children)) {
      // add htmlInputProps to the `<input />` child
      const childElements = _.map(Children.toArray(children), (child) => {
        if (child.type !== 'input') return child
        return cloneElement(child, this.handleChildOverrides(child, htmlInputProps))
      })

      return (
        <ElementType {...rest} className={classes}>
          {childElements}
        </ElementType>
      )
    }

    // Render Shorthand
    // ----------------------------------------
    const actionElement = Button.create(action, { autoGenerateKey: false })
    const labelElement = Label.create(label, {
      defaultProps: {
        className: cx(
          'label',
          // add 'left|right corner'
          _.includes(labelPosition, 'corner') && labelPosition,
        ),
      },
      autoGenerateKey: false,
    })

    return (
      <ElementType {...rest} className={classes}>
        {actionPosition === 'left' && actionElement}
        {labelPosition !== 'right' && labelElement}
        {createHTMLInput(input || type, { defaultProps: htmlInputProps, autoGenerateKey: false })}
        {Icon.create(this.computeIcon(), { autoGenerateKey: false })}
        {actionPosition !== 'left' && actionElement}
        {labelPosition === 'right' && labelElement}
      </ElementType>
    )
  }
}

Input.create = createShorthandFactory(Input, type => ({ type }))

export default Input
