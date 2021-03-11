#! /bin/bash
#
# Framework for writing "./go" scripts in Bash.
#
# To use this framework, create a bash script in the root directory of your
# project to act as the main './go' script. This script need not be named 'go',
# but it must contain the following as the first and last executable lines,
# respectively:
#
#   . "${0%/*}/go-core.bash" "scripts"
#   @go "$@"
#
# where "${0%/*}" produces the path to the project's root directory,
# "/go-core.bash" is the relative path to this file, and "scripts" is the
# relative path from the project root to the command script directory.
#
# See README.md for details about other available features.
#
# Inspired by:
# - "In Praise of the ./go Script: Parts I and II" by Pete Hodgson
#   https://www.thoughtworks.com/insights/blog/praise-go-script-part-i
#   https://www.thoughtworks.com/insights/blog/praise-go-script-part-ii
# - rbenv: https://github.com/rbenv/rbenv
#
# Author: Mike Bland <mbland@acm.org>
#           https://mike-bland.com/
#           https://github.com/mbland

if [[ "${BASH_VERSINFO[0]}" -lt '3' ||
    ( "${BASH_VERSINFO[0]}" -eq '3' && "${BASH_VERSINFO[1]}" -lt '2' ) ]]; then
  printf "This module requires bash version 3.2 or greater:\n  %s %s\n" \
    "$BASH" "$BASH_VERSION"
  exit 1
fi

# The version of the framework
#
# NOTE:
# ----
# This and other variables are exported, so that command scripts written in
# languages other than Bash (and hence run in new processes) can access them.
# See `./go vars` and `./go help vars`.
declare -r -x _GO_CORE_VERSION='v1.5.0'

# The URL of the framework's original source repository
declare -r -x _GO_CORE_URL='https://github.com/mbland/go-script-bash'

declare __go_orig_dir="$PWD"
cd "${0%/*}" || exit 1

# Path to the project's root directory
#
# This is directory containing the main ./go script. All functions, commands,
# and scripts are invoked relative to this directory (unless `_GO_STANDALONE`
# is set).
declare -x _GO_ROOTDIR="$PWD"

if [[ "${BASH_SOURCE[0]:0:1}" != '/' ]]; then
  cd "$__go_orig_dir/${BASH_SOURCE[0]%/*}" || exit 1
else
  cd "${BASH_SOURCE[0]%/*}" || exit 1
fi

# Path to the ./go script framework's directory
declare -r -x _GO_CORE_DIR="$PWD"

# Set _GO_STANDALONE if your script is a standalone program.
#
# See the "Standalone mode" section of README.md for more information.
if [[ -z "$_GO_STANDALONE" ]]; then
  cd "$_GO_ROOTDIR" || exit 1
else
  cd "$__go_orig_dir" || exit 1
fi
unset __go_orig_dir

# Path to the script used to import optional library modules.
#
# After sourcing go-core.bash, your `./go` script, Bash command scripts, and
# individual Bash functions can then import optional Bash library modules from
# the core framework, from installed plugins, and from your scripts directory
# like so:
#
#   . "$_GO_USE_MODULES" 'log'
#
# See `./go modules --help` for more information.
#
# NOTE:
# ----
# Though this variable is exported, _GO_IMPORTED_MODULES is not. This is because
# bash scripts that are launched in a new process (such as Bats tests) may still
# use the _GO_USE_MODULES mechanism, but will not share the same set of loaded
# modules as the parent process.
declare -r -x _GO_USE_MODULES="$_GO_CORE_DIR/lib/internal/use"

# Array of modules imported via _GO_USE_MODULES
#
# NOTE:
# ----
# This and some other variables are _not_ exported, since they are specific to
# Bash command scripts, which are sourced into the ./go script process itself.
# See `./go vars` and `./go help vars`.
declare _GO_IMPORTED_MODULES=()

# Tracks the locations of files corresponding to _GO_IMPORTED_MODULES
# Used to detect and warn about plugin module namespace collisions.
declare _GO_IMPORTED_MODULE_FILES=()

