import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { isValidElement } from 'react'

import {
  AutoControlledComponent as Component,
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  eventStack,
  getElementType,
  getUnhandledProps,
  isBrowser,
  makeDebugger,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'
import MountNode from '../../addons/MountNode'
import Portal from '../../addons/Portal'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalActions from './ModalActions'
import ModalDescription from './ModalDescription'
import Ref from '../../addons/Ref'

const debug = makeDebugger('modal')

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
class Modal extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
    actions: customPropTypes.itemShorthand,

    /** A modal can reduce its complexity */
    basic: PropTypes.bool,

    /** A modal can be vertically centered in the viewport */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the close icon. Closes the modal on click. */
    closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

    /** Whether or not the Modal should close when the dimmer is clicked. */
    closeOnDimmerClick: PropTypes.bool,

    /** Whether or not the Modal should close when the document is clicked. */
    closeOnDocumentClick: PropTypes.bool,

    /** Simple text content for the Modal. */
    content: customPropTypes.itemShorthand,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** A Modal can appear in a dimmer. */
    dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),

    /** Event pool namespace that is used to handle component events */
    eventPool: PropTypes.string,

    /** Modal displayed above the content in bold. */
    header: customPropTypes.itemShorthand,

    /** The node where the modal should mount. Defaults to document.body. */
    mountNode: PropTypes.any,

    /**
     * Action onClick handler when using shorthand `actions`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onActionClick: PropTypes.func,

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

    /** Controls whether or not the Modal is displayed. */
    open: PropTypes.bool,

    /** A modal can vary in size */
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

    /** Custom styles. */
    style: PropTypes.object,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /**
     * NOTE: Any unhandled props that are defined in Portal are passed-through
     * to the wrapping Portal.
     */
  }

  static defaultProps = {
    centered: true,
    dimmer: true,
    closeOnDimmerClick: true,
    closeOnDocumentClick: false,
    eventPool: 'Modal',
  }

  static autoControlledProps = ['open']

  static Header = ModalHeader
  static Content = ModalContent
  static Description = ModalDescription
  static Actions = ModalActions

  componentWillUnmount() {
    debug('componentWillUnmount()')
    this.handlePortalUnmount()
  }

  // Do not access document when server side rendering
  getMountNode = () => (isBrowser() ? this.props.mountNode || document.body : null)

  handleActionsOverrides = predefinedProps => ({
    onActionClick: (e, actionProps) => {
      _.invoke(predefinedProps, 'onActionClick', e, actionProps)
      _.invoke(this.props, 'onActionClick', e, this.props)

      this.handleClose(e)
    },
  })

  handleClose = (e) => {
    debug('close()')

    _.invoke(this.props, 'onClose', e, this.props)
    this.trySetState({ open: false })
  }

  handleDocumentClick = (e) => {
    debug('handleDocumentClick()')
    const { closeOnDimmerClick } = this.props

    if (!closeOnDimmerClick || doesNodeContainClick(this.ref, e)) return

    _.invoke(this.props, 'onClose', e, this.props)
    this.trySetState({ open: false })
  }

  handleIconOverrides = predefinedProps => ({
    onClick: (e) => {
      _.invoke(predefinedProps, 'onClick', e)
      this.handleClose(e)
    },
  })

  handleOpen = (e) => {
    debug('open()')

    _.invoke(this.props, 'onOpen', e, this.props)
    this.trySetState({ open: true })
  }

  handlePortalMount = (e) => {
    const { eventPool } = this.props
    debug('handlePortalMount()', { eventPool })

    this.setState({ scrolling: false })
    this.setPositionAndClassNames()

    eventStack.sub('click', this.handleDocumentClick, { pool: eventPool, target: this.dimmerRef })
    _.invoke(this.props, 'onMount', e, this.props)
  }

  handlePortalUnmount = (e) => {
    const { eventPool } = this.props
    debug('handlePortalUnmount()', { eventPool })

    cancelAnimationFrame(this.animationRequestId)
    eventStack.unsub('click', this.handleDocumentClick, { pool: eventPool, target: this.dimmerRef })
    _.invoke(this.props, 'onUnmount', e, this.props)
  }

  handleRef = c => (this.ref = c)

  handleDimmerRef = c => (this.dimmerRef = c)

  setDimmerNodeStyle = () => {
    debug('setDimmerNodeStyle()')

    if (this.dimmerRef) {
      this.dimmerRef.style.setProperty('display', 'flex', 'important')
    }
  }

  setPositionAndClassNames = () => {
    const { dimmer } = this.props
    let classes

    if (dimmer) {
      classes = 'dimmable dimmed'

      if (dimmer === 'blurring') {
        classes += ' blurring'
      }
    }

    const newState = {}

    if (this.ref) {
      const { height } = this.ref.getBoundingClientRect()

      // Leaving the old calculation here since we may need it as an older browser fallback
      // SEE: https://github.com/Semantic-Org/Semantic-UI/issues/6185#issuecomment-376725956
      // const marginTop = -Math.round(height / 2)
      const marginTop = null
      const scrolling = height > window.innerHeight

      if (this.state.marginTop !== marginTop) {
        newState.marginTop = marginTop
      }

      if (this.state.scrolling !== scrolling) {
        newState.scrolling = scrolling
      }

      if (scrolling) classes += ' scrolling'
    }

    if (this.state.mountClasses !== classes) newState.mountClasses = classes
    if (!_.isEmpty(newState)) this.setState(newState)

    this.animationRequestId = requestAnimationFrame(this.setPositionAndClassNames)

    this.setDimmerNodeStyle()
  }

  renderContent = (rest) => {
    const {
      actions,
      basic,
      children,
      className,
      closeIcon,
      content,
      header,
      mountNode,
      size,
      style,
    } = this.props
    const { marginTop, mountClasses, scrolling } = this.state

    const classes = cx(
      'ui',
      size,
      useKeyOnly(basic, 'basic'),
      useKeyOnly(scrolling, 'scrolling'),
      'modal transition visible active',
      className,
    )
    const ElementType = getElementType(Modal, this.props)

    const closeIconName = closeIcon === true ? 'close' : closeIcon
    const closeIconJSX = Icon.create(closeIconName, { overrideProps: this.handleIconOverrides })

    if (!childrenUtils.isNil(children)) {
      // TODO: remove when ref with "as" is resolved: PR #2306
      return (
        <Ref innerRef={this.handleRef}>
          <ElementType {...rest} className={classes} style={{ marginTop, ...style }}>
            <MountNode className={mountClasses} node={mountNode} />

            {closeIconJSX}
            {children}
          </ElementType>
        </Ref>
      )
    }

    // TODO: remove when ref with "as" is resolved: PR #2306
    return (
      <Ref innerRef={this.handleRef}>
        <ElementType {...rest} className={classes} style={{ marginTop, ...style }}>
          <MountNode className={mountClasses} node={mountNode} />

          {closeIconJSX}
          {ModalHeader.create(header, { autoGenerateKey: false })}
          {ModalContent.create(content, { autoGenerateKey: false })}
          {ModalActions.create(actions, { overrideProps: this.handleActionsOverrides })}
        </ElementType>
      </Ref>
    )
  }

  render() {
    const { open } = this.state
    const { centered, closeOnDocumentClick, dimmer, eventPool, trigger } = this.props
    const mountNode = this.getMountNode()

    // Short circuit when server side rendering
    if (!isBrowser()) {
      return isValidElement(trigger) ? trigger : null
    }

    const unhandled = getUnhandledProps(Modal, this.props)
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

    // wrap dimmer modals
    const dimmerClasses = cx(
      'ui',
      dimmer === 'inverted' && 'inverted',
      !centered && 'top aligned',
      'page modals dimmer transition visible active',
    )

    // Heads up!
    //
    // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
    // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
    //
    // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
    // We need the immediate child to be the dimmer to :not() blur the modal itself!
    // Otherwise, the portal div is also blurred, blurring the modal.
    //
    // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

    return (
      <Portal
        closeOnDocumentClick={closeOnDocumentClick}
        {...portalProps}
        trigger={trigger}
        eventPool={eventPool}
        mountNode={mountNode}
        open={open}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        <div className={dimmerClasses} ref={this.handleDimmerRef}>
          {this.renderContent(rest)}
        </div>
      </Portal>
    )
  }
}

export default Modal
