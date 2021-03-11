#! /usr/bin/env bats

load ../environment

MESSAGE='Hello, World!'

teardown() {
  @go.remove_test_go_rootdir
}

create_fds_printf_test_script() {
  @go.create_test_go_script \
    '. "$_GO_USE_MODULES" "file"' \
    'declare output_fds' \
    "$@" \
    "@go.fds_printf \"\$output_fds\" '$MESSAGE\n'"
}

@test "$SUITE: print to standard output" {
  create_fds_printf_test_script \
    'output_fds="1"'
  run "$TEST_GO_SCRIPT"
  assert_success "$MESSAGE"
}

@test "$SUITE: print to a file" {
  local file_path="$TEST_GO_ROOTDIR/hello.txt"

  create_fds_printf_test_script \
    "declare output_file='$file_path'" \
    'declare output_fd' \
    "@go.open_file_or_duplicate_fd '$file_path' 'w' 'output_fd'" \
    'output_fds="$output_fd"'
  run "$TEST_GO_SCRIPT"
  assert_success
  assert_file_equals "$file_path" "$MESSAGE"
}

@test "$SUITE: print to standard output and to a file" {
  local file_path="$TEST_GO_ROOTDIR/hello.txt"

  create_fds_printf_test_script \
    "declare output_file='$file_path'" \
    'declare output_fd' \
    "@go.open_file_or_duplicate_fd '$file_path' 'w' 'output_fd'" \
    'output_fds="1,$output_fd"'
  run "$TEST_GO_SCRIPT"
  assert_success "$MESSAGE"
  assert_file_equals "$file_path" "$MESSAGE"
}

@test "$SUITE: error if non-file descriptor argument given" {
  local file_path="$TEST_GO_ROOTDIR/hello.txt"

  create_fds_printf_test_script \
    "output_fds='1,$file_path'"
  run "$TEST_GO_SCRIPT"

  local expected=(
    "Invalid file descriptor value \"$file_path\" for @go.fds_printf at:"
    "  $TEST_GO_SCRIPT:6 main"
  )
  local IFS=$'\n'
  assert_failure "${expected[*]}"
}

@test "$SUITE: error if write to a file descriptor fails" {
  local file_path="$TEST_GO_ROOTDIR/hello.txt"

  create_fds_printf_test_script \
    "declare output_file='$file_path'" \
    'declare output_fd' \
    "@go.open_file_or_duplicate_fd '$file_path' 'w' 'output_fd'" \
    'output_fds="1,$output_fd"' \
    '@go.close_fds "$output_fd"'
  run "$TEST_GO_SCRIPT"

  assert_failure
  assert_line_equals  0    "$MESSAGE"
  assert_line_matches '-2' "Failed to print to fd [1-9][0-9]* at:"
  assert_line_matches '-1' "  $TEST_GO_SCRIPT:10 main"

  # Note that no "expected" argument means we expect the file to be completely
  # empty, with not even a newline.
  assert_file_equals "$file_path"
}
