import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  eventStack,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  normalizeOffset,
  isBrowser,
} from '../../lib'

/**
 * Visibility provides a set of callbacks for when a content appears in the viewport.
 */
export default class Visibility extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Context which visibility should attach onscroll events. */
    context: PropTypes.object,

    /**
     * When set to true a callback will occur anytime an element passes a condition not just immediately after the
     * threshold is met.
     */
    continuous: PropTypes.bool,

    /** Fires callbacks immediately after mount. */
    fireOnMount: PropTypes.bool,

    /**
     * Element's bottom edge has passed top of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomPassed: PropTypes.func,

    /**
     * Element's bottom edge has not passed top of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomPassedReverse: PropTypes.func,

    /**
     * Element's bottom edge has passed bottom of screen
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomVisible: PropTypes.func,

    /**
     * Element's bottom edge has not passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomVisibleReverse: PropTypes.func,

    /**
     * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
     * page.
     */
    offset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    ]),

    /** When set to false a callback will occur each time an element passes the threshold for a condition. */
    once: PropTypes.bool,

    /** Element is not visible on the screen. */
    onPassed: PropTypes.object,

    /**
     * Any part of an element is visible on screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onPassing: PropTypes.func,

    /**
     * Element's top has not passed top of screen but bottom has.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onPassingReverse: PropTypes.func,

    /**
     * Element is not visible on the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onOffScreen: PropTypes.func,

    /**
     * Element is visible on the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onOnScreen: PropTypes.func,

    /**
     * Element's top edge has passed top of the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopPassed: PropTypes.func,

    /**
     * Element's top edge has not passed top of the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopPassedReverse: PropTypes.func,

    /**
     * Element's top edge has passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopVisible: PropTypes.func,

    /**
     * Element's top edge has not passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopVisibleReverse: PropTypes.func,

    /**
     * Element's top edge has passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUpdate: PropTypes.func,

    /**
     * Allows to choose the mode of the position calculations:
     * - `events` - (default) update and fire callbacks only on scroll/resize events
     * - `repaint` - update and fire callbacks on browser repaint (animation frames)
     */
    updateOn: PropTypes.oneOf(['events', 'repaint']),
  }

  static defaultProps = {
    context: isBrowser() ? window : null,
    continuous: false,
    offset: [0, 0],
    once: true,
    updateOn: 'events',
  }

  calculations = {
    bottomPassed: false,
    bottomVisible: false,
    fits: false,
    passing: false,
    offScreen: false,
    onScreen: false,
    topPassed: false,
    topVisible: false,
  }

  firedCallbacks = []

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------

  componentWillReceiveProps({ continuous, once, context, updateOn }) {
    const cleanHappened =
      continuous !== this.props.continuous ||
      once !== this.props.once ||
      updateOn !== this.props.updateOn

    // Heads up! We should clean up array of happened callbacks, if values of these props are changed
    if (cleanHappened) this.firedCallbacks = []

    if (context !== this.props.context || updateOn !== this.props.updateOn) {
      this.unattachHandlers(this.props.context)
      this.attachHandlers(context, updateOn)
    }
  }

  componentDidMount() {
    this.mounted = true

    if (!isBrowser()) return
    const { context, fireOnMount, updateOn } = this.props

    this.pageYOffset = window.pageYOffset
    this.attachHandlers(context, updateOn)

    if (fireOnMount) this.update()
  }

  componentWillUnmount() {
    const { context } = this.props

    this.unattachHandlers(context)
    this.mounted = false
  }

  attachHandlers(context, updateOn) {
    if (updateOn === 'events') {
      if (context) {
        eventStack.sub('resize', this.handleUpdate, { target: context })
        eventStack.sub('scroll', this.handleUpdate, { target: context })
      }

      return
    }

    // Heads up!
    // We will deal with `repaint` there
    this.handleUpdate()
  }

  unattachHandlers(context) {
    if (context) {
      eventStack.unsub('resize', this.handleUpdate, { target: context })
      eventStack.unsub('scroll', this.handleUpdate, { target: context })
    }

    if (this.frameId) cancelAnimationFrame(this.frameId)
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  execute(callback, name) {
    const { continuous } = this.props
    if (!callback) return

    // Heads up! When `continuous` is true, callback will be fired always
    if (!continuous && _.includes(this.firedCallbacks, name)) return

    callback(null, { ...this.props, calculations: this.calculations })
    this.firedCallbacks.push(name)
  }

  fire = ({ callback, name }, value, reverse = false) => {
    const { continuous, once } = this.props

    // Heads up! For the execution is required:
    // - current value correspond to the fired direction
    // - `continuous` is true or calculation values are different
    const matchesDirection = this.calculations[value] !== reverse
    const executionPossible = continuous || this.calculations[value] !== this.oldCalculations[value]

    if (matchesDirection && executionPossible) this.execute(callback, name)

    // Heads up! We should remove callback from the happened when it's not `once`
    if (!once) this.firedCallbacks = _.without(this.firedCallbacks, name)
  }

  fireOnPassed() {
    const { percentagePassed, pixelsPassed } = this.calculations
    const { onPassed } = this.props

    _.forEach(onPassed, (callback, passed) => {
      const pixelsValue = Number(passed)

      if (pixelsValue && pixelsPassed >= pixelsValue) {
        this.execute(callback, passed)
        return
      }

      const matchPercentage = `${passed}`.match(/^(\d+)%$/)
      if (!matchPercentage) return

      const percentageValue = Number(matchPercentage[1]) / 100
      if (percentagePassed >= percentageValue) this.execute(callback, passed)
    })
  }

  handleUpdate = () => {
    if (this.ticking) return

    this.ticking = true
    this.frameId = requestAnimationFrame(this.update)
  }

  update = () => {
    if (!this.mounted) return

    this.ticking = false

    this.oldCalculations = this.calculations
    this.calculations = this.computeCalculations()
    this.pageYOffset = window.pageYOffset

    const {
      onBottomPassed,
      onBottomPassedReverse,
      onBottomVisible,
      onBottomVisibleReverse,
      onPassing,
      onPassingReverse,
      onTopPassed,
      onTopPassedReverse,
      onTopVisible,
      onTopVisibleReverse,
      onOffScreen,
      onOnScreen,
      updateOn,
    } = this.props
    const forward = {
      bottomPassed: { callback: onBottomPassed, name: 'onBottomPassed' },
      bottomVisible: { callback: onBottomVisible, name: 'onBottomVisible' },
      passing: { callback: onPassing, name: 'onPassing' },
      offScreen: { callback: onOffScreen, name: 'onOffScreen' },
      onScreen: { callback: onOnScreen, name: 'onOnScreen' },
      topPassed: { callback: onTopPassed, name: 'onTopPassed' },
      topVisible: { callback: onTopVisible, name: 'onTopVisible' },
    }

    const reverse = {
      bottomPassed: { callback: onBottomPassedReverse, name: 'onBottomPassedReverse' },
      bottomVisible: { callback: onBottomVisibleReverse, name: 'onBottomVisibleReverse' },
      passing: { callback: onPassingReverse, name: 'onPassingReverse' },
      topPassed: { callback: onTopPassedReverse, name: 'onTopPassedReverse' },
      topVisible: { callback: onTopVisibleReverse, name: 'onTopVisibleReverse' },
    }

    _.invoke(this.props, 'onUpdate', null, { ...this.props, calculations: this.calculations })
    this.fireOnPassed()

    // Heads up! Reverse callbacks should be fired first
    _.forEach(reverse, (data, value) => this.fire(data, value, true))
    _.forEach(forward, (data, value) => this.fire(data, value))

    if (updateOn === 'repaint') this.handleUpdate()
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  computeCalculations() {
    const { offset } = this.props
    const { bottom, height, top, width } = this.ref.getBoundingClientRect()
    const [topOffset, bottomOffset] = normalizeOffset(offset)

    const direction = window.pageYOffset > this.pageYOffset ? 'down' : 'up'
    const topPassed = top < topOffset
    const bottomPassed = bottom < bottomOffset

    const pixelsPassed = bottomPassed ? 0 : Math.max(top * -1, 0)
    const percentagePassed = pixelsPassed / height

    const bottomVisible = bottom >= bottomOffset && bottom <= window.innerHeight
    const topVisible = top >= topOffset && top <= window.innerHeight

    const fits = topVisible && bottomVisible
    const passing = topPassed && !bottomPassed

    const onScreen = (topVisible || topPassed) && !bottomPassed
    const offScreen = !onScreen

    return {
      bottomPassed,
      bottomVisible,
      direction,
      fits,
      height,
      passing,
      percentagePassed,
      pixelsPassed,
      offScreen,
      onScreen,
      topPassed,
      topVisible,
      width,
    }
  }

  // ----------------------------------------
  // Refs
  // ----------------------------------------

  handleRef = c => (this.ref = c)

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props
    const ElementType = getElementType(Visibility, this.props)
    const rest = getUnhandledProps(Visibility, this.props)

    return (
      <ElementType {...rest} ref={this.handleRef}>
        {children}
      </ElementType>
    )
  }
}
