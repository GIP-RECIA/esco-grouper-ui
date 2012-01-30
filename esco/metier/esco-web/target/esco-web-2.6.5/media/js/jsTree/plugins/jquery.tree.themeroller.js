(function(A){A.extend(A.tree.plugins,{themeroller:{defaults:{},callbacks:{oninit:function(B){if(this.settings.ui.theme_name!="themeroller"){return 
}var C=A.extend(true,{},A.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
this.container.addClass("ui-widget ui-widget-content");
A("#"+this.container.attr("id")+" li a").live("mouseover",function(){A(this).addClass("ui-state-hover")
});
A("#"+this.container.attr("id")+" li a").live("mouseout",function(){A(this).removeClass("ui-state-hover")
})
},onparse:function(B,D){if(this.settings.ui.theme_name!="themeroller"){return 
}var C=A.extend(true,{},A.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
return A(B).find("a").not(".ui-state-default").addClass("ui-state-default").children("ins").addClass("ui-icon").end().end().end()
},onselect:function(C,D){if(this.settings.ui.theme_name!="themeroller"){return 
}var B=A.extend(true,{},A.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
A(C).children("a").addClass("ui-state-active")
},ondeselect:function(C,D){if(this.settings.ui.theme_name!="themeroller"){return 
}var B=A.extend(true,{},A.tree.plugins.themeroller.defaults,this.settings.plugins.themeroller);
A(C).children("a").removeClass("ui-state-active")
}}}})
})(jQuery);