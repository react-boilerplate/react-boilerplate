#! /usr/bin/env bats

load environment

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completion" {
  local subcommands=('plugh' 'quux' 'xyzzy')
  @go.create_parent_and_subcommands foo "${subcommands[@]}"
  run "$TEST_GO_SCRIPT" complete 1 path 'foo'
  assert_success 'foo '

  run "$TEST_GO_SCRIPT" complete 2 path 'foo' ''
  assert_success "${subcommands[@]}"

  run "$TEST_GO_SCRIPT" complete 2 path 'foo' 'q'
  assert_success 'quux '
}

@test "$SUITE: shell alias" {
  run "$TEST_GO_SCRIPT" path cd
  assert_success '[alias]'
}

@test "$SUITE: builtin path" {
  run "$TEST_GO_SCRIPT" path path
  assert_success "[builtin] $_GO_ROOTDIR/libexec/path"
}

@test "$SUITE: user script path" {
  @go.create_test_command_script foo
  run "$TEST_GO_SCRIPT" path foo
  assert_success "scripts/foo"
}

@test "$SUITE: user subcommand script with arguments" {
  mkdir -p "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d"
  @go.create_test_command_script foo
  @go.create_test_command_script foo.d/bar
  @go.create_test_command_script foo.d/bar.d/baz
  @go.create_test_go_script '@go "$@"'

  run "$TEST_GO_SCRIPT" path foo bar baz --quux --xyzzy plugh frobozz
  assert_success "${TEST_GO_SCRIPTS_DIR#$TEST_GO_ROOTDIR/}/foo.d/bar.d/baz"
}

@test "$SUITE: error if command doesn't exist" {
  run "$TEST_GO_SCRIPT" path foo
  assert_failure
  assert_line_equals 0 'Unknown command: foo'
}
