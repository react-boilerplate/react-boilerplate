// Copy of sindre's leven, wrapped in dead code elimination for production
// https://github.com/sindresorhus/leven/blob/master/index.js

/* eslint-disable complexity, import/no-mutable-exports, no-multi-assign, no-nested-ternary, no-plusplus */
var leven = function leven() {
  return 0;
};

if (process.env.NODE_ENV !== 'production') {
  var arr = [];
  var charCodeCache = [];

  leven = function leven(a, b) {
    if (a === b) return 0;
    var aLen = a.length;
    var bLen = b.length;
    if (aLen === 0) return bLen;
    if (bLen === 0) return aLen;
    var bCharCode;
    var ret;
    var tmp;
    var tmp2;
    var i = 0;
    var j = 0;

    while (i < aLen) {
      charCodeCache[i] = a.charCodeAt(i);
      arr[i] = ++i;
    }

    while (j < bLen) {
      bCharCode = b.charCodeAt(j);
      tmp = j++;
      ret = j;

      for (i = 0; i < aLen; i++) {
        tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
        tmp = arr[i];
        ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
      }
    }

    return ret;
  };
}

export default leven;