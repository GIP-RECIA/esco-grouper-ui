(function(B){B.extend(B.tree.plugins,{contextmenu:{object:B("<ul id='jstree-contextmenu' class='tree-context' />"),data:{t:false,a:false,r:false},defaults:{class_name:"hover",items:{create:{label:"Create",icon:"create",visible:function(D,A){if(D.length!=1){return 0
}return A.check("creatable",D)
},action:function(D,A){A.create(false,A.get_node(D[0]))
},separator_after:true},rename:{label:"Rename",icon:"rename",visible:function(D,A){if(D.length!=1){return false
}return A.check("renameable",D)
},action:function(D,A){A.rename(D)
}},remove:{label:"Delete",icon:"remove",visible:function(A,F){var E=true;
B.each(A,function(){if(F.check("deletable",this)==false){E=false
}return false
});
return E
},action:function(D,A){B.each(D,function(){A.remove(this)
})
}}}},show:function(V,a){var X=B.extend(true,{},B.tree.plugins.contextmenu.defaults,a.settings.plugins.contextmenu);
V=B(V);
B.tree.plugins.contextmenu.object.empty();
var R="";
var W=0;
for(var U in X.items){if(!X.items.hasOwnProperty(U)){continue
}if(X.items[U]===false){continue
}var S=1;
if(typeof X.items[U].visible=="function"){S=X.items[U].visible.call(null,B.tree.plugins.contextmenu.data.a,a)
}if(S==-1){continue
}else{W++
}if(X.items[U].separator_before===true&&S==1){R+="<li class='separator'><span>&nbsp;</span></li>"
}R+='<li class="'+U+" "+(S==0?"disabled":"")+'"><a href="#" rel="'+U+'" class="'+U+" "+(S==0?"disabled":"")+'">';
if(X.items[U].icon){R+="<ins "+(X.items[U].icon.indexOf("/")==-1?" class='"+X.items[U].icon+"' ":" style='background-image:url(\""+X.items[U].icon+"\");' ")+">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</ins>"
}else{R+="<ins>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</ins>"
}R+="<span>"+X.items[U].label+"</span></a></li>";
if(X.items[U].separator_after===true){R+="<li class='separator'><span>&nbsp;</span></li>"
}}var T=V.children("a:visible").offset();
B.tree.plugins.contextmenu.object.attr("class","tree-context tree-"+a.settings.ui.theme_name.toString()+"-context").html(R);
var b=B.tree.plugins.contextmenu.object.height();
var A=B.tree.plugins.contextmenu.object.width();
var P=T.left;
var Q=T.top+parseInt(V.children("a:visible").height())+2;
var Z=B(window).height()+B(window).scrollTop();
var Y=B(window).width()+B(window).scrollLeft();
if(Q+b>Z){Q=Math.max((Z-b-2),0)
}if(P+A>Y){P=Math.max((Y-A-2),0)
}B.tree.plugins.contextmenu.object.css({left:(P),top:(Q)}).fadeIn("fast")
},hide:function(){if(!B.tree.plugins.contextmenu.data.t){return 
}var A=B.extend(true,{},B.tree.plugins.contextmenu.defaults,B.tree.plugins.contextmenu.data.t.settings.plugins.contextmenu);
if(B.tree.plugins.contextmenu.data.r&&B.tree.plugins.contextmenu.data.a){B.tree.plugins.contextmenu.data.a.children("a, span").removeClass(A.class_name)
}B.tree.plugins.contextmenu.data={a:false,r:false,t:false};
B.tree.plugins.contextmenu.object.fadeOut("fast")
},exec:function(F){if(B.tree.plugins.contextmenu.data.t==false){return 
}var A=B.extend(true,{},B.tree.plugins.contextmenu.defaults,B.tree.plugins.contextmenu.data.t.settings.plugins.contextmenu);
try{A.items[F].action.apply(null,[B.tree.plugins.contextmenu.data.a,B.tree.plugins.contextmenu.data.t])
}catch(E){}},callbacks:{oninit:function(){},onrgtclk:function(I,H,J){var G=B.extend(true,{},B.tree.plugins.contextmenu.defaults,H.settings.plugins.contextmenu);
I=B(I);
if(I.size()==0){return 
}B.tree.plugins.contextmenu.data.t=H;
if(!I.children("a:eq(0)").hasClass("clicked")){B.tree.plugins.contextmenu.data.a=I;
B.tree.plugins.contextmenu.data.r=true;
I.children("a").addClass(G.class_name);
J.target.blur()
}else{B.tree.plugins.contextmenu.data.r=false;
B.tree.plugins.contextmenu.data.a=(H.selected_arr&&H.selected_arr.length>1)?H.selected_arr:H.selected
}B.tree.plugins.contextmenu.show(I,H);
var A=null;
B.each(B("#jstree-contextmenu a"),function(){B(this).hover(function(){B.each(B("#jstree-contextmenu a"),function(){B(this).removeClass("hover")
});
B(this).addClass("hover")
},function(){B(this).removeClass("hover")
});
B(this).unbind("keydown");
B(this).bind("keydown",function(C){C.stopImmediatePropagation();
C.preventDefault();
C.stopPropagation();
if(C.which==40){B.each(B("#jstree-contextmenu a"),function(){B(this).removeClass("hover")
});
var E=B(this).parent("li").next();
while(E.hasClass("separator")||E.hasClass("disabled")){E=E.next()
}if(E.html()!=null||E.children("a").html()!=null){E.find("a").addClass("hover");
E.find("a").focus()
}else{B(this).addClass("hover")
}}else{if(C.which==38){B.each(B("#jstree-contextmenu a"),function(){B(this).removeClass("hover")
});
var D=B(this).parent("li").prev();
while(D.hasClass("separator")||D.hasClass("disabled")){D=D.prev()
}if(D.html()!=null||D.children("a").html()!=null){D.find("a").addClass("hover");
D.find("a").focus()
}else{B(this).addClass("hover")
}}else{if(C.which==13){B(this).click()
}else{if(C.which==27){B("#jstree-contextmenu").hide()
}}}}});
if(A==null&&!B(this).hasClass("disabled")&&!B(this).hasClass("separator")){A=B(this)
}});
if(A!=null){A.focus();
A.addClass("hover")
}J.preventDefault();
J.stopPropagation();
return false
},onchange:function(){B.tree.plugins.contextmenu.hide()
},beforedata:function(){B.tree.plugins.contextmenu.hide()
},ondestroy:function(){B.tree.plugins.contextmenu.hide()
}}}});
B(function(){B.tree.plugins.contextmenu.object.hide().appendTo("body");
B("#jstree-contextmenu a").live("click",function(A){if(!B(this).hasClass("disabled")){B.tree.plugins.contextmenu.exec.apply(null,[B(this).attr("rel")]);
B.tree.plugins.contextmenu.hide()
}A.stopPropagation();
A.preventDefault();
return false
});
B(document).bind("mousedown",function(A){if(B(A.target).parents("#jstree-contextmenu").size()==0){B.tree.plugins.contextmenu.hide()
}})
})
})(jQuery);