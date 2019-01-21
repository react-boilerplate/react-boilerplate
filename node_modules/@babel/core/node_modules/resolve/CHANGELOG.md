## v1.8.1
- v1.8.1
- [Fix] resolution when `filename` option is passed
- [Tests] up to `node` `v10.4`
- [Tests] improve output of symlink tests that fail on Mac
- [Docs] clean up readme code

## v1.8.0
- v1.8.0
- Merge pull request #162 from ClearCanvas/master
- [Tests] up to `node` `v10.1`, `v9.11`, `v8.11`, `v6.14`, `4.9`
- [New] core: add `trace_events`, `v8/tools/arguments`
- [Fix] core: `_tls_legacy` is removed in node 10
- [New] add fs/promises to the list of core modules
- Fix eslint problems and update count of tests
- Utilize opts.filename when available to ID parent.
- Add failing test for parent filename in error msg.

## v1.7.1
- v1.7.1
- [Fix] revert proper but unintended breaking change in sync packageFilter
- v1.7.0
- [Tests] work around npm SSL issue
- [Tests] add node 8 and 9 to appveyor
- Merge pull request #146 from lbogdan/fix/resolve-sync
- [Tests] add more pathfilter tests
- [Docs] fix options formatting
- [Tests] add some tests for browser field
- Minor cleanup
- [Fix] support `opts.package` in non-relative lookups
- [Tests] work around npm SSL issue
- [Refactor] cache default isFile functions at module level
- [Docs] fix default “isFile” implementations
- [Refactor] use "basedir" instead of "y", because meaningful variable names
- [Tests] add some tests for a non-directory basedir
- v1.6.0
- [Dev Deps] update `eslint`
- [Tests] up to `v9.8`, `v8.10`, `v6.13`
- [New] add many missing core modules.
- [Dev Deps] update `eslint`, `tape`
- [Dev Deps] update `eslint`
- [Tests] up to `node` `v9.3`, `v8.8`, `v6.12`; pin included builds to LTS
- [New] add `async_hooks` core module, added in node 8
- Made loadAsFileSync() work the same as async loadAsFile().
- [Tests] add a failing test
- [Tests] restore node 0.6
- v1.5.0
- [Tests] on `node` `v8.8`
- [New] node v8.8+ supports `http2`
- [Fix] fix broken core tests; change core.json to be an object instead of an array; fix results
- [New] add `perf_hooks`, added in node v8.5
- [Tests] up to `node` `8.7`; use `nvm install-latest-npm` so new npm doesn’t break old node
- [Dev Deps] update `eslint`
- [Tests] up to `v8.4`; node 0.6 is failing due to travis-ci changes; allow it to fail for now.
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `tape`
- [Docs] update repo URL
- v1.4.0
- [New]: add `preserveSymlinks` option
- [Tests] fix 0.6 and linting
- Only apps should have lockfiles
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `tape`
- [Tests] up to `node` `v8.2`, `v7.10`, `v6.11`; npm 4.6+ breaks on node < 4
- [Fix] `sync`: fix when package.json main = ‘.’ or main = ‘./‘
- v1.3.3
- [Tests] up to `node` `v7.9`
- [Dev Deps] update `eslint`
- [Fix] error code MODULE_NOT_FOUND instead of ENOTDIR
- [Fix] correctly resolve dir paths when file with the same name exists
- [Tests] node 0.6 can’t support an npm that understands scoped packages
- [Tests] up to `node` `v7.7`, `v6.10`, `v4.8`; comment out OSX builds since they block linux builds.
- [Tests] [eslint] add `npm run lint`
- [Fix] `sync`: ensure that the path is a string, explicitly.
- [Tests] improve failure scenarios.
- v1.3.2
- Merge tag 'v1.2.1'
- Fix prepublish script.
- v1.2.1
- [Fix] for browserify compat, do not assume `process.versions.node` exists.
- [Fix] for browserify compat, do not assume `process.versions.node` exists.
- v1.3.1
- Revert "[New] add searched extensions to error messages"
- v1.3.0
- v1.2.0
- [Dev Deps] add `safe-publish-latest`
- code style: tabs → spaces
- [Fix] Create error outside process.nextTick
- [Fix] `resolve.sync` should re-throw non `ENOENT errors.
- readme: update API docs link for require.resolve()
- [New] add missing core modules, and determine them dynamically by node version.
- [Tests] test on every minor version of node.
- gitignore node_modules
- [Dev Deps] update `tape`
- [New] add searched extensions to error messages
- [Tests] add `appveyor`
- [Tests] [Refactor] refactor `node-modules-paths` and add tests.
- [Tests] ensure node_path test is independent of the `tap` module’s “main”
- [Tests] fix indentation, manual linting.
- [new] Add err.code = 'MODULE_NOT_FOUND'
- [Refactor] `async`: remove unnecessary slashes, since `path.join` adds them.
- [Tests] use `path` methods to make tests pass on both linux and Windows.
- [Fix] `node-modules-paths`: `opts` should be optional, and `opts.paths` should not be concatenated when omitted.
- [Tests] use `path.join` more often to normalize paths across OS’s.
- [Refactor] consistent spacing and quotes; run some basic linting manually.
- [Tests] make matrix more efficient

## v1.1.7
- 1.1.7
- Fix node_modules paths on Windows
- Merge pull request #83 from jameswomack/comment_typo
- (typo) Change againt to against

## v1.1.6
- 1.1.6
- add back pkg assertions to pick up the root package
- Use path.dirname to walk up looking for a package.json

## v1.1.5
- 1.1.5
- fix for the failing case
- another test, not quite the failing case

## v1.1.4
- 1.1.4
- finally seems to fully handle browser field from outside foo/bar resolution
- flatter nodeModules function

## v1.1.3
- path logic fix that seems to handle all the cases across this package and browserify
- nearly nearly working
- passes pathfilter test
- re-implemented pathfilter feature nearly passes the test
- move pathfilter files into their own dir
- move pathfilter test to its own file
- packageFilter should have been giving the pkgfile as an argument, fixed
- this fixes the directory precedence problem
- fix node_path test, was clearly wrong for some reason
- disable faulty basedir test except on windows for now
- tape everywhere
- another precedence test
- failing precedence test

## v1.1.2
- 1.1.2
- Merge pull request #67 from justinbmeyer/doc-changes
- adding pathFilter docs

## v1.1.0
- 1.1.0
- split before computing the pivot to prevent abcnode_modulesxyz from matching
- formatting
- attempts to find package.json data for deep references https://github.com/substack/node-resolve/issues/62
- Merge pull request #65 from jmm/document-cb-args
- Update docs re: input and cb args.
- Merge pull request #55 from philosoralphter/patch-1
- Update main README--change word order for clarity

## v1.0.0
- 1.0.0
- reformat package.json

## v0.7.4
- 0.7.4
- merged

## v0.7.3
- 0.7.3
- cb(err) for non-string args

## v0.7.2
- 0.7.2
- fixes for dotdot tests
- failing sync dotdot test
- failing dotdot test

## v0.7.1
- 0.7.1
- node-modules-paths: absolutize the `start` path

## v0.7.0
- 0.7.0
- array opts.moduleDirectory tests
- opts.moduleDirectory string tests
- formatting
- Support more than one directory in opts.moduleDirectory.
- Remove variable leftover from 325584a685

## v0.6.3
- 0.6.3
- Fixed the case when main is specified as "." or "./" causing the resolve to infinite loop as documented at https://github.com/substack/node-browserify/issues/732.

## v0.6.2
- 0.6.2
- faulty basedir does not always produce error properly in windows, because when the dirs are sliced down the final path has improper prefix, causing it to load relative to cwd
- passing tests for paths

## v0.6.1
- 0.6.1
- merged the context error patches

## v0.6.0
- 0.6.0
- fixes #25: resolve modules with the same name as node stdlib modules

## v0.5.1
- 0.5.1
- Fix prefix for windows azure
- Separate duplicated nodeModulesPaths function

## v0.5.0
- 0.5.0
- opts.modules => opts.moduleDirectory, documented
- modules folder name is configurable

## v0.4.3
- 0.4.3
- use getCaller() in both async and sync versions
- Fix default basedir calculation

## v0.4.2
- 0.4.2
- Fix for failing test case where pkg.main points to directory.
- Failing test case for pkg.main pointing to a directory.

## v0.4.1
- 0.4.1
- async resolve now falls back to 'index.js' if main field in package.json is incorrect
- adding tests to reproduce the problem - resolver test shows that async resolve fails when main field in package.json is incorrect - resolver_sync test shows that sync resolve finds index.js under same circumstance

## v0.4.0
- 0.4.0
- Document package option.
- Implement async support for returning package a module was resolved from.

## v0.3.1
- use isFIFO() instead to more narrowly target <() usage
- check !isDirectory() instead of isFile() so that <(echo "beep") inline bash fds work

## v0.3.0
- 0.3.0
- synchronous example
- async example
- updated the docs for async
- fix for async parameterized readFile
- failing translated async test with parameterized readFile on account of 3-arg form
- sync parity with async tests
- first async test passes
- adapted async test
- stub out async
- factor out .sync into lib/sync.js
- factor out core into lib/
- drop 0.4, add 0.8 in travis

## v0.2.8
- add the domain module to .core

## v0.2.7
- 0.2.7
- Merge branch 'node-resolve' of git://github.com/rektide/node-module-resolver into rektide-node-resolve
- Prioritize parent tree in nodeModulesPathsSync before fallback options.paths/ NODE_PATH equivalent, in accordance with http://nodejs.org/docs/latest/api/all.html#all_loading_from_the_global_folders

## v0.2.6
- 0.2.6
- Merge branch 'master' of git://github.com/dodo/node-resolve into dodo-master
- pkg.main may be a directory

## v0.2.5
- 0.2.5
- Merge branch 'master' of git://github.com/dominictarr/node-resolve into dominictarr-master
- pass dir to packageFilter

## v0.2.4
- 0.2.4
- resolve '../baz' correct

## v0.2.3
- existsSync
- license file

## v0.2.2
- bump for windows fixes
- fix indentation
- Updated to work with windows, tested on Windows 7 64-bit and OS X 10.6

## v0.2.1
- using travis
- now using tap
- split on multiple slashes
- fix splitting of paths to support windows as well

## v0.2.0
- updated the core list for 0.6.11

## v0.1.3
- bump
- Added readline to core modules

## v0.1.2
- bump
- Add opts.paths to list of node_modules directories

## v0.1.1
- bump for windows paths
- Added support for Windows-style paths.

## v0.1.0
- doc updates and a minor bump for custom isFile and readFileSync params
- passing mock test with package.json
- passing mock test
- isFile and readFileSync as parameters

## v0.0.4
- bump for packageFilter and a note in the docs
- new packageFilter option

## v0.0.3
- bump and a note in the docs for extensions
- custom extensions now work
- failing test for extensions
- passing normalize test

## v0.0.2
- don't stop on the first node_modules since that's going away in node anyhow, all tests pass again
- failing biz test for going up and down the path directory

## v0.0.1
- new resolve.{core,isCore} with tests and documentation, bump to 0.0.1
- trailing comma in the package.json
- passing baz test to check package.json resolution
- passing the bar test after taking out the dirname() around y
- opts.path => opts.basedir, more descriptive I think
- failing bar test
- a path.resolve() fixed the relative loads
- failing foo test
- a package.json all up in this
- implementation seems to work but no tests yet
