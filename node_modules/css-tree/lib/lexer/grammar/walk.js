'use strict';

module.exports = function walk(node, fn, context) {
    switch (node.type) {
        case 'Group':
            node.terms.forEach(function(term) {
                walk(term, fn, context);
            });
            break;

        case 'Function':
        case 'Parentheses':
            walk(node.children, fn, context);
            break;

        case 'Keyword':
        case 'Type':
        case 'Property':
        case 'Combinator':
        case 'Comma':
        case 'Slash':
        case 'String':
        case 'Percent':
            break;

        default:
            throw new Error('Unknown type: ' + node.type);
    }

    fn.call(context, node);
};
