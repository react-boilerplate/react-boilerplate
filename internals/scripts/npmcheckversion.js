/* eslint-disable */
if (!/^win/.test(process.platform)) {
  var exec = require('child_process').exec;
  exec("if [ $(npm -v | cut -c 1 | awk '{print $1\"<3\"}' | bc -l) != 0 ]; then echo \"[ERROR: React Boilerplate] You need npm version @>=3\n\"; fi;",
    function (error, stdout, stderr) {
      console.log(stdout);
      if (stdout !== '') {
        process.exit(1);
      }
    }
  );
}
