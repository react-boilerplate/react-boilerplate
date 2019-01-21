'use strict';

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultGroups = ['builtin', 'external', 'parent', 'sibling', 'index'];

// REPORTING AND FIXING

function reverse(array) {
  return array.map(function (v) {
    return {
      name: v.name,
      rank: -v.rank,
      node: v.node
    };
  }).reverse();
}

function getTokensOrCommentsAfter(sourceCode, node, count) {
  let currentNodeOrToken = node;
  const result = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenOrCommentAfter(currentNodeOrToken);
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result;
}

function getTokensOrCommentsBefore(sourceCode, node, count) {
  let currentNodeOrToken = node;
  const result = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenOrCommentBefore(currentNodeOrToken);
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result.reverse();
}

function takeTokensAfterWhile(sourceCode, node, condition) {
  const tokens = getTokensOrCommentsAfter(sourceCode, node, 100);
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    if (condition(tokens[i])) {
      result.push(tokens[i]);
    } else {
      break;
    }
  }
  return result;
}

function takeTokensBeforeWhile(sourceCode, node, condition) {
  const tokens = getTokensOrCommentsBefore(sourceCode, node, 100);
  const result = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (condition(tokens[i])) {
      result.push(tokens[i]);
    } else {
      break;
    }
  }
  return result.reverse();
}

function findOutOfOrder(imported) {
  if (imported.length === 0) {
    return [];
  }
  let maxSeenRankNode = imported[0];
  return imported.filter(function (importedModule) {
    const res = importedModule.rank < maxSeenRankNode.rank;
    if (maxSeenRankNode.rank < importedModule.rank) {
      maxSeenRankNode = importedModule;
    }
    return res;
  });
}

function findRootNode(node) {
  let parent = node;
  while (parent.parent != null && parent.parent.body == null) {
    parent = parent.parent;
  }
  return parent;
}

function findEndOfLineWithComments(sourceCode, node) {
  const tokensToEndOfLine = takeTokensAfterWhile(sourceCode, node, commentOnSameLineAs(node));
  let endOfTokens = tokensToEndOfLine.length > 0 ? tokensToEndOfLine[tokensToEndOfLine.length - 1].end : node.end;
  let result = endOfTokens;
  for (let i = endOfTokens; i < sourceCode.text.length; i++) {
    if (sourceCode.text[i] === '\n') {
      result = i + 1;
      break;
    }
    if (sourceCode.text[i] !== ' ' && sourceCode.text[i] !== '\t' && sourceCode.text[i] !== '\r') {
      break;
    }
    result = i + 1;
  }
  return result;
}

function commentOnSameLineAs(node) {
  return token => (token.type === 'Block' || token.type === 'Line') && token.loc.start.line === token.loc.end.line && token.loc.end.line === node.loc.end.line;
}

function findStartOfLineWithComments(sourceCode, node) {
  const tokensToEndOfLine = takeTokensBeforeWhile(sourceCode, node, commentOnSameLineAs(node));
  let startOfTokens = tokensToEndOfLine.length > 0 ? tokensToEndOfLine[0].start : node.start;
  let result = startOfTokens;
  for (let i = startOfTokens - 1; i > 0; i--) {
    if (sourceCode.text[i] !== ' ' && sourceCode.text[i] !== '\t') {
      break;
    }
    result = i;
  }
  return result;
}

function isPlainRequireModule(node) {
  if (node.type !== 'VariableDeclaration') {
    return false;
  }
  if (node.declarations.length !== 1) {
    return false;
  }
  const decl = node.declarations[0];
  const result = decl.id != null && decl.id.type === 'Identifier' && decl.init != null && decl.init.type === 'CallExpression' && decl.init.callee != null && decl.init.callee.name === 'require' && decl.init.arguments != null && decl.init.arguments.length === 1 && decl.init.arguments[0].type === 'Literal';
  return result;
}

function isPlainImportModule(node) {
  return node.type === 'ImportDeclaration' && node.specifiers != null && node.specifiers.length > 0;
}

function canCrossNodeWhileReorder(node) {
  return isPlainRequireModule(node) || isPlainImportModule(node);
}

function canReorderItems(firstNode, secondNode) {
  const parent = firstNode.parent;
  const firstIndex = parent.body.indexOf(firstNode);
  const secondIndex = parent.body.indexOf(secondNode);
  const nodesBetween = parent.body.slice(firstIndex, secondIndex + 1);
  for (var nodeBetween of nodesBetween) {
    if (!canCrossNodeWhileReorder(nodeBetween)) {
      return false;
    }
  }
  return true;
}

function fixOutOfOrder(context, firstNode, secondNode, order) {
  const sourceCode = context.getSourceCode();

  const firstRoot = findRootNode(firstNode.node);
  let firstRootStart = findStartOfLineWithComments(sourceCode, firstRoot);
  const firstRootEnd = findEndOfLineWithComments(sourceCode, firstRoot);

  const secondRoot = findRootNode(secondNode.node);
  let secondRootStart = findStartOfLineWithComments(sourceCode, secondRoot);
  let secondRootEnd = findEndOfLineWithComments(sourceCode, secondRoot);
  const canFix = canReorderItems(firstRoot, secondRoot);

  let newCode = sourceCode.text.substring(secondRootStart, secondRootEnd);
  if (newCode[newCode.length - 1] !== '\n') {
    newCode = newCode + '\n';
  }

  const message = '`' + secondNode.name + '` import should occur ' + order + ' import of `' + firstNode.name + '`';

  if (order === 'before') {
    context.report({
      node: secondNode.node,
      message: message,
      fix: canFix && (fixer => fixer.replaceTextRange([firstRootStart, secondRootEnd], newCode + sourceCode.text.substring(firstRootStart, secondRootStart)))
    });
  } else if (order === 'after') {
    context.report({
      node: secondNode.node,
      message: message,
      fix: canFix && (fixer => fixer.replaceTextRange([secondRootStart, firstRootEnd], sourceCode.text.substring(secondRootEnd, firstRootEnd) + newCode))
    });
  }
}

function reportOutOfOrder(context, imported, outOfOrder, order) {
  outOfOrder.forEach(function (imp) {
    const found = imported.find(function hasHigherRank(importedItem) {
      return importedItem.rank > imp.rank;
    });
    fixOutOfOrder(context, found, imp, order);
  });
}

function makeOutOfOrderReport(context, imported) {
  const outOfOrder = findOutOfOrder(imported);
  if (!outOfOrder.length) {
    return;
  }
  // There are things to report. Try to minimize the number of reported errors.
  const reversedImported = reverse(imported);
  const reversedOrder = findOutOfOrder(reversedImported);
  if (reversedOrder.length < outOfOrder.length) {
    reportOutOfOrder(context, reversedImported, reversedOrder, 'after');
    return;
  }
  reportOutOfOrder(context, imported, outOfOrder, 'before');
}

// DETECTING

function computeRank(context, ranks, name, type) {
  return ranks[(0, _importType2.default)(name, context)] + (type === 'import' ? 0 : 100);
}

function registerNode(context, node, name, type, ranks, imported) {
  const rank = computeRank(context, ranks, name, type);
  if (rank !== -1) {
    imported.push({ name, rank, node });
  }
}

function isInVariableDeclarator(node) {
  return node && (node.type === 'VariableDeclarator' || isInVariableDeclarator(node.parent));
}

const types = ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'];

// Creates an object with type-rank pairs.
// Example: { index: 0, sibling: 1, parent: 1, external: 1, builtin: 2, internal: 2 }
// Will throw an error if it contains a type that does not exist, or has a duplicate
function convertGroupsToRanks(groups) {
  const rankObject = groups.reduce(function (res, group, index) {
    if (typeof group === 'string') {
      group = [group];
    }
    group.forEach(function (groupItem) {
      if (types.indexOf(groupItem) === -1) {
        throw new Error('Incorrect configuration of the rule: Unknown type `' + JSON.stringify(groupItem) + '`');
      }
      if (res[groupItem] !== undefined) {
        throw new Error('Incorrect configuration of the rule: `' + groupItem + '` is duplicated');
      }
      res[groupItem] = index;
    });
    return res;
  }, {});

  const omittedTypes = types.filter(function (type) {
    return rankObject[type] === undefined;
  });

  return omittedTypes.reduce(function (res, type) {
    res[type] = groups.length;
    return res;
  }, rankObject);
}

function fixNewLineAfterImport(context, previousImport) {
  const prevRoot = findRootNode(previousImport.node);
  const tokensToEndOfLine = takeTokensAfterWhile(context.getSourceCode(), prevRoot, commentOnSameLineAs(prevRoot));

  let endOfLine = prevRoot.end;
  if (tokensToEndOfLine.length > 0) {
    endOfLine = tokensToEndOfLine[tokensToEndOfLine.length - 1].end;
  }
  return fixer => fixer.insertTextAfterRange([prevRoot.start, endOfLine], '\n');
}

function removeNewLineAfterImport(context, currentImport, previousImport) {
  const sourceCode = context.getSourceCode();
  const prevRoot = findRootNode(previousImport.node);
  const currRoot = findRootNode(currentImport.node);
  const rangeToRemove = [findEndOfLineWithComments(sourceCode, prevRoot), findStartOfLineWithComments(sourceCode, currRoot)];
  if (/^\s*$/.test(sourceCode.text.substring(rangeToRemove[0], rangeToRemove[1]))) {
    return fixer => fixer.removeRange(rangeToRemove);
  }
  return undefined;
}

