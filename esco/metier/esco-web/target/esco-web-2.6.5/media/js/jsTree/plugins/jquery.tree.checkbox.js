(function(B){B.extend(B.tree.plugins,{checkbox:{defaults:{three_state:true},get_checked:function(A){if(!A){A=B.tree.focused()
}return A.container.find("a.checked").parent()
},get_undeterminded:function(A){if(!A){A=B.tree.focused()
}return A.container.find("a.undetermined").parent()
},get_unchecked:function(A){if(!A){A=B.tree.focused()
}return A.container.find("a:not(.checked, .undetermined)").parent()
},check:function(E){if(!E){return false
}var A=B.tree.reference(E);
E=A.get_node(E);
if(E.children("a").hasClass("checked")){return true
}var F=B.extend(true,{},B.tree.plugins.checkbox.defaults,A.settings.plugins.checkbox);
if(F.three_state){E.find("li").andSelf().children("a").removeClass("unchecked undetermined").addClass("checked");
E.parents("li").each(function(){if(B(this).children("ul").find("a:not(.checked):eq(0)").size()>0){B(this).parents("li").andSelf().children("a").removeClass("unchecked checked").addClass("undetermined");
return false
}else{B(this).children("a").removeClass("unchecked undetermined").addClass("checked")
}})
}else{E.children("a").removeClass("unchecked").addClass("checked")
}return true
},uncheck:function(E){if(!E){return false
}var A=B.tree.reference(E);
E=A.get_node(E);
if(E.children("a").hasClass("unchecked")){return true
}var F=B.extend(true,{},B.tree.plugins.checkbox.defaults,A.settings.plugins.checkbox);
if(F.three_state){E.find("li").andSelf().children("a").removeClass("checked undetermined").addClass("unchecked");
E.parents("li").each(function(){if(B(this).find("a.checked, a.undetermined").size()-1>0){B(this).parents("li").andSelf().children("a").removeClass("unchecked checked").addClass("undetermined");
return false
}else{B(this).children("a").removeClass("checked undetermined").addClass("unchecked")
}})
}else{E.children("a").removeClass("checked").addClass("unchecked")
}return true
},toggle:function(A){if(!A){return false
}var D=B.tree.reference(A);
A=D.get_node(A);
if(A.children("a").hasClass("checked")){B.tree.plugins.checkbox.uncheck(A)
}else{B.tree.plugins.checkbox.check(A)
}},callbacks:{onchange:function(A,D){B.tree.plugins.checkbox.toggle(A)
}}}})
})(jQuery);