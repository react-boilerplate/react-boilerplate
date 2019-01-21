var TYPE = require('../../tokenizer').TYPE;

var IDENTIFIER = TYPE.Identifier;
var COLON = TYPE.Colon;
var EXCLAMATIONMARK = TYPE.ExclamationMark;
var SOLIDUS = TYPE.Solidus;
var ASTERISK = TYPE.Asterisk;
var DOLLARSIGN = TYPE.DollarSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var SEMICOLON = TYPE.Semicolon;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;
var PLUSSIGN = TYPE.PlusSign;
var NUMBERSIGN = TYPE.NumberSign;

module.exports = {
    name: 'Declaration',
    structure: {
        important: [Boolean, String],
        property: String,
        value: ['Value', 'Raw']
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var property = readProperty.call(this);
        var important = false;
        var value;

        this.scanner.skipSC();
        this.scanner.eat(COLON);

        if (isCustomProperty(property) ? this.parseCustomProperty : this.parseValue) {
            value = this.Value(property);
        } else {
            value = this.Raw(this.scanner.currentToken, EXCLAMATIONMARK, SEMICOLON, false, false);
        }

        if (this.scanner.tokenType === EXCLAMATIONMARK) {
            important = getImportant(this.scanner);
            this.scanner.skipSC();
        }

        // TODO: include or not to include semicolon to range?
        // if (this.scanner.tokenType === SEMICOLON) {
        //     this.scanner.next();
        // }

        if (!this.scanner.eof &&
            this.scanner.tokenType !== SEMICOLON &&
            this.scanner.tokenType !== RIGHTPARENTHESIS &&
            this.scanner.tokenType !== RIGHTCURLYBRACKET) {
            this.scanner.error();
        }

        return {
            type: 'Declaration',
            loc: this.getLocation(start, this.scanner.tokenStart),
            important: important,
            property: property,
            value: value
        };
    },
    generate: function(processChunk, node, item) {
        processChunk(node.property);
        processChunk(':');
        this.generate(processChunk, node.value);

        if (node.important) {
            processChunk(node.important === true ? '!important' : '!' + node.important);
        }

        if (item && item.next) {
            processChunk(';');
        }
    },
    walkContext: 'declaration'
};

function isCustomProperty(name) {
    return name.length >= 2 &&
           name.charCodeAt(0) === HYPHENMINUS &&
           name.charCodeAt(1) === HYPHENMINUS;
}

function readProperty() {
    var start = this.scanner.tokenStart;
    var prefix = 0;

    // hacks
    switch (this.scanner.tokenType) {
        case ASTERISK:
        case DOLLARSIGN:
        case PLUSSIGN:
        case NUMBERSIGN:
            prefix = 1;
            break;

        // TODO: not sure we should support this hack
        case SOLIDUS:
            prefix = this.scanner.lookupType(1) === SOLIDUS ? 2 : 1;
            break;
    }

    if (this.scanner.lookupType(prefix) === HYPHENMINUS) {
        prefix++;
    }

    if (prefix) {
        this.scanner.skip(prefix);
    }

    this.scanner.eat(IDENTIFIER);

    return this.scanner.substrToCursor(start);
}

// ! ws* important
function getImportant(scanner) {
    scanner.eat(EXCLAMATIONMARK);
    scanner.skipSC();

    var important = scanner.consume(IDENTIFIER);

    // store original value in case it differ from `important`
    // for better original source restoring and hacks like `!ie` support
    return important === 'important' ? true : important;
}
