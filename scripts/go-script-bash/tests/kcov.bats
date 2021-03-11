#! /usr/bin/env bats

load environment

KCOV_DIR='tests/kcov'
KCOV_COVERAGE_DIR='tests/coverage'
KCOV_INCLUDE_PATTERNS='include/,pattern'
KCOV_EXCLUDE_PATTERNS='exclude/,pattern'
KCOV_COVERALLS_URL='https://coveralls.io/github/mbland/go-script-bash'
RUN_KCOV_ARGV=(
  "$KCOV_DIR"
  "$KCOV_COVERAGE_DIR"
  "$KCOV_INCLUDE_PATTERNS"
  "$KCOV_EXCLUDE_PATTERNS"
  "$KCOV_COVERALLS_URL")
KCOV_PATH="$KCOV_DIR/src/kcov"
KCOV_ARGV_START=(
  "$KCOV_PATH"
  "--include-pattern=$KCOV_INCLUDE_PATTERNS"
  "--exclude-pattern=$KCOV_EXCLUDE_PATTERNS"
)

setup() {
  test_filter
  set "$DISABLE_BATS_SHELL_OPTIONS"
  setup_fake_binaries
  restore_bats_shell_options "$?"
}

teardown() {
  @go.remove_test_go_rootdir
}

setup_fake_binaries() {
  local fake_binaries=(
    'apt-get'
    'cmake'
    'git'
    'sudo'
    'make'
    'dpkg-query')
  local fake_binary

  for fake_binary in "${fake_binaries[@]}"; do
    stub_program_in_path "$fake_binary" \
      'echo "$@" >"$0.out" 2>&1'
  done
}

write_kcov_go_script() {
  @go.create_test_go_script \
    ". \"\$_GO_USE_MODULES\" 'kcov-ubuntu'" \
    "$@"
}

write_kcov_dummy() {
  local kcov_dummy="$TEST_GO_ROOTDIR/$KCOV_PATH"
  mkdir -p "${kcov_dummy%/*}"
  printf "#! /usr/bin/env bash\n%s\n" "$*" >"$kcov_dummy"
  chmod 700 "$kcov_dummy"
}

@test "$SUITE: check dev packages installed" {
  write_kcov_go_script '__check_kcov_dev_packages_installed'
  run "$TEST_GO_SCRIPT"
  assert_success ''

  . 'lib/kcov-ubuntu'
  assert_file_equals "$BATS_TEST_BINDIR/dpkg-query.out" \
    "-W -f=\${Package} \${Status}\\n ${__KCOV_DEV_PACKAGES[*]}"
}

@test "$SUITE: check dev packages fails on dpkg-query error" {
  write_kcov_go_script '__check_kcov_dev_packages_installed'
  echo 'exit 1' >>"$BATS_TEST_BINDIR/dpkg-query"
  run "$TEST_GO_SCRIPT"
  assert_failure ''
}

@test "$SUITE: check dev packages fails if a package deinstalled" {
  write_kcov_go_script '__check_kcov_dev_packages_installed'
  echo 'echo deinstall' >>"$BATS_TEST_BINDIR/dpkg-query"
  run "$TEST_GO_SCRIPT"
  assert_failure ''
}

@test "$SUITE: clone and build" {
  write_kcov_go_script '__check_kcov_dev_packages_installed() { return 1; }' \
    '__clone_and_build_kcov tests/kcov'

  # Use `mkdir` to create the target directory of `git clone`.
  echo 'mkdir -p "${@:$(($# - 1))}"' >> "$BATS_TEST_BINDIR/git"

  TRAVIS_OS_NAME= run "$TEST_GO_SCRIPT"
  . 'lib/kcov-ubuntu'
  assert_success
  assert_lines_match "Cloning kcov repository from $__KCOV_URL..." \
    "Successfully cloned \"$__KCOV_URL\" reference \"$__KCOV_VERSION\" into " \
    'Installing dev packages to build kcov...' \
    'Building kcov...'

  assert_file_matches "$BATS_TEST_BINDIR/git.out" \
    "clone .* -b $__KCOV_VERSION $__KCOV_URL tests/kcov"

  IFS=' '
  assert_file_equals "$BATS_TEST_BINDIR/sudo.out" \
    "apt-get install -y ${__KCOV_DEV_PACKAGES[*]}"
  assert_file_equals "$BATS_TEST_BINDIR/cmake.out" '.'
  assert_file_equals "$BATS_TEST_BINDIR/make.out" ''
}

