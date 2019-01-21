'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.buildPredicate = buildPredicate;
exports.reduceTreeBySelector = reduceTreeBySelector;
exports.reduceTreesBySelector = reduceTreesBySelector;

var _rstSelectorParser = require('rst-selector-parser');

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _arrayPrototype = require('array.prototype.flat');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _objectIs = require('object-is');

var _objectIs2 = _interopRequireDefault(_objectIs);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _RSTTraversal = require('./RSTTraversal');

var _Utils = require('./Utils');

var _getAdapter = require('./getAdapter');

var _getAdapter2 = _interopRequireDefault(_getAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// our CSS selector parser instance
var parser = (0, _rstSelectorParser.createParser)();

// Combinators that allow you to chance selectors
var CHILD = 'childCombinator';
var ADJACENT_SIBLING = 'adjacentSiblingCombinator';
var GENERAL_SIBLING = 'generalSiblingCombinator';
var DESCENDANT = 'descendantCombinator';

// Selectors for targeting elements
var SELECTOR = 'selector';
var TYPE_SELECTOR = 'typeSelector';
var CLASS_SELECTOR = 'classSelector';
var ID_SELECTOR = 'idSelector';
var ATTRIBUTE_PRESENCE = 'attributePresenceSelector';
var ATTRIBUTE_VALUE = 'attributeValueSelector';
// @TODO we dont support these, throw if they are used
var PSEUDO_CLASS = 'pseudoClassSelector';
var PSEUDO_ELEMENT = 'pseudoElementSelector';

var EXACT_ATTRIBUTE_OPERATOR = '=';
var WHITELIST_ATTRIBUTE_OPERATOR = '~=';
var HYPHENATED_ATTRIBUTE_OPERATOR = '|=';
var PREFIX_ATTRIBUTE_OPERATOR = '^=';
var SUFFIX_ATTRIBUTE_OPERATOR = '$=';
var SUBSTRING_ATTRIBUTE_OPERATOR = '*=';

function unique(arr) {
  return [].concat(_toConsumableArray(new Set(arr)));
}

/**
 * Calls reduce on a array of nodes with the passed
 * function, returning only unique results.
 * @param {Function} fn
 * @param {Array<Node>} nodes
 */
function uniqueReduce(fn, nodes) {
  return unique(nodes.reduce(fn, []));
}

/**
 * Takes a CSS selector and returns a set of tokens parsed
 * by scalpel.
 * @param {String} selector
 */
function safelyGenerateTokens(selector) {
  try {
    return parser.parse(selector);
  } catch (err) {
    throw new Error('Failed to parse selector: ' + String(selector));
  }
}

function matchAttributeSelector(node, token) {
  var operator = token.operator,
      value = token.value,
      name = token.name;

  var nodeProps = (0, _Utils.propsOfNode)(node);
  var descriptor = Object.getOwnPropertyDescriptor(nodeProps, name);
  if (descriptor && descriptor.get) {
    return false;
  }
  var nodePropValue = nodeProps[name];
  if (typeof nodePropValue === 'undefined') {
    return false;
  }
  if (token.type === ATTRIBUTE_PRESENCE) {
    return (0, _has2['default'])(nodeProps, token.name);
  }
  // Only the exact value operator ("=") can match non-strings
  if (typeof nodePropValue !== 'string' || typeof value !== 'string') {
    if (operator !== EXACT_ATTRIBUTE_OPERATOR) {
      return false;
    }
  }
  switch (operator) {
    /**
     * Represents an element with the att attribute whose value is exactly "val".
     * @example
     * [attr="val"] matches attr="val"
     */
    case EXACT_ATTRIBUTE_OPERATOR:
      return (0, _objectIs2['default'])(nodePropValue, value);
    /**
     * Represents an element with the att attribute whose value is a whitespace-separated
     * list of words, one of which is exactly
     * @example
     *  [rel~="copyright"] matches rel="copyright other"
     */
    case WHITELIST_ATTRIBUTE_OPERATOR:
      return nodePropValue.split(' ').indexOf(value) !== -1;
    /**
     * Represents an element with the att attribute, its value either being exactly the
     * value or beginning with the value immediately followed by "-"
     * @example
     * [hreflang|="en"] matches hreflang="en-US"
     */
    case HYPHENATED_ATTRIBUTE_OPERATOR:
      return nodePropValue === value || nodePropValue.startsWith(String(value) + '-');
    /**
     * Represents an element with the att attribute whose value begins with the prefix value.
     * If the value is the empty string then the selector does not represent anything.
     * @example
     * [type^="image"] matches type="imageobject"
     */
    case PREFIX_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.slice(0, value.length) === value;
    /**
     * Represents an element with the att attribute whose value ends with the suffix value.
     * If the value is the empty string then the selector does not represent anything.
     * @example
     * [type$="image"] matches type="imageobject"
     */
    case SUFFIX_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.slice(-value.length) === value;
    /**
     * Represents an element with the att attribute whose value contains at least one
     * instance of the value. If value is the empty string then the
     * selector does not represent anything.
     * @example
     * [title*="hello"] matches title="well hello there"
     */
    case SUBSTRING_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.indexOf(value) !== -1;
    default:
      throw new Error('Enzyme::Selector: Unknown attribute selector operator "' + String(operator) + '"');
  }
}

function matchPseudoSelector(node, token, root) {
  var name = token.name,
      parameters = token.parameters;

  if (name === 'not') {
    // eslint-disable-next-line no-use-before-define
    return parameters.every(function (selector) {
      return reduceTreeBySelector(selector, node).length === 0;
    });
  }
  if (name === 'empty') {
    return (0, _RSTTraversal.treeFilter)(node, function (n) {
      return n !== node;
    }).length === 0;
  }
  if (name === 'first-child') {
    var _findParentNode = (0, _RSTTraversal.findParentNode)(root, node),
        rendered = _findParentNode.rendered;

    var _rendered = _slicedToArray(rendered, 1),
        firstChild = _rendered[0];

    return firstChild === node;
  }
  if (name === 'last-child') {
    var _findParentNode2 = (0, _RSTTraversal.findParentNode)(root, node),
        _rendered2 = _findParentNode2.rendered;

    return _rendered2[_rendered2.length - 1] === node;
  }

  throw new TypeError('Enzyme::Selector does not support the "' + String(token.name) + '" pseudo-element or pseudo-class selectors.');
}

/**
 * Takes a node and a token and determines if the node
 * matches the predicate defined by the token.
 * @param {Node} node
 * @param {Token} token
 */
function nodeMatchesToken(node, token, root) {
  if (node === null || typeof node === 'string') {
    return false;
  }
  switch (token.type) {
    /**
     * Match against the className prop
     * @example '.active' matches <div className='active' />
     */
    case CLASS_SELECTOR:
      return (0, _RSTTraversal.hasClassName)(node, token.name);
    /**
     * Simple type matching
     * @example 'div' matches <div />
     */
    case TYPE_SELECTOR:
      return (0, _Utils.nodeHasType)(node, token.name);
    /**
     * Match against the `id` prop
     * @example '#nav' matches <ul id="nav" />
     */
    case ID_SELECTOR:
      return (0, _RSTTraversal.nodeHasId)(node, token.name);
    /**
     * Matches if an attribute is present, regardless
     * of its value
     * @example '[disabled]' matches <a disabled />
     */
    case ATTRIBUTE_PRESENCE:
      return matchAttributeSelector(node, token);
    /**
     * Matches if an attribute is present with the
     * provided value
     * @example '[data-foo=foo]' matches <div data-foo="foo" />
     */
    case ATTRIBUTE_VALUE:
      return matchAttributeSelector(node, token);
    case PSEUDO_ELEMENT:
    case PSEUDO_CLASS:
      return matchPseudoSelector(node, token, root);
    default:
      throw new Error('Unknown token type: ' + String(token.type));
  }
}

/**
 * Returns a predicate function that checks if a
 * node matches every token in the body of a selector
 * token.
 * @param {Token} token
 */
function buildPredicateFromToken(token, root) {
  return function (node) {
    return token.body.every(function (bodyToken) {
      return nodeMatchesToken(node, bodyToken, root);
    });
  };
}

/**
 * Returns whether a parsed selector is a complex selector, which
 * is defined as a selector that contains combinators.
 * @param {Array<Token>} tokens
 */
function isComplexSelector(tokens) {
  return tokens.some(function (token) {
    return token.type !== SELECTOR;
  });
}

/**
 * Takes a component constructor, object, or string representing
 * a simple selector and returns a predicate function that can
 * be applied to a single node.
 * @param {Function|Object|String} selector
 */
function buildPredicate(selector) {
  // If the selector is a string, parse it as a simple CSS selector
  if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    if (isComplexSelector(tokens)) {
      throw new TypeError('This method does not support complex CSS selectors');
    }
    // Simple selectors only have a single selector token
    return buildPredicateFromToken(tokens[0]);
  }

  // If the selector is an element type, check if the node's type matches
  var adapter = (0, _getAdapter2['default'])();
  var isElementType = adapter.isValidElementType ? adapter.isValidElementType(selector) : typeof selector === 'function';
  if (isElementType) {
    return function (node) {
      return node && node.type === selector;
    };
  }
  // If the selector is an non-empty object, treat the keys/values as props
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    if (!Array.isArray(selector) && selector !== null && Object.keys(selector).length > 0) {
      var hasUndefinedValues = (0, _object2['default'])(selector).some(function (value) {
        return typeof value === 'undefined';
      });
      if (hasUndefinedValues) {
        throw new TypeError('Enzyme::Props can’t have `undefined` values. Try using ‘findWhere()’ instead.');
      }
      return function (node) {
        return (0, _RSTTraversal.nodeMatchesObjectProps)(node, selector);
      };
    }
    throw new TypeError('Enzyme::Selector does not support an array, null, or empty object as a selector');
  }

  throw new TypeError('Enzyme::Selector expects a string, object, or valid element type (Component Constructor)');
}

