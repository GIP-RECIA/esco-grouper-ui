(function(B){if(typeof B.cookie=="undefined"){throw"jsTree cookie: jQuery cookie plugin not included."
}B.extend(B.tree.plugins,{cookie:{defaults:{prefix:"",options:{expires:false,path:false,domain:false,secure:false},types:{selected:true,open:true},keep_selected:false,keep_opened:false},set_cookie:function(F){var A=B.extend(true,{},B.tree.plugins.cookie.defaults,this.settings.plugins.cookie);
if(A.types[F]!==true){return false
}switch(F){case"selected":if(this.settings.rules.multiple!=false&&this.selected_arr.length>1){var G=Array();
B.each(this.selected_arr,function(){if(this.attr("id")){G.push(this.attr("id"))
}});
G=G.join(",")
}else{var G=this.selected?this.selected.attr("id"):false
}B.cookie(A.prefix+"selected",G,A.options);
break;
case"open":var H="";
this.container.find("li.open").each(function(C){if(this.id){H+=this.id+","
}});
B.cookie(A.prefix+"open",H.replace(/,$/ig,""),A.options);
break
}},callbacks:{oninit:function(F){var E=B.extend(true,{},B.tree.plugins.cookie.defaults,this.settings.plugins.cookie);
var A=false;
A=B.cookie(E.prefix+"open");
if(A){A=A.split(",");
if(E.keep_opened){this.settings.opened=B.unique(B.merge(A,this.settings.opened))
}else{this.settings.opened=A
}}A=B.cookie(E.prefix+"selected");
if(A){A=A.split(",");
if(E.keep_selected){this.settings.selected=B.unique(B.merge(A,this.settings.opened))
}else{this.settings.selected=A
}}},onchange:function(){B.tree.plugins.cookie.set_cookie.apply(this,["selected"])
},onopen:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
},onclose:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
},ondelete:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
},oncopy:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
},oncreate:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
},onmoved:function(){B.tree.plugins.cookie.set_cookie.apply(this,["open"])
}}}})
})(jQuery);