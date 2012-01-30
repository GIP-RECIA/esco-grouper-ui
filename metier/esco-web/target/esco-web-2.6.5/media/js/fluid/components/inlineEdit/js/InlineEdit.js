fluid_1_1=fluid_1_1||{};
(function(AA,y){function v(D,E,C,A){var B=document.createEvent("KeyEvents");
B.initKeyEvent(E,1,1,null,0,0,0,0,C,A);
D.dispatchEvent(B)
}y.setCaretToEnd=function(E,B){var D=B?B.length:0;
try{E.focus();
if(E.setSelectionRange){E.setSelectionRange(D,D);
if(AA.browser.mozilla&&D>0){v(E,"keypress",92,92);
v(E,"keydown",8,0);
v(E,"keypress",8,0)
}}else{if(E.createTextRange){var C=E.createTextRange();
C.move("character",D);
C.select()
}}}catch(A){}};
y.deadMansBlur=function(D,B,E){var C=false;
AA(D).blur(function(){C=true;
setTimeout(function(){if(C){E(D)
}},150)
});
var A=function(){C=false
};
B.focus(A);
B.click(A)
};
var k=function(C,B){C.editContainer=C.locate("editContainer");
C.editField=C.locate("edit");
if(C.editContainer.length!==1){if(C.editField.length===1){C.editContainer=C.editField
}else{if(C.editContainer.length>1){y.fail("InlineEdit did not find a unique container for selector "+C.options.selectors.editContainer+": "+y.dumpEl(C.editContainer))
}}}if(C.editContainer.length===1&&!C.editField){C.editField=C.locate("edit",C.editContainer)
}if(!B){return 
}var A=C.options.editModeRenderer(C);
if(A){C.editContainer=A.container;
C.editField=A.field
}if(C.editField.length===0){y.fail("InlineEdit improperly initialised - editField could not be located (selector "+C.options.selectors.edit+")")
}};
var x=function(A){A.editContainer.hide();
A.viewEl.show()
};
var j=function(A){if(A.isEditing()){A.editView.value(A.model.value);
x(A)
}};
var i=function(F){var E=F.editView.value();
var B=F.model.value;
var D=F.viewEl[0];
var A=F.editField[0];
var C=F.events.onFinishEdit.fire(E,B,A,D);
if(C===false){return 
}F.updateModelValue(E);
F.events.afterFinishEdit.fire(E,B,A,D);
x(F)
};
var AD=function(D){if(D.options.submitOnEnter===undefined){D.options.submitOnEnter="textarea"!==y.unwrap(D.editField).nodeName.toLowerCase()
}function C(E){return E.keyCode?E.keyCode:(E.which?E.which:0)
}var B=function(F){var E=C(F);
if(E===AA.ui.keyCode.ESCAPE){j(D);
return false
}};
var A=function(F){var E=C(F);
if(E!==AA.ui.keyCode.ENTER){return true
}i(D);
D.viewEl.focus();
return false
};
if(D.options.submitOnEnter){D.editContainer.keypress(A)
}D.editContainer.keydown(B)
};
var AB=function(B){if(B.options.blurHandlerBinder){B.options.blurHandlerBinder(B)
}else{var A=function(C){i(B);
return false
};
B.editField.blur(A)
}};
var o=function(A,B){if(!A.editInitialized){k(A,!A.options.lazyEditView||!B);
if(!A.options.lazyEditView||!B){A.editView=y.initSubcomponent(A,"editView",A.editField);
AA.extend(true,A.editView,y.initSubcomponent(A,"editAccessor",A.editField));
AD(A);
AB(A);
A.editView.refreshView(A);
A.editInitialized=true
}}};
var q=function(C){o(C,false);
var A=C.viewEl;
var B=C.displayView.value();
C.updateModelValue(B===C.options.defaultViewText?"":B);
if(C.options.applyEditPadding){C.editField.width(Math.max(A.width()+C.options.paddings.edit,C.options.paddings.minimumEdit))
}A.removeClass(C.options.styles.invitation);
A.removeClass(C.options.styles.focus);
A.hide();
C.editContainer.show();
if(C.tooltipEnabled()){AA("#"+C.options.tooltipId).hide()
}setTimeout(function(){C.editField.focus();
y.setCaretToEnd(C.editField[0],C.editView.value());
if(C.options.selectOnEdit){C.editField[0].select()
}},0);
C.events.afterBeginEdit.fire()
};
var u=function(C,A,B){C.removeClass(A);
C.css("padding-right",B)
};
var d=function(A){A.displayView.value(A.options.defaultViewText);
A.viewEl.css("padding-right",A.existingPadding);
A.viewEl.addClass(A.options.styles.defaultViewStyle)
};
var r=function(A){A.displayView.value("");
if(AA.browser.msie){if(A.viewEl.css("display")==="inline"){A.viewEl.css("display","inline-block")
}}};
var t=function(A){A.displayView.value(A.model.value);
u(A.viewEl,A.options.styles.defaultViewStyle,A.existingPadding)
};
var f=function(B,A){B.displayView.refreshView(B,A);
if(B.editView){B.editView.refreshView(B,A)
}};
var m=function(B,A){B.model.value=A;
B.refreshView()
};
var g=function(B,D,A){if(B.model.value!==D){var C=AA.extend(true,{},B.model);
B.model.value=D;
B.events.modelChanged.fire(B.model,C,A);
B.refreshView(A)
}};
var AF=function(A,C){var D=function(E){A.addClass(C)
};
var B=function(E){A.removeClass(C)
};
A.hover(D,B)
};
var n=function(A){return function(){var B=A.events.onBeginEdit.fire();
if(B===false){return false
}q(A);
return true
}
};
function AC(A){var B=y.unwrap(A.viewEl);
return function(C){var D=y.findAncestor(C.target,function(E){if(/input|select|textarea|button|a/i.test(E.nodeName)||E===B){return true
}});
if(D===B){A.edit();
return false
}}
}var s=function(A){AF(A.viewEl,A.options.styles.invitation);
A.viewEl.click(AC(A))
};
var l=function(A,C,E){var D=function(){A.addClass(C);
A.addClass(E)
};
var B=function(){A.removeClass(C);
A.removeClass(E)
};
A.focus(D);
A.blur(B)
};
var w=function(A){y.tabbable(A.viewEl);
var B=AC(A);
y.activatable(A.viewEl,function(C){return B(C)
})
};
var h=function(B,A){B.attr("role","button")
};
var AE=function(A){if(A.editContainer.length>0&&A.editField.length>0){return{container:A.editContainer,field:A.editField}
}var D="<span><input type='text' class='flc-inlineEdit-edit fl-inlineEdit-edit'/></span>";
var F=AA(D);
var E=AA("input",F);
var B=A.container.attr("id");
if(B){var G=B+"-edit-container";
var C=B+"-edit";
F.attr("id",G);
E.attr("id",C)
}A.viewEl.after(F);
return{container:F,field:E}
};
var p=function(A){var B=false;
A.events.onBeginEdit.addListener(function(){B=true
});
A.events.afterFinishEdit.addListener(function(){B=false
});
return function(){return B
}
};
var e=function(B,A){var D=A.viewEl.css("padding-right");
A.existingPadding=D?parseFloat(D):0;
m(A,A.displayView.value());
s(A);
w(A);
l(A.viewEl,A.options.styles.focus,A.options.styles.invitation);
h(A.viewEl);
if(A.editContainer){A.editContainer.hide()
}var C=function(){if(A.tooltipEnabled()){A.viewEl.tooltip({delay:A.options.tooltipDelay,extraClass:A.options.styles.tooltip,bodyHandler:function(){return A.options.tooltipText
},id:A.options.tooltipId})
}};
AA(C);
A.decorators=y.initSubcomponents(A,"componentDecorators",[A,y.COMPONENT_OPTIONS])
};
var z=function(B,A){var C=[];
B.each(function(E,D){C.push(y.inlineEdit(AA(D),A))
});
return C
};
y.inlineEdit=function(A,B){var C=y.initView("inlineEdit",A,B);
C.viewEl=C.locate("text");
C.displayView=y.initSubcomponent(C,"displayView",C.viewEl);
AA.extend(true,C.displayView,y.initSubcomponent(C,"displayAccessor",C.viewEl));
C.model={value:""};
C.edit=n(C);
C.isEditing=p(C);
C.finish=function(){i(C)
};
C.cancel=function(){j(C)
};
C.tooltipEnabled=function(){return C.options.useTooltip&&AA.fn.tooltip
};
C.refreshView=function(D){f(C,D)
};
C.updateModelValue=function(D,E){g(C,D,E)
};
C.updateModel=function(E,D){g(C,E.value,D)
};
o(C,true);
e(A,C);
return C
};
y.inlineEdit.standardAccessor=function(A){var B=A.nodeName.toLowerCase();
var C="input"===B||"textarea"===B?"val":"text";
return{value:function(D){return AA(A)[C](D)
}}
};
y.inlineEdit.richTextViewAccessor=function(A){return{value:function(B){return AA(A).html(B)
}}
};
y.inlineEdit.standardDisplayView=function(A){var B={refreshView:function(D,C){if(D.model.value){t(D)
}else{if(D.options.defaultViewText){d(D)
}else{r(D)
}}if((AA.trim(D.viewEl.text()).length===0)&&(D.existingPadding<D.options.paddings.minimumView)){D.viewEl.css("padding-right",D.options.paddings.minimumView)
}}};
return B
};
y.inlineEdit.standardEditView=function(B){var A={refreshView:function(D,C){if(D.editField&&D.editField.index(C)===-1){D.editView.value(D.model.value)
}}};
AA.extend(true,A,y.inlineEdit.standardAccessor(B));
return A
};
y.inlineEdits=function(B,A){A=A||{};
var E=AA.extend({},y.defaults("inlineEdits").selectors,A.selectors);
var C=y.container(B);
var D=AA(E.editables,C);
return z(D,A)
};
y.defaults("inlineEdit",{selectors:{text:".flc-inlineEdit-text",editContainer:".flc-inlineEdit-editContainer",edit:".flc-inlineEdit-edit"},styles:{text:"fl-inlineEdit-text",edit:"fl-inlineEdit-edit",invitation:"fl-inlineEdit-invitation",defaultViewStyle:"fl-inlineEdit-invitation-text",tooltip:"fl-inlineEdit-tooltip",focus:"fl-inlineEdit-focus"},events:{modelChanged:null,onBeginEdit:"preventable",afterBeginEdit:null,onFinishEdit:"preventable",afterFinishEdit:null,afterInitEdit:null},paddings:{edit:10,minimumEdit:80,minimumView:60},applyEditPadding:true,blurHandlerBinder:null,submitOnEnter:undefined,displayAccessor:{type:"fluid.inlineEdit.standardAccessor"},displayView:{type:"fluid.inlineEdit.standardDisplayView"},editAccessor:{type:"fluid.inlineEdit.standardAccessor"},editView:{type:"fluid.inlineEdit.standardEditView"},editModeRenderer:AE,lazyEditView:false,defaultViewText:"Click here to edit",tooltipText:"Click item to edit",tooltipId:"tooltip",useTooltip:false,tooltipDelay:1000,selectOnEdit:false});
y.defaults("inlineEdits",{selectors:{editables:".flc-inlineEditable"}})
})(jQuery,fluid_1_1);