(self.webpackChunkfiles_texteditor=self.webpackChunkfiles_texteditor||[]).push([[342],{1183:function(){ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var i=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};i.inherits(o,r),o.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o})),ace.define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var i=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,a=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"abstract|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|partial|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic","constant.language":"null|true|false"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/},{token:"string",start:'"',end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"string",start:'@"',end:'"',next:[{token:"constant.language.escape",regex:'""'}]},{token:"string",start:/\$"/,end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?$)|{{/},{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"keyword",regex:"^\\s*#(if|else|elif|endif|define|undef|warning|error|line|region|endregion|pragma)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.embedRules(r,"doc-",[r.getEndRule("start")]),this.normalizeRules()};i.inherits(a,o),t.CSharpHighlightRules=a})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){"use strict";var i=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,o=e.findMatchingBracket({row:t,column:r});if(!o||o.row==t)return 0;var a=this.$getIndent(e.getLine(o.row));e.replace(new i(t,0,t,r-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,n){"use strict";var i=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,a=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(a,o),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(i)?"start":r},this.getFoldWidgetRange=function(e,t,n,i){var r,o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);if(r=o.match(this.foldingStartMarker)){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,a);var s=e.getCommentFoldRange(n,a+r[0].length,1);return s&&!s.isMultiLine()&&(i?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}return"markbegin"!==t&&(r=o.match(this.foldingStopMarker))?(a=r.index+r[0].length,r[1]?this.closingBracketBlock(e,r[1],n,a):e.getCommentFoldRange(n,a,-1)):void 0},this.getSectionRange=function(e,t){for(var n=e.getLine(t),i=n.search(/\S/),o=t,a=n.length,s=t+=1,g=e.getLength();++t<g;){var c=(n=e.getLine(t)).search(/\S/);if(-1!==c){if(i>c)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=o)break;if(l.isMultiLine())t=l.end.row;else if(i==c)break}s=t}}return new r(o,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),o=e.getLength(),a=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,g=1;++n<o;){t=e.getLine(n);var c=s.exec(t);if(c&&(c[1]?g--:g++,!g))break}if(n>a)return new r(a,i,n,t.length)}}.call(a.prototype)})),ace.define("ace/mode/folding/csharp",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/cstyle"],(function(e,t,n){"use strict";var i=e("../../lib/oop"),r=e("../../range").Range,o=e("./cstyle").FoldMode,a=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(a,o),function(){this.usingRe=/^\s*using \S/,this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=this.getFoldWidgetBase(e,t,n);if(!i){var r=e.getLine(n);if(/^\s*#region\b/.test(r))return"start";var o=this.usingRe;if(o.test(r)){var a=e.getLine(n-1),s=e.getLine(n+1);if(!o.test(a)&&o.test(s))return"start"}}return i},this.getFoldWidgetRange=function(e,t,n){var i=this.getFoldWidgetRangeBase(e,t,n);if(i)return i;var r=e.getLine(n);return this.usingRe.test(r)?this.getUsingStatementBlock(e,r,n):/^\s*#region\b/.test(r)?this.getRegionBlock(e,r,n):void 0},this.getUsingStatementBlock=function(e,t,n){for(var i=t.match(this.usingRe)[0].length-1,o=e.getLength(),a=n,s=n;++n<o;)if(t=e.getLine(n),!/^\s*$/.test(t)){if(!this.usingRe.test(t))break;s=n}if(s>a){var g=e.getLine(s).length;return new r(a,i,s,g)}},this.getRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),o=e.getLength(),a=n,s=/^\s*#(end)?region\b/,g=1;++n<o;){t=e.getLine(n);var c=s.exec(t);if(c&&(c[1]?g--:g++,!g))break}if(n>a)return new r(a,i,n,t.length)}}.call(a.prototype)})),ace.define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/csharp"],(function(e,t,n){"use strict";var i=e("../lib/oop"),r=e("./text").Mode,o=e("./csharp_highlight_rules").CSharpHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./behaviour/cstyle").CstyleBehaviour,g=e("./folding/csharp").FoldMode,c=function(){this.HighlightRules=o,this.$outdent=new a,this.$behaviour=new s,this.foldingRules=new g};i.inherits(c,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e).tokens;return r.length&&"comment"==r[r.length-1].type||"start"==e&&t.match(/^.*[\{\(\[]\s*$/)&&(i+=n),i},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){return null},this.$id="ace/mode/csharp"}.call(c.prototype),t.Mode=c}))}}]);
//# sourceMappingURL=cs-mode.bundle.js.map