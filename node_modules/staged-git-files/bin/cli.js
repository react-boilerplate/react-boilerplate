#!/usr/bin/env node

var sgf = require('../');

sgf(function(err, files) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  files.forEach(function(f) {
    console.log(f.status+' '+f.filename);
  });
});
