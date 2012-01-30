(function(A){A.extend(A.tree.plugins,{checkbox:{defaults:{three_state:true},get_checked:function(B){if(!B){B=A.tree.focused()
}return B.container.find("a.checked").parent()
},get_undeterminded:function(B){if(!B){B=A.tree.focused()
}return B.container.find("a.undetermined").parent()
},get_unchecked:function(B){if(!B){B=A.tree.focused()
}return B.container.find("a:not(.checked, .undetermined)").parent()
},check:function(C){if(!C){return false
}var D=A.tree.reference(C);
C=D.get_node(C);
if(C.children("a").hasClass("checked")){return true
}var B=A.extend(true,{},A.tree.plugins.checkbox.defaults,D.settings.plugins.checkbox);
if(B.three_state){C.find("li").andSelf().children("a").removeClass("unchecked undetermined").addClass("checked");
C.parents("li").each(function(){if(A(this).children("ul").find("a:not(.checked):eq(0)").size()>0){A(this).parents("li").andSelf().children("a").removeClass("unchecked checked").addClass("undetermined");
return false
}else{A(this).children("a").removeClass("unchecked undetermined").addClass("checked")
}})
}else{C.children("a").removeClass("unchecked").addClass("checked")
}return true
},uncheck:function(C){if(!C){return false
}var D=A.tree.reference(C);
C=D.get_node(C);
if(C.children("a").hasClass("unchecked")){return true
}var B=A.extend(true,{},A.tree.plugins.checkbox.defaults,D.settings.plugins.checkbox);
if(B.three_state){C.find("li").andSelf().children("a").removeClass("checked undetermined").addClass("unchecked");
C.parents("li").each(function(){if(A(this).find("a.checked, a.undetermined").size()-1>0){A(this).parents("li").andSelf().children("a").removeClass("unchecked checked").addClass("undetermined");
return false
}else{A(this).children("a").removeClass("checked undetermined").addClass("unchecked")
}})
}else{C.children("a").removeClass("checked").addClass("unchecked")
}return true
},toggle:function(C){if(!C){return false
}var B=A.tree.reference(C);
C=B.get_node(C);
if(C.children("a").hasClass("checked")){A.tree.plugins.checkbox.uncheck(C)
}else{A.tree.plugins.checkbox.check(C)
}},callbacks:{onchange:function(C,B){A.tree.plugins.checkbox.toggle(C)
}}}})
})(jQuery);