#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if result variable name not a valid identifier" {
  create_strings_test_script '@go.trim "invalid;"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^Input/output variable name "invalid;" for @go.trim '
  err_msg+='contains invalid identifier characters at:$'

  assert_lines_match "$err_msg" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: empty string" {
  create_strings_test_script 'declare result' \
    '@go.trim "result"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success ''
}

@test "$SUITE: no leading or trailing space" {
  create_strings_test_script 'declare result="foo bar"' \
    '@go.trim "result"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo bar'
}

@test "$SUITE: trim leading space" {
  create_strings_test_script 'declare result="  foo bar"' \
    '@go.trim "result"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo bar'
}

@test "$SUITE: trim trailing space" {
  create_strings_test_script 'declare result="foo bar  "' \
    '@go.trim "result"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo bar'
}

@test "$SUITE: trim leading and trailing space" {
  create_strings_test_script 'declare result="  foo bar  "' \
    '@go.trim "result"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo bar'
}
