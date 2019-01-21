var List = require('../../utils/list');

// legacy IE function
// expression '(' raw ')'
module.exports = function() {
    return new List().appendData(
        this.Raw(this.scanner.currentToken, 0, 0, false, false)
    );
};
