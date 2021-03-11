#! /usr/bin/env bats

load environment

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completion" {
  local subcommands=('plugh' 'quux' 'xyzzy')
  @go.create_parent_and_subcommands foo "${subcommands[@]}"
  run "$TEST_GO_SCRIPT" complete 1 help 'foo'
  assert_success 'foo '

  run "$TEST_GO_SCRIPT" complete 2 help 'foo' ''
  assert_success "${subcommands[@]}"

  run "$TEST_GO_SCRIPT" complete 2 help 'foo' 'q'
  assert_success 'quux '
}

@test "$SUITE: produce message with successful return for help command" {
  @go.create_test_command_script 'foo' '# Does foo stuff'
  @go.create_test_command_script 'bar' '# Does bar stuff'
  @go.create_test_command_script 'plugins/baz/bin/baz' '# Does baz stuff'
  run "$TEST_GO_SCRIPT" help

  assert_success
  assert_line_equals 0 "Usage: $TEST_GO_SCRIPT <command> [arguments...]"
  assert_output_matches '  foo  Does foo stuff'
  assert_output_matches '  bar  Does bar stuff'
  assert_output_matches '  baz  Does baz stuff'
  assert_output_matches "Use \"$TEST_GO_SCRIPT help builtins\" for help on "
}

@test "$SUITE: only show top-level commands when _GO_STANDALONE is set" {
  @go.create_test_command_script 'foo' '# Does foo stuff'
  @go.create_test_command_script 'bar' '# Does bar stuff'
  @go.create_test_command_script 'plugins/baz/bin/baz' '# Does baz stuff'
  cd "$HOME"
  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT" help

  assert_success
  assert_line_equals 0 "Usage: $TEST_GO_SCRIPT <command> [arguments...]"
  assert_output_matches '  foo  Does foo stuff'
  assert_output_matches '  bar  Does bar stuff'
  fail_if output_matches '  baz  Does baz stuff'
  fail_if output_matches "Use \"$TEST_GO_SCRIPT help builtins\" for help on "
}

@test "$SUITE: produce usage message when error retrieving command summaries" {
  run "$TEST_GO_SCRIPT" help

  assert_failure
  assert_line_equals 0 "Usage: $TEST_GO_SCRIPT <command> [arguments...]"

  local expected_err="<No commands found in or error retrieving summaries "
  expected_err+="from: $TEST_GO_SCRIPTS_DIR>"
  assert_output_matches "$expected_err"
}

@test "$SUITE: accept -h, -help, and --help as synonyms" {
  # Create a command to ensure a sucessful exit status.
  @go.create_test_command_script 'foo' '# Does foo stuff'
  run "$TEST_GO_SCRIPT" help
  assert_success

  local help_output="$output"

  run "$TEST_GO_SCRIPT" -h
  assert_success "$help_output"

  run "$TEST_GO_SCRIPT" -help
  assert_success "$help_output"

  run "$TEST_GO_SCRIPT" --help
  assert_success "$help_output"
}

@test "$SUITE: produce message for alias" {
  run "$TEST_GO_SCRIPT" help ls foo
  assert_success
  assert_line_equals 0 \
    "$TEST_GO_SCRIPT ls - Shell alias that will execute in $TEST_GO_ROOTDIR"
}

@test "$SUITE: error if command doesn't exist" {
  run "$TEST_GO_SCRIPT" help foobar
  assert_failure
  assert_line_equals 0  'Unknown command: foobar'
  assert_line_equals 1  'Available commands are:'
  assert_line_equals 2  '  aliases'
  assert_line_equals -1 '  vars'
}

@test "$SUITE: error if parsing description fails" {
  # As noted in the code, this _shouldn't_ ever happen. We're doing something
  # tricky to make sure we handle it if it ever does.
  local go_script=(
    '. "$_GO_CORE_DIR/lib/internal/path"'
    '_@go.set_command_path_and_argv() {'
    "  __go_cmd_path='bogus/path/to/nowhere'"
    '}'
    '_@go.source_builtin "help" "$@"')
  @go.create_test_go_script "${go_script[@]}"

  run "$TEST_GO_SCRIPT" 'bogus' 'command'
  local expected_errors=(
    'ERROR: command script "bogus/path/to/nowhere" does not exist'
    'ERROR: failed to parse description from bogus/path/to/nowhere')
  assert_failure "${expected_errors[@]}"
}

@test "$SUITE: parse description from command script" {
  local cmd_script=(
    '#'
    '# Does foo stuff in {{root}}'
    '#'
    '# Usage: {{go}} {{cmd}} <argument>'
    ''
    'echo "rm -rf /"')
  @go.create_test_command_script 'foo' "${cmd_script[@]}"
  run "$TEST_GO_SCRIPT" help foo

  local expected=(
    "$TEST_GO_SCRIPT foo - Does foo stuff in $TEST_GO_ROOTDIR"
    ''
    "Usage: $TEST_GO_SCRIPT foo <argument>")
  assert_success "${expected[@]}"
}

@test "$SUITE: call help filter on command script" {
  # Interesting difference between bash 3.2 and 4.x that led to hoisting out the
  # `replacement` variable in the help filter: If instead we used
  # `"${FOO_VALID_ARGS[*]}"` directly in the pattern substitution, bash 3.2 will
  # include the double quotes. If we remove them, bash 4.x will ignore `IFS` and
  # use spaces instead.
  #
  # It's clearer this way anyway. `aliases` and `builtins` have been updated to
  # hoist the `pattern` and `replacement` variables in this fashion.
  local cmd_script=(
    '#'
    '# Does foo stuff'
    '#'
    '# Usage: {{go}} {{cmd}} <{{FOO_VALID_ARGS}}>'
    ''
    'declare -r FOO_VALID_ARGS=("bar" "baz" "quux")'
    ''
    'if [[ "$1" == "--help-filter" ]]; then'
    '  # Help filter'
    '  IFS="|"'
    '  declare -r pattern="{{FOO_VALID_ARGS}}"'
    '  declare -r replacement="${FOO_VALID_ARGS[*]}"'
    '  echo "${2//$pattern/$replacement}"'
    'fi')
  @go.create_test_command_script 'foo' "${cmd_script[@]}"
  run "$TEST_GO_SCRIPT" help foo

  local expected=(
    "$TEST_GO_SCRIPT foo - Does foo stuff"
    ''
    "Usage: $TEST_GO_SCRIPT foo <bar|baz|quux>")
  assert_success "${expected[@]}"
}

@test "$SUITE: add subcommand summaries" {
  local cmd_template=$'# Does {{CMD}} stuff\n'
  cmd_template+=$'#\n'
  cmd_template+=$'# Usage: {{go}} {{cmd}}\n'

  @go.create_test_command_script 'foo' "${cmd_template/\{\{CMD\}\}/foo}"
  mkdir "$TEST_GO_SCRIPTS_DIR/foo.d"
  @go.create_test_command_script 'foo.d/bar' "${cmd_template/\{\{CMD\}\}/bar}"
  @go.create_test_command_script 'foo.d/baz' "${cmd_template/\{\{CMD\}\}/baz}"
  @go.create_test_command_script 'foo.d/quux' "${cmd_template/\{\{CMD\}\}/quux}"
  run "$TEST_GO_SCRIPT" help foo

  local expected=(
    "$TEST_GO_SCRIPT foo - Does foo stuff"
    ''
    "Usage: $TEST_GO_SCRIPT foo"
    ''
    'Subcommands:'
    ''
    '  bar   Does bar stuff'
    '  baz   Does baz stuff'
    '  quux  Does quux stuff')
  assert_success "${expected[@]}"
}
