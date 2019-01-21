import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  AutoControlledComponent as Component,
  createHTMLLabel,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  htmlInputAttrs,
  makeDebugger,
  partitionHTMLProps,
  useKeyOnly,
} from '../../lib'

const debug = makeDebugger('checkbox')

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */
export default class Checkbox extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Whether or not checkbox is checked. */
    checked: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** The initial value of checked. */
    defaultChecked: PropTypes.bool,

    /** Whether or not checkbox is indeterminate. */
    defaultIndeterminate: PropTypes.bool,

    /** A checkbox can appear disabled and be unable to change states */
    disabled: PropTypes.bool,

    /** Removes padding for a label. Auto applied when there is no label. */
    fitted: PropTypes.bool,

    /** A unique identifier. */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Whether or not checkbox is indeterminate. */
    indeterminate: PropTypes.bool,

    /** The text of the associated label element. */
    label: customPropTypes.itemShorthand,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * Called when the user attempts to change the checked state.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed checked/indeterminate state.
     */
    onChange: PropTypes.func,

    /**
     * Called when the checkbox or label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onClick: PropTypes.func,

    /**
     * Called when the user presses down on the mouse.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onMouseDown: PropTypes.func,

    /** Format as a radio element. This means it is an exclusive option. */
    radio: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['slider', 'toggle'])]),

    /** A checkbox can be read-only and unable to change states. */
    readOnly: PropTypes.bool,

    /** Format to emphasize the current selection state. */
    slider: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'toggle'])]),

    /** A checkbox can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Format to show an on or off choice. */
    toggle: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'slider'])]),

    /** HTML input type, either checkbox or radio. */
    type: PropTypes.oneOf(['checkbox', 'radio']),

    /** The HTML input value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    type: 'checkbox',
  }

  static autoControlledProps = ['checked', 'indeterminate']

  componentDidMount() {
    this.setIndeterminate()
  }

  componentDidUpdate() {
    this.setIndeterminate()
  }

  canToggle = () => {
    const { disabled, radio, readOnly } = this.props
    const { checked } = this.state

    return !disabled && !readOnly && !(radio && checked)
  }

  computeTabIndex = () => {
    const { disabled, tabIndex } = this.props

    if (!_.isNil(tabIndex)) return tabIndex
    return disabled ? -1 : 0
  }

  handleContainerClick = (e) => {
    const { id } = this.props

    if (_.isNil(id)) this.handleClick(e)
  }

  handleInputClick = (e) => {
    const { id } = this.props

    if (id) this.handleClick(e)
  }

  handleInputRef = c => (this.inputRef = c)

  handleClick = (e) => {
    debug('handleClick()')
    const { checked, indeterminate } = this.state

    if (!this.canToggle()) return

    _.invoke(this.props, 'onClick', e, {
      ...this.props,
      checked: !checked,
      indeterminate: !!indeterminate,
    })
    _.invoke(this.props, 'onChange', e, { ...this.props, checked: !checked, indeterminate: false })

    this.trySetState({ checked: !checked, indeterminate: false })
  }

  handleMouseDown = (e) => {
    debug('handleMouseDown()')
    const { checked, indeterminate } = this.state

    _.invoke(this.props, 'onMouseDown', e, {
      ...this.props,
      checked: !!checked,
      indeterminate: !!indeterminate,
    })
    _.invoke(this.inputRef, 'focus')

    e.preventDefault()
  }

  // Note: You can't directly set the indeterminate prop on the input, so we
  // need to maintain a ref to the input and set it manually whenever the
  // component updates.
  setIndeterminate = () => {
    const { indeterminate } = this.state

    if (this.inputRef) this.inputRef.indeterminate = !!indeterminate
  }

  render() {
    const {
      className,
      disabled,
      label,
      id,
      name,
      radio,
      readOnly,
      slider,
      toggle,
      type,
      value,
    } = this.props
    const { checked, indeterminate } = this.state

    const classes = cx(
      'ui',
      useKeyOnly(checked, 'checked'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(indeterminate, 'indeterminate'),
      // auto apply fitted class to compact white space when there is no label
      // https://semantic-ui.com/modules/checkbox.html#fitted
      useKeyOnly(_.isNil(label), 'fitted'),
      useKeyOnly(radio, 'radio'),
      useKeyOnly(readOnly, 'read-only'),
      useKeyOnly(slider, 'slider'),
      useKeyOnly(toggle, 'toggle'),
      'checkbox',
      className,
    )
    const unhandled = getUnhandledProps(Checkbox, this.props)
    const ElementType = getElementType(Checkbox, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, { htmlProps: htmlInputAttrs })

    return (
      <ElementType
        {...rest}
        className={classes}
        onClick={this.handleContainerClick}
        onChange={this.handleContainerClick}
        onMouseDown={this.handleMouseDown}
      >
        <input
          {...htmlInputProps}
          checked={checked}
          className='hidden'
          disabled={disabled}
          id={id}
          name={name}
          onClick={this.handleInputClick}
          readOnly
          ref={this.handleInputRef}
          tabIndex={this.computeTabIndex()}
          type={type}
          value={value}
        />
        {/*
         Heads Up!
         Do not remove empty labels, they are required by SUI CSS
         */}
        {createHTMLLabel(label, { defaultProps: { htmlFor: id }, autoGenerateKey: false }) || (
          <label htmlFor={id} />
        )}
      </ElementType>
    )
  }
}
