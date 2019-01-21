'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    parseTemplate = _require.parseTemplate,
    insertAreas = _require.insertAreas,
    getGridGap = _require.getGridGap,
    warnGridGap = _require.warnGridGap;

var GridTemplate = function (_Declaration) {
    _inherits(GridTemplate, _Declaration);

    function GridTemplate() {
        _classCallCheck(this, GridTemplate);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Translate grid-template to separate -ms- prefixed properties
     */
    GridTemplate.prototype.insert = function insert(decl, prefix, prefixes, result) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        if (decl.parent.some(function (i) {
            return i.prop === '-ms-grid-rows';
        })) {
            return undefined;
        }

        var gap = getGridGap(decl);

        var _parseTemplate = parseTemplate({
            decl: decl,
            gap: gap
        }),
            rows = _parseTemplate.rows,
            columns = _parseTemplate.columns,
            areas = _parseTemplate.areas;

        var hasAreas = Object.keys(areas).length > 0;
        var hasRows = Boolean(rows);
        var hasColumns = Boolean(columns);

        warnGridGap({
            gap: gap,
            hasColumns: hasColumns,
            decl: decl,
            result: result
        });

        if (hasRows && hasColumns || hasAreas) {
            decl.cloneBefore({
                prop: '-ms-grid-rows',
                value: rows,
                raws: {}
            });
        }

        if (hasColumns) {
            decl.cloneBefore({
                prop: '-ms-grid-columns',
                value: columns,
                raws: {}
            });
        }

        if (hasAreas) {
            insertAreas(areas, decl, result);
        }

        return decl;
    };

    return GridTemplate;
}(Declaration);

Object.defineProperty(GridTemplate, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template']
});


module.exports = GridTemplate;