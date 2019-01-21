var List = require('../../utils/list');

module.exports = {
    name: 'AtrulePrelude',
    structure: {
        children: [[]]
    },
    parse: function(name) {
        var children = null;

        if (name !== null) {
            name = name.toLowerCase();
        }

        if (this.atrule.hasOwnProperty(name)) {
            // custom consumer
            if (typeof this.atrule[name].prelude === 'function') {
                children = this.atrule[name].prelude.call(this);
            }
        } else {
            // default consumer
            this.scanner.skipSC();
            children = this.readSequence(this.scope.AtrulePrelude);
        }

        if (children === null) {
            children = new List();
        }

        return {
            type: 'AtrulePrelude',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(processChunk, node) {
        this.each(processChunk, node);
    },
    walkContext: 'atrulePrelude'
};
