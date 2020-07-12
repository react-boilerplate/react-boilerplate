const {
  engines: { node, npm },
} = require('../../../package.json');

module.exports = {
  requiredNodeVersion: node.match(/([0-9.]+)/g)[0],
  requiredNpmVersion: npm.match(/([0-9.]+)/g)[0],
};
