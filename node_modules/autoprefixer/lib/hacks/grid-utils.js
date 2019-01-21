'use strict';

var parser = require('postcss-value-parser');

function convert(value) {
    if (value && value.length === 2 && value[0] === 'span' && parseInt(value[1], 10) > 0) {
        return [false, parseInt(value[1], 10)];
    }

    if (value && value.length === 1 && parseInt(value[0], 10) > 0) {
        return [parseInt(value[0], 10), false];
    }

    return [false, false];
}

function translate(values, startIndex, endIndex) {
    var startValue = values[startIndex];
    var endValue = values[endIndex];

    if (!startValue) {
        return [false, false];
    }

    var _convert = convert(startValue),
        start = _convert[0],
        spanStart = _convert[1];

    var _convert2 = convert(endValue),
        end = _convert2[0],
        spanEnd = _convert2[1];

    if (start && !endValue) {
        return [start, false];
    }

    if (spanStart && end) {
        return [end - spanStart, spanStart];
    }

    if (start && spanEnd) {
        return [start, spanEnd];
    }

    if (start && end) {
        return [start, end - start];
    }

    return [false, false];
}

function parse(decl) {
    var node = parser(decl.value);

    var values = [];
    var current = 0;
    values[current] = [];

    for (var _iterator = node.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var i = _ref;

        if (i.type === 'div') {
            current += 1;
            values[current] = [];
        } else if (i.type === 'word') {
            values[current].push(i.value);
        }
    }

    return values;
}

function insertDecl(decl, prop, value) {
    if (value && !decl.parent.some(function (i) {
        return i.prop === '-ms-' + prop;
    })) {
        decl.cloneBefore({
            prop: '-ms-' + prop,
            value: value.toString()
        });
    }
}

// Track transforms

function prefixTrackProp(_ref2) {
    var prop = _ref2.prop,
        prefix = _ref2.prefix;

    return prefix + prop.replace('template-', '');
}

function transformRepeat(_ref3, _ref4) {
    var nodes = _ref3.nodes;
    var gap = _ref4.gap;

    var _nodes$reduce = nodes.reduce(function (result, node) {
        if (node.type === 'div' && node.value === ',') {
            result.key = 'size';
        } else {
            result[result.key].push(parser.stringify(node));
        }
        return result;
    }, {
        key: 'count',
        size: [],
        count: []
    }),
        count = _nodes$reduce.count,
        size = _nodes$reduce.size;

    if (gap) {
        var val = [];
        for (var i = 1; i <= count; i++) {
            if (gap && i > 1) {
                val.push(gap);
            }
            val.push(size.join());
        }
        return val.join(' ');
    }

    return '(' + size.join('') + ')[' + count.join('') + ']';
}

function prefixTrackValue(_ref5) {
    var value = _ref5.value,
        gap = _ref5.gap;

    var result = parser(value).nodes.reduce(function (nodes, node) {
        if (node.type === 'function' && node.value === 'repeat') {
            return nodes.concat({
                type: 'word',
                value: transformRepeat(node, { gap: gap })
            });
        }
        if (gap && node.type === 'space') {
            return nodes.concat({
                type: 'space',
                value: ' '
            }, {
                type: 'word',
                value: gap
            }, node);
        }
        return nodes.concat(node);
    }, []);

    return parser.stringify(result);
}

// Parse grid-template-areas

var DOTS = /^\.+$/;

function track(start, end) {
    return { start: start, end: end, span: end - start };
}

function getColumns(line) {
    return line.trim().split(/\s+/g);
}

function parseGridAreas(_ref6) {
    var rows = _ref6.rows,
        gap = _ref6.gap;

    return rows.reduce(function (areas, line, rowIndex) {

        if (gap.row) rowIndex *= 2;

        if (line.trim() === '') return areas;

        getColumns(line).forEach(function (area, columnIndex) {

            if (DOTS.test(area)) return;

            if (gap.column) columnIndex *= 2;

            if (typeof areas[area] === 'undefined') {

                areas[area] = {
                    column: track(columnIndex + 1, columnIndex + 2),
                    row: track(rowIndex + 1, rowIndex + 2)
                };
            } else {
                var _areas$area = areas[area],
                    column = _areas$area.column,
                    row = _areas$area.row;


                column.start = Math.min(column.start, columnIndex + 1);
                column.end = Math.max(column.end, columnIndex + 2);
                column.span = column.end - column.start;

                row.start = Math.min(row.start, rowIndex + 1);
                row.end = Math.max(row.end, rowIndex + 2);
                row.span = row.end - row.start;
            }
        });

        return areas;
    }, {});
}

// Parse grid-template

function testTrack(node) {
    return node.type === 'word' && /^\[.+\]$/.test(node.value);
}

function verifyRowSize(result) {
    if (result.areas.length > result.rows.length) {
        result.rows.push('auto');
    }
    return result;
}

