var List = require('../../utils/list');

module.exports = {
    parse: function compoundSelector() {
        return new List().appendData(
            this.Selector()
        );
    }
};
