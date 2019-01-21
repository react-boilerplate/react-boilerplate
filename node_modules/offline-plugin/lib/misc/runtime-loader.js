'use strict';

var ejs = require('ejs');
var path = require('path');
var fs = require('fs');

module.exports = function () {};
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var params = JSON.parse(this.query.slice(1));
  var templatePath = path.join(__dirname, '../../tpls/runtime-template.js');

  this.addDependency(templatePath);

  fs.readFile(templatePath, 'utf-8', function (err, template) {
    if (err) return callback(err);

    template = ejs.render(template, params);
    callback(null, template);
  });
};