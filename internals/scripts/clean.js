/* eslint-disable */
require('shelljs/global');

/**
 * Adds mark check symbol
 */
function addCheckMark(callback) {
  process.stdout.write(' ✓');
  callback();
}

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

if (!test('-e', 'internals/templates')) {
  echo('The example is deleted already.');
  exit(1);
}

process.stdout.write('Cleanup started...');

// Cleanup components folder
rm('-rf', 'app/components/*');

// Cleanup containers folder
rm('-rf', 'app/containers/*');
mkdir('app/containers/App');
mkdir('app/components/NotFoundPage');
mkdir('app/components/HomePage');
cp('internals/templates/appContainer.js', 'app/containers/App/index.js');
cp('internals/templates/notFoundPage.js', 'app/components/NotFoundPage/index.js');
cp('internals/templates/homePage.js', 'app/components/HomePage/index.js');

// Copy selectors
mkdir('app/containers/App/tests');
cp('internals/templates/selectors.js',
  'app/containers/App/selectors.js');
cp('internals/templates/selectors.test.js',
  'app/containers/App/tests/selectors.test.js');

// Utils
rm('-rf', 'app/utils');
mkdir('app/utils');
mkdir('app/utils/tests');
cp('internals/templates/hooks.js',
  'app/utils/hooks.js');
cp('internals/templates/hooks.test.js',
  'app/utils/tests/hooks.test.js');

// Replace the files in the root app/ folder
cp('internals/templates/app.js', 'app/app.js');
cp('internals/templates/index.html', 'app/index.html');
cp('internals/templates/reducers.js', 'app/reducers.js');
cp('internals/templates/routes.js', 'app/routes.js');
cp('internals/templates/store.js', 'app/store.js');
cp('internals/templates/store.test.js', 'app/store.test.js');

// Remove the templates folder
rm('-rf', 'internals/templates');

process.stdout.write(' ✓');

// Commit the changes
if (exec('git add . --all && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
