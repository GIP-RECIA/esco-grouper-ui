fluid_1_1=fluid_1_1||{};
(function(A,C){var B=function(E,F,G){var D=A.extend({},C.defaults(E),G);
return C.inlineEdit(F,D)
};
C.inlineEdit.tinyMCE=function(D,E){return B("fluid.inlineEdit.tinyMCE",D,E)
};
C.inlineEdit.tinyMCE.viewAccessor=function(D){return{value:function(F){var E=tinyMCE.get(D.id);
if(!E){return""
}if(F){A(D).val(F);
E.setContent(F,{format:"raw"})
}else{return E.getContent()
}}}
};
C.inlineEdit.tinyMCE.blurHandlerBinder=function(D){function E(F){setTimeout(function(){tinyMCE.execCommand("mceFocus",false,D.editField[0].id);
if(A.browser.mozilla&&A.browser.version.substring(0,3)==="1.8"){return 
}F.selection.select(F.getBody(),1);
F.selection.collapse(0)
},10)
}D.events.afterInitEdit.addListener(function(F){E(F);
var G=F.getBody();
C.deadMansBlur(D.editField,A(G),function(){D.cancel()
})
});
D.events.afterBeginEdit.addListener(function(){var F=tinyMCE.get(D.editField[0].id);
if(F){E(F)
}})
};
C.inlineEdit.tinyMCE.editModeRenderer=function(E){var F={mode:"exact",theme:"simple"};
var D=A.extend(true,F,E.options.tinyMCE);
D.elements=C.allocateSimpleId(E.editField);
var G=D.init_instance_callback;
D.init_instance_callback=function(H){E.events.afterInitEdit.fire(H);
if(G){G()
}};
tinyMCE.init(D)
};
C.defaults("fluid.inlineEdit.tinyMCE",{useTooltip:true,selectors:{edit:"textarea"},styles:{invitation:null},displayAccessor:{type:"fluid.inlineEdit.richTextViewAccessor"},editAccessor:{type:"fluid.inlineEdit.tinyMCE.viewAccessor"},lazyEditView:true,blurHandlerBinder:C.inlineEdit.tinyMCE.blurHandlerBinder,editModeRenderer:C.inlineEdit.tinyMCE.editModeRenderer});
C.inlineEdit.FCKEditor=function(D,E){return B("fluid.inlineEdit.FCKEditor",D,E)
};
C.inlineEdit.FCKEditor.complete=C.event.getEventFirer();
C.inlineEdit.FCKEditor.complete.addListener(function(D){var F=D.LinkedField;
var E=A.data(F,"fluid.inlineEdit.FCKEditor");
E.events.afterInitEdit.fire(D)
});
C.inlineEdit.FCKEditor.blurHandlerBinder=function(D){function E(F){F.Focus()
}D.events.afterInitEdit.addListener(function(F){E(F);
var G=F.EditingArea.TargetElement
});
D.events.afterBeginEdit.addListener(function(){var F=C.inlineEdit.FCKEditor.byId(D.editField[0].id);
if(F){E(F)
}})
};
C.inlineEdit.FCKEditor.byId=function(E){var D=typeof (FCKeditorAPI)==="undefined"?null:FCKeditorAPI.GetInstance(E);
return D
};
C.inlineEdit.FCKEditor.editModeRenderer=function(D){var E=C.allocateSimpleId(D.editField);
A.data(C.unwrap(D.editField),"fluid.inlineEdit.FCKEditor",D);
var G=new FCKeditor(E);
var F=C.copy(D.options.FCKEditor);
F.BasePath=F.BasePath+"editor/";
A.extend(true,G.Config,F);
A.extend(true,G,D.options.FCKEditor);
G.Config.fluidInstance=D;
G.ReplaceTextarea()
};
C.inlineEdit.FCKEditor.viewAccessor=function(D){return{value:function(F){var E=C.inlineEdit.FCKEditor.byId(D.id);
if(!E){if(F){A(D).val(F)
}return""
}if(F){E.SetHTML(F)
}else{return E.GetHTML()
}}}
};
C.defaults("fluid.inlineEdit.FCKEditor",{selectors:{edit:"textarea"},styles:{invitation:null},displayAccessor:{type:"fluid.inlineEdit.richTextViewAccessor"},editAccessor:{type:"fluid.inlineEdit.FCKEditor.viewAccessor"},lazyEditView:true,blurHandlerBinder:C.inlineEdit.FCKEditor.blurHandlerBinder,editModeRenderer:C.inlineEdit.FCKEditor.editModeRenderer,FCKEditor:{BasePath:"fckeditor/"}});
C.inlineEdit.dropdown=function(D,E){return B("fluid.inlineEdit.dropdown",D,E)
};
C.inlineEdit.dropdown.editModeRenderer=function(D){var E=C.allocateSimpleId(D.editField);
D.editField.selectbox({finishHandler:function(){D.finish()
}});
return{container:D.editContainer,field:A("input.selectbox",D.editContainer)}
};
C.inlineEdit.dropdown.blurHandlerBinder=function(D){C.deadMansBlur(D.editField,A("div.selectbox-wrapper li",D.editContainer),function(){D.cancel()
})
};
C.defaults("fluid.inlineEdit.dropdown",{applyEditPadding:false,blurHandlerBinder:C.inlineEdit.dropdown.blurHandlerBinder,editModeRenderer:C.inlineEdit.dropdown.editModeRenderer})
})(jQuery,fluid_1_1);
function FCKeditor_OnComplete(A){fluid.inlineEdit.FCKEditor.complete.fire(A)
};