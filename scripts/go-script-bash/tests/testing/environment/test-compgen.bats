#! /usr/bin/env bats

load ../../environment

EXPECTED=()

setup() {
  test_filter
  @go.create_test_go_script
  export -f @go.test_compgen

  set "$DISABLE_BATS_SHELL_OPTIONS"
  setup_go_test_compgen
  restore_bats_shell_options "$?"

  @go.create_test_go_script \
    'declare results=()' \
    'if ! @go.test_compgen "results" "$@"; then' \
    '  exit 1' \
    'fi' \
    'printf "%s\n" "${results[@]}"'
}

teardown() {
  @go.remove_test_go_rootdir
}

setup_go_test_compgen() {
  local item

  mkdir -p "$TEST_GO_ROOTDIR/lib"
  printf 'foo' >"$TEST_GO_ROOTDIR/lib/foo"
  printf 'bar' >"$TEST_GO_ROOTDIR/lib/bar"
  printf 'baz' >"$TEST_GO_ROOTDIR/lib/baz"

  . "$_GO_USE_MODULES" 'complete'
  while IFS= read -r item; do
    EXPECTED+=("${item#$TEST_GO_ROOTDIR/}")
  done < <(@go.compgen -f -- "$TEST_GO_ROOTDIR/lib/")
}

@test "$SUITE: completion succeeds" {
  run "$TEST_GO_SCRIPT" -f -- lib/
  assert_success "${EXPECTED[@]}"
}

@test "$SUITE: completion fails" {
  run "$TEST_GO_SCRIPT" -f -- lib/nonexistent
  assert_failure \
    'compgen failed or results were empty: "-f" "--" "lib/nonexistent"'
}

@test "$SUITE: fails if completions are empty" {
  run "$TEST_GO_SCRIPT" lib/nonexistent
  assert_failure 'compgen failed or results were empty: "lib/nonexistent"'
}
