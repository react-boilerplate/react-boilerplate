#! /usr/bin/env bats

load environment

@test "$SUITE: no args lists all builtin commands" {
  run ./go 'builtins'
  assert_success
  assert_line_equals 0 "aliases" "first builtin"
  assert_line_equals -1 "vars" "last builtin"
}

@test "$SUITE: tab completions" {
  local expected=('--exists' '--summaries')

  run ./go complete 1 builtins ''
  assert_success "${expected[@]}"

  run ./go complete 1 builtins -
  assert_success "${expected[@]}"

  run ./go complete 2 builtins --exists
  assert_failure ''
}

@test "$SUITE: return true if a builtin command exists, false if not" {
  run ./go builtins --exists builtins
  assert_success ''

  run ./go builtins --exists foobar
  assert_failure ''
}

@test "$SUITE: error if no flag specified and other arguments present" {
  run ./go builtins builtins
  assert_failure \
    'ERROR: with no flag specified, the argument list should be empty'
}

@test "$SUITE: error if too many arguments present for flag" {
  run ./go builtins --summaries builtins aliases
  assert_failure 'ERROR: --summaries takes no arguments'

  run ./go builtins --exists builtins aliases
  assert_failure 'ERROR: only one argument should follow --exists'

  run ./go builtins --help-filter builtins aliases
  assert_failure 'ERROR: only one argument should follow --help-filter'
}

@test "$SUITE: error if --exists not followed by a command name" {
  run ./go builtins --exists
  assert_failure 'ERROR: no argument given after --exists'
}

@test "$SUITE: error on unknown flag" {
  run ./go builtins --foobar
  assert_failure 'ERROR: unknown flag: --foobar'
}

setup_list_builtin_command_summaries() {
  local builtins=($(./go builtins))
  local longest_name_len=0
  local cmd_name

  for cmd_name in "${builtins[@]}"; do
    if [[ "${#cmd_name}" -gt "$longest_name_len" ]]; then
      longest_name_len="${#cmd_name}"
    fi
  done

  . lib/internal/command_descriptions
  local __go_cmd_desc=''
  local first_cmd="${builtins[0]}"
  local last_cmd="${builtins[$((${#builtins[@]} - 1))]}"

  _@go.command_summary "libexec/$first_cmd"
  __expected_first_cmd_summary="$(_@go.format_summary "$first_cmd" \
    "$__go_cmd_desc" "$longest_name_len")"

  _@go.command_summary "libexec/$last_cmd"
  __expected_last_cmd_summary="$(_@go.format_summary "$last_cmd" \
    "$__go_cmd_desc" "$longest_name_len")"
}

@test "$SUITE: list builtin command summaries" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  local __expected_first_cmd_summary
  local __expected_last_cmd_summary
  setup_list_builtin_command_summaries
  restore_bats_shell_options "$?"

  run ./go builtins --summaries
  assert_success

  assert_line_equals 0 "$__expected_first_cmd_summary"
  assert_line_equals -1 "$__expected_last_cmd_summary"
}

@test "$SUITE: help filter" {
  run ./go builtins --help-filter 'BEGIN {{_GO_BUILTIN_SUMMARIES}} END'

  local IFS=$'\n'
  local expected=($(./go builtins --summaries))
  assert_success "BEGIN ${expected[*]} END"
}
