import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  customPropTypes,
  eventStack,
  getElementType,
  getUnhandledProps,
  isBrowser,
  shallowEqual,
} from '../../lib'

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

  constructor(...args) {
    super(...args)

    this.state = { width: _.invoke(this.props, 'getWidth') }
  }

  componentDidMount() {
    const { fireOnMount } = this.props

    this.mounted = true

    eventStack.sub('resize', this.handleResize, { target: 'window' })
    if (fireOnMount) this.handleUpdate()
  }

  componentWillUnmount() {
    this.mounted = false
    eventStack.unsub('resize', this.handleResize, { target: 'window' })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Update when any prop changes or the width changes. If width does not change, no update is required.
    return this.state.width !== nextState.width || !shallowEqual(this.props, nextProps)
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  fitsMaxWidth = () => {
    const { maxWidth } = this.props
    const { width } = this.state

    return _.isNil(maxWidth) ? true : width <= maxWidth
  }

  fitsMinWidth = () => {
    const { minWidth } = this.props
    const { width } = this.state

    return _.isNil(minWidth) ? true : width >= minWidth
  }

  setSafeState = (...args) => this.mounted && this.setState(...args)

  isVisible = () => this.fitsMinWidth() && this.fitsMaxWidth()

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleResize = (e) => {
    if (this.ticking) return

    this.ticking = true
    requestAnimationFrame(() => this.handleUpdate(e))
  }

  handleUpdate = (e) => {
    this.ticking = false
    const width = _.invoke(this.props, 'getWidth')

    this.setSafeState({ width })
    _.invoke(this.props, 'onUpdate', e, { ...this.props, width })
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props

    const ElementType = getElementType(Responsive, this.props)
    const rest = getUnhandledProps(Responsive, this.props)

    if (this.isVisible()) return <ElementType {...rest}>{children}</ElementType>
    return null
  }
}
