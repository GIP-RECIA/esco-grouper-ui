(function(A){if(typeof window.hotkeys=="undefined"){throw"jsTree hotkeys: jQuery hotkeys plugin not included."
}A.extend(A.tree.plugins,{hotkeys:{bound:[],disabled:false,defaults:{hover_mode:true,functions:{up:function(){A.tree.plugins.hotkeys.get_prev.apply(this);
return false
},down:function(){A.tree.plugins.hotkeys.get_next.apply(this);
return false
},left:function(){A.tree.plugins.hotkeys.get_left.apply(this);
return false
},right:function(){A.tree.plugins.hotkeys.get_right.apply(this);
return false
},"return":function(){tree.select_branch(tree.hovered);
return false
},f2:function(){return false
},del:function(){return false
},"ctrl+c":function(){return false
},"ctrl+x":function(){return false
},"ctrl+v":function(){return false
}}},exec:function(B){if(A.tree.plugins.hotkeys.disabled){return false
}var D=A.tree.focused();
if(typeof D.settings.plugins.hotkeys=="undefined"){return 
}var C=A.extend(true,{},A.tree.plugins.hotkeys.defaults,D.settings.plugins.hotkeys);
if(typeof C.functions[B]=="function"){return C.functions[B].apply(D)
}},get_next:function(){tree.selected=A(".clicked").parent("li");
var B=A.extend(true,{},A.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var C=this.hovered||this.selected;
return B.hover_mode?this.hover_branch(this.next(C)):this.select_branch(this.next(C))
},get_prev:function(){tree.selected=A(".clicked").parent("li");
var B=A.extend(true,{},A.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var C=this.hovered||this.selected;
return B.hover_mode?this.hover_branch(this.prev(C)):this.select_branch(this.prev(C))
},get_left:function(){tree.selected=A(".clicked").parent("li");
var B=A.extend(true,{},A.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var C=this.hovered||this.selected;
if(C){if(C.hasClass("open")){this.close_branch(C)
}else{return B.hover_mode?this.hover_branch(this.parent(C)):this.select_branch(this.parent(C))
}}},get_right:function(){tree.selected=A(".clicked").parent("li");
var B=A.extend(true,{},A.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
var C=this.hovered||this.selected;
if(C){if(C.hasClass("closed")){this.open_branch(C)
}else{return B.hover_mode?this.hover_branch(C.find("li:eq(0)")):this.select_branch(C.find("li:eq(0)"))
}}},callbacks:{oninit:function(B){var C=A.extend(true,{},A.tree.plugins.hotkeys.defaults,this.settings.plugins.hotkeys);
for(var D in C.functions){if(C.functions.hasOwnProperty(D)&&A.inArray(D,A.tree.plugins.hotkeys.bound)==-1){(function(E){A(document).bind("keydown",{combi:E,disableInInput:true},function(H){var F=A.tree.plugins.hotkeys.exec(E);
if(H.which!=113){var G=null;
if(A("a[class=hover]").html()!=null){G=A("a[class*=hover]")
}else{G=A("a[class*=clicked]")
}if(G.parent("li").attr("typeNode")=="ROOT"){A(".content").scrollTop("0")
}G.focus()
}return F
})
})(D);
A.tree.plugins.hotkeys.bound.push(D)
}}}}}})
})(jQuery);