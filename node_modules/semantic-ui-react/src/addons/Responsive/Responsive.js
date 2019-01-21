import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  customPropTypes,
  eventStack,
  getElementType,
  getUnhandledProps,
  isBrowser,
} from '../../lib'
import isVisible from './lib/isVisible'

/**
 * Responsive can control visibility of content.
 */
export default class Responsive extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Fires callbacks immediately after mount. */
    fireOnMount: PropTypes.bool,

    /**
     * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
     * otherwise, assumes a width of 0.
     */
    getWidth: PropTypes.func,

    /** The maximum width at which content will be displayed. */
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The minimum width at which content will be displayed. */
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Called on update.
     *
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    getWidth: () => (isBrowser() ? window.innerWidth : 0),
  }

  static onlyMobile = { minWidth: 320, maxWidth: 767 }
  static onlyTablet = { minWidth: 768, maxWidth: 991 }
  static onlyComputer = { minWidth: 992 }
  static onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 }
  static onlyWidescreen = { minWidth: 1920 }

  state = {
    visible: true,
  }

  static getDerivedStateFromProps(props) {
    const width = _.invoke(props, 'getWidth')
    const visible = isVisible(width, props)

    return { visible }
  }

  componentDidMount() {
    const { fireOnMount } = this.props

    eventStack.sub('resize', this.handleResize, { target: 'window' })
    if (fireOnMount) this.handleUpdate()
  }

  componentWillUnmount() {
    eventStack.unsub('resize', this.handleResize, { target: 'window' })
    cancelAnimationFrame(this.frameId)
  }

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleResize = (e) => {
    if (this.ticking) return

    this.ticking = true
    this.frameId = requestAnimationFrame(() => this.handleUpdate(e))
  }

  handleUpdate = (e) => {
    this.ticking = false

    const { visible } = this.state
    const width = _.invoke(this.props, 'getWidth')
    const nextVisible = isVisible(width, this.props)

    if (visible !== nextVisible) this.setState({ visible: nextVisible })
    _.invoke(this.props, 'onUpdate', e, { ...this.props, width })
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props
    const { visible } = this.state

    const ElementType = getElementType(Responsive, this.props)
    const rest = getUnhandledProps(Responsive, this.props)

    if (visible) return <ElementType {...rest}>{children}</ElementType>
    return null
  }
}
