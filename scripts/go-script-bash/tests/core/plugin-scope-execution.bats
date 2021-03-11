#! /usr/bin/env bats

load ../environment

PRINT_SOURCE='printf -- "%s\n" "$BASH_SOURCE"'

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: project script takes precedence over plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' "$PRINT_SOURCE"
  @go.create_test_command_script 'foo' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/foo"
}

@test "$SUITE: plugin can't use script from top-level _GO_SCRIPTS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'bar' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_failure
  assert_line_equals 0 'Unknown command: bar'
}

@test "$SUITE: plugin runs command from own _GO_SCRIPTS_DIR not as plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/bar' '@go.print_stack_trace'

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success

  # It shouldn't invoke its own scripts as though they were separate plugins.
  assert_line_matches 0 \
    "  $TEST_GO_PLUGINS_DIR/foo/bin/bar:2 source"
  assert_line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 2 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}

@test "$SUITE: plugin subcommand finds correct command in own plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go.print_stack_trace'
  @go.create_test_command_script 'plugins/foo/bin/bar' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/bar.d/baz' '@go foo'
  @go.create_test_command_script 'plugins/aaa/bin/foo' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'bar' 'baz'
  assert_success

  # It shouldn't invoke its own scripts as though they were separate plugins.
  assert_line_matches 0 \
    "  $TEST_GO_PLUGINS_DIR/foo/bin/foo:2 source"
  assert_line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 2 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}

@test "$SUITE: plugin can use script from top-level _GO_PLUGINS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/bar/bin/bar' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/bar/bin/bar"
}

@test "$SUITE: plugin can use plugin from own plugin dir" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/plugins/bar/bin/bar"
}

@test "$SUITE: plugin's local _GO_SCRIPTS_DIR scripts take precedence" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/bar' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/bar/bin/bar' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/bar"
}

@test "$SUITE: local plugins take precedence over top-level _GO_PLUGINS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/bar/bin/bar' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' \
    "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/plugins/bar/bin/bar"
}

@test "$SUITE: circular dependencies in nested plugin dirs" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/baz' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' '@go baz'

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/baz"
}

@test "$SUITE: circular dependencies in top-level _GO_PLUGINS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/baz' "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/bar/bin/bar' '@go baz'

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/baz"
}

@test "$SUITE: nested plugin's _GO_SCRIPTS_DIR precedes plugins" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' '@go baz'

  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script \
    'plugins/foo/bin/plugins/bar/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/baz/bin/baz' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/plugins/bar/bin/baz"
}

@test "$SUITE: nested plugin's plugins precede parents' plugins" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' '@go baz'

  @go.create_test_command_script \
    'plugins/foo/bin/plugins/bar/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/foo/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/baz/bin/baz' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success \
    "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/plugins/bar/bin/plugins/baz/bin/baz"
}

@test "$SUITE: nested plugin's sibling precedes top-level _GO_PLUGINS_DIR" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' '@go baz'

  @go.create_test_command_script 'plugins/foo/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"
  @go.create_test_command_script 'plugins/baz/bin/baz' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/foo/bin/plugins/baz/bin/baz"
}

@test "$SUITE: nested plugin finds top-level _GO_PLUGINS_DIR plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go bar'
  @go.create_test_command_script 'plugins/foo/bin/plugins/bar/bin/bar' '@go baz'

  @go.create_test_command_script 'plugins/baz/bin/baz' "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success "$TEST_GO_SCRIPTS_DIR/plugins/baz/bin/baz"
}

@test "$SUITE: plugin doesn't leak own plugins to sibling plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go baz'
  @go.create_test_command_script 'plugins/bar/bin/bar' '@go foo'
  @go.create_test_command_script 'plugins/bar/bin/plugins/baz/bin/baz' \
    "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'bar'
  assert_failure
  assert_line_equals 0 'Unknown command: baz'
}

@test "$SUITE: plugin doesn't leak own plugins to parent plugin" {
  @go.create_test_command_script 'plugins/foo/bin/foo' '@go baz'
  @go.create_test_command_script 'plugins/foo/bin/bar' '@go quux'
  @go.create_test_command_script 'plugins/foo/bin/plugins/baz/bin/baz' '@go bar'
  @go.create_test_command_script \
    'plugins/foo/bin/plugins/baz/bin/plugins/quux/bin/quux' \
    "$PRINT_SOURCE"

  run "$TEST_GO_SCRIPT" 'foo'
  assert_failure
  assert_line_equals 0 'Unknown command: quux'
}

@test "$SUITE: non-plugin script when _GO_SCRIPTS_DIR contains /plugins/" {
  create_bats_test_script 'go' \
    ". '$_GO_CORE_DIR/go-core.bash' 'plugins'" \
    '@go "$@"'
  create_bats_test_script 'plugins/foo' \
    '@go.print_stack_trace 1'

  run "$TEST_GO_SCRIPT" 'foo'
  assert_success
  assert_line_matches 0 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}

@test "$SUITE: non-plugin script when /plugins/ in relative path" {
  create_bats_test_script 'go' \
    ". '$_GO_CORE_DIR/go-core.bash' 'plugins'" \
    '@go "$@"'
  create_bats_test_script 'plugins/plugins/foo' \
    '@go.print_stack_trace 1'

  run "$TEST_GO_SCRIPT" 'plugins/foo'
  assert_success
  assert_line_matches 0 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}

@test "$SUITE: script isn't a plugin if /plugins/ in _GO_ROOTDIR" {
  local test_rootdir="$TEST_GO_ROOTDIR/plugins/rootdir"
  mkdir -p "$test_rootdir"
  mv "$TEST_GO_SCRIPT" "$test_rootdir"

  # We can't use `@go.create_test_command_script` since we can't change the
  # readonly `TEST_GO_*` variables.
  create_bats_test_script "${test_rootdir#$BATS_TEST_ROOTDIR/}/scripts/foo" \
    '@go.print_stack_trace 1'

  run "$test_rootdir/go" 'foo'
  assert_success
  assert_line_matches 0 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}

@test "$SUITE: script isn't a plugin despite /plugins/ paths all the way down" {
  local test_rootdir="$TEST_GO_ROOTDIR/plugins/plugins"
  local test_scripts_dir="$test_rootdir/plugins"
  mkdir -p "$test_scripts_dir/plugins"

  create_bats_test_script "${test_rootdir#$BATS_TEST_ROOTDIR/}/go" \
    ". '$_GO_CORE_DIR/go-core.bash' 'plugins'" \
    '@go "$@"'
  create_bats_test_script \
    "${test_rootdir#$BATS_TEST_ROOTDIR/}/plugins/plugins/foo" \
    '@go.print_stack_trace 1'

  run "$test_rootdir/go" 'plugins/foo'
  assert_success
  assert_line_matches 0 \
    "  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script"
  fail_if line_matches 1 \
    "  $_GO_CORE_DIR/go-core.bash:[1-9]+ _@go.run_plugin_command_script"
}
