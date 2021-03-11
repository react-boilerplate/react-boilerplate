#! /bin/bash
#
# Helper functions for `./go modules` tests.

CORE_MODULES=()
CORE_MODULES_PATHS=()

TEST_INTERNAL_MODULES=('_frobozz' '_frotz')
TEST_INTERNAL_MODULES_PATHS=()

TEST_PUBLIC_MODULES=('_blorple' '_rezrov')
TEST_PUBLIC_MODULES_PATHS=()

# We start all the test plugin and module names with '_' to avoid collisions
# with any potential module names added to the core framework.
TEST_PLUGINS=('_bar' '_baz' '_foo')
TEST_PLUGIN_MODULES=(_{bar,baz,foo}/_{plugh,quux,xyzzy})
TEST_PLUGIN_MODULES_PATHS=()

TOTAL_NUM_MODULES=0

setup_test_modules() {
  set "$DISABLE_BATS_SHELL_OPTIONS"
  __setup_test_modules
  restore_bats_shell_options "$?"
}

__setup_test_modules() {
  local module
  local module_file

  for module in "$_GO_ROOTDIR"/lib/*; do
    if [[ -f "$module" ]]; then
      CORE_MODULES_PATHS+=("$module")
      CORE_MODULES+=("${module#$_GO_ROOTDIR/lib/}")
      ((++TOTAL_NUM_MODULES))
    fi
  done

  for module in "${TEST_INTERNAL_MODULES[@]}"; do
    module_file="$TEST_GO_SCRIPTS_DIR/lib/$module"
    mkdir -p "${module_file%/*}"
    printf '# Summary for %s\n' "$module" > "$module_file"
    TEST_INTERNAL_MODULES_PATHS+=("${module_file#$TEST_GO_ROOTDIR/}")
    ((++TOTAL_NUM_MODULES))
  done

  for module in "${TEST_PUBLIC_MODULES[@]}"; do
    module_file="$TEST_GO_ROOTDIR/lib/$module"
    mkdir -p "${module_file%/*}"
    printf '# Summary for %s\n' "$module" > "$module_file"
    TEST_PUBLIC_MODULES_PATHS+=("${module_file#$TEST_GO_ROOTDIR/}")
    ((++TOTAL_NUM_MODULES))
  done

  for module in "${TEST_PLUGIN_MODULES[@]}"; do
    module_file="$TEST_GO_PLUGINS_DIR/${module/\///lib/}"
    mkdir -p "${module_file%/*}"
    printf '# Summary for %s\n' "$module" > "$module_file"
    TEST_PLUGIN_MODULES_PATHS+=("${module_file#$TEST_GO_ROOTDIR/}")
    ((++TOTAL_NUM_MODULES))
  done
}
