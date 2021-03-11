#! /usr/bin/env bats

load ../environment

setup() {
  # We want standard output and standard error to be connected to the actual
  # terminal to make sure `tput cols` isn't automatically defaulting to 80.
  # Thankfully Bash creates the /dev/tty pseudo file on our behalf on Windows.
  #
  # On OS X on Travis, however, /dev/tty exists, but assigning a file
  # descriptor to it results in a `/dev/tty: Device not configured` error.
  # Hence the standard error dance.
  create_bats_test_script 'go' \
    'exec 27>&1 2>/dev/null' \
    'if exec 1>/dev/tty; then' \
    '  :' \
    'fi' \
    'exec 2>&1' \
    ". '$_GO_ROOTDIR/go-core.bash' '$TEST_GO_SCRIPTS_RELATIVE_DIR'" \
    'exec 1>&27 27>&- 2>&1' \
    'echo "$COLUMNS"'

  mkdir "$TEST_GO_SCRIPTS_DIR"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: set COLUMNS if unset" {
  COLUMNS= run "$TEST_GO_SCRIPT"
  assert_success
  [ -n "$output" ]
}

@test "$SUITE: honor COLUMNS if already set" {
  COLUMNS="19700918" run "$TEST_GO_SCRIPT"
  assert_success '19700918'
}

@test "$SUITE: default COLUMNS to 80 if actual columns can't be determined" {
  COLUMNS= PATH= run "$BASH" "$TEST_GO_SCRIPT"
  assert_success '80'
}

@test "$SUITE: use tput to set columns if available" {
  if ! command -v tput >/dev/null; then
    skip "tput not found on this system"
  elif [[ -z "$TERM" ]]; then
    skip "TERM not set on this system"
  fi

  # See the comment in setup() for context on the redirection shenanigans.
  exec 27>&1 2>/dev/null
  if exec 1>/dev/tty; then
    :
  fi
  exec 2>&1

  local expected_cols="$(env COLUMNS= tput cols)"
  exec 1>&27 27>&- 2>&1

  COLUMNS= run "$TEST_GO_SCRIPT"
  assert_success "$expected_cols"
}

@test "$SUITE: default to 80 columns if tput fails or use mode.com on Windows" {
  local expected_cols='80'

  if [[ "$(mode.com con)" =~ Columns:\ +([0-9]+) ]]; then
    expected_cols="${BASH_REMATCH[1]}"
  fi

  # One way to cause tput to fail is to set `$TERM` to null. On Travis it's set
  # to 'dumb', but tput fails anyway. The code now defaults to 80 on all errors.
  COLUMNS= TERM= run "$TEST_GO_SCRIPT"
  assert_success "$expected_cols"
}
