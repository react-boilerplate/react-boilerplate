#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

create_split_test_script() {
  create_strings_test_script 'declare result=()' \
    "$1" \
    '[[ "$?" -eq "0" ]] && printf "%s\n" "${result[@]}" "END"'
}

@test "$SUITE: error if result array name not a valid identifier" {
  create_strings_test_script '@go.split "," "foo,bar,baz" "invalid;"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^Result array name "invalid;" for @go.split '
  err_msg+='contains invalid identifier characters at:$'
  assert_lines_match "$err_msg" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: empty string" {
  create_split_test_script 'result+=('foo') && @go.split "," "" "result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'END'
}

@test "$SUITE: single item" {
  create_split_test_script '@go.split "," "foo" "result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo' 'END'
}

@test "$SUITE: multiple items" {
  create_split_test_script '@go.split "," "foo,bar,baz" "result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo' 'bar' 'baz' 'END'
}

@test "$SUITE: empty delimiter returns original string without splitting" {
  # This is due to the fact that `IFS=` disables Bash word splitting.
  create_split_test_script '@go.split "" "foo,bar,baz" "result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo,bar,baz' 'END'
}

@test "$SUITE: multiple items using ASCII unit separator" {
  create_split_test_script "@go.split \$'\x1f' $'foo\x1fbar\x1fbaz' result"
  run "$TEST_GO_SCRIPT"
  assert_success 'foo' 'bar' 'baz' 'END'
}

@test "$SUITE: multiple items containing newlines using ASCII unit separator" {
  create_split_test_script \
    "@go.split \$'\x1f' $'foo\nquux\x1fbar\nxyzzy\x1fbaz\nplugh' result"
  run "$TEST_GO_SCRIPT"
  assert_success 'foo' 'quux' 'bar' 'xyzzy' 'baz' 'plugh' 'END'
}

@test "$SUITE: split items into same variable" {
  create_strings_test_script 'declare items="foo,bar,baz"' \
    '@go.split "," "$items" "items"' \
    '[[ "$?" -eq "0" ]] && printf "%s\n" "${items[@]}" "END"'
  run "$TEST_GO_SCRIPT"
  assert_success 'foo' 'bar' 'baz' 'END'
}
