#! /usr/bin/env bats

load environment

ASSERTION_SOURCE="$_GO_CORE_DIR/lib/bats/assertions"
load "$_GO_CORE_DIR/lib/bats/assertion-test-helpers"

setup() {
  test_filter
  mkdir "$BATS_TEST_ROOTDIR"
}

teardown() {
  remove_bats_test_dirs
}

@test "$SUITE: fail prints status and output, returns error" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail' \
    'STATUS: 0' \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: fail handles strings containing percentage signs" {
  expect_assertion_failure "echo '% not interpreted as a format spec'" \
    'fail' \
    'STATUS: 0' \
    'OUTPUT:' \
    '% not interpreted as a format spec'
}

@test "$SUITE: fail uses the supplied reason message" {
  expect_assertion_failure "echo 'Goodbye, world!'" \
    'fail "You say \"Goodbye,\" while I say \"Hello...\""' \
    'You say "Goodbye," while I say "Hello..."' \
    'STATUS: 0' \
    'OUTPUT:' \
    'Goodbye, world!'
}

@test "$SUITE: fail doesn't print status, output when bats_fail_no_output set" {
  bats_fail_no_output='true' expect_assertion_failure "echo 'Goodbye, world!'" \
    'fail "You say \"Goodbye,\" while I say \"Hello...\""' \
    'You say "Goodbye," while I say "Hello..."'
}

@test "$SUITE: assert_equal success" {
  expect_assertion_success "echo 'Hello, world!'" \
    'assert_equal "Hello, world!" "$output" "echo result"'
}

@test "$SUITE: assert_equal failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'assert_equal "Goodbye, world!" "$output" "echo result"' \
    'echo result not equal to expected value:' \
    "  expected: 'Goodbye, world!'" \
    "  actual:   'Hello, world!'"
}

@test "$SUITE: assert_equal failure default label" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'assert_equal "Goodbye, world!" "$output"' \
    'Actual value not equal to expected value:' \
    "  expected: 'Goodbye, world!'" \
    "  actual:   'Hello, world!'"
}

@test "$SUITE: assert_matches success" {
  expect_assertion_success "echo 'Hello, world!'" \
    'assert_matches "o, w" "$output" "echo result"'
}

@test "$SUITE: assert_matches failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'assert_matches "e, w" "$output" "echo result"' \
    'echo result does not match expected pattern:' \
    "  pattern: 'e, w'" \
    "  value:   'Hello, world!'"
}

@test "$SUITE: assert_matches failure default label" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'assert_matches "e, w" "$output"' \
    'Value does not match expected pattern:' \
    "  pattern: 'e, w'" \
    "  value:   'Hello, world!'"
}

@test "$SUITE: assert_output success" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_output 'Hello, world!'"
}

@test "$SUITE: assert_output success with joining multiple lines" {
  expect_assertion_success "printf '%s\n' 'Hello,' 'world!'" \
    "assert_output 'Hello,' 'world!'"
}

@test "$SUITE: assert_output success with argument containing '%'" {
  expect_assertion_success \
    "printf 'This \"%%/\" reproduces failures from #98.\n'" \
    "assert_output 'This \"%/\" reproduces failures from #98.'"
}

@test "$SUITE: assert_output handles output starting with dashes" {
  expect_assertion_success "echo '--flag-from-tab-completion'" \
    "assert_output '--flag-from-tab-completion'"
}

@test "$SUITE: assert_output fail output check" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_output 'Goodbye, world!'" \
    'output not equal to expected value:' \
    "  expected: 'Goodbye, world!'" \
    "  actual:   'Hello, world!'"
}

@test "$SUITE: assert_output empty string check" {
  expect_assertion_success 'echo' \
    'assert_output ""'
}

@test "$SUITE: assert_output fail empty string check" {
  expect_assertion_failure 'echo "Not empty"' \
    "assert_output ''" \
    'output not equal to expected value:' \
    "  expected: ''" \
    "  actual:   'Not empty'"
}

@test "$SUITE: assert_output_matches success" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_output_matches 'o, w'"
}

@test "$SUITE: assert_output_matches failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_output_matches 'e, w'" \
    'output does not match expected pattern:' \
    "  pattern: 'e, w'" \
    "  value:   'Hello, world!'"
}

@test "$SUITE: assert_output_matches fails if more than one argument" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_output_matches 'o, w' 'ell'" \
    'ERROR: assert_output_matches takes exactly one argument'
}

