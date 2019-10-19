const chalk = require('chalk');
const { exec } = require('child_process');
const { compare } = require('compare-versions');

const addXMark = require('./helpers/xmark');
const {
  requiredNpmVersion,
} = require('./helpers/get-required-node-npm-versions');

exec('npm -v', (err, stdout) => {
  if (err) throw err;

  const currentNpmVersion = stdout.trim();

  if (compare(currentNpmVersion, requiredNpmVersion, '<')) {
    addXMark(() =>
      process.stderr.write(
        chalk.red(
          ` You need npm version v${requiredNpmVersion} or above but you are using v${currentNpmVersion}.\n\n`,
        ),
      ),
    );
    process.exit(1);
  }
});
