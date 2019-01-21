// Generated automatically by nearley, version 2.11.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


function insensitive(sl) {
    var s = sl.literal;
    var result = [];
    for (var i=0; i<s.length; i++) {
        var c = s.charAt(i);
        if (c.toUpperCase() !== c || c.toLowerCase() !== c) {
            result.push(new RegExp("[" + c.toLowerCase() + c.toUpperCase() + "]"));
        } else {
            result.push({literal: c});
        }
    }
    return {subexpression: [{tokens: result, postprocess: function(d) {return d.join(""); }}]};
}

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "final", "symbols": ["whit?", "prog", "whit?"], "postprocess": function(d) { return d[1]; }},
    {"name": "prog", "symbols": ["prod"], "postprocess": function(d) { return [d[0]]; }},
    {"name": "prog", "symbols": ["prod", "whit", "prog"], "postprocess": function(d) { return [d[0]].concat(d[2]); }},
    {"name": "prod$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "prod$ebnf$1$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "prod$ebnf$1", "symbols": ["prod$ebnf$1$subexpression$1"]},
    {"name": "prod$ebnf$1$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "prod$ebnf$1$subexpression$2", "symbols": [{"literal":"="}]},
    {"name": "prod$ebnf$1", "symbols": ["prod$ebnf$1", "prod$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prod", "symbols": ["word", "whit?", "prod$ebnf$1", {"literal":">"}, "whit?", "expression+"], "postprocess": function(d) { return {name: d[0], rules: d[5]}; }},
    {"name": "prod$ebnf$2$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "prod$ebnf$2$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "prod$ebnf$2", "symbols": ["prod$ebnf$2$subexpression$1"]},
    {"name": "prod$ebnf$2$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "prod$ebnf$2$subexpression$2", "symbols": [{"literal":"="}]},
    {"name": "prod$ebnf$2", "symbols": ["prod$ebnf$2", "prod$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prod", "symbols": ["word", {"literal":"["}, "wordlist", {"literal":"]"}, "whit?", "prod$ebnf$2", {"literal":">"}, "whit?", "expression+"], "postprocess": function(d) {return {macro: d[0], args: d[2], exprs: d[8]}}},
    {"name": "prod", "symbols": [{"literal":"@"}, "whit?", "js"], "postprocess": function(d) { return {body: d[2]}; }},
    {"name": "prod", "symbols": [{"literal":"@"}, "word", "whit", "word"], "postprocess": function(d) { return {config: d[1], value: d[3]}; }},
    {"name": "prod$string$1", "symbols": [{"literal":"@"}, {"literal":"i"}, {"literal":"n"}, {"literal":"c"}, {"literal":"l"}, {"literal":"u"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "prod", "symbols": ["prod$string$1", "whit?", "string"], "postprocess": function(d) {return {include: d[2].literal, builtin: false}}},
    {"name": "prod$string$2", "symbols": [{"literal":"@"}, {"literal":"b"}, {"literal":"u"}, {"literal":"i"}, {"literal":"l"}, {"literal":"t"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "prod", "symbols": ["prod$string$2", "whit?", "string"], "postprocess": function(d) {return {include: d[2].literal, builtin: true }}},
    {"name": "expression+", "symbols": ["completeexpression"]},
    {"name": "expression+", "symbols": ["expression+", "whit?", {"literal":"|"}, "whit?", "completeexpression"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "expressionlist", "symbols": ["completeexpression"]},
    {"name": "expressionlist", "symbols": ["expressionlist", "whit?", {"literal":","}, "whit?", "completeexpression"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "wordlist", "symbols": ["word"]},
    {"name": "wordlist", "symbols": ["wordlist", "whit?", {"literal":","}, "whit?", "word"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "completeexpression", "symbols": ["expr"], "postprocess": function(d) { return {tokens: d[0]}; }},
    {"name": "completeexpression", "symbols": ["expr", "whit?", "js"], "postprocess": function(d) { return {tokens: d[0], postprocess: d[2]}; }},
    {"name": "expr_member", "symbols": ["word"], "postprocess": id},
    {"name": "expr_member", "symbols": [{"literal":"$"}, "word"], "postprocess": function(d) {return {mixin: d[1]}}},
    {"name": "expr_member", "symbols": ["word", {"literal":"["}, "expressionlist", {"literal":"]"}], "postprocess": function(d) {return {macrocall: d[0], args: d[2]}}},
    {"name": "expr_member$ebnf$1", "symbols": [{"literal":"i"}], "postprocess": id},
    {"name": "expr_member$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expr_member", "symbols": ["string", "expr_member$ebnf$1"], "postprocess": function(d) { if (d[1]) {return insensitive(d[0]); } else {return d[0]; } }},
    {"name": "expr_member", "symbols": [{"literal":"%"}, "word"], "postprocess": function(d) {return {token: d[1]}}},
    {"name": "expr_member", "symbols": ["charclass"], "postprocess": id},
    {"name": "expr_member", "symbols": [{"literal":"("}, "whit?", "expression+", "whit?", {"literal":")"}], "postprocess": function(d) {return {'subexpression': d[2]} ;}},
    {"name": "expr_member", "symbols": ["expr_member", "whit?", "ebnf_modifier"], "postprocess": function(d) {return {'ebnf': d[0], 'modifier': d[2]}; }},
    {"name": "ebnf_modifier$string$1", "symbols": [{"literal":":"}, {"literal":"+"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$1"], "postprocess": id},
    {"name": "ebnf_modifier$string$2", "symbols": [{"literal":":"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$2"], "postprocess": id},
    {"name": "ebnf_modifier$string$3", "symbols": [{"literal":":"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$3"], "postprocess": id},
    {"name": "expr", "symbols": ["expr_member"]},
    {"name": "expr", "symbols": ["expr", "whit", "expr_member"], "postprocess": function(d){ return d[0].concat([d[2]]); }},
    {"name": "word", "symbols": [/[\w\?\+]/], "postprocess": function(d){ return d[0]; }},
    {"name": "word", "symbols": ["word", /[\w\?\+]/], "postprocess": function(d){ return d[0]+d[1]; }},
    {"name": "string", "symbols": ["dqstring"], "postprocess": function(d) {return { literal: d[0] }; }},
    {"name": "charclass", "symbols": [{"literal":"."}], "postprocess": function(d) { return new RegExp("."); }},
    {"name": "charclass", "symbols": [{"literal":"["}, "charclassmembers", {"literal":"]"}], "postprocess": function(d) { return new RegExp("[" + d[1].join('') + "]"); }},
    {"name": "charclassmembers", "symbols": []},
    {"name": "charclassmembers", "symbols": ["charclassmembers", "charclassmember"], "postprocess": function(d) { return d[0].concat([d[1]]); }},
    {"name": "charclassmember", "symbols": [/[^\\\]]/], "postprocess": function(d) { return d[0]; }},
    {"name": "charclassmember", "symbols": [{"literal":"\\"}, /./], "postprocess": function(d) { return d[0] + d[1]; }},
    {"name": "js", "symbols": [{"literal":"{"}, {"literal":"%"}, "jscode", {"literal":"%"}, {"literal":"}"}], "postprocess": function(d) { return d[2]; }},
    {"name": "jscode", "symbols": [], "postprocess": function() {return "";}},
    {"name": "jscode", "symbols": ["jscode", /[^%]/], "postprocess": function(d) {return d[0] + d[1];}},
    {"name": "jscode", "symbols": ["jscode", {"literal":"%"}, /[^}]/], "postprocess": function(d) {return d[0] + d[1] + d[2]; }},
    {"name": "whit", "symbols": ["whitraw"]},
    {"name": "whit", "symbols": ["whitraw?", "comment", "whit?"]},
    {"name": "whit?", "symbols": []},
    {"name": "whit?", "symbols": ["whit"]},
    {"name": "whitraw", "symbols": [/[\s]/]},
    {"name": "whitraw", "symbols": ["whitraw", /[\s]/]},
    {"name": "whitraw?", "symbols": []},
    {"name": "whitraw?", "symbols": ["whitraw"]},
    {"name": "comment", "symbols": [{"literal":"#"}, "commentchars", {"literal":"\n"}]},
    {"name": "commentchars", "symbols": []},
    {"name": "commentchars", "symbols": ["commentchars", /[^\n]/]}
]
  , ParserStart: "final"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