# Tracks where each module _GO_IMPORTED_MODULES was first imported
# Used in the plugin module namespace collision warning message.
declare _GO_IMPORTED_MODULE_CALLERS=()

# Path to the project's script directory
declare _GO_SCRIPTS_DIR=

# Directory containing Bats tests, relative to `_GO_ROOTDIR`
declare -r -x _GO_TEST_DIR="${_GO_TEST_DIR:-tests}"

# Path to the main ./go script in the project's root directory
declare -r -x _GO_SCRIPT="$_GO_ROOTDIR/${0##*/}"

# The name of either the ./go script itself or the shell function invoking it.
declare -r -x _GO_CMD="${_GO_CMD:=$0}"

# The array of command line arguments comprising the ./go command name after
# _GO_CMD.
#
# When exported to scripts not written in bash, the array is converted to a
# string with the components delimited by the ASCII Unit Separator ($'\x1f').
declare -x _GO_CMD_NAME=

# The array of command line arguments for the ./go command after _GO_CMD_NAME.
#
# When exported to scripts not written in bash, the array is converted to a
# string with the arguments delimited by the ASCII Unit Separator ($'\x1f').
declare -x _GO_CMD_ARGV=

# The top-level directory in which plugins are installed.
#
# If a command script is running as a plugin, this value will be the plugins
# directory of the top-level `./go` script.
declare _GO_PLUGINS_DIR=

# Directories containing executable plugin scripts.
declare _GO_PLUGINS_PATHS=()

# Directories that are searched for executable command scripts.
declare _GO_SEARCH_PATHS=()

# Directory to search for command scripts prior to _GO_SEARCH_PATHS.
# Should be an absolute path. Use this for stubbing out scripts during testing
# or debugging, or for experimenting with new implementations of existing
# scripts.
declare _GO_INJECT_SEARCH_PATH="$_GO_INJECT_SEARCH_PATH"

# Directory to search for module scripts first.
# Similar to _GO_INJECT_SEARCH_PATHS above, but for `. "$_GO_USE_MODULES"`.
declare _GO_INJECT_MODULE_PATH="$_GO_INJECT_MODULE_PATH"

# Invokes printf builtin, then folds output to $COLUMNS width
#
# Arguments:
#   everything accepted by the printf builtin except the '-v varname' option
@go.printf() {
  local format="$1"
  shift
  local result
  local line
  local prefix

  if [[ "$#" -eq 0 ]]; then
    format="${format//\%/%%}"
  fi
  printf -v result -- "$format" "$@"
  result="${result//$'\r\n'/$'\n'}"

  # Use the ASCII Unit Separator as a delimiter to preserve true line endings.
  while IFS= read -r -d $'\x1f' line; do
    while [[ "${#line}" -gt "$COLUMNS" ]]; do
      prefix="${line:0:$COLUMNS}"
      prefix="${prefix%[[:space:]]*}"

      # Trim `line` using an index in case `prefix` contains pattern characters.
      line="${line:${#prefix}}"

      if [[ "$prefix" =~ [[:space:]]+$ ]]; then
        prefix="${prefix%${BASH_REMATCH[0]}}"
      fi
      if [[ "$line" =~ ^[[:space:]]+ ]]; then
        line="${line#${BASH_REMATCH[0]}}"
      fi
      printf '%s\n' "$prefix"
    done
    printf '%s' "$line"
  done <<<"${result//$'\n'/$'\n\x1f'}"$'\x1f'
}

