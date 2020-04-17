import chalk from 'chalk';

/**
 * Adds mark check symbol
 */
export function addCheckMark(callback?: Function) {
  process.stdout.write(chalk.green(' ✓'));
  if (callback) callback();
}
