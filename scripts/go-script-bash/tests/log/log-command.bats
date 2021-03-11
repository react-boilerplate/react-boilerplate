#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/log"

setup() {
  test_filter
  # Test every case with a log file as well.
  export TEST_LOG_FILE="$TEST_GO_ROOTDIR/test-script.log"
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: log single command" {
  @go.run_log_script '@go.log_command echo Hello, World!'

  assert_success
  @go.assert_log_equals \
    RUN 'echo Hello, World!' \
    'Hello, World!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: keep leading and trailing whitespace from nested invocations" {
  @go.run_log_script \
  'inner_function() {' \
  '  echo "   Hello, World!   "' \
  '}' \
  'middle_function() {' \
  '  @go.log_command inner_function' \
  '}' \
  'outer_function() {' \
  '  @go.log_command middle_function' \
  '}' \
  '@go.log_command outer_function'

  assert_success
  @go.assert_log_equals \
    RUN 'outer_function' \
    RUN 'middle_function' \
    RUN 'inner_function' \
    '   Hello, World!   '
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: logging to a file doesn't repeat lines or skip other log files" {
  local info_log="$TEST_GO_ROOTDIR/info.log"

  @go.run_log_script \
    'function_that_logs_info() {' \
    '  @go.log INFO "$@"' \
    '  "$@"' \
    '}' \
    "@go.log_add_output_file '$info_log' INFO" \
    '@go.log INFO Invoking _GO_SCRIPT: $_GO_SCRIPT' \
    '@go.log_command function_that_logs_info echo Hello, World!'

  assert_success
  @go.assert_log_equals \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    RUN  'function_that_logs_info echo Hello, World!' \
    INFO 'echo Hello, World!' \
    'Hello, World!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
  @go.assert_log_file_equals "$info_log" \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    INFO 'echo Hello, World!'
}

@test "$SUITE: nested @go.log RUN calls always print to standard output" {
  # See #66. The reason nested calls should always print to standard output is
  # because those calls won't otherwise get logged if the `RUN` level file
  # descriptors are updated to eliminate standard output. By always printing
  # nested `@go.log_command` messages to standard output, the outermost
  # `@go.log_command` call will still write them to the log file.
  local run_log_file="$TEST_GO_ROOTDIR/run.log"

  @go.run_log_script \
    'nested_log_command_function() {' \
    '  @go.log_command echo "Hello, World!"' \
    '}' \
    '. "$_GO_USE_MODULES" file' \
    "declare run_log_file=\"$run_log_file\"" \
    'declare run_log_file_fd' \
    '@go.open_file_or_duplicate_fd "$run_log_file" w run_log_file_fd' \
    '@go.add_or_update_log_level RUN keep "$run_log_file_fd"' \
    '@go.log INFO Calling function with nested log_command call' \
    '@go.log_command nested_log_command_function'

  assert_success
  @go.assert_log_equals INFO 'Calling function with nested log_command call'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
  @go.assert_log_file_equals "$run_log_file" \
    RUN  'nested_log_command_function' \
    RUN  'echo Hello, World!' \
    'Hello, World!'
}

