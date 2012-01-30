(function(D){D.fn.__bind__=D.fn.bind;
D.fn.__unbind__=D.fn.unbind;
D.fn.__find__=D.fn.find;
var C={version:"0.7.8",override:/keydown|keypress|keyup/g,triggersMap:{},specialKeys:{27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},newTrigger:function(H,A,G){var B={};
B[H]={};
B[H][A]={cb:G,disableInInput:false};
return B
}};
if(D.browser.mozilla){C.specialKeys=D.extend(C.specialKeys,{96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"})
}D.fn.find=function(A){this.query=A;
return D.fn.__find__.apply(this,arguments)
};
D.fn.unbind=function(J,B,K){if(D.isFunction(B)){K=B;
B=null
}if(B&&typeof B==="string"){var A=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
var I=J.split(" ");
for(var L=0;
L<I.length;
L++){delete C.triggersMap[A][I[L]][B]
}}return this.__unbind__(J,K)
};
D.fn.bind=function(S,W,R){var U=S.match(C.override);
if(D.isFunction(W)||!U){return this.__bind__(S,W,R)
}else{var O=null,T=D.trim(S.replace(C.override,""));
if(T){O=this.__bind__(T,W,R)
}if(typeof W==="string"){W={combi:W}
}if(W.combi){for(var P=0;
P<U.length;
P++){var X=U[P];
var V=W.combi.toLowerCase(),A=C.newTrigger(X,V,R),Q=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
A[X][V].disableInInput=W.disableInInput;
if(!C.triggersMap[Q]){C.triggersMap[Q]=A
}else{if(!C.triggersMap[Q][X]){C.triggersMap[Q][X]=A[X]
}}var B=C.triggersMap[Q][X][V];
if(!B){C.triggersMap[Q][X][V]=[A[X][V]]
}else{if(B.constructor!==Array){C.triggersMap[Q][X][V]=[B]
}else{C.triggersMap[Q][X][V][B.length]=A[X][V]
}}this.each(function(){var E=D(this);
if(E.attr("hkId")&&E.attr("hkId")!==Q){Q=E.attr("hkId")+";"+Q
}E.attr("hkId",Q)
});
O=this.__bind__(U.join(" "),W,C.handler)
}}return O
}};
C.findElement=function(A){if(!D(A).attr("hkId")){if(D.browser.opera||D.browser.safari){while(!D(A).attr("hkId")&&A.parentNode){A=A.parentNode
}}}return A
};
C.handler=function(T){var Z=C.findElement(T.currentTarget),e=D(Z),Y=e.attr("hkId");
if(Y){Y=Y.split(";");
var h=T.which,W=T.type,X=C.specialKeys[h],a=!X&&String.fromCharCode(h).toLowerCase(),f=T.shiftKey,g=T.ctrlKey,A=T.altKey||T.originalEvent.altKey,B=null;
for(var V=0;
V<Y.length;
V++){if(C.triggersMap[Y[V]][W]){B=C.triggersMap[Y[V]][W];
break
}}if(B){var d;
if(!f&&!g&&!A){d=B[X]||(a&&B[a])
}else{var b="";
if(A){b+="alt+"
}if(g){b+="ctrl+"
}if(f){b+="shift+"
}d=B[b+X];
if(!d){if(a){d=B[b+a]||B[b+C.shiftNums[a]]||(b==="shift+"&&B[C.shiftNums[a]])
}}}if(d){var U=false;
for(var V=0;
V<d.length;
V++){if(d[V].disableInInput){var c=D(T.target);
if(e.is("input")||e.is("textarea")||c.is("input")||c.is("textarea")){return true
}}U=U||d[V].cb.apply(this,[T])
}return U
}}}};
window.hotkeys=C;
return D
})(jQuery);