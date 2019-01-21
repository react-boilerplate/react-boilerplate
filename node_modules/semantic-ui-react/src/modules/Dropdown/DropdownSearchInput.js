import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { createShorthandFactory, customPropTypes, getUnhandledProps, handleRef } from '../../lib'

/**
 * A search item sub-component for Dropdown component.
 */
class DropdownSearchInput extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** An input can have the auto complete. */
    autoComplete: PropTypes.string,

    /** Additional classes. */
    className: PropTypes.string,

    /** A ref handler for input. */
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /** An input can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The HTML input type. */
    type: PropTypes.string,

    /** Stored value. */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    autoComplete: 'off',
    type: 'text',
  }

  handleChange = (e) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }

  handleRef = (c) => {
    handleRef(this.props.inputRef, c)
  }

  render() {
    const { autoComplete, className, tabIndex, type, value } = this.props
    const classes = cx('search', className)
    const rest = getUnhandledProps(DropdownSearchInput, this.props)

    return (
      <input
        {...rest}
        aria-autocomplete='list'
        autoComplete={autoComplete}
        className={classes}
        onChange={this.handleChange}
        ref={this.handleRef}
        tabIndex={tabIndex}
        type={type}
        value={value}
      />
    )
  }
}

DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, type => ({ type }))

export default DropdownSearchInput
