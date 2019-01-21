var fs = require('fs')
var path = require('path')
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')
var readBinary = require('parse-bmfont-binary')
var mime = require('mime')
var noop = function(){}
var isBinary = require('./lib/is-binary')

module.exports = function loadFont(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop
  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}

  var file = opt.uri || opt.url
  fs.readFile(file, opt, function(err, data) {
    if (err) return cb(err)

    var result, binary
    if (isBinary(data)) {
      if (typeof data === 'string')
        data = new Buffer(data, 'binary')
      binary = true
    } else
      data = data.toString().trim()

    try {
      if (binary)
        result = readBinary(data)
      else if (/json/.test(mime.lookup(file))
          || data.charAt(0) === '{')
        result = JSON.parse(data)
      else if (/xml/.test(mime.lookup(file))
          || data.charAt(0) === '<')
        result = parseXML(data)
      else
        result = parseASCII(data)
    } catch (e) {
      cb(e)
      cb = noop
    }
    cb(null, result)
  })
}
