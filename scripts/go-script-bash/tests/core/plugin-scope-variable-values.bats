#! /usr/bin/env bats

load ../environment

EXPECTED_ROOT_SCOPE_VALUES=()
EXPECTED_ROOT_SCOPE_PLUGINS_PATHS=()

setup() {
  test_filter

  local print_scope_implementation=(
    'printf -- "_GO_ROOTDIR:\n%s\n" "$_GO_ROOTDIR"'
    'printf -- "_GO_SCRIPTS_DIR:\n%s\n" "$_GO_SCRIPTS_DIR"'
    'printf -- "_GO_PLUGINS_PATHS:\n"'
    'printf -- "%s\n" "${_GO_PLUGINS_PATHS[@]}"'
    'printf -- "_GO_SEARCH_PATHS:\n"'
    'printf -- "%s\n" "${_GO_SEARCH_PATHS[@]}"'
    'printf -- "\n"')

  @go.create_test_go_script '@go "$@"' \
    'printf "ROOT LEVEL SCOPE:\n"' \
    "${print_scope_implementation[@]}"

  @go.create_test_command_script 'top' \
    'printf "TOP LEVEL SCOPE:\n"' \
    "${print_scope_implementation[@]}"
  @go.create_test_command_script 'plugins/first/bin/first' \
    'printf "FIRST PLUGIN SCOPE:\n"' \
    "${print_scope_implementation[@]}"

  # This script will execute one of the other plugins based on its argument.
  @go.create_test_command_script 'plugins/second/bin/second' \
    '@go "$1"' \
    'printf "SECOND PLUGIN SCOPE:\n"' \
    "${print_scope_implementation[@]}"
  @go.create_test_command_script 'plugins/second/bin/plugins/third/bin/third' \
    'printf "THIRD PLUGIN SCOPE:\n"' \
    "${print_scope_implementation[@]}"

  EXPECTED_ROOT_SCOPE_PLUGINS_PATHS=("$TEST_GO_PLUGINS_DIR/first/bin"
    "$TEST_GO_PLUGINS_DIR/second/bin")

  EXPECTED_ROOT_SCOPE_VALUES=('_GO_ROOTDIR:'
    "$TEST_GO_ROOTDIR"
    '_GO_SCRIPTS_DIR:'
    "$TEST_GO_SCRIPTS_DIR"
    '_GO_PLUGINS_PATHS:'
    "${EXPECTED_ROOT_SCOPE_PLUGINS_PATHS[@]}"
    '_GO_SEARCH_PATHS:'
    "$_GO_CORE_DIR/libexec"
    "$TEST_GO_SCRIPTS_DIR"
    "${EXPECTED_ROOT_SCOPE_PLUGINS_PATHS[@]}")
}

teardown() {
  @go.remove_test_go_rootdir
}

assert_scope_values_equal() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __assert_scope_values_equal_impl "$@"
  restore_bats_shell_options "$?"
}

__assert_scope_values_equal_impl() {
  local scope="$1"
  shift
  local orig_lines=("${lines[@]}")
  local result='0'
  local i

  for ((i=0; i != "${#lines[@]}"; ++i)); do
    if [[ "${lines[$i]}" == "$scope SCOPE:" ]]; then
      lines=("${lines[@]:$((i + 1)):$#}")
      if ! assert_lines_equal "$@"; then
        result='1'
      fi
      lines=("${orig_lines[@]}")
      return "$result"
    fi
  done

  if [[ "$i" -eq "${#lines[@]}" ]]; then
    printf 'ERROR: could not find "%s" in output.\nOUTPUT:\n%s\n' \
      "$scope SCOPE:" "$output" >&2
    return '1'
  fi
}

@test "$SUITE: top-level script" {
  run "$TEST_GO_SCRIPT" top
  assert_success
  assert_scope_values_equal 'TOP LEVEL' "${EXPECTED_ROOT_SCOPE_VALUES[@]}"
  assert_scope_values_equal 'ROOT LEVEL' "${EXPECTED_ROOT_SCOPE_VALUES[@]}"
}

