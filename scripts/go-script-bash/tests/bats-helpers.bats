#! /usr/bin/env bats

load environment

setup() {
  test_filter
}

teardown() {
  remove_bats_test_dirs
}

@test "$SUITE: suite name" {
  assert_equal 'bats-helpers: suite name' "$BATS_TEST_DESCRIPTION" 'SUITE'
}

@test "$SUITE: BATS_TEST_ROOTDIR contains space" {
  assert_matches ' ' "$BATS_TEST_ROOTDIR" "BATS_TEST_ROOTDIR"
}

check_dirs_do_not_exist() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __check_dirs_do_not_exist "$@"
  restore_bats_shell_options "$?"
}

__check_dirs_do_not_exist() {
  local test_dir

  for test_dir in "$@"; do
    if [[ -d "$BATS_TEST_ROOTDIR/$test_dir" ]]; then
      printf "'$test_dir' already present in '$BATS_TEST_ROOTDIR'\n" >&2
      return 1
    fi
  done
}

check_dirs_exist() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __check_dirs_exist "$@"
  restore_bats_shell_options "$?"
}

__check_dirs_exist() {
  local test_dir

  for test_dir in "${test_dirs[@]}"; do
    if [[ ! -d "$BATS_TEST_ROOTDIR/$test_dir" ]]; then
      printf "Failed to create '$test_dir' in '$BATS_TEST_ROOTDIR'\n" >&2
      return 1
    fi
  done
}

@test "$SUITE: {create,remove}_bats_test_dirs" {
  local test_dirs=('foo'
    'bar/baz'
    'quux/xyzzy'
    'quux/plugh'
  )

  if [[ -d "$BATS_TEST_ROOTDIR" ]]; then
    fail "'$BATS_TEST_ROOTDIR' already exists"
  fi
  check_dirs_do_not_exist "${test_dirs[@]}"

  run create_bats_test_dirs "${test_dirs[@]}"
  assert_success
  check_dirs_exist "${test_dirs[@]}"

  run remove_bats_test_dirs
  assert_success

  if [[ -d "$BATS_TEST_ROOTDIR" ]]; then
    fail "Failed to remove '$BATS_TEST_ROOTDIR'"
  fi
}

@test "$SUITE: create_bats_test_script errors if no args" {
  run create_bats_test_script
  assert_failure 'No test script specified'
}

@test "$SUITE: create_bats_test_script creates Bash script" {
  if [[ -d "$BATS_TEST_ROOTDIR" ]]; then
    fail "'$BATS_TEST_ROOTDIR' already exists"
  fi

  run create_bats_test_script test-script \
    'echo Hello, World!'
  assert_success
  assert_file_equals "$BATS_TEST_ROOTDIR/test-script" \
    '#! /usr/bin/env bash' \
    'echo Hello, World!'

  if [[ ! -x "$BATS_TEST_ROOTDIR/test-script" ]]; then
    fail "Failed to make the test script executable"
  fi
}

@test "$SUITE: create_bats_test_script creates Perl script" {
  run create_bats_test_script test-script \
    '#! /usr/bin/env perl' \
    'printf "Hello, World!\n";'
  assert_success
  assert_file_equals "$BATS_TEST_ROOTDIR/test-script" \
    '#! /usr/bin/env perl' \
    'printf "Hello, World!\n";'
}

@test "$SUITE: create_bats_test_script automatically creates parent dirs" {
  if [[ -d "$BATS_TEST_ROOTDIR/foo/bar" ]]; then
    fail "'$BATS_TEST_ROOTDIR/foo/bar' already exists"
  fi

  run create_bats_test_script foo/bar/test-script \
    'echo Hello, World!'
  assert_success
  assert_file_equals "$BATS_TEST_ROOTDIR/foo/bar/test-script" \
    '#! /usr/bin/env bash' \
    'echo Hello, World!'
}

@test "$SUITE: fs_missing_permission_support" {
  local expected_result='false'

  # On some Windows file systems, any file starting with '#!' will be marked
  # executable. This is how we can tell Unix-style permissions aren't supported,
  # and thus some test conditions can't be created.
  create_bats_test_script test-script 'echo Hello, World!'
  chmod 600 "$BATS_TEST_ROOTDIR/test-script"
  run fs_missing_permission_support

  if [[ -x "$BATS_TEST_ROOTDIR/test-script" ]]; then
    assert_success
  else
    assert_failure
  fi
}

@test "$SUITE: skip_if_cannot_trigger_file_permission_failure" {
  if fs_missing_file_permission_support; then
    skip_if_cannot_trigger_file_permission_failure
    fail "Should have skipped this test due to missing file permission support"
  elif [[ "$EUID" -eq '0' ]]; then
    skip_if_cannot_trigger_file_permission_failure
    fail "Should have skipped this test due to running as the superuser"
  fi
}

