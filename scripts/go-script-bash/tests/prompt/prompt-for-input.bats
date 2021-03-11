#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    'declare prompt="$1"' \
    'declare default="$2"' \
    'declare fail_msg="$3"' \
    'declare response="initial value"' \
    'declare result' \
    '@go.prompt_for_input "response" "$prompt" "$default" "$fail_msg"' \
    'result="$?"' \
    'printf -- "%s\n" "$response"' \
    'exit "$result"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if variable not a valid identifier" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    '@go.prompt_for_input "invalid;"'

  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='Input prompt response variable name "invalid;" for '
  err_msg+='@go.prompt_for_input contains invalid identifier characters at:'

  assert_lines_match "^${err_msg}\$" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: reads and trims value" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' <<<'  To seek the grail!   '
  assert_success 'What is your quest?' \
    'To seek the grail!'
}

@test "$SUITE: with default preserves prompt space" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' 'To seek the grail!' <<<''
  assert_success 'What is your quest? [default: To seek the grail!]' \
    'To seek the grail!'
}

@test "$SUITE: with default adds prompt space if missing" {
  run "$TEST_GO_SCRIPT" 'What is your quest?' 'To seek the grail!' <<<''
  assert_success \
    'What is your quest? [default: To seek the grail!] To seek the grail!'
}

@test "$SUITE: reads empty input if no error message" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' <<<''
  assert_success 'What is your quest?'
}

@test "$SUITE: fails with error message on empty input" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' '' 'Auuuuuuuugh!' <<<''
  assert_failure 'What is your quest?' \
    'Auuuuuuuugh!'
}
