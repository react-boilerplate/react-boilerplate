#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script '. "$_GO_USE_MODULES" "prompt"' \
    'declare default="$1"' \
    'if @go.prompt_for_yes_or_no "To be or not to be?" "$default"; then' \
    "  printf \"\n'Tis nobler to suffer the slings and arrows of fortune!\n\"" \
    'else' \
    "  printf \"\n'Tis nobler to take up arms against a sea of troubles!\n\"" \
    'fi'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: error if default value invalid" {
  run "$TEST_GO_SCRIPT" 'foobar'
  assert_failure
  assert_lines_match \
    '^Invalid `default` parameter "foobar" for @go.prompt_for_yes_or_no at:' \
    "^  $TEST_GO_SCRIPT:[0-9] main$"
}

@test "$SUITE: default to yes" {
  run "$TEST_GO_SCRIPT" 'yes' <<<''
  assert_success 'To be or not to be? [Y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"

  run "$TEST_GO_SCRIPT" 'yes' <<<'no'
  assert_success 'To be or not to be? [Y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"
}

@test "$SUITE: default to no" {
  run "$TEST_GO_SCRIPT" 'no' <<<''
  assert_success 'To be or not to be? [y/N] ' \
    "'Tis nobler to take up arms against a sea of troubles!"

  run "$TEST_GO_SCRIPT" 'no' <<<'yes'
  assert_success 'To be or not to be? [y/N] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"
}

@test "$SUITE: default to neither, prompt for an answer if first is empty" {
  run "$TEST_GO_SCRIPT" <<<'yes'
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"
}

@test "$SUITE: prompt repeatedly until valid answer given" {
  run "$TEST_GO_SCRIPT" <<<$'\nfoobar\nyes'
  assert_success 'To be or not to be? [y/n] ' \
    'Please answer Y(es) or N(o): '  \
    '"foobar" is an invalid response.' \
    '' \
    'Please answer Y(es) or N(o): '  \
    "'Tis nobler to suffer the slings and arrows of fortune!"
}

@test "$SUITE: match 'yes' patterns, trim input" {
  run "$TEST_GO_SCRIPT" <<<'   yes   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"

  run "$TEST_GO_SCRIPT" <<<'   Yes   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"

  run "$TEST_GO_SCRIPT" <<<'   YES   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"

  run "$TEST_GO_SCRIPT" <<<'   y   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"

  run "$TEST_GO_SCRIPT" <<<'   Y   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to suffer the slings and arrows of fortune!"
}

@test "$SUITE: match 'no' patterns, trim input" {
  run "$TEST_GO_SCRIPT" <<<'   no   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"

  run "$TEST_GO_SCRIPT" <<<'   No   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"

  run "$TEST_GO_SCRIPT" <<<'   NO   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"

  run "$TEST_GO_SCRIPT" <<<'   n   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"

  run "$TEST_GO_SCRIPT" <<<'   N   '
  assert_success 'To be or not to be? [y/n] ' \
    "'Tis nobler to take up arms against a sea of troubles!"
}
