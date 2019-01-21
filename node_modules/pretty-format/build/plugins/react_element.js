'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test = exports.serialize = undefined;

var _markup = require('./lib/markup');

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const elementSymbol = Symbol.for('react.element');
const fragmentSymbol = Symbol.for('react.fragment');
const forwardRefSymbol = Symbol.for('react.forward_ref');
const providerSymbol = Symbol.for('react.provider');
const contextSymbol = Symbol.for('react.context');

// Given element.props.children, or subtree during recursive traversal,
// return flattened array of children.
const getChildren = function(arg) {
  let children =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Array.isArray(arg)) {
    arg.forEach(item => {
      getChildren(item, children);
    });
  } else if (arg != null && arg !== false) {
    children.push(arg);
  }
  return children;
};

const getType = element => {
  const type = element.type;
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || 'Unknown';
  }
  if (type === fragmentSymbol) {
    return 'React.Fragment';
  }
  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === providerSymbol) {
      return 'Context.Provider';
    }

    if (type.$$typeof === contextSymbol) {
      return 'Context.Consumer';
    }

    if (type.$$typeof === forwardRefSymbol) {
      const functionName = type.render.displayName || type.render.name || '';

      return functionName !== ''
        ? 'ForwardRef(' + functionName + ')'
        : 'ForwardRef';
    }
  }
  return 'UNDEFINED';
};

const getPropKeys = element => {
  const props = element.props;

  return Object.keys(props)
    .filter(key => key !== 'children' && props[key] !== undefined)
    .sort();
};

const serialize = (exports.serialize = (
  element,
  config,
  indentation,
  depth,
  refs,
  printer
) =>
  ++depth > config.maxDepth
    ? (0, _markup.printElementAsLeaf)(getType(element), config)
    : (0, _markup.printElement)(
        getType(element),
        (0, _markup.printProps)(
          getPropKeys(element),
          element.props,
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          getChildren(element.props.children),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      ));

const test = (exports.test = val => val && val.$$typeof === elementSymbol);

exports.default = {serialize: serialize, test: test};
