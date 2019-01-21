'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    parseGridAreas = _require.parseGridAreas,
    insertAreas = _require.insertAreas,
    prefixTrackProp = _require.prefixTrackProp,
    prefixTrackValue = _require.prefixTrackValue,
    getGridGap = _require.getGridGap,
    warnGridGap = _require.warnGridGap;

function getGridRows(tpl) {
    return tpl.trim().slice(1, -1).split(/['"]\s*['"]?/g);
}

var GridTemplateAreas = function (_Declaration) {
    _inherits(GridTemplateAreas, _Declaration);

    function GridTemplateAreas() {
        _classCallCheck(this, GridTemplateAreas);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Translate grid-template-areas to separate -ms- prefixed properties
     */
    GridTemplateAreas.prototype.insert = function insert(decl, prefix, prefixes, result) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        var hasColumns = false;
        var hasRows = false;
        var parent = decl.parent;
        var gap = getGridGap(decl);

        // remove already prefixed rows and columns
        // without gutter to prevent doubling prefixes
        parent.walkDecls(/-ms-grid-(rows|columns)/, function (i) {
            return i.remove();
        });

        // add empty tracks to rows and columns
        parent.walkDecls(/grid-template-(rows|columns)/, function (trackDecl) {
            if (trackDecl.prop === 'grid-template-rows') {
                hasRows = true;
                var prop = trackDecl.prop,
                    value = trackDecl.value;

                trackDecl.cloneBefore({
                    prop: prefixTrackProp({ prop: prop, prefix: prefix }),
                    value: prefixTrackValue({ value: value, gap: gap.row })
                });
            } else {
                hasColumns = true;
                var _prop = trackDecl.prop,
                    _value = trackDecl.value;

                trackDecl.cloneBefore({
                    prop: prefixTrackProp({ prop: _prop, prefix: prefix }),
                    value: prefixTrackValue({ value: _value, gap: gap.column })
                });
            }
        });

        var gridRows = getGridRows(decl.value);

        if (hasColumns && !hasRows && gap.row && gridRows.length > 1) {
            decl.cloneBefore({
                prop: '-ms-grid-rows',
                value: prefixTrackValue({
                    value: 'repeat(' + gridRows.length + ', auto)',
                    gap: gap.row
                }),
                raws: {}
            });
        }

        // warnings
        warnGridGap({
            gap: gap,
            hasColumns: hasColumns,
            decl: decl,
            result: result
        });

        var areas = parseGridAreas({
            rows: gridRows,
            gap: gap
        });

        insertAreas(areas, decl, result);

        return decl;
    };

    return GridTemplateAreas;
}(Declaration);

Object.defineProperty(GridTemplateAreas, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template-areas']
});


module.exports = GridTemplateAreas;