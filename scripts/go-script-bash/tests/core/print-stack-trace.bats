#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/stack-trace"

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: stack trace from top level of main ./go script" {
  @go.create_test_go_script '@go.print_stack_trace'
  run "$TEST_GO_SCRIPT"
  assert_success "  $TEST_GO_SCRIPT:3 main"
}

@test "$SUITE: stack trace from top level of main ./go script without caller" {
  @go.create_test_go_script '@go.print_stack_trace 1'
  run "$TEST_GO_SCRIPT"
  assert_success ''
}

@test "$SUITE: stack trace from function inside main ./go script" {
  @go.create_test_go_script \
    'print_stack() {' \
    '  @go.print_stack_trace' \
    '}' \
    'print_stack'
  run "$TEST_GO_SCRIPT"

  local expected=("  $TEST_GO_SCRIPT:4 print_stack"
    "  $TEST_GO_SCRIPT:6 main")
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: omit function caller from stack trace" {
  @go.create_test_go_script \
    'print_stack() {' \
    "  @go.print_stack_trace 1" \
    '}' \
    'print_stack'
  run "$TEST_GO_SCRIPT"
  assert_success "  $TEST_GO_SCRIPT:6 main"
}

@test "$SUITE: bad skip_callers argument prints entire trace" {
  @go.create_test_go_script \
    'print_stack() {' \
    "  @go.print_stack_trace foobar" \
    '}' \
    'print_stack'
  run "$TEST_GO_SCRIPT"

  local error_msg=("@go.print_stack_trace argument 'foobar' not a positive"
    'integer; printing full stack')
  assert_failure
  assert_line_equals 0 "${error_msg[*]}"
  assert_line_equals 1 "  $TEST_GO_SCRIPT:4 print_stack"
  assert_line_equals 2 "  $TEST_GO_SCRIPT:6 main"
}

@test "$SUITE: skipping too many callers prints entire trace" {
  @go.create_test_go_script \
    'print_stack() {' \
    "  @go.print_stack_trace 100" \
    '}' \
    'print_stack'
  run "$TEST_GO_SCRIPT"

  local error_msg=('@go.print_stack_trace argument 100 exceeds stack size 2;'
    'printing full stack')
  assert_failure
  assert_line_equals 0 "${error_msg[*]}"
  assert_line_equals 1 "  $TEST_GO_SCRIPT:4 print_stack"
  assert_line_equals 2 "  $TEST_GO_SCRIPT:6 main"
}

@test "$SUITE: stack trace from subcommand script" {
  @go.create_test_go_script '@go "$@"'
  @go.create_test_command_script 'foo' \
    'foo_func() {' \
    '  @go foo bar' \
    '}' \
    'foo_func'
  @go.create_test_command_script 'foo.d/bar' \
    'bar_func() {' \
    '  @go.print_stack_trace 1' \
    '}' \
    'bar_func'

  run "$TEST_GO_SCRIPT" foo
  assert_success
  @go.set_go_core_stack_trace_components

  local IFS=$'\n'
  assert_lines_equal "  $TEST_GO_SCRIPTS_DIR/foo.d/bar:5 source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "  $TEST_GO_SCRIPTS_DIR/foo:3 foo_func" \
    "  $TEST_GO_SCRIPTS_DIR/foo:5 source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "  $TEST_GO_SCRIPT:3 main"
}
