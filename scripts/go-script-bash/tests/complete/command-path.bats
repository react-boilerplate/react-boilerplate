#! /usr/bin/env bats

load ../environment
load ../commands/helpers

setup() {
  test_filter

  # We add a prefix to each of the echo statements to ensure that blank lines
  # are not elided from the Bats `lines` array.
  @go.create_test_go_script '. "$_GO_CORE_DIR/lib/internal/complete"' \
    'declare __go_complete_word_index' \
    'declare __go_cmd_path' \
    'declare __go_argv' \
    'declare result=0' \
    'if ! _@go.complete_command_path "$@"; then' \
    '  result=1' \
    'fi' \
    'echo "I: $__go_complete_word_index"' \
    'echo "P: $__go_cmd_path"' \
    'echo "A: ${__go_argv[@]}"' \
    'exit "$result"'
  find_builtins
}

teardown() {
  @go.remove_test_go_rootdir
}

assert_completions_match() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __assert_completions_match_impl "$@"
  restore_bats_shell_options "$?"
}

__assert_completions_match_impl() {
  # Trim the last three lines of output from the script to compare separately
  # from the output of _@go.complete_command_path.
  local num_lines="${#lines[@]}"
  local num_output_lines="$((num_lines - 3))"
  local var_lines=("${lines[@]:$num_output_lines}")
  var_lines=("${var_lines[@]/#[IPA]: /}")

  # The results of _@go.complete_command_path are eventually passed as the word
  # list argument to `compgen -W` in _@go.complete_args, so we call `compgen -W`
  # here to compute the matching completion values.
  local word_list="${lines[*]:0:$num_output_lines}"
  local results=($(compgen -W "$word_list" -- "$__word"))
  local num_errors=0

  if ! assert_equal "${__expected_results[*]}" "${results[*]}" 'results'; then
    ((++num_errors))
  fi
  if ! assert_equal "$__expected_index" "${var_lines[0]}" 'word index'; then
    ((++num_errors))
  fi
  if ! assert_equal "$__expected_path" "${var_lines[1]}" 'command path'; then
    ((++num_errors))
  fi
  if ! assert_equal "${__expected_argv[*]}" "${var_lines[2]}" 'argv list'; then
    ((++num_errors))
  fi
  [[ "$num_errors" -eq '0' ]]
}

@test "$SUITE: error on empty arguments" {
  run "$TEST_GO_SCRIPT"
  assert_failure
  assert_completions_match
}

@test "$SUITE: all top-level commands for zeroth or first argument" {
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    'plugins/xyzzy/bin/xyzzy'

  # Aliases will get printed before all other commands.
  local __expected_results=($(./go 'aliases') "${__all_scripts[@]##*/}")
  local __expected_index=0

  run "$TEST_GO_SCRIPT" 0
  assert_failure
  assert_completions_match

  run "$TEST_GO_SCRIPT" 0 ''
  assert_failure
  assert_completions_match

  __word='xyz'
  run "$TEST_GO_SCRIPT" 0 "$__word"
  __expected_results=('xyzzy')
  assert_failure
  assert_completions_match
}

@test "$SUITE: error on nonexistent command" {
  local __word='foobar'
  run "$TEST_GO_SCRIPT" 0 "$__word"

  # The first time fails because the _@go.complete_top_level_commands case gets
  # executed.
  assert_failure
  local __expected_index=0
  assert_completions_match

  # The second time fails because _@go.set_command_path_and_argv gets executed.
  run "$TEST_GO_SCRIPT" 1 "$__word" ''
  assert_failure
  __expected_index=1
  assert_line_equals 0 'Unknown command: foobar'
}

@test "$SUITE: complete top-level command when other args present" {
  local __word='pat'
  run "$TEST_GO_SCRIPT" 0 "$__word" 'foo' 'bar'
  local __expected_results=('path')
  local __expected_index=0
  assert_failure
  assert_completions_match
}

@test "$SUITE: complete parent command" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='foo'
  run "$TEST_GO_SCRIPT" 0 "$__word"
  assert_failure

  local __expected_results=('foo')
  local __expected_index=0
  assert_completions_match
}

@test "$SUITE: complete all subcommands" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  run "$TEST_GO_SCRIPT" 1 'foo' ''
  assert_success

  local __expected_results=('bar' 'baz' 'quux')
  local __expected_index=0
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo"
  assert_completions_match
}

@test "$SUITE: complete subcommands matching target word" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='b'
  run "$TEST_GO_SCRIPT" 1 'foo' "$__word"
  assert_success

  local __expected_results=('bar' 'baz')
  local __expected_index=0
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo"
  local __expected_argv=('b')
  assert_completions_match
}

@test "$SUITE: complete subcommands matching target word with trailing args" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='b'
  run "$TEST_GO_SCRIPT" 1 'foo' "$__word" 'xyzzy'
  assert_success

  local __expected_results=('bar' 'baz')
  local __expected_index=0
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo"
  local __expected_argv=('b' 'xyzzy')
  assert_completions_match
}

@test "$SUITE: fail to complete subcommand but still return success" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='bogus'
  run "$TEST_GO_SCRIPT" 1 'foo' "$__word" 'xyzzy'
  assert_success

  local __expected_results=()
  local __expected_index=0
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo"
  local __expected_argv=('bogus' 'xyzzy')
  assert_completions_match
}

@test "$SUITE: successfully complete subcommand" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='bar'
  run "$TEST_GO_SCRIPT" 1 'foo' "$__word" 'xyzzy'
  assert_failure

  local __expected_results=('bar')
  local __expected_index=-1
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo.d/bar"
  local __expected_argv=('xyzzy')
  assert_completions_match
}

@test "$SUITE: do not complete nonexistent subcommand of subcommand" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='xyzzy'
  run "$TEST_GO_SCRIPT" 2 'foo' 'bar' "$__word"
  assert_success

  local __expected_results=()
  local __expected_index=0
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo.d/bar"
  local __expected_argv=('xyzzy')
  assert_completions_match
}

@test "$SUITE: set subcommand path but do not attempt to complete later arg" {
  @go.create_parent_and_subcommands 'foo' 'bar' 'baz' 'quux'

  local __word='frobozz'
  run "$TEST_GO_SCRIPT" 3 'foo' 'bar' 'xyzzy' "$__word"
  assert_success

  local __expected_results=()
  local __expected_index=1
  local __expected_path="$TEST_GO_SCRIPTS_DIR/foo.d/bar"
  local __expected_argv=('xyzzy' 'frobozz')
  assert_completions_match
}