@test "$SUITE: assert_status" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_status '0'"
}

@test "$SUITE: assert_status failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_status '1'" \
    'exit status not equal to expected value:' \
    "  expected: '1'" \
    "  actual:   '0'"
}

@test "$SUITE: assert_success without output check" {
  expect_assertion_success "echo 'Hello, world!'" \
    'assert_success'
}

@test "$SUITE: assert_success failure" {
  expect_assertion_failure "printf_with_error 'Hello, world!'" \
    'assert_success' \
    'expected success, but command failed' \
    'STATUS: 1' \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: assert_success with output check" {
  expect_assertion_success "printf '%s\n' 'Hello,' 'world!'" \
    "assert_success 'Hello,' 'world!'"
}

@test "$SUITE: assert_success output check failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_success 'Goodbye, world!'" \
    'output not equal to expected value:' \
    "  expected: 'Goodbye, world!'" \
    "  actual:   'Hello, world!'"
}

@test "$SUITE: assert_failure without output check" {
  expect_assertion_success "printf_with_error 'Hello, world!'" \
    'assert_failure'
}

@test "$SUITE: assert_failure failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'assert_failure' \
    'expected failure, but command succeeded' \
    'STATUS: 0' \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: assert_failure with output check" {
  expect_assertion_success "printf_with_error 'Hello, world!'" \
    "assert_failure 'Hello, world!'"
}

@test "$SUITE: assert_failure output check failure" {
  expect_assertion_failure "printf_with_error '%s\n' 'Hello,' 'world!'" \
    "assert_failure 'Goodbye,' 'world!'" \
    'output not equal to expected value:' \
    "  expected: 'Goodbye," \
    "world!'" \
    "  actual:   'Hello," \
    "world!'"
}

@test "$SUITE: assert_line_equals" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_line_equals '0' 'Hello, world!'"
}

@test "$SUITE: assert_line_equals with negative index" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_line_equals '-1' 'Hello, world!'"
}

@test "$SUITE: assert_line_equals failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_line_equals '0' 'Goodbye, world!'" \
    'line 0 not equal to expected value:' \
    "  expected: 'Goodbye, world!'" \
    "  actual:   'Hello, world!'" \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: assert_line_matches" {
  expect_assertion_success "echo 'Hello, world!'" \
    "assert_line_matches '0' 'o, w'"
}

@test "$SUITE: assert_line_matches failure" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "assert_line_matches 0 'e, w'" \
    'line 0 does not match expected pattern:' \
    "  pattern: 'e, w'" \
    "  value:   'Hello, world!'" \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: assert_line_matches failure handles percent signs in output" {
  expect_assertion_failure "echo '% not interpreted as a format spec'" \
    "assert_line_matches 0 '% interpreted as a format spec'" \
    'line 0 does not match expected pattern:' \
    "  pattern: '% interpreted as a format spec'" \
    "  value:   '% not interpreted as a format spec'" \
    'OUTPUT:' \
    '% not interpreted as a format spec'
}

@test "$SUITE: assert_lines_equal" {
  expect_assertion_success "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_equal 'foo' 'bar' 'baz'"
}

@test "$SUITE: assert_lines_equal zero lines" {
  expect_assertion_success "printf ''" \
    "assert_lines_equal"
}

@test "$SUITE: assert_lines_equal failure" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_equal 'foo' 'quux' 'baz'" \
    'line 1 not equal to expected value:' \
    "  expected: 'quux'" \
    "  actual:   'bar'" \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: assert_lines_equal failure due to one output line too many" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\nquux\n'" \
    "assert_lines_equal 'foo' 'bar' 'baz'" \
    'There is one more line of output than expected:' \
    'quux' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz' \
    'quux'
}

@test "$SUITE: assert_lines_equal failure from bad matches and too many lines" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\nquux\nxyzzy\nplugh\n'" \
    "assert_lines_equal 'frobozz' 'frotz' 'blorple'" \
    'line 0 not equal to expected value:' \
    "  expected: 'frobozz'" \
    "  actual:   'foo'" \
    'line 1 not equal to expected value:' \
    "  expected: 'frotz'" \
    "  actual:   'bar'" \
    'line 2 not equal to expected value:' \
    "  expected: 'blorple'" \
    "  actual:   'baz'" \
    'There are 3 more lines of output than expected:' \
    'quux' \
    'xyzzy' \
    'plugh' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz' \
    'quux' \
    'xyzzy' \
    'plugh'
}

