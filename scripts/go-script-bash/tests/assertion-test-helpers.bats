#! /usr/bin/env bats

load environment

ASSERTION_SOURCE="$_GO_CORE_DIR/tests/assertion-test-helpers.bash"
load "$_GO_CORE_DIR/lib/bats/assertion-test-helpers"

EXPECT_ASSERTION_TEST_SCRIPT="run-expect-assertion.bats"
EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE=

setup() {
  test_filter
  export ASSERTION=
  printf -v 'EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE' \
    "${ASSERTION_TEST_SCRIPT_FAILURE_MESSAGE//$'\n'/$'\n# '}" "test_assertion"
}

teardown() {
  remove_bats_test_dirs
  rm -rf "$BATS_TMPDIR/bin"
}

emit_debug_info() {
  printf 'STATUS: %s\nOUTPUT:\n%s\n' "$status" "$output" >&2
}

create_failing_test_stub() {
  local cmd_name="$1"
  local cmd_path="$BATS_TMPDIR/bin/$cmd_name"

  if [[ ! -d "$BATS_TMPDIR/bin" ]]; then
    mkdir -p "$BATS_TMPDIR/bin"
  fi
  printf '%s\n' '#! /usr/bin/env bash' \
    'printf "ARG: \"%s\"\n" "$@"' 'exit 1' >"$cmd_path"
  chmod 755 "$cmd_path"
  PATH="$BATS_TMPDIR/bin:$PATH"
  hash "$cmd_name"
}

remove_failing_test_stub() {
  local cmd_name="$1"
  rm -f "$BATS_TMPDIR/bin/$cmd_name"
  hash "$cmd_name"
}

run_assertion_test() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  setup_assertion_test "$@"
  restore_bats_shell_options
  run "$ASSERTION_TEST_ROOTDIR/$EXPECT_ASSERTION_TEST_SCRIPT"
}

setup_assertion_test() {
  local expected_output=("${@:2}")
  local expected_output_line

  ASSERTION="expect_assertion_${1}"
  ASSERTION+=" 'echo foo bar baz' 'test_assertion \"\$output\"'"

  for expected_output_line in "${expected_output[@]}"; do
    ASSERTION+=$' \\\n    '"'$expected_output_line'"
  done

  create_bats_test_script "$EXPECT_ASSERTION_TEST_SCRIPT" \
    '#! /usr/bin/env bats' \
    '' \
    "ASSERTION_SOURCE='$ASSERTION_SOURCE'" \
    ". '$_GO_CORE_DIR/lib/bats/assertion-test-helpers'" \
    '' \
    "@test \"$BATS_TEST_DESCRIPTION\" {" \
    "  $ASSERTION" \
    '}'
}

check_failure_output() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __check_failure_output "$@"
  restore_bats_shell_options "$?"
}

__check_failure_output() {
  local test_script="$ASSERTION_TEST_ROOTDIR/$EXPECT_ASSERTION_TEST_SCRIPT"
  local assertion_line="${ASSERTION%%$'\n'*}"
  local expected_output
  local result='0'

  printf -v expected_output '%s\n' \
    '1..1' \
    "not ok 1 $BATS_TEST_DESCRIPTION" \
    "# (in test file $test_script, line 7)" \
    "#   \`$assertion_line' failed" \
    "$@"
  # Trim the trailing newline, as it will've been from `output`.
  expected_output="${expected_output%$'\n'}"

  # We have to trim the last newline off the expected message, since it will've
  # been trimmed from `output`.
  if [ "$output" != "${expected_output}" ]; then
    printf 'EXPECTED:\n%s\nACTUAL:\n%s\n' "${expected_output}" "$output" >&2
    result='1'
  fi
  unset 'BATS_CURRENT_STACK_TRACE[0]' 'BATS_PREVIOUS_STACK_TRACE[0]'
  return "$result"
}

check_matches() {
  [[ "$1" =~ $2 ]]
}

@test "$SUITE: printf_with_error" {
  run printf_with_error 'foo bar baz'
  emit_debug_info
  [ "$status" -eq '1' ]
  [ "$output" == 'foo bar baz' ]

  PRINTF_ERROR='127' run printf_with_error 'foo bar baz'
  emit_debug_info
  [ "$status" -eq '127' ]
  [ "$output" == 'foo bar baz' ]
}

@test "$SUITE: printf_to_test_output_file" {
  run printf_to_test_output_file 'foo bar baz'
  emit_debug_info
  [ "$status" -eq '0' ]
  [ -z "$output" ]
  [ "$(< "$TEST_OUTPUT_FILE")" == 'foo bar baz' ]
}

