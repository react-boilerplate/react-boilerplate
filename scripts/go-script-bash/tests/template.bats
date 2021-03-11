#! /usr/bin/env bats

load environment

# By default, the test will try to clone its own repo to avoid flakiness due to
# an external dependency. However, doing so causes a failure on Travis, since it
# uses shallow clones to produce test runs, resulting in the error:
#
#   fatal: attempt to fetch/clone from a shallow repository
#
# However, since Travis already depends on having a good connection to GitHub,
# we'll use the real URL. Alternatively, `git` could be stubbed out via
# `stub_program_in_path` from `_GO_CORE_DIR/lib/bats/helpers`, but the potential
# for neither flakiness nor complexity seems that great, and this approach
# provides extra confidence that the mechanism works as advertised.
#
# A developer can also run the test locally against the real URL by setting
# `TEST_USE_REAL_URL` on the command line. The value of `GO_CORE_URL` is
# subsequently displayed in the name of the test case to validate which repo is
# being used during the test run.
TEST_USE_REAL_URL="${TEST_USE_REAL_URL:-$TRAVIS}"
GO_CORE_URL="${TEST_USE_REAL_URL:+$_GO_CORE_URL}"
GO_CORE_URL="${GO_CORE_URL:-$_GO_CORE_DIR}"

setup() {
  test_filter
  export GO_SCRIPT_BASH_VERSION="$_GO_CORE_VERSION"
  export GO_SCRIPTS_DIR="$_GO_TEST_DIR/tmp/go-template-test-scripts"
  export GO_SCRIPT_BASH_REPO_URL="$GO_CORE_URL"
}

teardown() {
  rm -rf "$_GO_ROOTDIR/$GO_SCRIPTS_DIR"
}

@test "$SUITE: successfully run 'help' from its own directory" {
  GO_SCRIPT_BASH_CORE_DIR="$_GO_CORE_DIR" GO_SCRIPTS_DIR='scripts' \
    run "$_GO_CORE_DIR/go-template" 'help'
  assert_success
  assert_output_matches "Usage: $_GO_CORE_DIR/go-template <command>"
}

@test "$SUITE: clone the go-script-bash repository from $GO_CORE_URL" {
  if [[ -e "$GO_CORE_URL/.git/shallow" ]]; then
    skip "Can't clone shallow repositories"
  fi
  run "$_GO_CORE_DIR/go-template"

  # Without a command argument, the script will print the top-level help and
  # return an error, but the core repo should exist as expected.
  assert_failure
  assert_output_matches "Cloning framework from '$GO_CORE_URL'\.\.\."

  # Use `.*/scripts/go-script-bash` to account for the fact that `git clone` on
  # MSYS2 will output `C:/Users/<user>/AppData/Local/Temp/` in place of `/tmp`.
  assert_output_matches "Cloning into '.*/$GO_SCRIPTS_DIR/go-script-bash'\.\.\."
  assert_output_matches "Clone of '$GO_CORE_URL' successful\."$'\n\n'
  assert_output_matches "Usage: $_GO_CORE_DIR/go-template <command>"
  [[ -f "$_GO_ROOTDIR/$GO_SCRIPTS_DIR/go-script-bash/go-core.bash" ]]

  cd "$_GO_ROOTDIR/$GO_SCRIPTS_DIR/go-script-bash"
  run git log --oneline -n 1
  assert_success
  assert_output_matches "go-script-bash $_GO_CORE_VERSION"
}

@test "$SUITE: fail to clone a nonexistent repo" {
  GO_SCRIPT_BASH_REPO_URL='bogus-repo-that-does-not-exist' \
    run "$_GO_CORE_DIR/go-template"
  assert_failure "Cloning framework from 'bogus-repo-that-does-not-exist'..." \
    "fatal: repository 'bogus-repo-that-does-not-exist' does not exist" \
    "Failed to clone 'bogus-repo-that-does-not-exist'; aborting."
}
