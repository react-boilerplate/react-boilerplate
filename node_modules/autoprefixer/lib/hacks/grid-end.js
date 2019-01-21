'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridEnd = function (_Declaration) {
    _inherits(GridEnd, _Declaration);

    function GridEnd() {
        _classCallCheck(this, GridEnd);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change repeating syntax for IE
     */
    GridEnd.prototype.insert = function insert(decl, prefix, prefixes, result) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        var clonedDecl = this.clone(decl);

        var startProp = decl.prop.replace(/end$/, 'start');
        var spanProp = prefix + decl.prop.replace(/end$/, 'span');

        if (decl.parent.some(function (i) {
            return i.prop === spanProp;
        })) {
            return undefined;
        }

        clonedDecl.prop = spanProp;

        if (decl.value.includes('span')) {
            clonedDecl.value = decl.value.replace(/span\s/i, '');
        } else {
            var startDecl = void 0;
            decl.parent.walkDecls(startProp, function (d) {
                startDecl = d;
            });
            if (startDecl) {
                var value = Number(decl.value) - Number(startDecl.value) + '';
                clonedDecl.value = value;
            } else {
                decl.warn(result, 'Can not prefix ' + decl.prop + ' (' + startProp + ' is not found)');
            }
        }

        decl.cloneBefore(clonedDecl);

        return undefined;
    };

    return GridEnd;
}(Declaration);

Object.defineProperty(GridEnd, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row-end', 'grid-column-end']
});


module.exports = GridEnd;