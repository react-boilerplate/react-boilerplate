#! /usr/bin/env bats

load environment
load commands/helpers
. "$_GO_USE_MODULES" 'complete'

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
  find_builtins
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: complete help flag variations" {
  run "$TEST_GO_SCRIPT" complete 0 -h
  assert_success '-h '

  run "$TEST_GO_SCRIPT" complete 0 -he
  assert_success '-help '

  run "$TEST_GO_SCRIPT" complete 0 -
  assert_success '--help '

  run "$TEST_GO_SCRIPT" complete 0 --
  assert_success '--help '
}

@test "$SUITE: all top-level commands for zeroth or first argument" {
  local __all_scripts=("${BUILTIN_CMDS[@]}")

  # The script name arguments must remain alphabetically sorted by basename.
  add_scripts 'bar' 'plugins/baz/bin/baz' 'foo'

  # Aliases will get printed before all other commands.
  run "$TEST_GO_SCRIPT" complete 0
  assert_success $(./go 'aliases') "${__all_scripts[@]##*/}"

  run "$TEST_GO_SCRIPT" complete 0 complete
  assert_success 'complete '

  run "$TEST_GO_SCRIPT" complete 0 complete-not
  assert_failure ''
}

@test "$SUITE: _GO_STANDALONE only completes 'help' and project scripts" {
  @go.create_test_command_script 'foo'
  @go.create_test_command_script 'bar'
  @go.create_test_command_script 'plugins/baz/bin/baz'

  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT" complete 0
  assert_success 'help' 'bar' 'foo'
}

@test "$SUITE: cd and pushd complete directories" {
  local subdirs=('bar' 'baz' 'foo')
  local files=('plugh' 'quux' 'xyzzy')
  mkdir -p "${subdirs[@]/#/$TEST_GO_SCRIPTS_DIR/}"
  touch "${files[@]/#/$TEST_GO_SCRIPTS_DIR/}"

  run "$TEST_GO_SCRIPT" complete 1 cd
  assert_success 'scripts/'
  run "$TEST_GO_SCRIPT" complete 1 pushd ''
  assert_success 'scripts/'

  local expected=()
  @go.test_compgen expected -d "$TEST_GO_SCRIPTS_DIR/"
  expected=("${expected[@]#$TEST_GO_ROOTDIR/}")

  run "$TEST_GO_SCRIPT" complete 1 cd 'scripts/'
  assert_success "${expected[@]}"
  run "$TEST_GO_SCRIPT" complete 1 pushd 'scripts/'
  assert_success "${expected[@]}"
}

@test "$SUITE: edit, run, and aliases complete directories and files" {
  local subdirs=('bar' 'baz' 'foo')
  local files=('plugh' 'quux' 'xyzzy')
  mkdir -p "${subdirs[@]/#/$TEST_GO_SCRIPTS_DIR/}"
  touch "${files[@]/#/$TEST_GO_SCRIPTS_DIR/}"

  local top_level=()
  @go.test_compgen top_level -f "$TEST_GO_ROOTDIR/"
  top_level=("${top_level[@]#$TEST_GO_ROOTDIR/}")

  local all_scripts_entries=()
  @go.test_compgen all_scripts_entries -f "$TEST_GO_SCRIPTS_DIR/"
  all_scripts_entries=("${all_scripts_entries[@]#$TEST_GO_ROOTDIR/}")

  run "$TEST_GO_SCRIPT" complete 1 edit ''
  assert_success "${top_level[@]}"
  run "$TEST_GO_SCRIPT" complete 1 run ''
  assert_success "${top_level[@]}"
  run "$TEST_GO_SCRIPT" complete 1 ls ''
  assert_success "${top_level[@]}"

  run "$TEST_GO_SCRIPT" complete 1 edit 'scripts/'
  assert_success "${all_scripts_entries[@]}"
  run "$TEST_GO_SCRIPT" complete 1 run 'scripts/'
  assert_success "${all_scripts_entries[@]}"
  run "$TEST_GO_SCRIPT" complete 1 ls 'scripts/'
  assert_success "${all_scripts_entries[@]}"
}

@test "$SUITE: unenv, unknown flags, and unknown commands return errors" {
  run "$TEST_GO_SCRIPT" complete 1 unenv ''
  assert_failure ''

  run "$TEST_GO_SCRIPT" complete 1 --foobar ''
  assert_failure ''

  run "$TEST_GO_SCRIPT" complete 1 foobar ''
  assert_failure ''
}

@test "$SUITE: invoke command script completion" {
  @go.create_test_command_script foo \
    'if [[ "$1" == "--complete" ]]; then ' \
    '  # Tab completions' \
    '  echo "bar" "baz" "quux"' \
    'fi'

  run "$TEST_GO_SCRIPT" complete 0 foo
  assert_success 'foo '

  local expected=('bar' 'baz' 'quux')
  run "$TEST_GO_SCRIPT" complete 1 foo ''
  assert_success "${expected[@]}"

  expected=('bar' 'baz')
  run "$TEST_GO_SCRIPT" complete 1 foo 'b'
  assert_success "${expected[@]}"

  run "$TEST_GO_SCRIPT" complete 2 foo 'b' 'q'
  assert_success 'quux '

  run "$TEST_GO_SCRIPT" complete 1 foo 'x'
  assert_failure ''
}

@test "$SUITE: command script completion not detected without comment" {
  @go.create_test_command_script foo \
    'if [[ "$1" == "--complete" ]]; then ' \
    '  echo "bar" "baz" "quux"' \
    'fi'

  run "$TEST_GO_SCRIPT" complete 0 foo
  assert_success 'foo '

  run "$TEST_GO_SCRIPT" complete 1 foo ''
  assert_failure ''
}

@test "$SUITE: subcommand script completion" {
  @go.create_test_command_script foo \
    'if [[ "$1" == "--complete" ]]; then ' \
    '  # Tab completions' \
    '  echo "baz" "quux"' \
    'fi'

  mkdir "$TEST_GO_SCRIPTS_DIR/foo.d"

  @go.create_test_command_script foo.d/bar \
    'if [[ "$1" == "--complete" ]]; then ' \
    '  # Tab completions' \
    '  echo "plugh" "xyzzy"' \
    'fi'

  run "$TEST_GO_SCRIPT" complete 0 foo
  assert_success 'foo '

  # Note that 'bar' should show up automatically because it is in foo.d, even
  # though it isn't in the compgen word list inside foo.
  local expected=('bar' 'baz' 'quux')
  run "$TEST_GO_SCRIPT" complete 1 foo ''
  assert_success "${expected[@]}"

  run "$TEST_GO_SCRIPT" complete 1 foo bar
  assert_success 'bar '

  local expected=('plugh' 'xyzzy')
  run "$TEST_GO_SCRIPT" complete 2 foo bar ''
  assert_success "${expected[@]}"
}

@test "$SUITE: -h, -help, and --help invoke help command completion" {
  run "$TEST_GO_SCRIPT" complete 1 -h 'complet'
  assert_success 'complete '

  run "$TEST_GO_SCRIPT" complete 1 -help 'complet'
  assert_success 'complete '

  run "$TEST_GO_SCRIPT" complete 1 --help 'complet'
  assert_success 'complete '
}
