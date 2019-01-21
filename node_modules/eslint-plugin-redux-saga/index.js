"use strict"

var rules = {
  "no-yield-in-race": require("./lib/rules/no-yield-in-race"),
  "yield-effects": require("./lib/rules/yield-effects"),
  "no-unhandled-errors": require("./lib/rules/no-unhandled-errors")
}

var allRules = Object.keys(rules).reduce(function(result, name) {
  result["redux-saga/" + name] = 2
  return result
}, {})

module.exports = {
  rules: rules,
  configs: {
    recommended: {
      rules: {
        "redux-saga/no-yield-in-race": 2,
        "redux-saga/yield-effects": 2,
        "redux-saga/no-unhandled-errors": 2
      }
    },
    all: {
      rules: allRules
    }
  }
}