@test "$SUITE: error if ASSERTION_SOURCE not set" {
  ASSERTION_SOURCE= run_assertion_test
  emit_debug_info
  [ "$status" -eq '1' ]

  local err_msg='"ASSERTION_SOURCE" must be set before sourcing '
  err_msg+="$_GO_CORE_DIR/lib/bats/assertion-test-helpers."
  [ "$output" == "$err_msg" ]
}

@test "$SUITE: fail to create assertion test script parent dir" {
  create_failing_test_stub 'mkdir'
  run __run_assertion_test_script
  remove_failing_test_stub 'mkdir'

  local expected
  printf -v expected '%s\n' 'ARG: "-p"' "ARG: \"${ASSERTION_TEST_SCRIPT%/*}\""
  expected+='Failed to create parent directory for assertion test script: '
  expected+="$ASSERTION_TEST_SCRIPT"

  printf 'EXPECTED OUTPUT:\n%s\n' "$expected"
  emit_debug_info
  [ "$status" -eq '1' ]
  [ "$output" == "$expected" ]
}

@test "$SUITE: fail to create the assertion test script" {
  skip_if_cannot_trigger_file_permission_failure
  mkdir "$ASSERTION_TEST_ROOTDIR"
  chmod ugo-w "$ASSERTION_TEST_ROOTDIR"
  run __run_assertion_test_script

  local printf_err_pattern="$_GO_CORE_DIR/lib/bats/assertion-test-helpers: "
  printf_err_pattern+="line [1-9][0-9]*: $ASSERTION_TEST_SCRIPT: "
  printf_err_pattern+='Permission denied'
  printf 'EXPECTED PRINTF ERROR PATTERN:\n%s\n' "$printf_err_pattern" >&2

  local err_msg="Failed to create assertion test script: $ASSERTION_TEST_SCRIPT"
  printf 'EXPECTED FAILURE MESSAGE:\n%s\n' "$err_msg" >&2

  emit_debug_info
  [ "$status" -eq '1' ]
  check_matches "${lines[0]}" "$printf_err_pattern"
  [ "${lines[1]}" == "$err_msg" ]
}

@test "$SUITE: fail to set permissions for the assertion test script" {
  create_failing_test_stub 'chmod'
  run __run_assertion_test_script
  remove_failing_test_stub 'chmod'

  local expected
  printf -v expected '%s\n' 'ARG: "755"' "ARG: \"$ASSERTION_TEST_SCRIPT\""
  expected+='Failed to set permissions for assertion test script: '
  expected+="$ASSERTION_TEST_SCRIPT"

  printf 'EXPECTED OUTPUT:\n%s\n' "$expected"
  emit_debug_info
  [ "$status" -eq '1' ]
  [ "$output" == "$expected" ]
}

@test "$SUITE: successful assertion" {
  run_assertion_test 'success'
  emit_debug_info
  [ "$status" -eq '0' ]
  [ "$output" == $'1..1\nok 1 '"$BATS_TEST_DESCRIPTION" ]
}

@test "$SUITE: expected success, but failed with nonzero status" {
  ASSERTION_STATUS='127' run_assertion_test 'success'
  [ "$status" -eq '1' ]

  check_failure_output '# In subshell: expected passing status, actual 127' \
    '# Output:' \
    '# foo bar baz'
}

@test "$SUITE: expected success, but failed and wrote to fd other than 2 " {
  ASSERTION_STATUS='127' ASSERTION_FD='1' run_assertion_test 'success'
  [ "$status" -eq '1' ]

  local expected_output="# 'test_assertion' tried to write to standard output "
  expected_output+='instead of standard error'
  check_failure_output "$expected_output"
}

@test "$SUITE: successful assertion should not produce output" {
  # Make sure a missing newline doesn't throw off the expected (empty) output.
  ASSERTION_FORCE_OUTPUT='true' ASSERTION_WITHHOLD_NEWLINE='true' \
    run_assertion_test 'success'
  [ "$status" -eq '1' ]
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# ' \
    '# --------' \
    '# ACTUAL:' \
    '# foo bar baz' \
    '# --------' \
    "# 'test_assertion' should not produce output when successful."
}

