#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script '. "$_GO_USE_MODULES" complete' \
    '@go.compgen "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: does nothing for empty argument list" {
  run "$TEST_GO_SCRIPT"
  assert_success ''
}

@test "$SUITE: returns all word list arguments for empty string" {
  run "$TEST_GO_SCRIPT" -W 'foo bar baz' -- ''
  local expected=($(compgen -W 'foo bar baz' -- ''))
  assert_success "${expected[@]}"
}

@test "$SUITE: appends space to single word list match" {
  run "$TEST_GO_SCRIPT" -W 'foo bar baz' -- 'f'
  assert_success 'foo '
}

@test "$SUITE: doesn't add space to single match with trailing space or slash" {
  # This emulates the case where output from a command script using
  # `@go.compgen` is fed through `@go.compgen` again in `libexec/complete'.
  run "$TEST_GO_SCRIPT" -W 'foo\ ' -- 'f'
  assert_success 'foo '
  run "$TEST_GO_SCRIPT" -W 'foo/' -- 'f'
  assert_success 'foo/'
}

@test "$SUITE: returns error when word doesn't match word list" {
  run "$TEST_GO_SCRIPT" -W 'foo bar baz' -- 'q'
  assert_failure ''
}

@test "$SUITE: doesn't add trailing slashes when not called with -d or -f" {
  mkdir -p "${TEST_GO_ROOTDIR}"/{foo,bar,baz}
  run "$TEST_GO_SCRIPT" -W 'foo bar baz' -- ''
  local expected=($(cd "$TEST_GO_ROOTDIR"; compgen -W 'foo bar baz' -- ''))
  assert_success "${expected[@]}"
}

@test "$SUITE: adds trailing slashes when called with -d" {
  mkdir -p "${TEST_GO_ROOTDIR}"/{foo,bar,baz}
  run "$TEST_GO_SCRIPT" -d -- ''

  # Remember that `compgen` won't add trailing slashes by itself.
  local expected=($(cd "$TEST_GO_ROOTDIR"; compgen -d -- ''))
  assert_success "${expected[@]/%//}"
}

add_trailing_slashes() {
  local i
  for ((i=0; i != "${#expected[@]}"; ++i)); do
    if [[ -d "$TEST_GO_ROOTDIR/${expected[$i]}" ]]; then
      expected[$i]+='/'
    fi
  done
}

@test "$SUITE: adds trailing slashes when called with -f" {
  mkdir -p "${TEST_GO_ROOTDIR}"/{foo,bar,baz}
  run "$TEST_GO_SCRIPT" -f -- ''

  set "$DISABLE_BATS_SHELL_OPTIONS"
  # Remember that `compgen` won't add trailing slashes by itself.
  local expected=($(cd "$TEST_GO_ROOTDIR"; compgen -f -- ''))
  add_trailing_slashes
  restore_bats_shell_options "$?"
  assert_success "${expected[@]}"
}
