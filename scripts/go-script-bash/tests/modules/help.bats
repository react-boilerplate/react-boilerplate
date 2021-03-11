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

@test "$SUITE: no args shows module system help" {
  run "$TEST_GO_SCRIPT" 'modules' '-h'
  assert_output_matches '^\$_GO_USE_MODULES - '
}

@test "$SUITE: accept -h, -help, and --help as synonyms" {
  run "$TEST_GO_SCRIPT" modules -h
  assert_success

  local help_output="$output"

  run "$TEST_GO_SCRIPT" modules -help
  assert_success "$help_output"

  run "$TEST_GO_SCRIPT" modules --help
  assert_success "$help_output"
}

@test "$SUITE: --help honored" {
  run "$TEST_GO_SCRIPT" 'modules' '--help'
  assert_output_matches '^\$_GO_USE_MODULES - '
}

@test "$SUITE: error if more than one module specified" {
  run "$TEST_GO_SCRIPT" 'modules' '-h' '_foo/_plugh' '_bar/_quux'
  assert_failure 'Please specify only one module name.'
}

@test "$SUITE: error if module does not exist" {
  run "$TEST_GO_SCRIPT" 'modules' '-h' '_foo/_frotz'
  assert_failure 'Unknown module: _foo/_frotz'
}

@test "$SUITE: error if parsing description fails" {
  skip_if_cannot_trigger_file_permission_failure

  local module_path="$TEST_GO_PLUGINS_DIR/_foo/lib/_plugh"
  chmod ugo-r "$module_path"
  run "$TEST_GO_SCRIPT" 'modules' '-h' '_foo/_plugh'
  assert_failure
  assert_output_matches "ERROR: failed to parse description from $module_path\$"
}

@test "$SUITE: print help from the module's header comment" {
  run "$TEST_GO_SCRIPT" 'modules' '-h' '_foo/_plugh'
  assert_success '_foo/_plugh - Summary for _foo/_plugh'
}
