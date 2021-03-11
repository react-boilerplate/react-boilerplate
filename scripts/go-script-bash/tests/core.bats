#! /usr/bin/env bats

load environment

@test "$SUITE: check exported global constants" {
  assert_equal "$PWD" "$_GO_ROOTDIR" 'working dir'
  assert_equal "$_GO_ROOTDIR/go" "$_GO_SCRIPT" 'go script path'
}

@test "$SUITE: produce help message with error return when no args" {
  run ./go
  assert_failure
  assert_line_equals 0 'Usage: ./go <command> [arguments...]'
}

@test "$SUITE: produce error for an unknown flag" {
  run ./go -foobar
  assert_failure
  assert_line_equals 0 'Unknown flag: -foobar'
  assert_line_equals 1 'Usage: ./go <command> [arguments...]'
}

@test "$SUITE: invoke editor on edit command" {
  EDITOR=echo run ./go edit 'editor invoked'
  assert_success 'editor invoked'
}

@test "$SUITE: invoke run command" {
  run ./go run echo run command invoked
  assert_success 'run command invoked'
}

@test "$SUITE: produce error on cd" {
  local expected
  expected+=$'cd is only available after using "./go env" to set up your\n'
  expected+='shell environment.'

  COLUMNS=60
  run ./go 'cd'
  assert_failure "$expected"
}

@test "$SUITE: produce error on pushd" {
  local expected
  expected+=$'pushd is only available after using "./go env" to set up\n'
  expected+='your shell environment.'

  COLUMNS=60
  run ./go 'pushd'
  assert_failure "$expected"
}

@test "$SUITE: produce error on unenv" {
  local expected
  expected+=$'unenv is only available after using "./go env" to set up\n'
  expected+='your shell environment.'

  COLUMNS=60
  run ./go 'unenv'
  assert_failure "$expected"
}

@test "$SUITE: run shell alias command" {
  local test_description="${BATS_TEST_DESCRIPTION/$SUITE/\$SUITE}"
  run ./go grep "$test_description" "$BATS_TEST_FILENAME" >&2

  if command -v grep >/dev/null; then
    assert_success "@test \"$test_description\" {"
  else
    assert_failure
  fi
}

@test "$SUITE: produce error and list available commands if command not found" {
  run ./go foobar
  assert_failure
  assert_line_equals 0 'Unknown command: foobar'
  assert_line_equals 1 'Available commands are:'
  assert_line_equals 2 '  aliases'
  assert_line_equals -1 '  vars'
}
