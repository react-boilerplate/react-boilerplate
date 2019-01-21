var List = require('../../utils/list');
var TYPE = require('../../tokenizer').TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENTIFIER = TYPE.Identifier;
var FUNCTION = TYPE.Function;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var HYPHENMINUS = TYPE.HyphenMinus;
var COLON = TYPE.Colon;

function consumeRaw() {
    return new List().appendData(
        this.Raw(this.scanner.currentToken, 0, 0, false, false)
    );
}

function parentheses() {
    var index = 0;

    this.scanner.skipSC();

    // TODO: make it simplier
    if (this.scanner.tokenType === IDENTIFIER) {
        index = 1;
    } else if (this.scanner.tokenType === HYPHENMINUS &&
               this.scanner.lookupType(1) === IDENTIFIER) {
        index = 2;
    }

    if (index !== 0 && this.scanner.lookupNonWSType(index) === COLON) {
        return new List().appendData(
            this.Declaration()
        );
    }

    return readSequence.call(this);
}

function readSequence() {
    var children = new List();
    var space = null;
    var child;

    this.scanner.skipSC();

    scan:
    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case WHITESPACE:
                space = this.WhiteSpace();
                continue;

            case COMMENT:
                this.scanner.next();
                continue;

            case FUNCTION:
                child = this.Function(consumeRaw, this.scope.AtrulePrelude);
                break;

            case IDENTIFIER:
                child = this.Identifier();
                break;

            case LEFTPARENTHESIS:
                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
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

    return children;
}

module.exports = {
    parse: {
        prelude: function() {
            var children = readSequence.call(this);

            if (children.isEmpty()) {
                this.scanner.error('Condition is expected');
            }

            return children;
        },
        block: function() {
            return this.Block(false);
        }
    }
};
