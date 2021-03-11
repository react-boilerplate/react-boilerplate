#! /usr/bin/env bats

load environment

setup() {
  mkdir -p "$TEST_GO_ROOTDIR/bin" "$TEST_GO_SCRIPTS_DIR"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completions" {
  local versions=('v1.0.0' 'v1.1.0')

  stub_program_in_path 'git' \
    "if [[ \"\$1\" == 'tag' ]]; then" \
    "  echo '${versions[*]}'" \
    '  exit 0' \
    'fi' \
    'exit 1'

  run git tag
  assert_success "${versions[*]}"

  run ./go complete 1 changes ''
  local IFS=$'\n'
  assert_success "${versions[*]}"

  run ./go complete 1 changes 'v1.0'
  assert_success 'v1.0.0 '

  run ./go complete 2 changes 'v1.0.0' 'v1.1'
  assert_success 'v1.1.0 '

  run ./go complete 3 changes 'v1.0.0' 'v1.1.0' ''
  assert_failure ''
}

@test "$SUITE: error if no start ref" {
  run ./go changes
  assert_failure "Start ref not specified."
}

@test "$SUITE: error if no end ref" {
  run ./go changes v1.0.0
  assert_failure "End ref not specified."
}

@test "$SUITE: git log call is well-formed" {
  stub_program_in_path 'git' \
    "if [[ \"\$1\" == 'log' ]]; then" \
    '  shift' \
    "  IFS=\$'\\n'" \
    '  echo "$*"' \
    '  exit 0' \
    'fi' \
    'exit 1'

  run ./go changes v1.0.0 v1.1.0
  assert_success
  assert_line_matches 0 '^--pretty=format:'
  assert_line_matches 1 '^v1\.0\.0\.\.v1\.1\.0$'
}
