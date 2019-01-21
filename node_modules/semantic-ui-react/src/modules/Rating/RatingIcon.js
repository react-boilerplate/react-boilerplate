import cx from 'classnames'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib'

/**
 * An internal icon sub-component for Rating component
 */
export default class RatingIcon extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Indicates activity of an icon. */
    active: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** An index of icon inside Rating. */
    index: PropTypes.number,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called on keyup.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onKeyUp: PropTypes.func,

    /**
     * Called on mouseenter.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseEnter: PropTypes.func,

    /** Indicates selection of an icon. */
    selected: PropTypes.bool,
  }

  static defaultProps = {
    as: 'i',
  }

  handleClick = (e) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleKeyUp = (e) => {
    _.invoke(this.props, 'onKeyUp', e, this.props)

    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Enter:
      case keyboardKey.Spacebar:
        e.preventDefault()
        _.invoke(this.props, 'onClick', e, this.props)
        break
      default:
    }
  }

  handleMouseEnter = (e) => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  render() {
    const { active, className, selected } = this.props
    const classes = cx(
      useKeyOnly(active, 'active'),
      useKeyOnly(selected, 'selected'),
      'icon',
      className,
    )
    const rest = getUnhandledProps(RatingIcon, this.props)
    const ElementType = getElementType(RatingIcon, this.props)

    return (
      <ElementType
        {...rest}
        className={classes}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onMouseEnter={this.handleMouseEnter}
        tabIndex={0}
        role='radio'
      />
    )
  }
}
