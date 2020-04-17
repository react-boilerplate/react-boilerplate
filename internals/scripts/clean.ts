import shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';

interface Options {}

export function cleanExampleApp(opts: Options = {}) {
  if (!shell.test('-e', 'internals/startingTemplate')) {
    shell.echo('The example app has already deleted.');
    shell.exit(1);
  }
  shell.echo(chalk.blue('Cleaning the example app...'));

  shell.rm('-rf', 'public/*');
  shell.rm('-rf', 'src/*');

  shell.cp('-r', 'internals/startingTemplate/public/*', 'public');
  shell.cp('-r', 'internals/startingTemplate/src/*', 'src');

  shell.rm('-rf', 'internals/startingTemplate');
  shell.rm('-rf', 'internals/scripts');

  shell.exec('npm run prettify -- src/*');

  shell.echo(chalk.green('Example App removed. Happy Coding!!!'));
}

(function () {
  process.chdir(path.join(__dirname, '../..'));
  cleanExampleApp();
})();
