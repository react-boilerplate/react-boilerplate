#! /usr/bin/env bats

load environment

@test "$SUITE: with no arguments, list all aliases" {
  run ./go aliases
  assert_success
  assert_line_equals 0 'awk'  # first alias
  assert_line_equals -1 'sed'  # last alias
}

@test "$SUITE: tab completions" {
  run ./go complete 1 aliases ''
  assert_success '--exists '

  run ./go complete 1 aliases -
  assert_success '--exists '

  run ./go complete 2 aliases --exists
  assert_failure ''

  run ./go complete 2 aliases cd --exists
  assert_failure ''
}

@test "$SUITE: error on unknown flag" {
  run ./go aliases --foobar
  assert_failure 'ERROR: unknown flag: --foobar'
}

@test "$SUITE: help filter" {
  local expected=($(./go aliases))
  run ./go aliases --help-filter 'BEGIN {{_GO_ALIAS_CMDS}} END'
  assert_success "BEGIN ${expected[*]} END"
}

@test "$SUITE: error if no argument after valid flag" {
  run ./go aliases --exists
  assert_failure 'ERROR: no argument given after --exists'
}

@test "$SUITE: return true if alias exists, false if not" {
  run ./go aliases --exists ls
  assert_success ''

  run ./go aliases --exists foobar
  assert_failure ''

  run ./go aliases --help foobar
  assert_failure ''
}

@test "$SUITE: error if no flag specified and other arguments present" {
  run ./go aliases ls
  assert_failure \
    'ERROR: with no flag specified, the argument list should be empty'
}

@test "$SUITE: error if too many arguments present for flag" {
  run ./go aliases --exists ls cat
  assert_failure 'ERROR: only one argument should follow --exists'

  run ./go aliases --help ls cat
  assert_failure 'ERROR: only one argument should follow --help'

  run ./go aliases --help-filter foo bar
  assert_failure 'ERROR: only one argument should follow --help-filter'
}

@test "$SUITE: show generic help for alias" {
  run ./go aliases --help ls
  assert_success
  assert_line_equals 0 "./go ls - Shell alias that will execute in $_GO_ROOTDIR"
  assert_line_equals 1 \
    'Filename completion is available via the "./go env" command.'
}

@test "$SUITE: specialize help for cd, pushd when running script directly" {
  run ./go aliases --help cd
  assert_success

  local expected=("./go cd - Shell alias that will execute in $_GO_ROOTDIR")
  expected+=('Filename completion is available via the "./go env" command.')
  expected+=('NOTE: The "cd" alias will only be available after using ')
  expected[2]+='"./go env" to set up your shell environment.'

  assert_line_equals 0 "${expected[0]}"
  assert_line_equals 1 "${expected[1]}"
  assert_line_equals 2 "${expected[2]}"

  run ./go aliases --help pushd
  assert_success
  assert_line_equals 0 "${expected[0]/go cd/go pushd}"
  assert_line_equals 1 "${expected[1]}"
  assert_line_equals 2 "${expected[2]/\"cd\"/\"pushd\"}"
}

@test "$SUITE: leave help generic for cd, pushd when using env function" {
  # Setting _GO_CMD will trick the script into thinking the shell function is
  # running it.
  
  _GO_CMD='test-go' run ./go aliases --help cd
  [ "$status" -eq '0' ]

  local expected=("test-go cd - Shell alias that will execute in $_GO_ROOTDIR")
  expected+=('Filename completion is available via the "test-go env" command.')

  [ "${lines[0]}" == "${expected[0]}" ]
  [ "${lines[1]}" == "${expected[1]}" ]
  [ -z "${lines[2]}" ]

  _GO_CMD='test-go' run ./go aliases --help pushd
  [ "$status" -eq '0' ]

  expected[0]="${expected[0]/test-go cd/test-go pushd}"

  [ "${lines[0]}" == "${expected[0]}" ]
  [ "${lines[1]}" == "${expected[1]}" ]
  [ -z "${lines[2]}" ]
}
