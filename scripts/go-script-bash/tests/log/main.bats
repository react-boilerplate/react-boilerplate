#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/log"

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: log INFO without formatting" {
  @go.run_log_script '@go.log INFO Hello, World!'
  assert_success
  @go.assert_log_equals INFO 'Hello, World!'
}

@test "$SUITE: log INFO with formatting and proper termination at end of line" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
    '@go.log INFO "\e[1m\e[36mHello, World!"' \
    'echo Goodbye, World!'
  assert_success
  @go.assert_log_equals \
    "$(@go.format_log_label INFO)" "$(printf '%b' '\e[1m\e[36mHello, World!')" \
    'Goodbye, World!'
}

@test "$SUITE: log INFO with message formatting stripped" {
  @go.run_log_script \
    '@go.log INFO "\e[1m\e[36mHello, World!"' \
    'echo Goodbye, World!'
  assert_success
  @go.assert_log_equals \
    INFO 'Hello, World!' \
    'Goodbye, World!'
}

@test "$SUITE: log INFO handle '%' in message arguments (issues 47, 55)" {
  @go.run_log_script '@go.log INFO Timestamp is "%Y-%m-%d %H:%M:%S"'
  assert_success
  @go.assert_log_equals INFO 'Timestamp is %Y-%m-%d %H:%M:%S'
}

@test "$SUITE: log WARN and return error if log level is unknown" {
  @go.run_log_script '@go.log FOOBAR Hello, World!'
  assert_failure
  @go.assert_log_equals ERROR 'Unknown log level FOOBAR; defaulting to WARN' \
    WARN  'Hello, World!'
}

@test "$SUITE: return error on ERROR" {
  # The first arg after ERROR is not the exit status; default to 1.
  @go.run_log_script '@go.log ERROR Hello, World!' \
    'declare log_error_status="$?"' \
    'if [[ "$log_error_status" -ne "0" ]]; then' \
    '  @go.log INFO error without status "$log_error_status" as expected' \
    'fi'
  assert_success
  @go.assert_log_equals ERROR 'Hello, World!' \
    INFO  'error without status 1 as expected'
}

@test "$SUITE: show status on ERROR if supplied" {
  # The first arg after ERROR is the exit status.
  @go.run_log_script '@go.log ERROR 127 Hello, World!' \
    'declare log_error_status="$?"' \
    'if [[ "$log_error_status" -ne "0" ]]; then' \
    '  @go.log INFO error with status "$log_error_status" as expected' \
    'fi'
  assert_success
  @go.assert_log_equals ERROR 'Hello, World! (exit status 127)' \
    INFO  'error with status 127 as expected'
}

@test "$SUITE: exit with error on QUIT" {
  # The first arg after QUIT is not the exit status; default to 1.
   @go.run_log_script 'if ! @go.log QUIT Hello, World!; then' \
    '  @go.log INFO This line should be unreachable.' \
    'fi'
  assert_failure
  assert_status 1
  @go.assert_log_equals QUIT 'Hello, World!'
}

@test "$SUITE: show status on QUIT if supplied" {
  # The first arg after FATAL is the exit status.
  @go.run_log_script 'if ! @go.log QUIT 127 Hello, World!; then' \
    '  @go.log INFO This line should be unreachable.' \
    'fi'
  assert_failure
  assert_status 127
  @go.assert_log_equals QUIT 'Hello, World! (exit status 127)'
}

@test "$SUITE: exit with error on FATAL" {
  # The first arg after FATAL is not the exit status; default to 1.
  @go.run_log_script 'if ! @go.log FATAL Hello, World!; then' \
    '  @go.log INFO This line should be unreachable.' \
    'fi'
  assert_failure
  assert_status 1
  @go.assert_log_equals FATAL 'Hello, World!' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
}

@test "$SUITE: show status on FATAL if supplied" {
  # The first arg after FATAL is the exit status.
  @go.run_log_script 'if ! @go.log FATAL 127 Hello, World!; then' \
    '  @go.log INFO This line should be unreachable.' \
    'fi'
  assert_failure
  assert_status 127
  @go.assert_log_equals FATAL 'Hello, World! (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
}

@test "$SUITE: exit with error if num format codes != num log levels" {
  . "$_GO_CORE_DIR/lib/log"
  local num_levels="${#_GO_LOG_LEVELS[@]}"
  unset '__GO_LOG_LEVELS_FORMAT_CODES[0]'
  run _@go.log_load

  local expected="Should have $num_levels log level format codes, "
  expected+="only have $((num_levels - 1))"
  assert_failure "$expected"
}

@test "$SUITE: exit with error if num file descriptors != num log levels" {
  . "$_GO_CORE_DIR/lib/log"
  local num_levels="${#_GO_LOG_LEVELS[@]}"
  unset '__GO_LOG_LEVELS_FILE_DESCRIPTORS[0]'
  run _@go.log_load

  local expected="Should have $num_levels log level file descriptors, "
  expected+="only have $((num_levels - 1))"
  assert_failure "$expected"
}