@test "$SUITE: log single failing command to standard error" {
  @go.run_log_script \
      'function failing_function() {' \
      '  printf "%b\n" "\e[1m$*\e[0m" >&2' \
      '  exit 127' \
      '}' \
      '@go.log_command failing_function foo bar baz'

  assert_failure
  @go.assert_log_equals \
    RUN 'failing_function foo bar baz' \
    'foo bar baz' \
    ERROR 'failing_function foo bar baz (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log failing command to standard error with formatting" {
  _GO_LOG_FORMATTING='true' @go.run_log_script \
      'function failing_function() {' \
      '  printf "%b\n" "\e[1m$*\e[0m" >&2' \
      '  exit 127' \
      '}' \
      '@go.log_command failing_function foo bar baz'

  assert_failure
  @go.assert_log_equals \
    "$(@go.format_log_label RUN)" 'failing_function foo bar baz' \
    "$(printf '%b' '\e[1mfoo bar baz\e[0m')" \
    "$(@go.format_log_label ERROR)" \
      'failing_function foo bar baz (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single failing command in critical section" {
  @go.run_log_script 'failing_function() { return 127; }' \
    '@go.critical_section_begin' \
    '@go.log_command failing_function foo bar baz' \
    '@go.critical_section_end'

  assert_failure
  @go.assert_log_equals \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single failing command in critical section using QUIT" {
  # Note that this overrides the default _GO_LOG_CRITICAL_SECTION_LEVEL.
  @go.run_log_script 'failing_function() { return 127; }' \
    '@go.critical_section_begin QUIT' \
    '@go.log_command failing_function foo bar baz' \
    '@go.critical_section_end'

  # Note that QUIT doesn't produce a stack trace.
  assert_failure
  @go.assert_log_equals \
    RUN 'failing_function foo bar baz' \
    QUIT 'failing_function foo bar baz (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single failing critical section after setting global level" {
  _GO_CRITICAL_SECTION_DEFAULT='QUIT' @go.run_log_script \
    'failing_function() { return 127; }' \
    '@go.critical_section_begin' \
    '@go.log_command failing_function foo bar baz' \
    '@go.critical_section_end'

  # Note that QUIT doesn't produce a stack trace.
  assert_failure
  @go.assert_log_equals \
    RUN 'failing_function foo bar baz' \
    QUIT 'failing_function foo bar baz (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: error if any log level other than QUIT or FATAL specified" {
  @go.run_log_script '@go.critical_section_begin' \
    '@go.critical_section_begin QUIT' \
    '@go.critical_section_begin FATAL' \
    '@go.critical_section_begin ERROR'

  assert_failure
  @go.assert_log_equals \
    FATAL '@go.critical_section_begin accepts QUIT or FATAL, not ERROR' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log level of earlier section doesn't affect later section" {
  @go.run_log_script '@go.critical_section_begin QUIT' \
    '@go.log_command echo Hello, World!' \
    '@go.critical_section_end' \
    '@go.critical_section_begin' \
    '@go.log_command @go.log ERROR 127 This triggers a fatal exit' \
    '@go.critical_section_end' \
    "@go.log ERROR Shouldn't get this far..."

  assert_failure
  assert_status 127
  @go.set_log_command_stack_trace_items
  @go.assert_log_equals \
    RUN   'echo Hello, World!' \
    'Hello, World!' \
    RUN   '@go.log ERROR 127 This triggers a fatal exit' \
    ERROR 'This triggers a fatal exit (exit status 127)' \
    FATAL '@go.log ERROR 127 This triggers a fatal exit (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single failing command without executing during dry run" {
  _GO_DRY_RUN='true' @go.run_log_script \
    'failing_function() { return 127; }' \
    '@go.log_command failing_function foo bar baz'

  assert_success
  @go.assert_log_equals \
    RUN 'failing_function foo bar baz'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single command that logs QUIT" {
  @go.run_log_script \
      'function failing_function() {' \
      '  @go.log QUIT 127 "$@"' \
      '}' \
      '@go.log_command failing_function foo bar baz'

  assert_failure
  assert_status 127

  @go.assert_log_equals \
    RUN  'failing_function foo bar baz' \
    QUIT 'foo bar baz (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log single command that logs FATAL (only one stack trace)" {
  @go.run_log_script \
      'function failing_function() {' \
      '  @go.log FATAL 127 "$@"' \
      '}' \
      '@go.log_command failing_function foo bar baz'

  assert_failure
  assert_status 127

  @go.set_log_command_stack_trace_items
  @go.assert_log_equals \
    RUN   'failing_function foo bar baz' \
    FATAL 'foo bar baz (exit status 127)' \
    "  $TEST_GO_SCRIPT:8 failing_function" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT")"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log multiple commands" {
  @go.run_log_script '@go.log_command echo Hello, World!' \
    "@go.log_command echo I don\'t know why you say goodbye," \
    '@go.log_command echo while I say hello...'

  assert_success
  @go.assert_log_equals \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN "echo I don't know why you say goodbye," \
    "I don't know why you say goodbye," \
    RUN "echo while I say hello..." \
    "while I say hello..."
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log multiple commands, second one fails" {
  @go.run_log_script 'failing_function() { return 127; }' \
    '@go.log_command echo Hello, World!' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo Goodbye, World!'

  assert_success
  @go.assert_log_equals \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN "failing_function foo bar baz" \
    ERROR 'failing_function foo bar baz (exit status 127)' \
    RUN "echo Goodbye, World!" \
    "Goodbye, World!"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log multiple commands, second one fails in critical section" {
  @go.run_log_script 'failing_function() { return 127; }' \
    '@go.critical_section_begin' \
    '@go.log_command echo Hello, World!' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo Goodbye, World!' \
    '@go.critical_section_end'

  assert_failure
  @go.assert_log_equals \
    RUN 'echo Hello, World!'\
    'Hello, World!' \
    RUN "failing_function foo bar baz" \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log multiple commands without executing during dry run" {
  _GO_DRY_RUN=true @go.run_log_script \
    'failing_function() { return 127; }' \
    '@go.log_command echo Hello, World!' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo Goodbye, World!'

  assert_success
  @go.assert_log_equals \
    RUN 'echo Hello, World!' \
    RUN "failing_function foo bar baz" \
    RUN 'echo Goodbye, World!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: critical section in function" {
  # This reproduces a bug whereby @go.critical_section_end will return an error
  # status because of its decrementing a variable to zero, resulting in an ERROR
  # log for `critical subsection`.
  @go.run_log_script 'failing_function() { return 127; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin' \
    '  @go.log_command echo $*' \
    '  @go.critical_section_end' \
    '}' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo We made it!'

  assert_success
  @go.assert_log_equals \
    RUN 'critical_subsection Hello, World!' \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN 'failing_function foo bar baz' \
    ERROR 'failing_function foo bar baz (exit status 127)' \
    RUN 'echo We made it!' \
    'We made it!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: nested critical sections" {
  @go.run_log_script 'failing_function() { return 127; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin' \
    '  @go.log_command echo $*' \
    '  @go.critical_section_end' \
    '}' \
    '@go.critical_section_begin' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.critical_section_end' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo We made it!'

  assert_success
  @go.assert_log_equals \
    RUN 'critical_subsection Hello, World!' \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN 'failing_function foo bar baz' \
    ERROR 'failing_function foo bar baz (exit status 127)' \
    RUN 'echo We made it!' \
    'We made it!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: nested critical sections, outermost determines log level" {
  @go.run_log_script 'failing_function() { return 127; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin FATAL' \
    '  @go.log_command failing_function "$@"' \
    '  @go.critical_section_end' \
    '}' \
    '@go.critical_section_begin QUIT' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.critical_section_end' \
    "@go.log_command echo \"We shouldn't've made it...\""

  # Note that QUIT doesn't produce a stack trace.
  assert_failure
  assert_status 127
  @go.assert_log_equals \
    RUN  'critical_subsection Hello, World!' \
    RUN  'failing_function Hello, World!' \
    QUIT 'failing_function Hello, World! (exit status 127)'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: nested critical sections, @go.log FATAL still looks FATAL" {
  @go.run_log_script 'failing_function() { @go.log FATAL 127 "$@"; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin' \
    '  @go.log_command failing_function "$@"' \
    '  @go.critical_section_end' \
    '}' \
    '@go.critical_section_begin QUIT' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.critical_section_end' \
    "@go.log_command echo \"We shouldn't've made it...\""

  # Note that though the critical section specifies QUIT, the exit still appears
  # FATAL because failing_command called `@go.log FATAL` directly.
  assert_failure
  assert_status 127
  @go.set_log_command_stack_trace_items
  @go.assert_log_equals \
    RUN   'critical_subsection Hello, World!' \
    RUN   'failing_function Hello, World!' \
    FATAL 'Hello, World! (exit status 127)' \
    "  $TEST_GO_SCRIPT:7 failing_function" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "  $TEST_GO_SCRIPT:10 critical_subsection" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: nested critical sections dry run" {
  # Note that `echo Hello, World!` inside `critical_subsection` isn't logged,
  # since `critical_subsection` is only logged but not executed.
  _GO_DRY_RUN='true' @go.run_log_script \
    'failing_function() { return 127; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin' \
    '  @go.log_command echo $*' \
    '  @go.critical_section_end' \
    '}' \
    '@go.critical_section_begin' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.critical_section_end' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command echo We made it!'

  assert_success
  @go.assert_log_equals \
    RUN 'critical_subsection Hello, World!' \
    RUN 'failing_function foo bar baz' \
    RUN 'echo We made it!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: critical section is reentrant" {
  @go.run_log_script 'failing_function() { return 127; }' \
    'critical_subsection() {' \
    '  @go.critical_section_begin' \
    '  @go.log_command echo $*' \
    '  @go.critical_section_end' \
    '}' \
    '@go.critical_section_begin' \
    '@go.log_command critical_subsection Hello, World!' \
    '@go.log_command failing_function foo bar baz' \
    '@go.critical_section_end' \
    "@go.log_command echo We shouldn\'t make it this far..."

  assert_failure
  @go.assert_log_equals \
    RUN 'critical_subsection Hello, World!' \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: critical section counter does not go below zero" {
  @go.run_log_script 'failing_function() { return 127; }' \
    '@go.critical_section_begin' \
    '@go.log_command echo Hello, World!' \
    '@go.critical_section_end' \
    '@go.critical_section_end' \
    '@go.critical_section_end' \
    '@go.log_command failing_function foo bar baz' \
    '@go.critical_section_begin' \
    '@go.log_command failing_function foo bar baz' \
    '@go.log_command Should not get this far' \
    '@go.critical_section_end'

  assert_failure
  @go.assert_log_equals \
    RUN 'echo Hello, World!' \
    'Hello, World!' \
    RUN 'failing_function foo bar baz' \
    ERROR 'failing_function foo bar baz (exit status 127)' \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: log and run command script using @go" {
  @go.create_log_script ". \"\$_GO_USE_MODULES\" 'log'" \
    '@go.log_command @go project-command-script "$@"'

  @go.create_test_command_script 'project-command-script' 'echo $*'

  run test-go Hello, World!

  assert_success
  @go.assert_log_equals \
    RUN 'test-go project-command-script Hello, World!' \
    'Hello, World!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: critical section in parent script applies to command script" {
  @go.create_log_script \
    '@go.critical_section_begin' \
    '@go.log_command @go project-command-script "$@"' \
    '@go.critical_section_end' \
    '@go.log_command Should not get this far.'

  @go.create_test_command_script 'project-command-script' \
    'failing_function() { return 127; }' \
    '@go.log_command failing_function "$@"'

  run test-go foo bar baz
  assert_failure
  @go.set_go_core_stack_trace_components
  @go.set_log_command_stack_trace_items

  @go.assert_log_equals \
    RUN 'test-go project-command-script foo bar baz' \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "  $TEST_GO_SCRIPTS_DIR/project-command-script:3 source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 2)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: critical section in command script applies to parent script" {
  @go.create_log_script \
    '@go.log_command @go project-command-script "$@"' \
    '@go.log_command Should not get this far.'

  @go.create_test_command_script 'project-command-script' \
    'failing_function() { return 127; }' \
    '@go.critical_section_begin' \
    '@go.log_command failing_function "$@"' \
    '@go.critical_section_end'

  run test-go foo bar baz
  assert_failure
  @go.set_go_core_stack_trace_components
  @go.set_log_command_stack_trace_items

  @go.assert_log_equals \
    RUN 'test-go project-command-script foo bar baz' \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "  $TEST_GO_SCRIPTS_DIR/project-command-script:4 source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: exit/fatal status pattern applies only when last line printed" {
  @go.create_log_script '@go.log_command @go project-command-script "$@"'

  @go.create_test_command_script 'project-command-script' \
    'echo @go.log_command fatal:127' \
    'echo @go.log_command exit:127'

  run test-go
  assert_success
  # Note that the "fake" exit status lines gets swallowed.
  @go.assert_log_equals RUN 'test-go project-command-script'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: capture sourced script exit status when not from @go.log FATAL" {
  @go.create_log_script \
    '@go.critical_section_begin' \
    "@go.log_command . '$TEST_GO_SCRIPTS_RELATIVE_DIR/sourced-script'" \
    '@go.critical_section_end'

  @go.create_test_command_script 'sourced-script' \
    'exit 127'

  run test-go

  # Note that the `@go.log_command` and `go-core.bash` items aren't in the stack
  # trace.
  assert_failure
  @go.assert_log_equals \
    RUN ". $TEST_GO_SCRIPTS_RELATIVE_DIR/sourced-script" \
    FATAL ". $TEST_GO_SCRIPTS_RELATIVE_DIR/sourced-script (exit status 127)" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: exit status from subcommand in other language" {
  if ! command -v perl >/dev/null; then
    skip 'perl not installed'
  fi

  @go.create_log_script \
    '@go.critical_section_begin' \
    '@go.log_command @go "$@"' \
    '@go.critical_section_end'

  @go.create_test_command_script 'perl-command-script' \
    '#!/bin/perl' \
    'print "@ARGV\n";' \
    'exit 127;'

  run test-go perl-command-script foo bar baz

  assert_failure
  @go.assert_log_equals \
    RUN "test-go perl-command-script foo bar baz" \
    'foo bar baz' \
    FATAL "test-go perl-command-script foo bar baz (exit status 127)" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: fatal status for subcommand of command in another language" {
  if ! command -v perl >/dev/null; then
    skip 'perl not installed'
  fi

  @go.create_log_script \
    '@go.critical_section_begin' \
    '@go.log_command @go "$@"' \
    '@go.critical_section_end'

  # For this to work, scripts in other languages have to take care to return the
  # exit status from the failed command, especially if
  # `__GO_LOG_CRITICAL_SECTION` is in effect.
  @go.create_test_command_script 'perl-command-script' \
    '#!/bin/perl' \
    'print "@ARGV\n";' \
    "my @args = ('bash', \$ENV{'_GO_SCRIPT'}, 'bash-command-script');" \
    'push @args, @ARGV;' \
    "if (system(@args) != 0 && \$ENV{'__GO_LOG_CRITICAL_SECTION'} != 0) {" \
    '  exit $? >> 8;' \
    '}'

  # Note that the critical section still applies, since
  # `__GO_LOG_CRITICAL_SECTION` is exported.
  @go.create_test_command_script 'bash-command-script' \
    'failing_function() { return 127; }' \
    '@go.log_command failing_function "$@"'

  run test-go perl-command-script foo bar baz
  assert_failure
  @go.set_go_core_stack_trace_components
  @go.set_log_command_stack_trace_items

  # Notice there's two FATAL stack traces:
  # - The first is from the bash-command-script, which is insulated from the
  #   top-level `TEST_GO_SCRIPT` invocation by the perl-command-script.
  # - The second is from the top-level `TEST_GO_SCRIPT`, based on the return
  #   status from the perl-command-script.
  @go.assert_log_equals \
    RUN "test-go perl-command-script foo bar baz" \
    'foo bar baz' \
    RUN "test-go bash-command-script foo bar baz" \
    RUN 'failing_function foo bar baz' \
    FATAL 'failing_function foo bar baz (exit status 127)' \
    "  $TEST_GO_SCRIPTS_DIR/bash-command-script:3 source" \
    "${GO_CORE_STACK_TRACE_COMPONENTS[@]}" \
    "${LOG_COMMAND_STACK_TRACE_ITEMS[@]}" \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)" \
    FATAL 'test-go perl-command-script foo bar baz (exit status 127)' \
    "$(@go.stack_trace_item_from_offset "$TEST_GO_SCRIPT" 1)"
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
}

@test "$SUITE: subcommand of command in other language appends to all logs" {
  if ! command -v perl >/dev/null; then
    skip 'perl not installed'
  fi

  local info_log="$TEST_GO_ROOTDIR/info.log"

  @go.create_log_script \
    "@go.log_add_output_file '$info_log' INFO" \
    '@go.log INFO Invoking _GO_SCRIPT: $_GO_SCRIPT' \
    '@go.log_command @go "$@"' \

  @go.create_test_command_script 'perl-command-script' \
    '#!/bin/perl' \
    'print "@ARGV\n";' \
    "my @args = ('bash', \$ENV{'_GO_SCRIPT'}, 'bash-command-script');" \
    'push @args, @ARGV;' \
    "if (system(@args) != 0) {" \
    '  exit $? >> 8;' \
    '}'

  @go.create_test_command_script 'bash-command-script' \
    'function function_that_logs_info() {' \
    '  @go.log INFO "$@"' \
    '  "$@"' \
    '}' \
    '@go.log_command function_that_logs_info "$@"'

  run test-go perl-command-script echo Hello, World!

  assert_success
  @go.assert_log_equals \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    RUN "test-go perl-command-script echo Hello, World!" \
    'echo Hello, World!' \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    RUN "test-go bash-command-script echo Hello, World!" \
    RUN 'function_that_logs_info echo Hello, World!' \
    INFO 'echo Hello, World!' \
    'Hello, World!'
  @go.assert_log_file_equals "$TEST_LOG_FILE" "${lines[@]}"
  @go.assert_log_file_equals "$info_log" \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    INFO "Invoking _GO_SCRIPT: $TEST_GO_SCRIPT" \
    INFO 'echo Hello, World!'
}
