#! /usr/bin/env bats

load environment

setup() {
  test_filter
}

teardown() {
  @go.remove_test_go_rootdir
}

create_go_format_script() {
  @go.create_test_go_script '. "$_GO_USE_MODULES" format' "$@"
}

run_array_printf_script() {
  create_go_format_script \
    'declare result=()' \
    '@go.array_printf result "%s" "$@"' \
    'IFS="|"' \
    'printf "%s\n" "${result[*]}"'
  run "$TEST_GO_SCRIPT" "$@"
}

run_pad_items_script() {
  create_go_format_script \
    'declare padded=()' \
    '@go.pad_items padded "$@"' \
    'IFS="|"' \
    'printf "%s\n" "${padded[*]}"'
  run "$TEST_GO_SCRIPT" "$@"
}

run_zip_items_script() {
  create_go_format_script \
    'declare lhs_items=($1)' \
    'declare rhs_items=($2)' \
    'declare zipped=()' \
    '@go.zip_items lhs_items rhs_items "$3" zipped' \
    'printf "%s\n" "${zipped[@]}"'
  run "$TEST_GO_SCRIPT" "$@"
}

run_strip_formatting_codes_script() {
  create_go_format_script \
    'declare stripped' \
    '@go.strip_formatting_codes "$*" stripped' \
    'printf "%s\n" "$stripped"'
  run "$TEST_GO_SCRIPT" "$@"
}

@test "$SUITE: array_printf validates result array name" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" format' \
    '@go.array_printf "3foobar"'
  run "$TEST_GO_SCRIPT"

  local err_msg='Result array name "3foobar" for @go.array_printf '
  err_msg+='must not start with a number at:'
  assert_failure "$err_msg" \
    "  $TEST_GO_SCRIPT:4 main"
}

@test "$SUITE: array_printf does nothing for empty argv" {
  run_array_printf_script
  assert_success ''
}

@test "$SUITE: array_printf prints argv items" {
  run_array_printf_script 'foo' 'bar' 'baz' 'xyzzy' 'quux'
  assert_success 'foo|bar|baz|xyzzy|quux'
}

@test "$SUITE: array_printf prints argv items with different delimiter" {
  _GO_ARRAY_PRINTF_DELIMITER=$'\x1e' run_array_printf_script \
    $'foo\x1f' $'bar\x1f' $'baz\x1f' $'xyzzy\x1f' $'quux\x1f'
  assert_success $'foo\x1f|bar\x1f|baz\x1f|xyzzy\x1f|quux\x1f'
}

@test "$SUITE: pad_items validates result array name" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" format' \
    '@go.pad_items "3foobar"'
  run "$TEST_GO_SCRIPT"

  local err_msg='Result array name "3foobar" for @go.pad_items '
  err_msg+='must not start with a number at:'
  assert_failure "$err_msg" \
    "  $TEST_GO_SCRIPT:4 main"
}

@test "$SUITE: pad_items does nothing for empty argv" {
  run_pad_items_script
  assert_success ''
}

@test "$SUITE: pad_items pads argv items" {
  run_pad_items_script 'foo' 'bar' 'baz' 'xyzzy' 'quux'
  assert_success 'foo  |bar  |baz  |xyzzy|quux '
}

@test "$SUITE: zip_items validates result array name" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" format' \
    '@go.zip_items lhs rhs = "3foobar"'
  run "$TEST_GO_SCRIPT"

  local err_msg='Result array name "3foobar" for @go.zip_items '
  err_msg+='must not start with a number at:'
  assert_failure "$err_msg" \
    "  $TEST_GO_SCRIPT:4 main"
}

@test "$SUITE: zip_items does nothing for empty argv" {
  run_zip_items_script
  assert_success ''
}

@test "$SUITE: zip_items zips matching items with supplied delimiter" {
  local lhs=('foo' 'xyzzy' 'quux')
  local rhs=('bar' 'baz' 'plugh')
  run_zip_items_script "${lhs[*]}" "${rhs[*]}" '='
  assert_success 'foo=bar' 'xyzzy=baz' 'quux=plugh'
}

@test "$SUITE: strip_formatting_codes validates result array name" {
  @go.create_test_go_script '. "$_GO_USE_MODULES" format' \
    '@go.strip_formatting_codes "foobar" "3foobar"'
  run "$TEST_GO_SCRIPT"

  local err_msg='Result variable name "3foobar" for @go.strip_formatting_codes '
  err_msg+='must not start with a number at:'
  assert_failure "$err_msg" \
    "  $TEST_GO_SCRIPT:4 main"
}

@test "$SUITE: strip_formatting_codes from empty string" {
  run_strip_formatting_codes_script ''
  assert_success ''
}

@test "$SUITE: strip_formatting_codes from string with no codes" {
  run_strip_formatting_codes_script 'foobar'
  assert_success 'foobar'
}

@test "$SUITE: strip_formatting_codes from string with one code" {
  run_strip_formatting_codes_script 'foobar\e[0m'
  assert_success 'foobar'
}

@test "$SUITE: strip_formatting_codes from string with multiple codes" {
  run_strip_formatting_codes_script '\e[1mf\e[30;47mo\e[0;111mo\e[32mbar\e[0m'
  assert_success 'foobar'
}

@test "$SUITE: strip_formatting_codes from string with expanded codes" {
  local orig_value
  printf -v orig_value '%b' '\e[1mf\e[30;47mo\e[0;111mo\e[32mbar\e[0m'
  run_strip_formatting_codes_script "$orig_value"
  assert_success 'foobar'
}
