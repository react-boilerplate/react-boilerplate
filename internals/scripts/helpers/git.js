const execFileSync = require('child_process').execFileSync;
const chalk = require('chalk');

const exec = (command, args) => {
  process.stdout.write(chalk.grey(`> ${[command].concat(args).join(' ')}\n`));
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return execFileSync(command, args, options);
};

const execGitCmd = (args) =>
  exec('git', args)
    .trim()
    .toString()
    .split('\n');

const changedFiles = (baseBranch) => {
  const mergeBase = execGitCmd(['merge-base', 'HEAD', baseBranch]);
  return new Set([
    ...execGitCmd(['diff', '--name-only', '--diff-filter=dx', mergeBase]),
    ...execGitCmd(['ls-files', '--others', '--exclude-standard']),
  ]);
};

const stagedFiles = () =>
  new Set([
    ...execGitCmd([
      'diff',
      '--staged',
      '--diff-filter=dx',
      '--name-only',
      'HEAD',
    ]),
  ]);

const updateStagedFiles = (stagedFileArr) => {
  if (!stagedFileArr || stagedFileArr.length === 0) {
    return;
  }
  stagedFileArr.forEach((stagedFile) => {
    execGitCmd(['add', '-u', stagedFile]);
  });
};

module.exports.updateStagedFiles = updateStagedFiles;
module.exports.stagedFiles = stagedFiles;
module.exports.changedFiles = changedFiles;
