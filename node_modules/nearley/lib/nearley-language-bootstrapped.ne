# nearley grammar
@builtin "string.ne"

@{%

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

%}

final -> whit? prog whit?  {% function(d) { return d[1]; } %}

prog -> prod  {% function(d) { return [d[0]]; } %}
      | prod whit prog  {% function(d) { return [d[0]].concat(d[2]); } %}

prod -> word whit? ("-"|"="):+ ">" whit? expression+  {% function(d) { return {name: d[0], rules: d[5]}; } %}
      | word "[" wordlist "]" whit? ("-"|"="):+ ">" whit? expression+ {% function(d) {return {macro: d[0], args: d[2], exprs: d[8]}} %}
      | "@" whit? js  {% function(d) { return {body: d[2]}; } %}
      | "@" word whit word  {% function(d) { return {config: d[1], value: d[3]}; } %}
      | "@include"  whit? string {% function(d) {return {include: d[2].literal, builtin: false}} %}
      | "@builtin"  whit? string {% function(d) {return {include: d[2].literal, builtin: true }} %}

expression+ -> completeexpression
             | expression+ whit? "|" whit? completeexpression  {% function(d) { return d[0].concat([d[4]]); } %}

expressionlist -> completeexpression
             | expressionlist whit? "," whit? completeexpression {% function(d) { return d[0].concat([d[4]]); } %}

wordlist -> word
            | wordlist whit? "," whit? word {% function(d) { return d[0].concat([d[4]]); } %}

completeexpression -> expr  {% function(d) { return {tokens: d[0]}; } %}
                    | expr whit? js  {% function(d) { return {tokens: d[0], postprocess: d[2]}; } %}

expr_member ->
      word {% id %}
    | "$" word {% function(d) {return {mixin: d[1]}} %}
    | word "[" expressionlist "]" {% function(d) {return {macrocall: d[0], args: d[2]}} %} 
    | string "i":? {% function(d) { if (d[1]) {return insensitive(d[0]); } else {return d[0]; } } %}
    | "%" word {% function(d) {return {token: d[1]}} %}
    | charclass {% id %}
    | "(" whit? expression+ whit? ")" {% function(d) {return {'subexpression': d[2]} ;} %}
    | expr_member whit? ebnf_modifier {% function(d) {return {'ebnf': d[0], 'modifier': d[2]}; } %}

ebnf_modifier -> ":+" {% id %} | ":*" {% id %} | ":?" {% id %}

expr -> expr_member
      | expr whit expr_member  {% function(d){ return d[0].concat([d[2]]); } %}

word -> [\w\?\+]  {% function(d){ return d[0]; } %}
      | word [\w\?\+]  {% function(d){ return d[0]+d[1]; } %}

string -> dqstring {% function(d) {return { literal: d[0] }; } %}
#string -> "\"" charset "\""  {% function(d) { return { literal: d[1].join("") }; } %}
#
#charset -> null
#         | charset char  {% function(d) { return d[0].concat([d[1]]); } %}
#
#char -> [^\\"]  {% function(d) { return d[0]; } %}
#      | "\\" .  {% function(d) { return JSON.parse("\""+"\\"+d[1]+"\""); } %}

charclass -> "."  {% function(d) { return new RegExp("."); } %}
           | "[" charclassmembers "]"  {% function(d) { return new RegExp("[" + d[1].join('') + "]"); } %}

charclassmembers -> null
                  | charclassmembers charclassmember  {% function(d) { return d[0].concat([d[1]]); } %}

charclassmember -> [^\\\]]  {% function(d) { return d[0]; } %}
                 | "\\" .  {% function(d) { return d[0] + d[1]; } %}

js -> "{" "%" jscode "%" "}"  {% function(d) { return d[2]; } %}

jscode -> null  {% function() {return "";} %}
        | jscode [^%]  {% function(d) {return d[0] + d[1];} %}
        | jscode "%" [^}] {% function(d) {return d[0] + d[1] + d[2]; } %}

# Whitespace with a comment
whit -> whitraw
      | whitraw? comment whit?

# Optional whitespace with a comment
whit? -> null
       | whit

# Literally a string of whitespace
whitraw -> [\s]
         | whitraw [\s]

# A string of whitespace OR the empty string
whitraw? -> null
          | whitraw

comment -> "#" commentchars "\n"
commentchars -> null
              | commentchars [^\n]
