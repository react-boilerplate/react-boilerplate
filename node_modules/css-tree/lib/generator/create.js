'use strict';

var sourceMapGenerator = require('./sourceMap');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var noop = function() {};

function each(processChunk, node) {
    var list = node.children;
    var cursor = list.head;

    while (cursor !== null) {
        this.generate(processChunk, cursor.data, cursor, list);
        cursor = cursor.next;
    }
}

function eachComma(processChunk, node) {
    var list = node.children;
    var cursor = list.head;

    while (cursor !== null) {
        if (cursor.prev) {
            processChunk(',');
        }

        this.generate(processChunk, cursor.data, cursor, list);
        cursor = cursor.next;
    }
}

function createGenerator(types) {
    var context = {
        generate: function(processChunk, node, item, list) {
            if (hasOwnProperty.call(types, node.type)) {
                types[node.type].call(this, processChunk, node, item, list);
            } else {
                throw new Error('Unknown node type: ' + node.type);
            }
        },
        each: each,
        eachComma: eachComma
    };

    return function(node, fn) {
        if (typeof fn !== 'function') {
            // default generator concats all chunks in a single string
            var buffer = [];
            context.generate(function(chunk) {
                buffer.push(chunk);
            }, node);
            return buffer.join('');
        }
        context.generate(fn, node);
    };
}

function createMarkupGenerator(types) {
    var context = {
        generate: function(processChunk, node, item, list) {
            if (hasOwnProperty.call(types, node.type)) {
                var nodeBuffer = [];
                types[node.type].call(this, function(chunk) {
                    nodeBuffer.push(chunk);
                }, node, item, list);
                processChunk({
                    node: node,
                    value: nodeBuffer
                });
            } else {
                throw new Error('Unknown node type: ' + node.type);
            }
        },
        each: each,
        eachComma: eachComma
    };

    return function(node, enter, leave) {
        function updatePos(str) {
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) === 10) { // \n
                    line++;
                    column = 0;
                } else {
                    column++;
                }
            }

            return str;
        }

        function walk(node, buffer) {
            var value = node.value;

            enter(node.node, buffer, line, column);

            if (typeof value === 'string') {
                buffer += updatePos(value);
            } else {
                for (var i = 0; i < value.length; i++) {
                    if (typeof value[i] === 'string') {
                        buffer += updatePos(value[i]);
                    } else {
                        buffer = walk(value[i], buffer);
                    }
                }
            }

            leave(node.node, buffer, line, column);

            return buffer;
        }

        if (typeof enter !== 'function') {
            enter = noop;
        }
        if (typeof leave !== 'function') {
            leave = noop;
        }

        var buffer = [];
        var line = 1;
        var column = 0;

        context.generate(function() {
            buffer.push.apply(buffer, arguments);
        }, node);

        return walk(buffer[0], '');
    };
}

function getTypesFromConfig(config) {
    var types = {};

    if (config.node) {
        for (var name in config.node) {
            var nodeType = config.node[name];

            types[name] = nodeType.generate;
        }
    }

    return types;
}

module.exports = function(config) {
    var types = getTypesFromConfig(config);
    var markupGenerator = createMarkupGenerator(types);

    return {
        translate: createGenerator(types),
        translateWithSourceMap: function(node) {
            return sourceMapGenerator(markupGenerator, node);
        },
        translateMarkup: markupGenerator
    };
};

module.exports.createGenerator = createGenerator;
module.exports.createMarkupGenerator = createMarkupGenerator;
module.exports.sourceMap = require('./sourceMap');
