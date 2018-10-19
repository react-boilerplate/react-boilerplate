# Extracting components

One of the most compelling arguments for the self-contained components
architecture is the ability to easily reuse each component in other projects.
Since all the files kept in the same folder, this should be a breeze.

## When?

Often when working on a project, you find you've created a component that you
could use in other upcoming projects. You would like to extract that
component to its own git repository and npm package since keeping the version
histories separate makes a lot of sense.

You're not finished with the component, but would like to continue working on it
in parallel alongside your main project.

## How?

Since all the files are kept in the same place, its simply a matter of moving
the folder to its own directory, setting up the `package.json` for your new
package, and including it in your main project.

### Npm

Npm has a great feature that allows this kind of parallel development of
packages - `npm link` (read more [here](https://docs.npmjs.com/cli/link)). After
setting up your new package, you can link it into your main package like this:

1.  `cd` into your new package directory
2.  Run `npm link`
3.  `cd` into your main project directory
4.  Run `npm link <new-package>`

### Configuration

#### Specifying dependencies

Linking the packages won't save the package as a dependency in your main project
`package.json`, so you'll have to do that manually.

```json
"dependencies": {
  "<new-package>": "*",
}
```

## Gotchas

As well as this approach works for development, there are some things you need
to watch out for when building and publishing your new package or project.

### Publishing to npm registry

In your new package, you will most likely have a build task to transpile from
ES6 into ES5. You probably keep your ES6 code in a `src/` directory and your
transpiled code in a `lib/` directory.

In your `package.json`, you probably have something like this:

```json
  "main": "lib/index.js"
```

This is what you want when you publish to the registry, but during development
you probably want to change this to

```json
  "main": "src/index.js"
```

This will make sure that your main project always includes your most recent
code. You've just got to remember to change it back to `lib/` before publishing
to the npm registry.

You can, of course, go down the `lib/` path, but that requires you to
rebuild your package and transpile it to ES5 whenever you introduce a change,
which can be a pain.

### Building

Building the package can be a little bit tricky due to how webpack handles
symlinks. We've found it easiest to remove the symlink and replace it with the
actual files, either by copying the package to `node_modules` or running
`npm install` if you've published your package to the npm registry.
