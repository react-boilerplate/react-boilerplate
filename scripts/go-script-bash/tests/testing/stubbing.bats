#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/stubbing"

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: create_command_script_test_stub to stub out builtin command" {
  @go.create_test_go_script '@go "$@"'
  @go.create_command_script_test_stub 'help' 'printf "INJECTED\n"'
  run "$TEST_GO_SCRIPT" help
  assert_success 'INJECTED'
}

@test "$SUITE: create_module_test_stub to stub out builtin module" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "$@"'
  @go.create_module_test_stub 'log' 'printf "INJECTED\n"'
  run "$TEST_GO_SCRIPT" log
  assert_success 'INJECTED'
}
