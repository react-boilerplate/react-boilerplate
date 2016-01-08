# Prerequisites

These tools are the ones you need before you can get started with this boilerplate.

## Node

The easiest way to install Node is to follow the installation instructions on the [official homepage](https://nodejs.org) for your operating system! This also automatically install `npm`, the package manager this boilerplate uses.

To check if Node is correctly installed and setup on your system, type these two commands into your terminal:

```Shell
$ node -v
$ npm -v
```

Both commands should output a version number. If either of those commands doesn't work, try installing Node again!

## git

Check out the [official website](https://git-scm.com/downloads) of git for installation instructions for your operating system.

To check if git is correctly installed and setup on your system, type this command into your terminal:

```Shell
$ git --version
```

This should output a version number. If this doesn't output a version number, try installing git again!

## Windows

Lots of the packages this boilerplate installs rely on a tool called `node-gyp`, which has very specific requirements.

The best way to make sure `node-gyp` will work correctly is to check the instructions for your Windows version in the [official installation instructions](https://github.com/nodejs/node-gyp#installation).

### TL;DR

Those installation instructions aren't very clear, so here's the short version.

You need

* [Python v2.7.x](https://www.python.org/downloads/release/python-2710/) (v3.x.x not supported)

* If you're on Windows 10, you'll want to install [Visual Studio Community 2015 Edition](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx)

* If you're on Windows < 10 you'll want to install [Microsoft Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914) with a custom installation and `Visual C++` selected.
