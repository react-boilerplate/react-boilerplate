#! /usr/bin/env bats

load ../environment

TESTS_DIR="$TEST_GO_ROOTDIR/tests"

setup() {
  mkdir -p "$TESTS_DIR"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error on unknown flag" {
  run ./go glob --foobar
  assert_failure 'Unknown flag: --foobar'

  run ./go glob --trim --ignore '*' --foobar
  assert_failure 'Unknown flag: --foobar'
}

@test "$SUITE: error if rootdir not specified" {
  local err_msg='Root directory argument not specified.'
  run ./go glob
  assert_failure "$err_msg"

  run ./go glob --trim --ignore '*'
  assert_failure "$err_msg"
}

@test "$SUITE: error if rootdir argument is not a directory" {
  local err_msg='Root directory argument bogus_dir is not a directory.'
  run ./go glob bogus_dir
  assert_failure "$err_msg"

  run ./go glob --trim --ignore '*' bogus_dir
  assert_failure "$err_msg"
}

@test "$SUITE: error if file suffix argument not specified" {
  local err_msg='File suffix argument not specified.'
  run ./go glob "$TESTS_DIR"
  assert_failure "$err_msg"

  run ./go glob --trim --ignore '*' "$TESTS_DIR"
  assert_failure "$err_msg"
}

@test "$SUITE: error if no files match pattern" {
  run ./go glob "$TESTS_DIR" '.bats'
  assert_failure "\"*\" does not match any .bats files in $TESTS_DIR."

  run ./go glob "$TESTS_DIR" '.bats' 'foo'
  assert_failure "\"foo\" does not match any .bats files in $TESTS_DIR."
}

@test "$SUITE: no glob patterns defaults to matching all files" {
  local expected=(
    "$TESTS_DIR/bar.bats" "$TESTS_DIR/baz.bats" "$TESTS_DIR/foo.bats")
  touch "${expected[@]}"

  run ./go glob "$TESTS_DIR" '.bats'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: start glob matches all files" {
  local expected=(
    "$TESTS_DIR/bar.bats" "$TESTS_DIR/baz.bats" "$TESTS_DIR/foo.bats")
  touch "${expected[@]}"

  run ./go glob "$TESTS_DIR" '.bats' '*'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: --trim strips rootdir and suffix from all files" {
  touch "$TESTS_DIR"/{bar,baz,foo}.bats
  local expected=('bar' 'baz' 'foo')

  run ./go glob --trim "$TESTS_DIR" '.bats'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: match nothing if the suffix doesn't match" {
  touch "$TESTS_DIR"/{bar,baz,foo}.bats
  run ./go glob "$TESTS_DIR" '.bash'
  local IFS=$'\n'
  assert_failure "\"*\" does not match any .bash files in $TESTS_DIR."
}

@test "$SUITE: set --ignore patterns" {
  touch "$TESTS_DIR"/{bar,baz,foo}.bats
  local expected=('bar' 'baz' 'foo')

  run ./go glob --ignore 'ba*' "$TESTS_DIR" '.bats'
  local IFS=$'\n'
  assert_success "$TESTS_DIR/foo.bats"

  run ./go glob --ignore 'f*' --trim "$TESTS_DIR" '.bats'
  expected=('bar' 'baz')
  assert_success "${expected[*]}"

  run ./go glob --trim --ignore 'ba*:f*' "$TESTS_DIR" '.bats'
  assert_failure "\"*\" does not match any .bats files in $TESTS_DIR."
}

@test "$SUITE: match single file" {
  touch "$TESTS_DIR"/{bar,baz,foo}.bats
  run ./go glob "$TESTS_DIR" '.bats' 'foo'
  local IFS=$'\n'
  assert_success "$TESTS_DIR/foo.bats"
}

