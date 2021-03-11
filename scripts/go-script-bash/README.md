## The `./go` script: a unified development environment interface

Source: https://github.com/mbland/go-script-bash

[![Latest release](https://img.shields.io/github/release/mbland/go-script-bash.svg)](https://github.com/mbland/go-script-bash/releases/latest)
[![License](https://img.shields.io/github/license/mbland/go-script-bash.svg)](https://github.com/mbland/go-script-bash/blob/master/LICENSE.md)
[![Continuous integration status](https://img.shields.io/travis/mbland/go-script-bash/master.svg)](https://travis-ci.org/mbland/go-script-bash)
[![Coverage Status](https://img.shields.io/coveralls/mbland/go-script-bash/master.svg)](https://coveralls.io/github/mbland/go-script-bash?branch=master)

A `./go` script aims to abstract away many of the steps needed to develop (and
sometimes deploy) a software project. It is a replacement for READMEs and other
documents that may become out-of-date, and when maintained properly, should
provide a cohesive and discoverable interface for common project tasks.

For a five-minute overview of the framework, see [Mike Bland's go-script-bash
lightning talk at Surge 2016][go-surge].

[go-surge]: https://youtu.be/WX1vrLV9mFE?t=39m48s

### Table of contents

- [Introduction](#introduction)
- [Environment setup](#environment-setup)
- [How to use this framework](#how-to-use-this-framework)
- [Feedback and contributions](#feedback-and-contributions)
- [Installing Bash](#installing-bash)
- [Open Source](#open-source-license)
- [Prior work](#prior-work)

### Introduction
#### What's a `./go` script?

The `./go` script idea came from Pete Hodgson's blog posts [In Praise of the
./go Script: Part I][hodg-1] and [Part II][hodg-2]. To paraphrase Pete's
original idea, rather than dump project setup, development, testing, and
installation/deployment commands into a `README` that tends to get stale, or
rely on oral tradition to transmit project maintenance knowledge, automate these
tasks by encapsulating them all inside a single script in the root directory of
your project source tree, conventionally named "`go`". Then the interface to
these tasks becomes something like `./go setup`, `./go test`, and `./go deploy`.
Not only would this script save time for people already familiar with the
project, but it smooths the learning curve, prevents common mistakes, and lowers
friction for new contributors. This is as desirable a state for Open Source
projects as it is for internal ones.

[hodg-1]: https://www.thoughtworks.com/insights/blog/praise-go-script-part-i
[hodg-2]: https://www.thoughtworks.com/insights/blog/praise-go-script-part-ii

#### Is this related to the Go programming language?

No. The `./go` script convention in general and this framework in particular are
completely unrelated to the [Go programming language][golang]. In fact, the
actual `./go` script can be named anything. However, the [`go` command from the
Go language distribution][golang-cmd] encapsulates many common project functions
in a similar fashion.

[golang]:     https://golang.org
[golang-cmd]: https://golang.org/cmd/go/

#### Why write a framework?

Of course, the danger is that this `./go` script may become as unwieldy as the
`README` it's intended to replace, depending on the project's complexity. Even
if it's heavily used and kept up-to-date, maintenance may become an intensive,
frightening chore, especially if not covered by automated tests. Knowing what
the script does, why it does it, and how to run it may become more and more
challenging—resulting in the same friction, confusion, and fear the script was
trying to avoid.

The `./go` script framework makes it easy to provide a uniform and easy-to-use
project maintenance interface that fits your project perfectly regardless of the
mix of tools and languages, then it gets out of the way as fast as possible. The
hope is that by [making the right thing the easy thing][right-thing-easy],
scripts using the framework will evolve and stay healthy along with the rest of
your project sources, which makes everyone working with the code less frustrated
and more productive all-around.

[right-thing-easy]: https://mike-bland.com/2016/06/16/making-the-right-thing-the-easy-thing.html

This framework accomplishes this by:

* encouraging modular, composable `./go` commands implemented as individual
  scripts—in the language of your choice!
* providing a set of builtin utility commands and shell command aliases—see
  `./go help builtins` and `./go help aliases`
* supporting automatic tab-completion of commands and arguments through a
  lightweight API—see `./go help env` and `./go help complete`
* implementing a quick, flexible, robust, and convenient documentation
  system—document your script in the header, and help shows up automatically as
`./go help my-command`! See `./go help help`.

Plus, its own tests serve as a model for testing command scripts of all shapes
and sizes.

The inspiration for this model (and initial implementation hints) came from [Sam
Stephenson's `rbenv` Ruby version manager][rbenv].

[rbenv]: https://github.com/rbenv/rbenv

#### Why Bash?

[It's the ultimate backstage pass!][backstage] It's the default shell for most
mainstream UNIX-based operating systems, easily installed on other UNIX-based
operating systems, and is readily available even on Windows.

[backstage]: http://www.imdb.com/title/tt0118971/quotes?item=qt1467557

#### Will this work on Windows?

Yes. It is an explicit goal to make it as easy to use the framework on Windows
as possible. Since [Git for Windows][git-win] in particular ships with Bash as
part of its environment, and Bash is available within Windows 10 as part of the
[Windows Subsystem for Linux][wsl] (Ubuntu on Windows), it's more likely than
not that Bash is already available on a Windows developer's system. It's also
available from the [MSYS2][] and [Cygwin][] environments.

[git-win]: https://git-scm.com/downloads
[wsl]:     https://msdn.microsoft.com/en-us/commandline/wsl/about
[msys2]:   https://msys2.github.io/
[cygwin]:  https://www.cygwin.com/

#### Why not use tool X instead?

Of course there are many common tools that may be used for managing project
tasks. For example: [Make][], [Rake][], [npm][], [Gulp][], [Grunt][], [Bazel][],
and the Go programming language's `go` tool.  There are certainly more powerful
scripting languages: [Perl][], [Python][], [Ruby][], and even [Node.js][nodejs]
is a possibility. There are even more powerful shells, such as the
[Z-Shell][zsh] and the [fish shell][fish].

[make]:   https://www.gnu.org/software/make/manual/
[rake]:   http://rake.rubyforge.org/
[npm]:    https://docs.npmjs.com/
[gulp]:   http://gulpjs.com/
[grunt]:  http://gruntjs.com
[bazel]:  https://www.bazel.io/
[perl]:   https://www.perl.org/
[python]: https://www.python.org/
[ruby]:   https://www.ruby-lang.org/en/
[nodejs]: https://nodejs.org/
[zsh]:    https://www.zsh.org/
[fish]:   https://fishshell.com/

The `./go` script framework isn't intended to replace all those other tools and
languages, but to make it easier to use each of them for what they're good for.
It makes it easier to write good, testable, maintainable, and extensible shell
scripts so you don't have to push any of those other tools beyond their natural
limits.

Bash scripting is _really good_ for automating a lot of traditional command line
tasks, and it can be pretty awkward to achieve the same effect using other
tools—especially if your project uses a mix of languages, where using a tool
common to one language environment to automate tasks in another can get weird.
(Which is part of the reason why there are so many build tools tailored to
different languages in the first place, to say nothing of the different
languages themselves.)

If you want to incorporate different scripting languages or shells into your
project maintenance, this framework makes it easy to do so. However, by starting
with Bash, you can implement a `./go init` command to check that these other
languages or shells are installed and either install them automatically or
prompt the user on how to do so. Since Bash is (almost certainly) already
present, users can run your `./go` script right away and get the setup or hints
that they need, rather than wading through system requirements and documentation
before being able to do anything.

Even if `./go init` tells the user "go to this website and install this other
thing", that's still an immediate, tactile experience that triggers a reward
response and invites further exploration. (Think of [Zork][] and the first
["open mailbox"][zork-open] command.)

[zork]:      https://en.wikipedia.org/wiki/Zork
[zork-open]: http://steel.lcc.gatech.edu/~marleigh/zork/transcript.html

#### Where can I run it?

The real question is: Where _can't_ you run it?

The core framework is written 100% in [Bash][bash-wikipedia] and it's been
tested under Bash 3.2, 4.2, 4.3, and 4.4 across OS X, Ubuntu Linux, Arch Linux,
Alpine Linux, FreeBSD 9.3, FreeBSD 10.3, and Windows 10 (using all the
environments described in the "Will this work on Windows?" section above).

[bash-wikipedia]: https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29

#### Can I use it to write standalone programs that aren't project scripts?

Actually, yes. See the [Standalone mode](#standalone-mode) section below.

Also see the following question...

#### Can I have more than one ./go script in the same project source tree?

Yes. You can share one copy of the go-bash-framework sources, and even have
common code in the `lib/` directory, but set each script to use its own command
scripts dir.

This may be especially useful if you're writing a [standalone](#standalone-mode)
program, in which one script provides the actual program interface, and the
other provides the development-only interface.

#### How is it tested?

The project's own `./go test` command does it all. Combined with automatic
tab-completion enabled by `./go env` and pattern-matching via `./go glob`, the
`./go test` command provides a convenient means of selecting subsets of test
cases while focusing on a particular piece of behavior. (See `./go help test`.)

The tests are written using [mbland/bats, an optimized version of Sam
Stephenson's Bash Automated Testing System (BATS)][mbland/bats]. Code coverage
comes from [Simon Kagstrom's `kcov` code coverage tool][kcov], which not only
provides code coverage for Bash scripts (!!!) but can push the results to
[Coveralls][cover-gos]!

[mbland/bats]: https://github.com/mbland/bats
[kcov]:        https://github.com/SimonKagstrom/kcov
[cover-gos]:   https://coveralls.io/github/mbland/go-script-bash

### Environment setup

To run a `./go` script that uses this module, or to add it to your own project,
you must have [Bash][bash-wikipedia] version 3.2 or greater installed on your
system. Run `bash --version` to make sure Bash is in your `PATH` and is a
compatible version. You should see output like this:

```
GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin15)
Copyright (C) 2007 Free Software Foundation, Inc.
```

If you do not see this, follow the instructions in the [Installing
Bash](#installing-bash) section later in this document.

__Note: While Bash is required to run this framework, your individual command
scripts can be in any other interpreted language installed on the host system.__

### How to use this framework

First you'll need a copy of this framework available in your project sources.
The most expedient way to bootstrap your program is to use the [`go-template`
file][go-template] as a starting point (replacing [curl][] with [wget][],
[fetch][], or whichever tool you prefer):

[go-template]: https://github.com/mbland/go-script-bash/blob/master/go-template
[curl]:        https://curl.haxx.se/
[wget]:        https://www.gnu.org/software/wget/
[fetch]:       https://www.freebsd.org/cgi/man.cgi?fetch(1)

```bash
$ curl https://raw.githubusercontent.com/mbland/go-script-bash/master/go-template >./go
$ chmod ugo+rx ./go
```

You may rename this file whatever you wish (i.e. it doesn't have to be named
`./go`), update its documentation and variables to fit your project, and check
it into your project repository. See the `go-template` comments for details.

If you'd prefer to download a copy of the framework and check it into your
sources, versioned archives are available from the [go-script-bash Releases
page][go-rel]. The archives for the current release are:

[go-rel]: https://github.com/mbland/go-script-bash/releases

- https://github.com/mbland/go-script-bash/archive/v1.5.0.tar.gz
- https://github.com/mbland/go-script-bash/archive/v1.5.0.zip

You can also add this repository to your project as a [Git submodule][git-sub]:

[git-sub]: (https://git-scm.com/book/en/v2/Git-Tools-Submodules)

```bash
$ git submodule add https://github.com/mbland/go-script-bash <target-dir>
$ git commit -m 'Add go-script-bash framework'
$ git submodule update --init
```

where `<target-dir>` is any point inside your project directory structure that
you prefer.

If you're not using `go-template`, create a bash script in the root directory of
your project to act as the main `./go` script. This script need not be named
`go`, but it must contain the following lines, with `@go "$@"` as the last line
of the script:

```bash
. "${0%/*}/go-core.bash" "scripts"
@go "$@"
```

where:
- `${0%/*}` produces the path to the project's root directory based on the path
  to the `./go` script
- `${0%/*}/go-core.bash` produces the path to the framework's `go-core.bash`
  file within your project's copy of the framework (adjusted to reflect where
  your copy of `go-script-bash` actually resides)
- `scripts` is the path to the directory holding your project's command scripts
  relative to the project root (it can be any name you like)

#### Directory structure

The `./go` script changes to the project root directory before executing any
commands. That means every command script you write will also run within the
project root directory, so every relative file and directory path will be
interpreted as relative to the project root.

Your project structure may look something like this:

```
project-root/
  go - main ./go script
  lib/ - publicly-exported modules (if the project is a go-bash-script plugin)
  scripts/ (or bin/) - project (or plugin) ./go command scripts
    lib/ - project-specific Bash library modules (see "Modules" section)
    plugins/ - (optional) third-party command scripts (see `./go help plugins`)
      .../
        bin/ - plugin ./go command scripts
        lib/ - publicly-exported Bash library modules (see "Modules" section)
    go-script-bash/
      go-core.bash - top-level functions
      lib/ - publicly-exported Bash library modules (see "Modules" section)
      libexec/ - builtin ./go command scripts
```

This structure implies that the first line of your `./go` script will be:
```bash
. "${0%/*}/scripts/go-script-bash/go-core.bash" "scripts"
```

#### Variables and plugin scoping

The following variables are set by the framework based on the above example
(note there are many other variables set in `go-core.bash` and elsewhere; see
`./go help vars`):

* `_GO_ROOTDIR`: `/absolute/path/to/project-root`
* `_GO_CORE_DIR`: `/absolute/path/to/project-root/scripts/go-script-bash`
* `_GO_SCRIPTS_DIR`: `$_GO_ROOTDIR/scripts`
* `_GO_PLUGINS_DIR`: `/absolute/path/to/project-root/plugins`

For plugins, `_GO_ROOTDIR` and `_GO_SCRIPTS_DIR` will be scoped to the root
directory of the plugin installation; the other variables will remain the same.
See `./go help plugins` for more details.

#### Command scripts

Each command script for your project residing in the `scripts` directory must
adhere to the following conditions:

- No filename extensions.
- It must be executable, with a `#!` (a.k.a. "she-bang") line. The interpreter
  name will be parsed from this line, whether it is an absolute path
  (`#!/bin/bash`) or is of the form: `#!/usr/bin/env bash`.
- If `scripts/parent` is a command script, subcommand scripts must reside within
  a directory named: `scripts/parent.d`.

__Scripts can use any interpreted language available on the host system; they
need not be written in Bash.__ Bash scripts will be sourced (i.e. imported into
the same process running the `./go` script itself). Other languages will use the
`PATH` environment variable to discover the interpreter for the script.

See `./go help commands` for details on the algorithm used to discover command
scripts for execution.

#### Command summaries and help text

The builtin `./go help` command will parse command script summaries and help
text from the header comment block of each script. Run `./go help help` to learn
more about the formatting rules.

#### Tab completion

By evaluating the value of `./go env -` within your shell, all builtin commands
and aliases provide automatic tab completion of file, directory, and other
arguments. If an implementation isn't available for your shell (within
`lib/internal/env/`), it's very easy to add one. Feel free to open an issue or,
better yet, [send a pull request](#feedback-and-contributions)!

To learn the API for adding tab completion to your own command scripts, run
`./go help complete`. You can also learn by reading the scripts for the builtin
commands.

#### Standalone mode

If you wish to use the framework to write a standalone program, rather than a
project-specific development script, set `_GO_STANDALONE` in your top-level
script to prevent alias commands, builtin commands, and plugin commands from
showing up in `help` output or from being offered as tab completions. (`help`
will still appear as a top-level tab completion.) All of these commands will
still be available, but users won't be presented with them directly.

`_GO_STANDALONE` also prevents the script from setting `PWD` to `_GO_ROOTDIR`,
enabling the script to process relative file path arguments anywhere in the file
system. Note that then you'll have to add `_GO_ROOTDIR` manually to any
`_GO_ROOTDIR`-relative paths in your own scripts.

#### Including common code

There are a number of possible methods available for sharing code between
command scripts. Some possibilities are:

- The generally preferred method is to use `. $_GO_USE_MODULES` to source
  optional library modules; see the [Modules](#modules) section.
- Include common code and constants in the top-level `./go` script, after
  sourcing `go-core.bash` and before calling `@go`.
- Source a file in the same directory that isn't executable.
- Source a file in a child directory that may not have a name of the form:
  `parent.d`.
- Source files from a dedicated directory relative to `$_GO_ROOTDIR`, e.g.:
  ```bash
  . "path/to/lib/common.sh"
  ```
- Subcommand scripts can source the parent command via:
  ```bash
  . "${BASH_SOURCE[0]%.d/*}"
  ```

#### Command script API

Any script in any language can invoke other command scripts by running
`./go <command> [args..]`. In Bash, however, you can also invoke the `@go`
function directly as `@go <command> [args...]`.

The `@go`, `@go.printf`, and `@go.print_stack_trace` functions are available to
command scripts written in Bash, as Bash command scripts are sourced rather than
run using another language interpreter.

A number of global variables defined and documented in `go-core.bash`, all
starting with the prefix `_GO_`, are exported as environment variables and
available to scripts in all languages (along with the global `COLUMNS`
environment variable). Run `./go vars` to see them all along with their values,
and run `./go help vars` for more details.

#### Plugins

You can add third-party plugin command scripts to the `plugins` subdirectory of
your scripts directory. Run `./go help plugins` for more information.

#### Modules

You can import optional Bash library code from the core framework, third-party
plugins, or your own project's scripts directory by sourcing the
`_GO_USE_MODULES` script. For example, to import the core logging utilities:

```bash
. "$_GO_USE_MODULES" 'log'
```

Run `./go help modules` and `./go modules --help` for more information.

#### Logging

The core library `log` module provides functions for standard logging
facilities. For example:

```bash
@go.log INFO Hello, World!
@go.log ERROR Goodbye, World!
```

For more information, run `./go modules --help log`.

#### Bats test assertions and helpers

The assertions and helpers from the test suite have been extracted into the
`lib/bats` libraries. While these are not modules you can import with
`_GO_USE_MODULES`, they are completely independent of the rest of the core
framework and you may source them in your own Bats tests. (Whether or not these
will ever become a separate library remains an open question.)

Variables, helper functions, and assertions for testing features based on the
core framework are available in the `lib/testing` directory. The `lib/bats-main`
library makes it easy to write a `./go test` command script with the same
interface and features as the core framework's `./go test` command.

Read the comments from each file for more information.

#### `kcov-ubuntu` module for test coverage on Linux

The `kcov-ubuntu` module provides the `run_kcov` function that will download and
compile [kcov][], then run `kcov` with the original `./go` command line
arguments to collect test coverage. Only available on Ubuntu Linux for now,
hence the name. Run `./go modules --help kcov-ubuntu` for more information and
see `scripts/test` for an example of how it may be used.

### Feedback and contributions

Feel free to [comment on or file a new GitHub issue][issues] or otherwise ping
[@mbland][] with any questions or comments you may have, especially if the
current documentation hasn't addressed your needs.

[issues]: https://github.com/mbland/go-script-bash/issues
[@mbland]: https://github.com/mbland

If you'd care to contribute to this project, be it code fixes, documentation
updates, or new features, please read the [CONTRIBUTING](CONTRIBUTING.md) file.

### Installing Bash

If you're using a flavor of UNIX (e.g. Linux, OS X), you likely already have a
suitable version of Bash already installed and available. If not, use your
system's package manager to install it.

On Windows, the [Git for Windows][git-win], [MSYS2][] and [Cygwin][]
distributions all ship with a version of Bash. On Windows 10, you can also use
the [Windows Subsystem for Linux][wsl].

#### Updating your `PATH` environment variable

Once you've installed `bash`, your `PATH` environment variable must include
its installation directory. On UNIX, you can add it in the appropriate
initialization file for your shell; look up your shell documentation for details.

On Windows, in most cases, you'll use the terminal program that ships with Git
for Windows, MSYS2, or Cygwin, or you'll invoke the Windows System for Linux
environment by entering `bash` in a built-in Command Prompt window. These
terminals automatically set `PATH` so that Bash is available.

However, if you want to use the Git, MSYS2, or Cygwin `bash` from the built-in
Command Prompt window, open the **Start** menu and navigate to **Windows
System > Control Panel > System and Security > System > Advanced system
settings**. Click the **Environment Variables...** button, select `PATH`, and
add the directory containing your `bash` installation. The likely paths for each
environment are:

- Git: `C:\Program Files\Git\usr\bin\`
- MSYS2: `C:\msys64\usr\bin\`
- Cygwin: `C:\cygwin64\bin\`

To use one of these paths temporarily within a Command Prompt window, you can
run the following:

```
C:\path\to\my\go-script-bash> set PATH=C:\Program Files\Git\usr\bin\;%PATH%

# To verify:
C:\path\to\my\go-script-bash> echo %PATH%
C:\path\to\my\go-script-bash> where bash

# To run the tests:
C:\path\to\my\go-script-bash> bash ./go test
```

It should not be necessary to set Bash as your default shell. On Windows,
however, you may wish to execute the `bash` command to run it as your shell
before executing the `./go` script or any other Bash scripts, to avoid having to
run it as `bash ./go` every time.

#### Recommended utilities

Most of the framework as-is does not require any other external tools. However,
in order for the automatic command help and output formatting to work, you'll
need the following utilities installed:

- `tput` (ncurses) on Linux, OS X, UNIX
- `mode.com` should be present on Windows

To use the `get file` builtin, either `curl`, `wget`, or `fetch` must be
installed on your system. `get git-repo` requires `git`, naturally.

### Open Source License

This software is made available as [Open Source software][oss-def] under the
[ISC License][].  For the text of the license, see the [LICENSE](LICENSE.md)
file.

[oss-def]:     https://opensource.org/osd-annotated
[isc license]: https://www.isc.org/downloads/software-support-policy/isc-license/

### Prior work

This is a Bash-based alternative to the [18F/go_script][go-old] Ruby
implementation.

[go-old]: https://github.com/18F/go_script
