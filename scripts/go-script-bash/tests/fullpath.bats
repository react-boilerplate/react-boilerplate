#! /usr/bin/env bats

load environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: tab completions" {
  local expected=()
  @go.test_compgen expected -f

  run ./go complete 1 fullpath ''
  assert_success '--existing' "${expected[@]}"

  run ./go complete 1 fullpath '-'
  assert_success '--existing '

  @go.test_compgen expected -f -- 'li'
  fail_if equal '0' "${#expected[@]}"
  run ./go complete 1 fullpath 'li'
  assert_success "${expected[@]}"
}

@test "$SUITE: prints rootdir when no arguments" {
  run ./go fullpath
  assert_success "$_GO_ROOTDIR"

  run ./go fullpath '--existing'
  assert_success "$_GO_ROOTDIR"
}

@test "$SUITE: prefixes non-absolute path arguments with rootdir" {
  run ./go fullpath foo /bar foo/baz /quux/xyzzy plugh
  local expected=(
    "$_GO_ROOTDIR/foo"
    '/bar'
    "$_GO_ROOTDIR/foo/baz"
    '/quux/xyzzy'
    "$_GO_ROOTDIR/plugh")
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: only print existing paths" {
  @go.create_test_go_script '@go "$@"'
  mkdir "$TEST_GO_ROOTDIR"/foo
  touch "$TEST_GO_ROOTDIR"/plugh

  run "$TEST_GO_SCRIPT" fullpath --existing foo / foo/baz /quux/xyzzy plugh
  local expected=("$TEST_GO_ROOTDIR/foo" '/' "$TEST_GO_ROOTDIR/plugh")
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: expand glob paths" {
  @go.create_test_go_script '@go "$@"'
  mkdir -p "$TEST_GO_ROOTDIR/foo/bar"
  touch "$TEST_GO_ROOTDIR/foo/"{baz,quux}

  run "$TEST_GO_SCRIPT" fullpath --existing 'foo/*' 'foo/baz/*'
  local expected=(
    "$TEST_GO_ROOTDIR/foo/bar"
    "$TEST_GO_ROOTDIR/foo/baz"
    "$TEST_GO_ROOTDIR/foo/quux")
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: expand glob paths containing spaces" {
  @go.create_test_go_script '@go "$@"'
  mkdir "$TEST_GO_ROOTDIR/foo bar"
  touch "$TEST_GO_ROOTDIR/foo bar/"{baz,quux,xyzzy}

  run "$TEST_GO_SCRIPT" fullpath --existing 'foo bar/*'
  local expected=(
    "$TEST_GO_ROOTDIR/foo bar/baz"
    "$TEST_GO_ROOTDIR/foo bar/quux"
    "$TEST_GO_ROOTDIR/foo bar/xyzzy")
  local IFS=$'\n'
  assert_success "${expected[*]}"
}
