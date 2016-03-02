/* eslint-disable */
require('shelljs/global');

if (!test('-e', 'internals/templates')) {
  echo('You have already ran the script.');
  exit(1);
}

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

// Cleanup selectors folder
rm('-rf', 'app/selectors/*');

// Replace app.js, index.html, rootReducer.js and routes.js
cp('internals/templates/app.js', 'app/app.js');
cp('internals/templates/index.html', 'app/index.html');
cp('internals/templates/rootReducer.js', 'app/rootReducer.js');
cp('internals/templates/routes.js', 'app/routes.js');

// Remove the templates folder
rm('-rf', 'internals/templates');

echo('Cleanup done. Happy Coding!!!');
