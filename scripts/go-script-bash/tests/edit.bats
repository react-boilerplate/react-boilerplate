#! /usr/bin/env bats

load environment

@test "$SUITE: open file with EDITOR" {
  EDITOR='echo' run ./go edit foo/bar/baz
  assert_success 'foo/bar/baz'
}

@test "$SUITE: error if EDITOR not defined" {
  EDITOR= run ./go edit foo/bar/baz
  assert_failure 'Cannot edit foo/bar/baz: $EDITOR not defined.'
}
