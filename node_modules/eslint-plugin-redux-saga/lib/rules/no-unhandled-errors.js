/**
 * @fileoverview Rule to enforce error handling on sagas
 * @author Nicolas @BuraBure Fernandez
 */
/** eslint-disable semi */
"use strict"

var Effects = require("../utils/effects")

var nonCatchableEffects = ["fork", "takeEvery", "takeLatest", "throttle"]
var knowEffects = Effects.knowEffects().filter(function(item) {
  return nonCatchableEffects.indexOf(item) === -1
})

module.exports = {
  meta: {
    docs: {
      description: "enforce error handling on sagas",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },

  create: function(context) {
    var effectLocalNames = []
    var effectImportedNames = []
    var inTryStatementDepth = 0
    return {
      "ImportDeclaration": function(node) {
        if (Effects.isEffectImport(node.source.value)) {
          node.specifiers.forEach(function(specifier) {
            if (specifier.type === "ImportSpecifier" && knowEffects.indexOf(specifier.imported.name) !== -1) {
              effectLocalNames.push(specifier.local.name)
              effectImportedNames.push(specifier.imported.name)
            }
          })
        }
      },
      "TryStatement": function() {
        inTryStatementDepth += 1
      },
      "TryStatement:exit": function() {
        inTryStatementDepth -= 1
      },
      "CallExpression": function(node) {
        var callee = node.callee
        var localNameIndex = effectLocalNames.indexOf(callee.name)
        if (localNameIndex !== -1) {
          var importedName = effectImportedNames[localNameIndex]
          var effectName = callee.name
          if (importedName !== effectName) {
            effectName += " (" + importedName + ")"
          }
          if (inTryStatementDepth === 0) {
            context.report({
              node: node,
              message: "A Saga must handle its effects' errors (use try/catch)"
            })
          }
        }
      }
    }
  }
}
