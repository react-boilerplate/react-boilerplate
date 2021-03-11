#! /usr/bin/env bats

load environment

teardown() {
  @go.remove_test_go_rootdir
}

assert_error_on_invalid_input() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  run "$TEST_GO_SCRIPT" "$1"

  if [[ "$status" -eq '0' ]]; then
    echo "Expected input to fail validation: $1" >&2
    restore_bats_shell_options 1
  else
    restore_bats_shell_options
  fi
}

assert_success_on_valid_input() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  run "$TEST_GO_SCRIPT" "$1"

  if [[ "$status" -ne '0' ]]; then
    printf 'Expected input to pass validation: %s\n' "$1" >&2
    restore_bats_shell_options 1
    return
  fi

  run eval "var=\"$1\""

  if [[ -n "$output" ]]; then
    fail "Evaluating input still produced output: $1" >&2
    restore_bats_shell_options 1
  else
    restore_bats_shell_options
  fi
}

@test "$SUITE: validate_input returns error on invalid input" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_input "$@"'
  assert_error_on_invalid_input 'foo`bar'
  assert_error_on_invalid_input 'foo"bar'
  assert_error_on_invalid_input 'foo;bar'
  assert_error_on_invalid_input 'foo$bar'
  assert_error_on_invalid_input 'foo(bar'
  assert_error_on_invalid_input 'foo)bar'
  assert_error_on_invalid_input 'foo&bar'
  assert_error_on_invalid_input 'foo|bar'
  assert_error_on_invalid_input 'foo<bar'
  assert_error_on_invalid_input 'foo>bar'
  assert_error_on_invalid_input $'foo\nbar'
  assert_error_on_invalid_input $'foo\rbar'
  assert_error_on_invalid_input "\`echo SURPRISE >&2\`$FILE_PATH"
  assert_error_on_invalid_input "$FILE_PATH\"; echo 'SURPRISE'"
}

@test "$SUITE: validate_input returns success on valid input" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_input "$@"'
  assert_success_on_valid_input ''
  assert_success_on_valid_input 'foobar'
  assert_success_on_valid_input 'foo\`bar'
  assert_success_on_valid_input 'foo\"bar'
  assert_success_on_valid_input 'foo\;bar'
  assert_success_on_valid_input 'foo\$bar'
  assert_success_on_valid_input 'foo\(bar'
  assert_success_on_valid_input 'foo\)bar'
  assert_success_on_valid_input 'foo\&bar'
  assert_success_on_valid_input 'foo\|bar'
  assert_success_on_valid_input 'foo\<bar'
  assert_success_on_valid_input 'foo\>bar'
  assert_success_on_valid_input "\$'foo\nbar'"
  assert_success_on_valid_input "\$'foo\nbar'"
  assert_success_on_valid_input '\`echo SURPRISE \>\&2\`\$FILE_PATH'
  assert_success_on_valid_input "\\\$FILE_PATH\\\"\\; echo 'SURPRISE'"
}

@test "$SUITE: validate_input_or_die passes" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_input_or_die "input argument" "foobar" "1"'
  run "$TEST_GO_SCRIPT"
  assert_success
}

@test "$SUITE: validate_input_or_die in main, skip_callers == 1" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_input_or_die "input argument" "foo;bar" "1"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^input argument "foo;bar" for @go\.validate_input_or_die '
  err_msg+='contains unescaped shell metacharacters or control operators at:$'

  assert_lines_match "$err_msg" \
    "  $TEST_GO_SCRIPT:[0-9] main"
}

@test "$SUITE: validate_input_or_die in function, skip_callers default == 2" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    'test_func() { @go.validate_input_or_die "input argument" "$1"; }' \
    'test_func "foo;bar"'
  run "$TEST_GO_SCRIPT"
  assert_failure
  assert_lines_match \
    '^input argument "foo;bar" for test_func contains unescaped .* at:$' \
    "  $TEST_GO_SCRIPT:[0-9] main"
}

@test "$SUITE: validate_identifier passes on valid identifier" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier "foobar"'
  run "$TEST_GO_SCRIPT"
  assert_success
}

@test "$SUITE: validate_identifier fails on empty string" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier ""'
  run "$TEST_GO_SCRIPT"
  assert_failure
}

@test "$SUITE: validate_identifier fails on invalid character" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier "foo;bar"'
  run "$TEST_GO_SCRIPT"
  assert_failure
}

@test "$SUITE: validate_identifier fails if starts with number" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier "3foobar"'
  run "$TEST_GO_SCRIPT"
  assert_failure
}

@test "$SUITE: validate_identifier_or_die passes" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier_or_die "argument" "foobar" "1"'
  run "$TEST_GO_SCRIPT"
  assert_success
}

@test "$SUITE: validate_identifier_or_die in main, skip_callers == 1" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    '@go.validate_identifier_or_die "argument" "foo;bar" "1"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^argument "foo;bar" for @go\.validate_identifier_or_die '
  err_msg+='contains invalid identifier characters at:$'
  assert_lines_match "$err_msg" \
    "  $TEST_GO_SCRIPT:[0-9] main"
}

@test "$SUITE: validate_identifier_or_die in func, skip_callers default == 2" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    'test_func() {' \
    '  @go.validate_identifier_or_die "argument" "$1"' \
    '}' \
    'test_func "foo;bar"'
  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='^argument "foo;bar" for test_func '
  err_msg+='contains invalid identifier characters at:$'
  assert_lines_match "$err_msg" \
    "  $TEST_GO_SCRIPT:[0-9] main"
}

@test "$SUITE: validate_identifier_or_die in func, empty string" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    'test_func() {' \
    '  @go.validate_identifier_or_die "argument" "$1"' \
    '}' \
    'test_func ""'
  run "$TEST_GO_SCRIPT"
  assert_failure
  assert_lines_match '^argument "" for test_func must not be empty at:$' \
    "  $TEST_GO_SCRIPT:[0-9] main"
}

@test "$SUITE: validate_identifier_or_die in func, starts with number" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "validation"' \
    'test_func() {' \
    '  @go.validate_identifier_or_die "argument" "$1"' \
    '}' \
    'test_func "3foobar"'
  run "$TEST_GO_SCRIPT"
  assert_failure
  assert_lines_match \
    '^argument "3foobar" for test_func must not start with a number at:$' \
    "  $TEST_GO_SCRIPT:[0-9] main"
}
