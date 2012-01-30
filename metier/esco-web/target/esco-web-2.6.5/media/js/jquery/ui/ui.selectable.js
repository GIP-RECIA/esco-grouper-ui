(function(B){B.widget("ui.selectable",B.extend({},B.ui.mouse,{_init:function(){var D=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var A;
this.refresh=function(){A=B(D.options.filter,D.element[0]);
A.each(function(){var F=B(this);
var C=F.offset();
B.data(this,"selectable-item",{element:this,$element:F,left:C.left,top:C.top,right:C.left+F.outerWidth(),bottom:C.top+F.outerHeight(),startselected:false,selected:F.hasClass("ui-selected"),selecting:F.hasClass("ui-selecting"),unselecting:F.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=A.addClass("ui-selectee");
this._mouseInit();
this.helper=B(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")
},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy()
},_mouseStart:function(E){var A=this;
this.opos=[E.pageX,E.pageY];
if(this.options.disabled){return 
}var F=this.options;
this.selectees=B(F.filter,this.element[0]);
this._trigger("start",E);
B(F.appendTo).append(this.helper);
this.helper.css({"z-index":100,position:"absolute",left:E.clientX,top:E.clientY,width:0,height:0});
if(F.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var C=B.data(this,"selectable-item");
C.startselected=true;
if(!E.metaKey){C.$element.removeClass("ui-selected");
C.selected=false;
C.$element.addClass("ui-unselecting");
C.unselecting=true;
A._trigger("unselecting",E,{unselecting:C.element})
}});
B(E.target).parents().andSelf().each(function(){var C=B.data(this,"selectable-item");
if(C){C.$element.removeClass("ui-unselecting").addClass("ui-selecting");
C.unselecting=false;
C.selecting=true;
C.selected=true;
A._trigger("selecting",E,{selecting:C.element});
return false
}})
},_mouseDrag:function(K){var N=this;
this.dragged=true;
if(this.options.disabled){return 
}var O=this.options;
var M=this.opos[0],A=this.opos[1],P=K.pageX,J=K.pageY;
if(M>P){var L=P;
P=M;
M=L
}if(A>J){var L=J;
J=A;
A=L
}this.helper.css({left:M,top:A,width:P-M,height:J-A});
this.selectees.each(function(){var D=B.data(this,"selectable-item");
if(!D||D.element==N.element[0]){return 
}var C=false;
if(O.tolerance=="touch"){C=(!(D.left>P||D.right<M||D.top>J||D.bottom<A))
}else{if(O.tolerance=="fit"){C=(D.left>M&&D.right<P&&D.top>A&&D.bottom<J)
}}if(C){if(D.selected){D.$element.removeClass("ui-selected");
D.selected=false
}if(D.unselecting){D.$element.removeClass("ui-unselecting");
D.unselecting=false
}if(!D.selecting){D.$element.addClass("ui-selecting");
D.selecting=true;
N._trigger("selecting",K,{selecting:D.element})
}}else{if(D.selecting){if(K.metaKey&&D.startselected){D.$element.removeClass("ui-selecting");
D.selecting=false;
D.$element.addClass("ui-selected");
D.selected=true
}else{D.$element.removeClass("ui-selecting");
D.selecting=false;
if(D.startselected){D.$element.addClass("ui-unselecting");
D.unselecting=true
}N._trigger("unselecting",K,{unselecting:D.element})
}}if(D.selected){if(!K.metaKey&&!D.startselected){D.$element.removeClass("ui-selected");
D.selected=false;
D.$element.addClass("ui-unselecting");
D.unselecting=true;
N._trigger("unselecting",K,{unselecting:D.element})
}}}});
return false
},_mouseStop:function(E){var A=this;
this.dragged=false;
var F=this.options;
B(".ui-unselecting",this.element[0]).each(function(){var C=B.data(this,"selectable-item");
C.$element.removeClass("ui-unselecting");
C.unselecting=false;
C.startselected=false;
A._trigger("unselected",E,{unselected:C.element})
});
B(".ui-selecting",this.element[0]).each(function(){var C=B.data(this,"selectable-item");
C.$element.removeClass("ui-selecting").addClass("ui-selected");
C.selecting=false;
C.selected=true;
C.startselected=true;
A._trigger("selected",E,{selected:C.element})
});
this._trigger("stop",E);
this.helper.remove();
return false
}}));
B.extend(B.ui.selectable,{version:"1.7.2",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})
})(jQuery);