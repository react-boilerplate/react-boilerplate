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
        if ((typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults)) !== 'object' && typeof defaults !== 'undefined') {
            throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
        }
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
        if (this.parent) {
            for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
                nodes[_key] = arguments[_key];
            }

            for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var node = _ref;

                this.parent.insertBefore(this, node);
            }

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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGUuZXM2Il0sIm5hbWVzIjpbImNsb25lTm9kZSIsIm9iaiIsInBhcmVudCIsImNsb25lZCIsImNvbnN0cnVjdG9yIiwiaSIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiQXJyYXkiLCJtYXAiLCJqIiwiTm9kZSIsImRlZmF1bHRzIiwicmF3cyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvcHRzIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImlucHV0IiwibGluZSIsImNvbHVtbiIsIndhcm4iLCJyZXN1bHQiLCJ0ZXh0IiwiZGF0YSIsIm5vZGUiLCJyZW1vdmUiLCJyZW1vdmVDaGlsZCIsInVuZGVmaW5lZCIsInRvU3RyaW5nIiwic3RyaW5naWZpZXIiLCJjbG9uZSIsIm92ZXJyaWRlcyIsImNsb25lQmVmb3JlIiwiaW5zZXJ0QmVmb3JlIiwiY2xvbmVBZnRlciIsImluc2VydEFmdGVyIiwicmVwbGFjZVdpdGgiLCJub2RlcyIsIm1vdmVUbyIsIm5ld1BhcmVudCIsImNsZWFuUmF3cyIsInJvb3QiLCJhcHBlbmQiLCJtb3ZlQmVmb3JlIiwib3RoZXJOb2RlIiwibW92ZUFmdGVyIiwibmV4dCIsImluZGV4IiwicHJldiIsInRvSlNPTiIsImZpeGVkIiwicmF3IiwicHJvcCIsImRlZmF1bHRUeXBlIiwic3RyIiwia2VlcEJldHdlZW4iLCJiZWZvcmUiLCJhZnRlciIsImJldHdlZW4iLCJwb3NpdGlvbkluc2lkZSIsInN0cmluZyIsInN0YXJ0Iiwid29yZCIsImluZGV4T2YiLCJyZW1vdmVTZWxmIiwicmVwbGFjZSIsInN0eWxlIiwib3duIiwiZGV0ZWN0IiwiY2xlYW5TdHlsZXMiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsWUFBWSxTQUFaQSxTQUFZLENBQVVDLEdBQVYsRUFBZUMsTUFB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Ozs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBb0NXbEUsSTs7QUFFZjs7Ozs7O0FBTUEiLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDc3NTeW50YXhFcnJvciBmcm9tICcuL2Nzcy1zeW50YXgtZXJyb3InO1xuaW1wb3J0IFN0cmluZ2lmaWVyICAgIGZyb20gJy4vc3RyaW5naWZpZXInO1xuaW1wb3J0IHN0cmluZ2lmeSAgICAgIGZyb20gJy4vc3RyaW5naWZ5JztcbmltcG9ydCB3YXJuT25jZSAgICAgICBmcm9tICcuL3dhcm4tb25jZSc7XG5cbmxldCBjbG9uZU5vZGUgPSBmdW5jdGlvbiAob2JqLCBwYXJlbnQpIHtcbiAgICBsZXQgY2xvbmVkID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xuXG4gICAgZm9yICggbGV0IGkgaW4gb2JqICkge1xuICAgICAgICBpZiAoICFvYmouaGFzT3duUHJvcGVydHkoaSkgKSBjb250aW51ZTtcbiAgICAgICAgbGV0IHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBsZXQgdHlwZSAgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICAgICAgaWYgKCBpID09PSAncGFyZW50JyAmJiB0eXBlID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIGNsb25lZFtpXSA9IHBhcmVudDtcbiAgICAgICAgfSBlbHNlIGlmICggaSA9PT0gJ3NvdXJjZScgKSB7XG4gICAgICAgICAgICBjbG9uZWRbaV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcbiAgICAgICAgICAgIGNsb25lZFtpXSA9IHZhbHVlLm1hcCggaiA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSApO1xuICAgICAgICB9IGVsc2UgaWYgKCBpICE9PSAnYmVmb3JlJyAgJiYgaSAhPT0gJ2FmdGVyJyAmJlxuICAgICAgICAgICAgICAgICAgICBpICE9PSAnYmV0d2VlbicgJiYgaSAhPT0gJ3NlbWljb2xvbicgKSB7XG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsICkgdmFsdWUgPSBjbG9uZU5vZGUodmFsdWUpO1xuICAgICAgICAgICAgY2xvbmVkW2ldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVkO1xufTtcblxuLyoqXG4gKiBBbGwgbm9kZSBjbGFzc2VzIGluaGVyaXQgdGhlIGZvbGxvd2luZyBjb21tb24gbWV0aG9kcy5cbiAqXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHZhbHVlIGZvciBub2RlIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0cyA9IHsgfSkge1xuICAgICAgICB0aGlzLnJhd3MgPSB7IH07XG4gICAgICAgIGlmICggdHlwZW9mIGRlZmF1bHRzICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGVmYXVsdHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdQb3N0Q1NTIG5vZGVzIGNvbnN0cnVjdG9yIGFjY2VwdHMgb2JqZWN0LCBub3QgJyArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdHMpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKCBsZXQgbmFtZSBpbiBkZWZhdWx0cyApIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBkZWZhdWx0c1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBDc3NTeW50YXhFcnJvciBpbnN0YW5jZSBjb250YWluaW5nIHRoZSBvcmlnaW5hbCBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBub2RlIGluIHRoZSBzb3VyY2UsIHNob3dpbmcgbGluZSBhbmQgY29sdW1uIG51bWJlcnMgYW5kIGFsc29cbiAgICAgKiBhIHNtYWxsIGV4Y2VycHQgdG8gZmFjaWxpdGF0ZSBkZWJ1Z2dpbmcuXG4gICAgICpcbiAgICAgKiBJZiBwcmVzZW50LCBhbiBpbnB1dCBzb3VyY2UgbWFwIHdpbGwgYmUgdXNlZCB0byBnZXQgdGhlIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICogb2YgdGhlIHNvdXJjZSwgZXZlbiBmcm9tIGEgcHJldmlvdXMgY29tcGlsYXRpb24gc3RlcFxuICAgICAqIChlLmcuLCBmcm9tIFNhc3MgY29tcGlsYXRpb24pLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgcHJvZHVjZXMgdmVyeSB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAgICAgLSBlcnJvciBkZXNjcmlwdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0c10gICAgICAtIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gLSBwbHVnaW4gbmFtZSB0aGF0IGNyZWF0ZWQgdGhpcyBlcnJvci5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3N0Q1NTIHdpbGwgc2V0IGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIC0gYSB3b3JkIGluc2lkZSBhIG5vZGXigJlzIHN0cmluZyB0aGF0IHNob3VsZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdHMuaW5kZXggIC0gYW4gaW5kZXggaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaGlnaGxpZ2h0ZWQgYXMgdGhlIHNvdXJjZSBvZiB0aGUgZXJyb3JcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Nzc1N5bnRheEVycm9yfSBlcnJvciBvYmplY3QgdG8gdGhyb3cgaXRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaWYgKCAhdmFyaWFibGVzW25hbWVdICkge1xuICAgICAqICAgdGhyb3cgZGVjbC5lcnJvcignVW5rbm93biB2YXJpYWJsZSAnICsgbmFtZSwgeyB3b3JkOiBuYW1lIH0pO1xuICAgICAqICAgLy8gQ3NzU3ludGF4RXJyb3I6IHBvc3Rjc3MtdmFyczphLnNhc3M6NDozOiBVbmtub3duIHZhcmlhYmxlICRibGFja1xuICAgICAqICAgLy8gICBjb2xvcjogJGJsYWNrXG4gICAgICogICAvLyBhXG4gICAgICogICAvLyAgICAgICAgICBeXG4gICAgICogICAvLyAgIGJhY2tncm91bmQ6IHdoaXRlXG4gICAgICogfVxuICAgICAqL1xuICAgIGVycm9yKG1lc3NhZ2UsIG9wdHMgPSB7IH0pIHtcbiAgICAgICAgaWYgKCB0aGlzLnNvdXJjZSApIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLnBvc2l0aW9uQnkob3B0cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2UuaW5wdXQuZXJyb3IobWVzc2FnZSwgcG9zLmxpbmUsIHBvcy5jb2x1bW4sIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDc3NTeW50YXhFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHByb3ZpZGVkIGFzIGEgY29udmVuaWVuY2Ugd3JhcHBlciBmb3Ige0BsaW5rIFJlc3VsdCN3YXJufS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHQgICAgICAtIHRoZSB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgd2lsbCByZWNlaXZlIHRoZSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgICAgIC0gd2FybmluZyBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRzXSAgICAgIC0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnBsdWdpbiAtIHBsdWdpbiBuYW1lIHRoYXQgY3JlYXRlZCB0aGlzIHdhcm5pbmcuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zdENTUyB3aWxsIHNldCBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICAtIGEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdHMuaW5kZXggIC0gYW4gaW5kZXggaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaGlnaGxpZ2h0ZWQgYXMgdGhlIHNvdXJjZSBvZiB0aGUgd2FybmluZ1xuICAgICAqXG4gICAgICogQHJldHVybiB7V2FybmluZ30gY3JlYXRlZCB3YXJuaW5nIG9iamVjdFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBwbHVnaW4gPSBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1kZXByZWNhdGVkJywgKCkgPT4ge1xuICAgICAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICAgKiAgICAgcm9vdC53YWxrRGVjbHMoJ2JhZCcsIGRlY2wgPT4ge1xuICAgICAqICAgICAgIGRlY2wud2FybihyZXN1bHQsICdEZXByZWNhdGVkIHByb3BlcnR5IGJhZCcpO1xuICAgICAqICAgICB9KTtcbiAgICAgKiAgIH07XG4gICAgICogfSk7XG4gICAgICovXG4gICAgd2FybihyZXN1bHQsIHRleHQsIG9wdHMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7IG5vZGU6IHRoaXMgfTtcbiAgICAgICAgZm9yICggbGV0IGkgaW4gb3B0cyApIGRhdGFbaV0gPSBvcHRzW2ldO1xuICAgICAgICByZXR1cm4gcmVzdWx0Lndhcm4odGV4dCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGl0cyBwYXJlbnQgYW5kIGNsZWFucyB0aGUgcGFyZW50IHByb3BlcnRpZXNcbiAgICAgKiBmcm9tIHRoZSBub2RlIGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGlmICggZGVjbC5wcm9wLm1hdGNoKC9eLXdlYmtpdC0vKSApIHtcbiAgICAgKiAgIGRlY2wucmVtb3ZlKCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gbm9kZSB0byBtYWtlIGNhbGxzIGNoYWluXG4gICAgICovXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBpZiAoIHRoaXMucGFyZW50ICkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBDU1Mgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5naWZpZXJ8c3ludGF4fSBbc3RyaW5naWZpZXJdIC0gYSBzeW50YXggdG8gdXNlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBzdHJpbmcgZ2VuZXJhdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBDU1Mgc3RyaW5nIG9mIHRoaXMgbm9kZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnIH0pLnRvU3RyaW5nKCkgLy89PiBcImEge31cIlxuICAgICAqL1xuICAgIHRvU3RyaW5nKHN0cmluZ2lmaWVyID0gc3RyaW5naWZ5KSB7XG4gICAgICAgIGlmICggc3RyaW5naWZpZXIuc3RyaW5naWZ5ICkgc3RyaW5naWZpZXIgPSBzdHJpbmdpZmllci5zdHJpbmdpZnk7XG4gICAgICAgIGxldCByZXN1bHQgID0gJyc7XG4gICAgICAgIHN0cmluZ2lmaWVyKHRoaXMsIGkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGUgbm9kZS5cbiAgICAgKlxuICAgICAqIFRoZSByZXN1bHRpbmcgY2xvbmVkIG5vZGUgYW5kIGl0cyAoY2xvbmVkKSBjaGlsZHJlbiB3aWxsIGhhdmVcbiAgICAgKiBhIGNsZWFuIHBhcmVudCBhbmQgY29kZSBzdHlsZSBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIC0gbmV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBjbG9uZWQgPSBkZWNsLmNsb25lKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KTtcbiAgICAgKiBjbG9uZWQucmF3cy5iZWZvcmUgIC8vPT4gdW5kZWZpbmVkXG4gICAgICogY2xvbmVkLnBhcmVudCAgICAgICAvLz0+IHVuZGVmaW5lZFxuICAgICAqIGNsb25lZC50b1N0cmluZygpICAgLy89PiAtbW96LXRyYW5zZm9ybTogc2NhbGUoMClcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IGNsb25lIG9mIHRoZSBub2RlXG4gICAgICovXG4gICAgY2xvbmUob3ZlcnJpZGVzID0geyB9KSB7XG4gICAgICAgIGxldCBjbG9uZWQgPSBjbG9uZU5vZGUodGhpcyk7XG4gICAgICAgIGZvciAoIGxldCBuYW1lIGluIG92ZXJyaWRlcyApIHtcbiAgICAgICAgICAgIGNsb25lZFtuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIGNsb25lIHRoZSBub2RlIGFuZCBpbnNlcnQgdGhlIHJlc3VsdGluZyBjbG9uZWQgbm9kZVxuICAgICAqIGJlZm9yZSB0aGUgY3VycmVudCBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIC0gbmV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkZWNsLmNsb25lQmVmb3JlKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IC0gbmV3IG5vZGVcbiAgICAgKi9cbiAgICBjbG9uZUJlZm9yZShvdmVycmlkZXMgPSB7IH0pIHtcbiAgICAgICAgbGV0IGNsb25lZCA9IHRoaXMuY2xvbmUob3ZlcnJpZGVzKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGNsb25lZCk7XG4gICAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gY2xvbmUgdGhlIG5vZGUgYW5kIGluc2VydCB0aGUgcmVzdWx0aW5nIGNsb25lZCBub2RlXG4gICAgICogYWZ0ZXIgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3ZlcnJpZGVzXSAtIG5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IC0gbmV3IG5vZGVcbiAgICAgKi9cbiAgICBjbG9uZUFmdGVyKG92ZXJyaWRlcyA9IHsgfSkge1xuICAgICAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpO1xuICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRBZnRlcih0aGlzLCBjbG9uZWQpO1xuICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgbm9kZShzKSBiZWZvcmUgdGhlIGN1cnJlbnQgbm9kZSBhbmQgcmVtb3ZlcyB0aGUgY3VycmVudCBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5Ob2RlfSBub2RlcyAtIG5vZGUocykgdG8gcmVwbGFjZSBjdXJyZW50IG9uZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoIGF0cnVsZS5uYW1lID09ICdtaXhpbicgKSB7XG4gICAgICogICBhdHJ1bGUucmVwbGFjZVdpdGgobWl4aW5SdWxlc1thdHJ1bGUucGFyYW1zXSk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gY3VycmVudCBub2RlIHRvIG1ldGhvZHMgY2hhaW5cbiAgICAgKi9cbiAgICByZXBsYWNlV2l0aCguLi5ub2Rlcykge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgbm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gaXRzIGN1cnJlbnQgcGFyZW50IGFuZCBpbnNlcnRzIGl0XG4gICAgICogYXQgdGhlIGVuZCBvZiBgbmV3UGFyZW50YC5cbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBjbGVhbiB0aGUgYGJlZm9yZWAgYW5kIGBhZnRlcmAgY29kZSB7QGxpbmsgTm9kZSNyYXdzfSBkYXRhXG4gICAgICogZnJvbSB0aGUgbm9kZSBhbmQgcmVwbGFjZSB0aGVtIHdpdGggdGhlIGluZGVudGF0aW9uIHN0eWxlIG9mIGBuZXdQYXJlbnRgLlxuICAgICAqIEl0IHdpbGwgYWxzbyBjbGVhbiB0aGUgYGJldHdlZW5gIHByb3BlcnR5XG4gICAgICogaWYgYG5ld1BhcmVudGAgaXMgaW4gYW5vdGhlciB7QGxpbmsgUm9vdH0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lcn0gbmV3UGFyZW50IC0gY29udGFpbmVyIG5vZGUgd2hlcmUgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIG1vdmVkXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGF0cnVsZS5tb3ZlVG8oYXRydWxlLnJvb3QoKSk7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSBjdXJyZW50IG5vZGUgdG8gbWV0aG9kcyBjaGFpblxuICAgICAqL1xuICAgIG1vdmVUbyhuZXdQYXJlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhblJhd3ModGhpcy5yb290KCkgPT09IG5ld1BhcmVudC5yb290KCkpO1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICBuZXdQYXJlbnQuYXBwZW5kKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gaXRzIGN1cnJlbnQgcGFyZW50IGFuZCBpbnNlcnRzIGl0IGludG9cbiAgICAgKiBhIG5ldyBwYXJlbnQgYmVmb3JlIGBvdGhlck5vZGVgLlxuICAgICAqXG4gICAgICogVGhpcyB3aWxsIGFsc28gY2xlYW4gdGhlIG5vZGXigJlzIGNvZGUgc3R5bGUgcHJvcGVydGllcyBqdXN0IGFzIGl0IHdvdWxkXG4gICAgICogaW4ge0BsaW5rIE5vZGUjbW92ZVRvfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gb3RoZXJOb2RlIC0gbm9kZSB0aGF0IHdpbGwgYmUgYmVmb3JlIGN1cnJlbnQgbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gY3VycmVudCBub2RlIHRvIG1ldGhvZHMgY2hhaW5cbiAgICAgKi9cbiAgICBtb3ZlQmVmb3JlKG90aGVyTm9kZSkge1xuICAgICAgICB0aGlzLmNsZWFuUmF3cyh0aGlzLnJvb3QoKSA9PT0gb3RoZXJOb2RlLnJvb3QoKSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIG90aGVyTm9kZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKG90aGVyTm9kZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSBpdHMgY3VycmVudCBwYXJlbnQgYW5kIGluc2VydHMgaXQgaW50b1xuICAgICAqIGEgbmV3IHBhcmVudCBhZnRlciBgb3RoZXJOb2RlYC5cbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBhbHNvIGNsZWFuIHRoZSBub2Rl4oCZcyBjb2RlIHN0eWxlIHByb3BlcnRpZXMganVzdCBhcyBpdCB3b3VsZFxuICAgICAqIGluIHtAbGluayBOb2RlI21vdmVUb30uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IG90aGVyTm9kZSAtIG5vZGUgdGhhdCB3aWxsIGJlIGFmdGVyIGN1cnJlbnQgbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gY3VycmVudCBub2RlIHRvIG1ldGhvZHMgY2hhaW5cbiAgICAgKi9cbiAgICBtb3ZlQWZ0ZXIob3RoZXJOb2RlKSB7XG4gICAgICAgIHRoaXMuY2xlYW5SYXdzKHRoaXMucm9vdCgpID09PSBvdGhlck5vZGUucm9vdCgpKTtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgb3RoZXJOb2RlLnBhcmVudC5pbnNlcnRBZnRlcihvdGhlck5vZGUsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuZXh0IGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAgICogUmV0dXJucyBgdW5kZWZpbmVkYCBpZiB0aGUgY3VycmVudCBub2RlIGlzIHRoZSBsYXN0IGNoaWxkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZXx1bmRlZmluZWR9IG5leHQgbm9kZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoIGNvbW1lbnQudGV4dCA9PT0gJ2RlbGV0ZSBuZXh0JyApIHtcbiAgICAgKiAgIGNvbnN0IG5leHQgPSBjb21tZW50Lm5leHQoKTtcbiAgICAgKiAgIGlmICggbmV4dCApIHtcbiAgICAgKiAgICAgbmV4dC5yZW1vdmUoKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5ub2Rlc1tpbmRleCArIDFdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByZXZpb3VzIGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAgICogUmV0dXJucyBgdW5kZWZpbmVkYCBpZiB0aGUgY3VycmVudCBub2RlIGlzIHRoZSBmaXJzdCBjaGlsZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV8dW5kZWZpbmVkfSBwcmV2aW91cyBub2RlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGFubm90YXRpb24gPSBkZWNsLnByZXYoKTtcbiAgICAgKiBpZiAoIGFubm90YXRpb24udHlwZSA9PSAnY29tbWVudCcgKSB7XG4gICAgICogIHJlYWRBbm5vdGF0aW9uKGFubm90YXRpb24udGV4dCk7XG4gICAgICogfVxuICAgICAqL1xuICAgIHByZXYoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggLSAxXTtcbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGxldCBmaXhlZCA9IHsgfTtcblxuICAgICAgICBmb3IgKCBsZXQgbmFtZSBpbiB0aGlzICkge1xuICAgICAgICAgICAgaWYgKCAhdGhpcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKCBuYW1lID09PSAncGFyZW50JyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpc1tuYW1lXTtcblxuICAgICAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgICAgICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUubWFwKCBpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS50b0pTT04gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaS50b0pTT04oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnRvSlNPTiApIHtcbiAgICAgICAgICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLnRvSlNPTigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpeGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB7QGxpbmsgTm9kZSNyYXdzfSB2YWx1ZS4gSWYgdGhlIG5vZGUgaXMgbWlzc2luZ1xuICAgICAqIHRoZSBjb2RlIHN0eWxlIHByb3BlcnR5IChiZWNhdXNlIHRoZSBub2RlIHdhcyBtYW51YWxseSBidWlsdCBvciBjbG9uZWQpLFxuICAgICAqIFBvc3RDU1Mgd2lsbCB0cnkgdG8gYXV0b2RldGVjdCB0aGUgY29kZSBzdHlsZSBwcm9wZXJ0eSBieSBsb29raW5nXG4gICAgICogYXQgb3RoZXIgbm9kZXMgaW4gdGhlIHRyZWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAgICAgICAgICAtIG5hbWUgb2YgY29kZSBzdHlsZSBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVmYXVsdFR5cGVdIC0gbmFtZSBvZiBkZWZhdWx0IHZhbHVlLCBpdCBjYW4gYmUgbWlzc2VkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgYXMgcHJvcFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGJhY2tncm91bmQ6IHdoaXRlIH0nKTtcbiAgICAgKiByb290Lm5vZGVzWzBdLmFwcGVuZCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pO1xuICAgICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3cy5iZWZvcmUgICAvLz0+IHVuZGVmaW5lZFxuICAgICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3KCdiZWZvcmUnKSAvLz0+ICcgJ1xuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBjb2RlIHN0eWxlIHZhbHVlXG4gICAgICovXG4gICAgcmF3KHByb3AsIGRlZmF1bHRUeXBlKSB7XG4gICAgICAgIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIoKTtcbiAgICAgICAgcmV0dXJuIHN0ci5yYXcodGhpcywgcHJvcCwgZGVmYXVsdFR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBSb290IGluc3RhbmNlIG9mIHRoZSBub2Rl4oCZcyB0cmVlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByb290Lm5vZGVzWzBdLm5vZGVzWzBdLnJvb3QoKSA9PT0gcm9vdFxuICAgICAqXG4gICAgICogQHJldHVybiB7Um9vdH0gcm9vdCBwYXJlbnRcbiAgICAgKi9cbiAgICByb290KCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgd2hpbGUgKCByZXN1bHQucGFyZW50ICkgcmVzdWx0ID0gcmVzdWx0LnBhcmVudDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjbGVhblJhd3Moa2VlcEJldHdlZW4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucmF3cy5iZWZvcmU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJhd3MuYWZ0ZXI7XG4gICAgICAgIGlmICggIWtlZXBCZXR3ZWVuICkgZGVsZXRlIHRoaXMucmF3cy5iZXR3ZWVuO1xuICAgIH1cblxuICAgIHBvc2l0aW9uSW5zaWRlKGluZGV4KSB7XG4gICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBjb2x1bW4gPSB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW47XG4gICAgICAgIGxldCBsaW5lICAgPSB0aGlzLnNvdXJjZS5zdGFydC5saW5lO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGluZGV4OyBpKysgKSB7XG4gICAgICAgICAgICBpZiAoIHN0cmluZ1tpXSA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uID0gMTtcbiAgICAgICAgICAgICAgICBsaW5lICArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGxpbmUsIGNvbHVtbiB9O1xuICAgIH1cblxuICAgIHBvc2l0aW9uQnkob3B0cykge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnQ7XG4gICAgICAgIGlmICggb3B0cy5pbmRleCApIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdHMud29yZCApIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudG9TdHJpbmcoKS5pbmRleE9mKG9wdHMud29yZCk7XG4gICAgICAgICAgICBpZiAoIGluZGV4ICE9PSAtMSApIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZigpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjcmVtb3ZlU2VsZiBpcyBkZXByZWNhdGVkLiBVc2UgTm9kZSNyZW1vdmUuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHJlcGxhY2Uobm9kZXMpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjcmVwbGFjZSBpcyBkZXByZWNhdGVkLiBVc2UgTm9kZSNyZXBsYWNlV2l0aCcpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlV2l0aChub2Rlcyk7XG4gICAgfVxuXG4gICAgc3R5bGUob3duLCBkZXRlY3QpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjc3R5bGUoKSBpcyBkZXByZWNhdGVkLiBVc2UgTm9kZSNyYXcoKScpO1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcob3duLCBkZXRlY3QpO1xuICAgIH1cblxuICAgIGNsZWFuU3R5bGVzKGtlZXBCZXR3ZWVuKSB7XG4gICAgICAgIHdhcm5PbmNlKCdOb2RlI2NsZWFuU3R5bGVzKCkgaXMgZGVwcmVjYXRlZC4gVXNlIE5vZGUjY2xlYW5SYXdzKCknKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKTtcbiAgICB9XG5cbiAgICBnZXQgYmVmb3JlKCkge1xuICAgICAgICB3YXJuT25jZSgnTm9kZSNiZWZvcmUgaXMgZGVwcmVjYXRlZC4gVXNlIE5vZGUjcmF3cy5iZWZvcmUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3cy5iZWZvcmU7XG4gICAgfVxuXG4gICAgc2V0IGJlZm9yZSh2YWwpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjYmVmb3JlIGlzIGRlcHJlY2F0ZWQuIFVzZSBOb2RlI3Jhd3MuYmVmb3JlJyk7XG4gICAgICAgIHRoaXMucmF3cy5iZWZvcmUgPSB2YWw7XG4gICAgfVxuXG4gICAgZ2V0IGJldHdlZW4oKSB7XG4gICAgICAgIHdhcm5PbmNlKCdOb2RlI2JldHdlZW4gaXMgZGVwcmVjYXRlZC4gVXNlIE5vZGUjcmF3cy5iZXR3ZWVuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd3MuYmV0d2VlbjtcbiAgICB9XG5cbiAgICBzZXQgYmV0d2Vlbih2YWwpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjYmV0d2VlbiBpcyBkZXByZWNhdGVkLiBVc2UgTm9kZSNyYXdzLmJldHdlZW4nKTtcbiAgICAgICAgdGhpcy5yYXdzLmJldHdlZW4gPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSB0eXBlIC0gU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbm9kZeKAmXMgdHlwZS5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBQb3NzaWJsZSB2YWx1ZXMgYXJlIGByb290YCwgYGF0cnVsZWAsIGBydWxlYCxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBgZGVjbGAsIG9yIGBjb21tZW50YC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkudHlwZSAvLz0+ICdkZWNsJ1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7Q29udGFpbmVyfSBwYXJlbnQgLSB0aGUgbm9kZeKAmXMgcGFyZW50IG5vZGUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJvb3Qubm9kZXNbMF0ucGFyZW50ID09IHJvb3Q7XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgTm9kZSNcbiAgICAgKiBAbWVtYmVyIHtzb3VyY2V9IHNvdXJjZSAtIHRoZSBpbnB1dCBzb3VyY2Ugb2YgdGhlIG5vZGVcbiAgICAgKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGluIHNvdXJjZSBtYXAgZ2VuZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHlvdSBjcmVhdGUgYSBub2RlIG1hbnVhbGx5IChlLmcuLCB3aXRoIGBwb3N0Y3NzLmRlY2woKWApLFxuICAgICAqIHRoYXQgbm9kZSB3aWxsIG5vdCBoYXZlIGEgYHNvdXJjZWAgcHJvcGVydHkgYW5kIHdpbGwgYmUgYWJzZW50XG4gICAgICogZnJvbSB0aGUgc291cmNlIG1hcC4gRm9yIHRoaXMgcmVhc29uLCB0aGUgcGx1Z2luIGRldmVsb3BlciBzaG91bGRcbiAgICAgKiBjb25zaWRlciBjbG9uaW5nIG5vZGVzIHRvIGNyZWF0ZSBuZXcgb25lcyAoaW4gd2hpY2ggY2FzZSB0aGUgbmV3IG5vZGXigJlzXG4gICAgICogc291cmNlIHdpbGwgcmVmZXJlbmNlIHRoZSBvcmlnaW5hbCwgY2xvbmVkIG5vZGUpIG9yIHNldHRpbmdcbiAgICAgKiB0aGUgYHNvdXJjZWAgcHJvcGVydHkgbWFudWFsbHkuXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIC8vIEJhZFxuICAgICAqIGNvbnN0IHByZWZpeGVkID0gcG9zdGNzcy5kZWNsKHtcbiAgICAgKiAgIHByb3A6ICctbW96LScgKyBkZWNsLnByb3AsXG4gICAgICogICB2YWx1ZTogZGVjbC52YWx1ZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gR29vZFxuICAgICAqIGNvbnN0IHByZWZpeGVkID0gZGVjbC5jbG9uZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGlmICggYXRydWxlLm5hbWUgPT0gJ2FkZC1saW5rJyApIHtcbiAgICAgKiAgIGNvbnN0IHJ1bGUgPSBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnLCBzb3VyY2U6IGF0cnVsZS5zb3VyY2UgfSk7XG4gICAgICogICBhdHJ1bGUucGFyZW50Lmluc2VydEJlZm9yZShhdHJ1bGUsIHJ1bGUpO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZGVjbC5zb3VyY2UuaW5wdXQuZnJvbSAvLz0+ICcvaG9tZS9haS9hLnNhc3MnXG4gICAgICogZGVjbC5zb3VyY2Uuc3RhcnQgICAgICAvLz0+IHsgbGluZTogMTAsIGNvbHVtbjogMiB9XG4gICAgICogZGVjbC5zb3VyY2UuZW5kICAgICAgICAvLz0+IHsgbGluZTogMTAsIGNvbHVtbjogMTIgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIC0gSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAgICpcbiAgICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAgICpcbiAgICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgICAqICogYGFmdGVyYDogdGhlIHNwYWNlIHN5bWJvbHMgYWZ0ZXIgdGhlIGxhc3QgY2hpbGQgb2YgdGhlIG5vZGVcbiAgICAgKiAgIHRvIHRoZSBlbmQgb2YgdGhlIG5vZGUuXG4gICAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgICAqICAgZm9yIGRlY2xhcmF0aW9ucywgc2VsZWN0b3IgYW5kIGB7YCBmb3IgcnVsZXMsIG9yIGxhc3QgcGFyYW1ldGVyXG4gICAgICogICBhbmQgYHtgIGZvciBhdC1ydWxlcy5cbiAgICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyB0cnVlIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgICAqICAgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAgICogKiBgYWZ0ZXJOYW1lYDogdGhlIHNwYWNlIGJldHdlZW4gdGhlIGF0LXJ1bGUgbmFtZSBhbmQgaXRzIHBhcmFtZXRlcnMuXG4gICAgICogKiBgbGVmdGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gYC8qYCBhbmQgdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAgICogKiBgcmlnaHRgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZXR3ZWVuIHRoZSBjb21tZW504oCZcyB0ZXh0XG4gICAgICogICBhbmQgPGNvZGU+KiYjNDc7PC9jb2RlPi5cbiAgICAgKiAqIGBpbXBvcnRhbnRgOiB0aGUgY29udGVudCBvZiB0aGUgaW1wb3J0YW50IHN0YXRlbWVudCxcbiAgICAgKiAgIGlmIGl0IGlzIG5vdCBqdXN0IGAhaW1wb3J0YW50YC5cbiAgICAgKlxuICAgICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycywgZGVjbGFyYXRpb24gdmFsdWVzIGFuZCBhdC1ydWxlIHBhcmFtZXRlcnNcbiAgICAgKiBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsIGJ1dCBpdCBzdG9yZXMgb3JpZ2luIGNvbnRlbnQgaW4gcmF3c1xuICAgICAqIHByb3BlcnRpZXMuIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJ1xcbiAgJywgYmV0d2VlbjogJzonIH1cbiAgICAgKi9cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZSAgIC0gc291cmNlIGxpbmUgaW4gZmlsZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbHVtbiAtIHNvdXJjZSBjb2x1bW4gaW4gZmlsZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gc291cmNlXG4gKiBAcHJvcGVydHkge0lucHV0fSBpbnB1dCAgICAtIHtAbGluayBJbnB1dH0gd2l0aCBpbnB1dCBmaWxlXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBzdGFydCAtIFRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgbm9kZeKAmXMgc291cmNlXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBlbmQgICAtIFRoZSBlbmRpbmcgcG9zaXRpb24gb2YgdGhlIG5vZGXigJlzIHNvdXJjZVxuICovXG4iXX0=
