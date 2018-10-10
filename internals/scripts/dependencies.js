// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0);
}

require('shelljs/global');

const path = require('path');
const fs = require('fs');
const exists = fs.existsSync;
const writeFile = fs.writeFileSync;

const defaults = require('lodash/defaultsDeep');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const config = require('../config');
const dllConfig = defaults(pkg.dllPlugin, config.dllPlugin.defaults);
const outputPath = path.resolve(process.cwd(), dllConfig.path);
const dllManifestPath = path.resolve(outputPath, 'package.json');

/**
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdir('-p', outputPath);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      defaults({
        name: 'react-boilerplate-dlls',
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
      }),
      null,
      2,
    ),
    'utf8',
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec(
  'cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js --hide-modules',
);
