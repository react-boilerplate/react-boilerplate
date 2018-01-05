const glob = require('glob');
const git = require('./helpers/git');
const prettierexcutor = require('./helpers/prettierexcutor');
const appConfig = require('../config');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const mode = process.argv[2] || 'check-changed';
const shouldWrite =
  mode === 'write' || mode === 'write-changed' || mode === 'write-staged';
const allChanged = mode === 'check-changed' || mode === 'write-changed';
const allStaged = mode === 'check-staged' || mode === 'write-staged';

const prettierConfig = appConfig.prettier;

const listFilesForPrettier = (prettierPatterns, prettierIgnore, type) => {
  let filesForPrettierSet = null;
  const pattern =
    prettierPatterns.length > 1
      ? `{${prettierPatterns.join(',')}}`
      : `${prettierPatterns.join(',')}`;
  const files = glob.sync(pattern, { ignore: prettierIgnore });
  if (type === 'allstaged') {
    filesForPrettierSet = git.stagedFiles();
  } else if (type === 'allchanged') {
    filesForPrettierSet = git.changedFiles('dev');
  } else {
    return files;
  }

  return files.filter((f) => filesForPrettierSet.has(f));
};

const updateStagedFiles = (prettieredFileArr) => {
  git.updateStagedFiles(prettieredFileArr);
};

const prettierResult = [];
const timeBegain = new Date().getTime();
Object.keys(prettierConfig).forEach((key) => {
  const patterns = prettierConfig[key].patterns;
  const ignore = prettierConfig[key].ignore;

  let type = '';
  if (allChanged) {
    type = 'allchanged';
  } else if (allStaged) {
    type = 'allstaged';
  }
  const files = listFilesForPrettier(patterns, ignore, type);

  if (!files || !files.length) {
    process.stdout.write('There are no files for prettier.\n');
    return;
  }

  prettierResult.push(
    prettierexcutor(
      { options: prettierConfig[key].options, patterns: files, ignore: [] },
      shouldWrite
    )
  );
});

let didError = false;
prettierResult.forEach((item) => {
  didError = didError || item.didError;

  if (shouldWrite && allStaged) {
    updateStagedFiles(item.prettieredFiles);
  }
});

process.stdout.write(
  `Prettier completed in ${new Date().getTime() - timeBegain} ms.\n`
);
if (didError) {
  process.exit(1);
}

process.exit(0);
