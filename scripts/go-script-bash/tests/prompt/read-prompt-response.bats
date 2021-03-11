#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if response variable not a valid identifier" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    '@go.read_prompt_response "invalid;"'

  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='Input prompt response variable name "invalid;" for '
  err_msg+='@go.read_prompt_response contains invalid identifier characters at:'

  assert_lines_match "^${err_msg}\$" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: reads and trims variable value, backslashes aren't special" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    'declare response="initial value"' \
    '@go.read_prompt_response "response"' \
    'printf -- "%s\n" "$response"'

  run "$TEST_GO_SCRIPT" <<<"   Hello, World! \ Goodbye, World!  "
  assert_success 'Hello, World! \ Goodbye, World!'
}
