'use strict';

var SourceMapGenerator = require('source-map').SourceMapGenerator;
var trackNodes = {
    Atrule: true,
    Selector: true,
    Declaration: true
};

module.exports = function generateSourceMap(generator, ast) {
    var map = new SourceMapGenerator();
    var generated = {
        line: 1,
        column: 0
    };
    var original = {
        line: 0, // should be zero to add first mapping
        column: 0
    };
    var sourceMappingActive = false;
    var activatedGenerated = {
        line: 1,
        column: 0
    };
    var activatedMapping = {
        generated: activatedGenerated
    };

    var css = generator(ast, function(node, buffer, line, column) {
        if (!node.loc ||
            !node.loc.start ||
            !trackNodes.hasOwnProperty(node.type)) {
            return;
        }

        var nodeLine = node.loc.start.line;
        var nodeColumn = node.loc.start.column - 1;

        if (original.line !== nodeLine ||
            original.column !== nodeColumn) {
            original.line = nodeLine;
            original.column = nodeColumn;

            generated.line = line;
            generated.column = column;

            if (sourceMappingActive) {
                sourceMappingActive = false;
                if (generated.line !== activatedGenerated.line ||
                    generated.column !== activatedGenerated.column) {
                    map.addMapping(activatedMapping);
                }
            }

            sourceMappingActive = true;
            map.addMapping({
                source: node.loc.source,
                original: original,
                generated: generated
            });
        }

    }, function(node, buffer, line, column) {
        if (sourceMappingActive && trackNodes.hasOwnProperty(node.type)) {
            activatedGenerated.line = line;
            activatedGenerated.column = column;
        }
    });

    if (sourceMappingActive) {
        map.addMapping(activatedMapping);
    }

    return {
        css: css,
        map: map
    };
};
