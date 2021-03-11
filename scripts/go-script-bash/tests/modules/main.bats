#! /usr/bin/env bats

load ../environment
load helpers

LAST_CORE_MODULE=
LAST_CORE_MODULE_PATH=

FIRST_CORE_MOD_SUMMARY=
LAST_CORE_MOD_SUMMARY=

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
  setup_test_modules

  local last_index="$((${#CORE_MODULES[@]} - 1))"
  LAST_CORE_MODULE="${CORE_MODULES[$last_index]}"
  LAST_CORE_MODULE_PATH="${CORE_MODULES_PATHS[$last_index]}"
}

teardown() {
  @go.remove_test_go_rootdir
}

get_first_and_last_core_module_summaries() {
  local module
  local __go_cmd_desc

  . "$_GO_ROOTDIR/lib/internal/command_descriptions"
  _@go.command_summary "${CORE_MODULES_PATHS[0]}"
  FIRST_CORE_MOD_SUMMARY="$__go_cmd_desc"
  _@go.command_summary "$LAST_CORE_MODULE_PATH"
  LAST_CORE_MOD_SUMMARY="$__go_cmd_desc"
}

@test "$SUITE: error if unknown option" {
  run "$TEST_GO_SCRIPT" modules --bogus-flag
  assert_failure 'Unknown option: --bogus-flag'
}

@test "$SUITE: error if --imported is followed by arguments" {
  run "$TEST_GO_SCRIPT" modules --imported foo bar
  assert_failure 'The --imported option takes no other arguments.'
}

@test "$SUITE: error if '*' accompanied by other glob patterns" {
  run "$TEST_GO_SCRIPT" modules '_f*' '*' '_b*'
  assert_failure "Do not specify other patterns when '*' is present."
}

@test "$SUITE: error if parsing summary fails" {
  skip_if_cannot_trigger_file_permission_failure

  local module_path="$TEST_GO_PLUGINS_DIR/_foo/lib/_plugh"
  chmod ugo-r "$module_path"
  run "$TEST_GO_SCRIPT" 'modules' '--summaries' '_foo/_plugh'
  assert_failure
  assert_output_matches "ERROR: failed to parse summary from $module_path\$"
}

@test "$SUITE: error if module spec without glob doesn't match anything" {
  run "$TEST_GO_SCRIPT" 'modules' 'some-bogus-module'
  assert_failure 'Unknown module: some-bogus-module'
}

@test "$SUITE: --imported" {
  @go.create_test_go_script \
    '. "$_GO_USE_MODULES" "complete" "_foo/_plugh"' \
    '. "$_GO_USE_MODULES" "_bar/_quux"  "_foo/_plugh"' \
    '. "$_GO_USE_MODULES" "_frotz" "_blorple"' \
    '@go "$@"'

  # The first will be an absolute path because the script's _GO_ROOTDIR doesn't
  # contain the framework sources.
  local expected=(
    "complete     $_GO_ROOTDIR/lib/complete"
    "               go:3 main"
    "_foo/_plugh  scripts/plugins/_foo/lib/_plugh"
    "               go:3 main"
    "_bar/_quux   scripts/plugins/_bar/lib/_quux"
    "               go:4 main"
    "_frotz       scripts/lib/_frotz"
    "               go:5 main"
    "_blorple     lib/_blorple"
    "               go:5 main")

  run "$TEST_GO_SCRIPT" modules --imported
  assert_success "${expected[@]}"
}

@test "$SUITE: list by class, all modules" {
  local expected=('From the core framework library:'
    "${CORE_MODULES[@]/#/  }"
    ''
    'From the internal project library:'
    "${TEST_INTERNAL_MODULES[@]/#/  }"
    ''
    'From the public project library:'
    "${TEST_PUBLIC_MODULES[@]/#/  }"
    ''
    'From the installed plugin libraries:'
    "${TEST_PLUGIN_MODULES[@]/#/  }"
  )

  run "$TEST_GO_SCRIPT" modules
  assert_success "${expected[@]}"
}

