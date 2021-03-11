#! /usr/bin/env bats

load environment

setup() {
  . 'lib/internal/argv'
}

@test "$SUITE: check_flag_has_no_arguments" {
  run _@go.check_flag_has_no_arguments --flag
  assert_success ''

  run _@go.check_flag_has_no_arguments --flag invalid_extra_arg
  assert_failure 'ERROR: --flag takes no arguments'
}

@test "$SUITE: check_flag_has_one_argument" {
  run _@go.check_flag_has_one_argument --flag arg
  assert_success ''

  run _@go.check_flag_has_one_argument --flag
  assert_failure 'ERROR: no argument given after --flag'

  run _@go.check_flag_has_one_argument --flag arg invalid_extra_arg
  assert_failure 'ERROR: only one argument should follow --flag'
}

@test "$SUITE: check_argv_empty_if_no_flags" {
  run _@go.check_argv_empty_if_no_flags
  assert_success ''

  run _@go.check_argv_empty_if_no_flags 'foo'
  assert_failure \
    'ERROR: with no flag specified, the argument list should be empty'
}
