fluid_1_1=fluid_1_1||{};
(function(F,D){var B="state_initial",A="state_changed",H="state_reverted";
function E(J,L){var K="<span class='flc-undo'><span class='flc-undo-undoContainer'>[<a href='#' class='flc-undo-undoControl'>undo</a>]</span><span class='flc-undo-redoContainer'>[<a href='#' class='flc-undo-redoControl'>redo</a>]</span></span>";
var I=F(K);
L.append(I);
return I
}function G(I){if(I.state===B){I.locate("undoContainer").hide();
I.locate("redoContainer").hide()
}else{if(I.state===A){I.locate("undoContainer").show();
I.locate("redoContainer").hide()
}else{if(I.state===H){I.locate("undoContainer").hide();
I.locate("redoContainer").show()
}}}}var C=function(I){I.locate("undoControl").click(function(){if(I.state!==H){D.model.copyModel(I.extremalModel,I.component.model);
I.component.updateModel(I.initialModel,I);
I.state=H;
G(I);
I.locate("redoControl").focus()
}return false
});
I.locate("redoControl").click(function(){if(I.state!==A){I.component.updateModel(I.extremalModel,I);
I.state=A;
G(I);
I.locate("undoControl").focus()
}return false
});
return{modelChanged:function(J,L,K){if(K!==I){I.state=A;
D.model.copyModel(I.initialModel,L);
G(I)
}}}
};
D.undoDecorator=function(K,J){var I=D.initView("undo",null,J);
I.container=I.options.renderer(I,K.container);
D.initDomBinder(I);
D.tabindex(I.locate("undoControl"),0);
D.tabindex(I.locate("redoControl"),0);
I.component=K;
I.initialModel={};
I.extremalModel={};
D.model.copyModel(I.initialModel,K.model);
D.model.copyModel(I.extremalModel,K.model);
I.state=B;
G(I);
var L=C(I);
I.returnedOptions={listeners:L};
return I
};
D.defaults("undo",{selectors:{undoContainer:".flc-undo-undoContainer",undoControl:".flc-undo-undoControl",redoContainer:".flc-undo-redoContainer",redoControl:".flc-undo-redoControl"},renderer:E})
})(jQuery,fluid_1_1);