#! /usr/bin/env bats

load ../environment
load "$_GO_CORE_DIR/lib/testing/stack-trace"

FILE_PATH="$TEST_GO_ROOTDIR/hello.txt"
GO_USE_MODULES_STACK_ITEMS=(
  "$(@go.stack_trace_item "$_GO_USE_MODULES" '_@go.use_modules' \
    '    if ! _@go.import_module; then')"
  "$(@go.stack_trace_item "$_GO_USE_MODULES" source '_@go.use_modules "$@"')")

setup() {
  test_filter
  mkdir -p "$TEST_GO_ROOTDIR"
  echo "Hello, World!" >"$FILE_PATH"
}

teardown() {
  @go.remove_test_go_rootdir
}

create_file_open_test_go_script() {
  @go.create_test_go_script \
    ". \"\$_GO_USE_MODULES\" 'file'" \
    "declare file_path='$FILE_PATH'" \
    "$@"
}

@test "$SUITE: open file for reading" {
  create_file_open_test_go_script \
    'declare read_fd' \
    'declare file_content' \
    '@go.open_file_or_duplicate_fd "$file_path" "r" "read_fd"' \
    'read -r -u "$read_fd" file_content' \
    'printf "$file_content"'
  run "$TEST_GO_SCRIPT"
  assert_success "$(< "$FILE_PATH")"
}

@test "$SUITE: duplicate descriptor for reading" {
  create_file_open_test_go_script \
    'declare read_fd' \
    'declare dup_read_fd' \
    'declare file_content' \
    '@go.open_file_or_duplicate_fd "$file_path" "r" "read_fd"' \
    '@go.open_file_or_duplicate_fd "$read_fd" "r" "dup_read_fd"' \
    'read -r -u "$dup_read_fd" file_content' \
    'printf "$file_content"'
  run "$TEST_GO_SCRIPT"
  assert_success "$(< "$FILE_PATH")"
}


@test "$SUITE: open file for writing" {
  create_file_open_test_go_script \
    'declare write_fd' \
    '@go.open_file_or_duplicate_fd "$file_path" "w" "write_fd"' \
    'echo "Goodbye, World!" >&"$write_fd"'
  run "$TEST_GO_SCRIPT"
  assert_success
  assert_file_equals "$FILE_PATH" "Goodbye, World!"
}

@test "$SUITE: duplicate descriptor for writing" {
  create_file_open_test_go_script \
    'declare write_fd' \
    'declare dup_write_fd' \
    '@go.open_file_or_duplicate_fd "$file_path" "w" "write_fd"' \
    '@go.open_file_or_duplicate_fd "$write_fd" "w" "dup_write_fd"' \
    'echo "Goodbye, World!" >&"$dup_write_fd"'
  run "$TEST_GO_SCRIPT"
  assert_success
  assert_file_equals "$FILE_PATH" "Goodbye, World!"
}

@test "$SUITE: open file for appending" {
  local expected=("$(< "$FILE_PATH")"
    "Goodbye, World!")

  create_file_open_test_go_script \
    'declare append_fd' \
    '@go.open_file_or_duplicate_fd "$file_path" "a" "append_fd"' \
    'echo "Goodbye, World!" >&"$append_fd"'
  run "$TEST_GO_SCRIPT"
  assert_success
  assert_file_equals "$FILE_PATH" "${expected[@]}"
}

@test "$SUITE: open file for read and write" {
  # Turns out this is random access. Let's have some fun here!
  # Per: http://www.tldp.org/LDP/abs/html/io-redirection.html
  local first_line='You say'
  local second_line='and I say'
  echo "${first_line}_________" >"$FILE_PATH"
  echo "${second_line}_______" >>"$FILE_PATH"

  create_file_open_test_go_script \
    'declare read_write_fd' \
    'declare file_content' \
    '@go.open_file_or_duplicate_fd "$file_path" "rw" "read_write_fd"' \
    '' \
    "read -n ${#first_line} -u \"\$read_write_fd\" file_content" \
    'printf "$file_content\n"' \
    'echo " goodbye," >&"$read_write_fd"' \
    '' \
    "read -n ${#second_line} -u \"\$read_write_fd\" file_content" \
    'printf "$file_content\n"' \
    'echo " hello!" >&"$read_write_fd"' \

  run "$TEST_GO_SCRIPT"
  assert_success "$first_line" "$second_line"

  local updated_content=('You say goodbye,'
    'and I say hello!')
  assert_file_equals "$FILE_PATH" "${updated_content[@]}"
}

