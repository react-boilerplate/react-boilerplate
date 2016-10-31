/* eslint-disable */
var exec = require('child_process').exec;

require('./npmcheckversion');
process.stdout.write('Installing peerDependencies of eslint-config-airbnb...')
exec('npm info "eslint-config-airbnb" peerDependencies --json | command sed "s/[\{\},]//g ; s/: /@/g" | xargs npm install --save-dev "$PKG"',
  function (err, stdout, stderr) {
    if (err) throw err;
    process.stdout.write('\n\nDone! installing peerDependencies of eslint-config-airbnb.\n');
  }
);
