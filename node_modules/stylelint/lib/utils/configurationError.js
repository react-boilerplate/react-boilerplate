/* @flow */
"use strict";

/**
 * Create configurationError from text and set CLI exit code
 */
module.exports = function(text /*: string */) /* Object */ {
  const err /*: Object*/ = new Error(text);
  err.code = 78;
  return err;
};
