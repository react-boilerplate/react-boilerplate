#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: unset framework variables" {
  assert_equal '' "$_GO_CMD" '_GO_CMD'
  assert_equal '' "$_GO_MAX_FILE_DESCRIPTORS" '_GO_MAX_FILE_DESCRIPTORS'
  assert_equal '' "${!_GO_LOG*}" '_GO_LOG* variable names'
  assert_equal '' "${!__GO_LOG*}" '__GO_LOG* variable names'
}

@test "$SUITE: set COLUMNS" {
  assert_equal '1000' "$COLUMNS" 'COLUMNS'
}

@test "$SUITE: set TEST_GO_* variables" {
  [ -n "$TEST_GO_ROOTDIR" ]

  if [[ ! "$TEST_GO_ROOTDIR" =~ \  ]]; then
    local bats_fail_no_output='true'
    fail "TEST_GO_ROOTDIR does not contain a space: \"$TEST_GO_ROOTDIR\""
  fi

  assert_equal "$TEST_GO_ROOTDIR/go" "$TEST_GO_SCRIPT" 'TEST_GO_SCRIPT'
  assert_equal 'scripts' "$TEST_GO_SCRIPTS_RELATIVE_DIR"
  assert_equal "$TEST_GO_ROOTDIR/scripts" "$TEST_GO_SCRIPTS_DIR"
  assert_equal "$TEST_GO_SCRIPTS_DIR/plugins" "$TEST_GO_PLUGINS_DIR"
}

@test "$SUITE: remove_test_go_rootdir" {
  [ ! -d "$TEST_GO_ROOTDIR" ]
  mkdir -p "$TEST_GO_ROOTDIR"
  [ -d "$TEST_GO_ROOTDIR" ]
  echo 'foo' >"$TEST_GO_ROOTDIR/foo"
  mkdir "$TEST_GO_ROOTDIR/bar"
  echo 'baz' >"$TEST_GO_ROOTDIR/bar/baz"
  @go.remove_test_go_rootdir
  [ ! -d "$TEST_GO_ROOTDIR" ]
}

@test "$SUITE: create_test_go_script" {
  [ ! -e "$TEST_GO_SCRIPT" ]
  [ ! -d "$TEST_GO_SCRIPTS_DIR" ]

  @go.create_test_go_script '@go "$@"'
  [ -x "$TEST_GO_SCRIPT" ]
  [ -d "$TEST_GO_SCRIPTS_DIR" ]

  run "$TEST_GO_SCRIPT" 'fullpath' 'go'
  assert_success "$TEST_GO_SCRIPT"
}

@test "$SUITE: create_test_command_script" {
  local script_name='test-example'

  [ ! -d "$TEST_GO_SCRIPTS_DIR" ]
  [ ! -e "$TEST_GO_SCRIPTS_DIR/$script_name" ]

  @go.create_test_command_script "$script_name" 'echo Hello, World!'
  [ -x "$TEST_GO_SCRIPTS_DIR/$script_name" ]

  @go.create_test_go_script '@go "$@"'
  run "$TEST_GO_SCRIPT" 'test-example'
  assert_success 'Hello, World!'
}

@test "$SUITE: create_parent_and_subcommands" {
  [ ! -d "$TEST_GO_SCRIPTS_DIR" ]
  @go.create_parent_and_subcommands foo bar baz quux
  [ -d "$TEST_GO_SCRIPTS_DIR" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo.d/bar" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo.d/baz" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo.d/quux" ]

  [ ! -d "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d" ]
  @go.create_parent_and_subcommands 'foo.d/bar' 'xyzzy' 'plugh'
  [ -d "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d/xyzzy" ]
  [ -x "$TEST_GO_SCRIPTS_DIR/foo.d/bar.d/plugh" ]
}

@test "$SUITE: run TEST_GO_SCRIPT via test-go" {
  @go.create_test_go_script 'printf "_GO_CMD: %s\n" "$_GO_CMD"'
  run test-go
  assert_success '_GO_CMD: test-go'
}
