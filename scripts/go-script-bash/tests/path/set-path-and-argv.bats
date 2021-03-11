#! /usr/bin/env bats

load ../environment

setup() {
  @go.create_test_go_script \
    '. "$_GO_CORE_DIR/lib/internal/path"' \
    'if ! _@go.set_command_path_and_argv "$@"; then' \
    '  exit 1' \
    'fi' \
    'echo "PATH: $__go_cmd_path"' \
    'echo "NAME: ${__go_cmd_name[*]}"' \
    'echo "ARGV: ${__go_argv[*]}"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error on empty argument list" {
  run "$TEST_GO_SCRIPT"
  assert_failure

  run "$TEST_GO_SCRIPT" '' '' ''
  assert_failure
}

@test "$SUITE: find builtin command" {
  local builtins=("$_GO_ROOTDIR"/libexec/*)
  local builtin_cmd="${builtins[0]}"

  run "$TEST_GO_SCRIPT" "${builtin_cmd##*/}" '--exists' 'ls'
  assert_success
  assert_line_equals 0 "PATH: $builtin_cmd"
  assert_line_equals 1 "NAME: ${builtin_cmd##*/}"
  assert_line_equals 2 'ARGV: --exists ls'
}

@test "$SUITE: list available commands if command not found" {
  # Since _@go.list_available_commands is already tested in isolation, we only
  # check the beginning of the error output.
  run "$TEST_GO_SCRIPT" 'foobar'
  assert_failure

  assert_line_equals 0 'Unknown command: foobar'
  assert_line_equals 1 'Available commands are:'
}

@test "$SUITE: find top-level command" {
  # chmod is neutralized in MSYS2 on Windows; `#!` makes files executable.
  echo '#!' > "$TEST_GO_SCRIPTS_DIR/foobar"
  chmod 700 "$TEST_GO_SCRIPTS_DIR/foobar"
  run "$TEST_GO_SCRIPT" 'foobar' 'baz' 'quux'
  assert_success
  assert_line_equals 0 "PATH: $TEST_GO_SCRIPTS_DIR/foobar"
  assert_line_equals 1 'NAME: foobar'
  assert_line_equals 2 'ARGV: baz quux'
}

@test "$SUITE: empty string argument is not an error" {
  # This is most likely to happen during argument completion, but could be valid
  # in the general case as well, depending on the command implementation.
  echo '#!' > "$TEST_GO_SCRIPTS_DIR/foobar"
  chmod 700 "$TEST_GO_SCRIPTS_DIR/foobar"
  run "$TEST_GO_SCRIPT" 'foobar' '' 'baz' 'quux'
  assert_success
  assert_line_equals 0 "PATH: $TEST_GO_SCRIPTS_DIR/foobar"
  assert_line_equals 1 'NAME: foobar'
  assert_line_equals 2 'ARGV:  baz quux'
}

@test "$SUITE: error if top-level command name is a directory" {
  mkdir "$TEST_GO_SCRIPTS_DIR/foobar"
  run "$TEST_GO_SCRIPT" 'foobar'
  assert_failure
  assert_line_equals 0 "$TEST_GO_SCRIPTS_DIR/foobar is not an executable script"
}

@test "$SUITE: error if top-level command script is not executable" {
  touch "$TEST_GO_SCRIPTS_DIR/foobar"
  chmod 600 "$TEST_GO_SCRIPTS_DIR/foobar"
  run "$TEST_GO_SCRIPT" 'foobar'
  assert_failure
  assert_line_equals 0 "$TEST_GO_SCRIPTS_DIR/foobar is not an executable script"
}

@test "$SUITE: find subcommand" {
  local cmd_path="$TEST_GO_SCRIPTS_DIR/foobar"
  echo '#!' > "$cmd_path"
  chmod 700 "$cmd_path"
  mkdir "${cmd_path}.d"

  local subcmd_path="${cmd_path}.d/baz"
  echo '#!' > "$subcmd_path"
  chmod 700 "$subcmd_path"

  run "$TEST_GO_SCRIPT" 'foobar' 'baz' 'quux'
  assert_success
  assert_line_equals 0 "PATH: $TEST_GO_SCRIPTS_DIR/foobar.d/baz"
  assert_line_equals 1 'NAME: foobar baz'
  assert_line_equals 2 'ARGV: quux'
}

@test "$SUITE: error if subcommand name is a directory" {
  local cmd_path="$TEST_GO_SCRIPTS_DIR/foobar"
  echo '#!' > "$cmd_path"
  chmod 700 "$cmd_path"
  mkdir -p "${cmd_path}.d/baz"

  run "$TEST_GO_SCRIPT" 'foobar' 'baz' 'quux'
  assert_failure
  assert_line_equals 0 "${cmd_path}.d/baz is not an executable script"
}

@test "$SUITE: error if subcommand script is not executable" {
  local cmd_path="$TEST_GO_SCRIPTS_DIR/foobar"
  echo '#!' > "$cmd_path"
  chmod 700 "$cmd_path"

  mkdir "${cmd_path}.d"
  touch "${cmd_path}.d/baz"
  chmod 600 "${cmd_path}.d/baz"

  run "$TEST_GO_SCRIPT" 'foobar' 'baz' 'quux'
  assert_failure
  assert_line_equals 0 "${cmd_path}.d/baz is not an executable script"
}
