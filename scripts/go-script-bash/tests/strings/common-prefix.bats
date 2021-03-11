#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
  create_strings_test_script 'declare prefix' \
    '@go.common_prefix "prefix" "$@"' \
    'printf -- "%s\n" "$prefix"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if result variable name not a valid identifier" {
  create_strings_test_script '@go.common_prefix "invalid;" "$@"'
  run "$TEST_GO_SCRIPT"

  local err_msg='^Result variable name "invalid;" for @go.common_prefix '
  err_msg+='contains invalid identifier characters at:$'

  assert_lines_match "$err_msg" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: empty argument list produces empty string" {
  run "$TEST_GO_SCRIPT"
  assert_success
}

@test "$SUITE: empty string produces empty string" {
  run "$TEST_GO_SCRIPT" ''
  assert_success
}

@test "$SUITE: single string returns empty string" {
  run "$TEST_GO_SCRIPT" 'foo'
  assert_success ''
}

@test "$SUITE: multiple strings with no common prefix returns empty string" {
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz'
  assert_success ''
}

@test "$SUITE: multiple strings with common prefix returns prefix substring" {
  run "$TEST_GO_SCRIPT" 'bar' 'baz' 'baxter'
  assert_success 'ba'
}
