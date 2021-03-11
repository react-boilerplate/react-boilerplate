#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/log"

HAS_TIMESTAMP_BUILTIN=
DATE_CMD=
DATE_CMD_FILE=

setup() {
  if printf '%(%Y)T' &>/dev/null; then
    HAS_TIMESTAMP_BUILTIN='true'
  fi

  DATE_CMD="$(command -v date)"
  DATE_CMD_FILE="$TEST_GO_ROOTDIR/date-cmd-called"

  stub_program_in_path date \
    "declare -r DATE_CMD='$DATE_CMD'" \
    "touch '$DATE_CMD_FILE'" \
    "if [[ -n '$DATE_CMD' ]]; then" \
    '  "$DATE_CMD" "$1"' \
    'else' \
    '  exit 1' \
    'fi'

  @go.create_test_go_script '. "$_GO_USE_MODULES" log' \
    'declare __go_log_timestamp' \
    'if @go.log_timestamp; then' \
    "  printf '%s' \"\$__go_log_timestamp\"" \
    'else' \
    '  exit 1' \
    'fi'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: return error if _GO_LOG_TIMESTAMP_FORMAT not set" {
  _GO_LOG_TIMESTAMP_FORMAT= run "$BASH" "$TEST_GO_SCRIPT"
  assert_failure

  if [[ -f "$DATE_CMD_FILE" ]]; then
    fail 'date command was called'
  fi
}

@test "$SUITE: use builtin format if supported" {
  if [[ -z "$HAS_TIMESTAMP_BUILTIN" ]]; then
    skip "Builtin format not available in bash version $BASH_VERSION"
  fi

  _GO_LOG_TIMESTAMP_FORMAT='%M:%S' run "$BASH" "$TEST_GO_SCRIPT"
  assert_success
  assert_output_matches '^[0-5][0-9]:[0-5][0-9]$'

  if [[ -f "$DATE_CMD_FILE" ]]; then
    fail 'date command was called'
  fi
}

@test "$SUITE: use date command if builtin format supported" {
  if [[ -n "$HAS_TIMESTAMP_BUILTIN" ]]; then
    skip "Builtin format available in bash version $BASH_VERSION"
  elif [[ -z "$DATE_CMD" ]]; then
    skip "`date` command not found in \$PATH: $PATH"
  fi

  _GO_LOG_TIMESTAMP_FORMAT='%M:%S' run "$BASH" "$TEST_GO_SCRIPT"
  assert_success
  assert_output_matches '^[0-5][0-9]:[0-5][0-9]$'

  if [[ ! -f "$DATE_CMD_FILE" ]]; then
    fail 'date command was not called'
  fi
}

@test "$SUITE: return error value if builtin format and date command missing" {
  if [[ -n "$HAS_TIMESTAMP_BUILTIN" ]]; then
    skip "Builtin format available in bash version $BASH_VERSION"
  fi

  _GO_LOG_TIMESTAMP_FORMAT='%M:%S' PATH= run "$BASH" "$TEST_GO_SCRIPT"
  assert_failure
  assert_output_matches \
    '^WARN +Builtin timestamps not supported and date command not found.$'

  if [[ -f "$DATE_CMD_FILE" ]]; then
    fail 'date command was called'
  fi
}

@test "$SUITE: log messages prefixed with timestamp if supported" {
  @go.create_test_go_script '_GO_LOG_TIMESTAMP_FORMAT="%M:%S"' \
    '. "$_GO_USE_MODULES" log' \
    '@go.log INFO Timestamp me!'

  # Force the timestamp to be unavailable if relying upon the date command.
  _GO_LOG_TIMESTAMP_FORMAT='%M:%S' PATH= run "$BASH" "$TEST_GO_SCRIPT"
  assert_success

  if [[ -n "$HAS_TIMESTAMP_BUILTIN" ]]; then
    assert_output_matches "^[0-5][0-9]:[0-5][0-9] INFO +Timestamp me!$"
  else
    assert_line_matches 0 \
      '^WARN +Builtin timestamps not supported and date command not found.$'
    assert_line_matches 1 '^INFO +Timestamp me!$'
  fi
}