# Prints the stack trace at the point of the call.
#
# If supplied, the `skip_callers` argument should be a positive integer (i.e. 1
# or greater) to remove the caller (and possibly the caller's caller, and so on)
# from the resulting stack trace.
#
# Arguments:
#   skip_callers:  The number of callers to skip over when printing the stack
@go.print_stack_trace() {
  local skip_callers="$1"
  local result=0
  local i

  if [[ -n "$skip_callers" && ! "$skip_callers" =~ ^[1-9][0-9]*$ ]]; then
    printf '%s argument %s not a positive integer; printing full stack\n' \
      "$FUNCNAME" "'$skip_callers'" >&2
    result=1
  elif [[ "$skip_callers" -ge "${#FUNCNAME[@]}" ]]; then
    printf '%s argument %d exceeds stack size %d; printing full stack\n' \
      "$FUNCNAME" "$skip_callers" "$((${#FUNCNAME[@]} - 1))" >&2
    result=1
  fi

  if [[ "$result" -ne '0' ]]; then
    skip_callers=0
  fi

  for ((i=$skip_callers + 1; i != ${#FUNCNAME[@]}; ++i)); do
    printf '  %s:%s %s\n' "${BASH_SOURCE[$i]}" "${BASH_LINENO[$((i-1))]}" \
      "${FUNCNAME[$i]}"
  done
  return "$result"
}

# Searches through plugin directories using a helper function
#
# The search will begin in `_GO_SCRIPTS_DIR/plugins`. As long as `search_func`
# returns nonzero, every parent `/plugins/` directory will be searched, up to
# and including the top-level `_GO_PLUGINS_DIR`. The search will end either when
# `search_func` returns zero, or when all of the plugin paths are exhausted.
#
# The helper function, `search_func`, will receive the current plugin directory
# being searched as its sole argument. The `@go.search_plugins` caller's
# variables will be available in its scope. It should return zero when the
# search criteria are satisfied, nonzero if the search should continue.
#
# For example, to search for a particular item in a particular plugin:
#
# find_plugin_item() {
#   [[ -e "$1/item_path" ]] && item_path="$1/item_path"
# }
#
# my_func() {
#   local item_path='foo/bar'
#   if @go.search_plugins find_plugin_item; then
#     # Do something with $item_path
#   fi
# }
#
# Note that this algorithm is modeled after the `node_modules` search algorithm
# used by `npm`. See:
#
#   https://docs.npmjs.com/files/folders#cycles-conflicts-and-folder-parsimony
#
# Arguments:
#   search_func:  Helper function implementing the search operation
#
# Returns:
#   Zero if `search_func` ever returns zero, nonzero otherwise
@go.search_plugins() {
  local __gsp_plugins_dir="$_GO_SCRIPTS_DIR/plugins"

  while true; do
    if "$1" "$__gsp_plugins_dir"; then
      return
    elif [[ "$__gsp_plugins_dir" == "$_GO_PLUGINS_DIR" ]]; then
      return 1
    fi
    __gsp_plugins_dir="${__gsp_plugins_dir%/plugins/*}/plugins"
  done
}

# Main driver of ./go script functionality.
#
# Arguments:
#   $1: name of the command to invoke
#   $2..$#: arguments to the specified command
@go() {
  local cmd="$1"
  shift

  case "$cmd" in
  '')
    _@go.source_builtin 'help' 1>&2
    return 1
    ;;
  -h|-help|--help)
    cmd='help'
    ;;
  -*)
    @go.printf "Unknown flag: $cmd\n\n"
    _@go.source_builtin 'help' 1>&2
    return 1
    ;;
  edit)
    if [[ -z "$EDITOR" ]]; then
      echo "Cannot edit $@: \$EDITOR not defined."
      return 1
    fi
    "$EDITOR" "$@"
    return
    ;;
  run)
    "$@"
    return
    ;;
  cd|pushd|unenv)
    @go.printf "$cmd is only available after using \"$_GO_CMD env\" %s\n" \
      "to set up your shell environment." >&2
    return 1
    ;;
  esac

  if _@go.source_builtin 'aliases' --exists "$cmd"; then
    "$cmd" "$@"
    return
  fi

  . "$_GO_CORE_DIR/lib/internal/path"
  local __go_cmd_path
  local __go_cmd_name
  local __go_argv

  if ! _@go.set_command_path_and_argv "$cmd" "$@"; then
    return 1
  fi

  if [[ "${__go_cmd_path#$_GO_SCRIPTS_DIR}" =~ /plugins/[^/]+/bin/ ]]; then
    _@go.run_plugin_command_script "$__go_cmd_path" "${__go_argv[@]}"
  else
    _@go.run_command_script "$__go_cmd_path" "${__go_argv[@]}"
  fi
}

