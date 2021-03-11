#! /usr/bin/env bats

load environment

TEST_SCRIPT="$BATS_TMPDIR/test-script"
NUM_ERRORS=

setup() {
  NUM_ERRORS='0'
}

teardown() {
  rm "$TEST_SCRIPT"
}

create_test_script() {
  local test_case_name="$1"
  local test_case_impl=("${@:2}")
  local script=('#! /usr/bin/env bats'
    ''
    ". '$_GO_CORE_DIR/lib/bats/helper-function'"
    ''
    'foo() {'
    '  set "$DISABLE_BATS_SHELL_OPTIONS"'
    '  restore_bats_shell_options "$1"'
    '}'
    ''
    'bar() {'
    '  set "$DISABLE_BATS_SHELL_OPTIONS"'
    '  foo "$1"'
    '  restore_bats_shell_options "$?"'
    '}'
    ''
    "@test \"$test_case_name\" {"
    "${test_case_impl[@]}"
    '}')
  printf '%s\n' "${script[@]}" >"$TEST_SCRIPT"
  chmod 755 "$TEST_SCRIPT"
}

check_status() {
  local expected="$1"
  if [[ "$status" -ne "$expected" ]]; then
    printf 'Expected status %d, got: %d\n' "$expected" "$status" >&2
    ((++NUM_ERRORS))
  fi
}

check_line() {
  local lineno="$1"
  local expected="$2"
  if [[ "${lines[$lineno]}" != "$expected" ]]; then
    printf "line %d doesn't match expected:\n" "$lineno" >&2
    printf '  expected: "%s"\n' "$expected" >&2
    printf '  actual:   "%s"\n' "${lines[$lineno]}" >&2
    ((++NUM_ERRORS))
  fi
}

check_line_matches() {
  local lineno="$1"
  local pattern="$2"
  if [[ ! "${lines[$lineno]}" =~ $pattern ]]; then
    printf "line %d doesn't match pattern:\n" "$lineno" >&2
    printf '  pattern: "%s"\n' "$pattern" >&2
    printf '  value:   "%s"\n' "${lines[$lineno]}" >&2
    ((++NUM_ERRORS))
  fi
}

finish() {
  if [[ "$NUM_ERRORS" -ne '0' ]]; then
    printf 'Total errors: %d\n' "$NUM_ERRORS" >&2
    printf 'OUTPUT:\n%s\n' "$output" >&2
    return 1
  fi
}

@test "$SUITE: helper function passes" {
  create_test_script 'foo passes' 'foo'
  run "$_GO_BATS_PATH" "$TEST_SCRIPT"
  check_status '0'
  check_line '0' '1..1'
  check_line '1' 'ok 1 foo passes'
  finish
}

@test "$SUITE: helper function fails" {
  create_test_script 'foo fails' 'foo 1'
  run "$_GO_BATS_PATH" "$TEST_SCRIPT"
  check_status '1'
  check_line 0 '1..1'
  check_line 1 'not ok 1 foo fails'
  check_line_matches 2 "# \(in test file $TEST_SCRIPT, line [1-9][0-9]*\)" \
  check_line 3 "#   \`foo 1' failed"
  finish
}

@test "$SUITE: nested helper function passes" {
  create_test_script 'bar passes' 'bar'
  run "$_GO_BATS_PATH" "$TEST_SCRIPT"
  check_status '0'
  check_line '0' '1..1'
  check_line '1' 'ok 1 bar passes'
  finish
}

@test "$SUITE: nested helper function fails" {
  create_test_script 'bar fails' 'bar 1'
  run "$_GO_BATS_PATH" "$TEST_SCRIPT"
  check_status '1'
  check_line 0 '1..1'
  check_line 1 'not ok 1 bar fails'
  check_line_matches 2 "# \(in test file $TEST_SCRIPT, line [1-9][0-9]*\)" \
  check_line 3 "#   \`bar 1' failed"
  finish
}
