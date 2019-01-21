"use strict"

var miscEffects = ["delay"]

function knowEffects() {
  var other = Object.keys(require("redux-saga")).filter(function(effect) {
    return miscEffects.includes(effect)
  })

  return Object.keys(require("redux-saga/lib/effects")).concat(other)
}

function isEffectImport(value) {
  return /^redux-saga(\/effects)?/.test(value)
}

module.exports = {
  isEffectImport: isEffectImport,
  knowEffects: knowEffects
}
