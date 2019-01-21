'use strict';

var findParentDir = require('..');
findParentDir(__dirname, '.git', function (err, dir) {
  if (err) return console.error(err);
  console.log(dir); 
});
