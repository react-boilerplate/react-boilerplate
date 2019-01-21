var List = require('../../utils/list');
var TYPE = require('../../tokenizer').TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENTIFIER = TYPE.Identifier;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

module.exports = {
    name: 'MediaQuery',
    structure: {
        children: [['Identifier', 'MediaFeature', 'WhiteSpace']]
    },
    parse: function() {
        this.scanner.skipSC();

        var children = new List();
        var child = null;
        var space = null;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case COMMENT:
                    this.scanner.next();
                    continue;

                case WHITESPACE:
                    space = this.WhiteSpace();
                    continue;

                case IDENTIFIER:
                    child = this.Identifier();
                    break;

                case LEFTPARENTHESIS:
                    child = this.MediaFeature();
                    break;

                default:
                    break scan;
            }

            if (space !== null) {
                children.appendData(space);
                space = null;
            }

            children.appendData(child);
        }

        if (child === null) {
            this.scanner.error('Identifier or parenthesis is expected');
        }

        return {
            type: 'MediaQuery',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(processChunk, node) {
        this.each(processChunk, node);
    }
};