@test "$SUITE: clone and build fails if clone fails" {
  write_kcov_go_script '__clone_and_build_kcov tests/kcov'
  echo 'exit 1' >> "$BATS_TEST_BINDIR/git"

  TRAVIS_OS_NAME= run "$TEST_GO_SCRIPT"
  . 'lib/kcov-ubuntu'
  assert_failure
  assert_lines_match "Cloning kcov repository from $__KCOV_URL\.\.\." \
    "Failed to clone \"$__KCOV_URL\" .* into \"tests/kcov\"\."
}

@test "$SUITE: clone and build fails if install fails" {
  write_kcov_go_script '__clone_and_build_kcov tests/kcov'
  echo 'exit 1' >>"$BATS_TEST_BINDIR/dpkg-query"
  echo 'exit 1' >> "$BATS_TEST_BINDIR/sudo"
  mkdir -p "$TEST_GO_ROOTDIR/tests/kcov"

  TRAVIS_OS_NAME= run "$TEST_GO_SCRIPT"
  . 'lib/kcov-ubuntu'
  local expected_output=(
    'Installing dev packages to build kcov...'
    'Failed to install dev packages needed to build kcov.')
  local IFS=$'\n'
  assert_failure "${expected_output[*]}"
}

@test "$SUITE: clone and build fails if cmake fails" {
  write_kcov_go_script '__clone_and_build_kcov tests/kcov'
  mkdir -p "$TEST_GO_ROOTDIR/tests/kcov"
  echo 'exit 1' >> "$BATS_TEST_BINDIR/cmake"

  TRAVIS_OS_NAME= run "$TEST_GO_SCRIPT"
  . 'lib/kcov-ubuntu'
  local expected_output=(
    'Building kcov...'
    'Failed to build kcov.')
  local IFS=$'\n'
  assert_failure "${expected_output[*]}"
}

@test "$SUITE: clone and build fails if make fails" {
  write_kcov_go_script '__clone_and_build_kcov tests/kcov'
  mkdir -p "$TEST_GO_ROOTDIR/tests/kcov"
  echo 'exit 1' >> "$BATS_TEST_BINDIR/make"

  TRAVIS_OS_NAME= run "$TEST_GO_SCRIPT"
  . 'lib/kcov-ubuntu'
  local expected_output=(
    'Building kcov...'
    'Failed to build kcov.')
  local IFS=$'\n'
  assert_failure "${expected_output[*]}"
}

@test "$SUITE: clone and build doesn't install dev packages on Travis" {
  write_kcov_go_script '__check_kcov_dev_packages_installed() { return 1; }' \
    '__clone_and_build_kcov tests/kcov'

  mkdir -p "$TEST_GO_ROOTDIR/tests/kcov"
  TRAVIS_OS_NAME='linux' run "$TEST_GO_SCRIPT"
  assert_success 'Building kcov...'
}

@test "$SUITE: fail to run kcov on non-Linux/apt-get platforms" {
  # Force the script not to find `apt-get` by forcing an empty `PATH`.
  write_kcov_go_script "PATH=; run_kcov ${RUN_KCOV_ARGV[*]}"
  run "$TEST_GO_SCRIPT"
  assert_failure 'Coverage is only available on Linux platforms with apt-get.'
}

@test "$SUITE: fail to run kcov if coverage dir already exists" {
  mkdir -p "$TEST_GO_ROOTDIR/$KCOV_COVERAGE_DIR"
  write_kcov_go_script "run_kcov ${RUN_KCOV_ARGV[*]}"

  run "$TEST_GO_SCRIPT"
  local expected=("The $KCOV_COVERAGE_DIR directory already exists."
    'Please move or remove this directory first.')
  assert_failure "${expected[*]}"
}

@test "$SUITE: fail to run kcov if not present and can't be built" {
  write_kcov_go_script \
    '__clone_and_build_kcov() { echo "KCOV: $*"; return 1; }' \
    "run_kcov ${RUN_KCOV_ARGV[*]}"
  run "$TEST_GO_SCRIPT"
  assert_failure "KCOV: $KCOV_DIR"
}

