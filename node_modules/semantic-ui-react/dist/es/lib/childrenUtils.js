import _find from "lodash/find";
import _some from "lodash/some";
import { Children } from 'react';
/**
 * Determine if child by type exists in children.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {Boolean}
 */

export var someByType = function someByType(children, type) {
  return _some(Children.toArray(children), {
    type: type
  });
};
/**
 * Find child by type.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {undefined|Object}
 */

export var findByType = function findByType(children, type) {
  return _find(Children.toArray(children), {
    type: type
  });
};
/**
 * Tests if children are nil in React and Preact.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */

export var isNil = function isNil(children) {
  return children === null || children === undefined || Array.isArray(children) && children.length === 0;
};