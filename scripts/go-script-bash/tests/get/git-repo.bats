#! /usr/bin/env bats

load ../environment

setup() {
  test_filter
  @go.create_test_go_script '@go "$@"'
}

teardown() {
  @go.remove_test_go_rootdir
}

@test "$SUITE: show help if not exactly three args" {
  run test-go get git-repo
  assert_failure
  assert_output_matches "^test-go get git-repo - Creates a shallow clone"
}

@test "$SUITE: tab completion" {
  run "$TEST_GO_SCRIPT" get git-repo --complete 0
  assert_success ''

  run "$TEST_GO_SCRIPT" get git-repo --complete 1
  assert_success ''

  local expected=()
  @go.test_compgen expected -f -- "$TEST_GO_ROOTDIR/"

  run "$TEST_GO_SCRIPT" get git-repo --complete 2
  assert_success "${expected[@]#$TEST_GO_ROOTDIR/}"
}

@test "$SUITE: fail if git not installed" {
  PATH= run "$BASH" "$TEST_GO_SCRIPT" get git-repo foobar.git v1.0.0 foo/bar
  assert_failure 'Please install git before running "get git-repo".'
}

@test "$SUITE: fail if target directory already exists" {
  stub_program_in_path 'git' 'echo Should not see this!' 'exit 1'
  mkdir -p "$TEST_GO_ROOTDIR/foo/bar"
  run "$TEST_GO_SCRIPT" get git-repo foobar.git v1.0.0 foo/bar
  assert_failure '"foo/bar" already exists; not updating.'
}

@test "$SUITE: git called with the correct arguments" {
  stub_program_in_path 'git' 'printf "%s\n" "$*"'
  run "$TEST_GO_SCRIPT" get git-repo foobar.git v1.0.0 foo/bar

  local expected=('clone -q -c advice.detachedHead=false --depth 1'
    '-b v1.0.0 foobar.git foo/bar')
  assert_success "${expected[*]}" \
    'Successfully cloned "foobar.git" reference "v1.0.0" into "foo/bar".'
}

@test "$SUITE: git fails to clone the repo" {
  stub_program_in_path 'git' 'exit 1'
  run "$TEST_GO_SCRIPT" get git-repo foobar.git v1.0.0 foo/bar

  local expected=('Failed to clone "foobar.git" reference "v1.0.0"'
    'into "foo/bar".')
  assert_failure "${expected[*]}"
}

@test "$SUITE: use the real git to create and clone a repo" {
  skip_if_system_missing git

  mkdir -p "$TEST_GO_ROOTDIR/test-repo"
  cd "$TEST_GO_ROOTDIR/test-repo"
  git init
  git config user.email 'mbland@example.com'
  git config user.name 'Mike Bland'
  git config commit.gpgsign false
  printf '# This is a test\n' >README.md
  git add README.md
  git commit -m 'Initial commit'
  printf 'Hello, World!\n' >hello.txt
  git add hello.txt
  git commit -m 'Add hello.txt'
  printf 'Goodbye, World!\n' >goodbye.txt
  git add goodbye.txt
  git commit -m 'Add goodbye.txt' goodbye.txt
  git tag v1.0.0

  local last_commit_log="$(git log --oneline -n 1)"

  cd "$TEST_GO_ROOTDIR"
  run "$TEST_GO_SCRIPT" get git-repo "$TEST_GO_ROOTDIR/test-repo" \
    'v1.0.0' 'test-clone'

  # Note that we add a `file://` prefix to local repositories.
  local expected=("Successfully cloned \"file://$TEST_GO_ROOTDIR/test-repo\""
    "reference \"v1.0.0\" into \"test-clone\".")
  assert_success "${expected[*]}"

  [ -d "$TEST_GO_ROOTDIR/test-clone/.git" ]
  cd "$TEST_GO_ROOTDIR/test-clone"

  run git log --oneline
  assert_success "$last_commit_log"
}
