#! /usr/bin/env bats

load environment

setup() {
  @go.create_test_go_script '@go "$@"'
  @go.create_test_command_script "test-command"
}

teardown() {
  @go.remove_test_go_rootdir
}

# Some versions of Bash single quote each array value, causing the assertion to
# fail. Yeah.
quotify_expected() {
  local test_array=()
  if [[ "$(declare -p test_array)" == "declare -a test_array='()'" ]]; then
    # Oh, and using a single quote directly causes an error. Yep.
    local quote="'"
    expected=("${expected[@]/=(/=${quote}(}")
    expected=("${expected[@]/%)/)${quote}}")
  fi
}

@test "$SUITE: _GO_* variables are set for Bash" {
  run "$TEST_GO_SCRIPT" vars
  assert_success

  set "$DISABLE_BATS_SHELL_OPTIONS"
  local search_paths=("[0]=\"$_GO_CORE_DIR/libexec\""
    "[1]=\"$TEST_GO_SCRIPTS_DIR\"")

  local expected=("declare -x _GO_BATS_COVERAGE_DIR=\"$_GO_BATS_COVERAGE_DIR\""
    "declare -x _GO_BATS_DIR=\"$_GO_BATS_DIR\""
    "declare -x _GO_BATS_PATH=\"$_GO_BATS_PATH\""
    "declare -x _GO_BATS_URL=\"$_GO_BATS_URL\""
    "declare -x _GO_BATS_VERSION=\"$_GO_BATS_VERSION\""
    "declare -rx _GO_CMD=\"$TEST_GO_SCRIPT\""
    'declare -ax _GO_CMD_ARGV=()'
    'declare -ax _GO_CMD_NAME=([0]="vars")'
    "declare -x _GO_COLLECT_BATS_COVERAGE=\"$_GO_COLLECT_BATS_COVERAGE\""
    "declare -rx _GO_CORE_DIR=\"$_GO_CORE_DIR\""
    "declare -rx _GO_CORE_URL=\"$_GO_CORE_URL\""
    "declare -rx _GO_CORE_VERSION=\"$_GO_CORE_VERSION\""
    "declare -x _GO_COVERALLS_URL=\"$_GO_COVERALLS_URL\""
    'declare -a _GO_IMPORTED_MODULES=()'
    'declare -a _GO_IMPORTED_MODULE_CALLERS=()'
    'declare -a _GO_IMPORTED_MODULE_FILES=()'
    'declare -- _GO_INJECT_MODULE_PATH=""'
    'declare -- _GO_INJECT_SEARCH_PATH=""'
    "declare -x _GO_KCOV_DIR=\"$_GO_KCOV_DIR\""
    "declare -- _GO_PLUGINS_DIR=\"$TEST_GO_PLUGINS_DIR\""
    'declare -a _GO_PLUGINS_PATHS=()'
    "declare -x _GO_ROOTDIR=\"$TEST_GO_ROOTDIR\""
    "declare -rx _GO_SCRIPT=\"$TEST_GO_SCRIPT\""
    "declare -- _GO_SCRIPTS_DIR=\"$TEST_GO_SCRIPTS_DIR\""
    "declare -a _GO_SEARCH_PATHS=(${search_paths[*]})"
    "declare -rx _GO_TEST_DIR=\"$_GO_TEST_DIR\""
    "declare -rx _GO_USE_MODULES=\"$_GO_CORE_DIR/lib/internal/use\"")

  quotify_expected
  restore_bats_shell_options "$?"
  assert_lines_equal "${expected[@]}"
}

