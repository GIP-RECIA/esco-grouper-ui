(function(A){A.widget("ui.selectable",A.extend({},A.ui.mouse,{_init:function(){var B=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var C;
this.refresh=function(){C=A(B.options.filter,B.element[0]);
C.each(function(){var D=A(this);
var E=D.offset();
A.data(this,"selectable-item",{element:this,$element:D,left:E.left,top:E.top,right:E.left+D.outerWidth(),bottom:E.top+D.outerHeight(),startselected:false,selected:D.hasClass("ui-selected"),selecting:D.hasClass("ui-selecting"),unselecting:D.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=C.addClass("ui-selectee");
this._mouseInit();
this.helper=A(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")
},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy()
},_mouseStart:function(C){var D=this;
this.opos=[C.pageX,C.pageY];
if(this.options.disabled){return 
}var B=this.options;
this.selectees=A(B.filter,this.element[0]);
this._trigger("start",C);
A(B.appendTo).append(this.helper);
this.helper.css({"z-index":100,position:"absolute",left:C.clientX,top:C.clientY,width:0,height:0});
if(B.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var E=A.data(this,"selectable-item");
E.startselected=true;
if(!C.metaKey){E.$element.removeClass("ui-selected");
E.selected=false;
E.$element.addClass("ui-unselecting");
E.unselecting=true;
D._trigger("unselecting",C,{unselecting:E.element})
}});
A(C.target).parents().andSelf().each(function(){var E=A.data(this,"selectable-item");
if(E){E.$element.removeClass("ui-unselecting").addClass("ui-selecting");
E.unselecting=false;
E.selecting=true;
E.selected=true;
D._trigger("selecting",C,{selecting:E.element});
return false
}})
},_mouseDrag:function(G){var D=this;
this.dragged=true;
if(this.options.disabled){return 
}var C=this.options;
var E=this.opos[0],I=this.opos[1],B=G.pageX,H=G.pageY;
if(E>B){var F=B;
B=E;
E=F
}if(I>H){var F=H;
H=I;
I=F
}this.helper.css({left:E,top:I,width:B-E,height:H-I});
this.selectees.each(function(){var J=A.data(this,"selectable-item");
if(!J||J.element==D.element[0]){return 
}var K=false;
if(C.tolerance=="touch"){K=(!(J.left>B||J.right<E||J.top>H||J.bottom<I))
}else{if(C.tolerance=="fit"){K=(J.left>E&&J.right<B&&J.top>I&&J.bottom<H)
}}if(K){if(J.selected){J.$element.removeClass("ui-selected");
J.selected=false
}if(J.unselecting){J.$element.removeClass("ui-unselecting");
J.unselecting=false
}if(!J.selecting){J.$element.addClass("ui-selecting");
J.selecting=true;
D._trigger("selecting",G,{selecting:J.element})
}}else{if(J.selecting){if(G.metaKey&&J.startselected){J.$element.removeClass("ui-selecting");
J.selecting=false;
J.$element.addClass("ui-selected");
J.selected=true
}else{J.$element.removeClass("ui-selecting");
J.selecting=false;
if(J.startselected){J.$element.addClass("ui-unselecting");
J.unselecting=true
}D._trigger("unselecting",G,{unselecting:J.element})
}}if(J.selected){if(!G.metaKey&&!J.startselected){J.$element.removeClass("ui-selected");
J.selected=false;
J.$element.addClass("ui-unselecting");
J.unselecting=true;
D._trigger("unselecting",G,{unselecting:J.element})
}}}});
return false
},_mouseStop:function(C){var D=this;
this.dragged=false;
var B=this.options;
A(".ui-unselecting",this.element[0]).each(function(){var E=A.data(this,"selectable-item");
E.$element.removeClass("ui-unselecting");
E.unselecting=false;
E.startselected=false;
D._trigger("unselected",C,{unselected:E.element})
});
A(".ui-selecting",this.element[0]).each(function(){var E=A.data(this,"selectable-item");
E.$element.removeClass("ui-selecting").addClass("ui-selected");
E.selecting=false;
E.selected=true;
E.startselected=true;
D._trigger("selected",C,{selected:E.element})
});
this._trigger("stop",C);
this.helper.remove();
return false
}}));
A.extend(A.ui.selectable,{version:"1.7.2",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})
})(jQuery);