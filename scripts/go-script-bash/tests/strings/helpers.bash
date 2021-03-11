#! /bin/bash
#
# Helper functions for `lib/strings` tests

create_strings_test_script() {
  @go.create_test_go_script '. "$_GO_USE_MODULES" strings' "$@"
}