@test "$SUITE: assert_lines_equal failure due to one output line too few" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_equal 'foo' 'bar' 'baz' 'quux'" \
    'line 3 not equal to expected value:' \
    "  expected: 'quux'" \
    "  actual:   ''" \
    'There is one fewer line of output than expected.' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: assert_lines_equal failure from bad matches and too few lines" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_equal 'frobozz' 'frotz' 'blorple' 'quux' 'xyzzy' 'plugh'" \
    'line 0 not equal to expected value:' \
    "  expected: 'frobozz'" \
    "  actual:   'foo'" \
    'line 1 not equal to expected value:' \
    "  expected: 'frotz'" \
    "  actual:   'bar'" \
    'line 2 not equal to expected value:' \
    "  expected: 'blorple'" \
    "  actual:   'baz'" \
    'line 3 not equal to expected value:' \
    "  expected: 'quux'" \
    "  actual:   ''" \
    'line 4 not equal to expected value:' \
    "  expected: 'xyzzy'" \
    "  actual:   ''" \
    'line 5 not equal to expected value:' \
    "  expected: 'plugh'" \
    "  actual:   ''" \
    'There are 3 fewer lines of output than expected.' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: assert_lines_match" {
  expect_assertion_success "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_match 'f.*' 'b[a-z]r' '^baz$'"
}

@test "$SUITE: assert_lines_match failure" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "assert_lines_match 'f.*' 'qu+x' '^baz$'" \
    'line 1 does not match expected pattern:' \
    "  pattern: 'qu+x'" \
    "  value:   'bar'" \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: set_bats_output_and_lines_from_file" {
  assert_equal '' "$output" 'output before'
  assert_equal '' "${lines[*]}" 'lines before'

  printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'
  set_bats_output_and_lines_from_file "$TEST_OUTPUT_FILE"

  # Note that the trailing newline is stripped, which is consistent with how
  # `output` is conventionally set.
  assert_equal $'\nfoo\n\nbar\n\nbaz\n' "$output" 'output after'
  assert_lines_equal '' 'foo' '' 'bar' '' 'baz' ''
}

@test "$SUITE: set_bats_output_and_lines_from_file from empty file" {
  printf_to_test_output_file '\n'
  set_bats_output_and_lines_from_file "$TEST_OUTPUT_FILE"
  assert_lines_equal ''
}

@test "$SUITE: set_bats_output_and_lines_from_file from completely empty file" {
  printf_to_test_output_file ''
  set_bats_output_and_lines_from_file "$TEST_OUTPUT_FILE"

  # Note that because there wasn't even a newline, we don't even expect the
  # empty string to be present in `lines`.
  assert_lines_equal
}

@test "$SUITE: set_bats_output_and_lines_from_file fails if file is missing" {
  run set_bats_output_and_lines_from_file "$TEST_OUTPUT_FILE"
  assert_failure "'$TEST_OUTPUT_FILE' doesn't exist or isn't a regular file."
}

@test "$SUITE: set_bats_output_and_lines_from_file fails if not regular file" {
  run set_bats_output_and_lines_from_file "${BATS_TEST_ROOTDIR}"
  assert_failure "'$BATS_TEST_ROOTDIR' doesn't exist or isn't a regular file."
}

@test "$SUITE: set_bats_output_and_lines_from_file fails if permission denied" {
  skip_if_cannot_trigger_file_permission_failure

  printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'
  chmod ugo-r "$TEST_OUTPUT_FILE"
  run set_bats_output_and_lines_from_file "$TEST_OUTPUT_FILE"
  assert_failure "You don't have permission to access '$TEST_OUTPUT_FILE'."
}

@test "$SUITE: assert_file_equals" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_equals '$TEST_OUTPUT_FILE' '' 'foo' '' 'bar' '' 'baz' ''"
}

@test "$SUITE: assert_file_equals expect file containing empty string only" {
  expect_assertion_success \
    "printf_to_test_output_file '\n'" \
    "assert_file_equals '$TEST_OUTPUT_FILE' ''"
}

@test "$SUITE: assert_file_equals expect file completely empty file" {
  # Note that because there wasn't even a newline, we don't even supply the
  # empty string to `assert_file_equals`.
  expect_assertion_success \
    "printf_to_test_output_file ''" \
    "assert_file_equals '$TEST_OUTPUT_FILE'"
}

