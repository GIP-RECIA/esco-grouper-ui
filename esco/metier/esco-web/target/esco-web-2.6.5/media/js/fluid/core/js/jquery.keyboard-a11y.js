var fluid_1_1=fluid_1_1||{};
var fluid=fluid||fluid_1_1;
(function(R,N){N.thatistBridge=function(m,l){var n=function(o){var q=o.split(".");
var p=l;
for(var t=0;
t<q.length;
++t){p=p[q[t]]
}var s=[this];
if(arguments.length===2){s=s.concat(R.makeArray(arguments[1]))
}var r=p.apply(null,s);
this.that=function(){return r
};
var u=typeof (r);
return !r||u==="string"||u==="number"||u==="boolean"||r&&r.length!==undefined?r:this
};
R.fn[m]=n;
return n
};
N.thatistBridge("fluid",N);
N.thatistBridge("fluid_1_1",fluid_1_1);
var h="fluid-keyboard-a11y";
var H=function(l,m){var n=R(l).data(h);
return n?n[m]:undefined
};
var J=function(l,m,n){R(l).each(function(){var o=R.data(this,h)||{};
o[m]=n;
R.data(this,h,o)
})
};
var K="disabled";
if(R.event.special.focusin){K=null;
R(document).bind("focusin",function(l){K=l.target
})
}N.getLastFocusedElement=function(){if(K==="disabled"){N.fail("Focus manager not enabled - please include jquery.delegate.js or equivalent for support of 'focusin' event")
}return K
};
var g=function(){return R.browser.msie?"tabIndex":"tabindex"
};
var S=function(l){if(l.length<=0){return false
}return R(l[0]).is("a, input, button, select, area, textarea, object")
};
var V=function(m){if(m.length<=0){return undefined
}if(!N.tabindex.hasAttr(m)){return S(m)?Number(0):undefined
}var l=m.attr(g());
return Number(l)
};
var T=function(l,m){return l.each(function(n,o){R(o).attr(g(),m)
})
};
N.tabindex=function(m,l){m=R(m);
if(l!==null&&l!==undefined){return T(m,l)
}else{return V(m)
}};
N.tabindex.remove=function(l){l=R(l);
return l.each(function(m,n){R(n).removeAttr(g())
})
};
N.tabindex.hasAttr=function(m){m=R(m);
if(m.length<=0){return false
}var l=m.map(function(){var n=this.getAttributeNode(g());
return n?n.specified:false
});
return l.length===1?l[0]:l
};
N.tabindex.has=function(l){l=R(l);
return N.tabindex.hasAttr(l)||S(l)
};
var E="enablement";
N.enabled=function(m,l){m=R(m);
if(l===undefined){return H(m,E)!==false
}else{R("*",m).each(function(){if(H(this,E)!==undefined){J(this,E,l)
}else{if(/select|textarea|input/i.test(this.nodeName)){R(this).attr("disabled",!l)
}}});
J(m,E,l)
}};
N.a11y=R.a11y||{};
N.a11y.orientation={HORIZONTAL:0,VERTICAL:1,BOTH:2};
var B={next:R.ui.keyCode.DOWN,previous:R.ui.keyCode.UP};
var O={next:R.ui.keyCode.RIGHT,previous:R.ui.keyCode.LEFT};
var k=function(l){return l.jquery?l[0]:l
};
var L=function(l){l.each(function(m,n){n=R(n);
if(!n.fluid("tabindex.has")||n.fluid("tabindex")<0){n.fluid("tabindex",0)
}})
};
N.tabbable=function(l){l=R(l);
L(l)
};
var b="selectionContext";
var Z=-32768;
var I=function(l){if(l.options.onLeaveContainer){l.options.onLeaveContainer(l.selectables[l.activeItemIndex])
}else{if(l.options.onUnselect){l.options.onUnselect(l.selectables[l.activeItemIndex])
}}if(!l.options.rememberSelectionState){l.activeItemIndex=Z
}};
var D=function(l,m){if(m){m(l)
}};
var U=function(m,l){if(l&&m){l(m)
}};
var G=function(m,l){U(m,l.options.onUnselect)
};
var Q=function(m,n){G(n.selectedElement(),n);
m=k(m);
var l=n.selectables.index(m);
if(l===-1){return 
}n.activeItemIndex=l;
D(m,n.options.onSelect)
};
var e=function(l){return function(m){Q(m.target,l);
return m.stopPropagation()
}
};
var P=function(l){return function(m){G(m.target,l);
return m.stopPropagation()
}
};
var i=function(l){var m=l.selectables;
if(l.activeItemIndex>=m.length){l.activeItemIndex=0
}if(l.activeItemIndex<0&&l.activeItemIndex!==Z){l.activeItemIndex=m.length-1
}if(l.activeItemIndex>=0){R(m[l.activeItemIndex]).focus()
}};
var A=function(l){G(l.selectedElement(),l);
if(l.activeItemIndex===Z){l.activeItemIndex=-1
}};
var M=function(l){A(l);
++l.activeItemIndex;
i(l)
};
var C=function(l){A(l);
--l.activeItemIndex;
i(l)
};
var X=function(m,l,n){return function(o){if(o.which===l.next){M(m);
o.preventDefault()
}else{if(o.which===l.previous){C(m);
o.preventDefault()
}}}
};
var c=function(l){var m;
if(l===N.a11y.orientation.HORIZONTAL){m=O
}else{if(l===N.a11y.orientation.VERTICAL){m=B
}}return m
};
var f=function(l){return function(m){if(m.which!==R.ui.keyCode.TAB){return 
}I(l);
if(m.shiftKey){l.focusIsLeavingContainer=true
}}
};
var W=function(l){return function(n){var m=l.options.autoSelectFirstItem;
var o=typeof (m)==="function"?m():m;
if(l.focusIsLeavingContainer){o=false
}if(o&&n.target===l.container.get(0)){if(l.activeItemIndex===Z){l.activeItemIndex=0
}R(l.selectables[l.activeItemIndex]).focus()
}return n.stopPropagation()
}
};
var j=function(l){return function(m){l.focusIsLeavingContainer=false;
return m.stopPropagation()
}
};
var Y=function(r,n,o){var l=R.extend(true,{},n,o);
var p=c(l.direction);
var q=l.selectableElements?l.selectableElements:r.find(l.selectableSelector);
var m={container:r,activeItemIndex:Z,selectables:q,focusIsLeavingContainer:false,options:l};
m.selectablesUpdated=function(s){if(typeof (m.options.selectablesTabindex)==="number"){m.selectables.fluid("tabindex",m.options.selectablesTabindex)
}m.selectables.unbind("focus."+h);
m.selectables.unbind("blur."+h);
m.selectables.bind("focus."+h,e(m));
m.selectables.bind("blur."+h,P(m));
if(s){Q(s,m)
}else{i(m)
}};
m.refresh=function(){if(!m.options.selectableSelector){throw ("Cannot refresh selectable context which was not initialised by a selector")
}m.selectables=r.find(l.selectableSelector);
m.selectablesUpdated()
};
m.selectedElement=function(){return m.activeItemIndex<0?null:m.selectables[m.activeItemIndex]
};
if(p){r.keydown(X(m,p))
}r.keydown(f(m));
r.focus(W(m));
r.blur(j(m));
m.selectablesUpdated();
return m
};
N.selectable=function(l,m){l=R(l);
var n=Y(l,N.selectable.defaults,m);
J(l,b,n);
return n
};
N.selectable.select=function(m,l){R(l).focus()
};
N.selectable.selectNext=function(l){l=R(l);
M(H(l,b))
};
N.selectable.selectPrevious=function(l){l=R(l);
C(H(l,b))
};
N.selectable.currentSelection=function(m){m=R(m);
var l=H(m,b);
return R(l.selectedElement())
};
N.selectable.defaults={direction:N.a11y.orientation.VERTICAL,selectablesTabindex:-1,autoSelectFirstItem:true,rememberSelectionState:true,selectableSelector:".selectable",selectableElements:null,onSelect:null,onUnselect:null,onLeaveContainer:null};
var F=function(o,q){if(!o.modifier){return true
}var l=o.modifier;
var m=l&&q.ctrlKey;
var p=l&&q.altKey;
var n=l&&q.shiftKey;
return m||p||n
};
var d=function(l){return function(o){var n=o.target;
if(!N.enabled(o.target)){return 
}var m=o.which?o.which:o.keyCode;
if(m===l.key&&l.activateHandler&&F(l,o)){var p=R.Event("fluid-activate");
R(o.target).trigger(p,[l.activateHandler]);
if(p.isDefaultPrevented()){o.preventDefault()
}}}
};
var a=function(m,p,q,r){var o=[];
R(q).each(function(s,t){o.push({modifier:null,key:t,activateHandler:p})
});
if(r&&r.additionalBindings){o=o.concat(r.additionalBindings)
}J(m,E,true);
for(var l=0;
l<o.length;
++l){var n=o[l];
m.keydown(d(n))
}m.bind("fluid-activate",function(s,t){t=t||p;
return t?t(s):null
})
};
N.activatable=function(l,n,m){l=R(l);
a(l,n,N.activatable.defaults.keys,m)
};
N.activate=function(l){R(l).trigger("fluid-activate")
};
N.activatable.defaults={keys:[R.ui.keyCode.ENTER,R.ui.keyCode.SPACE]}
})(jQuery,fluid_1_1);