@test "$SUITE: list using glob, all modules" {
  local expected=("${CORE_MODULES[@]}"
    "${TEST_INTERNAL_MODULES[@]}"
    "${TEST_PUBLIC_MODULES[@]}"
    "${TEST_PLUGIN_MODULES[@]}"
  )

  run "$TEST_GO_SCRIPT" modules '*'
  assert_success "${expected[@]}"
}

@test "$SUITE: list by class, only core modules present" {
  local expected=('From the core framework library:'
    "${CORE_MODULES[@]/#/  }"
  )

  rm "${TEST_PLUGIN_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}" \
    "${TEST_INTERNAL_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}" \
    "${TEST_PUBLIC_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}"
  run "$TEST_GO_SCRIPT" modules
  assert_success "${expected[@]}"
}

@test "$SUITE: list using glob, only core modules present" {
  rm "${TEST_PLUGIN_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}" \
    "${TEST_INTERNAL_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}" \
    "${TEST_PUBLIC_MODULES_PATHS[@]/#/$TEST_GO_ROOTDIR/}"
  run "$TEST_GO_SCRIPT" modules '*'
  assert_success "${CORE_MODULES[@]}"
}

@test "$SUITE: paths by class" {
  run "$TEST_GO_SCRIPT" modules --paths
  assert_success

  # Note the two newlines at the end of each class section.
  assert_output_matches "  ${CORE_MODULES[0]} +${CORE_MODULES_PATHS[0]}"$'\n'
  assert_output_matches "  $LAST_CORE_MODULE +$LAST_CORE_MODULE_PATH"$'\n\n'

  # Note the padding is relative to only the project modules.
  assert_output_matches $'  _frobozz  scripts/lib/_frobozz\n'
  assert_output_matches $'  _frotz    scripts/lib/_frotz\n\n'
  assert_output_matches $'  _blorple  lib/_blorple\n'
  assert_output_matches $'  _rezrov   lib/_rezrov\n\n'

  # Note the padding is relative to only the plugin modules. Use a variable to
  # keep the assertion lines under 80 columns. Bats trims the last newline of
  # the output.
  local plugins='scripts/plugins'
  assert_output_matches "  _bar/_plugh  $plugins/_bar/lib/_plugh"$'\n'
  assert_output_matches "  _foo/_quux   $plugins/_foo/lib/_quux"$'\n'
  assert_output_matches "  _foo/_xyzzy  $plugins/_foo/lib/_xyzzy$"

  # Since the 'lines' array doesn't contain blank lines, we only add '4' to
  # account for the 'From the...' line starting each class section.
  assert_equal "$((TOTAL_NUM_MODULES + 4))" "${#lines[@]}"
}

@test "$SUITE: paths using glob, all modules" {
  run "$TEST_GO_SCRIPT" modules --paths '*'
  assert_success

  # Note that there is no leading space, the padding is relative to the length
  # of the longest module name overall, and there are no separate sections
  # delimited by back-to-back newlines. Bats trims the final newline.
  assert_output_matches \
    "${CORE_MODULES[0]}  +${CORE_MODULES_PATHS[0]}"$'\n'
  assert_output_matches \
    $'\n'"$LAST_CORE_MODULE  +$LAST_CORE_MODULE_PATH"$'\n'
  assert_output_matches \
    $'\n_frobozz     +scripts/lib/_frobozz\n'
  assert_output_matches \
    $'\n_frotz       +scripts/lib/_frotz\n'
  assert_output_matches \
    $'\n_blorple     +lib/_blorple\n'
  assert_output_matches \
    $'\n_rezrov      +lib/_rezrov\n'
  assert_output_matches \
    $'\n_bar/_plugh  +scripts/plugins/_bar/lib/_plugh\n'
  assert_output_matches \
    $'\n_foo/_quux   +scripts/plugins/_foo/lib/_quux\n'
  assert_output_matches \
    $'\n_foo/_xyzzy  +scripts/plugins/_foo/lib/_xyzzy$'

  assert_equal "$TOTAL_NUM_MODULES" "${#lines[@]}"
}

