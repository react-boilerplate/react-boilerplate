var List = require('../../../utils/list');
var ALLOW_OF_CLAUSE = true;

module.exports = {
    parse: function() {
        return new List().appendData(
            this.Nth(ALLOW_OF_CLAUSE)
        );
    }
};