function makeNewlinesBetweenReport(context, imported, newlinesBetweenImports) {
  const getNumberOfEmptyLinesBetween = (currentImport, previousImport) => {
    const linesBetweenImports = context.getSourceCode().lines.slice(previousImport.node.loc.end.line, currentImport.node.loc.start.line - 1);

    return linesBetweenImports.filter(line => !line.trim().length).length;
  };
  let previousImport = imported[0];

  imported.slice(1).forEach(function (currentImport) {
    const emptyLinesBetween = getNumberOfEmptyLinesBetween(currentImport, previousImport);

    if (newlinesBetweenImports === 'always' || newlinesBetweenImports === 'always-and-inside-groups') {
      if (currentImport.rank !== previousImport.rank && emptyLinesBetween === 0) {
        context.report({
          node: previousImport.node,
          message: 'There should be at least one empty line between import groups',
          fix: fixNewLineAfterImport(context, previousImport, currentImport)
        });
      } else if (currentImport.rank === previousImport.rank && emptyLinesBetween > 0 && newlinesBetweenImports !== 'always-and-inside-groups') {
        context.report({
          node: previousImport.node,
          message: 'There should be no empty line within import group',
          fix: removeNewLineAfterImport(context, currentImport, previousImport)
        });
      }
    } else if (emptyLinesBetween > 0) {
      context.report({
        node: previousImport.node,
        message: 'There should be no empty line between import groups',
        fix: removeNewLineAfterImport(context, currentImport, previousImport)
      });
    }

    previousImport = currentImport;
  });
}

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('order')
    },

    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        groups: {
          type: 'array'
        },
        'newlines-between': {
          enum: ['ignore', 'always', 'always-and-inside-groups', 'never']
        }
      },
      additionalProperties: false
    }]
  },

  create: function importOrderRule(context) {
    const options = context.options[0] || {};
    const newlinesBetweenImports = options['newlines-between'] || 'ignore';
    let ranks;

    try {
      ranks = convertGroupsToRanks(options.groups || defaultGroups);
    } catch (error) {
      // Malformed configuration
      return {
        Program: function (node) {
          context.report(node, error.message);
        }
      };
    }
    let imported = [];
    let level = 0;

    function incrementLevel() {
      level++;
    }
    function decrementLevel() {
      level--;
    }

    return {
      ImportDeclaration: function handleImports(node) {
        if (node.specifiers.length) {
          // Ignoring unassigned imports
          const name = node.source.value;
          registerNode(context, node, name, 'import', ranks, imported);
        }
      },
      CallExpression: function handleRequires(node) {
        if (level !== 0 || !(0, _staticRequire2.default)(node) || !isInVariableDeclarator(node.parent)) {
          return;
        }
        const name = node.arguments[0].value;
        registerNode(context, node, name, 'require', ranks, imported);
      },
      'Program:exit': function reportAndReset() {
        makeOutOfOrderReport(context, imported);

        if (newlinesBetweenImports !== 'ignore') {
          makeNewlinesBetweenReport(context, imported, newlinesBetweenImports);
        }

        imported = [];
      },
      FunctionDeclaration: incrementLevel,
      FunctionExpression: incrementLevel,
      ArrowFunctionExpression: incrementLevel,
      BlockStatement: incrementLevel,
      ObjectExpression: incrementLevel,
      'FunctionDeclaration:exit': decrementLevel,
      'FunctionExpression:exit': decrementLevel,
      'ArrowFunctionExpression:exit': decrementLevel,
      'BlockStatement:exit': decrementLevel,
      'ObjectExpression:exit': decrementLevel
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL29yZGVyLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRHcm91cHMiLCJyZXZlcnNlIiwiYXJyYXkiLCJtYXAiLCJ2IiwibmFtZSIsInJhbmsiLCJub2RlIiwiZ2V0VG9rZW5zT3JDb21tZW50c0FmdGVyIiwic291cmNlQ29kZSIsImNvdW50IiwiY3VycmVudE5vZGVPclRva2VuIiwicmVzdWx0IiwiaSIsImdldFRva2VuT3JDb21tZW50QWZ0ZXIiLCJwdXNoIiwiZ2V0VG9rZW5zT3JDb21tZW50c0JlZm9yZSIsImdldFRva2VuT3JDb21tZW50QmVmb3JlIiwidGFrZVRva2Vuc0FmdGVyV2hpbGUiLCJjb25kaXRpb24iLCJ0b2tlbnMiLCJsZW5ndGgiLCJ0YWtlVG9rZW5zQmVmb3JlV2hpbGUiLCJmaW5kT3V0T2ZPcmRlciIsImltcG9ydGVkIiwibWF4U2VlblJhbmtOb2RlIiwiZmlsdGVyIiwiaW1wb3J0ZWRNb2R1bGUiLCJyZXMiLCJmaW5kUm9vdE5vZGUiLCJwYXJlbnQiLCJib2R5IiwiZmluZEVuZE9mTGluZVdpdGhDb21tZW50cyIsInRva2Vuc1RvRW5kT2ZMaW5lIiwiY29tbWVudE9uU2FtZUxpbmVBcyIsImVuZE9mVG9rZW5zIiwiZW5kIiwidGV4dCIsInRva2VuIiwidHlwZSIsImxvYyIsInN0YXJ0IiwibGluZSIsImZpbmRTdGFydE9mTGluZVdpdGhDb21tZW50cyIsInN0YXJ0T2ZUb2tlbnMiLCJpc1BsYWluUmVxdWlyZU1vZHVsZSIsImRlY2xhcmF0aW9ucyIsImRlY2wiLCJpZCIsImluaXQiLCJjYWxsZWUiLCJhcmd1bWVudHMiLCJpc1BsYWluSW1wb3J0TW9kdWxlIiwic3BlY2lmaWVycyIsImNhbkNyb3NzTm9kZVdoaWxlUmVvcmRlciIsImNhblJlb3JkZXJJdGVtcyIsImZpcnN0Tm9kZSIsInNlY29uZE5vZGUiLCJmaXJzdEluZGV4IiwiaW5kZXhPZiIsInNlY29uZEluZGV4Iiwibm9kZXNCZXR3ZWVuIiwic2xpY2UiLCJub2RlQmV0d2VlbiIsImZpeE91dE9mT3JkZXIiLCJjb250ZXh0Iiwib3JkZXIiLCJnZXRTb3VyY2VDb2RlIiwiZmlyc3RSb290IiwiZmlyc3RSb290U3RhcnQiLCJmaXJzdFJvb3RFbmQiLCJzZWNvbmRSb290Iiwic2Vjb25kUm9vdFN0YXJ0Iiwic2Vjb25kUm9vdEVuZCIsImNhbkZpeCIsIm5ld0NvZGUiLCJzdWJzdHJpbmciLCJtZXNzYWdlIiwicmVwb3J0IiwiZml4IiwiZml4ZXIiLCJyZXBsYWNlVGV4dFJhbmdlIiwicmVwb3J0T3V0T2ZPcmRlciIsIm91dE9mT3JkZXIiLCJmb3JFYWNoIiwiaW1wIiwiZm91bmQiLCJmaW5kIiwiaGFzSGlnaGVyUmFuayIsImltcG9ydGVkSXRlbSIsIm1ha2VPdXRPZk9yZGVyUmVwb3J0IiwicmV2ZXJzZWRJbXBvcnRlZCIsInJldmVyc2VkT3JkZXIiLCJjb21wdXRlUmFuayIsInJhbmtzIiwicmVnaXN0ZXJOb2RlIiwiaXNJblZhcmlhYmxlRGVjbGFyYXRvciIsInR5cGVzIiwiY29udmVydEdyb3Vwc1RvUmFua3MiLCJncm91cHMiLCJyYW5rT2JqZWN0IiwicmVkdWNlIiwiZ3JvdXAiLCJpbmRleCIsImdyb3VwSXRlbSIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsIm9taXR0ZWRUeXBlcyIsImZpeE5ld0xpbmVBZnRlckltcG9ydCIsInByZXZpb3VzSW1wb3J0IiwicHJldlJvb3QiLCJlbmRPZkxpbmUiLCJpbnNlcnRUZXh0QWZ0ZXJSYW5nZSIsInJlbW92ZU5ld0xpbmVBZnRlckltcG9ydCIsImN1cnJlbnRJbXBvcnQiLCJjdXJyUm9vdCIsInJhbmdlVG9SZW1vdmUiLCJ0ZXN0IiwicmVtb3ZlUmFuZ2UiLCJtYWtlTmV3bGluZXNCZXR3ZWVuUmVwb3J0IiwibmV3bGluZXNCZXR3ZWVuSW1wb3J0cyIsImdldE51bWJlck9mRW1wdHlMaW5lc0JldHdlZW4iLCJsaW5lc0JldHdlZW5JbXBvcnRzIiwibGluZXMiLCJ0cmltIiwiZW1wdHlMaW5lc0JldHdlZW4iLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJmaXhhYmxlIiwic2NoZW1hIiwicHJvcGVydGllcyIsImVudW0iLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImNyZWF0ZSIsImltcG9ydE9yZGVyUnVsZSIsIm9wdGlvbnMiLCJlcnJvciIsIlByb2dyYW0iLCJsZXZlbCIsImluY3JlbWVudExldmVsIiwiZGVjcmVtZW50TGV2ZWwiLCJJbXBvcnREZWNsYXJhdGlvbiIsImhhbmRsZUltcG9ydHMiLCJzb3VyY2UiLCJ2YWx1ZSIsIkNhbGxFeHByZXNzaW9uIiwiaGFuZGxlUmVxdWlyZXMiLCJyZXBvcnRBbmRSZXNldCIsIkZ1bmN0aW9uRGVjbGFyYXRpb24iLCJGdW5jdGlvbkV4cHJlc3Npb24iLCJBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiIsIkJsb2NrU3RhdGVtZW50IiwiT2JqZWN0RXhwcmVzc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxnQkFBZ0IsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixRQUF4QixFQUFrQyxTQUFsQyxFQUE2QyxPQUE3QyxDQUF0Qjs7QUFFQTs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUN0QixTQUFPQSxNQUFNQyxHQUFOLENBQVUsVUFBVUMsQ0FBVixFQUFhO0FBQzVCLFdBQU87QUFDTEMsWUFBTUQsRUFBRUMsSUFESDtBQUVMQyxZQUFNLENBQUNGLEVBQUVFLElBRko7QUFHTEMsWUFBTUgsRUFBRUc7QUFISCxLQUFQO0FBS0QsR0FOTSxFQU1KTixPQU5JLEVBQVA7QUFPRDs7QUFFRCxTQUFTTyx3QkFBVCxDQUFrQ0MsVUFBbEMsRUFBOENGLElBQTlDLEVBQW9ERyxLQUFwRCxFQUEyRDtBQUN6RCxNQUFJQyxxQkFBcUJKLElBQXpCO0FBQ0EsUUFBTUssU0FBUyxFQUFmO0FBQ0EsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlILEtBQXBCLEVBQTJCRyxHQUEzQixFQUFnQztBQUM5QkYseUJBQXFCRixXQUFXSyxzQkFBWCxDQUFrQ0gsa0JBQWxDLENBQXJCO0FBQ0EsUUFBSUEsc0JBQXNCLElBQTFCLEVBQWdDO0FBQzlCO0FBQ0Q7QUFDREMsV0FBT0csSUFBUCxDQUFZSixrQkFBWjtBQUNEO0FBQ0QsU0FBT0MsTUFBUDtBQUNEOztBQUVELFNBQVNJLHlCQUFULENBQW1DUCxVQUFuQyxFQUErQ0YsSUFBL0MsRUFBcURHLEtBQXJELEVBQTREO0FBQzFELE1BQUlDLHFCQUFxQkosSUFBekI7QUFDQSxRQUFNSyxTQUFTLEVBQWY7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsS0FBcEIsRUFBMkJHLEdBQTNCLEVBQWdDO0FBQzlCRix5QkFBcUJGLFdBQVdRLHVCQUFYLENBQW1DTixrQkFBbkMsQ0FBckI7QUFDQSxRQUFJQSxzQkFBc0IsSUFBMUIsRUFBZ0M7QUFDOUI7QUFDRDtBQUNEQyxXQUFPRyxJQUFQLENBQVlKLGtCQUFaO0FBQ0Q7QUFDRCxTQUFPQyxPQUFPWCxPQUFQLEVBQVA7QUFDRDs7QUFFRCxTQUFTaUIsb0JBQVQsQ0FBOEJULFVBQTlCLEVBQTBDRixJQUExQyxFQUFnRFksU0FBaEQsRUFBMkQ7QUFDekQsUUFBTUMsU0FBU1oseUJBQXlCQyxVQUF6QixFQUFxQ0YsSUFBckMsRUFBMkMsR0FBM0MsQ0FBZjtBQUNBLFFBQU1LLFNBQVMsRUFBZjtBQUNBLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTyxPQUFPQyxNQUEzQixFQUFtQ1IsR0FBbkMsRUFBd0M7QUFDdEMsUUFBSU0sVUFBVUMsT0FBT1AsQ0FBUCxDQUFWLENBQUosRUFBMEI7QUFDeEJELGFBQU9HLElBQVAsQ0FBWUssT0FBT1AsQ0FBUCxDQUFaO0FBQ0QsS0FGRCxNQUdLO0FBQ0g7QUFDRDtBQUNGO0FBQ0QsU0FBT0QsTUFBUDtBQUNEOztBQUVELFNBQVNVLHFCQUFULENBQStCYixVQUEvQixFQUEyQ0YsSUFBM0MsRUFBaURZLFNBQWpELEVBQTREO0FBQzFELFFBQU1DLFNBQVNKLDBCQUEwQlAsVUFBMUIsRUFBc0NGLElBQXRDLEVBQTRDLEdBQTVDLENBQWY7QUFDQSxRQUFNSyxTQUFTLEVBQWY7QUFDQSxPQUFLLElBQUlDLElBQUlPLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBN0IsRUFBZ0NSLEtBQUssQ0FBckMsRUFBd0NBLEdBQXhDLEVBQTZDO0FBQzNDLFFBQUlNLFVBQVVDLE9BQU9QLENBQVAsQ0FBVixDQUFKLEVBQTBCO0FBQ3hCRCxhQUFPRyxJQUFQLENBQVlLLE9BQU9QLENBQVAsQ0FBWjtBQUNELEtBRkQsTUFHSztBQUNIO0FBQ0Q7QUFDRjtBQUNELFNBQU9ELE9BQU9YLE9BQVAsRUFBUDtBQUNEOztBQUVELFNBQVNzQixjQUFULENBQXdCQyxRQUF4QixFQUFrQztBQUNoQyxNQUFJQSxTQUFTSCxNQUFULEtBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUksa0JBQWtCRCxTQUFTLENBQVQsQ0FBdEI7QUFDQSxTQUFPQSxTQUFTRSxNQUFULENBQWdCLFVBQVVDLGNBQVYsRUFBMEI7QUFDL0MsVUFBTUMsTUFBTUQsZUFBZXJCLElBQWYsR0FBc0JtQixnQkFBZ0JuQixJQUFsRDtBQUNBLFFBQUltQixnQkFBZ0JuQixJQUFoQixHQUF1QnFCLGVBQWVyQixJQUExQyxFQUFnRDtBQUM5Q21CLHdCQUFrQkUsY0FBbEI7QUFDRDtBQUNELFdBQU9DLEdBQVA7QUFDRCxHQU5NLENBQVA7QUFPRDs7QUFFRCxTQUFTQyxZQUFULENBQXNCdEIsSUFBdEIsRUFBNEI7QUFDMUIsTUFBSXVCLFNBQVN2QixJQUFiO0FBQ0EsU0FBT3VCLE9BQU9BLE1BQVAsSUFBaUIsSUFBakIsSUFBeUJBLE9BQU9BLE1BQVAsQ0FBY0MsSUFBZCxJQUFzQixJQUF0RCxFQUE0RDtBQUMxREQsYUFBU0EsT0FBT0EsTUFBaEI7QUFDRDtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFRCxTQUFTRSx5QkFBVCxDQUFtQ3ZCLFVBQW5DLEVBQStDRixJQUEvQyxFQUFxRDtBQUNuRCxRQUFNMEIsb0JBQW9CZixxQkFBcUJULFVBQXJCLEVBQWlDRixJQUFqQyxFQUF1QzJCLG9CQUFvQjNCLElBQXBCLENBQXZDLENBQTFCO0FBQ0EsTUFBSTRCLGNBQWNGLGtCQUFrQlosTUFBbEIsR0FBMkIsQ0FBM0IsR0FDZFksa0JBQWtCQSxrQkFBa0JaLE1BQWxCLEdBQTJCLENBQTdDLEVBQWdEZSxHQURsQyxHQUVkN0IsS0FBSzZCLEdBRlQ7QUFHQSxNQUFJeEIsU0FBU3VCLFdBQWI7QUFDQSxPQUFLLElBQUl0QixJQUFJc0IsV0FBYixFQUEwQnRCLElBQUlKLFdBQVc0QixJQUFYLENBQWdCaEIsTUFBOUMsRUFBc0RSLEdBQXRELEVBQTJEO0FBQ3pELFFBQUlKLFdBQVc0QixJQUFYLENBQWdCeEIsQ0FBaEIsTUFBdUIsSUFBM0IsRUFBaUM7QUFDL0JELGVBQVNDLElBQUksQ0FBYjtBQUNBO0FBQ0Q7QUFDRCxRQUFJSixXQUFXNEIsSUFBWCxDQUFnQnhCLENBQWhCLE1BQXVCLEdBQXZCLElBQThCSixXQUFXNEIsSUFBWCxDQUFnQnhCLENBQWhCLE1BQXVCLElBQXJELElBQTZESixXQUFXNEIsSUFBWCxDQUFnQnhCLENBQWhCLE1BQXVCLElBQXhGLEVBQThGO0FBQzVGO0FBQ0Q7QUFDREQsYUFBU0MsSUFBSSxDQUFiO0FBQ0Q7QUFDRCxTQUFPRCxNQUFQO0FBQ0Q7O0FBRUQsU0FBU3NCLG1CQUFULENBQTZCM0IsSUFBN0IsRUFBbUM7QUFDakMsU0FBTytCLFNBQVMsQ0FBQ0EsTUFBTUMsSUFBTixLQUFlLE9BQWYsSUFBMkJELE1BQU1DLElBQU4sS0FBZSxNQUEzQyxLQUNaRCxNQUFNRSxHQUFOLENBQVVDLEtBQVYsQ0FBZ0JDLElBQWhCLEtBQXlCSixNQUFNRSxHQUFOLENBQVVKLEdBQVYsQ0FBY00sSUFEM0IsSUFFWkosTUFBTUUsR0FBTixDQUFVSixHQUFWLENBQWNNLElBQWQsS0FBdUJuQyxLQUFLaUMsR0FBTCxDQUFTSixHQUFULENBQWFNLElBRnhDO0FBR0Q7O0FBRUQsU0FBU0MsMkJBQVQsQ0FBcUNsQyxVQUFyQyxFQUFpREYsSUFBakQsRUFBdUQ7QUFDckQsUUFBTTBCLG9CQUFvQlgsc0JBQXNCYixVQUF0QixFQUFrQ0YsSUFBbEMsRUFBd0MyQixvQkFBb0IzQixJQUFwQixDQUF4QyxDQUExQjtBQUNBLE1BQUlxQyxnQkFBZ0JYLGtCQUFrQlosTUFBbEIsR0FBMkIsQ0FBM0IsR0FBK0JZLGtCQUFrQixDQUFsQixFQUFxQlEsS0FBcEQsR0FBNERsQyxLQUFLa0MsS0FBckY7QUFDQSxNQUFJN0IsU0FBU2dDLGFBQWI7QUFDQSxPQUFLLElBQUkvQixJQUFJK0IsZ0JBQWdCLENBQTdCLEVBQWdDL0IsSUFBSSxDQUFwQyxFQUF1Q0EsR0FBdkMsRUFBNEM7QUFDMUMsUUFBSUosV0FBVzRCLElBQVgsQ0FBZ0J4QixDQUFoQixNQUF1QixHQUF2QixJQUE4QkosV0FBVzRCLElBQVgsQ0FBZ0J4QixDQUFoQixNQUF1QixJQUF6RCxFQUErRDtBQUM3RDtBQUNEO0FBQ0RELGFBQVNDLENBQVQ7QUFDRDtBQUNELFNBQU9ELE1BQVA7QUFDRDs7QUFFRCxTQUFTaUMsb0JBQVQsQ0FBOEJ0QyxJQUE5QixFQUFvQztBQUNsQyxNQUFJQSxLQUFLZ0MsSUFBTCxLQUFjLHFCQUFsQixFQUF5QztBQUN2QyxXQUFPLEtBQVA7QUFDRDtBQUNELE1BQUloQyxLQUFLdUMsWUFBTCxDQUFrQnpCLE1BQWxCLEtBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLFdBQU8sS0FBUDtBQUNEO0FBQ0QsUUFBTTBCLE9BQU94QyxLQUFLdUMsWUFBTCxDQUFrQixDQUFsQixDQUFiO0FBQ0EsUUFBTWxDLFNBQVVtQyxLQUFLQyxFQUFMLElBQVcsSUFBWCxJQUFvQkQsS0FBS0MsRUFBTCxDQUFRVCxJQUFSLEtBQWlCLFlBQXRDLElBQ2JRLEtBQUtFLElBQUwsSUFBYSxJQURBLElBRWJGLEtBQUtFLElBQUwsQ0FBVVYsSUFBVixLQUFtQixnQkFGTixJQUdiUSxLQUFLRSxJQUFMLENBQVVDLE1BQVYsSUFBb0IsSUFIUCxJQUliSCxLQUFLRSxJQUFMLENBQVVDLE1BQVYsQ0FBaUI3QyxJQUFqQixLQUEwQixTQUpiLElBS2IwQyxLQUFLRSxJQUFMLENBQVVFLFNBQVYsSUFBdUIsSUFMVixJQU1iSixLQUFLRSxJQUFMLENBQVVFLFNBQVYsQ0FBb0I5QixNQUFwQixLQUErQixDQU5sQixJQU9iMEIsS0FBS0UsSUFBTCxDQUFVRSxTQUFWLENBQW9CLENBQXBCLEVBQXVCWixJQUF2QixLQUFnQyxTQVBsQztBQVFBLFNBQU8zQixNQUFQO0FBQ0Q7O0FBRUQsU0FBU3dDLG1CQUFULENBQTZCN0MsSUFBN0IsRUFBbUM7QUFDakMsU0FBT0EsS0FBS2dDLElBQUwsS0FBYyxtQkFBZCxJQUFxQ2hDLEtBQUs4QyxVQUFMLElBQW1CLElBQXhELElBQWdFOUMsS0FBSzhDLFVBQUwsQ0FBZ0JoQyxNQUFoQixHQUF5QixDQUFoRztBQUNEOztBQUVELFNBQVNpQyx3QkFBVCxDQUFrQy9DLElBQWxDLEVBQXdDO0FBQ3RDLFNBQU9zQyxxQkFBcUJ0QyxJQUFyQixLQUE4QjZDLG9CQUFvQjdDLElBQXBCLENBQXJDO0FBQ0Q7O0FBRUQsU0FBU2dELGVBQVQsQ0FBeUJDLFNBQXpCLEVBQW9DQyxVQUFwQyxFQUFnRDtBQUM5QyxRQUFNM0IsU0FBUzBCLFVBQVUxQixNQUF6QjtBQUNBLFFBQU00QixhQUFhNUIsT0FBT0MsSUFBUCxDQUFZNEIsT0FBWixDQUFvQkgsU0FBcEIsQ0FBbkI7QUFDQSxRQUFNSSxjQUFjOUIsT0FBT0MsSUFBUCxDQUFZNEIsT0FBWixDQUFvQkYsVUFBcEIsQ0FBcEI7QUFDQSxRQUFNSSxlQUFlL0IsT0FBT0MsSUFBUCxDQUFZK0IsS0FBWixDQUFrQkosVUFBbEIsRUFBOEJFLGNBQWMsQ0FBNUMsQ0FBckI7QUFDQSxPQUFLLElBQUlHLFdBQVQsSUFBd0JGLFlBQXhCLEVBQXNDO0FBQ3BDLFFBQUksQ0FBQ1AseUJBQXlCUyxXQUF6QixDQUFMLEVBQTRDO0FBQzFDLGFBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFTQyxhQUFULENBQXVCQyxPQUF2QixFQUFnQ1QsU0FBaEMsRUFBMkNDLFVBQTNDLEVBQXVEUyxLQUF2RCxFQUE4RDtBQUM1RCxRQUFNekQsYUFBYXdELFFBQVFFLGFBQVIsRUFBbkI7O0FBRUEsUUFBTUMsWUFBWXZDLGFBQWEyQixVQUFVakQsSUFBdkIsQ0FBbEI7QUFDQSxNQUFJOEQsaUJBQWlCMUIsNEJBQTRCbEMsVUFBNUIsRUFBd0MyRCxTQUF4QyxDQUFyQjtBQUNBLFFBQU1FLGVBQWV0QywwQkFBMEJ2QixVQUExQixFQUFzQzJELFNBQXRDLENBQXJCOztBQUVBLFFBQU1HLGFBQWExQyxhQUFhNEIsV0FBV2xELElBQXhCLENBQW5CO0FBQ0EsTUFBSWlFLGtCQUFrQjdCLDRCQUE0QmxDLFVBQTVCLEVBQXdDOEQsVUFBeEMsQ0FBdEI7QUFDQSxNQUFJRSxnQkFBZ0J6QywwQkFBMEJ2QixVQUExQixFQUFzQzhELFVBQXRDLENBQXBCO0FBQ0EsUUFBTUcsU0FBU25CLGdCQUFnQmEsU0FBaEIsRUFBMkJHLFVBQTNCLENBQWY7O0FBRUEsTUFBSUksVUFBVWxFLFdBQVc0QixJQUFYLENBQWdCdUMsU0FBaEIsQ0FBMEJKLGVBQTFCLEVBQTJDQyxhQUEzQyxDQUFkO0FBQ0EsTUFBSUUsUUFBUUEsUUFBUXRELE1BQVIsR0FBaUIsQ0FBekIsTUFBZ0MsSUFBcEMsRUFBMEM7QUFDeENzRCxjQUFVQSxVQUFVLElBQXBCO0FBQ0Q7O0FBRUQsUUFBTUUsVUFBVSxNQUFNcEIsV0FBV3BELElBQWpCLEdBQXdCLHdCQUF4QixHQUFtRDZELEtBQW5ELEdBQ1osY0FEWSxHQUNLVixVQUFVbkQsSUFEZixHQUNzQixHQUR0Qzs7QUFHQSxNQUFJNkQsVUFBVSxRQUFkLEVBQXdCO0FBQ3RCRCxZQUFRYSxNQUFSLENBQWU7QUFDYnZFLFlBQU1rRCxXQUFXbEQsSUFESjtBQUVic0UsZUFBU0EsT0FGSTtBQUdiRSxXQUFLTCxXQUFXTSxTQUNkQSxNQUFNQyxnQkFBTixDQUNFLENBQUNaLGNBQUQsRUFBaUJJLGFBQWpCLENBREYsRUFFRUUsVUFBVWxFLFdBQVc0QixJQUFYLENBQWdCdUMsU0FBaEIsQ0FBMEJQLGNBQTFCLEVBQTBDRyxlQUExQyxDQUZaLENBREc7QUFIUSxLQUFmO0FBU0QsR0FWRCxNQVVPLElBQUlOLFVBQVUsT0FBZCxFQUF1QjtBQUM1QkQsWUFBUWEsTUFBUixDQUFlO0FBQ2J2RSxZQUFNa0QsV0FBV2xELElBREo7QUFFYnNFLGVBQVNBLE9BRkk7QUFHYkUsV0FBS0wsV0FBV00sU0FDZEEsTUFBTUMsZ0JBQU4sQ0FDRSxDQUFDVCxlQUFELEVBQWtCRixZQUFsQixDQURGLEVBRUU3RCxXQUFXNEIsSUFBWCxDQUFnQnVDLFNBQWhCLENBQTBCSCxhQUExQixFQUF5Q0gsWUFBekMsSUFBeURLLE9BRjNELENBREc7QUFIUSxLQUFmO0FBU0Q7QUFDRjs7QUFFRCxTQUFTTyxnQkFBVCxDQUEwQmpCLE9BQTFCLEVBQW1DekMsUUFBbkMsRUFBNkMyRCxVQUE3QyxFQUF5RGpCLEtBQXpELEVBQWdFO0FBQzlEaUIsYUFBV0MsT0FBWCxDQUFtQixVQUFVQyxHQUFWLEVBQWU7QUFDaEMsVUFBTUMsUUFBUTlELFNBQVMrRCxJQUFULENBQWMsU0FBU0MsYUFBVCxDQUF1QkMsWUFBdkIsRUFBcUM7QUFDL0QsYUFBT0EsYUFBYW5GLElBQWIsR0FBb0IrRSxJQUFJL0UsSUFBL0I7QUFDRCxLQUZhLENBQWQ7QUFHQTBELGtCQUFjQyxPQUFkLEVBQXVCcUIsS0FBdkIsRUFBOEJELEdBQTlCLEVBQW1DbkIsS0FBbkM7QUFDRCxHQUxEO0FBTUQ7O0FBRUQsU0FBU3dCLG9CQUFULENBQThCekIsT0FBOUIsRUFBdUN6QyxRQUF2QyxFQUFpRDtBQUMvQyxRQUFNMkQsYUFBYTVELGVBQWVDLFFBQWYsQ0FBbkI7QUFDQSxNQUFJLENBQUMyRCxXQUFXOUQsTUFBaEIsRUFBd0I7QUFDdEI7QUFDRDtBQUNEO0FBQ0EsUUFBTXNFLG1CQUFtQjFGLFFBQVF1QixRQUFSLENBQXpCO0FBQ0EsUUFBTW9FLGdCQUFnQnJFLGVBQWVvRSxnQkFBZixDQUF0QjtBQUNBLE1BQUlDLGNBQWN2RSxNQUFkLEdBQXVCOEQsV0FBVzlELE1BQXRDLEVBQThDO0FBQzVDNkQscUJBQWlCakIsT0FBakIsRUFBMEIwQixnQkFBMUIsRUFBNENDLGFBQTVDLEVBQTJELE9BQTNEO0FBQ0E7QUFDRDtBQUNEVixtQkFBaUJqQixPQUFqQixFQUEwQnpDLFFBQTFCLEVBQW9DMkQsVUFBcEMsRUFBZ0QsUUFBaEQ7QUFDRDs7QUFFRDs7QUFFQSxTQUFTVSxXQUFULENBQXFCNUIsT0FBckIsRUFBOEI2QixLQUE5QixFQUFxQ3pGLElBQXJDLEVBQTJDa0MsSUFBM0MsRUFBaUQ7QUFDL0MsU0FBT3VELE1BQU0sMEJBQVd6RixJQUFYLEVBQWlCNEQsT0FBakIsQ0FBTixLQUNKMUIsU0FBUyxRQUFULEdBQW9CLENBQXBCLEdBQXdCLEdBRHBCLENBQVA7QUFFRDs7QUFFRCxTQUFTd0QsWUFBVCxDQUFzQjlCLE9BQXRCLEVBQStCMUQsSUFBL0IsRUFBcUNGLElBQXJDLEVBQTJDa0MsSUFBM0MsRUFBaUR1RCxLQUFqRCxFQUF3RHRFLFFBQXhELEVBQWtFO0FBQ2hFLFFBQU1sQixPQUFPdUYsWUFBWTVCLE9BQVosRUFBcUI2QixLQUFyQixFQUE0QnpGLElBQTVCLEVBQWtDa0MsSUFBbEMsQ0FBYjtBQUNBLE1BQUlqQyxTQUFTLENBQUMsQ0FBZCxFQUFpQjtBQUNma0IsYUFBU1QsSUFBVCxDQUFjLEVBQUNWLElBQUQsRUFBT0MsSUFBUCxFQUFhQyxJQUFiLEVBQWQ7QUFDRDtBQUNGOztBQUVELFNBQVN5RixzQkFBVCxDQUFnQ3pGLElBQWhDLEVBQXNDO0FBQ3BDLFNBQU9BLFNBQ0pBLEtBQUtnQyxJQUFMLEtBQWMsb0JBQWQsSUFBc0N5RCx1QkFBdUJ6RixLQUFLdUIsTUFBNUIsQ0FEbEMsQ0FBUDtBQUVEOztBQUVELE1BQU1tRSxRQUFRLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsVUFBeEIsRUFBb0MsUUFBcEMsRUFBOEMsU0FBOUMsRUFBeUQsT0FBekQsQ0FBZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBc0M7QUFDcEMsUUFBTUMsYUFBYUQsT0FBT0UsTUFBUCxDQUFjLFVBQVN6RSxHQUFULEVBQWMwRSxLQUFkLEVBQXFCQyxLQUFyQixFQUE0QjtBQUMzRCxRQUFJLE9BQU9ELEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0JBLGNBQVEsQ0FBQ0EsS0FBRCxDQUFSO0FBQ0Q7QUFDREEsVUFBTWxCLE9BQU4sQ0FBYyxVQUFTb0IsU0FBVCxFQUFvQjtBQUNoQyxVQUFJUCxNQUFNdEMsT0FBTixDQUFjNkMsU0FBZCxNQUE2QixDQUFDLENBQWxDLEVBQXFDO0FBQ25DLGNBQU0sSUFBSUMsS0FBSixDQUFVLHdEQUNkQyxLQUFLQyxTQUFMLENBQWVILFNBQWYsQ0FEYyxHQUNjLEdBRHhCLENBQU47QUFFRDtBQUNELFVBQUk1RSxJQUFJNEUsU0FBSixNQUFtQkksU0FBdkIsRUFBa0M7QUFDaEMsY0FBTSxJQUFJSCxLQUFKLENBQVUsMkNBQTJDRCxTQUEzQyxHQUF1RCxpQkFBakUsQ0FBTjtBQUNEO0FBQ0Q1RSxVQUFJNEUsU0FBSixJQUFpQkQsS0FBakI7QUFDRCxLQVREO0FBVUEsV0FBTzNFLEdBQVA7QUFDRCxHQWZrQixFQWVoQixFQWZnQixDQUFuQjs7QUFpQkEsUUFBTWlGLGVBQWVaLE1BQU12RSxNQUFOLENBQWEsVUFBU2EsSUFBVCxFQUFlO0FBQy9DLFdBQU82RCxXQUFXN0QsSUFBWCxNQUFxQnFFLFNBQTVCO0FBQ0QsR0FGb0IsQ0FBckI7O0FBSUEsU0FBT0MsYUFBYVIsTUFBYixDQUFvQixVQUFTekUsR0FBVCxFQUFjVyxJQUFkLEVBQW9CO0FBQzdDWCxRQUFJVyxJQUFKLElBQVk0RCxPQUFPOUUsTUFBbkI7QUFDQSxXQUFPTyxHQUFQO0FBQ0QsR0FITSxFQUdKd0UsVUFISSxDQUFQO0FBSUQ7O0FBRUQsU0FBU1UscUJBQVQsQ0FBK0I3QyxPQUEvQixFQUF3QzhDLGNBQXhDLEVBQXdEO0FBQ3RELFFBQU1DLFdBQVduRixhQUFha0YsZUFBZXhHLElBQTVCLENBQWpCO0FBQ0EsUUFBTTBCLG9CQUFvQmYscUJBQ3hCK0MsUUFBUUUsYUFBUixFQUR3QixFQUNDNkMsUUFERCxFQUNXOUUsb0JBQW9COEUsUUFBcEIsQ0FEWCxDQUExQjs7QUFHQSxNQUFJQyxZQUFZRCxTQUFTNUUsR0FBekI7QUFDQSxNQUFJSCxrQkFBa0JaLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQ2hDNEYsZ0JBQVloRixrQkFBa0JBLGtCQUFrQlosTUFBbEIsR0FBMkIsQ0FBN0MsRUFBZ0RlLEdBQTVEO0FBQ0Q7QUFDRCxTQUFRNEMsS0FBRCxJQUFXQSxNQUFNa0Msb0JBQU4sQ0FBMkIsQ0FBQ0YsU0FBU3ZFLEtBQVYsRUFBaUJ3RSxTQUFqQixDQUEzQixFQUF3RCxJQUF4RCxDQUFsQjtBQUNEOztBQUVELFNBQVNFLHdCQUFULENBQWtDbEQsT0FBbEMsRUFBMkNtRCxhQUEzQyxFQUEwREwsY0FBMUQsRUFBMEU7QUFDeEUsUUFBTXRHLGFBQWF3RCxRQUFRRSxhQUFSLEVBQW5CO0FBQ0EsUUFBTTZDLFdBQVduRixhQUFha0YsZUFBZXhHLElBQTVCLENBQWpCO0FBQ0EsUUFBTThHLFdBQVd4RixhQUFhdUYsY0FBYzdHLElBQTNCLENBQWpCO0FBQ0EsUUFBTStHLGdCQUFnQixDQUNwQnRGLDBCQUEwQnZCLFVBQTFCLEVBQXNDdUcsUUFBdEMsQ0FEb0IsRUFFcEJyRSw0QkFBNEJsQyxVQUE1QixFQUF3QzRHLFFBQXhDLENBRm9CLENBQXRCO0FBSUEsTUFBSSxRQUFRRSxJQUFSLENBQWE5RyxXQUFXNEIsSUFBWCxDQUFnQnVDLFNBQWhCLENBQTBCMEMsY0FBYyxDQUFkLENBQTFCLEVBQTRDQSxjQUFjLENBQWQsQ0FBNUMsQ0FBYixDQUFKLEVBQWlGO0FBQy9FLFdBQVF0QyxLQUFELElBQVdBLE1BQU13QyxXQUFOLENBQWtCRixhQUFsQixDQUFsQjtBQUNEO0FBQ0QsU0FBT1YsU0FBUDtBQUNEOztBQUVELFNBQVNhLHlCQUFULENBQW9DeEQsT0FBcEMsRUFBNkN6QyxRQUE3QyxFQUF1RGtHLHNCQUF2RCxFQUErRTtBQUM3RSxRQUFNQywrQkFBK0IsQ0FBQ1AsYUFBRCxFQUFnQkwsY0FBaEIsS0FBbUM7QUFDdEUsVUFBTWEsc0JBQXNCM0QsUUFBUUUsYUFBUixHQUF3QjBELEtBQXhCLENBQThCL0QsS0FBOUIsQ0FDMUJpRCxlQUFleEcsSUFBZixDQUFvQmlDLEdBQXBCLENBQXdCSixHQUF4QixDQUE0Qk0sSUFERixFQUUxQjBFLGNBQWM3RyxJQUFkLENBQW1CaUMsR0FBbkIsQ0FBdUJDLEtBQXZCLENBQTZCQyxJQUE3QixHQUFvQyxDQUZWLENBQTVCOztBQUtBLFdBQU9rRixvQkFBb0JsRyxNQUFwQixDQUE0QmdCLElBQUQsSUFBVSxDQUFDQSxLQUFLb0YsSUFBTCxHQUFZekcsTUFBbEQsRUFBMERBLE1BQWpFO0FBQ0QsR0FQRDtBQVFBLE1BQUkwRixpQkFBaUJ2RixTQUFTLENBQVQsQ0FBckI7O0FBRUFBLFdBQVNzQyxLQUFULENBQWUsQ0FBZixFQUFrQnNCLE9BQWxCLENBQTBCLFVBQVNnQyxhQUFULEVBQXdCO0FBQ2hELFVBQU1XLG9CQUFvQkosNkJBQTZCUCxhQUE3QixFQUE0Q0wsY0FBNUMsQ0FBMUI7O0FBRUEsUUFBSVcsMkJBQTJCLFFBQTNCLElBQ0dBLDJCQUEyQiwwQkFEbEMsRUFDOEQ7QUFDNUQsVUFBSU4sY0FBYzlHLElBQWQsS0FBdUJ5RyxlQUFlekcsSUFBdEMsSUFBOEN5SCxzQkFBc0IsQ0FBeEUsRUFBMkU7QUFDekU5RCxnQkFBUWEsTUFBUixDQUFlO0FBQ2J2RSxnQkFBTXdHLGVBQWV4RyxJQURSO0FBRWJzRSxtQkFBUywrREFGSTtBQUdiRSxlQUFLK0Isc0JBQXNCN0MsT0FBdEIsRUFBK0I4QyxjQUEvQixFQUErQ0ssYUFBL0M7QUFIUSxTQUFmO0FBS0QsT0FORCxNQU1PLElBQUlBLGNBQWM5RyxJQUFkLEtBQXVCeUcsZUFBZXpHLElBQXRDLElBQ055SCxvQkFBb0IsQ0FEZCxJQUVOTCwyQkFBMkIsMEJBRnpCLEVBRXFEO0FBQzFEekQsZ0JBQVFhLE1BQVIsQ0FBZTtBQUNidkUsZ0JBQU13RyxlQUFleEcsSUFEUjtBQUVic0UsbUJBQVMsbURBRkk7QUFHYkUsZUFBS29DLHlCQUF5QmxELE9BQXpCLEVBQWtDbUQsYUFBbEMsRUFBaURMLGNBQWpEO0FBSFEsU0FBZjtBQUtEO0FBQ0YsS0FqQkQsTUFpQk8sSUFBSWdCLG9CQUFvQixDQUF4QixFQUEyQjtBQUNoQzlELGNBQVFhLE1BQVIsQ0FBZTtBQUNidkUsY0FBTXdHLGVBQWV4RyxJQURSO0FBRWJzRSxpQkFBUyxxREFGSTtBQUdiRSxhQUFLb0MseUJBQXlCbEQsT0FBekIsRUFBa0NtRCxhQUFsQyxFQUFpREwsY0FBakQ7QUFIUSxPQUFmO0FBS0Q7O0FBRURBLHFCQUFpQkssYUFBakI7QUFDRCxHQTdCRDtBQThCRDs7QUFFRFksT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU07QUFDSkMsV0FBSyx1QkFBUSxPQUFSO0FBREQsS0FERjs7QUFLSkMsYUFBUyxNQUxMO0FBTUpDLFlBQVEsQ0FDTjtBQUNFL0YsWUFBTSxRQURSO0FBRUVnRyxrQkFBWTtBQUNWcEMsZ0JBQVE7QUFDTjVELGdCQUFNO0FBREEsU0FERTtBQUlWLDRCQUFvQjtBQUNsQmlHLGdCQUFNLENBQ0osUUFESSxFQUVKLFFBRkksRUFHSiwwQkFISSxFQUlKLE9BSkk7QUFEWTtBQUpWLE9BRmQ7QUFlRUMsNEJBQXNCO0FBZnhCLEtBRE07QUFOSixHQURTOztBQTRCZkMsVUFBUSxTQUFTQyxlQUFULENBQTBCMUUsT0FBMUIsRUFBbUM7QUFDekMsVUFBTTJFLFVBQVUzRSxRQUFRMkUsT0FBUixDQUFnQixDQUFoQixLQUFzQixFQUF0QztBQUNBLFVBQU1sQix5QkFBeUJrQixRQUFRLGtCQUFSLEtBQStCLFFBQTlEO0FBQ0EsUUFBSTlDLEtBQUo7O0FBRUEsUUFBSTtBQUNGQSxjQUFRSSxxQkFBcUIwQyxRQUFRekMsTUFBUixJQUFrQm5HLGFBQXZDLENBQVI7QUFDRCxLQUZELENBRUUsT0FBTzZJLEtBQVAsRUFBYztBQUNkO0FBQ0EsYUFBTztBQUNMQyxpQkFBUyxVQUFTdkksSUFBVCxFQUFlO0FBQ3RCMEQsa0JBQVFhLE1BQVIsQ0FBZXZFLElBQWYsRUFBcUJzSSxNQUFNaEUsT0FBM0I7QUFDRDtBQUhJLE9BQVA7QUFLRDtBQUNELFFBQUlyRCxXQUFXLEVBQWY7QUFDQSxRQUFJdUgsUUFBUSxDQUFaOztBQUVBLGFBQVNDLGNBQVQsR0FBMEI7QUFDeEJEO0FBQ0Q7QUFDRCxhQUFTRSxjQUFULEdBQTBCO0FBQ3hCRjtBQUNEOztBQUVELFdBQU87QUFDTEcseUJBQW1CLFNBQVNDLGFBQVQsQ0FBdUI1SSxJQUF2QixFQUE2QjtBQUM5QyxZQUFJQSxLQUFLOEMsVUFBTCxDQUFnQmhDLE1BQXBCLEVBQTRCO0FBQUU7QUFDNUIsZ0JBQU1oQixPQUFPRSxLQUFLNkksTUFBTCxDQUFZQyxLQUF6QjtBQUNBdEQsdUJBQWE5QixPQUFiLEVBQXNCMUQsSUFBdEIsRUFBNEJGLElBQTVCLEVBQWtDLFFBQWxDLEVBQTRDeUYsS0FBNUMsRUFBbUR0RSxRQUFuRDtBQUNEO0FBQ0YsT0FOSTtBQU9MOEgsc0JBQWdCLFNBQVNDLGNBQVQsQ0FBd0JoSixJQUF4QixFQUE4QjtBQUM1QyxZQUFJd0ksVUFBVSxDQUFWLElBQWUsQ0FBQyw2QkFBZ0J4SSxJQUFoQixDQUFoQixJQUF5QyxDQUFDeUYsdUJBQXVCekYsS0FBS3VCLE1BQTVCLENBQTlDLEVBQW1GO0FBQ2pGO0FBQ0Q7QUFDRCxjQUFNekIsT0FBT0UsS0FBSzRDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCa0csS0FBL0I7QUFDQXRELHFCQUFhOUIsT0FBYixFQUFzQjFELElBQXRCLEVBQTRCRixJQUE1QixFQUFrQyxTQUFsQyxFQUE2Q3lGLEtBQTdDLEVBQW9EdEUsUUFBcEQ7QUFDRCxPQWJJO0FBY0wsc0JBQWdCLFNBQVNnSSxjQUFULEdBQTBCO0FBQ3hDOUQsNkJBQXFCekIsT0FBckIsRUFBOEJ6QyxRQUE5Qjs7QUFFQSxZQUFJa0csMkJBQTJCLFFBQS9CLEVBQXlDO0FBQ3ZDRCxvQ0FBMEJ4RCxPQUExQixFQUFtQ3pDLFFBQW5DLEVBQTZDa0csc0JBQTdDO0FBQ0Q7O0FBRURsRyxtQkFBVyxFQUFYO0FBQ0QsT0F0Qkk7QUF1QkxpSSwyQkFBcUJULGNBdkJoQjtBQXdCTFUsMEJBQW9CVixjQXhCZjtBQXlCTFcsK0JBQXlCWCxjQXpCcEI7QUEwQkxZLHNCQUFnQlosY0ExQlg7QUEyQkxhLHdCQUFrQmIsY0EzQmI7QUE0Qkwsa0NBQTRCQyxjQTVCdkI7QUE2QkwsaUNBQTJCQSxjQTdCdEI7QUE4Qkwsc0NBQWdDQSxjQTlCM0I7QUErQkwsNkJBQXVCQSxjQS9CbEI7QUFnQ0wsK0JBQXlCQTtBQWhDcEIsS0FBUDtBQWtDRDtBQXZGYyxDQUFqQiIsImZpbGUiOiJydWxlcy9vcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgaW1wb3J0VHlwZSBmcm9tICcuLi9jb3JlL2ltcG9ydFR5cGUnXG5pbXBvcnQgaXNTdGF0aWNSZXF1aXJlIGZyb20gJy4uL2NvcmUvc3RhdGljUmVxdWlyZSdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbmNvbnN0IGRlZmF1bHRHcm91cHMgPSBbJ2J1aWx0aW4nLCAnZXh0ZXJuYWwnLCAncGFyZW50JywgJ3NpYmxpbmcnLCAnaW5kZXgnXVxuXG4vLyBSRVBPUlRJTkcgQU5EIEZJWElOR1xuXG5mdW5jdGlvbiByZXZlcnNlKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdi5uYW1lLFxuICAgICAgcmFuazogLXYucmFuayxcbiAgICAgIG5vZGU6IHYubm9kZSxcbiAgICB9XG4gIH0pLnJldmVyc2UoKVxufVxuXG5mdW5jdGlvbiBnZXRUb2tlbnNPckNvbW1lbnRzQWZ0ZXIoc291cmNlQ29kZSwgbm9kZSwgY291bnQpIHtcbiAgbGV0IGN1cnJlbnROb2RlT3JUb2tlbiA9IG5vZGVcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgY3VycmVudE5vZGVPclRva2VuID0gc291cmNlQ29kZS5nZXRUb2tlbk9yQ29tbWVudEFmdGVyKGN1cnJlbnROb2RlT3JUb2tlbilcbiAgICBpZiAoY3VycmVudE5vZGVPclRva2VuID09IG51bGwpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKGN1cnJlbnROb2RlT3JUb2tlbilcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGdldFRva2Vuc09yQ29tbWVudHNCZWZvcmUoc291cmNlQ29kZSwgbm9kZSwgY291bnQpIHtcbiAgbGV0IGN1cnJlbnROb2RlT3JUb2tlbiA9IG5vZGVcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgY3VycmVudE5vZGVPclRva2VuID0gc291cmNlQ29kZS5nZXRUb2tlbk9yQ29tbWVudEJlZm9yZShjdXJyZW50Tm9kZU9yVG9rZW4pXG4gICAgaWYgKGN1cnJlbnROb2RlT3JUb2tlbiA9PSBudWxsKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICByZXN1bHQucHVzaChjdXJyZW50Tm9kZU9yVG9rZW4pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5yZXZlcnNlKClcbn1cblxuZnVuY3Rpb24gdGFrZVRva2Vuc0FmdGVyV2hpbGUoc291cmNlQ29kZSwgbm9kZSwgY29uZGl0aW9uKSB7XG4gIGNvbnN0IHRva2VucyA9IGdldFRva2Vuc09yQ29tbWVudHNBZnRlcihzb3VyY2VDb2RlLCBub2RlLCAxMDApXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNvbmRpdGlvbih0b2tlbnNbaV0pKSB7XG4gICAgICByZXN1bHQucHVzaCh0b2tlbnNbaV0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiB0YWtlVG9rZW5zQmVmb3JlV2hpbGUoc291cmNlQ29kZSwgbm9kZSwgY29uZGl0aW9uKSB7XG4gIGNvbnN0IHRva2VucyA9IGdldFRva2Vuc09yQ29tbWVudHNCZWZvcmUoc291cmNlQ29kZSwgbm9kZSwgMTAwKVxuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGNvbmRpdGlvbih0b2tlbnNbaV0pKSB7XG4gICAgICByZXN1bHQucHVzaCh0b2tlbnNbaV0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5yZXZlcnNlKClcbn1cblxuZnVuY3Rpb24gZmluZE91dE9mT3JkZXIoaW1wb3J0ZWQpIHtcbiAgaWYgKGltcG9ydGVkLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIGxldCBtYXhTZWVuUmFua05vZGUgPSBpbXBvcnRlZFswXVxuICByZXR1cm4gaW1wb3J0ZWQuZmlsdGVyKGZ1bmN0aW9uIChpbXBvcnRlZE1vZHVsZSkge1xuICAgIGNvbnN0IHJlcyA9IGltcG9ydGVkTW9kdWxlLnJhbmsgPCBtYXhTZWVuUmFua05vZGUucmFua1xuICAgIGlmIChtYXhTZWVuUmFua05vZGUucmFuayA8IGltcG9ydGVkTW9kdWxlLnJhbmspIHtcbiAgICAgIG1heFNlZW5SYW5rTm9kZSA9IGltcG9ydGVkTW9kdWxlXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfSlcbn1cblxuZnVuY3Rpb24gZmluZFJvb3ROb2RlKG5vZGUpIHtcbiAgbGV0IHBhcmVudCA9IG5vZGVcbiAgd2hpbGUgKHBhcmVudC5wYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnQucGFyZW50LmJvZHkgPT0gbnVsbCkge1xuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxuICByZXR1cm4gcGFyZW50XG59XG5cbmZ1bmN0aW9uIGZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgbm9kZSkge1xuICBjb25zdCB0b2tlbnNUb0VuZE9mTGluZSA9IHRha2VUb2tlbnNBZnRlcldoaWxlKHNvdXJjZUNvZGUsIG5vZGUsIGNvbW1lbnRPblNhbWVMaW5lQXMobm9kZSkpXG4gIGxldCBlbmRPZlRva2VucyA9IHRva2Vuc1RvRW5kT2ZMaW5lLmxlbmd0aCA+IDBcbiAgICA/IHRva2Vuc1RvRW5kT2ZMaW5lW3Rva2Vuc1RvRW5kT2ZMaW5lLmxlbmd0aCAtIDFdLmVuZFxuICAgIDogbm9kZS5lbmRcbiAgbGV0IHJlc3VsdCA9IGVuZE9mVG9rZW5zXG4gIGZvciAobGV0IGkgPSBlbmRPZlRva2VuczsgaSA8IHNvdXJjZUNvZGUudGV4dC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzb3VyY2VDb2RlLnRleHRbaV0gPT09ICdcXG4nKSB7XG4gICAgICByZXN1bHQgPSBpICsgMVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKHNvdXJjZUNvZGUudGV4dFtpXSAhPT0gJyAnICYmIHNvdXJjZUNvZGUudGV4dFtpXSAhPT0gJ1xcdCcgJiYgc291cmNlQ29kZS50ZXh0W2ldICE9PSAnXFxyJykge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgcmVzdWx0ID0gaSArIDFcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNvbW1lbnRPblNhbWVMaW5lQXMobm9kZSkge1xuICByZXR1cm4gdG9rZW4gPT4gKHRva2VuLnR5cGUgPT09ICdCbG9jaycgfHwgIHRva2VuLnR5cGUgPT09ICdMaW5lJykgJiZcbiAgICAgIHRva2VuLmxvYy5zdGFydC5saW5lID09PSB0b2tlbi5sb2MuZW5kLmxpbmUgJiZcbiAgICAgIHRva2VuLmxvYy5lbmQubGluZSA9PT0gbm9kZS5sb2MuZW5kLmxpbmVcbn1cblxuZnVuY3Rpb24gZmluZFN0YXJ0T2ZMaW5lV2l0aENvbW1lbnRzKHNvdXJjZUNvZGUsIG5vZGUpIHtcbiAgY29uc3QgdG9rZW5zVG9FbmRPZkxpbmUgPSB0YWtlVG9rZW5zQmVmb3JlV2hpbGUoc291cmNlQ29kZSwgbm9kZSwgY29tbWVudE9uU2FtZUxpbmVBcyhub2RlKSlcbiAgbGV0IHN0YXJ0T2ZUb2tlbnMgPSB0b2tlbnNUb0VuZE9mTGluZS5sZW5ndGggPiAwID8gdG9rZW5zVG9FbmRPZkxpbmVbMF0uc3RhcnQgOiBub2RlLnN0YXJ0XG4gIGxldCByZXN1bHQgPSBzdGFydE9mVG9rZW5zXG4gIGZvciAobGV0IGkgPSBzdGFydE9mVG9rZW5zIC0gMTsgaSA+IDA7IGktLSkge1xuICAgIGlmIChzb3VyY2VDb2RlLnRleHRbaV0gIT09ICcgJyAmJiBzb3VyY2VDb2RlLnRleHRbaV0gIT09ICdcXHQnKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICByZXN1bHQgPSBpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBpc1BsYWluUmVxdWlyZU1vZHVsZShub2RlKSB7XG4gIGlmIChub2RlLnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChub2RlLmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBjb25zdCBkZWNsID0gbm9kZS5kZWNsYXJhdGlvbnNbMF1cbiAgY29uc3QgcmVzdWx0ID0gKGRlY2wuaWQgIT0gbnVsbCAmJiAgZGVjbC5pZC50eXBlID09PSAnSWRlbnRpZmllcicpICYmXG4gICAgZGVjbC5pbml0ICE9IG51bGwgJiZcbiAgICBkZWNsLmluaXQudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyAmJlxuICAgIGRlY2wuaW5pdC5jYWxsZWUgIT0gbnVsbCAmJlxuICAgIGRlY2wuaW5pdC5jYWxsZWUubmFtZSA9PT0gJ3JlcXVpcmUnICYmXG4gICAgZGVjbC5pbml0LmFyZ3VtZW50cyAhPSBudWxsICYmXG4gICAgZGVjbC5pbml0LmFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICBkZWNsLmluaXQuYXJndW1lbnRzWzBdLnR5cGUgPT09ICdMaXRlcmFsJ1xuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5JbXBvcnRNb2R1bGUobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnSW1wb3J0RGVjbGFyYXRpb24nICYmIG5vZGUuc3BlY2lmaWVycyAhPSBudWxsICYmIG5vZGUuc3BlY2lmaWVycy5sZW5ndGggPiAwXG59XG5cbmZ1bmN0aW9uIGNhbkNyb3NzTm9kZVdoaWxlUmVvcmRlcihub2RlKSB7XG4gIHJldHVybiBpc1BsYWluUmVxdWlyZU1vZHVsZShub2RlKSB8fCBpc1BsYWluSW1wb3J0TW9kdWxlKG5vZGUpXG59XG5cbmZ1bmN0aW9uIGNhblJlb3JkZXJJdGVtcyhmaXJzdE5vZGUsIHNlY29uZE5vZGUpIHtcbiAgY29uc3QgcGFyZW50ID0gZmlyc3ROb2RlLnBhcmVudFxuICBjb25zdCBmaXJzdEluZGV4ID0gcGFyZW50LmJvZHkuaW5kZXhPZihmaXJzdE5vZGUpXG4gIGNvbnN0IHNlY29uZEluZGV4ID0gcGFyZW50LmJvZHkuaW5kZXhPZihzZWNvbmROb2RlKVxuICBjb25zdCBub2Rlc0JldHdlZW4gPSBwYXJlbnQuYm9keS5zbGljZShmaXJzdEluZGV4LCBzZWNvbmRJbmRleCArIDEpXG4gIGZvciAodmFyIG5vZGVCZXR3ZWVuIG9mIG5vZGVzQmV0d2Vlbikge1xuICAgIGlmICghY2FuQ3Jvc3NOb2RlV2hpbGVSZW9yZGVyKG5vZGVCZXR3ZWVuKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpeE91dE9mT3JkZXIoY29udGV4dCwgZmlyc3ROb2RlLCBzZWNvbmROb2RlLCBvcmRlcikge1xuICBjb25zdCBzb3VyY2VDb2RlID0gY29udGV4dC5nZXRTb3VyY2VDb2RlKClcblxuICBjb25zdCBmaXJzdFJvb3QgPSBmaW5kUm9vdE5vZGUoZmlyc3ROb2RlLm5vZGUpXG4gIGxldCBmaXJzdFJvb3RTdGFydCA9IGZpbmRTdGFydE9mTGluZVdpdGhDb21tZW50cyhzb3VyY2VDb2RlLCBmaXJzdFJvb3QpXG4gIGNvbnN0IGZpcnN0Um9vdEVuZCA9IGZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgZmlyc3RSb290KVxuXG4gIGNvbnN0IHNlY29uZFJvb3QgPSBmaW5kUm9vdE5vZGUoc2Vjb25kTm9kZS5ub2RlKVxuICBsZXQgc2Vjb25kUm9vdFN0YXJ0ID0gZmluZFN0YXJ0T2ZMaW5lV2l0aENvbW1lbnRzKHNvdXJjZUNvZGUsIHNlY29uZFJvb3QpXG4gIGxldCBzZWNvbmRSb290RW5kID0gZmluZEVuZE9mTGluZVdpdGhDb21tZW50cyhzb3VyY2VDb2RlLCBzZWNvbmRSb290KVxuICBjb25zdCBjYW5GaXggPSBjYW5SZW9yZGVySXRlbXMoZmlyc3RSb290LCBzZWNvbmRSb290KVxuXG4gIGxldCBuZXdDb2RlID0gc291cmNlQ29kZS50ZXh0LnN1YnN0cmluZyhzZWNvbmRSb290U3RhcnQsIHNlY29uZFJvb3RFbmQpXG4gIGlmIChuZXdDb2RlW25ld0NvZGUubGVuZ3RoIC0gMV0gIT09ICdcXG4nKSB7XG4gICAgbmV3Q29kZSA9IG5ld0NvZGUgKyAnXFxuJ1xuICB9XG5cbiAgY29uc3QgbWVzc2FnZSA9ICdgJyArIHNlY29uZE5vZGUubmFtZSArICdgIGltcG9ydCBzaG91bGQgb2NjdXIgJyArIG9yZGVyICtcbiAgICAgICcgaW1wb3J0IG9mIGAnICsgZmlyc3ROb2RlLm5hbWUgKyAnYCdcblxuICBpZiAob3JkZXIgPT09ICdiZWZvcmUnKSB7XG4gICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgbm9kZTogc2Vjb25kTm9kZS5ub2RlLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGZpeDogY2FuRml4ICYmIChmaXhlciA9PlxuICAgICAgICBmaXhlci5yZXBsYWNlVGV4dFJhbmdlKFxuICAgICAgICAgIFtmaXJzdFJvb3RTdGFydCwgc2Vjb25kUm9vdEVuZF0sXG4gICAgICAgICAgbmV3Q29kZSArIHNvdXJjZUNvZGUudGV4dC5zdWJzdHJpbmcoZmlyc3RSb290U3RhcnQsIHNlY29uZFJvb3RTdGFydClcbiAgICAgICAgKSksXG4gICAgfSlcbiAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ2FmdGVyJykge1xuICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgIG5vZGU6IHNlY29uZE5vZGUubm9kZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBmaXg6IGNhbkZpeCAmJiAoZml4ZXIgPT5cbiAgICAgICAgZml4ZXIucmVwbGFjZVRleHRSYW5nZShcbiAgICAgICAgICBbc2Vjb25kUm9vdFN0YXJ0LCBmaXJzdFJvb3RFbmRdLFxuICAgICAgICAgIHNvdXJjZUNvZGUudGV4dC5zdWJzdHJpbmcoc2Vjb25kUm9vdEVuZCwgZmlyc3RSb290RW5kKSArIG5ld0NvZGVcbiAgICAgICAgKSksXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiByZXBvcnRPdXRPZk9yZGVyKGNvbnRleHQsIGltcG9ydGVkLCBvdXRPZk9yZGVyLCBvcmRlcikge1xuICBvdXRPZk9yZGVyLmZvckVhY2goZnVuY3Rpb24gKGltcCkge1xuICAgIGNvbnN0IGZvdW5kID0gaW1wb3J0ZWQuZmluZChmdW5jdGlvbiBoYXNIaWdoZXJSYW5rKGltcG9ydGVkSXRlbSkge1xuICAgICAgcmV0dXJuIGltcG9ydGVkSXRlbS5yYW5rID4gaW1wLnJhbmtcbiAgICB9KVxuICAgIGZpeE91dE9mT3JkZXIoY29udGV4dCwgZm91bmQsIGltcCwgb3JkZXIpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG1ha2VPdXRPZk9yZGVyUmVwb3J0KGNvbnRleHQsIGltcG9ydGVkKSB7XG4gIGNvbnN0IG91dE9mT3JkZXIgPSBmaW5kT3V0T2ZPcmRlcihpbXBvcnRlZClcbiAgaWYgKCFvdXRPZk9yZGVyLmxlbmd0aCkge1xuICAgIHJldHVyblxuICB9XG4gIC8vIFRoZXJlIGFyZSB0aGluZ3MgdG8gcmVwb3J0LiBUcnkgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiByZXBvcnRlZCBlcnJvcnMuXG4gIGNvbnN0IHJldmVyc2VkSW1wb3J0ZWQgPSByZXZlcnNlKGltcG9ydGVkKVxuICBjb25zdCByZXZlcnNlZE9yZGVyID0gZmluZE91dE9mT3JkZXIocmV2ZXJzZWRJbXBvcnRlZClcbiAgaWYgKHJldmVyc2VkT3JkZXIubGVuZ3RoIDwgb3V0T2ZPcmRlci5sZW5ndGgpIHtcbiAgICByZXBvcnRPdXRPZk9yZGVyKGNvbnRleHQsIHJldmVyc2VkSW1wb3J0ZWQsIHJldmVyc2VkT3JkZXIsICdhZnRlcicpXG4gICAgcmV0dXJuXG4gIH1cbiAgcmVwb3J0T3V0T2ZPcmRlcihjb250ZXh0LCBpbXBvcnRlZCwgb3V0T2ZPcmRlciwgJ2JlZm9yZScpXG59XG5cbi8vIERFVEVDVElOR1xuXG5mdW5jdGlvbiBjb21wdXRlUmFuayhjb250ZXh0LCByYW5rcywgbmFtZSwgdHlwZSkge1xuICByZXR1cm4gcmFua3NbaW1wb3J0VHlwZShuYW1lLCBjb250ZXh0KV0gK1xuICAgICh0eXBlID09PSAnaW1wb3J0JyA/IDAgOiAxMDApXG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTm9kZShjb250ZXh0LCBub2RlLCBuYW1lLCB0eXBlLCByYW5rcywgaW1wb3J0ZWQpIHtcbiAgY29uc3QgcmFuayA9IGNvbXB1dGVSYW5rKGNvbnRleHQsIHJhbmtzLCBuYW1lLCB0eXBlKVxuICBpZiAocmFuayAhPT0gLTEpIHtcbiAgICBpbXBvcnRlZC5wdXNoKHtuYW1lLCByYW5rLCBub2RlfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgJiZcbiAgICAobm9kZS50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJyB8fCBpc0luVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUucGFyZW50KSlcbn1cblxuY29uc3QgdHlwZXMgPSBbJ2J1aWx0aW4nLCAnZXh0ZXJuYWwnLCAnaW50ZXJuYWwnLCAncGFyZW50JywgJ3NpYmxpbmcnLCAnaW5kZXgnXVxuXG4vLyBDcmVhdGVzIGFuIG9iamVjdCB3aXRoIHR5cGUtcmFuayBwYWlycy5cbi8vIEV4YW1wbGU6IHsgaW5kZXg6IDAsIHNpYmxpbmc6IDEsIHBhcmVudDogMSwgZXh0ZXJuYWw6IDEsIGJ1aWx0aW46IDIsIGludGVybmFsOiAyIH1cbi8vIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgaXQgY29udGFpbnMgYSB0eXBlIHRoYXQgZG9lcyBub3QgZXhpc3QsIG9yIGhhcyBhIGR1cGxpY2F0ZVxuZnVuY3Rpb24gY29udmVydEdyb3Vwc1RvUmFua3MoZ3JvdXBzKSB7XG4gIGNvbnN0IHJhbmtPYmplY3QgPSBncm91cHMucmVkdWNlKGZ1bmN0aW9uKHJlcywgZ3JvdXAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBncm91cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdyb3VwID0gW2dyb3VwXVxuICAgIH1cbiAgICBncm91cC5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwSXRlbSkge1xuICAgICAgaWYgKHR5cGVzLmluZGV4T2YoZ3JvdXBJdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZTogVW5rbm93biB0eXBlIGAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShncm91cEl0ZW0pICsgJ2AnKVxuICAgICAgfVxuICAgICAgaWYgKHJlc1tncm91cEl0ZW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZTogYCcgKyBncm91cEl0ZW0gKyAnYCBpcyBkdXBsaWNhdGVkJylcbiAgICAgIH1cbiAgICAgIHJlc1tncm91cEl0ZW1dID0gaW5kZXhcbiAgICB9KVxuICAgIHJldHVybiByZXNcbiAgfSwge30pXG5cbiAgY29uc3Qgb21pdHRlZFR5cGVzID0gdHlwZXMuZmlsdGVyKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICByZXR1cm4gcmFua09iamVjdFt0eXBlXSA9PT0gdW5kZWZpbmVkXG4gIH0pXG5cbiAgcmV0dXJuIG9taXR0ZWRUeXBlcy5yZWR1Y2UoZnVuY3Rpb24ocmVzLCB0eXBlKSB7XG4gICAgcmVzW3R5cGVdID0gZ3JvdXBzLmxlbmd0aFxuICAgIHJldHVybiByZXNcbiAgfSwgcmFua09iamVjdClcbn1cblxuZnVuY3Rpb24gZml4TmV3TGluZUFmdGVySW1wb3J0KGNvbnRleHQsIHByZXZpb3VzSW1wb3J0KSB7XG4gIGNvbnN0IHByZXZSb290ID0gZmluZFJvb3ROb2RlKHByZXZpb3VzSW1wb3J0Lm5vZGUpXG4gIGNvbnN0IHRva2Vuc1RvRW5kT2ZMaW5lID0gdGFrZVRva2Vuc0FmdGVyV2hpbGUoXG4gICAgY29udGV4dC5nZXRTb3VyY2VDb2RlKCksIHByZXZSb290LCBjb21tZW50T25TYW1lTGluZUFzKHByZXZSb290KSlcblxuICBsZXQgZW5kT2ZMaW5lID0gcHJldlJvb3QuZW5kXG4gIGlmICh0b2tlbnNUb0VuZE9mTGluZS5sZW5ndGggPiAwKSB7XG4gICAgZW5kT2ZMaW5lID0gdG9rZW5zVG9FbmRPZkxpbmVbdG9rZW5zVG9FbmRPZkxpbmUubGVuZ3RoIC0gMV0uZW5kXG4gIH1cbiAgcmV0dXJuIChmaXhlcikgPT4gZml4ZXIuaW5zZXJ0VGV4dEFmdGVyUmFuZ2UoW3ByZXZSb290LnN0YXJ0LCBlbmRPZkxpbmVdLCAnXFxuJylcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTmV3TGluZUFmdGVySW1wb3J0KGNvbnRleHQsIGN1cnJlbnRJbXBvcnQsIHByZXZpb3VzSW1wb3J0KSB7XG4gIGNvbnN0IHNvdXJjZUNvZGUgPSBjb250ZXh0LmdldFNvdXJjZUNvZGUoKVxuICBjb25zdCBwcmV2Um9vdCA9IGZpbmRSb290Tm9kZShwcmV2aW91c0ltcG9ydC5ub2RlKVxuICBjb25zdCBjdXJyUm9vdCA9IGZpbmRSb290Tm9kZShjdXJyZW50SW1wb3J0Lm5vZGUpXG4gIGNvbnN0IHJhbmdlVG9SZW1vdmUgPSBbXG4gICAgZmluZEVuZE9mTGluZVdpdGhDb21tZW50cyhzb3VyY2VDb2RlLCBwcmV2Um9vdCksXG4gICAgZmluZFN0YXJ0T2ZMaW5lV2l0aENvbW1lbnRzKHNvdXJjZUNvZGUsIGN1cnJSb290KSxcbiAgXVxuICBpZiAoL15cXHMqJC8udGVzdChzb3VyY2VDb2RlLnRleHQuc3Vic3RyaW5nKHJhbmdlVG9SZW1vdmVbMF0sIHJhbmdlVG9SZW1vdmVbMV0pKSkge1xuICAgIHJldHVybiAoZml4ZXIpID0+IGZpeGVyLnJlbW92ZVJhbmdlKHJhbmdlVG9SZW1vdmUpXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBtYWtlTmV3bGluZXNCZXR3ZWVuUmVwb3J0IChjb250ZXh0LCBpbXBvcnRlZCwgbmV3bGluZXNCZXR3ZWVuSW1wb3J0cykge1xuICBjb25zdCBnZXROdW1iZXJPZkVtcHR5TGluZXNCZXR3ZWVuID0gKGN1cnJlbnRJbXBvcnQsIHByZXZpb3VzSW1wb3J0KSA9PiB7XG4gICAgY29uc3QgbGluZXNCZXR3ZWVuSW1wb3J0cyA9IGNvbnRleHQuZ2V0U291cmNlQ29kZSgpLmxpbmVzLnNsaWNlKFxuICAgICAgcHJldmlvdXNJbXBvcnQubm9kZS5sb2MuZW5kLmxpbmUsXG4gICAgICBjdXJyZW50SW1wb3J0Lm5vZGUubG9jLnN0YXJ0LmxpbmUgLSAxXG4gICAgKVxuXG4gICAgcmV0dXJuIGxpbmVzQmV0d2VlbkltcG9ydHMuZmlsdGVyKChsaW5lKSA9PiAhbGluZS50cmltKCkubGVuZ3RoKS5sZW5ndGhcbiAgfVxuICBsZXQgcHJldmlvdXNJbXBvcnQgPSBpbXBvcnRlZFswXVxuXG4gIGltcG9ydGVkLnNsaWNlKDEpLmZvckVhY2goZnVuY3Rpb24oY3VycmVudEltcG9ydCkge1xuICAgIGNvbnN0IGVtcHR5TGluZXNCZXR3ZWVuID0gZ2V0TnVtYmVyT2ZFbXB0eUxpbmVzQmV0d2VlbihjdXJyZW50SW1wb3J0LCBwcmV2aW91c0ltcG9ydClcblxuICAgIGlmIChuZXdsaW5lc0JldHdlZW5JbXBvcnRzID09PSAnYWx3YXlzJ1xuICAgICAgICB8fCBuZXdsaW5lc0JldHdlZW5JbXBvcnRzID09PSAnYWx3YXlzLWFuZC1pbnNpZGUtZ3JvdXBzJykge1xuICAgICAgaWYgKGN1cnJlbnRJbXBvcnQucmFuayAhPT0gcHJldmlvdXNJbXBvcnQucmFuayAmJiBlbXB0eUxpbmVzQmV0d2VlbiA9PT0gMCkge1xuICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgbm9kZTogcHJldmlvdXNJbXBvcnQubm9kZSxcbiAgICAgICAgICBtZXNzYWdlOiAnVGhlcmUgc2hvdWxkIGJlIGF0IGxlYXN0IG9uZSBlbXB0eSBsaW5lIGJldHdlZW4gaW1wb3J0IGdyb3VwcycsXG4gICAgICAgICAgZml4OiBmaXhOZXdMaW5lQWZ0ZXJJbXBvcnQoY29udGV4dCwgcHJldmlvdXNJbXBvcnQsIGN1cnJlbnRJbXBvcnQpLFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW1wb3J0LnJhbmsgPT09IHByZXZpb3VzSW1wb3J0LnJhbmtcbiAgICAgICAgJiYgZW1wdHlMaW5lc0JldHdlZW4gPiAwXG4gICAgICAgICYmIG5ld2xpbmVzQmV0d2VlbkltcG9ydHMgIT09ICdhbHdheXMtYW5kLWluc2lkZS1ncm91cHMnKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlOiBwcmV2aW91c0ltcG9ydC5ub2RlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdUaGVyZSBzaG91bGQgYmUgbm8gZW1wdHkgbGluZSB3aXRoaW4gaW1wb3J0IGdyb3VwJyxcbiAgICAgICAgICBmaXg6IHJlbW92ZU5ld0xpbmVBZnRlckltcG9ydChjb250ZXh0LCBjdXJyZW50SW1wb3J0LCBwcmV2aW91c0ltcG9ydCksXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbXB0eUxpbmVzQmV0d2VlbiA+IDApIHtcbiAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgbm9kZTogcHJldmlvdXNJbXBvcnQubm9kZSxcbiAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBubyBlbXB0eSBsaW5lIGJldHdlZW4gaW1wb3J0IGdyb3VwcycsXG4gICAgICAgIGZpeDogcmVtb3ZlTmV3TGluZUFmdGVySW1wb3J0KGNvbnRleHQsIGN1cnJlbnRJbXBvcnQsIHByZXZpb3VzSW1wb3J0KSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJldmlvdXNJbXBvcnQgPSBjdXJyZW50SW1wb3J0XG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCdvcmRlcicpLFxuICAgIH0sXG5cbiAgICBmaXhhYmxlOiAnY29kZScsXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZ3JvdXBzOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ25ld2xpbmVzLWJldHdlZW4nOiB7XG4gICAgICAgICAgICBlbnVtOiBbXG4gICAgICAgICAgICAgICdpZ25vcmUnLFxuICAgICAgICAgICAgICAnYWx3YXlzJyxcbiAgICAgICAgICAgICAgJ2Fsd2F5cy1hbmQtaW5zaWRlLWdyb3VwcycsXG4gICAgICAgICAgICAgICduZXZlcicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIGltcG9ydE9yZGVyUnVsZSAoY29udGV4dCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250ZXh0Lm9wdGlvbnNbMF0gfHwge31cbiAgICBjb25zdCBuZXdsaW5lc0JldHdlZW5JbXBvcnRzID0gb3B0aW9uc1snbmV3bGluZXMtYmV0d2VlbiddIHx8ICdpZ25vcmUnXG4gICAgbGV0IHJhbmtzXG5cbiAgICB0cnkge1xuICAgICAgcmFua3MgPSBjb252ZXJ0R3JvdXBzVG9SYW5rcyhvcHRpb25zLmdyb3VwcyB8fCBkZWZhdWx0R3JvdXBzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBNYWxmb3JtZWQgY29uZmlndXJhdGlvblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgUHJvZ3JhbTogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KG5vZGUsIGVycm9yLm1lc3NhZ2UpXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBpbXBvcnRlZCA9IFtdXG4gICAgbGV0IGxldmVsID0gMFxuXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50TGV2ZWwoKSB7XG4gICAgICBsZXZlbCsrXG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudExldmVsKCkge1xuICAgICAgbGV2ZWwtLVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbjogZnVuY3Rpb24gaGFuZGxlSW1wb3J0cyhub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnNwZWNpZmllcnMubGVuZ3RoKSB7IC8vIElnbm9yaW5nIHVuYXNzaWduZWQgaW1wb3J0c1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBub2RlLnNvdXJjZS52YWx1ZVxuICAgICAgICAgIHJlZ2lzdGVyTm9kZShjb250ZXh0LCBub2RlLCBuYW1lLCAnaW1wb3J0JywgcmFua3MsIGltcG9ydGVkKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgQ2FsbEV4cHJlc3Npb246IGZ1bmN0aW9uIGhhbmRsZVJlcXVpcmVzKG5vZGUpIHtcbiAgICAgICAgaWYgKGxldmVsICE9PSAwIHx8ICFpc1N0YXRpY1JlcXVpcmUobm9kZSkgfHwgIWlzSW5WYXJpYWJsZURlY2xhcmF0b3Iobm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IG5vZGUuYXJndW1lbnRzWzBdLnZhbHVlXG4gICAgICAgIHJlZ2lzdGVyTm9kZShjb250ZXh0LCBub2RlLCBuYW1lLCAncmVxdWlyZScsIHJhbmtzLCBpbXBvcnRlZClcbiAgICAgIH0sXG4gICAgICAnUHJvZ3JhbTpleGl0JzogZnVuY3Rpb24gcmVwb3J0QW5kUmVzZXQoKSB7XG4gICAgICAgIG1ha2VPdXRPZk9yZGVyUmVwb3J0KGNvbnRleHQsIGltcG9ydGVkKVxuXG4gICAgICAgIGlmIChuZXdsaW5lc0JldHdlZW5JbXBvcnRzICE9PSAnaWdub3JlJykge1xuICAgICAgICAgIG1ha2VOZXdsaW5lc0JldHdlZW5SZXBvcnQoY29udGV4dCwgaW1wb3J0ZWQsIG5ld2xpbmVzQmV0d2VlbkltcG9ydHMpXG4gICAgICAgIH1cblxuICAgICAgICBpbXBvcnRlZCA9IFtdXG4gICAgICB9LFxuICAgICAgRnVuY3Rpb25EZWNsYXJhdGlvbjogaW5jcmVtZW50TGV2ZWwsXG4gICAgICBGdW5jdGlvbkV4cHJlc3Npb246IGluY3JlbWVudExldmVsLFxuICAgICAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb246IGluY3JlbWVudExldmVsLFxuICAgICAgQmxvY2tTdGF0ZW1lbnQ6IGluY3JlbWVudExldmVsLFxuICAgICAgT2JqZWN0RXhwcmVzc2lvbjogaW5jcmVtZW50TGV2ZWwsXG4gICAgICAnRnVuY3Rpb25EZWNsYXJhdGlvbjpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnRnVuY3Rpb25FeHByZXNzaW9uOmV4aXQnOiBkZWNyZW1lbnRMZXZlbCxcbiAgICAgICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnQmxvY2tTdGF0ZW1lbnQ6ZXhpdCc6IGRlY3JlbWVudExldmVsLFxuICAgICAgJ09iamVjdEV4cHJlc3Npb246ZXhpdCc6IGRlY3JlbWVudExldmVsLFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==