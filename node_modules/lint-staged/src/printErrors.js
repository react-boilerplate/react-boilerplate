'use strict'

// istanbul ignore next
// Work-around for duplicated error logs, see #142
const errMsg = err => (err.privateMsg != null ? err.privateMsg : err.message)

module.exports = function printErrors(errorInstance) {
  if (Array.isArray(errorInstance.errors)) {
    errorInstance.errors.forEach(lintError => {
      console.error(errMsg(lintError))
    })
  } else {
    console.error(errMsg(errorInstance))
  }
}
