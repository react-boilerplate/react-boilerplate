#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: use _GO_INJECT_SEARCH_PATH to stub out builtin command" {
  @go.create_test_go_script '@go "$@"'
  create_bats_test_script 'test/help' 'printf "INJECTED\n"'

  _GO_INJECT_SEARCH_PATH="$BATS_TEST_ROOTDIR/test" run "$TEST_GO_SCRIPT" help
  assert_success 'INJECTED'
}

@test "$SUITE: use _GO_INJECT_MODULE_PATH to stub out builtin module" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "$@"'
  create_bats_test_script 'test/log' 'printf "INJECTED\n"'

  _GO_INJECT_MODULE_PATH="$BATS_TEST_ROOTDIR/test" run "$TEST_GO_SCRIPT" log
  assert_success 'INJECTED'
}
