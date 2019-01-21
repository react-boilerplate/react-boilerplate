'use strict';

var Tokenizer = require('../tokenizer');
var sequence = require('./sequence');
var noop = function() {};

function createParseContext(name) {
    return function() {
        return this[name]();
    };
}

function processConfig(config) {
    var parserConfig = {
        context: {},
        scope: {},
        atrule: {},
        pseudo: {}
    };

    if (config.parseContext) {
        for (var name in config.parseContext) {
            switch (typeof config.parseContext[name]) {
                case 'function':
                    parserConfig.context[name] = config.parseContext[name];
                    break;

                case 'string':
                    parserConfig.context[name] = createParseContext(config.parseContext[name]);
                    break;
            }
        }
    }

    if (config.scope) {
        for (var name in config.scope) {
            parserConfig.scope[name] = config.scope[name];
        }
    }

    if (config.atrule) {
        for (var name in config.atrule) {
            var atrule = config.atrule[name];

            if (atrule.parse) {
                parserConfig.atrule[name] = atrule.parse;
            }
        }
    }

    if (config.pseudo) {
        for (var name in config.pseudo) {
            var pseudo = config.pseudo[name];

            if (pseudo.parse) {
                parserConfig.pseudo[name] = pseudo.parse;
            }
        }
    }

    if (config.node) {
        for (var name in config.node) {
            parserConfig[name] = config.node[name].parse;
        }
    }

    return parserConfig;
}

module.exports = function createParser(config) {
    var parser = {
        scanner: new Tokenizer(),
        filename: '<unknown>',
        needPositions: false,
        tolerant: false,
        onParseError: noop,
        parseAtrulePrelude: true,
        parseRulePrelude: true,
        parseValue: true,
        parseCustomProperty: false,

        readSequence: sequence,

        tolerantParse: function(consumer, fallback) {
            if (this.tolerant) {
                var start = this.scanner.currentToken;

                try {
                    return consumer.call(this);
                } catch (e) {
                    var fallbackNode = fallback.call(this, start);
                    this.onParseError(e, fallbackNode);
                    return fallbackNode;
                }
            } else {
                return consumer.call(this);
            }
        },

        getLocation: function(start, end) {
            if (this.needPositions) {
                return this.scanner.getLocationRange(
                    start,
                    end,
                    this.filename
                );
            }

            return null;
        },
        getLocationFromList: function(list) {
            if (this.needPositions) {
                return this.scanner.getLocationRange(
                    list.head !== null ? list.first().loc.start.offset - this.scanner.startOffset : this.scanner.tokenStart,
                    list.head !== null ? list.last().loc.end.offset - this.scanner.startOffset : this.scanner.tokenStart,
                    this.filename
                );
            }

            return null;
        }
    };

    config = processConfig(config || {});
    for (var key in config) {
        parser[key] = config[key];
    }

    return function(source, options) {
        options = options || {};

        var context = options.context || 'default';
        var ast;

        parser.scanner.setSource(source, options.offset, options.line, options.column);
        parser.filename = options.filename || '<unknown>';
        parser.needPositions = Boolean(options.positions);
        parser.tolerant = Boolean(options.tolerant);
        parser.onParseError = typeof options.onParseError === 'function' ? options.onParseError : noop;
        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

        if (!parser.context.hasOwnProperty(context)) {
            throw new Error('Unknown context `' + context + '`');
        }

        ast = parser.context[context].call(parser, options);

        if (!parser.scanner.eof) {
            parser.scanner.error();
        }

        // console.log(JSON.stringify(ast, null, 4));
        return ast;
    };
};
