var TYPE = require('../../tokenizer').TYPE;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// <function-token> <sequence> ')'
module.exports = {
    name: 'Function',
    structure: {
        name: String,
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var name = this.scanner.consumeFunctionName();
        var nameLowerCase = name.toLowerCase();
        var children;

        children = recognizer.hasOwnProperty(nameLowerCase)
            ? recognizer[nameLowerCase].call(this, recognizer)
            : readSequence.call(this, recognizer);

        this.scanner.eat(RIGHTPARENTHESIS);

        return {
            type: 'Function',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(processChunk, node) {
        processChunk(node.name);
        processChunk('(');
        this.each(processChunk, node);
        processChunk(')');
    },
    walkContext: 'function'
};
