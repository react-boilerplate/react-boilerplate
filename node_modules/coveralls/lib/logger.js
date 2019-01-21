var index = require('../index');

module.exports = function(){
  return require('log-driver')({level : getLogLevel()});
};

function getLogLevel(){
  if (index.options.verbose || hasDebugEnvVariable()) {
    return 'debug';
  }
  return 'error';
}

function hasDebugEnvVariable(){
    return process.env.NODE_COVERALLS_DEBUG == 1;
}
