#! /usr/bin/env bash
#
# Template for a Bash program based on the go-script-bash framework
#
# You should replace this comment with your own program's high-level
# description. You may remove any other comments from this template as well.
#
# This template automatically checks for the presence of the go-script-bash
# sources and downloads the go-script-bash repository contents if necessary
# before dispatching commands. (If you prefer, you can change the logic to
# create a shallow or regular clone instead.) This allows users to set up the
# framework without taking any extra steps when running the command for the
# first time, without the need to commit the framework to your repository.
#
# Alternatively, you can make the `GO_SCRIPT_BASH_REPO_URL` a Git submodule of
# your project or check in a versioned copy of the sources. See the "How to use
# this framework" section of `README.md` for details.
#
# Make sure the variables within this script are configured as necessary for
# your program. You can add any other initialization or configuration between:
#
#   . "$_GO_SCRIPT_BASH_CORE_DIR/go-core.bash" "$GO_SCRIPTS_DIR"`
#   `@go "$@"`

# Set to 'true' if your script is a standalone program, i.e. not bound to
# execute only from the directory in which it resides. See the "Standalone mode"
# section in README.md.
export _GO_STANDALONE=

# The path where your command scripts reside
#
# For `_GO_STANDALONE` programs and plugins containing command scripts, you may
# wish to set GO_SCRIPTS_DIR to `bin` and have a separate `./go` script to
# manage project tasks that finds its command scripts in `scripts`.
declare GO_SCRIPTS_DIR="${GO_SCRIPTS_DIR:-scripts}"

# The `GO_SCRIPT_BASH_REPO_URL` tag or branch you wish to use
declare GO_SCRIPT_BASH_VERSION="${GO_SCRIPT_BASH_VERSION:-v1.5.0}"

# The target version string, removing the leading 'v'
declare _GO_SCRIPT_BASH_VERSION_NUMBER="${GO_SCRIPT_BASH_VERSION:1}"

# The go-script-bash installation directory within your project
declare GO_SCRIPT_BASH_CORE_DIR="${GO_SCRIPT_BASH_CORE_DIR:-${0%/*}/$GO_SCRIPTS_DIR/go-script-bash}"

# The URL of the go-script-bash framework sources
declare GO_SCRIPT_BASH_REPO_URL="${GO_SCRIPT_BASH_REPO_URL:-https://github.com/mbland/go-script-bash.git}"

# URL with the release files
declare GO_SCRIPT_BASH_DOWNLOAD_URL="${GO_SCRIPT_BASH_DOWNLOAD_URL:-${GO_SCRIPT_BASH_REPO_URL%.git}/archive}/$GO_SCRIPT_BASH_VERSION.tar.gz"

if [[ ! -e "$GO_SCRIPT_BASH_CORE_DIR/go-core.bash" ]]; then
  declare PIPEFAIL_BACKUP
  PIPEFAIL_BACKUP=$(shopt -op | grep pipefail)
  set -o pipefail

  # Using a function to allow for multiple return points
  curl_download(){
    if ! command curl -V >/dev/null; then
      printf "Failed to find cURL or tar\n"
      return 1
    fi
    if ! command tar --help >/dev/null; then
      printf "Failed to find cURL or tar\n"
      return 1
    fi
    printf "Downloading framework from '%s'...\n" "$GO_SCRIPT_BASH_DOWNLOAD_URL"
    if ! curl -LfsS "$GO_SCRIPT_BASH_DOWNLOAD_URL" | tar -xz 2>/dev/null ; then
      printf "Failed to download from '%s'.\n" "$GO_SCRIPT_BASH_DOWNLOAD_URL" >&2
      return 1
    fi
    if ! mkdir -p $GO_SCRIPTS_DIR ; then
      printf "Failed to create scripts dir '%s'\n" $GO_SCRIPTS_DIR >&2
      rm -rf go-script-bash-$_GO_SCRIPT_BASH_VERSION_NUMBER
      return 1
    fi
    if ! mv go-script-bash-$_GO_SCRIPT_BASH_VERSION_NUMBER $GO_SCRIPT_BASH_CORE_DIR; then
      printf "Failed to install downloaded directory in '%s'\n" $GO_SCRIPT_BASH_CORE_DIR >&2
      rm -rf go-script-bash-$_GO_SCRIPT_BASH_VERSION_NUMBER
      return 1
    fi
    printf "Download of '%s' successful.\n\n" "$GO_SCRIPT_BASH_DOWNLOAD_URL"
    return 0
  }

  if ! curl_download; then
    printf "Using git clone as fallback\n"
    printf "Cloning framework from '%s'...\n" "$GO_SCRIPT_BASH_REPO_URL"
    if ! git clone --depth 1 -c advice.detachedHead=false \
        -b "$GO_SCRIPT_BASH_VERSION" "$GO_SCRIPT_BASH_REPO_URL" \
        "$GO_SCRIPT_BASH_CORE_DIR"; then
      printf "Failed to clone '%s'; aborting.\n" "$GO_SCRIPT_BASH_REPO_URL" >&2
      $PIPEFAIL_BACKUP
      exit 1
    fi
    printf "Clone of '%s' successful.\n\n" "$GO_SCRIPT_BASH_REPO_URL"
  fi
  $PIPEFAIL_BACKUP
fi

declare _GO_LOG_TIMESTAMP_FORMAT="[%Y-%m-%d %H:%M:%S]"

. "$GO_SCRIPT_BASH_CORE_DIR/go-core.bash" "$GO_SCRIPTS_DIR"
# shellcheck source=scripts/plugins/octobot-docker/lib/checks
. "$_GO_USE_MODULES" 'log'
# shellcheck source=scripts/lib/project-variables
. "$_GO_USE_MODULES" 'project-variables'

# From https://stackoverflow.com/questions/3685970/check-if-an-array-contains-a-value
elementIn () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

@go "$@"