@test "$SUITE: summaries by class" {
  run "$TEST_GO_SCRIPT" modules --summaries
  assert_success

  # Note the two newlines at the end of each class section.
  get_first_and_last_core_module_summaries
  assert_output_matches "  ${CORE_MODULES[0]} +$FIRST_CORE_MOD_SUMMARY"$'\n'
  assert_output_matches "  $LAST_CORE_MODULE +$LAST_CORE_MOD_SUMMARY"$'\n\n'

  # Note the padding is relative to only the project modules.
  assert_output_matches $'  _frobozz  Summary for _frobozz\n'
  assert_output_matches $'  _frotz    Summary for _frotz\n'
  assert_output_matches $'  _blorple  Summary for _blorple\n'
  assert_output_matches $'  _rezrov   Summary for _rezrov\n'

  # Note the padding is relative to only the plugin modules. Bats trims
  # the last newline of the output.
  assert_output_matches $'  _bar/_plugh  Summary for _bar/_plugh\n'
  assert_output_matches $'  _foo/_quux   Summary for _foo/_quux\n'
  assert_output_matches '  _foo/_xyzzy  Summary for _foo/_xyzzy$'

  # Since the 'lines' array doesn't contain blank lines, we only add '4' to
  # account for the 'From the...' line starting each class section.
  assert_equal "$((TOTAL_NUM_MODULES + 4))" "${#lines[@]}"
}

@test "$SUITE: summaries using glob, all modules" {
  run "$TEST_GO_SCRIPT" modules --summaries '*'
  assert_success

  # Note that there is no leading space, the padding is relative to the length
  # of the longest module name overall, and there are no separate sections
  # delimited by back-to-back newlines. Bats trims the final newline.
  get_first_and_last_core_module_summaries
  assert_output_matches "${CORE_MODULES[0]}  +$FIRST_CORE_MOD_SUMMARY"$'\n'
  assert_output_matches "$LAST_CORE_MODULE  +$LAST_CORE_MOD_SUMMARY"$'\n'
  assert_output_matches $'_frobozz     +Summary for _frobozz\n'
  assert_output_matches $'_frotz       +Summary for _frotz\n'
  assert_output_matches $'_blorple     +Summary for _blorple\n'
  assert_output_matches $'_rezrov      +Summary for _rezrov\n'
  assert_output_matches $'_bar/_plugh  +Summary for _bar/_plugh\n'
  assert_output_matches $'_foo/_quux   +Summary for _foo/_quux\n'
  assert_output_matches $'_foo/_xyzzy  +Summary for _foo/_xyzzy$'

  assert_equal "$TOTAL_NUM_MODULES" "${#lines[@]}"
}

@test "$SUITE: list only test modules" {
  run "$TEST_GO_SCRIPT" modules '_*'
  assert_success "${TEST_INTERNAL_MODULES[@]}" "${TEST_PUBLIC_MODULES[@]}" \
    "${TEST_PLUGIN_MODULES[@]}"
}

@test "$SUITE: list only test project modules" {
  run "$TEST_GO_SCRIPT" modules '_fr*' '_blor*' '_rezr*'
  assert_success "${TEST_INTERNAL_MODULES[@]}" "${TEST_PUBLIC_MODULES[@]}"
}

@test "$SUITE: list only modules in the _bar and _baz plugins" {
  run "$TEST_GO_SCRIPT" modules '_ba*/_*u*'
  local expected=('_bar/_plugh' '_bar/_quux' '_baz/_plugh' '_baz/_quux')
  assert_success "${expected[@]}"
}

@test "$SUITE: list test modules using multiple globs" {
  # Note that the modules are listed in the order of the globs, so the project
  # modules are listed before the plugin modules.
  run "$TEST_GO_SCRIPT" modules '_frob*' '_f*/_*u*' '_bar/'
  local expected=(
    '_frobozz'
    '_foo/_plugh'
    '_foo/_quux'
    '_bar/_plugh'
    '_bar/_quux'
    '_bar/_xyzzy'
  )
  assert_success "${expected[@]}"
}
