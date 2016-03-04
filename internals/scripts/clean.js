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

// Cleanup sagas folder
rm('-rf', 'app/sagas/*');
cp('internals/templates/sagas.js', 'app/sagas/index.js');

// Cleanup selectors folder
rm('-rf', 'app/selectors/*');

// Delete utils folder
rm('-rf', 'app/utils');

// Replace app.js, index.html, rootReducer.js and routes.js
cp('internals/templates/app.js', 'app/app.js');
cp('internals/templates/index.html', 'app/index.html');
cp('internals/templates/rootReducer.js', 'app/rootReducer.js');
cp('internals/templates/routes.js', 'app/routes.js');

// Remove the templates folder
rm('-rf', 'internals/templates');

process.stdout.write(' ✓');

// Commit the changes
if (exec('git add . && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
