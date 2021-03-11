#! /usr/bin/env bats

load environment

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

# Will list the file names passed as arguments for tests that check that
# `EDITOR` gets called. Tests that check that it doesn't get called should
# see no file names output.
test_editor() {
  printf -- "EDITING: %s\n" "$@"
}
export -f test_editor
export EDITOR='test_editor'

assert_command_script_is_executable() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  local cmd_script_path="$1"
  if [[ ! -x "$TEST_GO_SCRIPTS_DIR/$cmd_script_path" ]]; then
    printf 'Failed to make command script executable: %s\n' \
      "$TEST_GO_SCRIPTS_DIR/$cmd_script_path" >&2
    restore_bats_shell_options '1'
  else
    restore_bats_shell_options
  fi
}

@test "$SUITE: tab complete first argument" {
  local flags=('--command' '--internal' '--public' '--test' '--type')
  run "$TEST_GO_SCRIPT" complete 1 new ''
  assert_success "${flags[@]}"

  run "$TEST_GO_SCRIPT" complete 1 new '-'
  assert_success "${flags[@]}"

  run "$TEST_GO_SCRIPT" complete 1 new '--'
  assert_success "${flags[@]}"

  run "$TEST_GO_SCRIPT" complete 1 new '--t'
  assert_success '--test' '--type'
}

@test "$SUITE: tab complete fails for unknown and incomplete flags" {
  run "$TEST_GO_SCRIPT" complete 1 new '--foo'
  assert_failure ''

  run "$TEST_GO_SCRIPT" complete 2 new '--foo' 'bar'
  assert_failure ''

  @go.create_test_command_script 'foobar'
  run "$TEST_GO_SCRIPT" complete 2 new '--comman' 'fooba'
  assert_failure ''
}

@test "$SUITE: tab complete --command" {
  run "$TEST_GO_SCRIPT" complete 1 new '--c'
  assert_success '--command '

  @go.create_parent_and_subcommands foo bar baz
  @go.create_test_command_script quux
  @go.create_test_command_script xyzzy

  run "$TEST_GO_SCRIPT" complete 2 new '--command'
  assert_success 'foo' 'quux' 'xyzzy'

  run "$TEST_GO_SCRIPT" complete 2 new '--command' 'f'
  assert_success 'foo '

  run "$TEST_GO_SCRIPT" complete 3 new '--command' 'foo' 'b'
  assert_success 'bar' 'baz'

  run "$TEST_GO_SCRIPT" complete 4 new '--command' 'foo' 'bar'
  assert_failure ''
}

@test "$SUITE: tab complete --internal" {
  run "$TEST_GO_SCRIPT" complete 1 new '--i'
  assert_success '--internal '

  local internal_modules
  internal_modules=("$TEST_GO_SCRIPTS_DIR/lib/"{bar,baz,foo})
  mkdir -p "$TEST_GO_SCRIPTS_DIR/lib/"
  touch "${internal_modules[@]}"

  local expected
  @go.test_compgen 'expected' -f "$TEST_GO_SCRIPTS_DIR/lib/"

  run "$TEST_GO_SCRIPT" complete 2 new '--internal'
  assert_success "${expected[@]#$TEST_GO_SCRIPTS_DIR/lib/}"

  run "$TEST_GO_SCRIPT" complete 2 new '--internal' 'f'
  assert_success 'foo '

  run "$TEST_GO_SCRIPT" complete 3 new '--internal' 'foo'
  assert_failure ''
}

@test "$SUITE: tab complete --public" {
  run "$TEST_GO_SCRIPT" complete 1 new '--p'
  assert_success '--public '

  local public_modules
  public_modules=("$TEST_GO_ROOTDIR/lib/"{plugh,quux,xyzzy})
  mkdir -p "$TEST_GO_ROOTDIR/lib/"
  touch "${public_modules[@]}"

  local expected
  @go.test_compgen 'expected' -f "$TEST_GO_ROOTDIR/lib/"

  run "$TEST_GO_SCRIPT" complete 2 new '--public'
  assert_success "${expected[@]#$TEST_GO_ROOTDIR/lib/}"

  run "$TEST_GO_SCRIPT" complete 2 new '--public' 'q'
  assert_success 'quux '

  run "$TEST_GO_SCRIPT" complete 3 new '--public' 'quux'
  assert_failure ''
}

@test "$SUITE: tab complete --test" {
  run "$TEST_GO_SCRIPT" complete 1 new '--te'
  assert_success '--test '

  local test_files
  test_files=("$TEST_GO_ROOTDIR/tests/"{aimfiz,blorple,frotz}.bats)
  mkdir -p "$TEST_GO_ROOTDIR/tests/"
  touch "${test_files[@]}"

  local expected
  @go.test_compgen 'expected' -f "$TEST_GO_ROOTDIR/$_GO_TEST_DIR/"

  run "$TEST_GO_SCRIPT" complete 2 new '--test'
  assert_success "${expected[@]#$TEST_GO_ROOTDIR/$_GO_TEST_DIR/}"

  run "$TEST_GO_SCRIPT" complete 2 new '--test' 'f'
  assert_success 'frotz.bats '

  run "$TEST_GO_SCRIPT" complete 3 new '--test' 'frotz.bats'
  assert_failure ''
}

