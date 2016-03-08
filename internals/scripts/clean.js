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
mkdir('app/containers/NotFoundPage');
mkdir('app/containers/HomePage');
cp('internals/templates/appContainer.js', 'app/containers/App/index.js');
cp('internals/templates/notFoundPage.js', 'app/containers/NotFoundPage/index.js');
cp('internals/templates/homePage.js', 'app/containers/HomePage/index.js');

// Cleanup sagas folder
rm('-rf', 'app/sagas/*');
cp('internals/templates/sagas.js', 'app/sagas/index.js');

// Cleanup selectors folder, leave selectLocationSelection(.test).js
rm('-rf', 'app/selectors/*');
mkdir('-p', 'app/selectors/tests');
cp('internals/templates/selectLocationSelector.js',
  'app/selectors/selectLocationSelector.js');
cp('internals/templates/selectLocationSelector.test.js',
  'app/selectors/tests/selectLocationSelector.test.js');

// Delete utils folder
rm('-rf', 'app/utils');

// Replace app.js, index.html, rootReducer.js, routeReducer.js, routes.js and store.js
cp('internals/templates/app.js', 'app/app.js');
cp('internals/templates/index.html', 'app/index.html');
cp('internals/templates/rootReducer.js', 'app/rootReducer.js');
cp('internals/templates/routeReducer.js', 'app/routeReducer.js');
cp('internals/templates/routes.js', 'app/routes.js');
cp('internals/templates/store.js', 'app/store.js');


// Remove the templates folder
rm('-rf', 'internals/templates');

process.stdout.write(' ✓');

// Commit the changes
if (exec('git add . && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
