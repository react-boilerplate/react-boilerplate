const argv = require('./argv');

module.exports = argv.port || process.env.PORT || 3000;