/**
 * Matches only nodes which are adjacent siblings (direct next sibling)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 * @param {Node} root
 */
function matchAdjacentSiblings(nodes, predicate, root) {
  return nodes.reduce(function (matches, node) {
    var parent = (0, _RSTTraversal.findParentNode)(root, node);
    // If there's no parent, there's no siblings
    if (!parent) {
      return matches;
    }
    var parentChildren = (0, _RSTTraversal.childrenOfNode)(parent);
    var nodeIndex = parentChildren.indexOf(node);
    var adjacentSibling = parentChildren[nodeIndex + 1];
    // No sibling
    if (!adjacentSibling) {
      return matches;
    }
    if (predicate(adjacentSibling)) {
      matches.push(adjacentSibling);
    }
    return matches;
  }, []);
}

/**
 * Matches only nodes which are general siblings (any sibling *after*)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 * @param {Node} root
 */
function matchGeneralSibling(nodes, predicate, root) {
  return uniqueReduce(function (matches, node) {
    var parent = (0, _RSTTraversal.findParentNode)(root, node);
    if (!parent) {
      return matches;
    }
    var parentChildren = (0, _RSTTraversal.childrenOfNode)(parent);
    var nodeIndex = parentChildren.indexOf(node);
    var youngerSiblings = parentChildren.slice(nodeIndex + 1);
    return matches.concat(youngerSiblings.filter(predicate));
  }, nodes);
}

