import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  eventStack,
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  isBrowser,
  makeDebugger,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
} from '../../lib'
import Portal from '../../addons/Portal'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'

const debug = makeDebugger('popup')

export const POSITIONS = [
  'top left',
  'top right',
  'bottom right',
  'bottom left',
  'right center',
  'left center',
  'top center',
  'bottom center',
]

/**
 * A Popup displays additional information on top of a page.
 */
export default class Popup extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Display the popup without the pointing arrow. */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Simple text content for the popover. */
    content: customPropTypes.itemShorthand,

    /** Existing element the pop-up should be bound to. */
    context: PropTypes.object,

    /** A flowing Popup has no maximum width and continues to flow to fit its content. */
    flowing: PropTypes.bool,

    /** Takes up the entire width of its offset container. */
    // TODO: implement the Popup fluid layout
    // fluid: PropTypes.bool,

    /** Header displayed above the content in bold. */
    header: customPropTypes.itemShorthand,

    /** Hide the Popup when scrolling the window. */
    hideOnScroll: PropTypes.bool,

    /** Whether the popup should not close on hover. */
    hoverable: PropTypes.bool,

    /** Invert the colors of the Popup. */
    inverted: PropTypes.bool,

    /** Horizontal offset in pixels to be applied to the Popup. */
    horizontalOffset: PropTypes.number,

    /** Vertical offset in pixels to be applied to the Popup. */
    verticalOffset: PropTypes.number,

    /** Events triggering the popup. */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus'])),
    ]),

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,

    /** Position for the popover. */
    position: PropTypes.oneOf(POSITIONS),

    /** Popup size. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium', 'big', 'massive')),

    /** Custom Popup style. */
    style: PropTypes.object,

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,

    /** Popup width. */
    wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

    /** Element to be rendered within the confines of the viewport whenever possible. */
    keepInViewPort: PropTypes.bool,
  }

  static defaultProps = {
    position: 'top left',
    on: 'hover',
    keepInViewPort: true,
  }

  static Content = PopupContent
  static Header = PopupHeader

  state = {}

  componentDidMount() {
    this.mounted = true
  }

  componentDidUpdate(prevProps) {
    // if horizontal/vertical offsets change, re-calculate the CSS style
    const { horizontalOffset, verticalOffset } = this.props
    if (
      horizontalOffset !== prevProps.horizontalOffset ||
      verticalOffset !== prevProps.verticalOffset
    ) {
      this.setPopupStyle()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  computePopupStyle(positions) {
    const style = { position: 'absolute' }
    const context = this.getContext()

    // Do not access window/document when server side rendering
    if (!isBrowser()) return style

    const { horizontalOffset, verticalOffset } = this.props
    const { pageYOffset, pageXOffset } = window
    const { clientWidth, clientHeight } = document.documentElement

    const coords = this.coords || context.getBoundingClientRect()
    if (_.includes(positions, 'right')) {
      style.right = Math.round(clientWidth - (coords.right + pageXOffset))
      style.left = 'auto'
    } else if (_.includes(positions, 'left')) {
      style.left = Math.round(coords.left + pageXOffset)
      style.right = 'auto'
    } else {
      // if not left nor right, we are horizontally centering the element
      const xOffset = (coords.width - this.popupCoords.width) / 2
      style.left = Math.round(coords.left + xOffset + pageXOffset)
      style.right = 'auto'
    }

    if (_.includes(positions, 'top')) {
      style.bottom = Math.round(clientHeight - (coords.top + pageYOffset))
      style.top = 'auto'
    } else if (_.includes(positions, 'bottom')) {
      style.top = Math.round(coords.bottom + pageYOffset)
      style.bottom = 'auto'
    } else {
      // if not top nor bottom, we are vertically centering the element
      const yOffset = (coords.height + this.popupCoords.height) / 2
      style.top = Math.round(coords.bottom + pageYOffset - yOffset)
      style.bottom = 'auto'

      const xOffset = this.popupCoords.width + 8
      if (_.includes(positions, 'right')) {
        style.right -= xOffset
      } else {
        style.left -= xOffset
      }
    }

    if (horizontalOffset) {
      if (_.isNumber(style.right)) {
        style.right -= horizontalOffset
      } else {
        style.left -= horizontalOffset
      }
    }

    if (verticalOffset) {
      if (_.isNumber(style.top)) {
        style.top += verticalOffset
      } else {
        style.bottom += verticalOffset
      }
    }

    return style
  }

  // check if the style would display
  // the popup outside of the view port
  isStyleInViewport(style) {
    const { pageYOffset, pageXOffset } = window
    const { clientWidth, clientHeight } = document.documentElement

    const element = {
      top: style.top,
      left: style.left,
      width: this.popupCoords.width,
      height: this.popupCoords.height,
    }
    if (_.isNumber(style.right)) {
      element.left = clientWidth - style.right - element.width
    }
    if (_.isNumber(style.bottom)) {
      element.top = clientHeight - style.bottom - element.height
    }

    // hidden on top
    if (element.top < pageYOffset) return false
    // hidden on the bottom
    if (element.top + element.height > pageYOffset + clientHeight) return false
    // hidden the left
    if (element.left < pageXOffset) return false
    // hidden on the right
    if (element.left + element.width > pageXOffset + clientWidth) return false

    return true
  }

  setPopupStyle() {
    debug('setPopupStyle()')
    const context = this.getContext()
    if ((!this.coords && !context) || !this.popupCoords) return
    let position = this.props.position
    let style = this.computePopupStyle(position)
    const { keepInViewPort } = this.props

    if (keepInViewPort) {
      // Lets detect if the popup is out of the viewport and adjust
      // the position accordingly
      const positions = _.without(POSITIONS, position).concat([position])
      for (let i = 0; !this.isStyleInViewport(style) && i < positions.length; i += 1) {
        style = this.computePopupStyle(positions[i])
        position = positions[i]
      }
    }

    // Append 'px' to every numerical values in the style
    style = _.mapValues(style, value => (_.isNumber(value) ? `${value}px` : value))
    this.setState({ style, position })
  }

  getPortalProps() {
    const portalProps = {}

    const { on, hoverable } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    if (hoverable) {
      portalProps.closeOnPortalMouseLeave = true
      portalProps.mouseLeaveDelay = 300
    }
    if (_.includes(normalizedOn, 'click')) {
      portalProps.openOnTriggerClick = true
      portalProps.closeOnTriggerClick = true
      portalProps.closeOnDocumentClick = true
    }
    if (_.includes(normalizedOn, 'focus')) {
      portalProps.openOnTriggerFocus = true
      portalProps.closeOnTriggerBlur = true
    }
    if (_.includes(normalizedOn, 'hover')) {
      portalProps.openOnTriggerMouseEnter = true
      portalProps.closeOnTriggerMouseLeave = true
      // Taken from SUI: https://git.io/vPmCm
      portalProps.mouseLeaveDelay = 70
      portalProps.mouseEnterDelay = 50
    }

    return portalProps
  }

  hideOnScroll = (e) => {
    this.setState({ closed: true })

    eventStack.unsub('scroll', this.hideOnScroll, { target: window })
    setTimeout(() => {
      if (this.mounted) this.setState({ closed: false })
    }, 50)

    this.handleClose(e)
  }

  handleClose = (e) => {
    debug('handleClose()')

    _.invoke(this.props, 'onClose', e, this.props)
  }

  handleOpen = (e) => {
    debug('handleOpen()')

    this.coords = this.getContext().getBoundingClientRect()
    _.invoke(this.props, 'onOpen', e, this.props)
  }

  handlePortalMount = (e) => {
    debug('handlePortalMount()')
    const { hideOnScroll } = this.props

    if (hideOnScroll) eventStack.sub('scroll', this.hideOnScroll, { target: window })
    if (this.getContext()) {
      this.setPopupStyle(this.props.position)
    }
    _.invoke(this.props, 'onMount', e, this.props)
  }

  handlePortalUnmount = (e) => {
    debug('handlePortalUnmount()')
    const { hideOnScroll } = this.props

    if (hideOnScroll) eventStack.unsub('scroll', this.hideOnScroll, { target: window })
    _.invoke(this.props, 'onUnmount', e, this.props)
  }

  handlePopupRef = (popupRef) => {
    debug(`handlePopupRef(${popupRef})`)
    this.popupCoords = popupRef ? popupRef.getBoundingClientRect() : null
    this.setPopupStyle()
  }

  handleTriggerRef = (triggerRef) => {
    debug(`handleTriggerRef(${triggerRef})`)
    this.triggerRef = triggerRef
  }

  getContext = () => this.props.context || this.triggerRef

  render() {
    const {
      basic,
      children,
      className,
      content,
      flowing,
      header,
      inverted,
      size,
      trigger,
      wide,
    } = this.props

    const { position, closed } = this.state
    const style = _.assign({}, this.state.style, this.props.style)
    const classes = cx(
      'ui',
      position,
      size,
      useKeyOrValueAndKey(wide, 'wide'),
      useKeyOnly(basic, 'basic'),
      useKeyOnly(flowing, 'flowing'),
      useKeyOnly(inverted, 'inverted'),
      'popup transition visible',
      className,
    )

    if (closed) return trigger

    const unhandled = getUnhandledProps(Popup, this.props)
    const portalPropNames = Portal.handledProps

    const rest = _.reduce(
      unhandled,
      (acc, val, key) => {
        if (!_.includes(portalPropNames, key)) acc[key] = val

        return acc
      },
      {},
    )
    const portalProps = _.pick(unhandled, portalPropNames)
    const ElementType = getElementType(Popup, this.props)

    const popupJSX = (
      <ElementType {...rest} className={classes} style={style} ref={this.handlePopupRef}>
        {children}
        {childrenUtils.isNil(children) && PopupHeader.create(header, { autoGenerateKey: false })}
        {childrenUtils.isNil(children) && PopupContent.create(content, { autoGenerateKey: false })}
      </ElementType>
    )

    const mergedPortalProps = { ...this.getPortalProps(), ...portalProps }
    debug('portal props:', mergedPortalProps)

    return (
      <Portal
        {...mergedPortalProps}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
        trigger={trigger}
        triggerRef={this.handleTriggerRef}
      >
        {popupJSX}
      </Portal>
    )
  }
}