@test "$SUITE: successful assertion must call restore_bats_shell_options" {
  SKIP_RETURN_FROM_BATS_ASSERTION='true' run_assertion_test 'success'
  [ "$status" -eq '1' ]

  local test_script="$ASSERTION_TEST_SCRIPT"
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (from function \`failing_assertion' in file $test_script, line 5," \
    "# #  in test file $test_script, line 7)" \
    "# #   \`failing_assertion' failed" \
    '# --------' \
    '# ACTUAL:' \
    '# 1..1' \
    "# ok 1 $BATS_TEST_DESCRIPTION" \
    '# --------' \
    "# $EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE"
}

@test "$SUITE: successful assertion restore_bats_shell_options must be direct" {
  DELEGATE_RETURN_FROM_BATS_ASSERTION='true' run_assertion_test 'success'
  [ "$status" -eq '1' ]

  local test_script="$ASSERTION_TEST_SCRIPT"
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (from function \`failing_assertion' in file $test_script, line 5," \
    "# #  in test file $test_script, line 7)" \
    "# #   \`failing_assertion' failed" \
    '# --------' \
    '# ACTUAL:' \
    '# 1..1' \
    "# ok 1 $BATS_TEST_DESCRIPTION" \
    '# --------' \
    "# $EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE"
}

@test "$SUITE: failing assertion" {
  ASSERTION_STATUS='1' run_assertion_test 'failure' 'foo bar baz'
  emit_debug_info
  [ "$status" -eq '0' ]
  [ "$output" == $'1..1\nok 1 '"$BATS_TEST_DESCRIPTION" ]
}

@test "$SUITE: failing assertion with status other than 1" {
  ASSERTION_STATUS='127' run_assertion_test 'failure' 'foo bar baz'
  emit_debug_info
  [ "$status" -eq '0' ]
  [ "$output" == $'1..1\nok 1 '"$BATS_TEST_DESCRIPTION" ]
}

@test "$SUITE: failing assertion produces unexpected output" {
  ASSERTION_STATUS='1' ASSERTION_EXTRA_OUTPUT=' quux xyzzy plugh' \
    run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# foo bar baz' \
    '# --------' \
    '# ACTUAL:' \
    '# foo bar baz quux xyzzy plugh' \
    '# --------'
}

@test "$SUITE: failing assertion output must go to standard error" {
  ASSERTION_STATUS='1' ASSERTION_FD=1 run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]

  local expected_output="# 'test_assertion' tried to write to standard output "
  expected_output+='instead of standard error'
  check_failure_output "$expected_output"
}

@test "$SUITE: failing assertion doesn't end output with newline" {
  ASSERTION_STATUS='1' ASSERTION_WITHHOLD_NEWLINE='true' \
    run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]
  check_failure_output \
    '# "test_assertion" output does not end with a newline character:' \
    '# foo bar baz'
}

@test "$SUITE: expected_failure, but assertion succeeds" {
  ASSERTION_STATUS='0' run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]
  check_failure_output '# In subshell: expected failure, but succeeded' \
    '# Output:' \
    '# '
}

@test "$SUITE: failing assertion must disable shell options" {
  ASSERTION_STATUS='1' TEST_ASSERTION_SHELL_OPTIONS='-eET' \
    run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]

  local test_script="$ASSERTION_TEST_SCRIPT"
  local impl_file="${ASSERTION_SOURCE#$_GO_CORE_DIR/}"
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (in test file $test_script, line 5)" \
    "# #   \`test_assertion \"\$output\"' failed" \
    '# # foo bar baz' \
    '# --------' \
    '# ACTUAL:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (from function \`__test_assertion_impl' in file $impl_file, line 21," \
    "# #  from function \`test_assertion' in file $impl_file, line 31," \
    "# #  in test file $test_script, line 5)" \
    "# #   \`test_assertion \"\$output\"' failed" \
    '# # foo bar baz' \
    '# --------' \
    "# $EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE"
}

@test "$SUITE: failing assertion must call restore_bats_shell_options" {
  ASSERTION_STATUS='1' SKIP_RETURN_FROM_BATS_ASSERTION='true' \
    run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]

  local test_script="$ASSERTION_TEST_SCRIPT"
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (in test file $test_script, line 5)" \
    "# #   \`test_assertion \"\$output\"' failed" \
    '# # foo bar baz' \
    '# --------' \
    '# ACTUAL:' \
    '# 1..1' \
    "# ok 1 $BATS_TEST_DESCRIPTION" \
    '# --------' \
    "# $EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE"
}

@test "$SUITE: failing assertion restore_bats_shell_options must be direct" {
  ASSERTION_STATUS='1' DELEGATE_RETURN_FROM_BATS_ASSERTION='true' \
    run_assertion_test 'failure' 'foo bar baz'
  [ "$status" -eq '1' ]

  local test_script="$ASSERTION_TEST_SCRIPT"
  check_failure_output '# Actual output differs from expected output:' \
    '# --------' \
    '# EXPECTED:' \
    '# 1..1' \
    "# not ok 1 $BATS_TEST_DESCRIPTION" \
    "# # (in test file $test_script, line 5)" \
    "# #   \`test_assertion \"\$output\"' failed" \
    '# # foo bar baz' \
    '# --------' \
    '# ACTUAL:' \
    '# 1..1' \
    "# ok 1 $BATS_TEST_DESCRIPTION" \
    '# --------' \
    "# $EXPECTED_TEST_SCRIPT_FAILURE_MESSAGE"
}
