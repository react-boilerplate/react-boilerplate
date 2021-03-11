#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/stack-trace"

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
  export _GO_LOG_DEMO_DELAY='0'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completion" {
  run "$TEST_GO_SCRIPT" demo-core log --complete
  assert_success '-v --verbose'

  run "$TEST_GO_SCRIPT" demo-core log --complete 1
  assert_success ''
}

@test "$SUITE: default output" {
  run "$TEST_GO_SCRIPT" demo-core log
  assert_status '1'

  local first_line='Using default log message "Hello, World!"; '
  first_line+='you may supply your own on the command line.'

  assert_line_equals 0 "$first_line"
  assert_output_matches $'\nRUN +echo Hello, World!\nHello, World!\n'
  assert_output_matches $'\nINFO +Hello, World!\n'
  assert_output_matches $'\nQUIT  +Hello, World! \(would normally exit\)\n'
  assert_output_matches $'\nFATAL +Hello, World!\n'

  @go.set_go_core_stack_trace_components
  local stack_trace_pattern

  printf -v stack_trace_pattern '\n%s' \
    "  $_GO_CORE_DIR/libexec/demo-core.d/log:[0-9]+ log_demo" \
    "  $_GO_CORE_DIR/libexec/demo-core.d/log:[0-9]+ source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "  $TEST_GO_SCRIPT:[0-9] main"
  assert_output_matches "$stack_trace_pattern"
}

@test "$SUITE: verbose output" {
  run "$TEST_GO_SCRIPT" demo-core log -v
  assert_status '1'

  local first_line='Using default log message "Hello, World!"; '
  first_line+='you may supply your own on the command line.'

  local verbose_pattern=$'\nDemonstrating @go\.log with message arguments:\n'
  verbose_pattern+=$'  Hello, World!\n\nand environment variable settings:\n'

  assert_line_equals 0 "$first_line"
  assert_output_matches "$verbose_pattern"
  assert_output_matches "declare -ax _GO_LOG_LEVELS="
  assert_output_matches $'\nINFO +Hello, World!\n'

  local orig_output="$output"
  run "$TEST_GO_SCRIPT" demo-core log --verbose
  assert_equal "$orig_output" "$output" 'output from --verbose run'
}

@test "$SUITE: command line log message" {
  run "$TEST_GO_SCRIPT" demo-core log Goodbye, World!
  assert_status '1'
  fail_if line_matches 0 'Using default log message'
  assert_output_matches $'^RUN +echo Goodbye, World!\nGoodbye, World!\n'
}

@test "$SUITE: set exit status" {
  _GO_LOG_DEMO_EXIT_STATUS='127' run "$TEST_GO_SCRIPT" demo-core log
  assert_status '127'
  assert_output_matches $'\nERROR +Hello, World! \(exit status 127\)\n'
  assert_output_matches \
    $'\nQUIT  +Hello, World! \(would normally exit\) \(exit status 127\)\n'
  assert_output_matches $'\nFATAL +Hello, World! \(exit status 127\)\n'
}

@test "$SUITE: set log file" {
  local log_file="$TEST_GO_ROOTDIR/demo.log"

  # Setting the message on the command line eliminates the "Using default log
  # message" line printed only to standard output, so the console and file
  # output should be identical.
  _GO_LOG_DEMO_FILE="$log_file" run "$TEST_GO_SCRIPT" demo-core log foo bar baz
  assert_status '1'
  assert_output_matches $'\nINFO +foo bar baz\n'
  split_bats_output_into_lines
  assert_file_equals "$log_file" "${lines[@]}"
}
