import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { cloneElement, Component } from 'react'

import { makeDebugger, normalizeTransitionDuration, SUI, useKeyOnly } from '../../lib'
import TransitionGroup from './TransitionGroup'

const debug = makeDebugger('transition')

const TRANSITION_TYPE = {
  ENTERING: 'show',
  EXITING: 'hide',
}

/**
 * A transition is an animation usually used to move content in or out of view.
 */
export default class Transition extends Component {
  static propTypes = {
    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.oneOf(SUI.TRANSITIONS),

    /** Primary content. */
    children: PropTypes.element.isRequired,

    /** Duration of the CSS transition animation in milliseconds. */
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        hide: PropTypes.number,
        show: PropTypes.number,
      }),
      PropTypes.string,
    ]),

    /** Show the component; triggers the enter or exit animation. */
    visible: PropTypes.bool,

    /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
    mountOnShow: PropTypes.bool,

    /**
     * Callback on each transition that changes visibility to shown.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onComplete: PropTypes.func,

    /**
     * Callback on each transition that changes visibility to hidden.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onHide: PropTypes.func,

    /**
     * Callback on each transition that changes visibility to shown.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onShow: PropTypes.func,

    /**
     * Callback on animation start.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onStart: PropTypes.func,

    /** React's key of the element. */
    reactKey: PropTypes.string,

    /** Run the enter animation when the component mounts, if it is initially shown. */
    transitionOnMount: PropTypes.bool,

    /** Unmount the component (remove it from the DOM) when it is not shown. */
    unmountOnHide: PropTypes.bool,
  }

  static defaultProps = {
    animation: 'fade',
    duration: 500,
    visible: true,
    mountOnShow: true,
    transitionOnMount: false,
    unmountOnHide: false,
  }

  static ENTERED = 'ENTERED'
  static ENTERING = 'ENTERING'
  static EXITED = 'EXITED'
  static EXITING = 'EXITING'
  static UNMOUNTED = 'UNMOUNTED'

  static Group = TransitionGroup

  constructor(...args) {
    super(...args)

    const { initial: status, next } = this.computeInitialStatuses()
    this.nextStatus = next
    this.state = { status }
  }

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------

  componentDidMount() {
    debug('componentDidMount()')

    this.updateStatus()
  }

  componentWillReceiveProps(nextProps) {
    debug('componentWillReceiveProps()')

    const { current: status, next } = this.computeStatuses(nextProps)

    this.nextStatus = next
    if (status) this.setState({ status })
  }

  componentDidUpdate() {
    debug('componentDidUpdate()')

    this.updateStatus()
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')

    clearTimeout(this.timeoutId)
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  handleStart = () => {
    const { duration } = this.props
    const status = this.nextStatus

    this.nextStatus = null
    this.setState({ status, animating: true }, () => {
      const durationType = TRANSITION_TYPE[status]
      const durationValue = normalizeTransitionDuration(duration, durationType)

      _.invoke(this.props, 'onStart', null, { ...this.props, status })
      this.timeoutId = setTimeout(this.handleComplete, durationValue)
    })
  }

  handleComplete = () => {
    const { status: current } = this.state

    _.invoke(this.props, 'onComplete', null, { ...this.props, status: current })

    if (this.nextStatus) {
      this.handleStart()
      return
    }

    const status = this.computeCompletedStatus()
    const callback = current === Transition.ENTERING ? 'onShow' : 'onHide'

    this.setState({ status, animating: false }, () => {
      _.invoke(this.props, callback, null, { ...this.props, status })
    })
  }

  updateStatus = () => {
    const { animating } = this.state

    if (this.nextStatus) {
      this.nextStatus = this.computeNextStatus()
      if (!animating) this.handleStart()
    }
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  computeClasses = () => {
    const { animation, children } = this.props
    const { animating, status } = this.state

    const childClasses = _.get(children, 'props.className')
    const directional = _.includes(SUI.DIRECTIONAL_TRANSITIONS, animation)

    if (directional) {
      return cx(
        animation,
        childClasses,
        useKeyOnly(animating, 'animating'),
        useKeyOnly(status === Transition.ENTERING, 'in'),
        useKeyOnly(status === Transition.EXITING, 'out'),
        useKeyOnly(status === Transition.EXITED, 'hidden'),
        useKeyOnly(status !== Transition.EXITED, 'visible'),
        'transition',
      )
    }

    return cx(animation, childClasses, useKeyOnly(animating, 'animating transition'))
  }

  computeCompletedStatus = () => {
    const { unmountOnHide } = this.props
    const { status } = this.state

    if (status === Transition.ENTERING) return Transition.ENTERED
    return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED
  }

  computeInitialStatuses = () => {
    const { visible, mountOnShow, transitionOnMount, unmountOnHide } = this.props

    if (visible) {
      if (transitionOnMount) {
        return {
          initial: Transition.EXITED,
          next: Transition.ENTERING,
        }
      }
      return { initial: Transition.ENTERED }
    }

    if (mountOnShow || unmountOnHide) return { initial: Transition.UNMOUNTED }
    return { initial: Transition.EXITED }
  }

  computeNextStatus = () => {
    const { animating, status } = this.state

    if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING
    return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING
  }

  computeStatuses = (props) => {
    const { status } = this.state
    const { visible } = props

    if (visible) {
      return {
        current: status === Transition.UNMOUNTED && Transition.EXITED,
        next:
          status !== Transition.ENTERING && status !== Transition.ENTERED && Transition.ENTERING,
      }
    }

    return {
      next: (status === Transition.ENTERING || status === Transition.ENTERED) && Transition.EXITING,
    }
  }

  computeStyle = () => {
    const { children, duration } = this.props
    const { status } = this.state

    const childStyle = _.get(children, 'props.style')
    const type = TRANSITION_TYPE[status]
    const animationDuration = type && `${normalizeTransitionDuration(duration, type)}ms`

    return { ...childStyle, animationDuration }
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    debug('render()')
    debug('props', this.props)
    debug('state', this.state)

    const { children } = this.props
    const { status } = this.state

    if (status === Transition.UNMOUNTED) return null
    return cloneElement(children, {
      className: this.computeClasses(),
      style: this.computeStyle(),
    })
  }
}
