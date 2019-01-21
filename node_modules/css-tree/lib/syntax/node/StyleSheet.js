var List = require('../../utils/list');
var TYPE = require('../../tokenizer').TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var EXCLAMATIONMARK = TYPE.ExclamationMark;
var ATRULE = TYPE.Atrule;
var CDO = TYPE.CDO;
var CDC = TYPE.CDC;

function consumeRaw(startToken) {
    return this.Raw(startToken, 0, 0, false, false);
}

module.exports = {
    name: 'StyleSheet',
    structure: {
        children: [['Comment', 'Atrule', 'Rule', 'Raw']]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = new List();
        var child;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case WHITESPACE:
                    this.scanner.next();
                    continue;

                case COMMENT:
                    // ignore comments except exclamation comments (i.e. /*! .. */) on top level
                    if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== EXCLAMATIONMARK) {
                        this.scanner.next();
                        continue;
                    }

                    child = this.Comment();
                    break;

                case CDO: // <!--
                    child = this.CDO();
                    break;

                case CDC: // -->
                    child = this.CDC();
                    break;

                // CSS Syntax Module Level 3
                // §2.2 Error handling
                // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
                case ATRULE:
                    child = this.Atrule();
                    break;

                // Anything else starts a qualified rule ...
                default:
                    child = this.tolerantParse(this.Rule, consumeRaw);
            }

            children.appendData(child);
        }

        return {
            type: 'StyleSheet',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(processChunk, node) {
        this.each(processChunk, node);
    },
    walkContext: 'stylesheet'
};
