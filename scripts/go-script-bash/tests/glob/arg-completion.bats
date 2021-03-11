#! /usr/bin/env bats

load ../environment
. "$_GO_USE_MODULES" 'complete'

TESTS_DIR="$TEST_GO_ROOTDIR/tests"

setup() {
  test_filter
  mkdir -p "$TESTS_DIR"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: zero arguments" {
  local expected=('--trim' '--ignore')
  expected+=($(@go.compgen -d))

  run ./go complete 1 glob ''
  assert_success "${expected[@]}"
}

@test "$SUITE: first argument" {
  local expected=('--trim' '--ignore')

  run ./go complete 1 glob '-'
  assert_success "${expected[@]}"

  run ./go complete 1 glob '--t'
  assert_success '--trim '

  run ./go complete 1 glob '--i'
  assert_success '--ignore '

  expected=($(@go.compgen -f -- 'li'))
  fail_if equal '0' "${#expected[@]}"
  run ./go complete 1 glob 'li'
  assert_success "${expected[@]}"
}

@test "$SUITE: completion omits flags already present" {
  local expected=('--ignore' $(@go.compgen -d))
  run ./go complete 2 glob '--trim' ''
  assert_success "${expected[@]}"

  run ./go complete 2 glob  '--trim' '-'
  assert_success '--ignore '

  expected[0]='--trim'
  run ./go complete 3 glob '--ignore' 'foo*:bar*' ''
  assert_success "${expected[@]}"

  run ./go complete 3 glob '--ignore' 'foo*:bar*' '-'
  assert_success '--trim '

  unset expected[0]
  run ./go complete 4 glob '--ignore' 'foo*:bar*' '--trim' ''
  assert_success "${expected[@]}"

  expected=($(@go.compgen -f -- 'li'))
  fail_if equal '0' "${#expected[@]}"
  run ./go complete 4 glob '--ignore' 'foo*:bar*' '--trim' 'li'
  assert_success "${expected[@]}"
}

@test "$SUITE: argument does not complete if previous is --ignore" {
  # The next argument should be the GLOBIGNORE value.
  run ./go complete 2 glob '--ignore' ''
  assert_failure ''

  run ./go complete 3 glob '--trim' '--ignore' ''
  assert_failure ''

  run ./go complete 2 glob '--ignore' '' 'tests'
  assert_failure
}

@test "$SUITE: argument does not complete if previous is root dir" {
  # The next argument should be the suffix pattern.
  run ./go complete 2 glob 'tests' ''
  assert_failure ''

  run ./go complete 3 glob '--trim' 'tests' ''
  assert_failure ''

  run ./go complete 5 glob '--trim' '--ignore' 'foo*:bar*' 'tests' ''
  assert_failure ''
}

@test "$SUITE: arguments before flags only complete other flags" {
  run ./go complete 1 glob '' '--trim'
  assert_success '--ignore '

  run ./go complete 1 glob '' '--ignore'
  assert_success '--trim '
}

@test "$SUITE: complete flags before rootdir" {
  local expected=('--trim' '--ignore')
  run ./go complete 1 glob '' 'tests'
  assert_success "${expected[@]}"

  run ./go complete 2 glob '--trim' '' 'tests'
  assert_success '--ignore '

  run ./go complete 3 glob '--ignore' 'foo*:bar*' '' 'tests'
  assert_success '--trim '
}

@test "$SUITE: complete rootdir" {
  run ./go complete 1 glob 'tests'
  assert_success 'tests/'

  local expected=($(@go.compgen -d 'tests/'))
  run ./go complete 1 glob 'tests/'
  assert_success "${expected[@]}"
}

@test "$SUITE: complete top-level glob patterns" {
  touch "$TESTS_DIR"/{foo,bar,baz}.bats
  local expected=('bar' 'baz' 'foo')

  run ./go complete 3 glob "$TESTS_DIR" '.bats' ''
  assert_success "${expected[@]}"

  run ./go complete 4 glob '--trim' "$TESTS_DIR" '.bats' ''
  assert_success "${expected[@]}"

  run ./go complete 4 glob "$TESTS_DIR" '.bats' 'foo' ''
  assert_success "${expected[@]}"

  run ./go complete 3 glob "$TESTS_DIR" '.bats' '' 'foo'
  assert_success "${expected[@]}"
}

@test "$SUITE: trim top-level g@go.lob patterns with no shared prefix" {
  mkdir "$TESTS_DIR"/{foo,bar,baz}
  touch "$TESTS_DIR"/foo/quux.bats \
    "$TESTS_DIR"/bar/xyzzy.bats \
    "$TESTS_DIR"/baz/plugh.bats
  local expected=('bar/' 'baz/' 'foo/')

  run ./go complete 3 glob "$TESTS_DIR" '.bats' ''
  assert_success "${expected[@]}"
}

@test "$SUITE: match a file and directory of the same name" {
  mkdir "$TESTS_DIR/foo"
  touch "$TESTS_DIR"/foo{,/bar,/baz}.bats
  local expected=('foo' 'foo/')

  run ./go complete 3 glob "$TESTS_DIR" '.bats' 'f'
  assert_success "${expected[@]}"
}

@test "$SUITE: complete second-level glob pattern" {
  mkdir "$TESTS_DIR/foo"
  touch "$TESTS_DIR"/foo{,/bar,/baz}.bats
  local expected=('foo/bar' 'foo/baz')

  run ./go complete 3 glob "$TESTS_DIR" '.bats' 'foo/'
  assert_success "${expected[@]}"
}

@test "$SUITE: complete directories that don't match file names" {
  mkdir "$TESTS_DIR"/foo
  touch "$TESTS_DIR"/foo/{bar,baz}.bats

  local expected=('foo/bar' 'foo/baz')
  run ./go complete 3 glob "$TESTS_DIR" '.bats' 'foo/'
  assert_success "${expected[@]}"
}

@test "$SUITE: honor --ignore patterns during completion" {
  mkdir "$TESTS_DIR"/{foo,bar,baz}
  touch "$TESTS_DIR"/{foo/quux,bar/xyzzy,baz/plugh,baz/xyzzy}.bats

  # Remember that --ignore will add the rootdir to all the patterns.
  run ./go complete 5 glob '--ignore' "foo/*:bar/*:baz/pl*" \
    "$TESTS_DIR" '.bats' ''
  assert_success 'baz/xyzzy '

  # Make sure the --ignore argument has any quotes removed, as the shell will
  # not expand any command line arguments or unquote them during completion.
  run ./go complete 5 glob '--ignore' "'foo/*:bar/*:baz/pl*'" \
    "$TESTS_DIR" '.bats' ''
  assert_success 'baz/xyzzy '
}

@test "$SUITE: return error if no matches" {
  run ./go complete 3 glob "$TESTS_DIR" '.bats' 'foo'
  assert_failure
}

@test "$SUITE: return full path if only one match" {
  mkdir "$TESTS_DIR/foo"
  touch "$TESTS_DIR/foo/bar.bats"
  run ./go glob --complete 2 "$TESTS_DIR" '.bats' 'f'
  assert_success "foo/bar"
}

@test "$SUITE: return completions with longest possible prefix" {
  mkdir -p "$TESTS_DIR"/foo/bar/{baz,quux}
  touch "$TESTS_DIR"/foo/bar/{baz/xyzzy,quux/plugh}.bats

  local expected=('foo/bar/baz/' 'foo/bar/quux/')
  run ./go glob --complete 2 "$TESTS_DIR" '.bats' 'f'
  assert_success "${expected[@]}"
}
