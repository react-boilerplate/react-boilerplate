import PropTypes from 'prop-types'
import { Children, Component } from 'react'
import { findDOMNode } from 'react-dom'

import handleRef from '../../lib/handleRef'

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.element,

    /**
     * Called when a child component will be mounted or updated.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    handleRef(this.props.innerRef, findDOMNode(this))
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null)
  }

  render() {
    const { children } = this.props

    return Children.only(children)
  }
}