@test "$SUITE: skip if system missing" {
  create_bats_test_script 'test.bats' \
    '#! /usr/bin/env bats' \
    "load '$_GO_CORE_DIR/lib/bats/helpers'" \
    '@test "skip if missing" { skip_if_system_missing foo bar baz; }'

  stub_program_in_path 'foo'
  stub_program_in_path 'bar'
  stub_program_in_path 'baz'

  run bats "$BATS_TEST_ROOTDIR/test.bats"
  assert_success
  assert_lines_equal '1..1' \
    'ok 1 skip if missing'

  rm "$BATS_TEST_BINDIR"/*
  run bats "$BATS_TEST_ROOTDIR/test.bats"
  assert_success
  assert_lines_equal '1..1' \
    'ok 1 # skip (foo, bar, baz not installed on the system) skip if missing'
}

@test "$SUITE: test_join fails if result variable name is invalid" {
  create_bats_test_script test-script \
    ". '$_GO_CORE_DIR/lib/bats/helpers'" \
    "test_join ',' '3foobar'"
  run "$BATS_TEST_ROOTDIR/test-script"
  assert_failure '"3foobar" is not a valid variable identifier.'
}

@test "$SUITE: test_join succeeds" {
  create_bats_test_script test-script \
    ". '$_GO_CORE_DIR/lib/bats/helpers'" \
    "declare result" \
    "test_join ',' 'result' '--foo' 'bar' 'baz' 'This \"%/\" is from #98.'" \
    "printf '%s\n' \"\$result\""
  run "$BATS_TEST_ROOTDIR/test-script"
  assert_success '--foo,bar,baz,This "%/" is from #98.'
}

@test "$SUITE: test_printf" {
  create_bats_test_script test-script \
    "test_printf '%s\n' 'some test debug output'"

  run "$BATS_TEST_ROOTDIR/test-script"
  assert_success ''
  TEST_DEBUG='true' run "$BATS_TEST_ROOTDIR/test-script"
  assert_success 'some test debug output'
}

@test "$SUITE: test_filter" {
  # We have to define the script as an array, or the main Bats process will try
  # to parse it.
  local test_file="$BATS_TEST_ROOTDIR/test.bats"
  local test_script=('#! /usr/bin/env bats'
    "load '$_GO_CORE_DIR/lib/bats/helpers'"
    'setup() { test_filter; }'
    '@test "foo" { :; }'
    '@test "bar" { :; }'
    '@test "baz" { :; }')

  create_bats_test_script "${test_file#$BATS_TEST_ROOTDIR/}" "${test_script[@]}"

  TEST_FILTER= run bats "$test_file"
  assert_success
  assert_lines_equal '1..3' \
    'ok 1 foo' \
    'ok 2 bar' \
    'ok 3 baz'

  TEST_FILTER='b[a-z]r' run bats "$test_file"
  assert_success
  assert_lines_equal '1..3' \
    'ok 1 # skip foo' \
    'ok 2 bar' \
    'ok 3 # skip baz'
}

@test "$SUITE: split_bats_output_into_lines" {
  # Bats will still trim traling newlines from `output`, so don't include them.
  local test_output=$'\n\nfoo\n\nbar\n\nbaz'
  run printf "$test_output"
  assert_success "$test_output"
  assert_lines_equal 'foo' 'bar' 'baz'
  split_bats_output_into_lines
  assert_lines_equal '' '' 'foo' '' 'bar' '' 'baz'
}

@test "$SUITE: stub_program_in_path for testing external program" {
  local bats_bindir_pattern="^${BATS_TEST_BINDIR}:"
  fail_if matches "$bats_bindir_pattern" "$PATH"

  stub_program_in_path 'chmod' 'echo "$@"'
  assert_matches "$bats_bindir_pattern" "$PATH"

  run chmod ugo+rwx foo.txt
  assert_success 'ugo+rwx foo.txt'
}

@test "$SUITE: {stub,restore}_program_in_path for testing in-process function" {
  local orig_path="$(command -v mkdir)"

  stub_program_in_path --in-process 'mkdir' 'echo "$@"'
  run command -v mkdir
  assert_success "$BATS_TEST_BINDIR/mkdir"

  restore_program_in_path 'mkdir'
  run command -v mkdir
  assert_success "$orig_path"
}

@test "$SUITE: restore_program_in_path fails when stub doesn't exist" {
  run restore_program_in_path 'foobar'
  assert_failure "Bats test stub program doesn't exist: foobar"
}