@test "$SUITE: assert_file_equals failure" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_equals '$TEST_OUTPUT_FILE' '' 'foo' '' 'quux' '' 'baz' ''" \
    'line 3 not equal to expected value:' \
    "  expected: 'quux'" \
    "  actual:   'bar'" \
    'OUTPUT:' \
    '' \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    ''
}

@test "$SUITE: assert_file_equals fails fast when file is nonexistent" {
  # This reproduces a bug where __assert_file didn't exit when
  # set_bats_output_and_lines_from_file failed.
  expect_assertion_failure "echo Whoops, forgot to write to TEST_OUTPUT_FILE!" \
    "assert_file_equals '$TEST_OUTPUT_FILE' '' 'foo' '' 'bar' '' 'baz' ''" \
    "'$TEST_OUTPUT_FILE' doesn't exist or isn't a regular file."
}

@test "$SUITE: assert_file_matches" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_matches '$TEST_OUTPUT_FILE' 'foo.*b[a-z]r.*baz'"
}

@test "$SUITE: assert_file_matches failure" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_matches '$TEST_OUTPUT_FILE' 'foo.*qu+x.*baz'" \
    "The content of '$TEST_OUTPUT_FILE' does not match expected pattern:" \
    "  pattern: 'foo.*qu+x.*baz'" \
    "  value:   '" \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    "'"
}

@test "$SUITE: assert_file_lines_match" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_lines_match '$TEST_OUTPUT_FILE' \
      '^$' 'f.*' '^$' 'b[a-z]r' '^$' '^baz$' '^$'"
}

@test "$SUITE: assert_file_lines_match failure" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "assert_file_lines_match '$TEST_OUTPUT_FILE' \
      '^$' 'f.*' '^$' 'qu+x' '^$' '^baz$' '^$'" \
    'line 3 does not match expected pattern:' \
    "  pattern: 'qu+x'" \
    "  value:   'bar'" \
    'OUTPUT:' \
    '' \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    ''
}

@test "$SUITE: fail_if fails when assertion unknown" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail_if foobar "$output" "echo result"' \
    "Unknown assertion: 'assert_foobar'"
}

@test "$SUITE: fail_if succeeds when assert_equal fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    'fail_if equal "Goodbye, world!" "$output" "echo result"'
}

@test "$SUITE: fail_if fails when assert_equal succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail_if equal "Hello, world!" "$output" "echo result"' \
    'Expected echo result not to equal:' \
    "  'Hello, world!'"
}

@test "$SUITE: fail_if fails when assert_equal succeeds with default label" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail_if equal "Hello, world!" "$output"' \
    'Expected value not to equal:' \
    "  'Hello, world!'"
}

@test "$SUITE: fail_if succeeds when assert_matches fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    'fail_if matches "Goodbye" "$output" "echo result"'
}

@test "$SUITE: fail_if fails when assert_matches succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail_if matches "Hello" "$output" "echo result"' \
    'Expected echo result not to match:' \
    "  'Hello'" \
    'Value:' \
    "  'Hello, world!'"
}

@test "$SUITE: fail_if fails when assert_matches succeeds with default label" {
  expect_assertion_failure "echo 'Hello, world!'" \
    'fail_if matches "Hello" "$output"' \
    'Expected value not to match:' \
    "  'Hello'" \
    'Value:' \
    "  'Hello, world!'"
}

@test "$SUITE: fail_if succeeds when assert_output fails" {
  expect_assertion_success "printf '%s\n' 'Hello,' 'world!'" \
    "fail_if output 'Goodbye,' 'world!'"
}

@test "$SUITE: fail_if fails when assert_output succeeds" {
  expect_assertion_failure "printf '%s\n' 'Hello,' 'world!'" \
    "fail_if output 'Hello,' 'world!'" \
    'Expected output not to equal:' \
    "  'Hello,'" \
    "  'world!'"
}

@test "$SUITE: fail_if succeeds when assert_output_matches fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    "fail_if output_matches 'Goodbye'"
}

@test "$SUITE: fail_if fails when assert_output_matches succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "fail_if output_matches 'Hello'" \
    'Expected output not to match:' \
    "  'Hello'" \
    'Value:' \
    "  'Hello, world!'"
}

@test "$SUITE: fail_if succeeds when assert_status fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    "fail_if status '1'"
}

@test "$SUITE: fail_if fails when assert_status succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "fail_if status '0'" \
    'Expected status not to equal:' \
    "  '0'"
}

@test "$SUITE: fail_if succeeds when assert_line_equals fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    "fail_if line_equals '0' 'Goodbye, world!'"
}

