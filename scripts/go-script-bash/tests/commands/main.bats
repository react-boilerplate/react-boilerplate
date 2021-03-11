#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
  find_builtins
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completions" {
  run "$TEST_GO_SCRIPT" complete 1 commands ''
  local flags=('--paths' '--summaries')
  local expected=("${flags[@]}" "${BUILTIN_CMDS[@]}")
  assert_success "${expected[@]}"

  run "$TEST_GO_SCRIPT" complete 1 commands --
  local flags=('--paths' '--summaries')
  assert_success "${flags[@]}"

  run "$TEST_GO_SCRIPT" complete 1 commands --p
  local flags=('--paths')
  assert_success '--paths '

  run "$TEST_GO_SCRIPT" complete 1 commands --foo
  assert_failure

  run "$TEST_GO_SCRIPT" complete 2 commands --paths
  assert_success "${BUILTIN_CMDS[@]}"

  run "$TEST_GO_SCRIPT" complete 2 commands --summaries
  assert_success "${BUILTIN_CMDS[@]}"
}

@test "$SUITE: no tab completions for or after search paths" {
  run "$TEST_GO_SCRIPT" complete 1 commands "$TEST_GO_SCRIPTS_DIR"
  assert_failure

  run "$TEST_GO_SCRIPT" complete 2 commands "$TEST_GO_SCRIPTS_DIR"
  assert_failure
}

@test "$SUITE: tab complete subcommand" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  @go.create_test_command_script 'foo'
  @go.create_test_command_script 'foo.d/bar'
  @go.create_test_command_script 'foo.d/baz'
  @go.create_test_command_script 'foo.d/quux'
  restore_bats_shell_options "$?"

  run "$TEST_GO_SCRIPT" complete 2 commands foo
  assert_success 'bar' 'baz' 'quux'

  run "$TEST_GO_SCRIPT" complete 2 commands foo b
  assert_success 'bar' 'baz'

  run "$TEST_GO_SCRIPT" complete 2 commands foo g
  assert_failure

  run "$TEST_GO_SCRIPT" complete 3 commands foo bar
  assert_failure
}

@test "$SUITE: only tab complete flags before other args" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  @go.create_test_command_script 'foo'
  @go.create_test_command_script 'foo.d/bar'
  @go.create_test_command_script 'foo.d/baz'
  @go.create_test_command_script 'foo.d/quux'
  restore_bats_shell_options "$?"

  run "$TEST_GO_SCRIPT" complete 1 commands '' foo
  assert_success '--paths' '--summaries'

  run "$TEST_GO_SCRIPT" complete 2 commands foo '' bar
  assert_failure
}

@test "$SUITE: error if unknown flag specified" {
  run "$TEST_GO_SCRIPT" commands --foobar
  assert_failure 'Unknown option: --foobar'
}

@test "$SUITE: error if search path does not exist" {
  run "$TEST_GO_SCRIPT" commands "$TEST_GO_SCRIPTS_DIR:foo/bar"
  assert_failure "Command search path foo/bar does not exist."
}

@test "$SUITE: error if any arguments after search path" {
  run "$TEST_GO_SCRIPT" commands "$TEST_GO_SCRIPTS_DIR" foo bar
  assert_failure "Cannot specify any arguments after search paths."
}

@test "$SUITE: error if command is a shell alias" {
  run "$TEST_GO_SCRIPT" commands ls
  assert_failure 'ls is a shell alias.'
}

@test "$SUITE: error if command does not exist" {
  run "$TEST_GO_SCRIPT" commands foo
  assert_failure
  assert_line_equals 0 'Unknown command: foo'
}

@test "$SUITE: error if no commands found" {
  run "$TEST_GO_SCRIPT" commands "$TEST_GO_SCRIPTS_DIR"
  assert_failure ''
}

@test "$SUITE: list top-level builtins, plugins, and scripts by default" {
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    'plugins/xyzzy/bin/xyzzy'

  local cmd_name

  @go.create_test_command_script 'bar.d/child0'
  @go.create_test_command_script 'baz.d/child1'
  @go.create_test_command_script 'foo.d/child2'
  @go.create_test_command_script 'plugins/plugh/bin/plugh.d/child3'
  @go.create_test_command_script 'plugins/quux/bin/quux.d/child4'
  @go.create_test_command_script 'plugins/xyzzy/bin/xyzzy.d/child5'

  run "$TEST_GO_SCRIPT" commands
  assert_success "${__all_scripts[@]##*/}"
}

