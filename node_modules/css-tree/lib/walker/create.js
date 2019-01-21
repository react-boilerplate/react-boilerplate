'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

function walkRules(node, item, list) {
    switch (node.type) {
        case 'StyleSheet':
            var oldStylesheet = this.stylesheet;
            this.stylesheet = node;

            node.children.each(walkRules, this);

            this.stylesheet = oldStylesheet;
            break;

        case 'Atrule':
            if (node.block !== null) {
                var oldAtrule = this.atrule;
                this.atrule = node;

                walkRules.call(this, node.block);

                this.atrule = oldAtrule;
            }

            this.fn(node, item, list);
            break;

        case 'Rule':
            this.fn(node, item, list);

            var oldRule = this.rule;
            this.rule = node;

            walkRules.call(this, node.block);

            this.rule = oldRule;
            break;

        case 'Block':
            var oldBlock = this.block;
            this.block = node;

            node.children.each(walkRules, this);

            this.block = oldBlock;
            break;
    }
}

function walkRulesRight(node, item, list) {
    switch (node.type) {
        case 'StyleSheet':
            var oldStylesheet = this.stylesheet;
            this.stylesheet = node;

            node.children.eachRight(walkRulesRight, this);

            this.stylesheet = oldStylesheet;
            break;

        case 'Atrule':
            if (node.block !== null) {
                var oldAtrule = this.atrule;
                this.atrule = node;

                walkRulesRight.call(this, node.block);

                this.atrule = oldAtrule;
            }

            this.fn(node, item, list);
            break;

        case 'Rule':
            var oldRule = this.rule;
            this.rule = node;

            walkRulesRight.call(this, node.block);

            this.rule = oldRule;

            this.fn(node, item, list);
            break;

        case 'Block':
            var oldBlock = this.block;
            this.block = node;

            node.children.eachRight(walkRulesRight, this);

            this.block = oldBlock;
            break;
    }
}

function walkDeclarations(node) {
    switch (node.type) {
        case 'StyleSheet':
            var oldStylesheet = this.stylesheet;
            this.stylesheet = node;

            node.children.each(walkDeclarations, this);

            this.stylesheet = oldStylesheet;
            break;

        case 'Atrule':
            if (node.block !== null) {
                var oldAtrule = this.atrule;
                this.atrule = node;

                walkDeclarations.call(this, node.block);

                this.atrule = oldAtrule;
            }
            break;

        case 'Rule':
            var oldRule = this.rule;
            this.rule = node;

            if (node.block !== null) {
                walkDeclarations.call(this, node.block);
            }

            this.rule = oldRule;
            break;

        case 'Block':
            node.children.each(function(node, item, list) {
                if (node.type === 'Declaration') {
                    this.fn(node, item, list);
                } else {
                    walkDeclarations.call(this, node);
                }
            }, this);
            break;
    }
}

function getWalkersFromStructure(name, nodeType) {
    var structure = nodeType.structure;
    var walkers = [];

    for (var key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        var fieldTypes = structure[key];
        var walker = {
            name: key,
            type: false,
            nullable: false
        };

        if (!Array.isArray(structure[key])) {
            fieldTypes = [structure[key]];
        }

        for (var i = 0; i < fieldTypes.length; i++) {
            var fieldType = fieldTypes[i];
            if (fieldType === null) {
                walker.nullable = true;
            } else if (typeof fieldType === 'string') {
                walker.type = 'node';
            } else if (Array.isArray(fieldType)) {
                walker.type = 'list';
            }
        }

        if (walker.type) {
            walkers.push(walker);
        }
    }

    if (walkers.length) {
        return {
            context: nodeType.walkContext,
            fields: walkers
        };
    }

    return null;
}

function getTypesFromConfig(config) {
    var types = {};

    if (config.node) {
        for (var name in config.node) {
            if (hasOwnProperty.call(config.node, name)) {
                var nodeType = config.node[name];

                if (nodeType.structure) {
                    var walkers = getWalkersFromStructure(name, nodeType);
                    if (walkers !== null) {
                        types[name] = walkers;
                    }
                } else {
                    throw new Error('Missed `structure` field in `' + name + '` node type definition');
                }
            }
        }
    }

    return types;
}

function createContext(root, fn) {
    var context = {
        fn: fn,
        root: root,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
    };

    return context;
}

module.exports = function createWalker(config) {
    var types = getTypesFromConfig(config);
    var walkers = {};

    for (var name in types) {
        if (hasOwnProperty.call(types, name)) {
            var config = types[name];
            walkers[name] = Function('node', 'context', 'walk',
                (config.context ? 'var old = context.' + config.context + ';\ncontext.' + config.context + ' = node;\n' : '') +
                config.fields.map(function(field) {
                    var line = field.type === 'list'
                        ? 'node.' + field.name + '.each(walk);'
                        : 'walk(node.' + field.name + ');';

                    if (field.nullable) {
                        line = 'if (node.' + field.name + ') {\n    ' + line + '}';
                    }

                    return line;
                }).join('\n') +
                (config.context ? '\ncontext.' + config.context + ' = old;' : '')
            );
        }
    }

    return {
        walk: function(root, fn) {
            function walk(node, item, list) {
                fn.call(context, node, item, list);
                if (walkers.hasOwnProperty(node.type)) {
                    walkers[node.type](node, context, walk);
                }
            }

            var context = createContext(root, fn);

            walk(root);
        },
        walkUp: function(root, fn) {
            function walk(node, item, list) {
                if (walkers.hasOwnProperty(node.type)) {
                    walkers[node.type](node, context, walk);
                }
                fn.call(context, node, item, list);
            }

            var context = createContext(root, fn);

            walk(root);
        },
        walkRules: function(root, fn) {
            walkRules.call(createContext(root, fn), root);
        },
        walkRulesRight: function(root, fn) {
            walkRulesRight.call(createContext(root, fn), root);
        },
        walkDeclarations: function(root, fn) {
            walkDeclarations.call(createContext(root, fn), root);
        }
    };
};
