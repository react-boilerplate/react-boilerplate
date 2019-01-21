/* @flow */
"use strict";
module.exports = function(
  source /*: string, optionalblurChar ?: string*/
) /*: string*/ {
  const blurChar /*: string*/ =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

  return source.replace(/[#@{}]+/g, blurChar);
};
