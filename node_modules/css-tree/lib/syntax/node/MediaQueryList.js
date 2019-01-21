var List = require('../../utils/list');
var COMMA = require('../../tokenizer').TYPE.Comma;

module.exports = {
    name: 'MediaQueryList',
    structure: {
        children: [['MediaQuery']]
    },
    parse: function(relative) {
        var children = new List();

        this.scanner.skipSC();

        while (!this.scanner.eof) {
            children.appendData(this.MediaQuery(relative));

            if (this.scanner.tokenType !== COMMA) {
                break;
            }

            this.scanner.next();
        }

        return {
            type: 'MediaQueryList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(processChunk, node) {
        this.eachComma(processChunk, node);
    }
};
