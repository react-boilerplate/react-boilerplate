import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
  useVerticalAlignProp,
} from '../../lib'

/**
 *
 */
export default class DimmerInner extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A disabled dimmer cannot be activated */
    disabled: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Handles click outside Dimmer's content, but inside Dimmer area.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClickOutside: PropTypes.func,

    /** A dimmer can be formatted to have its colors inverted. */
    inverted: PropTypes.bool,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,

    /** A dimmer can be controlled with simple prop. */
    simple: PropTypes.bool,

    /** A dimmer can have its content top or bottom aligned. */
    verticalAlign: PropTypes.oneOf(['bottom', 'top']),
  }

  componentWillReceiveProps({ active: nextActive }) {
    const { active: prevActive } = this.props

    if (prevActive !== nextActive) this.toggleStyles(nextActive)
  }

  componentDidMount() {
    const { active } = this.props

    this.toggleStyles(active)
  }

  handleClick = (e) => {
    _.invoke(this.props, 'onClick', e, this.props)

    if (
      this.contentRef &&
      (this.contentRef !== e.target && doesNodeContainClick(this.contentRef, e))
    ) {
      return
    }
    _.invoke(this.props, 'onClickOutside', e, this.props)
  }

  handleRef = c => (this.ref = c)

  handleContentRef = c => (this.contentRef = c)

  toggleStyles(active) {
    if (!this.ref) return

    if (active) {
      this.ref.style.setProperty('display', 'flex', 'important')
      return
    }

    this.ref.style.removeProperty('display')
  }

  render() {
    const {
      active,
      children,
      className,
      content,
      disabled,
      inverted,
      page,
      simple,
      verticalAlign,
    } = this.props

    const classes = cx(
      'ui',
      useKeyOnly(active, 'active transition visible'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(page, 'page'),
      useKeyOnly(simple, 'simple'),
      useVerticalAlignProp(verticalAlign),
      'dimmer',
      className,
    )
    const rest = getUnhandledProps(DimmerInner, this.props)
    const ElementType = getElementType(DimmerInner, this.props)

    const childrenContent = childrenUtils.isNil(children) ? content : children

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick} ref={this.handleRef}>
        {childrenContent && (
          <div className='content' ref={this.handleContentRef}>
            {childrenContent}
          </div>
        )}
      </ElementType>
    )
  }
}
