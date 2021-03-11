#! /usr/bin/env bats

load ../environment

setup() {
  @go.create_test_go_script \
    '. "$_GO_CORE_DIR/lib/internal/path"' \
    '_@go.list_available_commands "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

setup_list_available_commands() {
  local builtin_cmd
  for builtin_cmd in "$_GO_ROOTDIR"/libexec/*; do
    if [[ -f "$builtin_cmd" && -x "$builtin_cmd" ]]; then
      expected+=("${builtin_cmd[@]##*/}")
    fi
  done
}

@test "$SUITE: list available commands" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  # Since we aren't creating any new commands, and _@go.find_commands is already
  # thoroughly tested in isolation, we only check that builtins are available.
  local expected=()
  setup_list_available_commands
  restore_bats_shell_options "$?"

  run "$TEST_GO_SCRIPT" "$_GO_ROOTDIR/libexec"
  assert_success
  assert_line_equals 0 'Available commands are:'

  lines=("${lines[@]:1}")
  assert_lines_equal "${expected[@]/#/  }"
}

@test "$SUITE: error if no commands available" {
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_DIR"
  assert_failure

  assert_line_equals 0 'ERROR: No commands available in:'
  assert_line_equals 1 "  $TEST_GO_SCRIPTS_DIR"
}
