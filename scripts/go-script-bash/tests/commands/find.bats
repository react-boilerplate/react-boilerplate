#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
  @go.create_test_go_script \
    '. "$_GO_CORE_DIR/lib/internal/path"' \
    '. "$_GO_CORE_DIR/lib/internal/commands"' \
    'declare __go_longest_name_len' \
    'declare __go_command_names' \
    'declare __go_command_scripts' \
    'if ! _@go.find_commands "${@:-${_GO_SEARCH_PATHS[@]}}"; then' \
    '  exit 1' \
    'fi' \
    'echo LONGEST NAME LEN: "$__go_longest_name_len"' \
    'echo COMMAND_NAMES: "${__go_command_names[@]}"' \
    'printf -- "%s\n" "${__go_command_scripts[@]}"'
  find_builtins
}

teardown() {
  @go.remove_test_go_rootdir
}

assert_command_scripts_equal() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  unset 'lines[0]' 'lines[1]'
  lines=("${lines[@]}")
  assert_lines_equal "$@"
  restore_bats_shell_options "$?"
}

@test "$SUITE: return only builtin commands" {
  run "$TEST_GO_SCRIPT"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#LONGEST_BUILTIN_NAME}"
  assert_line_equals 1 "COMMAND_NAMES: ${BUILTIN_CMDS[*]}"
  assert_command_scripts_equal "${BUILTIN_SCRIPTS[@]}"
}

@test "$SUITE: ignore directories" {
  mkdir "$TEST_GO_SCRIPTS_DIR"/{foo,bar,baz}
  run "$TEST_GO_SCRIPT"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#LONGEST_BUILTIN_NAME}"
  assert_line_equals 1 "COMMAND_NAMES: ${BUILTIN_CMDS[*]}"
  assert_command_scripts_equal "${BUILTIN_SCRIPTS[@]}"
}

@test "$SUITE: ignore nonexecutable files" {
  touch "$TEST_GO_SCRIPTS_DIR"/{foo,bar,baz}
  chmod 600 "$TEST_GO_SCRIPTS_DIR"/{foo,bar,baz}
  run "$TEST_GO_SCRIPT"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#LONGEST_BUILTIN_NAME}"
  assert_line_equals 1 "COMMAND_NAMES: ${BUILTIN_CMDS[*]}"
  assert_command_scripts_equal "${BUILTIN_SCRIPTS[@]}"
}

@test "$SUITE: return builtins and user scripts" {
  local longest_name="extra-long-name-that-no-one-would-use"
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script names must remain hand-sorted.
  add_scripts 'bar' 'baz' "$longest_name" 'foo'
  run "$TEST_GO_SCRIPT"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#longest_name}"
  assert_line_equals 1 "COMMAND_NAMES: ${__all_scripts[*]##*/}"
  assert_command_scripts_equal "${__all_scripts[@]#$TEST_GO_ROOTDIR/}"
}

@test "$SUITE: return builtins, plugins, and user scripts" {
  local longest_name="super-extra-long-name-that-no-one-would-use"
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    "plugins/$longest_name/bin/$longest_name" \
    'plugins/xyzzy/bin/xyzzy'
  run "$TEST_GO_SCRIPT"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#longest_name}"
  assert_line_equals 1 "COMMAND_NAMES: ${__all_scripts[*]##*/}"
  assert_command_scripts_equal "${__all_scripts[@]#$TEST_GO_ROOTDIR/}"
}

@test "$SUITE: return paths relative to PWD when _GO_STANDALONE is set" {
  local longest_name="super-extra-long-name-that-no-one-would-use"
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    "plugins/$longest_name/bin/$longest_name" \
    'plugins/xyzzy/bin/xyzzy'
  cd "$HOME"
  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT"
  assert_success

  test_printf 'SCRIPT: %s\n' "${__all_scripts[@]}"

  assert_line_equals 0 "LONGEST NAME LEN: ${#longest_name}"
  assert_line_equals 1 "COMMAND_NAMES: ${__all_scripts[*]##*/}"
  assert_command_scripts_equal "${__all_scripts[@]#$HOME/}"
}

@test "$SUITE: commands from earlier paths precede duplicates in later paths" {
  # In this case, we're trying to duplicate a builtin. Since
  # `_GO_CORE_DIR/libexec` comes first in `_GO_SEARCH_PATHS`, it takes
  # precedence over the duplicate we add.
  local duplicate_cmd="${BUILTIN_SCRIPTS[0]##*/}"
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  add_scripts "$duplicate_cmd"
  run "$TEST_GO_SCRIPT"
  assert_success
  assert_line_equals 0 "LONGEST NAME LEN: ${#LONGEST_BUILTIN_NAME}"
  assert_line_equals 1 "COMMAND_NAMES: ${__all_scripts[*]##*/}"
  assert_command_scripts_equal "${__all_scripts[@]}"
}

@test "$SUITE: return subcommands only" {
  # parent_commands and subcommands must remain hand-sorted
  local longest_name='terribly-long-name-that-would-be-insane-in-a-real-script'
  local parent_commands=('bar' 'baz' 'foo')
  local subcommands=('plugh' 'quux' "$longest_name" 'xyzzy')
  local __all_scripts=()

  # Command script names must remain hand-sorted
  add_scripts 'bar' 'baz' 'foo' \
    'foo.d/plugh' 'foo.d/quux' "foo.d/$longest_name" 'foo.d/xyzzy'
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_RELATIVE_DIR/foo.d"
  assert_success

  assert_line_equals 0 "LONGEST NAME LEN: ${#longest_name}"
  assert_line_equals 1 "COMMAND_NAMES: ${subcommands[*]}"
  assert_command_scripts_equal "${subcommands[@]/#/scripts/foo.d/}"
}

@test "$SUITE: return error if no commands are found" {
  mkdir "$TEST_GO_SCRIPTS_DIR/foo.d"
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_RELATIVE_DIR/foo.d"
  assert_failure ''
}

@test "$SUITE: error if no commands are found because dir doesn't exist" {
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_RELATIVE_DIR/foo.d"
  assert_failure ''
}
