var List = require('../../utils/list');

module.exports = {
    parse: {
        prelude: function() {
            return new List().appendData(
                this.SelectorList()
            );
        },
        block: function() {
            return this.Block(true);
        }
    }
};
