"use strict";

module.exports = parseArgsStringToArgv;
module.exports.parseArgsStringToArgv = parseArgsStringToArgv;

function parseArgsStringToArgv(value, env, file) {
  // ([^\s'"]+(['"])([^\2]*?)\2) Match `text"quotes text"`

  // [^\s'"] or Match if not a space ' or "

  // (['"])([^\4]*?)\4 or Match "quoted text" without quotes
  // `\2` and `\4` are a backreference to the quote style (' or ") captured
  var myRegexp = /([^\s'"]+(['"])([^\2]*?)\2)|[^\s'"]+|(['"])([^\4]*?)\4/gi;
  var myString = value;
  var myArray = [
  ];
  if (env) {
    myArray.push(env);
  }
  if (file) {
    myArray.push(file);
  }
  var match;
  do {
        // Each call to exec returns the next regex match as an array
    match = myRegexp.exec(myString);
    if (match !== null) {
      // Index 1 in the array is the captured group if it exists
      // Index 0 is the matched text, which we use if no captured group exists
      myArray.push(match[1] || match[5] || match[0]);
    }
  } while (match !== null);

  return myArray;
}
