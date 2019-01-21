import _ from 'lodash'
import { isBrowser } from '../../../lib'

/**
 * Given `this.props`, return a `node` value or undefined.
 *
 * @param {object} props Component's props
 * @return {HTMLElement|undefined}
 */
const getNodeFromProps = (props) => {
  const { node } = props

  if (isBrowser()) {
    if (_.isNil(node)) return document.body
    return node
  }
}

export default getNodeFromProps
