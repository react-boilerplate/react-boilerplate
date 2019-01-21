/* @flow */
"use strict";

const parse = require("url").parse;

/**
 * Get unit from value node
 *
 * Returns `null` if the unit is not found.
 */
module.exports = function(urlString /*: string*/) /*: ?string*/ {
  const url = parse(urlString);
  const protocol = url.protocol;
  if (protocol === null || typeof protocol === "undefined") {
    return null;
  }

  const scheme = protocol.slice(0, -1); // strip trailing `:`

  // The URL spec does not require a scheme to be followed by `//`, but checking
  // for it allows this rule to differentiate <scheme>:<hostname> urls from
  // <hostname>:<port> urls. `data:` scheme urls are an exception to this rule.
  const slashIndex = protocol.length;
  const expectedSlashes = urlString.slice(slashIndex, slashIndex + 2);
  const isSchemeLessUrl = expectedSlashes !== "//" && scheme !== "data";

  if (isSchemeLessUrl) {
    return null;
  }

  return scheme;
};
