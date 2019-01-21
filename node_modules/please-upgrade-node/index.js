var semverCompare = require('semver-compare');

module.exports = function (pkg) {
  var requiredVersion = pkg.engines.node.replace(">=", "");
  var currentVersion = process.version.replace("v", "");
  if (semverCompare(currentVersion, requiredVersion) === -1) {
    console.error(
      "%s requires at least version %s of Node, please upgrade",
      pkg.name,
      requiredVersion
    );
    process.exit(1);
  }
};
