  const path = require('path');
  const pkg = require(path.resolve(process.cwd(), 'package.json'));
  module.exports = pkg.dllPlugin;