@test "$SUITE: tab complete --type" {
  run "$TEST_GO_SCRIPT" complete 1 new '--ty'
  assert_success '--type '

  local text_files
  text_files=("$TEST_GO_ROOTDIR/gue/"{dungeonmaster,thief,wizard}.txt)
  mkdir -p "$TEST_GO_ROOTDIR/gue"
  touch "${text_files[@]}"

  local expected
  @go.test_compgen 'expected' -f "$TEST_GO_ROOTDIR/g"

  run "$TEST_GO_SCRIPT" complete 2 new '--type'
  assert_failure ''

  run "$TEST_GO_SCRIPT" complete 3 new '--type' 'adversary' 'g'
  assert_success "${expected[@]#$TEST_GO_ROOTDIR/}"

  run "$TEST_GO_SCRIPT" complete 3 new '--type' 'adversary' 'gu'
  assert_success 'gue/'

  @go.test_compgen 'expected' -f "$TEST_GO_ROOTDIR/gue/"
  run "$TEST_GO_SCRIPT" complete 3 new '--type' 'adversary' 'gue/'
  assert_success "${expected[@]#$TEST_GO_ROOTDIR/}"

  run "$TEST_GO_SCRIPT" complete 3 new '--type' 'adversary' 'gue/t'
  assert_success 'gue/thief.txt '

  run "$TEST_GO_SCRIPT" complete 4 new '--type' 'adversary' 'gue/thief.txt'
  assert_failure ''
}

@test "$SUITE: show help with exit with error when no args" {
  run "$TEST_GO_SCRIPT" new
  assert_failure
  assert_line_matches '0' "^$TEST_GO_SCRIPT new - Generate a new .* file\$"
}

@test "$SUITE: exit with error on invalid first argument/mode flag" {
  run "$TEST_GO_SCRIPT" new foo bar
  assert_failure 'The first argument is "foo", but must be one of:' \
    '  --command --internal --public --test --type'
}

@test "$SUITE: creating a file without lines opens EDITOR if found" {
  run "$TEST_GO_SCRIPT" new --type '' foo.txt 644
  assert_success 'EDITING: foo.txt'
  assert_file_equals "$TEST_GO_ROOTDIR/foo.txt" ''

  EDITOR= run "$TEST_GO_SCRIPT" new --type '' bar/baz.txt 'ugo+rwx'
  assert_success ''
  assert_file_equals "$TEST_GO_ROOTDIR/bar/baz.txt" ''
}

@test "$SUITE: creating a file with lines doesn't open EDITOR" {
  run "$TEST_GO_SCRIPT" new --type '' foo.txt 644 bar baz quux
  assert_success ''
  assert_file_equals "$TEST_GO_ROOTDIR/foo.txt" 'bar' 'baz' 'quux'
}

@test "$SUITE: error when creating a file without specifying the path" {
  run "$TEST_GO_SCRIPT" new --type ''
  assert_failure 'No file path specified.'

  run "$TEST_GO_SCRIPT" new --type 'foo'
  assert_failure 'No foo file path specified.'
}

@test "$SUITE: error when creating a file with invalid permission spec" {
  run "$TEST_GO_SCRIPT" new --type '' 'foo.txt' 'rwx-ugo'
  assert_failure 'Invalid permissions specification "rwx-ugo" for file: foo.txt'

  run "$TEST_GO_SCRIPT" new --type 'foo' 'foo.txt' '800'
  assert_failure 'Invalid permissions specification "800" for foo file: foo.txt'
}

@test "$SUITE: error if creating parent directory fails" {
  stub_program_in_path 'mkdir' 'printf "ARG: %s\n" "$@"' 'exit 1'

  run "$TEST_GO_SCRIPT" new --type '' foo/bar.txt 644
  assert_failure 'ARG: -p' 'ARG: foo' \
    "Couldn't create parent directory for new file: foo/bar.txt"

  run "$TEST_GO_SCRIPT" new --type 'foo' foo/bar.txt 'ugo+rwx'
  assert_failure 'ARG: -p' 'ARG: foo' \
    "Couldn't create parent directory for new foo file: foo/bar.txt"
}

