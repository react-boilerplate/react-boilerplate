var List = require('../../utils/list');

module.exports = {
    parse: function() {
        return new List().appendData(
            this.Identifier()
        );
    }
};
