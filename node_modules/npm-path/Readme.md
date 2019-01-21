# npm-path

### Get a PATH containing locally installed module executables.

`npm-path` will get you a PATH with all of the executables available to npm scripts, without booting up all of npm(1).

#### `npm-path` will set your PATH to include:

* All of the `node_modules/.bin` directories from the current directory, up through all of its parents. This allows you to invoke the executables for any installed modules. e.g. if `mocha` is installed a dependency of the current module, then `mocha` will be available on a `npm-path` generated `$PATH`.
* The directory containing the current `node` executable, so any scripts that invoke `node` will execute the same `node`.
* Current npm's `node-gyp` directory, so the `node-gyp` bundled with `npm` can be used.

## Usage

### Command-line

```bash
# Prints the augmented PATH to the console
> npm-path
# /usr/local/lib/node_modules/npm/bin/node-gyp-bin:.../node_modules/.bin:/.../usr/local/bin:/usr/local/sbin: ... etc
```

Calling `npm-path` from the commandline is the equivalent of executing an npm script with the body `echo $PATH`, but without all of the overhead of booting or depending on `npm`.

### Set PATH

This will set the augmented PATH for the current process environment, or an environment you supply.

```js
var npmPath = require('npm-path')
var PATH = npmPath.PATH // get platform independent PATH key

npmPath(function(err, $PATH) {
  
  // Note: current environment is modified!
  console.log(process.env[PATH] == $PATH) // true
  
  console.log($PATH)
  // /usr/local/lib/node_modules/npm/bin/node-gyp-bin:/.../.bin:/usr/local/bin: ...etc
  
})

// more explicit alternative syntax
npmPath.set(function(err, $PATH) {
  // ...
})
```

#### Synchronous Alternative

```js

//  supplying no callback will execute method synchronously
var $PATH = npmPath()
console.log($PATH)

// more explicit alternative syntax
$PATH = npmPath.setSync()
```

#### Optional Options

```js
var options = {
  env: process.env, // default.
  cwd: process.cwd() // default.
}

npmPath(options, function(err, $PATH) {
  // ...
})

npmPath.setSync(options)

  // ...

```


### Get PATH

This will get npm augmented PATH, but *does not modify the PATH in the environment*.
Takes the exact same options as `set`.

```js
npmPath.get(function(err, $PATH) {
  console.log($PATH)
  
  // Note: current environment is NOT modified!
  console.log(process.env[PATH] == $PATH) // false
})

// options is optional, takes same options as `npmPath.set`
npmPath.get(options, function(err, $PATH) {
  console.log($PATH)
})
```

#### Synchronous Alternative

```js
//  supplying no callback will execute method synchronously
var $PATH = npmPath.get()
console.log($PATH)
console.log(process.env[PATH] == $PATH) // false

// more explicit alternative syntax
$PATH = npmPath.getSync()

```

### Options

Both `set` and `get` take an optional options object, with optional `env` & `cwd` keys.

* Set `options.env` if you wish to use something other than `process.env` (the default)
* Set `options.cwd` if you wish to use something other than `process.cwd()` (the default)

There's also a `options.npm` property which you can set if you want `node-gyp` to be sourced from
an alternative `npm` installation.

### Get the PATH environment variable key

```js
// windows calls it's path "Path" usually, but this is not guaranteed.
npmPath.PATH // 'Path', probably

// rest of the world
npmPath.PATH // 'PATH'

```

#### Example Usage

```js
process.env[npmPath.PATH] // get path environment variable

// set path environment variable manually
process.env[npmPath.PATH] = npmPath.get()

// set path environment variable automatically
npmPath()
```

### Get the PATH separator

```js
// windows
npmPath.SEPARATOR // ';'

// rest of the world
npmPath.SEPARATOR // ':'
```

## Credit

Path lookup code adapted directly from npm.

Thanks to [Jordan Harband](https://github.com/ljharb) for his [hard work](https://github.com/timoxley/npm-path/pulls?q=is%3Apr+author%3Aljharb) adapting this to work on node 0.8.

# License

MIT
