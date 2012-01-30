var fluid_1_1=fluid_1_1||{};
var fluid=fluid||fluid_1_1;
(function(t,x){x.thatistBridge=function(A,B){var C=function(J){var H=J.split(".");
var I=B;
for(var E=0;
E<H.length;
++E){I=I[H[E]]
}var F=[this];
if(arguments.length===2){F=F.concat(t.makeArray(arguments[1]))
}var G=I.apply(null,F);
this.that=function(){return G
};
var D=typeof (G);
return !G||D==="string"||D==="number"||D==="boolean"||G&&G.length!==undefined?G:this
};
t.fn[A]=C;
return C
};
x.thatistBridge("fluid",x);
x.thatistBridge("fluid_1_1",fluid_1_1);
var AO="fluid-keyboard-a11y";
var AD=function(B,A){var C=t(B).data(AO);
return C?C[A]:undefined
};
var AB=function(B,A,C){t(B).each(function(){var D=t.data(this,AO)||{};
D[A]=C;
t.data(this,AO,D)
})
};
var AA="disabled";
if(t.event.special.focusin){AA=null;
t(document).bind("focusin",function(A){AA=A.target
})
}x.getLastFocusedElement=function(){if(AA==="disabled"){x.fail("Focus manager not enabled - please include jquery.delegate.js or equivalent for support of 'focusin' event")
}return AA
};
var AP=function(){return t.browser.msie?"tabIndex":"tabindex"
};
var s=function(A){if(A.length<=0){return false
}return t(A[0]).is("a, input, button, select, area, textarea, object")
};
var p=function(A){if(A.length<=0){return undefined
}if(!x.tabindex.hasAttr(A)){return s(A)?Number(0):undefined
}var B=A.attr(AP());
return Number(B)
};
var r=function(B,A){return B.each(function(D,C){t(C).attr(AP(),A)
})
};
x.tabindex=function(A,B){A=t(A);
if(B!==null&&B!==undefined){return r(A,B)
}else{return p(A)
}};
x.tabindex.remove=function(A){A=t(A);
return A.each(function(B,C){t(C).removeAttr(AP())
})
};
x.tabindex.hasAttr=function(A){A=t(A);
if(A.length<=0){return false
}var B=A.map(function(){var C=this.getAttributeNode(AP());
return C?C.specified:false
});
return B.length===1?B[0]:B
};
x.tabindex.has=function(A){A=t(A);
return x.tabindex.hasAttr(A)||s(A)
};
var AG="enablement";
x.enabled=function(A,B){A=t(A);
if(B===undefined){return AD(A,AG)!==false
}else{t("*",A).each(function(){if(AD(this,AG)!==undefined){AB(this,AG,B)
}else{if(/select|textarea|input/i.test(this.nodeName)){t(this).attr("disabled",!B)
}}});
AB(A,AG,B)
}};
x.a11y=t.a11y||{};
x.a11y.orientation={HORIZONTAL:0,VERTICAL:1,BOTH:2};
var AJ={next:t.ui.keyCode.DOWN,previous:t.ui.keyCode.UP};
var w={next:t.ui.keyCode.RIGHT,previous:t.ui.keyCode.LEFT};
var AL=function(A){return A.jquery?A[0]:A
};
var z=function(A){A.each(function(B,C){C=t(C);
if(!C.fluid("tabindex.has")||C.fluid("tabindex")<0){C.fluid("tabindex",0)
}})
};
x.tabbable=function(A){A=t(A);
z(A)
};
var AU="selectionContext";
var l=-32768;
var AC=function(A){if(A.options.onLeaveContainer){A.options.onLeaveContainer(A.selectables[A.activeItemIndex])
}else{if(A.options.onUnselect){A.options.onUnselect(A.selectables[A.activeItemIndex])
}}if(!A.options.rememberSelectionState){A.activeItemIndex=l
}};
var AH=function(B,A){if(A){A(B)
}};
var q=function(A,B){if(B&&A){B(A)
}};
var AE=function(A,B){q(A,B.options.onUnselect)
};
var u=function(A,C){AE(C.selectedElement(),C);
A=AL(A);
var B=C.selectables.index(A);
if(B===-1){return 
}C.activeItemIndex=B;
AH(A,C.options.onSelect)
};
var AR=function(A){return function(B){u(B.target,A);
return B.stopPropagation()
}
};
var v=function(A){return function(B){AE(B.target,A);
return B.stopPropagation()
}
};
var AN=function(B){var A=B.selectables;
if(B.activeItemIndex>=A.length){B.activeItemIndex=0
}if(B.activeItemIndex<0&&B.activeItemIndex!==l){B.activeItemIndex=A.length-1
}if(B.activeItemIndex>=0){t(A[B.activeItemIndex]).focus()
}};
var AK=function(A){AE(A.selectedElement(),A);
if(A.activeItemIndex===l){A.activeItemIndex=-1
}};
var y=function(A){AK(A);
++A.activeItemIndex;
AN(A)
};
var AI=function(A){AK(A);
--A.activeItemIndex;
AN(A)
};
var n=function(A,B,C){return function(D){if(D.which===B.next){y(A);
D.preventDefault()
}else{if(D.which===B.previous){AI(A);
D.preventDefault()
}}}
};
var AT=function(B){var A;
if(B===x.a11y.orientation.HORIZONTAL){A=w
}else{if(B===x.a11y.orientation.VERTICAL){A=AJ
}}return A
};
var AQ=function(A){return function(B){if(B.which!==t.ui.keyCode.TAB){return 
}AC(A);
if(B.shiftKey){A.focusIsLeavingContainer=true
}}
};
var o=function(A){return function(D){var B=A.options.autoSelectFirstItem;
var C=typeof (B)==="function"?B():B;
if(A.focusIsLeavingContainer){C=false
}if(C&&D.target===A.container.get(0)){if(A.activeItemIndex===l){A.activeItemIndex=0
}t(A.selectables[A.activeItemIndex]).focus()
}return D.stopPropagation()
}
};
var AM=function(A){return function(B){A.focusIsLeavingContainer=false;
return B.stopPropagation()
}
};
var m=function(C,G,F){var B=t.extend(true,{},G,F);
var E=AT(B.direction);
var D=B.selectableElements?B.selectableElements:C.find(B.selectableSelector);
var A={container:C,activeItemIndex:l,selectables:D,focusIsLeavingContainer:false,options:B};
A.selectablesUpdated=function(H){if(typeof (A.options.selectablesTabindex)==="number"){A.selectables.fluid("tabindex",A.options.selectablesTabindex)
}A.selectables.unbind("focus."+AO);
A.selectables.unbind("blur."+AO);
A.selectables.bind("focus."+AO,AR(A));
A.selectables.bind("blur."+AO,v(A));
if(H){u(H,A)
}else{AN(A)
}};
A.refresh=function(){if(!A.options.selectableSelector){throw ("Cannot refresh selectable context which was not initialised by a selector")
}A.selectables=C.find(B.selectableSelector);
A.selectablesUpdated()
};
A.selectedElement=function(){return A.activeItemIndex<0?null:A.selectables[A.activeItemIndex]
};
if(E){C.keydown(n(A,E))
}C.keydown(AQ(A));
C.focus(o(A));
C.blur(AM(A));
A.selectablesUpdated();
return A
};
x.selectable=function(B,A){B=t(B);
var C=m(B,x.selectable.defaults,A);
AB(B,AU,C);
return C
};
x.selectable.select=function(A,B){t(B).focus()
};
x.selectable.selectNext=function(A){A=t(A);
y(AD(A,AU))
};
x.selectable.selectPrevious=function(A){A=t(A);
AI(AD(A,AU))
};
x.selectable.currentSelection=function(A){A=t(A);
var B=AD(A,AU);
return t(B.selectedElement())
};
x.selectable.defaults={direction:x.a11y.orientation.VERTICAL,selectablesTabindex:-1,autoSelectFirstItem:true,rememberSelectionState:true,selectableSelector:".selectable",selectableElements:null,onSelect:null,onUnselect:null,onLeaveContainer:null};
var AF=function(E,C){if(!E.modifier){return true
}var B=E.modifier;
var A=B&&C.ctrlKey;
var D=B&&C.altKey;
var F=B&&C.shiftKey;
return A||D||F
};
var AS=function(A){return function(D){var E=D.target;
if(!x.enabled(D.target)){return 
}var B=D.which?D.which:D.keyCode;
if(B===A.key&&A.activateHandler&&AF(A,D)){var C=t.Event("fluid-activate");
t(D.target).trigger(C,[A.activateHandler]);
if(C.isDefaultPrevented()){D.preventDefault()
}}}
};
var AV=function(A,E,D,C){var F=[];
t(D).each(function(I,H){F.push({modifier:null,key:H,activateHandler:E})
});
if(C&&C.additionalBindings){F=F.concat(C.additionalBindings)
}AB(A,AG,true);
for(var B=0;
B<F.length;
++B){var G=F[B];
A.keydown(AS(G))
}A.bind("fluid-activate",function(I,H){H=H||E;
return H?H(I):null
})
};
x.activatable=function(B,C,A){B=t(B);
AV(B,C,x.activatable.defaults.keys,A)
};
x.activate=function(A){t(A).trigger("fluid-activate")
};
x.activatable.defaults={keys:[t.ui.keyCode.ENTER,t.ui.keyCode.SPACE]}
})(jQuery,fluid_1_1);