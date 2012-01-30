(function(B){B.fn.__bind__=B.fn.bind;
B.fn.__unbind__=B.fn.unbind;
B.fn.__find__=B.fn.find;
var A={version:"0.7.8",override:/keydown|keypress|keyup/g,triggersMap:{},specialKeys:{27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},newTrigger:function(C,F,D){var E={};
E[C]={};
E[C][F]={cb:D,disableInInput:false};
return E
}};
if(B.browser.mozilla){A.specialKeys=B.extend(A.specialKeys,{96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"})
}B.fn.find=function(C){this.query=C;
return B.fn.__find__.apply(this,arguments)
};
B.fn.unbind=function(E,G,D){if(B.isFunction(G)){D=G;
G=null
}if(G&&typeof G==="string"){var H=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
var F=E.split(" ");
for(var C=0;
C<F.length;
C++){delete A.triggersMap[H][F[C]][G]
}}return this.__unbind__(E,D)
};
B.fn.bind=function(J,F,K){var H=J.match(A.override);
if(B.isFunction(F)||!H){return this.__bind__(J,F,K)
}else{var N=null,I=B.trim(J.replace(A.override,""));
if(I){N=this.__bind__(I,F,K)
}if(typeof F==="string"){F={combi:F}
}if(F.combi){for(var M=0;
M<H.length;
M++){var E=H[M];
var G=F.combi.toLowerCase(),D=A.newTrigger(E,G,K),L=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
D[E][G].disableInInput=F.disableInInput;
if(!A.triggersMap[L]){A.triggersMap[L]=D
}else{if(!A.triggersMap[L][E]){A.triggersMap[L][E]=D[E]
}}var C=A.triggersMap[L][E][G];
if(!C){A.triggersMap[L][E][G]=[D[E][G]]
}else{if(C.constructor!==Array){A.triggersMap[L][E][G]=[C]
}else{A.triggersMap[L][E][G][C.length]=D[E][G]
}}this.each(function(){var O=B(this);
if(O.attr("hkId")&&O.attr("hkId")!==L){L=O.attr("hkId")+";"+L
}O.attr("hkId",L)
});
N=this.__bind__(H.join(" "),F,A.handler)
}}return N
}};
A.findElement=function(C){if(!B(C).attr("hkId")){if(B.browser.opera||B.browser.safari){while(!B(C).attr("hkId")&&C.parentNode){C=C.parentNode
}}}return C
};
A.handler=function(S){var M=A.findElement(S.currentTarget),H=B(M),N=H.attr("hkId");
if(N){N=N.split(";");
var E=S.which,P=S.type,O=A.specialKeys[E],L=!O&&String.fromCharCode(E).toLowerCase(),G=S.shiftKey,F=S.ctrlKey,D=S.altKey||S.originalEvent.altKey,C=null;
for(var Q=0;
Q<N.length;
Q++){if(A.triggersMap[N[Q]][P]){C=A.triggersMap[N[Q]][P];
break
}}if(C){var I;
if(!G&&!F&&!D){I=C[O]||(L&&C[L])
}else{var K="";
if(D){K+="alt+"
}if(F){K+="ctrl+"
}if(G){K+="shift+"
}I=C[K+O];
if(!I){if(L){I=C[K+L]||C[K+A.shiftNums[L]]||(K==="shift+"&&C[A.shiftNums[L]])
}}}if(I){var R=false;
for(var Q=0;
Q<I.length;
Q++){if(I[Q].disableInInput){var J=B(S.target);
if(H.is("input")||H.is("textarea")||J.is("input")||J.is("textarea")){return true
}}R=R||I[Q].cb.apply(this,[S])
}return R
}}}};
window.hotkeys=A;
return B
})(jQuery);