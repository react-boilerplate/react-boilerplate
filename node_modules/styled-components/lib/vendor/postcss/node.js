'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _cssSyntaxError = require('./css-syntax-error');

var _cssSyntaxError2 = _interopRequireDefault(_cssSyntaxError);

var _stringifier = require('./stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _warnOnce = require('./warn-once');

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} position
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

/**
 * @typedef {object} source
 * @property {Input} input    - {@link Input} with input file
 * @property {position} start - The starting position of the node’s source
 * @property {position} end   - The ending position of the node’s source
 */

var cloneNode = function cloneNode(obj, parent) {
    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        var value = obj[i];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (i === 'parent' && type === 'object') {
            if (parent) cloned[i] = parent;
        } else if (i === 'source') {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (j) {
                return cloneNode(j, cloned);
            });
        } else if (i !== 'before' && i !== 'after' && i !== 'between' && i !== 'semicolon') {
            if (type === 'object' && value !== null) value = cloneNode(value);
            cloned[i] = value;
        }
    }

    return cloned;
};

/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */

var Node = function () {

    /**
     * @param {object} [defaults] - value for node properties
     */
    function Node() {
        var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Node);

        this.raws = {};
        for (var name in defaults) {
            this[name] = defaults[name];
        }
    }

    /**
     * Returns a CssSyntaxError instance containing the original position
     * of the node in the source, showing line and column numbers and also
     * a small excerpt to facilitate debugging.
     *
     * If present, an input source map will be used to get the original position
     * of the source, even from a previous compilation step
     * (e.g., from Sass compilation).
     *
     * This method produces very useful error messages.
     *
     * @param {string} message     - error description
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this error.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the error
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the error
     *
     * @return {CssSyntaxError} error object to throw it
     *
     * @example
     * if ( !variables[name] ) {
     *   throw decl.error('Unknown variable ' + name, { word: name });
     *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
     *   //   color: $black
     *   // a
     *   //          ^
     *   //   background: white
     * }
     */


    Node.prototype.error = function error(message) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.source) {
            var pos = this.positionBy(opts);
            return this.source.input.error(message, pos.line, pos.column, opts);
        } else {
            return new _cssSyntaxError2.default(message);
        }
    };

    /**
     * This method is provided as a convenience wrapper for {@link Result#warn}.
     *
     * @param {Result} result      - the {@link Result} instance
     *                               that will receive the warning
     * @param {string} text        - warning message
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this warning.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the warning
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the warning
     *
     * @return {Warning} created warning object
     *
     * @example
     * const plugin = postcss.plugin('postcss-deprecated', () => {
     *   return (root, result) => {
     *     root.walkDecls('bad', decl => {
     *       decl.warn(result, 'Deprecated property bad');
     *     });
     *   };
     * });
     */


    Node.prototype.warn = function warn(result, text, opts) {
        var data = { node: this };
        for (var i in opts) {
            data[i] = opts[i];
        }return result.warn(text, data);
    };

    /**
     * Removes the node from its parent and cleans the parent properties
     * from the node and its children.
     *
     * @example
     * if ( decl.prop.match(/^-webkit-/) ) {
     *   decl.remove();
     * }
     *
     * @return {Node} node to make calls chain
     */


    Node.prototype.remove = function remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = undefined;
        return this;
    };

    /**
     * Returns a CSS string representing the node.
     *
     * @param {stringifier|syntax} [stringifier] - a syntax to use
     *                                             in string generation
     *
     * @return {string} CSS string of this node
     *
     * @example
     * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
     */


    Node.prototype.toString = function toString() {
        var stringifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _stringify2.default;

        if (stringifier.stringify) stringifier = stringifier.stringify;
        var result = '';
        stringifier(this, function (i) {
            result += i;
        });
        return result;
    };

    /**
     * Returns a clone of the node.
     *
     * The resulting cloned node and its (cloned) children will have
     * a clean parent and code style properties.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * const cloned = decl.clone({ prop: '-moz-' + decl.prop });
     * cloned.raws.before  //=> undefined
     * cloned.parent       //=> undefined
     * cloned.toString()   //=> -moz-transform: scale(0)
     *
     * @return {Node} clone of the node
     */


    Node.prototype.clone = function clone() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = cloneNode(this);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * before the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * decl.cloneBefore({ prop: '-moz-' + decl.prop });
     *
     * @return {Node} - new node
     */


    Node.prototype.cloneBefore = function cloneBefore() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * after the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @return {Node} - new node
     */


    Node.prototype.cloneAfter = function cloneAfter() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
    };

    /**
     * Inserts node(s) before the current node and removes the current node.
     *
     * @param {...Node} nodes - node(s) to replace current one
     *
     * @example
     * if ( atrule.name == 'mixin' ) {
     *   atrule.replaceWith(mixinRules[atrule.params]);
     * }
     *
     * @return {Node} current node to methods chain
     */


    Node.prototype.replaceWith = function replaceWith() {
        var _this = this;

        if (this.parent) {
            for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
                nodes[_key] = arguments[_key];
            }

            nodes.forEach(function (node) {
                _this.parent.insertBefore(_this, node);
            });

            this.remove();
        }

        return this;
    };

    /**
     * Removes the node from its current parent and inserts it
     * at the end of `newParent`.
     *
     * This will clean the `before` and `after` code {@link Node#raws} data
     * from the node and replace them with the indentation style of `newParent`.
     * It will also clean the `between` property
     * if `newParent` is in another {@link Root}.
     *
     * @param {Container} newParent - container node where the current node
     *                                will be moved
     *
     * @example
     * atrule.moveTo(atrule.root());
     *
     * @return {Node} current node to methods chain
     */


    Node.prototype.moveTo = function moveTo(newParent) {
        this.cleanRaws(this.root() === newParent.root());
        this.remove();
        newParent.append(this);
        return this;
    };

    /**
     * Removes the node from its current parent and inserts it into
     * a new parent before `otherNode`.
     *
     * This will also clean the node’s code style properties just as it would
     * in {@link Node#moveTo}.
     *
     * @param {Node} otherNode - node that will be before current node
     *
     * @return {Node} current node to methods chain
     */


    Node.prototype.moveBefore = function moveBefore(otherNode) {
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertBefore(otherNode, this);
        return this;
    };

    /**
     * Removes the node from its current parent and inserts it into
     * a new parent after `otherNode`.
     *
     * This will also clean the node’s code style properties just as it would
     * in {@link Node#moveTo}.
     *
     * @param {Node} otherNode - node that will be after current node
     *
     * @return {Node} current node to methods chain
     */


    Node.prototype.moveAfter = function moveAfter(otherNode) {
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertAfter(otherNode, this);
        return this;
    };

    /**
     * Returns the next child of the node’s parent.
     * Returns `undefined` if the current node is the last child.
     *
     * @return {Node|undefined} next node
     *
     * @example
     * if ( comment.text === 'delete next' ) {
     *   const next = comment.next();
     *   if ( next ) {
     *     next.remove();
     *   }
     * }
     */


    Node.prototype.next = function next() {
        var index = this.parent.index(this);
        return this.parent.nodes[index + 1];
    };

    /**
     * Returns the previous child of the node’s parent.
     * Returns `undefined` if the current node is the first child.
     *
     * @return {Node|undefined} previous node
     *
     * @example
     * const annotation = decl.prev();
     * if ( annotation.type == 'comment' ) {
     *  readAnnotation(annotation.text);
     * }
     */


    Node.prototype.prev = function prev() {
        var index = this.parent.index(this);
        return this.parent.nodes[index - 1];
    };

    Node.prototype.toJSON = function toJSON() {
        var fixed = {};

        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;
            if (name === 'parent') continue;
            var value = this[name];

            if (value instanceof Array) {
                fixed[name] = value.map(function (i) {
                    if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && i.toJSON) {
                        return i.toJSON();
                    } else {
                        return i;
                    }
                });
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.toJSON) {
                fixed[name] = value.toJSON();
            } else {
                fixed[name] = value;
            }
        }

        return fixed;
    };

    /**
     * Returns a {@link Node#raws} value. If the node is missing
     * the code style property (because the node was manually built or cloned),
     * PostCSS will try to autodetect the code style property by looking
     * at other nodes in the tree.
     *
     * @param {string} prop          - name of code style property
     * @param {string} [defaultType] - name of default value, it can be missed
     *                                 if the value is the same as prop
     *
     * @example
     * const root = postcss.parse('a { background: white }');
     * root.nodes[0].append({ prop: 'color', value: 'black' });
     * root.nodes[0].nodes[1].raws.before   //=> undefined
     * root.nodes[0].nodes[1].raw('before') //=> ' '
     *
     * @return {string} code style value
     */


    Node.prototype.raw = function raw(prop, defaultType) {
        var str = new _stringifier2.default();
        return str.raw(this, prop, defaultType);
    };

    /**
     * Finds the Root instance of the node’s tree.
     *
     * @example
     * root.nodes[0].nodes[0].root() === root
     *
     * @return {Root} root parent
     */


    Node.prototype.root = function root() {
        var result = this;
        while (result.parent) {
            result = result.parent;
        }return result;
    };

    Node.prototype.cleanRaws = function cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween) delete this.raws.between;
    };

    Node.prototype.positionInside = function positionInside(index) {
        var string = this.toString();
        var column = this.source.start.column;
        var line = this.source.start.line;

        for (var i = 0; i < index; i++) {
            if (string[i] === '\n') {
                column = 1;
                line += 1;
            } else {
                column += 1;
            }
        }

        return { line: line, column: column };
    };

    Node.prototype.positionBy = function positionBy(opts) {
        var pos = this.source.start;
        if (opts.index) {
            pos = this.positionInside(opts.index);
        } else if (opts.word) {
            var index = this.toString().indexOf(opts.word);
            if (index !== -1) pos = this.positionInside(index);
        }
        return pos;
    };

    Node.prototype.removeSelf = function removeSelf() {
        (0, _warnOnce2.default)('Node#removeSelf is deprecated. Use Node#remove.');
        return this.remove();
    };

    Node.prototype.replace = function replace(nodes) {
        (0, _warnOnce2.default)('Node#replace is deprecated. Use Node#replaceWith');
        return this.replaceWith(nodes);
    };

    Node.prototype.style = function style(own, detect) {
        (0, _warnOnce2.default)('Node#style() is deprecated. Use Node#raw()');
        return this.raw(own, detect);
    };

    Node.prototype.cleanStyles = function cleanStyles(keepBetween) {
        (0, _warnOnce2.default)('Node#cleanStyles() is deprecated. Use Node#cleanRaws()');
        return this.cleanRaws(keepBetween);
    };

    _createClass(Node, [{
        key: 'before',
        get: function get() {
            (0, _warnOnce2.default)('Node#before is deprecated. Use Node#raws.before');
            return this.raws.before;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#before is deprecated. Use Node#raws.before');
            this.raws.before = val;
        }
    }, {
        key: 'between',
        get: function get() {
            (0, _warnOnce2.default)('Node#between is deprecated. Use Node#raws.between');
            return this.raws.between;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#between is deprecated. Use Node#raws.between');
            this.raws.between = val;
        }

        /**
         * @memberof Node#
         * @member {string} type - String representing the node’s type.
         *                         Possible values are `root`, `atrule`, `rule`,
         *                         `decl`, or `comment`.
         *
         * @example
         * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
         */

        /**
         * @memberof Node#
         * @member {Container} parent - the node’s parent node.
         *
         * @example
         * root.nodes[0].parent == root;
         */

        /**
         * @memberof Node#
         * @member {source} source - the input source of the node
         *
         * The property is used in source map generation.
         *
         * If you create a node manually (e.g., with `postcss.decl()`),
         * that node will not have a `source` property and will be absent
         * from the source map. For this reason, the plugin developer should
         * consider cloning nodes to create new ones (in which case the new node’s
         * source will reference the original, cloned node) or setting
         * the `source` property manually.
         *
         * ```js
         * // Bad
         * const prefixed = postcss.decl({
         *   prop: '-moz-' + decl.prop,
         *   value: decl.value
         * });
         *
         * // Good
         * const prefixed = decl.clone({ prop: '-moz-' + decl.prop });
         * ```
         *
         * ```js
         * if ( atrule.name == 'add-link' ) {
         *   const rule = postcss.rule({ selector: 'a', source: atrule.source });
         *   atrule.parent.insertBefore(atrule, rule);
         * }
         * ```
         *
         * @example
         * decl.source.input.from //=> '/home/ai/a.sass'
         * decl.source.start      //=> { line: 10, column: 2 }
         * decl.source.end        //=> { line: 10, column: 12 }
         */

        /**
         * @memberof Node#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         * * `afterName`: the space between the at-rule name and its parameters.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text
         *   and <code>*&#47;</code>.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans selectors, declaration values and at-rule parameters
         * from comments and extra spaces, but it stores origin content in raws
         * properties. As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);

    return Node;
}();

exports.default = Node;
module.exports = exports['default'];