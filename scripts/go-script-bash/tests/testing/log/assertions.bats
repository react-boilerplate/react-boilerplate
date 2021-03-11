#! /usr/bin/env bats

load ../../environment

ASSERTION_SOURCE="$_GO_CORE_DIR/lib/testing/log"
load "$_GO_CORE_DIR/lib/bats/assertion-test-helpers"

setup() {
  test_filter
  mkdir -p "$TEST_GO_ROOTDIR"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: assert_log_equals empty output" {
  expect_assertion_success ':' '@go.assert_log_equals'
}

@test "$SUITE: assert_log_equals single non-@go.log line" {
  expect_assertion_success 'printf "Hello, World!\n"' \
    '@go.assert_log_equals "Hello, World!"'
}

@test "$SUITE: assert_log_equals single @go.log line" {
  @go.create_log_script '@go.log INFO Hello, World!'
  expect_assertion_success "'$TEST_GO_SCRIPT'" \
    '@go.assert_log_equals INFO "Hello, World!"'
}

@test "$SUITE: assert_log_equals single formatted @go.log line" {
  @go.create_log_script '@go.log INFO Hello, World!'
  _GO_LOG_FORMATTING='true' expect_assertion_success "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_equals \"\$(@go.format_log_label INFO)\" 'Hello, World!'"
}

@test "$SUITE: assert_log_equals multiple mixed lines" {
  @go.create_log_script '@go.log INFO Hello, World!' \
    'printf "%s\n" "Not a @go.log line."' \
    '@go.log WARN Goodbye, World!' \
    'printf "%s\n" "Also not a @go.log line."'

  local args=("'INFO' 'Hello, World!'"
    "'Not a @go.log line.'"
    "'WARN' 'Goodbye, World!'"
    "'Also not a @go.log line.'")
  expect_assertion_success "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_equals ${args[*]}"
}

@test "$SUITE: assert_log_equals multiple mixed lines with formatting" {
  @go.create_log_script '@go.log INFO Hello, World!' \
    'printf "%s\n" "Not a @go.log line."' \
    '@go.log WARN Goodbye, World!' \
    'printf "%s\n" "Also not a @go.log line."'

  local args=("\"\$(@go.format_log_label INFO)\" 'Hello, World!'"
    "'Not a @go.log line.'"
    "\"\$(@go.format_log_label WARN)\" 'Goodbye, World!'"
    "'Also not a @go.log line.'")
  _GO_LOG_FORMATTING='true' expect_assertion_success "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_equals ${args[*]}"
}

@test "$SUITE: assert_log_equals error if wrong number of log line args" {
  @go.create_log_script '@go.log INFO Hello, World!'
  expect_assertion_failure "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_equals 'INFO' 'Hello, World!' 'INFO'" \
    'ERROR: Wrong number of arguments for log line 1.'
}

@test "$SUITE: assert_log_equals fails if line doesn't match" {
  local info_label="$(@go.format_log_label INFO)"
  local end_format_code="$(printf '%b' '\e[0m')"

  @go.create_log_script '@go.log INFO Goodbye, World!'
  _GO_LOG_FORMATTING='true' expect_assertion_failure "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_equals \"\$(@go.format_log_label INFO)\" 'Hello, World!'" \
    'line 0 not equal to expected value:' \
    "  expected: '$info_label Hello, World!$end_format_code'" \
    "  actual:   '$info_label Goodbye, World!$end_format_code'" \
    'OUTPUT:' \
    "$info_label Goodbye, World!$end_format_code"
}

@test "$SUITE: assert_log_file_equals returns error if file doesn't exist" {
  expect_assertion_failure ':' "@go.assert_log_file_equals 'nonexistent.log'" \
    "'nonexistent.log' doesn't exist or isn't a regular file."
}

@test "$SUITE: assert_log_file_equals empty output" {
  expect_assertion_success "printf '' >'$TEST_GO_ROOTDIR/empty.log'" \
    "@go.assert_log_file_equals '$TEST_GO_ROOTDIR/empty.log'"
}

@test "$SUITE: assert_log_file_equals multiple mixed lines with formatting" {
  export TEST_LOG_FILE="$TEST_GO_ROOTDIR/test.log"

  # We need to clear the `TEST_LOG_FILE` between the two runs performed by
  # `expect_assertion_success`, since `@go.log` will append to the file.
  @go.create_log_script "printf '' >'$TEST_LOG_FILE'" \
    '@go.log INFO Hello, World!' \
    'printf "%s\n" "Not a @go.log line."' \
    '@go.log WARN Goodbye, World!' \
    'printf "%s\n" "Also not a @go.log line."'

  # Note that the file should only get the `@go.log` lines.
  local args=("\"\$(@go.format_log_label INFO)\" 'Hello, World!'"
    "\"\$(@go.format_log_label WARN)\" 'Goodbye, World!'")
  _GO_LOG_FORMATTING='true' expect_assertion_success "'$TEST_GO_SCRIPT'" \
    "@go.assert_log_file_equals \"\$TEST_LOG_FILE\" ${args[*]}"
}
