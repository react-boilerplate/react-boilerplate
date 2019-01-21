"use strict";

const importLazy = require("import-lazy")(require);
const rules = require("./rules");

module.exports = function(ruleName) {
  if (rules.includes(ruleName)) {
    return importLazy(`./rules/${ruleName}`);
  } else {
    return false;
  }
};
