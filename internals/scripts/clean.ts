import shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import replace from 'replace-in-file';
import fs from 'fs';
const packageJson = require('../../package.json');

interface Options {}

process.chdir(path.join(__dirname, '../..'));

export function cleanAndSetup(opts: Options = {}) {
  if (!shell.test('-e', 'internals/startingTemplate')) {
    shell.echo('The example app has already deleted.');
    shell.exit(1);
  }
  shell.echo(chalk.blue('Cleaning the example app...'));

  shell.rm('-rf', 'public/*');
  shell.rm('-rf', 'src/*');

  shell.cp('-r', 'internals/startingTemplate/public/*', 'public');
  shell.cp('-r', 'internals/startingTemplate/src/*', 'src');
  shell.cp('internals/startingTemplate/tsconfig.json', 'tsconfig.json');

  shell.rm('-rf', 'internals/startingTemplate');
  shell.rm('-rf', 'internals/scripts');

  shell.exec('npm run prettify -- src/*', { silent: true });

  cleanPackageJsonFile();

  shell.echo(
    chalk.green('Example app removed and setup completed. Happy Coding!!!'),
  );
}

function cleanPackageJsonFile() {
  delete packageJson['eslintConfig'];
  delete packageJson['dependencies']['replace-in-file'];
  delete packageJson['scripts']['cleanAndSetup'];

  fs.writeFileSync('./package.json', JSON.stringify(packageJson));
  shell.exec('npm run prettify -- package.json', { silent: true });

  try {
    // Remove explanation from husky to enable it
    replace.sync({
      files: 'package.json',
      from: /"husky\((.*?)\)"/g,
      to: '"husky"',
    });
  } catch (error) {
    console.error('Couldnt clean husky:', error);
  }
}

(function () {
  cleanAndSetup();
})();
