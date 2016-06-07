/*eslint-disable*/

require('shelljs/global');

rm('-rf', 'app/dlls')
mkdir('app/dlls')

echo('Building the Webpack DLL...')
exec('BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js')
