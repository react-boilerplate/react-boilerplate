#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: use default quest option" {
  run "$_GO_SCRIPT" demo-core prompt <<<$'Mike\n\n'
  assert_success
  split_bats_output_into_lines

  local default_quest='Do you have a quest? [Y/n] '
  default_quest+='What is your quest? [default: To seek the grail!]'

  assert_lines_equal 'What is your name?' \
    'Nice to meet you, Mike!' \
    "${default_quest}" \
    'Your quest is: To seek the grail!'
}

@test "$SUITE: return error if name not specified" {
  run "$_GO_SCRIPT" demo-core prompt <<<''
  assert_failure 'What is your name?' \
    'Run away, Sir or Madam Not Appearing in this Film! Run away!'
}

@test "$SUITE: specify a different quest" {
  run "$_GO_SCRIPT" demo-core prompt \
    <<<$'Mike\nyes\nTo go back and face the peril!'
  assert_success
  split_bats_output_into_lines

  local default_quest='Do you have a quest? [Y/n] '
  default_quest+='What is your quest? [default: To seek the grail!]'

  assert_lines_equal 'What is your name?' \
    'Nice to meet you, Mike!' \
    "${default_quest}" \
    'Your quest is: To go back and face the peril!'
}

@test "$SUITE: decline a quest" {
  run "$_GO_SCRIPT" demo-core prompt <<<$'Mike\nno\nno'
  assert_failure
  split_bats_output_into_lines

  local default_quest='Do you have a quest? [Y/n] '
  default_quest+='Might I suggest: To seek the grail! [Y/n]'

  assert_lines_equal 'What is your name?' \
    'Nice to meet you, Mike!' \
    "${default_quest} OK, no quest. Suit yourself!"
}

@test "$SUITE: suggest a quest and accept it" {
  run "$_GO_SCRIPT" demo-core prompt <<<$'Mike\nno\nyes'
  assert_success
  split_bats_output_into_lines

  local default_quest='Do you have a quest? [Y/n] '
  default_quest+='Might I suggest: To seek the grail! [Y/n]'

  assert_lines_equal 'What is your name?' \
    'Nice to meet you, Mike!' \
    "${default_quest} Your quest is: To seek the grail!"
}
