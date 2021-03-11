. "$_GO_CORE_DIR/lib/testing/environment"
. "$_GO_CORE_DIR/lib/bats/assertions"

set_bats_test_suite_name "${BASH_SOURCE[0]%/*}"
remove_bats_test_dirs
