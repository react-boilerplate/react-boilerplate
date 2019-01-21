'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRaw = {
    colon: ': ',
    indent: '  ',
    commentLeft: ' ',
    commentRight: ' '
};

var Stringifier = function () {
    function Stringifier(builder) {
        _classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    Stringifier.prototype.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
    };

    Stringifier.prototype.root = function root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
    };

    Stringifier.prototype.comment = function comment(node) {
        var left = defaultRaw.commentLeft;
        var right = defaultRaw.commentRight;
        if (this.has(node.raws.left)) left = node.raws.left;

        if (node.raws.inline) {
            if (this.has(node.raws.inlineRight)) {
                right = node.raws.inlineRight;
            } else {
                right = '';
            }
            if (node.raws.extraIndent) {
                this.builder(node.raws.extraIndent);
            }
            this.builder('//' + left + node.text + right, node);
        } else {
            if (this.has(node.raws.right)) right = node.raws.right;
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    };

    Stringifier.prototype.decl = function decl(node) {
        var between = node.raws.between || defaultRaw.colon;
        var string = node.prop + between + this.rawValue(node, 'value');

        if (node.important) {
            string += node.raws.important || ' !important';
        }

        this.builder(string, node);
    };

    Stringifier.prototype.rule = function rule(node) {
        this.block(node, this.rawValue(node, 'selector'));
    };

    Stringifier.prototype.atrule = function atrule(node) {
        var name = '@' + node.name;
        var params = node.params ? this.rawValue(node, 'params') : '';

        if (this.has(node.raws.afterName)) {
            name += node.raws.afterName;
        } else if (params) {
            name += ' ';
        }

        this.block(node, name + params);
    };

    Stringifier.prototype.body = function body(node) {
        var indent = node.root().raws.indent || defaultRaw.indent;

        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            var before = child.raws.before.replace(/[^\n]*$/, '') + this.indent(node, indent);
            if (child.type === 'comment' && child.raws.before.indexOf('\n') === -1) {
                before = child.raws.before;
            }
            if (before) this.builder(before);
            this.stringify(child);
        }
    };

    Stringifier.prototype.block = function block(node, start) {
        var between = node.raws.sssBetween || '';
        this.builder(start + between, node, 'start');
        if (this.has(node.nodes)) this.body(node);
    };

    Stringifier.prototype.indent = function indent(node, step) {
        var result = '';
        while (node.parent) {
            result += step;
            node = node.parent;
        }
        return result;
    };

    Stringifier.prototype.has = function has(value) {
        return typeof value !== 'undefined';
    };

    Stringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.sss || raw.raw;
        } else {
            return value;
        }
    };

    return Stringifier;
}();