@test "$SUITE: all _GO_* variables for Bash subcommand contain values" {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  @go.create_test_command_script 'test-command.d/test-subcommand' \
    '. "$_GO_USE_MODULES" "module_0" "module_1"' \
    '@go vars'

  mkdir -p "$TEST_GO_ROOTDIR/lib"
  printf '' >"$TEST_GO_ROOTDIR/lib/module_0"
  printf '' >"$TEST_GO_ROOTDIR/lib/module_1"

  mkdir "$TEST_GO_PLUGINS_DIR"
  mkdir "$TEST_GO_PLUGINS_DIR/plugin"{0,1,2}
  mkdir "$TEST_GO_PLUGINS_DIR/plugin"{0,1,2}"/bin"

  # Note that defining the `_GO_INJECT_*_PATH` variables before the `run`
  # command causes them to be exported.
  _GO_INJECT_SEARCH_PATH="$TEST_GO_ROOTDIR/bin" \
    _GO_INJECT_MODULE_PATH="$TEST_GO_ROOTDIR/lib" \
    run "$TEST_GO_SCRIPT" test-command test-subcommand foo bar 'baz quux' xyzzy
  assert_success

  local cmd_argv=('[0]="foo"' '[1]="bar"' '[2]="baz quux"' '[3]="xyzzy"')
  local plugins_paths=("[0]=\"$TEST_GO_PLUGINS_DIR/plugin0/bin\""
    "[1]=\"$TEST_GO_PLUGINS_DIR/plugin1/bin\""
    "[2]=\"$TEST_GO_PLUGINS_DIR/plugin2/bin\"")
  local search_paths=("[0]=\"$TEST_GO_ROOTDIR/bin\""
    "[1]=\"$_GO_CORE_DIR/libexec\""
    "[2]=\"$TEST_GO_SCRIPTS_DIR\""
    "[3]=\"$TEST_GO_PLUGINS_DIR/plugin0/bin\""
    "[4]=\"$TEST_GO_PLUGINS_DIR/plugin1/bin\""
    "[5]=\"$TEST_GO_PLUGINS_DIR/plugin2/bin\"")

  # Note that the `format` module imports `strings` and `validation`.
  local command_script_trace="$TEST_GO_SCRIPTS_DIR/"
  command_script_trace+="test-command.d/test-subcommand:2 source"
  local expected_modules=('[0]="module_0"'
    '[1]="module_1"')
  local expected_module_callers=("[0]=\"$command_script_trace\""
    "[1]=\"$command_script_trace\"")
  local expected_module_files=("[0]=\"$TEST_GO_ROOTDIR/lib/module_0\""
    "[1]=\"$TEST_GO_ROOTDIR/lib/module_1\"")
  local expected=("declare -x _GO_BATS_COVERAGE_DIR=\"$_GO_BATS_COVERAGE_DIR\""
    "declare -x _GO_BATS_DIR=\"$_GO_BATS_DIR\""
    "declare -x _GO_BATS_PATH=\"$_GO_BATS_PATH\""
    "declare -x _GO_BATS_URL=\"$_GO_BATS_URL\""
    "declare -x _GO_BATS_VERSION=\"$_GO_BATS_VERSION\""
    "declare -rx _GO_CMD=\"$TEST_GO_SCRIPT\""
    "declare -ax _GO_CMD_ARGV=(${cmd_argv[*]})"
    'declare -ax _GO_CMD_NAME=([0]="test-command" [1]="test-subcommand")'
    "declare -x _GO_COLLECT_BATS_COVERAGE=\"$_GO_COLLECT_BATS_COVERAGE\""
    "declare -rx _GO_CORE_DIR=\"$_GO_CORE_DIR\""
    "declare -rx _GO_CORE_URL=\"$_GO_CORE_URL\""
    "declare -rx _GO_CORE_VERSION=\"$_GO_CORE_VERSION\""
    "declare -x _GO_COVERALLS_URL=\"$_GO_COVERALLS_URL\""
    "declare -a _GO_IMPORTED_MODULES=(${expected_modules[*]})"
    "declare -a _GO_IMPORTED_MODULE_CALLERS=(${expected_module_callers[*]})"
    "declare -a _GO_IMPORTED_MODULE_FILES=(${expected_module_files[*]})"
    "declare -x _GO_INJECT_MODULE_PATH=\"$TEST_GO_ROOTDIR/lib\""
    "declare -x _GO_INJECT_SEARCH_PATH=\"$TEST_GO_ROOTDIR/bin\""
    "declare -x _GO_KCOV_DIR=\"$_GO_KCOV_DIR\""
    "declare -- _GO_PLUGINS_DIR=\"$TEST_GO_PLUGINS_DIR\""
    "declare -a _GO_PLUGINS_PATHS=(${plugins_paths[*]})"
    "declare -x _GO_ROOTDIR=\"$TEST_GO_ROOTDIR\""
    "declare -rx _GO_SCRIPT=\"$TEST_GO_SCRIPT\""
    "declare -- _GO_SCRIPTS_DIR=\"$TEST_GO_SCRIPTS_DIR\""
    "declare -a _GO_SEARCH_PATHS=(${search_paths[*]})"
    "declare -rx _GO_TEST_DIR=\"$_GO_TEST_DIR\""
    "declare -rx _GO_USE_MODULES=\"$_GO_CORE_DIR/lib/internal/use\"")

  quotify_expected
  restore_bats_shell_options "$?"
  assert_lines_equal "${expected[@]}"
}

# Since Bash scripts are sourced, and have access to these variables regardless,
# we use Perl to ensure they are are exported to new processes that run command
# scripts in languages other than Bash.
@test "$SUITE: run perl script; _GO_* variables are exported" {
  if ! command -v perl >/dev/null; then
    skip 'perl not installed'
  fi

  @go.create_test_command_script 'test-command.d/test-subcommand' \
    '#!/bin/perl' \
    'foreach my $env_var (sort keys %ENV) {' \
    '  if ($env_var =~ /^_GO_/) {' \
    '    printf("%s: %s\n", $env_var, $ENV{$env_var});' \
    '  }' \
    '}'
  run "$TEST_GO_SCRIPT" test-command test-subcommand foo bar 'baz quux' xyzzy
  assert_success
  assert_lines_equal "_GO_BATS_COVERAGE_DIR: $_GO_BATS_COVERAGE_DIR" \
    "_GO_BATS_DIR: $_GO_BATS_DIR" \
    "_GO_BATS_PATH: $_GO_BATS_PATH" \
    "_GO_BATS_URL: $_GO_BATS_URL" \
    "_GO_BATS_VERSION: $_GO_BATS_VERSION" \
    "_GO_CMD: $TEST_GO_SCRIPT" \
    $'_GO_CMD_ARGV: foo\x1fbar\x1fbaz quux\x1fxyzzy' \
    $'_GO_CMD_NAME: test-command\x1ftest-subcommand' \
    "_GO_COLLECT_BATS_COVERAGE: $_GO_COLLECT_BATS_COVERAGE" \
    "_GO_CORE_DIR: $_GO_CORE_DIR" \
    "_GO_CORE_URL: $_GO_CORE_URL" \
    "_GO_CORE_VERSION: $_GO_CORE_VERSION" \
    "_GO_COVERALLS_URL: $_GO_COVERALLS_URL" \
    "_GO_KCOV_DIR: $_GO_KCOV_DIR" \
    "_GO_ROOTDIR: $TEST_GO_ROOTDIR" \
    "_GO_SCRIPT: $TEST_GO_SCRIPT" \
    "_GO_TEST_DIR: $_GO_TEST_DIR" \
    "_GO_USE_MODULES: $_GO_USE_MODULES"
}
