#! /usr/bin/env bats

load environment

setup() {
  . 'lib/internal/command_descriptions'
}

teardown() {
  @go.remove_test_go_rootdir
}

create_cmd_path_and_name_go_script() {
  @go.create_test_go_script \
    ". '$_GO_CORE_DIR/lib/internal/command_descriptions'" \
    'declare __go_cmd_name' \
    'if _@go.check_command_path_and_parse_command_name "$@"; then' \
    '  echo "__go_cmd_name: $__go_cmd_name"' \
    'else' \
    '  exit 1' \
    'fi'
}

@test "$SUITE: check command path and parse command name passes" {
  create_cmd_path_and_name_go_script
  @go.create_test_command_script 'foo'
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_DIR/foo"
  assert_success '__go_cmd_name: foo'
}

@test "$SUITE: check sub-command path and parse command name passes" {
  create_cmd_path_and_name_go_script
  @go.create_test_command_script 'foo.d/bar.d/baz'
  run "$TEST_GO_SCRIPT" "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d/baz"
  assert_success '__go_cmd_name: foo bar baz'
}

@test "$SUITE: check command path errors if no path is specified" {
  create_cmd_path_and_name_go_script
  run "$TEST_GO_SCRIPT"
  assert_failure 'ERROR: no command script specified'
}

@test "$SUITE: check command path errors if the path doesn't exist" {
  create_cmd_path_and_name_go_script
  run "$TEST_GO_SCRIPT" foobar
  assert_failure 'ERROR: command script "foobar" does not exist'
}

@test "$SUITE: check command_summary fails if the path doesn't exist" {
  run _@go.command_summary foobar
  assert_failure 'ERROR: command script "foobar" does not exist'
}

@test "$SUITE: check command_description fails if the path doesn't exist" {
  run _@go.command_description foobar
  assert_failure 'ERROR: command script "foobar" does not exist'
}

@test "$SUITE: filter description line" {
  local _GO_CMD='test-go'
  local __go_cmd_name='test-command'

  local line='The script is {{go}}, '
  line+='the command is {{cmd}}, and '
  line+='the project root is {{root}}.'

  local expected="The script is test-go, "
  expected+='the command is test-command, and '
  expected+="the project root is $_GO_ROOTDIR."

  _@go.filter_description_line
  assert_success
  assert_equal "$expected" "$line" 'filtered description line'
}

@test "$SUITE: format summary without folding if total length <= COLUMNS" {
  local cmd_name='test-command'
  local summary='Summary for a command parsed from the file header comment'
  local expected="  $cmd_name  $summary"

  # Add one to account for the newline, though $() trims it.
  COLUMNS="$((${#expected} + 1))"
  local formatted="$(_@go.format_summary "$cmd_name" "$summary" "${#cmd_name}")"
  assert_equal "$expected" "$formatted" 'formatted summary'
}

@test "$SUITE: format summary with folding if total length > COLUMNS" {
  local cmd_name='test-command'
  local summary='Summary for a command parsed from the file header comment '
  summary+="that's a bit longer than the current column width"

  COLUMNS=50
  local formatted="$(_@go.format_summary "$cmd_name" "$summary" \
    "$((${#cmd_name} + 5))")"

  local expected
  expected=$'  test-command       Summary for a command parsed\n'
  expected+=$'                       from the file header\n'
  expected+=$'                       comment that\'s a bit\n'
  expected+=$'                       longer than the current\n'
  expected+=$'                       column width'

  assert_equal "$expected" "$formatted" 'formatted summary'
}
