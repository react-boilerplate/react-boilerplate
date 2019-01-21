import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */
class TextArea extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Indicates whether height of the textarea fits the content or not. */
    autoHeight: PropTypes.bool,

    /**
     * Called on change.
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onChange: PropTypes.func,

    /**
     * Called on input.
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onInput: PropTypes.func,

    /** Indicates row count for a TextArea. */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Custom TextArea style. */
    style: PropTypes.object,

    /** The value of the textarea. */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    as: 'textarea',
    rows: 3,
  }

  componentDidMount() {
    this.updateHeight()
  }

  componentDidUpdate(prevProps) {
    // removed autoHeight
    if (!this.props.autoHeight && prevProps.autoHeight) {
      this.removeAutoHeightStyles()
    }
    // added autoHeight or value changed
    if ((this.props.autoHeight && !prevProps.autoHeight) || prevProps.value !== this.props.value) {
      this.updateHeight()
    }
  }

  focus = () => this.ref.focus()

  handleChange = (e) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }

  handleInput = (e) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onInput', e, { ...this.props, value })
    this.updateHeight()
  }

  handleRef = c => (this.ref = c)

  removeAutoHeightStyles = () => {
    this.ref.style.height = null
    this.ref.style.resize = null
  }

  updateHeight = () => {
    const { autoHeight } = this.props
    if (!this.ref || !autoHeight) return

    const { minHeight, borderBottomWidth, borderTopWidth } = window.getComputedStyle(this.ref)

    const borderHeight = _.sum([borderBottomWidth, borderTopWidth].map(x => parseFloat(x)))

    // Measure the scrollHeight and update the height to match.
    this.ref.style.height = 'auto'
    this.ref.style.overflowY = 'hidden'
    this.ref.style.height = `${Math.max(
      parseFloat(minHeight),
      Math.ceil(this.ref.scrollHeight + borderHeight),
    )}px`
    this.ref.style.overflowY = ''
  }

  render() {
    const { autoHeight, rows, style, value } = this.props
    const rest = getUnhandledProps(TextArea, this.props)
    const ElementType = getElementType(TextArea, this.props)

    const resize = autoHeight ? 'none' : ''

    return (
      <ElementType
        {...rest}
        onChange={this.handleChange}
        onInput={this.handleInput}
        ref={this.handleRef}
        rows={rows}
        style={{ resize, ...style }}
        value={value}
      />
    )
  }
}

export default TextArea