@test "$SUITE: success when kcov already built" {
  write_kcov_dummy "IFS=\$'\\n'; echo \"\$*\""
  write_kcov_go_script \
    "run_kcov ${RUN_KCOV_ARGV[*]} \"$TEST_GO_SCRIPT\" test foo bar/baz"

  local kcov_argv=("${KCOV_ARGV_START[@]}" "$KCOV_COVERAGE_DIR"
    "$TEST_GO_SCRIPT" 'test' 'foo' 'bar/baz')
  local expected_output=(
    'Starting coverage run:'
    "  ${kcov_argv[*]}"
    "${kcov_argv[@]:1}"
    'Coverage results located in:'
    "  $TEST_GO_ROOTDIR/$KCOV_COVERAGE_DIR")

  TRAVIS_JOB_ID= run "$TEST_GO_SCRIPT"
  local IFS=$'\n'
  assert_success "${expected_output[*]}"
}

@test "$SUITE: success after building kcov" {
  write_kcov_go_script \
    '__clone_and_build_kcov() {' \
    "  mkdir -p '${KCOV_PATH%/*}'" \
    "  printf '#! /usr/bin/env bash\n' >'$KCOV_PATH'" \
    "  chmod 700 '$KCOV_PATH'" \
    '}' \
    "run_kcov ${RUN_KCOV_ARGV[*]} \"$TEST_GO_SCRIPT\" test foo bar/baz"

  local kcov_argv=("${KCOV_ARGV_START[@]}" "$KCOV_COVERAGE_DIR"
    "$TEST_GO_SCRIPT" 'test' 'foo' 'bar/baz')
  local expected_output=(
    'Starting coverage run:'
    "  ${kcov_argv[*]}"
    'Coverage results located in:'
    "  $TEST_GO_ROOTDIR/$KCOV_COVERAGE_DIR")

  TRAVIS_JOB_ID= run "$TEST_GO_SCRIPT"
  local IFS=$'\n'
  assert_success "${expected_output[*]}"
}

@test "$SUITE: failure if kcov returns an error status" {
  write_kcov_dummy "printf 'Oh noes!\n' >&2; exit 1"
  write_kcov_go_script \
    "run_kcov ${RUN_KCOV_ARGV[*]} \"$TEST_GO_SCRIPT\" test foo bar/baz"

  local kcov_argv=("${KCOV_ARGV_START[@]}" "$KCOV_COVERAGE_DIR"
    "$TEST_GO_SCRIPT" 'test' 'foo' 'bar/baz')
  local expected_output=(
    'Starting coverage run:'
    "  ${kcov_argv[*]}"
    'kcov exited with errors.')

  TRAVIS_JOB_ID= run "$TEST_GO_SCRIPT"
  local IFS=$'\n'
  assert_failure "${expected_output[*]}"
}

@test "$SUITE: send results to Coveralls when running on Travis" {
  write_kcov_dummy
  write_kcov_go_script \
    "run_kcov ${RUN_KCOV_ARGV[*]} \"$TEST_GO_SCRIPT\" test foo bar/baz"

  local kcov_argv=("${KCOV_ARGV_START[@]}"
    "--coveralls-id=666" "$KCOV_COVERAGE_DIR"
    "$TEST_GO_SCRIPT" 'test' 'foo' 'bar/baz')
  local expected_output=(
    'Starting coverage run:'
    "  ${kcov_argv[*]}"
    'Coverage results sent to:'
    "  $KCOV_COVERALLS_URL")

  TRAVIS_JOB_ID=666 run "$TEST_GO_SCRIPT"
  local IFS=$'\n'
  assert_success "${expected_output[*]}"
}

@test "$SUITE: don't send to Coveralls when URL is missing" {
  local run_kcov_argv=(
    "$KCOV_DIR"
    "$KCOV_COVERAGE_DIR"
    "$KCOV_INCLUDE_PATTERNS"
    "$KCOV_EXCLUDE_PATTERNS")
  write_kcov_dummy
  # Note that the coverage_url argument is the empty string.
  write_kcov_go_script \
    "run_kcov ${run_kcov_argv[*]} '' \"$TEST_GO_SCRIPT\" test foo bar/baz"

  local kcov_argv=("${KCOV_ARGV_START[@]}" "$KCOV_COVERAGE_DIR"
    "$TEST_GO_SCRIPT" 'test' 'foo' 'bar/baz')
  local expected_output=(
    'Starting coverage run:'
    "  ${kcov_argv[*]}"
    'Coverage results located in:'
    "  $TEST_GO_ROOTDIR/$KCOV_COVERAGE_DIR")

  TRAVIS_JOB_ID=666 run "$TEST_GO_SCRIPT"
  local IFS=$'\n'
  assert_success "${expected_output[*]}"
}