@test "$SUITE: first-level plugin script" {
  run "$TEST_GO_SCRIPT" first
  assert_success

  # _GO_PLUGINS_PATHS is inherited to support installing a single instance of a
  # common plugin in the top-level _GO_PLUGINS_DIR. The plugin's _GO_SCRIPTS_DIR
  # will still appear in _GO_PLUGINS_PATHS, but won't be duplicated in
  # _GO_SEARCH_PATHS.
  assert_scope_values_equal 'FIRST PLUGIN' \
    '_GO_ROOTDIR:' \
    "$TEST_GO_PLUGINS_DIR/first" \
    '_GO_SCRIPTS_DIR:' \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    '_GO_PLUGINS_PATHS:' \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    '_GO_SEARCH_PATHS:' \
    "$_GO_CORE_DIR/libexec" \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin"

  assert_scope_values_equal 'ROOT LEVEL' "${EXPECTED_ROOT_SCOPE_VALUES[@]}"
}

@test "$SUITE: first-level plugin script invoking own second-level plugin" {
  run "$TEST_GO_SCRIPT" second third
  assert_success

  # As with the previous test case, _GO_PLUGINS_PATHS is inherited, and the
  # second level plugin's _GO_SCRIPTS_DIR will still appear in
  # _GO_PLUGINS_PATHS, but won't be duplicated in _GO_SEARCH_PATHS.
  #
  # Its parent's _GO_SCRIPTS_DIR is in both _GO_PLUGINS_PATHS and
  # _GO_SEARCH_PATHS, since its parent is also a plugin. This could support a
  # circular dependency, though such dependencies are strongly discouraged.
  assert_scope_values_equal 'THIRD PLUGIN' \
    '_GO_ROOTDIR:' \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third" \
    '_GO_SCRIPTS_DIR:' \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    '_GO_PLUGINS_PATHS:' \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    '_GO_SEARCH_PATHS:' \
    "$_GO_CORE_DIR/libexec" \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin"

  # The first level plugin's own plugin paths will appear before any inherited
  # _GO_PLUGINS_PATHS, to support a plugin's own installed plugin version to
  # take precedence over other installed versions.
  assert_scope_values_equal 'SECOND PLUGIN' \
    '_GO_ROOTDIR:' \
    "$TEST_GO_PLUGINS_DIR/second" \
    '_GO_SCRIPTS_DIR:' \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    '_GO_PLUGINS_PATHS:' \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    '_GO_SEARCH_PATHS:' \
    "$_GO_CORE_DIR/libexec" \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    "$TEST_GO_PLUGINS_DIR/first/bin"

  assert_scope_values_equal 'ROOT LEVEL' "${EXPECTED_ROOT_SCOPE_VALUES[@]}"
}

@test "$SUITE: first-level plugin script invoking sibling first-level plugin" {
  run "$TEST_GO_SCRIPT" second first
  assert_success

  # Since `second` is invoking its sibling `first`, its plugin directory
  # shouldn't leak into the environment of `first`.
  assert_scope_values_equal 'FIRST PLUGIN' \
    '_GO_ROOTDIR:' \
    "$TEST_GO_PLUGINS_DIR/first" \
    '_GO_SCRIPTS_DIR:' \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    '_GO_PLUGINS_PATHS:' \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    '_GO_SEARCH_PATHS:' \
    "$_GO_CORE_DIR/libexec" \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin"

  # `second`'s plugin environment should be the same as it ever was.
  assert_scope_values_equal 'SECOND PLUGIN' \
    '_GO_ROOTDIR:' \
    "$TEST_GO_PLUGINS_DIR/second" \
    '_GO_SCRIPTS_DIR:' \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    '_GO_PLUGINS_PATHS:' \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    "$TEST_GO_PLUGINS_DIR/first/bin" \
    '_GO_SEARCH_PATHS:' \
    "$_GO_CORE_DIR/libexec" \
    "$TEST_GO_PLUGINS_DIR/second/bin" \
    "$TEST_GO_PLUGINS_DIR/second/bin/plugins/third/bin" \
    "$TEST_GO_PLUGINS_DIR/first/bin"

  assert_scope_values_equal 'ROOT LEVEL' "${EXPECTED_ROOT_SCOPE_VALUES[@]}"
}
