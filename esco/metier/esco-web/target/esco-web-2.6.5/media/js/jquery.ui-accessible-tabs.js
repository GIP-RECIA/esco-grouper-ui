var fluid=fluid||{};
(function(A){var D=false;
var B=function(G){var E=G.children("li");
fluid.tabbable(G);
var F=function(H){if(D){G.tabs("select",E.index(H))
}};
fluid.selectable(G,{selectableElements:E,onSelect:F,direction:fluid.a11y.orientation.HORIZONTAL});
fluid.activatable(G,function(H){if(!D){G.tabs("select",E.index(H))
}})
};
var C=function(E,G){var F=E.children("li");
var H=A("#panels > div");
E.attr("role","tablist");
F.each(function(I,J){A(J).attr("role","tab")
});
H.attr("role","tabpanel");
H.each(function(J,I){A(I).attr("aria-labelledby",I.id.split("Panel")[0]+"Tab")
})
};
fluid.accessibletabs=function(G,E){var F=A("#"+G);
fluid.tabindex(F.find("a"),-1);
F.tabs().find(".ui-tabs");
B(F);
C(F,E)
}
})(jQuery);