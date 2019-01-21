// test/mocha/node-suite.js

// This runs with mocha programmatically rather than from the command line.
// how-to-with-comments taken from https://github.com/itaylor/qunit-mocha-ui

//Load mocha
var Mocha = require("mocha");

//Tell mocha to use the interface.
var mocha = new Mocha({ui:"qunit", reporter:"spec"});

//Add your test files
mocha.addFile("./test/mocha/suite.js");

//Run your tests
mocha.run(function(failures){
  process.exit(failures);
});