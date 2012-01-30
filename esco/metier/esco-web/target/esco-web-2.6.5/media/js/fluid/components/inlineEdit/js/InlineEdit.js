fluid_1_1=fluid_1_1||{};
(function(C,E){function H(e,d,f,h){var g=document.createEvent("KeyEvents");
g.initKeyEvent(d,1,1,null,0,0,0,0,f,h);
e.dispatchEvent(g)
}E.setCaretToEnd=function(d,g){var e=g?g.length:0;
try{d.focus();
if(d.setSelectionRange){d.setSelectionRange(e,e);
if(C.browser.mozilla&&e>0){H(d,"keypress",92,92);
H(d,"keydown",8,0);
H(d,"keypress",8,0)
}}else{if(d.createTextRange){var f=d.createTextRange();
f.move("character",e);
f.select()
}}}catch(h){}};
E.deadMansBlur=function(e,g,d){var f=false;
C(e).blur(function(){f=true;
setTimeout(function(){if(f){d(e)
}},150)
});
var h=function(){f=false
};
g.focus(h);
g.click(h)
};
var S=function(d,e){d.editContainer=d.locate("editContainer");
d.editField=d.locate("edit");
if(d.editContainer.length!==1){if(d.editField.length===1){d.editContainer=d.editField
}else{if(d.editContainer.length>1){E.fail("InlineEdit did not find a unique container for selector "+d.options.selectors.editContainer+": "+E.dumpEl(d.editContainer))
}}}if(d.editContainer.length===1&&!d.editField){d.editField=d.locate("edit",d.editContainer)
}if(!e){return 
}var f=d.options.editModeRenderer(d);
if(f){d.editContainer=f.container;
d.editField=f.field
}if(d.editField.length===0){E.fail("InlineEdit improperly initialised - editField could not be located (selector "+d.options.selectors.edit+")")
}};
var F=function(d){d.editContainer.hide();
d.viewEl.show()
};
var T=function(d){if(d.isEditing()){d.editView.value(d.model.value);
F(d)
}};
var U=function(d){var e=d.editView.value();
var h=d.model.value;
var f=d.viewEl[0];
var i=d.editField[0];
var g=d.events.onFinishEdit.fire(e,h,i,f);
if(g===false){return 
}d.updateModelValue(e);
d.events.afterFinishEdit.fire(e,h,i,f);
F(d)
};
var c=function(d){if(d.options.submitOnEnter===undefined){d.options.submitOnEnter="textarea"!==E.unwrap(d.editField).nodeName.toLowerCase()
}function e(h){return h.keyCode?h.keyCode:(h.which?h.which:0)
}var f=function(h){var i=e(h);
if(i===C.ui.keyCode.ESCAPE){T(d);
return false
}};
var g=function(h){var i=e(h);
if(i!==C.ui.keyCode.ENTER){return true
}U(d);
d.viewEl.focus();
return false
};
if(d.options.submitOnEnter){d.editContainer.keypress(g)
}d.editContainer.keydown(f)
};
var B=function(d){if(d.options.blurHandlerBinder){d.options.blurHandlerBinder(d)
}else{var e=function(f){U(d);
return false
};
d.editField.blur(e)
}};
var O=function(e,d){if(!e.editInitialized){S(e,!e.options.lazyEditView||!d);
if(!e.options.lazyEditView||!d){e.editView=E.initSubcomponent(e,"editView",e.editField);
C.extend(true,e.editView,E.initSubcomponent(e,"editAccessor",e.editField));
c(e);
B(e);
e.editView.refreshView(e);
e.editInitialized=true
}}};
var M=function(d){O(d,false);
var f=d.viewEl;
var e=d.displayView.value();
d.updateModelValue(e===d.options.defaultViewText?"":e);
if(d.options.applyEditPadding){d.editField.width(Math.max(f.width()+d.options.paddings.edit,d.options.paddings.minimumEdit))
}f.removeClass(d.options.styles.invitation);
f.removeClass(d.options.styles.focus);
f.hide();
d.editContainer.show();
if(d.tooltipEnabled()){C("#"+d.options.tooltipId).hide()
}setTimeout(function(){d.editField.focus();
E.setCaretToEnd(d.editField[0],d.editView.value());
if(d.options.selectOnEdit){d.editField[0].select()
}},0);
d.events.afterBeginEdit.fire()
};
var I=function(d,f,e){d.removeClass(f);
d.css("padding-right",e)
};
var Z=function(d){d.displayView.value(d.options.defaultViewText);
d.viewEl.css("padding-right",d.existingPadding);
d.viewEl.addClass(d.options.styles.defaultViewStyle)
};
var L=function(d){d.displayView.value("");
if(C.browser.msie){if(d.viewEl.css("display")==="inline"){d.viewEl.css("display","inline-block")
}}};
var J=function(d){d.displayView.value(d.model.value);
I(d.viewEl,d.options.styles.defaultViewStyle,d.existingPadding)
};
var X=function(d,e){d.displayView.refreshView(d,e);
if(d.editView){d.editView.refreshView(d,e)
}};
var Q=function(d,e){d.model.value=e;
d.refreshView()
};
var W=function(f,d,g){if(f.model.value!==d){var e=C.extend(true,{},f.model);
f.model.value=d;
f.events.modelChanged.fire(f.model,e,g);
f.refreshView(g)
}};
var a=function(g,e){var d=function(h){g.addClass(e)
};
var f=function(h){g.removeClass(e)
};
g.hover(d,f)
};
var P=function(d){return function(){var e=d.events.onBeginEdit.fire();
if(e===false){return false
}M(d);
return true
}
};
function A(e){var d=E.unwrap(e.viewEl);
return function(g){var f=E.findAncestor(g.target,function(h){if(/input|select|textarea|button|a/i.test(h.nodeName)||h===d){return true
}});
if(f===d){e.edit();
return false
}}
}var K=function(d){a(d.viewEl,d.options.styles.invitation);
d.viewEl.click(A(d))
};
var R=function(h,f,d){var e=function(){h.addClass(f);
h.addClass(d)
};
var g=function(){h.removeClass(f);
h.removeClass(d)
};
h.focus(e);
h.blur(g)
};
var G=function(e){E.tabbable(e.viewEl);
var d=A(e);
E.activatable(e.viewEl,function(f){return d(f)
})
};
var V=function(d,e){d.attr("role","button")
};
var b=function(j){if(j.editContainer.length>0&&j.editField.length>0){return{container:j.editContainer,field:j.editField}
}var g="<span><input type='text' class='flc-inlineEdit-edit fl-inlineEdit-edit'/></span>";
var e=C(g);
var f=C("input",e);
var i=j.container.attr("id");
if(i){var d=i+"-edit-container";
var h=i+"-edit";
e.attr("id",d);
f.attr("id",h)
}j.viewEl.after(e);
return{container:e,field:f}
};
var N=function(e){var d=false;
e.events.onBeginEdit.addListener(function(){d=true
});
e.events.afterFinishEdit.addListener(function(){d=false
});
return function(){return d
}
};
var Y=function(f,g){var d=g.viewEl.css("padding-right");
g.existingPadding=d?parseFloat(d):0;
Q(g,g.displayView.value());
K(g);
G(g);
R(g.viewEl,g.options.styles.focus,g.options.styles.invitation);
V(g.viewEl);
if(g.editContainer){g.editContainer.hide()
}var e=function(){if(g.tooltipEnabled()){g.viewEl.tooltip({delay:g.options.tooltipDelay,extraClass:g.options.styles.tooltip,bodyHandler:function(){return g.options.tooltipText
},id:g.options.tooltipId})
}};
C(e);
g.decorators=E.initSubcomponents(g,"componentDecorators",[g,E.COMPONENT_OPTIONS])
};
var D=function(e,f){var d=[];
e.each(function(g,h){d.push(E.inlineEdit(C(h),f))
});
return d
};
E.inlineEdit=function(f,e){var d=E.initView("inlineEdit",f,e);
d.viewEl=d.locate("text");
d.displayView=E.initSubcomponent(d,"displayView",d.viewEl);
C.extend(true,d.displayView,E.initSubcomponent(d,"displayAccessor",d.viewEl));
d.model={value:""};
d.edit=P(d);
d.isEditing=N(d);
d.finish=function(){U(d)
};
d.cancel=function(){T(d)
};
d.tooltipEnabled=function(){return d.options.useTooltip&&C.fn.tooltip
};
d.refreshView=function(g){X(d,g)
};
d.updateModelValue=function(h,g){W(d,h,g)
};
d.updateModel=function(g,h){W(d,g.value,h)
};
O(d,true);
Y(f,d);
return d
};
E.inlineEdit.standardAccessor=function(f){var e=f.nodeName.toLowerCase();
var d="input"===e||"textarea"===e?"val":"text";
return{value:function(g){return C(f)[d](g)
}}
};
E.inlineEdit.richTextViewAccessor=function(d){return{value:function(e){return C(d).html(e)
}}
};
E.inlineEdit.standardDisplayView=function(e){var d={refreshView:function(f,g){if(f.model.value){J(f)
}else{if(f.options.defaultViewText){Z(f)
}else{L(f)
}}if((C.trim(f.viewEl.text()).length===0)&&(f.existingPadding<f.options.paddings.minimumView)){f.viewEl.css("padding-right",f.options.paddings.minimumView)
}}};
return d
};
E.inlineEdit.standardEditView=function(d){var e={refreshView:function(f,g){if(f.editField&&f.editField.index(g)===-1){f.editView.value(f.model.value)
}}};
C.extend(true,e,E.inlineEdit.standardAccessor(d));
return e
};
E.inlineEdits=function(g,h){h=h||{};
var d=C.extend({},E.defaults("inlineEdits").selectors,h.selectors);
var f=E.container(g);
var e=C(d.editables,f);
return D(e,h)
};
E.defaults("inlineEdit",{selectors:{text:".flc-inlineEdit-text",editContainer:".flc-inlineEdit-editContainer",edit:".flc-inlineEdit-edit"},styles:{text:"fl-inlineEdit-text",edit:"fl-inlineEdit-edit",invitation:"fl-inlineEdit-invitation",defaultViewStyle:"fl-inlineEdit-invitation-text",tooltip:"fl-inlineEdit-tooltip",focus:"fl-inlineEdit-focus"},events:{modelChanged:null,onBeginEdit:"preventable",afterBeginEdit:null,onFinishEdit:"preventable",afterFinishEdit:null,afterInitEdit:null},paddings:{edit:10,minimumEdit:80,minimumView:60},applyEditPadding:true,blurHandlerBinder:null,submitOnEnter:undefined,displayAccessor:{type:"fluid.inlineEdit.standardAccessor"},displayView:{type:"fluid.inlineEdit.standardDisplayView"},editAccessor:{type:"fluid.inlineEdit.standardAccessor"},editView:{type:"fluid.inlineEdit.standardEditView"},editModeRenderer:b,lazyEditView:false,defaultViewText:"Click here to edit",tooltipText:"Click item to edit",tooltipId:"tooltip",useTooltip:false,tooltipDelay:1000,selectOnEdit:false});
E.defaults("inlineEdits",{selectors:{editables:".flc-inlineEditable"}})
})(jQuery,fluid_1_1);