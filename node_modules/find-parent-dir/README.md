# find-parent-dir [![build status](https://secure.travis-ci.org/thlorenz/find-parent-dir.png)](http://travis-ci.org/thlorenz/find-parent-dir)

Finds the first parent directory that contains a given file or directory.

    npm install find-parent-dir

```js
// assuming this is called from a file in a subdirectory of /myprojects/foo which contains .git directory
var findParentDir = require('find-parent-dir');

findParentDir(__dirname, '.git', function (err, dir) {
  // has err if some file access error occurred
  console.log(dir); // => /myprojects/foo/
  
  // if parent dir wasn't found, dir is null
})

// Same using `sync` method
var dir;
try { 
  dir = findParentDir.sync(__dirname, '.git');
  console.log(dir); // => /myprojects/foo/
  // if parent dir wasn't found, dir is null
} catch(err) {
  console.error('error', err); 
}
```
