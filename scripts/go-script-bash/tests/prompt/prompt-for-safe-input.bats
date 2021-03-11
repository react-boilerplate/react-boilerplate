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
    '@go.prompt_for_safe_input 'response' "$prompt" "$default" "$fail_msg"' \
    'result="$?"' \
    'if [[ "$result" -eq "0" ]]; then' \
    '  printf -- "%s\n" "$response"' \
    'fi' \
    'exit "$result"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if variable not a valid identifier" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    '@go.prompt_for_safe_input "invalid;"'

  run "$TEST_GO_SCRIPT"
  assert_failure

  local err_msg='Input prompt response variable name "invalid;" for '
  err_msg+='@go.prompt_for_safe_input '
  err_msg+='contains invalid identifier characters at:'

  assert_lines_match "^${err_msg}\$" \
    "^  $TEST_GO_SCRIPT:[0-9] main$"

}

@test "$SUITE: reads value with no metacharacters or control operators" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' <<<'To seek the grail!'
  assert_success 'What is your quest?' \
    'To seek the grail!'
}

@test "$SUITE: reads a value with an escaped metacharacter" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' <<<"To seek the grail\;"
  assert_success 'What is your quest?' \
    "To seek the grail\;"
}

@test "$SUITE: fails when reading a value with an unescaped metacharacter" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' <<<'To seek the grail;'

  local err_msg='"To seek the grail;" is an invalid response, as it contains '
  err_msg+='unescaped shell metacharacters or control operators.'

  assert_failure 'What is your quest?' \
    "$err_msg"
}

@test "$SUITE: fails when the default value has an unescaped metacharacter" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' 'To seek the grail;' <<<''

  local err_msg='"To seek the grail;" is an invalid response, as it contains '
  err_msg+='unescaped shell metacharacters or control operators.'

  assert_failure 'What is your quest? [default: To seek the grail;]' \
    "$err_msg"
}

@test "$SUITE: fails when no default or input provided" {
  run "$TEST_GO_SCRIPT" $'What is your quest?\n' '' 'Auuuuuuuugh!' <<<''
  assert_failure 'What is your quest?' \
    'Auuuuuuuugh!'
}

@test "$SUITE: --or-die exits when the value has an unescaped metacharacter" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    'declare response="initial value"' \
    "@go.prompt_for_safe_input --or-die 'Quest response' 'response' \\" \
    $'  "What is your quest?\n"'

  run "$TEST_GO_SCRIPT" <<<'To seek the grail;'
  assert_failure

  local err_msg='^Quest response "To seek the grail;" for '
  err_msg+='@go.prompt_for_safe_input contains '
  err_msg+='unescaped shell metacharacters or control operators at:$'

  assert_lines_match 'What is your quest?' \
    "$err_msg" \
    "  $TEST_GO_SCRIPT:[0-9] main"
}
