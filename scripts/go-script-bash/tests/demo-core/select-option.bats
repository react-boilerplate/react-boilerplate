#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  export PS3='Selection> '
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: use default selection options" {
  run "$_GO_SCRIPT" demo-core select-option <<<$'1\nYes\n2\nNo'
  assert_success
  split_bats_output_into_lines

  local select_affirmative='Would you like to select another option? [Y/n] '
  select_affirmative+='Please select one of the following options:'

  assert_lines_equal 'Please select one of the following options:' \
    '1) Hello, World!' \
    '2) Goodbye, World!' \
    "${PS3}You selected: \"Hello, World!\"" \
    '' \
    "${select_affirmative}" \
    '1) Hello, World!' \
    '2) Goodbye, World!' \
    "${PS3}You selected: \"Goodbye, World!\"" \
    '' \
    'Would you like to select another option? [Y/n] Exiting...'
}

@test "$SUITE: use user-provided selection options" {
  run "$_GO_SCRIPT" demo-core select-option foo bar baz <<<$'2\nNo'
  assert_success
  split_bats_output_into_lines
  assert_lines_equal 'Please select one of the following options:' \
    '1) foo' \
    '2) bar' \
    '3) baz' \
    "${PS3}You selected: \"bar\"" \
    '' \
    'Would you like to select another option? [Y/n] Exiting...'
}

@test "$SUITE: exit prompt and program on empty input terminated by EOF" {
  mkdir "$TEST_GO_ROOTDIR"
  printf '' >"$TEST_GO_ROOTDIR/input.txt"
  run "$_GO_SCRIPT" demo-core select-option foo bar baz \
    <"$TEST_GO_ROOTDIR/input.txt"

  assert_failure
  split_bats_output_into_lines
  assert_lines_equal 'Please select one of the following options:' \
    '1) foo' \
    '2) bar' \
    '3) baz' \
    "${PS3}" \
    'You declined to select an option. Exiting...'
}
