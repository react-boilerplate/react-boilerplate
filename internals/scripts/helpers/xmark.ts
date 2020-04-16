import chalk from 'chalk';

/**
 * Adds mark cross symbol
 */
export function addXMark(callback: Function) {
  process.stdout.write(chalk.red(' ✘'));
  if (callback) callback();
}
