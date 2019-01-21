// Copy of sindre's leven, wrapped in dead code elimination for production
// https://github.com/sindresorhus/leven/blob/master/index.js
/* eslint-disable complexity, import/no-mutable-exports, no-multi-assign, no-nested-ternary, no-plusplus */

let leven = () => 0

if (process.env.NODE_ENV !== 'production') {
  const arr = []
  const charCodeCache = []

  leven = (a, b) => {
    if (a === b) return 0

    const aLen = a.length
    const bLen = b.length

    if (aLen === 0) return bLen
    if (bLen === 0) return aLen

    let bCharCode
    let ret
    let tmp
    let tmp2
    let i = 0
    let j = 0

    while (i < aLen) {
      charCodeCache[i] = a.charCodeAt(i)
      arr[i] = ++i
    }

    while (j < bLen) {
      bCharCode = b.charCodeAt(j)
      tmp = j++
      ret = j

      for (i = 0; i < aLen; i++) {
        tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1
        tmp = arr[i]
        ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2
      }
    }

    return ret
  }
}

export default leven
