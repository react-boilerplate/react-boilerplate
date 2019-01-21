'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var utils = require('./grid-utils');

var GridRowColumn = function (_Declaration) {
    _inherits(GridRowColumn, _Declaration);

    function GridRowColumn() {
        _classCallCheck(this, GridRowColumn);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Translate grid-row / grid-column to separate -ms- prefixed properties
     */
    GridRowColumn.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        var values = utils.parse(decl);

        var _utils$translate = utils.translate(values, 0, 1),
            start = _utils$translate[0],
            span = _utils$translate[1];

        [[decl.prop, start], [decl.prop + '-span', span]].forEach(function (_ref) {
            var prop = _ref[0],
                value = _ref[1];

            utils.insertDecl(decl, prop, value);
        });

        return undefined;
    };

    return GridRowColumn;
}(Declaration);

Object.defineProperty(GridRowColumn, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row', 'grid-column']
});


module.exports = GridRowColumn;