@test "$SUITE: specify plugins and user search paths, omit builtins" {
  local __all_scripts=()

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    'plugins/xyzzy/bin/xyzzy'
  local search_paths=()

  test_join ':' search_paths \
    "$TEST_GO_SCRIPTS_DIR/plugins/"{plugh,quux,xyzzy}"/bin" \
    "$TEST_GO_SCRIPTS_DIR"
  run "$TEST_GO_SCRIPT" commands "${search_paths[*]}"
  assert_success "${__all_scripts[@]##*/}"
}

generate_expected_paths() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __generate_expected_paths
  restore_bats_shell_options "$?"
}

__generate_expected_paths() {
  local script
  local cmd_name
  local longest_cmd_name_len
  for cmd_script in "${__all_scripts[@]}"; do
    cmd_name="${cmd_script##*/}"
    if [[ "${#cmd_name}" -gt "$longest_cmd_name_len" ]]; then
      longest_cmd_name_len="${#cmd_name}"
    fi
  done

  for script in "${__all_scripts[@]}"; do
    cmd_name="${script##*/}"
    __expected_paths+=("$(printf "%-${longest_cmd_name_len}s  %s" \
      "$cmd_name" "$script")")
  done
}

@test "$SUITE: command paths are relative to _GO_ROOTDIR by default" {
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    'plugins/xyzzy/bin/xyzzy'

  local __expected_paths=()
  __all_scripts=("${__all_scripts[@]#$TEST_GO_ROOTDIR/}")
  generate_expected_paths

  run "$TEST_GO_SCRIPT" commands --paths
  assert_success "${__expected_paths[@]}"
}

@test "$SUITE: command paths are relative to PWD when _GO_STANDALONE is set" {
  local __all_scripts=("${BUILTIN_SCRIPTS[@]}")

  # Command script and plugin script names must remain hand-sorted.
  add_scripts 'bar' 'baz' 'foo' \
    'plugins/plugh/bin/plugh' \
    'plugins/quux/bin/quux' \
    'plugins/xyzzy/bin/xyzzy'

  local __expected_paths=()
  __all_scripts=("${__all_scripts[@]#$HOME/}")
  generate_expected_paths

  cd "$HOME"
  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT" commands --paths
  assert_success "${__expected_paths[@]}"
}

create_script_with_description() {
  local script_path="$1"
  local cmd_name="${script_path##*/}"

  @go.create_test_command_script "$script_path" \
    '#' \
    "# Does $cmd_name stuff"
}

@test "$SUITE: command summaries" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  create_script_with_description 'foo'
  create_script_with_description 'bar'
  create_script_with_description 'baz'
  restore_bats_shell_options "$?"

  run "$TEST_GO_SCRIPT" commands --summaries "$TEST_GO_SCRIPTS_DIR"
  assert_success '  bar  Does bar stuff' \
    '  baz  Does baz stuff' \
    '  foo  Does foo stuff'
}

create_top_level_and_subcommand_scripts() {
  local cmd_name
  local subcmd_dir
  local subcmd_name

  for cmd_name in "${top_level_commands[@]}"; do
    create_script_with_description "$cmd_name"
    subcmd_dir="$TEST_GO_SCRIPTS_DIR/$cmd_name.d"
    mkdir "$subcmd_dir"

    for subcmd_name in "${subcommands[@]}"; do
      create_script_with_description "$cmd_name.d/$subcmd_name"
    done
  done
}

@test "$SUITE: subcommand list, paths, and summaries" {
  local top_level_commands=('bar' 'baz' 'foo')
  local subcommands=('plugh' 'quux' 'xyzzy')

  set "$DISABLE_BATS_SHELL_OPTIONS"
  create_top_level_and_subcommand_scripts
  restore_bats_shell_options "$?"

  run "$TEST_GO_SCRIPT" commands 'foo'
  assert_success "${subcommands[@]}"

  local expected_paths=(
    'plugh  scripts/foo.d/plugh'
    'quux   scripts/foo.d/quux'
    'xyzzy  scripts/foo.d/xyzzy')

  run "$TEST_GO_SCRIPT" commands --paths 'foo'
  assert_success "${expected_paths[@]}"

  local expected_summaries=(
    '  plugh  Does plugh stuff'
    '  quux   Does quux stuff'
    '  xyzzy  Does xyzzy stuff')
  run "$TEST_GO_SCRIPT" commands --summaries 'foo'
  assert_success "${expected_summaries[@]}"
}
