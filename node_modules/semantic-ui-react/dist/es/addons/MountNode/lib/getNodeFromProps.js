import _isNil from "lodash/isNil";
import { isBrowser } from '../../../lib';
/**
 * Given `this.props`, return a `node` value or undefined.
 *
 * @param {object} props Component's props
 * @return {HTMLElement|undefined}
 */

var getNodeFromProps = function getNodeFromProps(props) {
  var node = props.node;

  if (isBrowser()) {
    if (_isNil(node)) return document.body;
    return node;
  }
};

export default getNodeFromProps;