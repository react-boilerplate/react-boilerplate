#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/log"

INFO_FORMAT='\e[1m\e[36m'
START_FORMAT='\e[1m\e[32m'

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: fail if logging already initialized" {
  @go.run_log_script '@go.log INFO Hello, World!' \
    '@go.add_or_update_log_level INFO keep keep'
  assert_failure
  @go.assert_log_equals INFO 'Hello, World!' \
    FATAL "Can't set logging level INFO; already initialized" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: fail if file descriptor isn't a positive integer" {
  @go.run_log_script '@go.add_or_update_log_level INFO keep 0'
  assert_failure
  @go.assert_log_equals FATAL "File descriptor 0 for INFO must be > 0" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: fail if file descriptor isn't open" {
  @go.run_log_script '@go.add_or_update_log_level INFO keep 27'
  assert_failure
  @go.assert_log_equals FATAL "File descriptor 27 for INFO isn't open" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: fail if keeping the format code for a nonexistent level" {
  @go.run_log_script '@go.add_or_update_log_level FOOBAR keep 1'
  assert_failure
  @go.assert_log_equals \
    FATAL "Can't keep defaults for nonexistent log level FOOBAR" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: fail if keeping the file descriptor for a nonexistent level" {
  @go.run_log_script "@go.add_or_update_log_level FOOBAR '$INFO_FORMAT' keep"
  assert_failure
  @go.assert_log_equals \
    FATAL "Can't keep defaults for nonexistent log level FOOBAR" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
}

@test "$SUITE: add new log level" {
  _GO_LOG_FORMATTING='true' @go.run_log_script 'exec 27>logfile' \
    "@go.add_or_update_log_level FOOBAR '$INFO_FORMAT' 27" \
    '@go.log FOOBAR Hello, World!'
  assert_success ''
  assert_file_equals "$TEST_GO_ROOTDIR/logfile" \
    "$(printf "${INFO_FORMAT}FOOBAR\e[0m Hello, World!\e[0m\n")"
}

@test "$SUITE: add new log level defaulting to standard output" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    "@go.add_or_update_log_level FOOBAR '$INFO_FORMAT'" \
    '@go.log FOOBAR Hello, World!'
  assert_success "$(printf "${INFO_FORMAT}FOOBAR\e[0m Hello, World!\e[0m\n")"
}

@test "$SUITE: update format of existing log level" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    "@go.add_or_update_log_level INFO '$START_FORMAT' keep" \
    '@go.log INFO Hello, World!'
  assert_success "$(printf "${START_FORMAT}INFO\e[0m   Hello, World!\e[0m\n")"
}

@test "$SUITE: update file descriptor of existing log level" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    'exec 27>logfile' \
    '@go.add_or_update_log_level INFO keep 27' \
    '@go.log INFO Hello, World!'
  assert_success ''
  assert_file_equals "$TEST_GO_ROOTDIR/logfile" \
    "$(printf "${INFO_FORMAT}INFO\e[0m   Hello, World!\e[0m\n")"
}

@test "$SUITE: update format and file descriptor of existing log level" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    'exec 27>logfile' \
    "@go.add_or_update_log_level INFO '$START_FORMAT' 27" \
    '@go.log INFO Hello, World!'
  assert_success ''
  assert_file_equals "$TEST_GO_ROOTDIR/logfile" \
    "$(printf "${START_FORMAT}INFO\e[0m   Hello, World!\e[0m\n")"
}
