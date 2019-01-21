var TYPE = require('../../tokenizer').TYPE;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

module.exports = {
    name: 'Parentheses',
    structure: {
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var children = null;

        this.scanner.eat(LEFTPARENTHESIS);
        children = readSequence.call(this, recognizer);
        this.scanner.eat(RIGHTPARENTHESIS);

        return {
            type: 'Parentheses',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(processChunk, node) {
        processChunk('(');
        this.each(processChunk, node);
        processChunk(')');
    }
};