@test "$SUITE: fail_if fails when assert_line_equals succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "fail_if line_equals '0' 'Hello, world!'" \
    'Expected line 0 not to equal:' \
    "  'Hello, world!'" \
    'STATUS: 0' \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: fail_if succeeds when assert_line_matches fails" {
  expect_assertion_success "echo 'Hello, world!'" \
    "fail_if line_matches '0' 'Goodbye'"
}

@test "$SUITE: fail_if fails when assert_line_matches succeeds" {
  expect_assertion_failure "echo 'Hello, world!'" \
    "fail_if line_matches '0' 'Hello'" \
    'Expected line 0 not to match:' \
    "  'Hello'" \
    'Value:' \
    "  'Hello, world!'" \
    'STATUS: 0' \
    'OUTPUT:' \
    'Hello, world!'
}

@test "$SUITE: fail_if succeeds when assert_lines_match fails" {
  expect_assertion_success "printf 'foo\nbar\nbaz\n'" \
    "fail_if lines_match 'f.*' 'qu+x' '^baz\$'"
}

@test "$SUITE: fail_if fails when assert_lines_match succeeds" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "fail_if lines_match 'f.*' 'b[a-z]r' '^baz\$'" \
    'Expected lines not to match:' \
    "  'f.*'" \
    "  'b[a-z]r'" \
    "  '^baz\$'" \
    'STATUS: 0' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: fail_if succeeds when assert_lines_equal fails" {
  expect_assertion_success "printf 'foo\nbar\nbaz\n'" \
    "fail_if lines_equal 'foo' 'quux' 'baz'"
}

@test "$SUITE: fail_if fails when assert_lines_equal succeeds" {
  expect_assertion_failure "printf 'foo\nbar\nbaz\n'" \
    "fail_if lines_equal 'foo' 'bar' 'baz'" \
    'Expected lines not to equal:' \
    "  'foo'" \
    "  'bar'" \
    "  'baz'" \
    'STATUS: 0' \
    'OUTPUT:' \
    'foo' \
    'bar' \
    'baz'
}

@test "$SUITE: fail_if succeeds when assert_file_equals fails" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_equals '$TEST_OUTPUT_FILE' '' 'foo' '' 'quux' '' 'baz' ''"
}

@test "$SUITE: fail_if fails when assert_file_equals succeeds" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_equals '$TEST_OUTPUT_FILE' '' 'foo' '' 'bar' '' 'baz' ''" \
    "Expected '$TEST_OUTPUT_FILE' not to equal:" \
    "  ''" \
    "  'foo'" \
    "  ''" \
    "  'bar'" \
    "  ''" \
    "  'baz'" \
    "  ''" \
    'STATUS: 0' \
    'OUTPUT:' \
    '' \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    ''
}

@test "$SUITE: fail_if succeeds when assert_file_matches fails" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_matches '$TEST_OUTPUT_FILE' 'foo.*qu+x.*baz'"
}

@test "$SUITE: fail_if fails when assert_file_matches succeeds" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_matches '$TEST_OUTPUT_FILE' 'foo.*b[a-z]r.*baz'" \
    "Expected '$TEST_OUTPUT_FILE' not to match:" \
    "  'foo.*b[a-z]r.*baz'" \
    'STATUS: 0' \
    'OUTPUT:' \
    '' \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    ''
}

@test "$SUITE: fail_if succeeds when assert_file_lines_match fails" {
  expect_assertion_success \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_lines_match '$TEST_OUTPUT_FILE' \
      '^$' 'f.*' '^$' 'qu+x' '^$' '^baz$' '^$'"
}

@test "$SUITE: fail_if fails when assert_file_lines_match succeeds" {
  expect_assertion_failure \
    "printf_to_test_output_file '\nfoo\n\nbar\n\nbaz\n\n'" \
    "fail_if file_lines_match '$TEST_OUTPUT_FILE' \
      '^$' 'f.*' '^$' 'b[a-z]r' '^$' '^baz$' '^$'" \
    "Expected '$TEST_OUTPUT_FILE' not to match:" \
    "  '^$'" \
    "  'f.*'" \
    "  '^$'" \
    "  'b[a-z]r'" \
    "  '^$'" \
    "  '^baz$'" \
    "  '^$'" \
    'STATUS: 0' \
    'OUTPUT:' \
    '' \
    'foo' \
    '' \
    'bar' \
    '' \
    'baz' \
    ''
}