@test "$SUITE: error if file already exists" {
  mkdir -p "$TEST_GO_ROOTDIR/foo"
  touch "$TEST_GO_ROOTDIR/foo/bar.txt"

  run "$TEST_GO_SCRIPT" new --type '' foo/bar.txt 644
  assert_failure 'file already exists: foo/bar.txt'

  run "$TEST_GO_SCRIPT" new --type 'foo' foo/bar.txt 'ugo+rwx'
  assert_failure 'foo file already exists: foo/bar.txt'
}

@test "$SUITE: error if printing to file fails" {
  stub_program_in_path 'mkdir' 'printf "ARG: %s\n" "$@"' \
    'printf "DIR NOT CREATED\n"'

  local sys_err_regex="^$_GO_CORE_DIR/libexec/new: line [1-9][0-9]*: "
  sys_err_regex+='foo/bar.txt: No such file or directory$'

  local expected=('^ARG: -p$' '^ARG: foo$' '^DIR NOT CREATED$' "$sys_err_regex")

  run "$TEST_GO_SCRIPT" new --type '' foo/bar.txt 644
  assert_failure
  assert_lines_match "${expected[@]}" \
    '^Failed to create new file: foo/bar.txt$'

  run "$TEST_GO_SCRIPT" new --type 'foo' foo/bar.txt 'ugo+rwx'
  assert_lines_match "${expected[@]}" \
    '^Failed to create new foo file: foo/bar.txt$'
}

@test "$SUITE: error if setting permissions fails" {
  stub_program_in_path 'chmod' 'printf "ARG: %s\n" "$@"' 'exit 1'

  run "$TEST_GO_SCRIPT" new --type '' foo/bar.txt 644
  assert_failure 'ARG: 644' 'ARG: foo/bar.txt' \
    'Failed to set permissions for new file to "644": foo/bar.txt'

  rm "$TEST_GO_ROOTDIR/foo/bar.txt"
  run "$TEST_GO_SCRIPT" new --type 'foo' foo/bar.txt 'ugo+rwx'
  assert_failure 'ARG: ugo+rwx' 'ARG: foo/bar.txt' \
    'Failed to set permissions for new foo file to "ugo+rwx": foo/bar.txt'
}

@test "$SUITE: error messages don't trim _GO_ROOTDIR in _GO_STANDALONE mode" {
  mkdir -p "$TEST_GO_ROOTDIR/foo"
  touch "$TEST_GO_ROOTDIR/foo/bar.txt"

  _GO_STANDALONE='true' run "$TEST_GO_SCRIPT" new --type '' \
    "$TEST_GO_ROOTDIR/foo/bar.txt" 644
  assert_failure "file already exists: $TEST_GO_ROOTDIR/foo/bar.txt"
}

@test "$SUITE: new command script" {
  run "$TEST_GO_SCRIPT" new --command foo
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/foo"
  assert_file_equals "$TEST_GO_SCRIPTS_DIR/foo" \
    '#! /usr/bin/env bash' \
    '#' \
    '# Short description of the {{cmd}} command' \
    '' \
    '_foo() {' \
    '  :' \
    '}' \
    '' \
    '_foo "$@"'
  assert_command_script_is_executable 'foo'

  rm "$TEST_GO_SCRIPTS_DIR/foo"
  EDITOR= run "$TEST_GO_SCRIPT" new --command foo
  assert_success ''
  assert_file_matches "$TEST_GO_SCRIPTS_DIR/foo" $'\n_foo "\$@"'
}

@test "$SUITE: new subcommand script" {
  run "$TEST_GO_SCRIPT" new --command foo
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/foo"
  assert_file_matches "$TEST_GO_SCRIPTS_DIR/foo" $'\n_foo\(\) \{\n'
  assert_command_script_is_executable 'foo'

  run "$TEST_GO_SCRIPT" new --command foo bar
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/foo.d/bar"
  assert_file_matches  "$TEST_GO_SCRIPTS_DIR/foo.d/bar" $'\n_bar\(\) \{\n'
  assert_command_script_is_executable 'foo.d/bar'
}

@test "$SUITE: new command and subcommand scripts" {
  run "$TEST_GO_SCRIPT" new --command foo bar baz
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/foo" \
    "EDITING: $TEST_GO_SCRIPTS_DIR/foo.d/bar" \
    "EDITING: $TEST_GO_SCRIPTS_DIR/foo.d/bar.d/baz"

  assert_file_equals "$TEST_GO_SCRIPTS_DIR/foo" \
    '#! /usr/bin/env bash' \
    '#' \
    '# Short description of the {{cmd}} command' \
    '' \
    ". \"\$_GO_USE_MODULES\" 'subcommands'" \
    '' \
    '@go.show_subcommands'
  assert_file_matches "$TEST_GO_SCRIPTS_DIR/foo.d/bar" '@go.show_subcommands'
  assert_file_matches "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d/baz" $'\n_baz\(\) \{\n'

  assert_command_script_is_executable 'foo'
  assert_command_script_is_executable 'foo.d/bar'
  assert_command_script_is_executable 'foo.d/bar.d/baz'
}

