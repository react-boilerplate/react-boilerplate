# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.7.7
* Update Firefox ESR.

## 1.7.6
* Fix Android Chrome selection.

## 1.7.5
* Fix combining `not` query with country based statistics.
* Fix `--env` argument in CLI (by Tuure Savuoja).

## 1.7.4
* Speed up browser sorting (by Aarni Koskela).

## 1.7.3
* Fix config finding when directory was passed to `path` (by Aarni Koskela).

## 1.7.2
* Fix config finding algorithm (by Aarni Koskela).

## 1.7.1
* Fix unreleased browsers version detection.

## 1.7
* Add `--config` and `--env` arguments to CLI (by Jarek Rencz).

## 1.6
* Convert Electron version to Chrome (by Kilian Valkhof).
* Fix `0` version mistake in Can I Use data.

## 1.5.2
* Fix browser versions ordering (by Marco Massarotto).

## 1.5.1
* Fix error on `package.json` and `browserslist` in same directory.

## 1.5
* Add `package.json` support (by Stepan Kuzmin).
* Add environments support (by Maksim Semenov and openlibser).
* Add `browserslist-stats.json` file support (by Oleh Aloshkin).
* Add `config` option to CLI (by Evilebot Tnawi).
* Add JSDoc.
* Fix tests on Windows (by Anna Stoliar).
* Don’t set custom usage statistics globally.

## 1.4
* Add `defaults` keyword.

## 1.3.6
* Add `UCAndroid` alias to `and_uc` (by Evilebot Tnawi).

## 1.3.5
* Fix Opera Mini support. Use `op_mini all`.

## 1.3.4
* Add space-less `>1%` and `>.5%` syntax support (by Andreas Lind).

## 1.3.3
* Clean `0` versions in some country-based requests.

## 1.3.2
* Update Firefox ESR.

## 1.3.1
* Add Safari TP support.

## 1.3
* Add coverage for specific country (by Joshua Wise).

## 1.2
* Add `browserslist.coverage()` method.
* Add `--coverage` and `-c` argument to CLI.
* Add `-v` argument support to CLI.
* Better error handling in CLI.

## 1.1.3
* Fix jspm support (by Sean Anderson).

## 1.1.2
* Fix jspm support (by Sean Anderson).

## 1.1.1
* Fix space-less `>10%` and `>10% in my stats` queries.
* Normalize error messages.
* Remove development files from npm package.

## 1.1
* Added query against custom browser usage data (by Daniel Rey).

## 1.0.1
* Update Firefox ESR (by Rouven Weßling).

## 1.0
* Remove Opera 12.1 from default query.
* Add `not` keyword and exclude browsers by query.
* Add Microsoft Edge support (by Andrey Polischuk).
* Add CLI for debug and non-JS usage (by Luke Horvat).
* Use own class in Browserslist errors.

## 0.5
* Add version ranges `IE 6-9` (by Ben Briggs).

## 0.4
* Add `config` option and `BROWSERSLIST_CONFIG` environment variable support.
* Add symlink config support.

## 0.3.3
* Fix DynJS compatibility (by Nick Howes).

## 0.3.2
* Fix joined versions on versions query (by Vincent De Oliveira).

## 0.3.1
* Fix global variable leak (by Peter Müller).

## 0.3
* Takes queries from `BROWSERSLIST` environment variable.

## 0.2
* Return Can I Use joined versions as `ios_saf 7.0-7.1`.

## 0.1.3
* Better work with Can I Use joined versions like `ios_saf 7.0-7.1`.
* Browserslist now understands `ios_saf 7.0` or `ios_saf 7`.

## 0.1.2
* Do not create global `browserslist` var (by Maxime Thirouin).

## 0.1.1
* Sort browsers by name and version.

## 0.1
* Initial release.
