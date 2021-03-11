#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script 'printf "PWD: %s\n" "$PWD"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: don't change to _GO_ROOTDIR when _GO_STANDALONE is set" {
  cd "$HOME"
  run "$TEST_GO_SCRIPT"
  assert_success "PWD: $TEST_GO_ROOTDIR"
  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT"
  assert_success "PWD: $HOME"
}