/**
 * Matches only nodes which are direct children (not grandchildren, etc.)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 */
function matchDirectChild(nodes, predicate) {
  return uniqueReduce(function (matches, node) {
    return matches.concat((0, _RSTTraversal.childrenOfNode)(node).filter(predicate));
  }, nodes);
}

/**
 * Matches all descendant nodes against a predicate,
 * returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 */
function matchDescendant(nodes, predicate) {
  return uniqueReduce(function (matches, node) {
    return matches.concat((0, _RSTTraversal.treeFilter)(node, predicate));
  }, (0, _arrayPrototype2['default'])(nodes.map(_RSTTraversal.childrenOfNode)));
}

/**
 * Takes an RST and reduces it to a set of nodes matching
 * the selector. The selector can be a simple selector, which
 * is handled by `buildPredicate`, or a complex CSS selector which
 * reduceTreeBySelector parses and reduces the tree based on the combinators.
 * @param {Function|Object|String} selector
 * @param {RSTNode} root
 */
function reduceTreeBySelector(selector, root) {
  if (typeof selector === 'function' || (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    return (0, _RSTTraversal.treeFilter)(root, buildPredicate(selector));
  }

  var results = [];
  if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    var index = 0;
    while (index < tokens.length) {
      var token = tokens[index];
      /**
       * There are two types of tokens in a CSS selector:
       *
       * 1. Selector tokens. These target nodes directly, like
       *    type or attribute selectors. These are easy to apply
       *    because we can traverse the tree and return only
       *    the nodes that match the predicate.
       *
       * 2. Combinator tokens. These tokens chain together
       *    selector nodes. For example > for children, or +
       *    for adjacent siblings. These are harder to match
       *    as we have to track where in the tree we are
       *    to determine if a selector node applies or not.
       */
      if (token.type === SELECTOR) {
        var predicate = buildPredicateFromToken(token, root);
        results = results.concat((0, _RSTTraversal.treeFilter)(root, predicate));
      } else {
        // We can assume there always all previously matched tokens since selectors
        // cannot start with combinators.
        var type = token.type;
        // We assume the next token is a selector, so move the index
        // forward and build the predicate.

        index += 1;
        var _predicate = buildPredicateFromToken(tokens[index], root);
        // We match against only the nodes which have already been matched,
        // since a combinator is meant to refine a previous selector.
        switch (type) {
          // The + combinator
          case ADJACENT_SIBLING:
            results = matchAdjacentSiblings(results, _predicate, root);
            break;
          // The ~ combinator
          case GENERAL_SIBLING:
            results = matchGeneralSibling(results, _predicate, root);
            break;
          // The > combinator
          case CHILD:
            results = matchDirectChild(results, _predicate);
            break;
          // The ' ' (whitespace) combinator
          case DESCENDANT:
            {
              results = matchDescendant(results, _predicate);
              break;
            }
          default:
            throw new Error('Unknown combinator selector: ' + String(type));
        }
      }
      index += 1;
    }
  } else {
    throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
  }
  return results;
}

function reduceTreesBySelector(selector, roots) {
  var results = roots.map(function (n) {
    return reduceTreeBySelector(selector, n);
  });
  return unique((0, _arrayPrototype2['default'])(results, 1));
}