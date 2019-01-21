var List = require('../../../utils/list');

module.exports = {
    parse: function selectorList() {
        return new List().appendData(
            this.SelectorList()
        );
    }
};
