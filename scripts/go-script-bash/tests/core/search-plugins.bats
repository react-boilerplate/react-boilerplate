#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script \
    'collect_dirs_impl() {' \
    '  [[ -d "$1" ]] && dirs_searched+=("$1")' \
    '  [[ "$((--COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS))" -eq "0" ]]' \
    '}' \
    'collect_dirs() {' \
    '  local dirs_searched=()' \
    '  @go.search_plugins collect_dirs_impl' \
    '  local result="$?"' \
    '  printf "%s\n" "${dirs_searched[@]}"' \
    '  return "$result"' \
    '}' \
    'if [[ -z "$COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS" ]]; then' \
    '  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS=1' \
    'fi' \
    '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: _GO_PLUGINS_DIR doesn't exist" {
  @go.create_test_command_script 'top-level' 'collect_dirs'
  run "$TEST_GO_SCRIPT" 'top-level'
  assert_success ''
}

@test "$SUITE: _GO_PLUGINS_DIR exists" {
  mkdir -p "$TEST_GO_PLUGINS_DIR"
  @go.create_test_command_script 'top-level' 'collect_dirs'
  run "$TEST_GO_SCRIPT" 'top-level'
  assert_success "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: _GO_PLUGINS_DIR exists, search returns failure" {
  mkdir -p "$TEST_GO_PLUGINS_DIR"
  @go.create_test_command_script 'top' 'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='0' run "$TEST_GO_SCRIPT" 'top'
  assert_failure "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: plugin without plugins dir finds _GO_PLUGINS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' 'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='2' run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: plugin with plugins dir finds both plugins dirs" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins"
  @go.create_test_command_script 'plugins/foo/bin/foo' 'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='2' run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_PLUGINS_DIR/foo/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: plugin with plugins dir, return success after first dir" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins"
  @go.create_test_command_script 'plugins/foo/bin/foo' 'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='1' run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_PLUGINS_DIR/foo/bin/plugins"
}

@test "$SUITE: plugin finds both plugins dirs, returns failure" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins"
  @go.create_test_command_script 'plugins/foo/bin/foo' 'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='3' run "$TEST_GO_SCRIPT" 'foo'
  assert_failure "$TEST_GO_PLUGINS_DIR/foo/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: nested_plugin without plugins dir finds parent dirs" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins/bar/bin"
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='3' run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_PLUGINS_DIR/foo/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: nested_plugin with plugins dir finds all plugin dirs" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins/bar/bin/plugins"
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='3' run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_PLUGINS_DIR/foo/bin/plugins/bar/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR/foo/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: nested_plugin stops after parent plugin dir" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='2' run "$TEST_GO_SCRIPT" 'foo'
  # Note it doesn't have its own plugin dir this time.
  assert_success "$TEST_GO_PLUGINS_DIR/foo/bin/plugins"
}

@test "$SUITE: nested_plugin with plugins dir finds all dirs, returns failure" {
  mkdir -p "$TEST_GO_PLUGINS_DIR/foo/bin/plugins/bar/bin/plugins"
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    'collect_dirs'
  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='4' run "$TEST_GO_SCRIPT" 'foo'
  assert_failure "$TEST_GO_PLUGINS_DIR/foo/bin/plugins/bar/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR/foo/bin/plugins" \
    "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: /plugins/ in _GO_ROOTDIR, _GO_SCRIPTS_DIR (pathological)" {
  local test_rootdir="$TEST_GO_ROOTDIR/plugins/plugins"
  local test_go_script="$test_rootdir/go"
  local test_go_script_impl="$(< "$TEST_GO_SCRIPT")"
  local test_scripts_dir="$test_rootdir/plugins"
  local test_plugins_dir="$test_scripts_dir/plugins"
  mkdir -p "$test_plugins_dir/foo/bin/plugins/bar/bin/plugins"

  printf '%s\n' "${test_go_script_impl/$TEST_GO_SCRIPTS_RELATIVE_DIR/plugins}" \
    >"$test_go_script"
  chmod 700 "$test_go_script"

  local foo_path="${test_plugins_dir#$BATS_TEST_ROOTDIR/}/foo/bin/foo"
  local bar_path="${foo_path%/*}/plugins/bar/bin/bar"

  # We can't use `@go.create_test_command_script` since we can't change the
  # readonly `TEST_GO_*` variables.
  create_bats_test_script "$foo_path" '@go bar'
  create_bats_test_script "$bar_path" 'collect_dirs'

  COLLECT_DIRS_SUCCESS_AFTER_NUM_ITERATIONS='10' run "$test_go_script" 'foo'
  assert_failure "$test_plugins_dir/foo/bin/plugins/bar/bin/plugins" \
    "$test_plugins_dir/foo/bin/plugins" \
    "$test_plugins_dir"
}
