(function(B){B.extend(B.tree.plugins,{themeroller:{defaults:{},callbacks:{oninit:function(D){if(this.settings.ui.theme_name!="themeroller"){return 
}var A=B.extend(true,{},B.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
this.container.addClass("ui-widget ui-widget-content");
B("#"+this.container.attr("id")+" li a").live("mouseover",function(){B(this).addClass("ui-state-hover")
});
B("#"+this.container.attr("id")+" li a").live("mouseout",function(){B(this).removeClass("ui-state-hover")
})
},onparse:function(F,A){if(this.settings.ui.theme_name!="themeroller"){return 
}var E=B.extend(true,{},B.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
return B(F).find("a").not(".ui-state-default").addClass("ui-state-default").children("ins").addClass("ui-icon").end().end().end()
},onselect:function(E,A){if(this.settings.ui.theme_name!="themeroller"){return 
}var F=B.extend(true,{},B.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
B(E).children("a").addClass("ui-state-active")
},ondeselect:function(E,A){if(this.settings.ui.theme_name!="themeroller"){return 
}var F=B.extend(true,{},B.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
B(E).children("a").removeClass("ui-state-active")
}}}})
})(jQuery);