_@go.source_builtin() {
  local c="$1"
  shift
  . "$_GO_CORE_DIR/libexec/$c"
}

_@go.run_plugin_command_script() {
  local _GO_SCRIPTS_DIR="${__go_cmd_path%/bin/*}/bin"
  local _GO_ROOTDIR="${_GO_SCRIPTS_DIR%/*}"
  local _GO_PLUGINS_PATHS=()
  local _GO_SEARCH_PATHS=()

  _@go.set_search_paths
  _@go.run_command_script "$__go_cmd_path" "${__go_argv[@]}"
}

_@go.run_command_script() {
  local cmd_path="$1"
  shift

  local interpreter
  read -r interpreter < "$cmd_path"

  if [[ "${interpreter:0:2}" != '#!' ]]; then
    @go.printf \
      "The first line of %s does not contain #!/path/to/interpreter.\n" \
      "$cmd_path" >&2
    return 1
  fi

  interpreter="${interpreter%$'\r'}"
  interpreter="${interpreter:2}"
  interpreter="${interpreter#*/env }"
  interpreter="${interpreter##*/}"
  interpreter="${interpreter%% *}"

  if [[ "$interpreter" == 'bash' || "$interpreter" == 'sh' ]]; then
    if [[ -z "$_GO_CMD_NAME" ]]; then
      _GO_CMD_NAME=("${__go_cmd_name[@]}")
      _GO_CMD_ARGV=("$@")
    fi
    . "$cmd_path" "$@"
  elif [[ -z "$interpreter" ]]; then
    @go.printf "Could not parse interpreter from first line of $cmd_path.\n" >&2
    return 1
  else
    if [[ -z "$_GO_CMD_NAME" ]]; then
      local origIFS="$IFS"
      local IFS=$'\x1f'
      _GO_CMD_NAME="${__go_cmd_name[*]}"
      _GO_CMD_ARGV="$*"
      IFS="$origIFS"
    fi
    "$interpreter" "$cmd_path" "$@"
  fi
}

_@go.set_scripts_dir() {
  local scripts_dir="$_GO_ROOTDIR/$1"

  if [[ "$#" -ne '1' ]]; then
    echo "ERROR: there should be exactly one command script dir specified" >&2
    return 1
  elif [[ ! -e "$scripts_dir" ]]; then
    echo "ERROR: command script directory $scripts_dir does not exist" >&2
    return 1
  elif [[ ! -d "$scripts_dir" ]]; then
    echo "ERROR: $scripts_dir is not a directory" >&2
    return 1
  elif [[ ! -r "$scripts_dir" || ! -x "$scripts_dir" ]]; then
    echo "ERROR: you do not have permission to access the $scripts_dir" \
      "directory" >&2
    return 1
  fi
  _GO_SCRIPTS_DIR="$scripts_dir"
}

if ! _@go.set_scripts_dir "$@"; then
  exit 1
elif [[ -z "$COLUMNS" ]]; then
  # On Travis, $TERM is set to 'dumb', but `tput cols` still fails.
  if command -v tput >/dev/null && tput cols >/dev/null 2>&1; then
    COLUMNS="$(tput cols)"
  elif command -v mode.com >/dev/null &&
    [[ "$(mode.com 'con')" =~ Columns:\ +([0-9]+) ]]; then
    COLUMNS="${BASH_REMATCH[1]}"
  fi
  export COLUMNS="${COLUMNS:-80}"
fi
_GO_PLUGINS_DIR="$_GO_SCRIPTS_DIR/plugins"
