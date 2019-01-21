import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { createShorthandFactory, getUnhandledProps, isBrowser } from '../../lib'
import Portal from '../../addons/Portal'
import DimmerDimmable from './DimmerDimmable'
import DimmerInner from './DimmerInner'

/**
 * A dimmer hides distractions to focus attention on particular content.
 */
export default class Dimmer extends Component {
  static propTypes = {
    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,
  }

  static Dimmable = DimmerDimmable
  static Inner = DimmerInner

  handlePortalMount = () => {
    if (!isBrowser()) return

    // Heads up, IE doesn't support second argument in add()
    document.body.classList.add('dimmed')
    document.body.classList.add('dimmable')
  }

  handlePortalUnmount = () => {
    if (!isBrowser()) return

    // Heads up, IE doesn't support second argument in add()
    document.body.classList.remove('dimmed')
    document.body.classList.remove('dimmable')
  }

  render() {
    const { active, page } = this.props
    const rest = getUnhandledProps(Dimmer, this.props)

    if (page) {
      return (
        <Portal
          closeOnEscape={false}
          closeOnDocumentClick={false}
          onMount={this.handlePortalMount}
          onUnmount={this.handlePortalUnmount}
          open={active}
          openOnTriggerClick={false}
        >
          <DimmerInner {...rest} active={active} page={page} />
        </Portal>
      )
    }

    return <DimmerInner {...rest} active={active} page={page} />
  }
}

Dimmer.create = createShorthandFactory(Dimmer, value => ({ content: value }))
