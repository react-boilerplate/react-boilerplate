#! /usr/bin/env bats

load environment

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: show available demo subcommands" {
  @go.create_test_go_script '@go "$@"'
  run "$TEST_GO_SCRIPT" demo-core
  assert_success
  assert_line_equals 0 'Available subcommands of "demo-core" are:'
}
