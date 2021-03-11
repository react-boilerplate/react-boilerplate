#! /usr/bin/env bats

load ../environment

teardown() {
  @go.remove_test_go_rootdir
}

create_close_fds_test_script() {
  @go.create_test_go_script \
    '. "$_GO_USE_MODULES" "file"' \
    'declare fds=()' \
    'declare fd' \
    "$@" \
    'if @go.close_fds "${fds[@]}"; then' \
    '  for fd in "${fds[@]}"; do' \
    '    if [[ -e "/dev/fd/$fd" ]]; then' \
    '      echo "/dev/fd/$fd" >&2' \
    '      exit 1' \
    '    fi' \
    '  done' \
    'else' \
    '  exit 1' \
    'fi'
}

@test "$SUITE: error if no file descriptor arguments" {
  create_close_fds_test_script
  run "$TEST_GO_SCRIPT"

  local expected=("No file descriptors to close specified at:"
    "  $TEST_GO_SCRIPT:6 main")
  local IFS=$'\n'
  assert_failure "${expected[*]}"
}

@test "$SUITE: successfully close file descriptors" {
  create_close_fds_test_script \
    'declare read_fd_0' \
    'declare read_fd_1' \
    'declare read_fd_2' \
    '@go.open_file_or_duplicate_fd "/dev/stdin" "r" "read_fd_0"' \
    '@go.open_file_or_duplicate_fd "/dev/stdin" "r" "read_fd_1"' \
    '@go.open_file_or_duplicate_fd "/dev/stdin" "r" "read_fd_2"' \
    'fds+=("$read_fd_0" "$read_fd_1" "$read_fd_2")'
  run "$TEST_GO_SCRIPT"
  assert_success ''
}

@test "$SUITE: error if an argument isn't a file descriptor" {
  local malicious='\$(echo SURPRISE >&2; echo 1)'
  create_close_fds_test_script \
    'declare read_fd_0' \
    'declare read_fd_2' \
    '@go.open_file_or_duplicate_fd "/dev/stdin" "r" "read_fd_0"' \
    '@go.open_file_or_duplicate_fd "/dev/stdin" "r" "read_fd_2"' \
    "fds+=(\"\$read_fd_0\" '$malicious' \"\$read_fd_2\")"
  run "$TEST_GO_SCRIPT"

  local expected=("Bad file descriptor \"$malicious\" at:"
    "  $TEST_GO_SCRIPT:11 main")
  local IFS=$'\n'
  assert_failure "${expected[*]}"
}
