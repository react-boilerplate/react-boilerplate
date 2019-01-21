var List = require('../utils/list');
var Tokenizer = require('../tokenizer');
var Lexer = require('../lexer/Lexer');
var grammar = require('../lexer/grammar');
var createParser = require('../parser/create');
var createGenerator = require('../generator/create');
var createConvertor = require('../convertor/create');
var createWalker = require('../walker/create');
var clone = require('../utils/clone');
var names = require('../utils/names');
var mix = require('./config/mix');

function assign(dest, src) {
    for (var key in src) {
        dest[key] = src[key];
    }

    return dest;
}

function createSyntax(config) {
    var parse = createParser(config);
    var walker = createWalker(config);
    var generator = createGenerator(config);
    var convertor = createConvertor(walker);

    var syntax = {
        List: List,
        Tokenizer: Tokenizer,
        Lexer: Lexer,

        property: names.property,
        keyword: names.keyword,

        grammar: grammar,
        lexer: null,
        createLexer: function(config) {
            return new Lexer(config, syntax, syntax.lexer.structure);
        },

        parse: parse,

        walk: walker.walk,
        walkUp: walker.walkUp,
        walkRules: walker.walkRules,
        walkRulesRight: walker.walkRulesRight,
        walkDeclarations: walker.walkDeclarations,

        translate: generator.translate,
        translateWithSourceMap: generator.translateWithSourceMap,
        translateMarkup: generator.translateMarkup,

        clone: clone,
        fromPlainObject: convertor.fromPlainObject,
        toPlainObject: convertor.toPlainObject,

        createSyntax: function(config) {
            return createSyntax(mix({}, config));
        },
        fork: function(extension) {
            var base = mix({}, config); // copy of config
            return createSyntax(
                typeof extension === 'function'
                    ? extension(base, assign)
                    : mix(base, extension)
            );
        }
    };

    syntax.lexer = new Lexer({
        generic: true,
        types: config.types,
        properties: config.properties,
        node: config.node
    }, syntax);

    return syntax;
};

exports.create = function(config) {
    return createSyntax(mix({}, config));
};
