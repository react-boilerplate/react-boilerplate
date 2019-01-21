var List = require('../../utils/list');
var TYPE = require('../../tokenizer').TYPE;

var COMMA = TYPE.Comma;

module.exports = {
    name: 'SelectorList',
    structure: {
        children: [['Selector', 'Raw']]
    },
    parse: function() {
        var children = new List();

        while (!this.scanner.eof) {
            children.appendData(this.Selector());

            if (this.scanner.tokenType === COMMA) {
                this.scanner.next();
                continue;
            }

            break;
        }

        return {
            type: 'SelectorList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(processChunk, node) {
        this.eachComma(processChunk, node);
    },
    walkContext: 'selector'
};
