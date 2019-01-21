require("should");
var fs = require("fs");
exec = require("child_process").exec;
test_folder = process.cwd() + "/test/test-dir";

asyncCatch = function(done, test){
    return function(err, value){
        if(err){
            done(err);
        }
        else{
            try{
                test(value);
                done();
            }
            catch(err){
                done(err);
            }
        }
    }
}

cleanUp = function(callback) {
    exec("rm -rf '" + test_folder + "'", function(err, stderr, stdout) {
        if (err || stderr) {
            callback(err || new Error(stderr));
        } else {
            callback(null, stdout);
        }
    });
}

setup = function(callback) {
    cleanUp(function(err) {
        if (err) {
            callback(err);
        } else {
            exec("mkdir '" + test_folder + "'", function(err, stdout, stderr) {
                if (err || stderr) {
                    callback(err || new Error(stderr));
                } else {
                    callback(null, stdout);
                }
            });
        }
    });
}

newSGF = function() {
    delete require.cache[require.resolve('../')];

    var sgf = require("../");
    sgf.cwd = test_folder
    return sgf;
}

run = function(command, callback) {
    exec("cd '" + test_folder + "' && " + command, callback);
}

newGit = function(callback) {
    run("rm -rf .git && git init", callback);
}

randomFileName = function(lengths) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var filename = randomString(possible, lengths[0]);
    for (var i = 1; i < lengths.length; i++) {
        filename += "." + randomString(possible, lengths[i]);
    }
    return filename;
}

var randomFileContent = function(length) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \t\n,.;'[](){}\":?><";
    return randomString(possible, length);
}

var randomString = function(possible, length) {
    var text = "";

    while (length--) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

moveFile = function(opts, callback) {
    var oldPath = test_folder + "/" + opts.oldFileName;
    var newPath = test_folder + "/" + opts.newFileName;

    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            callback(err);
        } else {
            run("git add " + opts.oldFileName + " " + opts.newFileName, function(err, stdout, stderr) {
                if (err || stderr) {
                    callback(err || new Error(stderr));
                } else {
                    callback(null, opts);
                }
            });
        }
    });
}

newFile = function(opts, callback) {

    if (typeof opts == "function") {
        callback = opts;
        opts = {};
    }

    opts.filename = opts.filename || randomFileName([8, 3]);
    opts.content = opts.content || randomFileContent(10000);

    fs.writeFile(test_folder + "/" + opts.filename, opts.content, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, opts);
        }
    });
}

addFile = function(opts, callback) {
    if (typeof opts == "function") {
        callback = opts;
        opts = {};
    }

    newFile(opts, function(err, opts) {
        if (err) {
            callback(err);
        } else {
            run("git add " + opts.filename, function(err, stdout, stderr) {
                if (err || stderr) {
                    callback(err || new Error(stderr));
                } else {
                    callback(null, opts);
                }
            });
        }
    });
}

addFiles = function(number, callback){
    var files = [];
    

    var runner = function(err, data){
        if(err){
            callback(err);
        }
        else{
            files.push(data);
            if(files.length==number){
                callback(null, files);
            }
            else{
                addFile(runner);
            }
        }
    }

    addFile(runner);
}

addAndCommitFile = function(opts, callback) {

    if (typeof opts == "function") {
        callback = opts;
        opts = {};
    }


    addFile(opts, function(err, opts) {
        if (err) {
            callback(err);
        } else {
            run("git commit -m 'adding " + opts.filename + "'", function(err, stdout, stderr) {
                if (err || stderr) {
                    callback(err || new Error(stderr));
                } else {
                    callback(null, opts);
                }

            });
        }
    });
}