@test "$SUITE: error if _GO_MAX_FILE_DESCRIPTORS is not an integer" {
  create_file_open_test_go_script
  _GO_MAX_FILE_DESCRIPTORS='foobar' run "$TEST_GO_SCRIPT"

  local expected=(
    '_GO_MAX_FILE_DESCRIPTORS is "foobar", must be a number greater than 3.'
    "${GO_USE_MODULES_STACK_ITEMS[@]}"
    "  $TEST_GO_SCRIPT:3 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: error if _GO_MAX_FILE_DESCRIPTORS isn't greater than 3" {
  create_file_open_test_go_script
  _GO_MAX_FILE_DESCRIPTORS='3' run "$TEST_GO_SCRIPT"

  local expected=(
    '_GO_MAX_FILE_DESCRIPTORS is "3", must be a number greater than 3.'
    "${GO_USE_MODULES_STACK_ITEMS[@]}"
    "  $TEST_GO_SCRIPT:3 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: validates file_path_or_fd contains no meta or control chars" {
  create_file_open_test_go_script \
    "@go.open_file_or_duplicate_fd \"\$FILE_PATH_OR_FD\" 'r' 'read_fd'"

  local file_path_or_fd="\`echo SURPRISE >&2\`$FILE_PATH"
  FILE_PATH_OR_FD="$file_path_or_fd" run "$TEST_GO_SCRIPT"

  local err_msg="file_path_or_fd \"$file_path_or_fd\" "
  err_msg+='for @go.open_file_or_duplicate_fd contains '
  err_msg+='unescaped shell metacharacters or control operators at:'

  local expected=("$err_msg"
    "  $TEST_GO_SCRIPT:5 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: error if mode is unknown" {
  create_file_open_test_go_script \
    '@go.open_file_or_duplicate_fd "$file_path" "bogus" "bogus_fd"'
  run "$TEST_GO_SCRIPT"

  local expected=('Unknown mode: bogus'
    "  $TEST_GO_SCRIPT:5 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: error if no file descriptor variable reference given" {
  create_file_open_test_go_script \
    '@go.open_file_or_duplicate_fd "$file_path" "r"'
  run "$TEST_GO_SCRIPT"

  local err_msg='fd_var_reference "" for @go.open_file_or_duplicate_fd '
  err_msg+='must not be empty at:'

  local expected=("$err_msg"
    "  $TEST_GO_SCRIPT:5 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: validates variable reference contains no meta or control chars" {
  create_file_open_test_go_script \
    "@go.open_file_or_duplicate_fd \"\$file_path\" 'r' \"\$VAR_REF\""

  local var_ref=$'echo SURPRISE\nread_fd'
  VAR_REF="$var_ref" run "$TEST_GO_SCRIPT"

  local err_msg="fd_var_reference \"$var_ref\" "
  err_msg+='for @go.open_file_or_duplicate_fd '
  err_msg+='contains invalid identifier characters at:'

  local expected=("$err_msg"
    "  $TEST_GO_SCRIPT:5 main")
  assert_failure "${expected[@]}"
}

@test "$SUITE: error opening file path with escaped \`" {
  # The point here is that meta and control characters pass validation when
  # escaped, but the file still doesn't exist.
  create_file_open_test_go_script \
    'declare read_fd' \
    '@go.open_file_or_duplicate_fd "$file_path\\\`" "r" "read_fd"'
  run "$TEST_GO_SCRIPT"

  assert_failure
  assert_line_matches '-2' \
    "Failed to open fd [1-9][0-9]* for \"$FILE_PATH[\\]\`\" in mode 'r' at:"
  assert_line_matches '-1' "  $TEST_GO_SCRIPT:6 main"
}

@test "$SUITE: error if no file descriptors are available" {
  create_file_open_test_go_script \
    'declare read_fd' \
    'while "true"; do' \
    '  @go.open_file_or_duplicate_fd "$file_path" "r" "read_fd_success"' \
    'done'
  _GO_MAX_FILE_DESCRIPTORS=10 run "$TEST_GO_SCRIPT"

  local expected=("No file descriptors < 10 available; failed at:"
    "  $TEST_GO_SCRIPT:7 main")
  assert_failure "${expected[@]}"
}
