#! /usr/bin/env bats

load ../environment

TEST_COMMAND_SCRIPT_PATH="$TEST_GO_SCRIPTS_DIR/test-command"

setup() {
  test_filter

  @go.create_test_go_script \
    ". '$_GO_CORE_DIR/lib/internal/command_descriptions'" \
    'declare __go_cmd_desc=""' \
    '"$@"' \
    'declare result="$?"' \
    'printf "%s\n" "$__go_cmd_desc"' \
    'exit "$result"'
}

create_script_with_description() {
  local script='#
# Command that does something in {{root}}
#
# Usage: {{go}} {{cmd}} [args...]
#
# Paragraphs of adjacent lines
# will be joined. They will not be
# folded; @go.printf will take care of
# that.
#
# Lines indented by two spaces
# like the following are considered
# preformatted, and will not be joined:
#
#   foo bar baz
#     preformatted lines should support
#       multiple indentations
#   quux xyzzy plugh
#
# Indented lines that look like tables
# (there are two or more adjacent spaces
# after the first non-space character)
# will be parsed as summary items and folded
# as appropriate. Each table item should be only
# one line long.
#
#   foo    All work and no play makes Mike a dull boy.
#   bar    All Work and no play makes Mike a dull boy.
#   baz    All work and nO play makes Mike a dull boy.
#   quux   All work and no play Makes Mike a dull boy.
#   xyzzy  all work and no play makes mike a Dull Boy.
#   plugh  all werk and no play makes mike a dull Boy

echo The command script starts now.
'
  @go.create_test_command_script 'test-command' "$script"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: return error if there's an error reading" {
  skip_if_cannot_trigger_file_permission_failure
  printf '\n' >"$TEST_COMMAND_SCRIPT_PATH"
  chmod ugo-r "$TEST_COMMAND_SCRIPT_PATH"

  run "$TEST_GO_SCRIPT" _@go.command_summary "$TEST_COMMAND_SCRIPT_PATH"
  assert_failure
  assert_output_matches "ERROR: problem reading $TEST_COMMAND_SCRIPT_PATH\$"

  run "$TEST_GO_SCRIPT" _@go.command_description "$TEST_COMMAND_SCRIPT_PATH"
  assert_failure
  assert_output_matches "ERROR: problem reading $TEST_COMMAND_SCRIPT_PATH\$"
}

@test "$SUITE: return default text when no description is available" {
  @go.create_test_command_script 'test-command' \
    'echo "This script has no description"'

  run "$TEST_GO_SCRIPT" _@go.command_summary "$TEST_COMMAND_SCRIPT_PATH"
  assert_success 'No description available'

  __go_cmd_desc=''
  run "$TEST_GO_SCRIPT" _@go.command_description "$TEST_COMMAND_SCRIPT_PATH"
  assert_success 'No description available'
}

@test "$SUITE: parse summary from command script" {
  create_script_with_description
  run "$TEST_GO_SCRIPT" _@go.command_summary "$TEST_COMMAND_SCRIPT_PATH"
  assert_success "Command that does something in $TEST_GO_ROOTDIR"
}

@test "$SUITE: one-line description from command script has no trailing space" {
  echo '# Command that does something in {{root}}' > "$TEST_COMMAND_SCRIPT_PATH"
  COLUMNS=40 run "$TEST_GO_SCRIPT" _@go.command_description \
    "$TEST_COMMAND_SCRIPT_PATH"
  assert_success "Command that does something in $TEST_GO_ROOTDIR"
}

@test "$SUITE: parse description from command script" {
  create_script_with_description
  COLUMNS=40 run test-go _@go.command_description "$TEST_COMMAND_SCRIPT_PATH"

  local expected='Command that does something in TEST_GO_ROOTDIR

Usage: test-go test-command [args...]

Paragraphs of adjacent lines will be joined. They will not be folded; @go.printf will take care of that.

Lines indented by two spaces like the following are considered preformatted, and will not be joined:

  foo bar baz
    preformatted lines should support
      multiple indentations
  quux xyzzy plugh

Indented lines that look like tables (there are two or more adjacent spaces after the first non-space character) will be parsed as summary items and folded as appropriate. Each table item should be only one line long.

  foo    All work and no play makes
           Mike a dull boy.
  bar    All Work and no play makes
           Mike a dull boy.
  baz    All work and nO play makes
           Mike a dull boy.
  quux   All work and no play Makes
           Mike a dull boy.
  xyzzy  all work and no play makes
           mike a Dull Boy.
  plugh  all werk and no play makes
           mike a dull Boy'

  # With this test, I learned that you _do_ have to quote strings even inside of
  # '[[' and ']]' in case the strings themselves contain '[' or ']', as with
  # '[args...]' above.
  assert_success "${expected/TEST_GO_ROOTDIR/$TEST_GO_ROOTDIR}"
}

@test "$SUITE: format subcommand description" {
  mkdir -p "$TEST_GO_SCRIPTS_DIR/root-command.d/node-command.d"
  @go.create_test_command_script 'root-command.d/node-command.d/leaf-command' '#
# Leaf command that does something in {{root}}
#
# Usage: {{go}} {{cmd}} [args...]

echo The command script starts now.
'

  run test-go _@go.command_description \
    "$TEST_GO_SCRIPTS_DIR/root-command.d/node-command.d/leaf-command"
  assert_success "Leaf command that does something in $TEST_GO_ROOTDIR" \
    '' \
    "Usage: test-go root-command node-command leaf-command [args...]"
}