@test "$SUITE: match multiple files" {
  local expected=("$TESTS_DIR/bar.bats" "$TESTS_DIR/baz.bats")
  touch "$TESTS_DIR"/{bar,baz,foo}.bats
  run ./go glob "$TESTS_DIR" '.bats' 'ba*'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: match multiple patterns" {
  local expected=(
    "$TESTS_DIR/bar.bats" "$TESTS_DIR/baz.bats" "$TESTS_DIR/foo.bats")
  touch "$TESTS_DIR"/{bar,baz,foo,quux,plugh,xyzzy}.bats
  run ./go glob "$TESTS_DIR" '.bats' 'ba*' 'foo'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: exact file match when a directory of the same name exists" {
  mkdir "$TESTS_DIR"/foo
  touch "$TESTS_DIR"/foo.bats "$TESTS_DIR"/foo/{bar,baz,quux}.bats
  run ./go glob "$TESTS_DIR" '.bats' 'foo'
  local IFS=$'\n'
  assert_success "$TESTS_DIR/foo.bats"
}

@test "$SUITE: recursive directory match when pattern ends with a separator" {
  mkdir "$TESTS_DIR"/foo
  touch "$TESTS_DIR"/foo.bats "$TESTS_DIR"/foo/{bar,baz,quux}.bats
  local expected=(
    "$TESTS_DIR/foo/bar.bats"
    "$TESTS_DIR/foo/baz.bats"
    "$TESTS_DIR/foo/quux.bats")

  run ./go glob "$TESTS_DIR" '.bats' 'foo/'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: recursive directory match when no file of the same name" {
  mkdir "$TESTS_DIR"/foo
  touch "$TESTS_DIR"/foo/{bar,baz,quux}.bats
  local expected=(
    "$TESTS_DIR/foo/bar.bats"
    "$TESTS_DIR/foo/baz.bats"
    "$TESTS_DIR/foo/quux.bats")

  run ./go glob "$TESTS_DIR" '.bats' 'foo'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: pattern matches file and a directory of the same name" {
  mkdir "$TESTS_DIR"/foo
  touch "$TESTS_DIR"/foo.bats "$TESTS_DIR"/foo/{bar,baz,quux}.bats
  local expected=(
    "$TESTS_DIR/foo.bats"
    "$TESTS_DIR/foo/bar.bats"
    "$TESTS_DIR/foo/baz.bats"
    "$TESTS_DIR/foo/quux.bats")

  run ./go glob "$TESTS_DIR" '.bats' 'foo*'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}

@test "$SUITE: recursively discover files" {
  mkdir -p "$TESTS_DIR"/foo/bar/baz "$TESTS_DIR"/quux/xyzzy "$TESTS_DIR"/plugh \
    "$TESTS_DIR"/ignore-me "$TESTS_DIR"/bar/ignore-me
  touch "$TESTS_DIR"/foo/bar/baz/{frobozz,zork,ignore-me}.bats \
    "$TESTS_DIR"/quux/xyzzy/frotz.bats \
    "$TESTS_DIR"/quux/xyzzy.bats \
    "$TESTS_DIR"/plugh/bogus.not-the-right-type \
    "$TESTS_DIR"/plugh/{jimi,john}.bats \
    "$TESTS_DIR"/plugh.{bats,c,md} \
    "$TESTS_DIR"/ignore-me/{foo,bar,baz}.bats \
    "$TESTS_DIR"/bar/ignore-me/{foo,bar,baz}.bats
  local expected=(
    "foo/bar/baz/frobozz"
    "foo/bar/baz/zork"
    "plugh"
    "plugh/jimi"
    "plugh/john"
    "quux/xyzzy"
    "quux/xyzzy/frotz")

  # The `--ignore` pattern below was previously '*ignore-me*'. This worked on
  # bash 3.2, 4.2, and 4.3. However, something changed in bash 4.4 that caused
  # that pattern not to work at all anymore. The current pattern works for all
  # bash versions.
  run ./go glob --ignore 'ignore-me:*/ignore-me:foo/bar/baz/ignore-me*' \
    --trim "$TESTS_DIR" '.bats'
  local IFS=$'\n'
  assert_success "${expected[*]}"
}
