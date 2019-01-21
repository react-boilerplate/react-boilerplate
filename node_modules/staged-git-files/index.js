var spawn = require("child_process").spawn;
var fs = require("fs");

var sgf = function(filter, callback) {

    if (typeof filter == "function") {
        callback = filter;
        filter = "ACDMRTUXB";
    }

    sgf.getHead(function(err, head) {
        if (err) {
            callback(err);
        } else {
            var command = "git -c core.quotepath=false diff-index --cached --name-status";

            if (filter.indexOf('R') !== -1) {
                command += " -M";
            }

            command += " --diff-filter=" + filter + " " + head;

            run(command, function(err, stdout, stderr) {
                if (err || stderr) {
                    callback(err || new Error(stderr));
                } else {
                    callback(null, stdoutToResultsObject(stdout));
                }
            });
        }
    });
}

sgf.cwd = process.cwd();
sgf.debug = false;
sgf.includeContent = false;

sgf.firstHead = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

sgf.getHead = function(callback) {
    run("git rev-parse --verify HEAD", function(err, stdout, stderr) {
        if (err && err.message.indexOf("fatal: Needed a single revision")!==-1) {
            callback(null, sgf.firstHead);
        } else if (err || stderr) {
            callback(err || new Error("STDERR: " + stderr));
        } else {
            stdout = stdout.replace("\n", "");
            callback(null, stdout);
        }
    });
}

sgf.readFile = function(filename, options, callback) {
    fs.readFile(sgf.cwd + "/" + filename, options, callback);
}


module.exports = sgf;

/** ======================================== HELPERS ======================================== **/

var run = function(command, callback) {
    if (sgf.debug) {
        console.log("RUNNING: " + command);
    }
    
    var bits = command.split(" ");
    var args = bits.slice(1);

    var cmd = spawn(bits[0], args, {
        cwd: module.exports.cwd
    });

    var stdout = "";
    var stderr = "";

    cmd.stdout.on('data', function(data){
        stdout+=data.toString();
    });

    cmd.stderr.on('data', function(data){
        stderr+=data.toString();
    });

    cmd.on("close", function(code){
        var err = null;

        if(code!==0){
            err = new Error(stderr);
        }
        
        callback(err,stdout,stderr);
    });
}

var codeToStatus = function(code) {
    /* =======================================================================================================
    ** PER docs at https://git-scm.com/docs/git-diff-index
    ** Possible status letters are:
    **   A: addition of a file
    **   C: copy of a file into a new one
    **   D: deletion of a file
    **   M: modification of the contents or mode of a file
    **   R: renaming of a file
    **   T: change in the type of the file
    **   U: file is unmerged (you must complete the merge before it can be committed)
    **   X: "unknown" change type (most probably a bug, please report it)
    **
    ** Status letters C and R are always followed by a score
    ** (denoting the percentage of similarity between the source and target of the move or copy).
    ** Status letter M may be followed by a score (denoting the percentage of dissimilarity) for file rewrites.
    ** ======================================================================================================= */

    var map = {
        "A": "Added",
        "C": "Copied",
        "D": "Deleted",
        "M": "Modified",
        "R": "Renamed",
        "T": "Type-Change",
        "U": "Unmerged",
        "X": "Unknown",
        "B": "Broken"
    }

    return map[code.charAt(0)];
}

var stdoutToResultsObject = function(stdout) {
    var results = [];
    var lines = stdout.split("\n");
    var iLines = lines.length;
    var files_with_errors = 0;
    while (iLines--) {
        var line = lines[iLines];
        if (line != "") {
            var parts = line.split("\t");
            var result = {
                filename: parts[2] || parts[1],
                status: codeToStatus(parts[0])
            }

            if (sgf.includeContent) {
                try {
                    result.content = fs.readFileSync(sgf.cwd + "/" + result.filename, {
                        encoding: "utf8"
                    });
                } catch (err) {
                    result.err = err;
                }
            }

            results.push(result);
        }
    }
    return results;
}