function parseTemplate(_ref7) {
    var decl = _ref7.decl,
        gap = _ref7.gap;

    var gridTemplate = parser(decl.value).nodes.reduce(function (result, node) {
        var type = node.type,
            value = node.value;


        if (testTrack(node) || type === 'space') return result;

        // area
        if (type === 'string') {
            result = verifyRowSize(result);
            result.areas.push(value);
        }

        // values and function
        if (type === 'word' || type === 'function') {
            result[result.key].push(parser.stringify(node));
        }

        // devider(/)
        if (type === 'div' && value === '/') {
            result.key = 'columns';
            result = verifyRowSize(result);
        }

        return result;
    }, {
        key: 'rows',
        columns: [],
        rows: [],
        areas: []
    });

    return {
        areas: parseGridAreas({
            rows: gridTemplate.areas,
            gap: gap
        }),
        columns: prefixTrackValue({
            value: gridTemplate.columns.join(' '),
            gap: gap.column
        }),
        rows: prefixTrackValue({
            value: gridTemplate.rows.join(' '),
            gap: gap.row
        })
    };
}

// Insert parsed grid areas

function getMSDecls(area) {
    return [].concat({
        prop: '-ms-grid-row',
        value: String(area.row.start)
    }, area.row.span > 1 ? {
        prop: '-ms-grid-row-span',
        value: String(area.row.span)
    } : [], {
        prop: '-ms-grid-column',
        value: String(area.column.start)
    }, area.column.span > 1 ? {
        prop: '-ms-grid-column-span',
        value: String(area.column.span)
    } : []);
}

function getParentMedia(parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
        return parent;
    } else if (!parent.parent) {
        return false;
    }
    return getParentMedia(parent.parent);
}

function insertAreas(areas, decl, result) {
    var missed = Object.keys(areas);

    var parentMedia = getParentMedia(decl.parent);
    var rules = [];
    var areasLength = Object.keys(areas).length;
    var areasCount = 0;

    decl.root().walkDecls('grid-area', function (gridArea) {

        var value = gridArea.value;
        var area = areas[value];

        missed = missed.filter(function (e) {
            return e !== value;
        });

        if (area && parentMedia) {

            // create new rule
            var rule = decl.parent.clone({
                selector: gridArea.parent.selector
            });
            rule.removeAll();

            // insert prefixed decls in new rule
            getMSDecls(area).forEach(function (i) {
                return rule.append(Object.assign(i, {
                    raws: {
                        between: gridArea.raws.between
                    }
                }));
            });

            rules.push(rule);
            areasCount++;
            if (areasCount === areasLength) {
                var next = gridArea.parent.next();

                if (next && next.type === 'atrule' && next.name === 'media' && next.params === parentMedia.params && next.first.type === 'rule' && next.first.selector && parentMedia.first.selector && /^-ms-/.test(next.first.first.prop)) return undefined;

                var areaMedia = parentMedia.clone().removeAll().append(rules);
                gridArea.parent.after(areaMedia);
            }

            return undefined;
        }

        if (area) {
            gridArea.parent.walkDecls(/-ms-grid-(row|column)/, function (d) {
                d.remove();
            });

            // insert prefixed decls before grid-area
            getMSDecls(area).forEach(function (i) {
                return gridArea.cloneBefore(i);
            });
        }

        return undefined;
    });

    if (missed.length > 0) {
        decl.warn(result, 'Can not find grid areas: ' + missed.join(', '));
    }
}

// Gap utils

function getGridGap(decl) {

    var gap = {};

    // try to find gap
    var testGap = /^(grid-)?((row|column)-)?gap$/;
    decl.parent.walkDecls(testGap, function (_ref8) {
        var prop = _ref8.prop,
            value = _ref8.value;

        if (/^(grid-)?gap$/.test(prop)) {
            var _parser$nodes = parser(value).nodes,
                _parser$nodes$ = _parser$nodes[0],
                row = _parser$nodes$ === undefined ? {} : _parser$nodes$,
                _parser$nodes$2 = _parser$nodes[2],
                column = _parser$nodes$2 === undefined ? {} : _parser$nodes$2;


            gap.row = row.value;
            gap.column = column.value || row.value;
        }
        if (/^(grid-)?row-gap$/.test(prop)) gap.row = value;
        if (/^(grid-)?column-gap$/.test(prop)) gap.column = value;
    });

    return gap;
}

function warnGridGap(_ref9) {
    var gap = _ref9.gap,
        hasColumns = _ref9.hasColumns,
        decl = _ref9.decl,
        result = _ref9.result;

    var hasBothGaps = gap.row && gap.column;
    if (!hasColumns && (hasBothGaps || gap.column && !gap.row)) {
        delete gap.column;
        decl.warn(result, 'Can not impliment grid-gap without grid-tamplate-columns');
    }
}

module.exports = {
    parse: parse,
    translate: translate,
    parseTemplate: parseTemplate,
    parseGridAreas: parseGridAreas,
    insertAreas: insertAreas,
    insertDecl: insertDecl,
    prefixTrackProp: prefixTrackProp,
    prefixTrackValue: prefixTrackValue,
    getGridGap: getGridGap,
    warnGridGap: warnGridGap
};