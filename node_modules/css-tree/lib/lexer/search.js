var List = require('../utils/list');

function getFirstMatchNode(matchNode) {
    if (matchNode.type === 'ASTNode') {
        return matchNode.node;
    }

    if (matchNode.match.length !== 0) {
        return getFirstMatchNode(matchNode.match[0]);
    }

    return null;
}

function getLastMatchNode(matchNode) {
    if (matchNode.type === 'ASTNode') {
        return matchNode.node;
    }

    if (matchNode.match.length !== 0) {
        return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
    }

    return null;
}

function matchFragments(lexer, ast, match, type, name) {
    function findFragments(matchNode) {
        if (matchNode.type === 'ASTNode') {
            return;
        }

        if (matchNode.syntax.type === type &&
            matchNode.syntax.name === name) {
            var start = getFirstMatchNode(matchNode);
            var end = getLastMatchNode(matchNode);

            lexer.syntax.walk(ast, function(node, item, list) {
                if (node === start) {
                    var nodes = new List();
                    var loc = null;

                    do {
                        nodes.appendData(item.data);

                        if (item.data === end) {
                            break;
                        }

                        item = item.next;
                    } while (item !== null);

                    if (start.loc !== null && end.loc !== null) {
                        loc = {
                            source: start.loc.source,
                            start: start.loc.start,
                            end: end.loc.end
                        };
                    }

                    fragments.push({
                        parent: list,
                        loc: loc,
                        nodes: nodes
                    });
                }
            });
        }

        matchNode.match.forEach(findFragments);
    }

    var fragments = [];

    if (match.matched !== null) {
        findFragments(match.matched);
    }

    return fragments;
}

module.exports = {
    matchFragments: matchFragments
};
