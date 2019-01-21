import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createPortal } from 'react-dom'

import { isBrowser } from '../../lib'
import Ref from '../Ref'

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,
  }

  componentDidMount() {
    _.invoke(this.props, 'onMount', null, { ...this.props, node: this.ref })
  }

  componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', null, { ...this.props, node: this.ref })
  }

  handleRef = c => (this.ref = c)

  render() {
    const { children, mountNode = isBrowser() ? document.body : null } = this.props

    return createPortal(<Ref innerRef={this.handleRef}>{children}</Ref>, mountNode)
  }
}

export default PortalInner
