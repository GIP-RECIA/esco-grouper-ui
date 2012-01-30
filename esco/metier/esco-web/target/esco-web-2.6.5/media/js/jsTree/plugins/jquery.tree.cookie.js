(function(A){if(typeof A.cookie=="undefined"){throw"jsTree cookie: jQuery cookie plugin not included."
}A.extend(A.tree.plugins,{cookie:{defaults:{prefix:"",options:{expires:false,path:false,domain:false,secure:false},types:{selected:true,open:true},keep_selected:false,keep_opened:false},set_cookie:function(D){var E=A.extend(true,{},A.tree.plugins.cookie.defaults,this.settings.plugins.cookie);
if(E.types[D]!==true){return false
}switch(D){case"selected":if(this.settings.rules.multiple!=false&&this.selected_arr.length>1){var C=Array();
A.each(this.selected_arr,function(){if(this.attr("id")){C.push(this.attr("id"))
}});
C=C.join(",")
}else{var C=this.selected?this.selected.attr("id"):false
}A.cookie(E.prefix+"selected",C,E.options);
break;
case"open":var B="";
this.container.find("li.open").each(function(F){if(this.id){B+=this.id+","
}});
A.cookie(E.prefix+"open",B.replace(/,$/ig,""),E.options);
break
}},callbacks:{oninit:function(B){var C=A.extend(true,{},A.tree.plugins.cookie.defaults,this.settings.plugins.cookie);
var D=false;
D=A.cookie(C.prefix+"open");
if(D){D=D.split(",");
if(C.keep_opened){this.settings.opened=A.unique(A.merge(D,this.settings.opened))
}else{this.settings.opened=D
}}D=A.cookie(C.prefix+"selected");
if(D){D=D.split(",");
if(C.keep_selected){this.settings.selected=A.unique(A.merge(D,this.settings.opened))
}else{this.settings.selected=D
}}},onchange:function(){A.tree.plugins.cookie.set_cookie.apply(this,["selected"])
},onopen:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
},onclose:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
},ondelete:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
},oncopy:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
},oncreate:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
},onmoved:function(){A.tree.plugins.cookie.set_cookie.apply(this,["open"])
}}}})
})(jQuery);