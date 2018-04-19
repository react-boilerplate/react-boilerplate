const exec = require('child_process').exec;
exec('npm -v', function (err, stdout, stderr) {
  if (err) throw err;
  if (parseFloat(stdout) < 3) {
    throw new Error('[ERROR: vBase React] You need npm version @>=3');
    process.exit(1);
  }
});
