#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/log"

teardown() {
  @go.remove_test_go_rootdir
}

run_log_script_and_assert_status_and_output() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  local num_errors
  local expected

  @go.run_log_script "$@" \
    '@go.log INFO  FYI' \
    '@go.log RUN   echo foo' \
    '@go.log WARN  watch out' \
    '@go.log ERROR uh-oh' \
    '@go.log FATAL oh noes!'

  if assert_failure; then
    expected=(INFO 'FYI'
      RUN   'echo foo'
      WARN  'watch out'
      ERROR 'uh-oh'
      FATAL 'oh noes!'
      "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")")

    @go.assert_log_equals "${expected[@]}"
    restore_bats_shell_options "$?"
  else
    restore_bats_shell_options 1
  fi
}

@test "$SUITE: exit if adding output file after logging already initiaized" {
  local log_file="$TEST_GO_ROOTDIR/all.log"

  @go.run_log_script \
    "@go.log INFO Hello, World!" \
    "@go.log_add_output_file '$log_file'"
  assert_failure
  @go.assert_log_equals \
    INFO 'Hello, World!' \
    FATAL "Can't add new output file $log_file; logging already initialized" \
    "$(@go.stack_trace_item "$_GO_CORE_DIR/lib/log" '@go.log_add_output_file' \
      "    @go.log FATAL \"Can't add new output file \$output_file;\" \\")" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: add an output file for all log levels" {
  run_log_script_and_assert_status_and_output \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/all.log'"
  assert_file_equals "$TEST_GO_ROOTDIR/all.log" "${lines[@]}"
}

@test "$SUITE: add an output file for an existing log level" {
  run_log_script_and_assert_status_and_output \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/info.log' 'INFO'"
  assert_file_matches "$TEST_GO_ROOTDIR/info.log" "^INFO +FYI$"
}

@test "$SUITE: force formatted output in log file" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/info.log' 'INFO'" \
    "@go.log INFO Hello, World!"
  assert_success
  @go.assert_log_equals "$(@go.format_log_label INFO)" 'Hello, World!'
  assert_file_equals "$TEST_GO_ROOTDIR/info.log" "${lines[@]}"
}

@test "$SUITE: add an output file for a new log level" {
  local msg="This shouldn't appear in standard output or error."

  # Note that FOOBAR has the same number of characters as FINISH, currently the
  # longest log label name. If FINISH is ever removed without another
  # six-character label taking its place, the test may fail because of changes
  # in label padding. The fix would be to replace FOOBAR with a new name no
  # longer than the longest built-in log label.
  run_log_script_and_assert_status_and_output \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/foobar.log' 'FOOBAR'" \
    "@go.log FOOBAR \"$msg\""

  assert_file_matches "$TEST_GO_ROOTDIR/foobar.log" "^FOOBAR +$msg$"
}

@test "$SUITE: add output files for multiple log levels" {
  run_log_script_and_assert_status_and_output \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/error.log' 'ERROR,FATAL'"

  assert_file_lines_match "$TEST_GO_ROOTDIR/error.log" \
    '^ERROR +uh-oh$' \
    '^FATAL +oh noes!$' \
    "^$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")\$"
}

@test "$SUITE: add output files for a mix of levels" {
  local msg="This shouldn't appear in standard output or error."

  # Same note regarding FOOBAR from the earlier test case applies.
  run_log_script_and_assert_status_and_output \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/info.log' 'INFO'" \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/all.log'" \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/error.log' 'ERROR,FATAL'" \
    "@go.log_add_output_file '$TEST_GO_ROOTDIR/foobar.log' 'FOOBAR'" \
    "@go.log FOOBAR \"$msg\""

  assert_file_equals "$TEST_GO_ROOTDIR/all.log" "${lines[@]}"
  assert_file_matches "$TEST_GO_ROOTDIR/info.log" "^INFO +FYI$"
  assert_file_matches "$TEST_GO_ROOTDIR/foobar.log" "^FOOBAR +$msg$"

  assert_file_lines_match "$TEST_GO_ROOTDIR/error.log" \
    '^ERROR +uh-oh$' \
    '^FATAL +oh noes!$' \
    "^$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")\$"
}