exports.default = Stringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJkZWZhdWx0UmF3IiwiY29sb24iLCJpbmRlbnQiLCJjb21tZW50TGVmdCIsImNvbW1lbnRSaWdodCIsIlN0cmluZ2lmaWVyIiwiYnVpbGRlciIsInN0cmluZ2lmeSIsIm5vZGUiLCJzZW1pY29sb24iLCJ0eXBlIiwicm9vdCIsImJvZHkiLCJyYXdzIiwiYWZ0ZXIiLCJjb21tZW50IiwibGVmdCIsInJpZ2h0IiwiaGFzIiwiaW5saW5lIiwiaW5saW5lUmlnaHQiLCJleHRyYUluZGVudCIsInRleHQiLCJkZWNsIiwiYmV0d2VlbiIsInN0cmluZyIsInByb3AiLCJyYXdWYWx1ZSIsImltcG9ydGFudCIsInJ1bGUiLCJibG9jayIsImF0cnVsZSIsIm5hbWUiLCJwYXJhbXMiLCJhZnRlck5hbWUiLCJpIiwibm9kZXMiLCJsZW5ndGgiLCJjaGlsZCIsImJlZm9yZSIsInJlcGxhY2UiLCJpbmRleE9mIiwic3RhcnQiLCJzc3NCZXR3ZWVuIiwic3RlcCIsInJlc3VsdCIsInBhcmVudCIsInZhbHVlIiwicmF3Iiwic3NzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxhQUFhO0FBQ2ZDLFdBQWMsSUFEQztBQUVmQyxZQUFjLElBRkM7QUFHZkMsaUJBQWMsR0FIQztBQUlmQyxrQkFBYztBQUpDLENBQW5COztJQU9xQkMsVztBQUVqQix5QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDSDs7MEJBRURDLFMsc0JBQVVDLEksRUFBTUMsUyxFQUFXO0FBQ3ZCLGFBQUtELEtBQUtFLElBQVYsRUFBZ0JGLElBQWhCLEVBQXNCQyxTQUF0QjtBQUNILEs7OzBCQUVERSxJLGlCQUFLSCxJLEVBQU07QUFDUCxhQUFLSSxJQUFMLENBQVVKLElBQVY7QUFDQSxZQUFLQSxLQUFLSyxJQUFMLENBQVVDLEtBQWYsRUFBdUIsS0FBS1IsT0FBTCxDQUFhRSxLQUFLSyxJQUFMLENBQVVD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QUFDQSxZQUFLc0IsT0FBT0EsSUFBSUQsS0FBSixLQUFjQSxLQUExQixFQUFrQztBQUM5QixtQkFBT0MsSUFBSUMsR0FBSixJQUFXRCxJQUFJQSxHQUF0QjtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPRCxLQUFQO0FBQ0g7QUFDSixLOzs7OztrQkEzR2dCMUMsVyIsImZpbGUiOiJzdHJpbmdpZmllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRlZmF1bHRSYXcgPSB7XG4gICAgY29sb246ICAgICAgICAnOiAnLFxuICAgIGluZGVudDogICAgICAgJyAgJyxcbiAgICBjb21tZW50TGVmdDogICcgJyxcbiAgICBjb21tZW50UmlnaHQ6ICcgJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5naWZpZXIge1xuXG4gICAgY29uc3RydWN0b3IoYnVpbGRlcikge1xuICAgICAgICB0aGlzLmJ1aWxkZXIgPSBidWlsZGVyO1xuICAgIH1cblxuICAgIHN0cmluZ2lmeShub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIHNlbWljb2xvbik7XG4gICAgfVxuXG4gICAgcm9vdChub2RlKSB7XG4gICAgICAgIHRoaXMuYm9keShub2RlKTtcbiAgICAgICAgaWYgKCBub2RlLnJhd3MuYWZ0ZXIgKSB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLmFmdGVyKTtcbiAgICB9XG5cbiAgICBjb21tZW50KG5vZGUpIHtcbiAgICAgICAgbGV0IGxlZnQgID0gZGVmYXVsdFJhdy5jb21tZW50TGVmdDtcbiAgICAgICAgbGV0IHJpZ2h0ID0gZGVmYXVsdFJhdy5jb21tZW50UmlnaHQ7XG4gICAgICAgIGlmICggdGhpcy5oYXMobm9kZS5yYXdzLmxlZnQpICkgbGVmdCA9IG5vZGUucmF3cy5sZWZ0O1xuXG4gICAgICAgIGlmICggbm9kZS5yYXdzLmlubGluZSApIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5oYXMobm9kZS5yYXdzLmlubGluZVJpZ2h0KSApIHtcbiAgICAgICAgICAgICAgICByaWdodCA9IG5vZGUucmF3cy5pbmxpbmVSaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmlnaHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggbm9kZS5yYXdzLmV4dHJhSW5kZW50ICkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRlcihub2RlLnJhd3MuZXh0cmFJbmRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5idWlsZGVyKCcvLycgKyBsZWZ0ICsgbm9kZS50ZXh0ICsgcmlnaHQsIG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCB0aGlzLmhhcyhub2RlLnJhd3MucmlnaHQpICkgcmlnaHQgPSBub2RlLnJhd3MucmlnaHQ7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjbChub2RlKSB7XG4gICAgICAgIGxldCBiZXR3ZWVuID0gbm9kZS5yYXdzLmJldHdlZW4gfHwgZGVmYXVsdFJhdy5jb2xvbjtcbiAgICAgICAgbGV0IHN0cmluZyAgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKTtcblxuICAgICAgICBpZiAoIG5vZGUuaW1wb3J0YW50ICkge1xuICAgICAgICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVpbGRlcihzdHJpbmcsIG5vZGUpO1xuICAgIH1cblxuICAgIHJ1bGUobm9kZSkge1xuICAgICAgICB0aGlzLmJsb2NrKG5vZGUsIHRoaXMucmF3VmFsdWUobm9kZSwgJ3NlbGVjdG9yJykpO1xuICAgIH1cblxuICAgIGF0cnVsZShub2RlKSB7XG4gICAgICAgIGxldCBuYW1lICAgPSAnQCcgKyBub2RlLm5hbWU7XG4gICAgICAgIGxldCBwYXJhbXMgPSBub2RlLnBhcmFtcyA/IHRoaXMucmF3VmFsdWUobm9kZSwgJ3BhcmFtcycpIDogJyc7XG5cbiAgICAgICAgaWYgKCB0aGlzLmhhcyhub2RlLnJhd3MuYWZ0ZXJOYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICggcGFyYW1zICkge1xuICAgICAgICAgICAgbmFtZSArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpO1xuICAgIH1cblxuICAgIGJvZHkobm9kZSkge1xuICAgICAgICBsZXQgaW5kZW50ID0gbm9kZS5yb290KCkucmF3cy5pbmRlbnQgfHwgZGVmYXVsdFJhdy5pbmRlbnQ7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCAgPSBub2RlLm5vZGVzW2ldO1xuICAgICAgICAgICAgbGV0IGJlZm9yZSA9IGNoaWxkLnJhd3MuYmVmb3JlLnJlcGxhY2UoL1teXFxuXSokLywgJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGVudChub2RlLCBpbmRlbnQpO1xuICAgICAgICAgICAgaWYgKCBjaGlsZC50eXBlID09PSAnY29tbWVudCcgJiZcbiAgICAgICAgICAgICAgICAgY2hpbGQucmF3cy5iZWZvcmUuaW5kZXhPZignXFxuJykgPT09IC0xICkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IGNoaWxkLnJhd3MuYmVmb3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCBiZWZvcmUgKSB0aGlzLmJ1aWxkZXIoYmVmb3JlKTtcbiAgICAgICAgICAgIHRoaXMuc3RyaW5naWZ5KGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJsb2NrKG5vZGUsIHN0YXJ0KSB7XG4gICAgICAgIGxldCBiZXR3ZWVuID0gbm9kZS5yYXdzLnNzc0JldHdlZW4gfHwgJyc7XG4gICAgICAgIHRoaXMuYnVpbGRlcihzdGFydCArIGJldHdlZW4sIG5vZGUsICdzdGFydCcpO1xuICAgICAgICBpZiAoIHRoaXMuaGFzKG5vZGUubm9kZXMpICkgdGhpcy5ib2R5KG5vZGUpO1xuICAgIH1cblxuICAgIGluZGVudChub2RlLCBzdGVwKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgd2hpbGUgKCBub2RlLnBhcmVudCApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdGVwO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaGFzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIHJhd1ZhbHVlKG5vZGUsIHByb3ApIHtcbiAgICAgICAgbGV0IHZhbHVlID0gbm9kZVtwcm9wXTtcbiAgICAgICAgbGV0IHJhdyAgID0gbm9kZS5yYXdzW3Byb3BdO1xuICAgICAgICBpZiAoIHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIHJhdy5zc3MgfHwgcmF3LnJhdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19