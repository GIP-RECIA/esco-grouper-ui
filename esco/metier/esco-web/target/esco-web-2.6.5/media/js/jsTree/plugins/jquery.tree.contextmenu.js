(function(A){A.extend(A.tree.plugins,{contextmenu:{object:A("<ul id='jstree-contextmenu' class='tree-context' />"),data:{t:false,a:false,r:false},defaults:{class_name:"hover",items:{create:{label:"Create",icon:"create",visible:function(B,C){if(B.length!=1){return 0
}return C.check("creatable",B)
},action:function(B,C){C.create(false,C.get_node(B[0]))
},separator_after:true},rename:{label:"Rename",icon:"rename",visible:function(B,C){if(B.length!=1){return false
}return C.check("renameable",B)
},action:function(B,C){C.rename(B)
}},remove:{label:"Delete",icon:"remove",visible:function(D,B){var C=true;
A.each(D,function(){if(B.check("deletable",this)==false){C=false
}return false
});
return C
},action:function(B,C){A.each(B,function(){C.remove(this)
})
}}}},show:function(K,F){var I=A.extend(true,{},A.tree.plugins.contextmenu.defaults,F.settings.plugins.contextmenu);
K=A(K);
A.tree.plugins.contextmenu.object.empty();
var O="";
var J=0;
for(var L in I.items){if(!I.items.hasOwnProperty(L)){continue
}if(I.items[L]===false){continue
}var N=1;
if(typeof I.items[L].visible=="function"){N=I.items[L].visible.call(null,A.tree.plugins.contextmenu.data.a,F)
}if(N==-1){continue
}else{J++
}if(I.items[L].separator_before===true&&N==1){O+="<li class='separator'><span>&nbsp;</span></li>"
}O+='<li class="'+L+" "+(N==0?"disabled":"")+'"><a href="#" rel="'+L+'" class="'+L+" "+(N==0?"disabled":"")+'">';
if(I.items[L].icon){O+="<ins "+(I.items[L].icon.indexOf("/")==-1?" class='"+I.items[L].icon+"' ":" style='background-image:url(\""+I.items[L].icon+"\");' ")+">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</ins>"
}else{O+="<ins>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</ins>"
}O+="<span>"+I.items[L].label+"</span></a></li>";
if(I.items[L].separator_after===true){O+="<li class='separator'><span>&nbsp;</span></li>"
}}var M=K.children("a:visible").offset();
A.tree.plugins.contextmenu.object.attr("class","tree-context tree-"+F.settings.ui.theme_name.toString()+"-context").html(O);
var E=A.tree.plugins.contextmenu.object.height();
var D=A.tree.plugins.contextmenu.object.width();
var C=M.left;
var B=M.top+parseInt(K.children("a:visible").height())+2;
var G=A(window).height()+A(window).scrollTop();
var H=A(window).width()+A(window).scrollLeft();
if(B+E>G){B=Math.max((G-E-2),0)
}if(C+D>H){C=Math.max((H-D-2),0)
}A.tree.plugins.contextmenu.object.css({left:(C),top:(B)}).fadeIn("fast")
},hide:function(){if(!A.tree.plugins.contextmenu.data.t){return 
}var B=A.extend(true,{},A.tree.plugins.contextmenu.defaults,A.tree.plugins.contextmenu.data.t.settings.plugins.contextmenu);
if(A.tree.plugins.contextmenu.data.r&&A.tree.plugins.contextmenu.data.a){A.tree.plugins.contextmenu.data.a.children("a, span").removeClass(B.class_name)
}A.tree.plugins.contextmenu.data={a:false,r:false,t:false};
A.tree.plugins.contextmenu.object.fadeOut("fast")
},exec:function(B){if(A.tree.plugins.contextmenu.data.t==false){return 
}var D=A.extend(true,{},A.tree.plugins.contextmenu.defaults,A.tree.plugins.contextmenu.data.t.settings.plugins.contextmenu);
try{D.items[B].action.apply(null,[A.tree.plugins.contextmenu.data.a,A.tree.plugins.contextmenu.data.t])
}catch(C){}},callbacks:{oninit:function(){},onrgtclk:function(C,D,B){var E=A.extend(true,{},A.tree.plugins.contextmenu.defaults,D.settings.plugins.contextmenu);
C=A(C);
if(C.size()==0){return 
}A.tree.plugins.contextmenu.data.t=D;
if(!C.children("a:eq(0)").hasClass("clicked")){A.tree.plugins.contextmenu.data.a=C;
A.tree.plugins.contextmenu.data.r=true;
C.children("a").addClass(E.class_name);
B.target.blur()
}else{A.tree.plugins.contextmenu.data.r=false;
A.tree.plugins.contextmenu.data.a=(D.selected_arr&&D.selected_arr.length>1)?D.selected_arr:D.selected
}A.tree.plugins.contextmenu.show(C,D);
var F=null;
A.each(A("#jstree-contextmenu a"),function(){A(this).hover(function(){A.each(A("#jstree-contextmenu a"),function(){A(this).removeClass("hover")
});
A(this).addClass("hover")
},function(){A(this).removeClass("hover")
});
A(this).unbind("keydown");
A(this).bind("keydown",function(I){I.stopImmediatePropagation();
I.preventDefault();
I.stopPropagation();
if(I.which==40){A.each(A("#jstree-contextmenu a"),function(){A(this).removeClass("hover")
});
var G=A(this).parent("li").next();
while(G.hasClass("separator")||G.hasClass("disabled")){G=G.next()
}if(G.html()!=null||G.children("a").html()!=null){G.find("a").addClass("hover");
G.find("a").focus()
}else{A(this).addClass("hover")
}}else{if(I.which==38){A.each(A("#jstree-contextmenu a"),function(){A(this).removeClass("hover")
});
var H=A(this).parent("li").prev();
while(H.hasClass("separator")||H.hasClass("disabled")){H=H.prev()
}if(H.html()!=null||H.children("a").html()!=null){H.find("a").addClass("hover");
H.find("a").focus()
}else{A(this).addClass("hover")
}}else{if(I.which==13){A(this).click()
}else{if(I.which==27){A("#jstree-contextmenu").hide()
}}}}});
if(F==null&&!A(this).hasClass("disabled")&&!A(this).hasClass("separator")){F=A(this)
}});
if(F!=null){F.focus();
F.addClass("hover")
}B.preventDefault();
B.stopPropagation();
return false
},onchange:function(){A.tree.plugins.contextmenu.hide()
},beforedata:function(){A.tree.plugins.contextmenu.hide()
},ondestroy:function(){A.tree.plugins.contextmenu.hide()
}}}});
A(function(){A.tree.plugins.contextmenu.object.hide().appendTo("body");
A("#jstree-contextmenu a").live("click",function(B){if(!A(this).hasClass("disabled")){A.tree.plugins.contextmenu.exec.apply(null,[A(this).attr("rel")]);
A.tree.plugins.contextmenu.hide()
}B.stopPropagation();
B.preventDefault();
return false
});
A(document).bind("mousedown",function(B){if(A(B.target).parents("#jstree-contextmenu").size()==0){A.tree.plugins.contextmenu.hide()
}})
})
})(jQuery);