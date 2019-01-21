Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.buildPredicate = buildPredicate;
exports.reduceTreeBySelector = reduceTreeBySelector;
exports.reduceTreesBySelector = reduceTreesBySelector;

var _rstSelectorParser = require('rst-selector-parser');

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _objectIs = require('object-is');

var _objectIs2 = _interopRequireDefault(_objectIs);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _RSTTraversal = require('./RSTTraversal');

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

/**
 * Calls reduce on a array of nodes with the passed
 * function, returning only unique results.
 * @param {Function} fn
 * @param {Array<Node>} nodes
 */
function uniqueReduce(fn, nodes) {
  return (0, _uniq2['default'])(nodes.reduce(fn, []));
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

/**
 * Takes a node and a token and determines if the node
 * matches the predicate defined by the token.
 * @param {Node} node
 * @param {Token} token
 */
function nodeMatchesToken(node, token) {
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
      throw new Error('Enzyme::Selector does not support pseudo-element or pseudo-class selectors.');
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
function buildPredicateFromToken(token) {
  return function (node) {
    return token.body.every(function (bodyToken) {
      return nodeMatchesToken(node, bodyToken);
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
  // If the selector is a function, check if the node's constructor matches
  if (typeof selector === 'function') {
    return function (node) {
      return node && node.type === selector;
    };
  }
  // If the selector is an non-empty object, treat the keys/values as props
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    if (!Array.isArray(selector) && selector !== null && !(0, _isEmpty2['default'])(selector)) {
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
  // If the selector is a string, parse it as a simple CSS selector
  if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    if (isComplexSelector(tokens)) {
      throw new TypeError('This method does not support complex CSS selectors');
    }
    // Simple selectors only have a single selector token
    return buildPredicateFromToken(tokens[0]);
  }
  throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
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
    var nodeIndex = parent.rendered.indexOf(node);
    var adjacentSibling = parent.rendered[nodeIndex + 1];
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
    var nodeIndex = parent.rendered.indexOf(node);
    parent.rendered.forEach(function (sibling, i) {
      if (i > nodeIndex && predicate(sibling)) {
        matches.push(sibling);
      }
    });
    return matches;
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
    var children = (0, _RSTTraversal.childrenOfNode)(node);
    children.forEach(function (child) {
      if (predicate(child)) {
        matches.push(child);
      }
    });
    return matches;
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
  }, nodes);
}

/**
 * Takes an RST and reduces it to a set of nodes matching
 * the selector. The selector can be a simple selector, which
 * is handled by `buildPredicate`, or a complex CSS selector which
 * reduceTreeBySelector parses and reduces the tree based on the combinators.
 * @param {Function|Object|String} selector
 * @param {RSTNode} wrapper
 */
function reduceTreeBySelector(selector, root) {
  var results = [];

  if (typeof selector === 'function' || (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    results = (0, _RSTTraversal.treeFilter)(root, buildPredicate(selector));
  } else if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    var index = 0;
    var token = null;
    while (index < tokens.length) {
      token = tokens[index];
      /**
       * There are two types of tokens in a CSS selector:
       *
       * 1. Selector tokens. These target nodes directly, like
       *    type or attribute selectors. These are easy to apply
       *    because we can travserse the tree and return only
       *    the nodes that match the predicate.
       *
       * 2. Combinator tokens. These tokens chain together
       *    selector nodes. For example > for children, or +
       *    for adjecent siblings. These are harder to match
       *    as we have to track where in the tree we are
       *    to determine if a selector node applies or not.
       */
      if (token.type === SELECTOR) {
        var predicate = buildPredicateFromToken(token);
        results = results.concat((0, _RSTTraversal.treeFilter)(root, predicate));
      } else {
        // We can assume there always all previously matched tokens since selectors
        // cannot start with combinators.
        var _token = token,
            type = _token.type;
        // We assume the next token is a selector, so move the index
        // forward and build the predicate.

        index += 1;
        token = tokens[index];
        var _predicate = buildPredicateFromToken(token);
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
            throw new Error('Unkown combinator selector: ' + String(type));
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
  return (0, _uniq2['default'])((0, _flatten2['default'])(results));
}