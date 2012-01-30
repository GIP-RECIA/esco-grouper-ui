(function(B){if(typeof window.hotkeys=="undefined"){throw"jsTree hotkeys: jQuery hotkeys plugin not included."
}B.extend(B.tree.plugins,{hotkeys:{bound:[],disabled:false,defaults:{hover_mode:true,functions:{up:function(){B.tree.plugins.hotkeys.get_prev.apply(this);
return false
},down:function(){B.tree.plugins.hotkeys.get_next.apply(this);
return false
},left:function(){B.tree.plugins.hotkeys.get_left.apply(this);
return false
},right:function(){B.tree.plugins.hotkeys.get_right.apply(this);
return false
},"return":function(){tree.select_branch(tree.hovered);
return false
},f2:function(){return false
},del:function(){return false
},"ctrl+c":function(){return false
},"ctrl+x":function(){return false
},"ctrl+v":function(){return false
}}},exec:function(F){if(B.tree.plugins.hotkeys.disabled){return false
}var A=B.tree.focused();
if(typeof A.settings.plugins.hotkeys=="undefined"){return 
}var E=B.extend(true,{},B.tree.plugins.hotkeys.defaults,A.settings.plugins.hotkeys);
if(typeof E.functions[F]=="function"){return E.functions[F].apply(A)
}},get_next:function(){tree.selected=B(".clicked").parent("li");
var D=B.extend(true,{},B.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var A=this.hovered||this.selected;
return D.hover_mode?this.hover_branch(this.next(A)):this.select_branch(this.next(A))
},get_prev:function(){tree.selected=B(".clicked").parent("li");
var D=B.extend(true,{},B.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var A=this.hovered||this.selected;
return D.hover_mode?this.hover_branch(this.prev(A)):this.select_branch(this.prev(A))
},get_left:function(){tree.selected=B(".clicked").parent("li");
var D=B.extend(true,{},B.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var A=this.hovered||this.selected;
if(A){if(A.hasClass("open")){this.close_branch(A)
}else{return D.hover_mode?this.hover_branch(this.parent(A)):this.select_branch(this.parent(A))
}}},get_right:function(){tree.selected=B(".clicked").parent("li");
var D=B.extend(true,{},B.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var A=this.hovered||this.selected;
if(A){if(A.hasClass("closed")){this.open_branch(A)
}else{return D.hover_mode?this.hover_branch(A.find("li:eq(0)")):this.select_branch(A.find("li:eq(0)"))
}}},callbacks:{oninit:function(F){var E=B.extend(true,{},B.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
for(var A in E.functions){if(E.functions.hasOwnProperty(A)&&B.inArray(A,B.tree.plugins.hotkeys.bound)==-1){(function(C){B(document).bind("keydown",{combi:C,disableInInput:true},function(D){var J=B.tree.plugins.hotkeys.exec(C);
if(D.which!=113){var I=null;
if(B("a[class=hover]").html()!=null){I=B("a[class*=hover]")
}else{I=B("a[class*=clicked]")
}if(I.parent("li").attr("typeNode")=="ROOT"){B(".content").scrollTop("0")
}I.focus()
}return J
})
})(A);
B.tree.plugins.hotkeys.bound.push(A)
}}}}}})
})(jQuery);