import PropTypes from 'prop-types'
import { Children, Component } from 'react'
import { findDOMNode } from 'react-dom'

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.element,

    /**
     * Called when componentDidMount.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.func,
  }

  componentDidMount() {
    const { innerRef } = this.props

    // Heads up! Don't move this condition, it's a short circuit that avoids run of `findDOMNode`
    // if `innerRef` isn't passed
    // eslint-disable-next-line react/no-find-dom-node
    if (innerRef) innerRef(findDOMNode(this))
  }

  render() {
    const { children } = this.props

    return Children.only(children)
  }
}
