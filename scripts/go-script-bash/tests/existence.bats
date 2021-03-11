#! /usr/bin/env bats

load environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: check_file_exists" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "existence"' \
    '@go.check_file_exists "$@"'
  run "$TEST_GO_SCRIPT" 'Foo config' "$TEST_GO_ROOTDIR/foo"
  assert_failure "Foo config doesn't exist: $TEST_GO_ROOTDIR/foo"

  printf '' >"$TEST_GO_ROOTDIR/foo"
  run "$TEST_GO_SCRIPT" 'Foo config' "$TEST_GO_ROOTDIR/foo"
  assert_success ''
}

@test "$SUITE: check_file_readable" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "existence"' \
    '@go.check_file_readable "$@"'
  run "$TEST_GO_SCRIPT" 'Foo config' "$TEST_GO_ROOTDIR/foo"
  assert_failure \
    "Foo config doesn't exist or isn't readable: $TEST_GO_ROOTDIR/foo"

  printf '' >"$TEST_GO_ROOTDIR/foo"
  run "$TEST_GO_SCRIPT" 'Foo config' "$TEST_GO_ROOTDIR/foo"
  assert_success ''
}

@test "$SUITE: check_file_readable fails if no read permission" {
  skip_if_cannot_trigger_file_permission_failure
  @go.create_test_go_script '. "$_GO_USE_MODULES" "existence"' \
    '@go.check_file_readable "$@"'
  printf '' >"$TEST_GO_ROOTDIR/foo"
  chmod ugo-r "$TEST_GO_ROOTDIR/foo"

  run "$TEST_GO_SCRIPT" 'Foo config' "$TEST_GO_ROOTDIR/foo"
  assert_failure \
    "Foo config doesn't exist or isn't readable: $TEST_GO_ROOTDIR/foo"
}

@test "$SUITE: pick_command" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "existence"' \
    'declare selected_cmd' \
    'if @go.pick_command "selected_cmd" "$@"; then' \
    '  printf "%s\n" "$selected_cmd"' \
    'else' \
    '  exit 1' \
    'fi'
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz'
  assert_failure "None of the following commands were found on the system:" \
    '  foo' \
    '  bar' \
    '  baz'

  stub_program_in_path 'baz'
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz'
  assert_success 'baz'

  stub_program_in_path 'bar'
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz'
  assert_success 'bar'

  stub_program_in_path 'foo'
  run "$TEST_GO_SCRIPT" 'foo' 'bar' 'baz'
  assert_success 'foo'
}

@test "$SUITE: check_command_installed" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "existence"' \
    '@go.check_command_installed "$@"'
  run "$TEST_GO_SCRIPT" 'foobar'
  assert_failure 'Please install foobar on your system and try again.'

  run "$TEST_GO_SCRIPT" 'foobar' 'Foo Bar'
  assert_failure 'Please install Foo Bar on your system and try again.'

  stub_program_in_path 'foobar'
  run "$TEST_GO_SCRIPT" 'foobar' 'Foo Bar'
  assert_success ''
}
