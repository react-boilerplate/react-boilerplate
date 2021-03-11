# go-script-bash v1.5.0

This is a minor update to add the `lib/prompt` and `lib/existence` modules that import functionality from the first draft of the [mbland/certbot-webroot-setup][cws] project.

[cws]: https://github.com/mbland/certbot-webroot-setup

## The `./go` script: a unified development environment interface

Source: https://github.com/mbland/go-script-bash

A `./go` script aims to abstract away many of the steps needed to develop (and sometimes deploy) a software project. It is a replacement for READMEs and other documents that may become out-of-date, and when maintained properly, should provide a cohesive and discoverable interface for common project tasks.

The `./go` script idea came from Pete Hodgson's blog posts [In Praise of the ./go Script: Part I][hodg-1] and [Part II][hodg-2].

[hodg-1]: https://www.thoughtworks.com/insights/blog/praise-go-script-part-i
[hodg-2]: https://www.thoughtworks.com/insights/blog/praise-go-script-part-ii

**Note:** The `./go` script concept is completely unrelated to the [Go programming language][golang], though [the Go language's `go` command][golang-cmd] encapsulates many common project functions in a similar fashion.

[golang]:     https://golang.org
[golang-cmd]: https://golang.org/cmd/go/

This software is made available as [Open Source software][oss-def] under the [ISC License][]. If you'd care to contribute to this project, be it code fixes, documentation updates, or new features, please read the `CONTRIBUTING.md` file.

[oss-def]:     https://opensource.org/osd-annotated
[isc license]: https://www.isc.org/downloads/software-support-policy/isc-license/

## What's new in this release

All of the issues and pull requests for this release are visible in the [v1.5.0 milestone][].

[v1.5.0 milestone]: https://github.com/mbland/go-script-bash/milestone/3?closed=1

### `lib/prompt` module

The new `lib/prompt` module contains several new user input prompt functions. Also, `@go.select_option` has been moved from `go-core.bash` to the `lib/prompt` module. The new `./go demo-core prompt` command demonstrates most of the new user prompt behavior.

### `lib/existence` module

The new `lib/existence` module contains convenience functions for checking whether a file or command exists and is accessible on the system, and provides standard error reporting if not.

### `@go.trim` added to `lib/strings`

`@go.trim` trims leading and trailing whitespace from strings, and supports the parsing of user input data in functions from the `lib/prompt` module.

### Bug fixes

Just one this time: `./go new --test` now outputs `load environment` correctly for top-level tests within `_GO_TEST_DIR` ([#171][], [#172][]).

[#171]: https://github.com/mbland/go-script-bash/pull/171
[#172]: https://github.com/mbland/go-script-bash/issues/172

## Changes since v1.4.0

You can see the details of every change by issuing one or more of the following commands after cloning: https://github.com/mbland/go-script-bash

<pre>
$ ./go changes v1.4.0 v1.5.0
$ gitk v1.4.0..HEAD
</pre>