@test "$SUITE: --command fails if no script specified" {
  run "$TEST_GO_SCRIPT" new --command
  assert_failure 'No command script name specified.'
}

@test "$SUITE: --command fails if script already exists" {
  run "$TEST_GO_SCRIPT" new --command foo bar baz
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/foo" \
    "EDITING: $TEST_GO_SCRIPTS_DIR/foo.d/bar" \
    "EDITING: $TEST_GO_SCRIPTS_DIR/foo.d/bar.d/baz"
  run "$TEST_GO_SCRIPT" new --command foo bar baz

  local failing_path="$TEST_GO_SCRIPTS_RELATIVE_DIR/foo.d/bar.d/baz"
  assert_failure "command script file already exists: $failing_path"
}

@test "$SUITE: --internal creates new internal module" {
  run "$TEST_GO_SCRIPT" new --internal foo
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/lib/foo"
  assert_file_equals "$TEST_GO_SCRIPTS_DIR/lib/foo" \
    '#! /usr/bin/env bash' \
    '#' \
    '# Short description of the foo module' \
    '#' \
    '# Exports:' \
    '#   func_name' \
    '#     Short description of the func_name function'

  rm "$TEST_GO_SCRIPTS_DIR/lib/foo"
  EDITOR= run "$TEST_GO_SCRIPT" new --internal foo
  assert_success ''
  assert_file_matches "$TEST_GO_SCRIPTS_DIR/lib/foo" \
    $'\n# Short description of the foo module\n'
}

@test "$SUITE: --internal fails if internal module already exists" {
  run "$TEST_GO_SCRIPT" new --internal foo
  assert_success "EDITING: $TEST_GO_SCRIPTS_DIR/lib/foo"
  run "$TEST_GO_SCRIPT" new --internal foo
  assert_failure \
    "internal module file already exists: $TEST_GO_SCRIPTS_RELATIVE_DIR/lib/foo"
}

@test "$SUITE: --public creates new public module" {
  run "$TEST_GO_SCRIPT" new --public foo/bar/baz
  assert_success "EDITING: $TEST_GO_ROOTDIR/lib/foo/bar/baz"
  assert_file_matches "$TEST_GO_ROOTDIR/lib/foo/bar/baz" \
    $'\n# Short description of the foo/bar/baz module\n'

  rm "$TEST_GO_ROOTDIR/lib/foo/bar/baz"
  EDITOR= run "$TEST_GO_SCRIPT" new --public foo/bar/baz
  assert_success ''
  assert_file_matches "$TEST_GO_ROOTDIR/lib/foo/bar/baz" \
    $'\n# Short description of the foo/bar/baz module\n'
}

@test "$SUITE: --public fails if public module already exists" {
  run "$TEST_GO_SCRIPT" new --public foo/bar/baz
  assert_success "EDITING: $TEST_GO_ROOTDIR/lib/foo/bar/baz"
  run "$TEST_GO_SCRIPT" new --public foo/bar/baz
  assert_failure 'public module file already exists: lib/foo/bar/baz'
}

@test "$SUITE: --test creates new Bats test file" {
  run "$TEST_GO_SCRIPT" new --test foo/bar/baz
  assert_success "EDITING: $TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo/bar/baz.bats"
  assert_file_equals "$TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo/bar/baz.bats" \
    '#! /usr/bin/env bats' \
    '' \
    'load ../../environment' \
    '' \
    'setup() {' \
    '  test_filter' \
    '  @go.create_test_go_script' \
    '}' \
    '' \
    'teardown() {' \
    '  @go.remove_test_go_rootdir' \
    '}' \
    '' \
    '@test "$SUITE: short description of your first test case" {' \
    '}'

  rm "$TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo/bar/baz.bats"
  EDITOR= run "$TEST_GO_SCRIPT" new --test foo/bar/baz
  assert_success ''
  assert_file_matches "$TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo/bar/baz.bats" \
    $'\n@test "\$SUITE: short description of your first test case" \{\n'
}

@test "$SUITE: no '../' in environment load path for top-level test" {
  run "$TEST_GO_SCRIPT" new --test foo
  assert_success "EDITING: $TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo.bats"
  assert_file_matches "$TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo.bats" \
    $'\nload environment\n'
}

@test "$SUITE: --test fails if test already exists" {
  run "$TEST_GO_SCRIPT" new --test foo/bar/baz
  assert_success "EDITING: $TEST_GO_ROOTDIR/$_GO_TEST_DIR/foo/bar/baz.bats"
  run "$TEST_GO_SCRIPT" new --test foo/bar/baz
  assert_failure "Bats test file already exists: $_GO_TEST_DIR/foo/bar/baz.bats"
}
