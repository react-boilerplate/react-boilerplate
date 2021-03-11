#! /usr/bin/env bats

load environment

setup() {
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completions" {
  run "$TEST_GO_SCRIPT" complete 1 env ''
  assert_success '- '

  run "$TEST_GO_SCRIPT" complete 1 env '-'
  assert_success '- '

  run "$TEST_GO_SCRIPT" complete 1 env '--foo'
  assert_failure ''

  run "$TEST_GO_SCRIPT" complete 2 env '-' 'invalid'
  assert_failure ''
}

@test "$SUITE: error if no implementation available for SHELL" {
  local shell='nonexistent-sh'
  SHELL="$shell" run "$TEST_GO_SCRIPT" env

  assert_failure
  assert_line_equals 0 "The $shell shell currently isn't supported."
  assert_line_matches 1 "$_GO_CORE_URL/tree/master/lib/env"
}

@test "$SUITE: error if the ./go script file name contains spaces" {
  local go_script="$TEST_GO_ROOTDIR/go script"
  mv "$TEST_GO_SCRIPT" "$go_script"

  SHELL='bash' run "$go_script" env
  assert_failure

  local expected="ERROR: the \"${go_script#$TEST_GO_ROOTDIR/}\" script "
  expected+='must not contain spaces'
  assert_output_matches "$expected"
}

@test "$SUITE: show usage if no function name argument" {
  local go_script="$TEST_GO_ROOTDIR/my-go"
  mv "$TEST_GO_SCRIPT" "$go_script"

  SHELL='bash' run "$go_script" env
  assert_success
  assert_line_matches 0 "Define the \"${go_script#$TEST_GO_ROOTDIR/}\" function"
  assert_line_equals 2 "eval \"\$($go_script env -)\""
}

@test "$SUITE: error if shell impl doesn't contain eval line" {
  echo '' > "$_GO_ROOTDIR/lib/internal/env/badsh"

  SHELL='badsh' run "$TEST_GO_SCRIPT" env
  rm "$_GO_ROOTDIR/lib/internal/env/badsh"

  assert_failure
  local expected="ERROR: .*badsh must contain a line of the form "
  expected+='"# \.\*%s env -"'
  assert_output_matches "$expected"
}

@test "$SUITE: error if function name contains spaces" {
  SHELL='bash' run "$TEST_GO_SCRIPT" env 'foo bar'
  assert_failure
  assert_output_matches 'ERROR: "foo bar" must not contain spaces'
}

@test "$SUITE: generate functions using ./go script name by default" {
  local script_name='never-collide-with-test-environment-go'
  local go_script="$TEST_GO_ROOTDIR/$script_name"
  mv "$TEST_GO_SCRIPT" "$go_script"

  SHELL='bash' run "$go_script" env -
  assert_success

  ! command -v "_$script_name"
  ! command -v "$script_name"
  ! complete -p "$script_name"
  eval "$(env SHELL='bash' "$go_script" env -)"

  run declare -f "$script_name"
  assert_success
  assert_line_equals 0 "$script_name () "
  assert_output_matches "\\\"\\\$cmd\" \\\"$TEST_GO_ROOTDIR/"
  assert_output_matches \
    "_GO_CMD='$script_name' \\\"$go_script\\\" \\\"\\\$cmd\\\""

  run declare -f "_$script_name"
  assert_success
  assert_line_equals 0 "_$script_name () "
  assert_line_matches -2 "done < <\(\\\"$go_script\\\" 'complete'"

  run complete -p "$script_name"
  assert_success "complete -o nospace -F _$script_name $script_name"

  "$script_name" 'unenv'
  ! command -v "_$script_name"
  ! command -v "$script_name"
  ! complete -p "$script_name"
}

@test "$SUITE: generate functions using specified name" {
  local func_name='never-collide-with-test-environment-go'
  SHELL='bash' run "$TEST_GO_SCRIPT" env "$func_name"
  assert_success

  ! command -v "_$func_name"
  ! command -v "$func_name"
  ! complete -p "$func_name"
  eval "$(env SHELL='bash' "$TEST_GO_SCRIPT" env "$func_name")"

  run declare -f "$func_name"
  assert_success
  assert_line_equals 0 "$func_name () "
  assert_output_matches "\\\"\\\$cmd\" \\\"$TEST_GO_ROOTDIR/"
  assert_output_matches \
    "_GO_CMD='$func_name' \\\"$TEST_GO_SCRIPT\\\" \\\"\\\$cmd\\\""

  run declare -f "_$func_name"
  assert_success
  assert_line_equals 0 "_$func_name () "
  assert_line_matches -2 "done < <\(\\\"$TEST_GO_SCRIPT\\\" 'complete'"

  run complete -p "$func_name"
  assert_success "complete -o nospace -F _$func_name $func_name"

  "$func_name" 'unenv'
  ! command -v "_$func_name"
  ! command -v "$func_name"
  ! complete -p "$func_name"
}
