fluid_1_1=fluid_1_1||{};
(function(D,E){var F=function(C,B,A){var H=D.extend({},E.defaults(C),A);
return E.inlineEdit(B,H)
};
E.inlineEdit.tinyMCE=function(B,A){return F("fluid.inlineEdit.tinyMCE",B,A)
};
E.inlineEdit.tinyMCE.viewAccessor=function(A){return{value:function(B){var C=tinyMCE.get(A.id);
if(!C){return""
}if(B){D(A).val(B);
C.setContent(B,{format:"raw"})
}else{return C.getContent()
}}}
};
E.inlineEdit.tinyMCE.blurHandlerBinder=function(B){function A(C){setTimeout(function(){tinyMCE.execCommand("mceFocus",false,B.editField[0].id);
if(D.browser.mozilla&&D.browser.version.substring(0,3)==="1.8"){return 
}C.selection.select(C.getBody(),1);
C.selection.collapse(0)
},10)
}B.events.afterInitEdit.addListener(function(H){A(H);
var C=H.getBody();
E.deadMansBlur(B.editField,D(C),function(){B.cancel()
})
});
B.events.afterBeginEdit.addListener(function(){var C=tinyMCE.get(B.editField[0].id);
if(C){A(C)
}})
};
E.inlineEdit.tinyMCE.editModeRenderer=function(C){var B={mode:"exact",theme:"simple"};
var H=D.extend(true,B,C.options.tinyMCE);
H.elements=E.allocateSimpleId(C.editField);
var A=H.init_instance_callback;
H.init_instance_callback=function(G){C.events.afterInitEdit.fire(G);
if(A){A()
}};
tinyMCE.init(H)
};
E.defaults("fluid.inlineEdit.tinyMCE",{useTooltip:true,selectors:{edit:"textarea"},styles:{invitation:null},displayAccessor:{type:"fluid.inlineEdit.richTextViewAccessor"},editAccessor:{type:"fluid.inlineEdit.tinyMCE.viewAccessor"},lazyEditView:true,blurHandlerBinder:E.inlineEdit.tinyMCE.blurHandlerBinder,editModeRenderer:E.inlineEdit.tinyMCE.editModeRenderer});
E.inlineEdit.FCKEditor=function(B,A){return F("fluid.inlineEdit.FCKEditor",B,A)
};
E.inlineEdit.FCKEditor.complete=E.event.getEventFirer();
E.inlineEdit.FCKEditor.complete.addListener(function(C){var A=C.LinkedField;
var B=D.data(A,"fluid.inlineEdit.FCKEditor");
B.events.afterInitEdit.fire(C)
});
E.inlineEdit.FCKEditor.blurHandlerBinder=function(B){function A(C){C.Focus()
}B.events.afterInitEdit.addListener(function(H){A(H);
var C=H.EditingArea.TargetElement
});
B.events.afterBeginEdit.addListener(function(){var C=E.inlineEdit.FCKEditor.byId(B.editField[0].id);
if(C){A(C)
}})
};
E.inlineEdit.FCKEditor.byId=function(A){var B=typeof (FCKeditorAPI)==="undefined"?null:FCKeditorAPI.GetInstance(A);
return B
};
E.inlineEdit.FCKEditor.editModeRenderer=function(H){var C=E.allocateSimpleId(H.editField);
D.data(E.unwrap(H.editField),"fluid.inlineEdit.FCKEditor",H);
var A=new FCKeditor(C);
var B=E.copy(H.options.FCKEditor);
B.BasePath=B.BasePath+"editor/";
D.extend(true,A.Config,B);
D.extend(true,A,H.options.FCKEditor);
A.Config.fluidInstance=H;
A.ReplaceTextarea()
};
E.inlineEdit.FCKEditor.viewAccessor=function(A){return{value:function(B){var C=E.inlineEdit.FCKEditor.byId(A.id);
if(!C){if(B){D(A).val(B)
}return""
}if(B){C.SetHTML(B)
}else{return C.GetHTML()
}}}
};
E.defaults("fluid.inlineEdit.FCKEditor",{selectors:{edit:"textarea"},styles:{invitation:null},displayAccessor:{type:"fluid.inlineEdit.richTextViewAccessor"},editAccessor:{type:"fluid.inlineEdit.FCKEditor.viewAccessor"},lazyEditView:true,blurHandlerBinder:E.inlineEdit.FCKEditor.blurHandlerBinder,editModeRenderer:E.inlineEdit.FCKEditor.editModeRenderer,FCKEditor:{BasePath:"fckeditor/"}});
E.inlineEdit.dropdown=function(B,A){return F("fluid.inlineEdit.dropdown",B,A)
};
E.inlineEdit.dropdown.editModeRenderer=function(B){var A=E.allocateSimpleId(B.editField);
B.editField.selectbox({finishHandler:function(){B.finish()
}});
return{container:B.editContainer,field:D("input.selectbox",B.editContainer)}
};
E.inlineEdit.dropdown.blurHandlerBinder=function(A){E.deadMansBlur(A.editField,D("div.selectbox-wrapper li",A.editContainer),function(){A.cancel()
})
};
E.defaults("fluid.inlineEdit.dropdown",{applyEditPadding:false,blurHandlerBinder:E.inlineEdit.dropdown.blurHandlerBinder,editModeRenderer:E.inlineEdit.dropdown.editModeRenderer})
})(jQuery,fluid_1_1);
function FCKeditor_OnComplete(B){fluid.inlineEdit.FCKEditor.complete.fire(B)
};