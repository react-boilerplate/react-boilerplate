#! /usr/bin/env bats

load ../environment
load helpers

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
  setup_test_modules
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: zero arguments" {
  run "$TEST_GO_SCRIPT" complete 1 modules ''
  local expected=('-h' '-help' '--help' '--paths' '--summaries' '--imported'
    "${CORE_MODULES[@]}" "${TEST_INTERNAL_MODULES[@]}"
    "${TEST_PUBLIC_MODULES[@]}" "${TEST_PLUGINS[@]/%//}")
  assert_success "${expected[@]}"
}

@test "$SUITE: first argument matches help flags" {
  run "$TEST_GO_SCRIPT" complete 1 modules -h _foo
  local expected=('-h' '-help')
  assert_success "${expected[@]}"
}

@test "$SUITE: first argument matches modules" {
  run "$TEST_GO_SCRIPT" complete 1 modules _f
  local expected=('_frobozz' '_frotz' '_foo/')
  assert_success "${expected[@]}"
}

@test "$SUITE: only complete first flag" {
  run "$TEST_GO_SCRIPT" complete 1 modules --pat --sum
  assert_success '--paths '

  run "$TEST_GO_SCRIPT" complete 2 modules --paths --sum
  assert_failure ''
}

@test "$SUITE: only complete flag as first arg" {
  run "$TEST_GO_SCRIPT" complete 2 modules _foo --pat
  assert_failure ''
}

@test "$SUITE: nothing else when --imported present" {
  run "$TEST_GO_SCRIPT" complete 2 modules --imported _foo
  assert_failure ''
}

@test "$SUITE: nothing else when first flag not recognized" {
  run "$TEST_GO_SCRIPT" complete 2 modules --bogus-flag _foo
  assert_failure ''
}

@test "$SUITE: return plugin dirs, core and project modules for flag" {
  # Note that plugins are offered last
  local expected=("${CORE_MODULES[@]}" "${TEST_INTERNAL_MODULES[@]}"
    "${TEST_PUBLIC_MODULES[@]}" "${TEST_PLUGINS[@]/%//}")
  run "$TEST_GO_SCRIPT" complete 2 modules --help ''
  assert_success "${expected[@]}"
}

@test "$SUITE: return matching plugins and modules" {
  local expected=('_frobozz' '_frotz' '_foo/')
  run "$TEST_GO_SCRIPT" complete 2 modules help '_f'
  assert_success "${expected[@]}"
}

@test "$SUITE: return only matching plugin names" {
  local expected=('_bar/' '_baz/')
  run "$TEST_GO_SCRIPT" complete 2 modules help '_ba'
  assert_success "${expected[@]}"
}

@test "$SUITE: return all matches for a plugin when no other matches" {
  local expected=('_foo/_plugh' '_foo/_quux' '_foo/_xyzzy')
  run "$TEST_GO_SCRIPT" complete 2 modules help '_fo'
  assert_success "${expected[@]}"
}

@test "$SUITE: return matches for a plugin when arg ends with a slash" {
  local expected=('_baz/_plugh' '_baz/_quux' '_baz/_xyzzy')
  run "$TEST_GO_SCRIPT" complete 2 modules help '_baz/'
  assert_success "${expected[@]}"
}

@test "$SUITE: no matches" {
  run "$TEST_GO_SCRIPT" complete 2 modules help '_x'
  assert_failure ''
}

@test "$SUITE: complete only first argument for help" {
  run "$TEST_GO_SCRIPT" complete 3 modules --help '_frobozz' '_fr'
  assert_failure ''
}

@test "$SUITE: complete subsequent args for flags other than help" {
  # Note that matches already on command line are not completed.
  run "$TEST_GO_SCRIPT" complete 3 modules --paths '_frobozz' '_fr'
  assert_success '_frotz '
}

@test "$SUITE: complete subsequent args if first arg not a flag" {
  # Note that matches already on command line are not completed.
  run "$TEST_GO_SCRIPT" complete 2 modules '_frobozz' '_fr'
  assert_success '_frotz '
}

@test "$SUITE: remove plugin completions already present" {
  local expected=('_foo/_quux' '_foo/_xyzzy')
  run "$TEST_GO_SCRIPT" complete 2 modules '_foo/_plugh' '_foo/'
  assert_success "${expected[@]}"
}

@test "$SUITE: don't complete plugins when all modules already present" {
  local expected=("${CORE_MODULES[@]}" '_frobozz' '_frotz' \
    '_blorple' '_rezrov' '_bar/' '_baz/')
  run "$TEST_GO_SCRIPT" complete 4 modules \
    '_foo/_plugh' '_foo/_quux' '_foo/_xyzzy' ''
  assert_success "${expected[@]}"
}
