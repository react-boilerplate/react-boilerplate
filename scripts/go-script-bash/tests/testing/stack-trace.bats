#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/stack-trace"

EXPECTED_TEST_SCRIPT=

setup() {
  test_filter
  EXPECTED_TEST_GO_SCRIPT=('#! /usr/bin/env bash'
    ". '$_GO_CORE_DIR/go-core.bash' '$TEST_GO_SCRIPTS_RELATIVE_DIR'"
    '# Comment'
    ''
    '# Moar comment'
    ''
    'foo()   {'
    '  baz'
    '}'
    'baz'
    'bar  (){'
    '  baz'
    '}'
    'function baz  {'
    ' :'
    '}'
    ''
    '@go "$@"')
}

teardown() {
  @go.remove_test_go_rootdir
}

create_stack_trace_test_script() {
  @go.create_test_go_script "${EXPECTED_TEST_GO_SCRIPT[@]:2}"
}

@test "$SUITE: count_lines" {
  create_stack_trace_test_script
  assert_file_equals "$TEST_GO_SCRIPT" "${EXPECTED_TEST_GO_SCRIPT[@]}"

  local num_lines=0
  @go.count_lines "$TEST_GO_SCRIPT" 'num_lines'
  assert_equal "${#EXPECTED_TEST_GO_SCRIPT[@]}" "$num_lines"
}

@test "$SUITE: count_lines aborts if file not specified" {
  run @go.count_lines
  assert_failure 'No file specified for `@go.count_lines`.'
}

@test "$SUITE: count_lines aborts if file missing" {
  run @go.count_lines "$TEST_GO_SCRIPT" 'num_lines'
  assert_failure \
    "Create \"$TEST_GO_SCRIPT\" before calling \`@go.count_lines\`."
}

@test "$SUITE: count_lines aborts if result variable not specified" {
  create_stack_trace_test_script
  run @go.count_lines "$TEST_GO_SCRIPT"
  assert_failure 'No result variable specified for `@go.count_lines`.'
}

@test "$SUITE: stack_trace_item_from_offset reports last line:main by default" {
  create_stack_trace_test_script
  run @go.stack_trace_item_from_offset "$TEST_GO_SCRIPT"
  assert_success "  $TEST_GO_SCRIPT:${#EXPECTED_TEST_GO_SCRIPT[@]} main"
}

@test "$SUITE: stack_trace_item_from_offset reports specified line, function" {
  create_stack_trace_test_script
  run @go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" '1' 'funcname'

  local expected_lineno="$((${#EXPECTED_TEST_GO_SCRIPT[@]} - 1))"
  assert_success "  $TEST_GO_SCRIPT:$expected_lineno funcname"
}

@test "$SUITE: stack_trace_item_from_offset aborts if file not specified" {
  run @go.stack_trace_item_from_offset
  assert_failure 'No file specified for `@go.stack_trace_item_from_offset`.'
}

@test "$SUITE: set_go_core_stack_trace_components" {
  assert_equal '' "${GO_CORE_STACK_TRACE_COMPONENTS[*]}"
  @go.set_go_core_stack_trace_components
  lines=("${GO_CORE_STACK_TRACE_COMPONENTS[@]}")
  assert_lines_match \
    "^  $_GO_CORE_DIR/go-core.bash:[0-9]+ _@go.run_command_script$" \
    "^  $_GO_CORE_DIR/go-core.bash:[0-9]+ @go$"
}

@test "$SUITE: stack_trace_item aborts if file not specified" {
  run @go.stack_trace_item
  assert_failure 'No file specified for `@go.stack_trace_item`.'
}

@test "$SUITE: stack_trace_item aborts if no function name specified" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT"
  assert_failure 'No function name specified for `@go.stack_trace_item`.'
}

@test "$SUITE: stack_trace_item aborts if 'main' or 'source', but no target" {
  create_stack_trace_test_script

  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'main'
  assert_failure \
    'No target line from `main` specified for `@go.stack_trace_item`.'

  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'source'
  assert_failure \
    'No target line from `source` specified for `@go.stack_trace_item`.'
}

@test "$SUITE: stack_trace_item finds line in 'main'" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'main' 'baz'
  assert_success "  $TEST_GO_SCRIPT:10 main"
}

@test "$SUITE: stack_trace_item finds line in 'source'" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'source' 'baz'
  assert_success "  $TEST_GO_SCRIPT:10 source"
}

@test "$SUITE: stack_trace_item finds function definition opening" {
  # Normally a stack trace shouldn't show the line on which a function is
  # defined. Somehow this will happend in functions that contain a process
  # substitution, such as `@go.log_command`.
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'baz'
  assert_success "  $TEST_GO_SCRIPT:14 baz"
}

@test "$SUITE: stack_trace_item finds line inside specified function" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'bar' '  baz'
  assert_success "  $TEST_GO_SCRIPT:12 bar"
}

@test "$SUITE: stack_trace_item fails to find a match in a function" {
  # Note the difference from the above is that 'baz' contains no leading spaces.
  # It should match neither the '  baz' lines from 'foo' or 'bar', nor should it
  # match the 'baz' line in 'main'.
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'bar' 'baz'
  assert_failure "Line not found in \`bar\` from \"$TEST_GO_SCRIPT\": \"baz\""
}

@test "$SUITE: stack_trace_item fails to find a match in 'main'" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'main' 'quux'
  assert_failure "Line not found in \`main\` from \"$TEST_GO_SCRIPT\": \"quux\""
}

@test "$SUITE: stack_trace_item fails to find a function definition" {
  create_stack_trace_test_script
  TEST_DEBUG=1 run @go.stack_trace_item "$TEST_GO_SCRIPT" 'quux'
  assert_failure "Function \`quux\` not found in \"$TEST_GO_SCRIPT\"."
}

@test "$SUITE: stack_trace_item fails to find a line in a missing function" {
  create_stack_trace_test_script
  run @go.stack_trace_item "$TEST_GO_SCRIPT" 'quux' 'baz'
  assert_failure "Function \`quux\` not found in \"$TEST_GO_SCRIPT\"."
}
