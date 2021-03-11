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
  create_strings_test_script '@go.join "," "invalid;" "foo" "bar" "baz"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^Result variable name "invalid;" for @go.join '
  err_msg+='contains invalid identifier characters at:$'

  assert_lines_match "$err_msg" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: empty string" {
  create_strings_test_script 'declare result=()' \
    '@go.join "," "result" ""' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success ''
}

@test "$SUITE: single item" {
  create_strings_test_script 'declare result=()' \
    '@go.join "," "result" "--foo"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success '--foo'
}

@test "$SUITE: multiple items" {
  create_strings_test_script 'declare result=()' \
    '@go.join "," "result" "--foo" "bar" "baz"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success '--foo,bar,baz'
}

@test "$SUITE: multiple items containing '%'" {
  create_strings_test_script 'declare result=()' \
    '@go.join "," "result" "This \"%/\" is from #98" "--foo" "bar" "baz"' \
    'echo "$result"'
  run "$TEST_GO_SCRIPT"
  assert_success 'This "%/" is from #98,--foo,bar,baz'
}

@test "$SUITE: join items into same variable" {
  create_strings_test_script 'declare items=("--foo" "bar" "baz")' \
    '@go.join "," "items" "${items[@]}"' \
    'echo "$items"'
  run "$TEST_GO_SCRIPT"
  assert_success '--foo,bar,baz'
}
