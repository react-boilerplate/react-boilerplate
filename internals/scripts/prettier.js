const glob = require('glob');
const chalk = require('chalk');
const git = require('./helpers/git');
const prettierexcutor = require('./helpers/prettierexcutor');
const appConfig = require('../config');

const mode = process.argv[2] || 'check-changed';
const baseBranch = 'dev';
const shouldWrite =
  mode === 'write' || mode === 'write-changed' || mode === 'write-staged';
const changed = mode === 'check-changed' || mode === 'write-changed';
const staged = mode === 'check-staged' || mode === 'write-staged';

const prettierConfig = appConfig.prettier;

const listFilesForPrettier = (prettierPatterns, prettierIgnore, type) => {
  let filesForPrettierSet = null;

  let files = glob.sync(prettierPatterns, { ignore: prettierIgnore });

  if (type === 'staged') {
    filesForPrettierSet = git.stagedFiles();
  } else if (type === 'changed') {
    filesForPrettierSet = git.changedFiles(baseBranch);
  }

  if (filesForPrettierSet !== null && filesForPrettierSet.size > 0) {
    files = files.filter((f) => filesForPrettierSet.has(f));
  }
  return files;
};

const updateStagedFiles = (prettieredFileArr) => {
  git.updateStagedFiles(prettieredFileArr);
};

const prettierResult = [];
const timeBegain = new Date().getTime();

Object.keys(prettierConfig).forEach((key) => {
  const patterns = prettierConfig[key].patterns;
  const ignores = prettierConfig[key].ignores;

  let type = '';
  if (changed) {
    type = 'changed';
  } else if (staged) {
    type = 'staged';
  }

  const pattern =
    patterns.length > 1 ? `{${patterns.join(',')}}` : `${patterns.join(',')}`;
  const ignore =
    ignores.length > 1 ? `{${ignores.join(',')}}` : `${ignores.join(',')}`;

  process.stdout.write(
    chalk.grey(`Prettier file pattern: ${pattern}, ignore: ${ignore}.\n`)
  );

  const files = listFilesForPrettier(pattern, ignores, type);
  if (!files || !files.length) {
    process.stdout.write(
      chalk.red(`No matched files found for prettier, type: ${type}\n`)
    );

    return;
  }

  prettierResult.push(
    prettierexcutor(
      { options: prettierConfig[key].options, patterns: files },
      shouldWrite
    )
  );
});

let didError = false;
prettierResult.forEach((item) => {
  didError = didError || item.didError;

  if (shouldWrite && staged) {
    updateStagedFiles(item.prettieredFiles);
  }
});

process.stdout.write(
  chalk.yellow(
    `✓ Prettier completed in ${new Date().getTime() - timeBegain} ms.\n`
  )
);

if (didError) {
  process.exit(1);
}

process.exit(0);
