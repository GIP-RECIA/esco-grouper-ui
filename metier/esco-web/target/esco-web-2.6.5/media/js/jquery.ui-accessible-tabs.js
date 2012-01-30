var fluid=fluid||{};
(function(E){var F=false;
var H=function(A){var C=A.children("li");
fluid.tabbable(A);
var B=function(D){if(F){A.tabs("select",C.index(D))
}};
fluid.selectable(A,{selectableElements:C,onSelect:B,direction:fluid.a11y.orientation.HORIZONTAL});
fluid.activatable(A,function(D){if(!F){A.tabs("select",C.index(D))
}})
};
var G=function(D,B){var C=D.children("li");
var A=E("#panels > div");
D.attr("role","tablist");
C.each(function(L,K){E(K).attr("role","tab")
});
A.attr("role","tabpanel");
A.each(function(K,L){E(L).attr("aria-labelledby",L.id.split("Panel")[0]+"Tab")
})
};
fluid.accessibletabs=function(A,C){var B=E("#"+A);
fluid.tabindex(B.find("a"),-1);
B.tabs().find(".ui-tabs");
H(B);
G(B,C)
}
})(jQuery);