var fs = require('fs');
var path = require('path');

// branch naming only has a few excluded characters, see git-check-ref-format(1)
var REGEX_BRANCH = /^ref: refs\/heads\/([^?*\[\\~^:]+)$/;

module.exports = function detectLocalGit() {
  var dir = process.cwd(), gitDir;
  while (path.resolve('/') !== dir) {
    gitDir = path.join(dir, '.git');
    var existsSync = fs.existsSync || path.existsSync;
    if (existsSync(path.join(gitDir, 'HEAD')))
      break;

    dir = path.dirname(dir);
  }

  if (path.resolve('/') === dir)
    return;

  var head = fs.readFileSync(path.join(dir, '.git', 'HEAD'), 'utf-8').trim();
  var branch = (head.match(REGEX_BRANCH) || [])[1];
  if (!branch)
    return { git_commit: head };

  var commit = _parseCommitHashFromRef(dir, branch);

  return { git_commit: commit, git_branch: branch };
};

function _parseCommitHashFromRef(dir, branch) {
    var ref = path.join(dir, '.git', 'refs', 'heads', branch);
    if (fs.existsSync(ref)) {
        return fs.readFileSync(ref, 'utf-8').trim();
    } else {
        // ref does not exist; get it from packed-refs
        var commit = '';
        var packedRefs = path.join(dir, '.git', 'packed-refs');
        var packedRefsText = fs.readFileSync(packedRefs, 'utf-8');
        packedRefsText.split('\n').forEach(function (line) {
            if (line.match('refs/heads/'+branch)) {
                commit = line.split(' ')[0];
            }
        });
        return commit;
    }
}
