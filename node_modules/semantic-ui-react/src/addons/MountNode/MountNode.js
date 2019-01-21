import PropTypes from 'prop-types'
import { Component } from 'react'

import { customPropTypes } from '../../lib'
import getNodeFromProps from './lib/getNodeFromProps'
import handleClassNamesChange from './lib/handleClassNamesChange'
import NodeRegistry from './lib/NodeRegistry'

const nodeRegistry = new NodeRegistry()

/**
 * A component that allows to manage classNames on a DOM node in declarative manner.
 */
export default class MountNode extends Component {
  static propTypes = {
    /** Additional classes. */
    className: PropTypes.string,

    /** The DOM node where we will apply class names. Defaults to document.body. */
    node: customPropTypes.domNode,
  }

  shouldComponentUpdate({ className: nextClassName }) {
    const { className: currentClassName } = this.props

    return nextClassName !== currentClassName
  }

  componentDidMount() {
    const node = getNodeFromProps(this.props)

    if (node) {
      nodeRegistry.add(node, this)
      nodeRegistry.emit(node, handleClassNamesChange)
    }
  }

  componentDidUpdate() {
    const node = getNodeFromProps(this.props)

    if (node) nodeRegistry.emit(node, handleClassNamesChange)
  }

  componentWillUnmount() {
    const node = getNodeFromProps(this.props)

    if (node) {
      nodeRegistry.del(node, this)
      nodeRegistry.emit(node, handleClassNamesChange)
    }
  }

  render() {
    return null
  }
}
