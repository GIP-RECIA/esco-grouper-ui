fluid_1_1=fluid_1_1||{};
(function(L,N){var P="state_initial",I="state_changed",J="state_reverted";
function M(C,A){var B="<span class='flc-undo'><span class='flc-undo-undoContainer'>[<a href='#' class='flc-undo-undoControl'>undo</a>]</span><span class='flc-undo-redoContainer'>[<a href='#' class='flc-undo-redoControl'>redo</a>]</span></span>";
var D=L(B);
A.append(D);
return D
}function K(A){if(A.state===P){A.locate("undoContainer").hide();
A.locate("redoContainer").hide()
}else{if(A.state===I){A.locate("undoContainer").show();
A.locate("redoContainer").hide()
}else{if(A.state===J){A.locate("undoContainer").hide();
A.locate("redoContainer").show()
}}}}var O=function(A){A.locate("undoControl").click(function(){if(A.state!==J){N.model.copyModel(A.extremalModel,A.component.model);
A.component.updateModel(A.initialModel,A);
A.state=J;
K(A);
A.locate("redoControl").focus()
}return false
});
A.locate("redoControl").click(function(){if(A.state!==I){A.component.updateModel(A.extremalModel,A);
A.state=I;
K(A);
A.locate("undoControl").focus()
}return false
});
return{modelChanged:function(D,B,C){if(C!==A){A.state=I;
N.model.copyModel(A.initialModel,B);
K(A)
}}}
};
N.undoDecorator=function(B,C){var D=N.initView("undo",null,C);
D.container=D.options.renderer(D,B.container);
N.initDomBinder(D);
N.tabindex(D.locate("undoControl"),0);
N.tabindex(D.locate("redoControl"),0);
D.component=B;
D.initialModel={};
D.extremalModel={};
N.model.copyModel(D.initialModel,B.model);
N.model.copyModel(D.extremalModel,B.model);
D.state=P;
K(D);
var A=O(D);
D.returnedOptions={listeners:A};
return D
};
N.defaults("undo",{selectors:{undoContainer:".flc-undo-undoContainer",undoControl:".flc-undo-undoControl",redoContainer:".flc-undo-redoContainer",redoControl:".flc-undo-redoControl"},renderer:M})
})(jQuery,fluid_1_1);