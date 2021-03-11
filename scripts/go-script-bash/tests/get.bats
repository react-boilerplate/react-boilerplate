#! /usr/bin/env bats

load environment

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: show available subcommands" {
  @go.create_test_go_script '@go "$@"'
  run "$TEST_GO_SCRIPT" get
  assert_success
  assert_line_equals 0 'Available subcommands of "get" are:'
}

