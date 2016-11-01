/* eslint-disable */
var exec = require('child_process').exec;

require('./npmcheckversion');
process.stdout.write('Installing peerDependencies of eslint-config-airbnb...\n')

exec('npm info "eslint-config-airbnb" peerDependencies --json',
  function (err, stdout, stderr) {
    if (err) throw err;
    
    // Alternate explicit one: replace(/[^a-z0-9-:^.,@!_/]+/g, '').replace(/:/g, '@').replace(/,/g, ' '); 
    // Old packages allow A-Z as well.
    const peerDepPackages = stdout.replace(/[{" }\n]/g, '').replace(/:/g, '@').replace(/,/g, ' ');
    const installCmd = `npm install --save-dev eslint-config-airbnb ${peerDepPackages}`;
    // TODO: If the build nodejs version goes below 4.0.0 comment the aboive line and uncomment below
    // Template string support : http://stackoverflow.com/questions/32844871/cant-use-template-strings-in-node-js
    // const installCmd = 'npm install --save-dev eslint-config-airbnb ' + peerDepPackages;

    process.stdout.write(peerDepPackages)
    exec(installCmd , function installPackages (err, stdout, stderr) {
    	if (err) throw err;
    	process.stdout.write('\n\nDone! installing peerDependencies of eslint-config-airbnb and itself.\n');
    });
    
  }
);
