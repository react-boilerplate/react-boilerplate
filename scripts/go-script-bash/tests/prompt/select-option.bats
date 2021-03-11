#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    'declare selection' \
    'if @go.select_option "selection" "$@"; then' \
    '  printf "\nSelection: \"%s\"\n" "$selection"' \
    'else' \
    '  exit 1' \
    'fi'
  export PS3='Selection> '
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if selection variable not a valid identifier" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    '@go.select_option "invalid;"'

  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='Input selection variable name "invalid;" for '
  err_msg+='@go.select_option contains invalid identifier characters at:'

  assert_lines_match "^${err_msg}\$" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: no options exits instantly" {
  run "$TEST_GO_SCRIPT"
  assert_failure ''
}

@test "$SUITE: single option selection" {
  run "$TEST_GO_SCRIPT" 'foo' <<<"1"
  assert_success '1) foo' \
  "$PS3" \
  'Selection: "foo"'
}

@test "$SUITE: multiple option selection" {
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz' <<<"2"
  assert_success '1) foo' \
  '2) bar' \
  '3) baz' \
  "$PS3" \
  'Selection: "bar"'
}

@test "$SUITE: select valid option after invalid option" {
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz' <<<$'0\n3'
  assert_success '1) foo' \
  '2) bar' \
  '3) baz' \
  "$PS3\"0\" is not a valid option." \
  "$PS3" \
  'Selection: "baz"'
}

@test "$SUITE: no selection with invalid option followed by end-of-file" {
  printf '4\n' >"$TEST_GO_ROOTDIR/input.txt"
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz' <"$TEST_GO_ROOTDIR/input.txt"
  assert_failure '1) foo' \
  '2) bar' \
  '3) baz' \
  "$PS3\"4\" is not a valid option." \
  "$PS3"
}
