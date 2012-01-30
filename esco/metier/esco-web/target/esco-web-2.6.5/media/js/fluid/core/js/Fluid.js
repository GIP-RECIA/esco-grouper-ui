var fluid_1_1=fluid_1_1||{};
var fluid=fluid||fluid_1_1;
(function(I,J){J.version="Infusion 1.1";
J.fail=function(A){J.setLogging(true);
J.log(A.message?A.message:A);
throw new Error(A)
};
J.wrap=function(A){return((!A||A.jquery)?A:I(A))
};
J.unwrap=function(A){return A&&A.jquery&&A.length===1?A[0]:A
};
J.keyForValue=function(B,C){for(var A in B){if(B[A]===C){return A
}}return null
};
J.findKeyInObject=J.keyForValue;
J.clear=function(A){if(A instanceof Array){A.length=0
}else{for(var B in A){delete A[B]
}}};
J.container=function(A){var B=A;
if(typeof A==="string"||A.nodeType&&(A.nodeType===1||A.nodeType===9)){B=I(A)
}if(!B||!B.jquery||B.length!==1){if(typeof (A)!=="string"){A=B.selector
}J.fail({name:"NotOne",message:"A single container element was not found for selector "+A})
}return B
};
var L={};
var M={};
J.defaults=function(){var C=0;
var A=L;
if(typeof arguments[0]==="boolean"){A=M;
C=1
}var B=arguments[C];
var D=arguments[C+1];
if(D!==undefined){A[B]=D;
return D
}return A[B]
};
J.createDomBinder=function(F,D){var E={},C={};
function B(G,P){return I.data(J.unwrap(P))+"-"+G
}function A(G,Q,R){E[B(G,Q)]=R
}C.locate=function(T,G){var V,U,S;
V=D[T];
U=G?G:F;
if(!U){J.fail("DOM binder invoked for selector "+T+" without container")
}if(!V){return U
}if(typeof (V)==="function"){S=I(V.call(null,J.unwrap(U)))
}else{S=I(V,U)
}if(S.get(0)===document){S=[]
}if(!S.selector){S.selector=V;
S.context=U
}S.selectorName=T;
A(T,U,S);
return S
};
C.fastLocate=function(U,G){var V=G?G:F;
var T=B(U,V);
var S=E[T];
return S?S:C.locate(U,G)
};
C.clear=function(){E={}
};
C.refresh=function(S,G){var U=G?G:F;
if(typeof S==="string"){S=[S]
}if(U.length===undefined){U=[U]
}for(var T=0;
T<S.length;
++T){for(var V=0;
V<U.length;
++V){C.locate(S[T],U[V])
}}};
return C
};
J.mergeListeners=function(D,E){if(E){for(var A in E){var P=E[A];
var G=A.indexOf(".");
var B;
if(G!==-1){B=A.substring(G+1);
A=A.substring(0,G)
}if(!D[A]){D[A]=J.event.getEventFirer()
}var C=D[A];
if(typeof (P)==="function"){C.addListener(P,B)
}else{if(P&&typeof P.length==="number"){for(var F=0;
F<P.length;
++F){C.addListener(P[F],B)
}}}}}};
J.instantiateFirers=function(C,B){C.events={};
if(B.events){for(var D in B.events){var A=B.events[D];
C.events[D]=J.event.getEventFirer(A==="unicast",A==="preventable")
}}J.mergeListeners(C.events,B.listeners)
};
J.mergeComponentOptions=function(A,B,C){var D=J.defaults(B);
A.options=J.merge(D?D.mergePolicy:null,{},D,C)
};
J.expectFilledSelector=function(B,A){if(B&&B.length===0&&B.jquery){J.fail(A+': selector "'+B.selector+'" with name '+B.selectorName+" returned no results in context "+J.dumpEl(B.context))
}};
J.initView=function(A,B,C){var D={};
J.expectFilledSelector(B,'Error instantiating component with name "'+A);
J.mergeComponentOptions(D,A,C);
if(B){D.container=J.container(B);
J.initDomBinder(D)
}J.instantiateFirers(D,D.options);
return D
};
J.COMPONENT_OPTIONS={};
J.VALUE={};
J.emptySubcomponent=function(A){var B={};
A=I.makeArray(A);
for(var C=0;
C<A.length;
++C){B[A[C]]=function(){}
}return B
};
J.initSubcomponent=function(B,C,A){return J.initSubcomponents(B,C,A)[0]
};
J.initSubcomponents=function(S,G,F){var E=S.options[G];
if(!E){return 
}var T=I.makeArray(E);
var D=-1;
var A=[];
F=I.makeArray(F);
for(var U=0;
U<F.length;
++U){if(F[U]===J.COMPONENT_OPTIONS){D=U
}}for(U=0;
U<T.length;
++U){E=T[U];
if(D!==-1&&E.options){F[D]=E.options
}if(typeof (E)!=="function"){var V=typeof (E)==="string"?E:E.type;
var C=J.defaults(true,V);
J.merge("reverse",S.options,C);
A[U]=V==="fluid.emptySubcomponent"?J.emptySubcomponent(E.options):J.invokeGlobalFunction(V,F,{fluid:J})
}else{A[U]=E.apply(null,F)
}var B=A[U]?A[U].returnedOptions:null;
if(B){J.merge(S.options.mergePolicy,S.options,B);
if(B.listeners){J.mergeListeners(S.events,B.listeners)
}}}return A
};
J.initDomBinder=function(A){A.dom=J.createDomBinder(A.container,A.options.selectors);
A.locate=A.dom.locate
};
J.isPrimitive=function(B){var A=typeof (B);
return !B||A==="string"||A==="boolean"||A==="number"
};
function H(G,E,R,B){var D=G&&typeof (G)!=="string"?G[E]:G;
if(typeof (D)==="function"){D.apply(null,R,B);
return R
}if(D==="replace"){J.clear(R)
}for(var T in B){var C=(E?E+".":"")+T;
var F=R[T];
var S=B[T];
var A=J.isPrimitive(F);
if(S!==undefined){if(S!==null&&typeof S==="object"&&!S.nodeType&&!S.jquery&&S!==J.VALUE){if(A){R[T]=F=S instanceof Array?[]:{}
}H(G,C,F,S)
}else{if(F===null||F===undefined||D!=="reverse"){R[T]=S
}}}}return R
}J.merge=function(F,G){var B="";
for(var Q=2;
Q<arguments.length;
++Q){var A=arguments[Q];
if(A!==null&&A!==undefined){H(F,B,G,A)
}}if(F&&typeof (F)!=="string"){for(var D in F){var C=F[D];
if(typeof (C)==="string"&&C!=="replace"){var R=J.model.getBeanValue(G,D);
if(R===null||R===undefined){var E=J.model.getBeanValue(G,C);
J.model.setBeanValue(G,D,E)
}}}}return G
};
J.copy=function(A){if(J.isPrimitive(A)){return A
}return I.extend(true,typeof (A.length)==="number"?[]:{},A)
};
J.invokeGlobalFunction=function(A,D,B){var C=J.model.getBeanValue(window,A,B);
if(!C){J.fail("Error invoking global function: "+A+" could not be located")
}else{return C.apply(null,D)
}};
J.event={};
var N=1;
J.event.getEventFirer=function(D,C){var A=J.log;
var B={};
return{addListener:function(E,F,G){if(!E){return 
}if(D){F="unicast"
}if(!F){if(!E.$$guid){E.$$guid=N++
}F=E.$$guid
}B[F]={listener:E,predicate:G}
},removeListener:function(E){if(typeof (E)==="string"){delete B[E]
}else{if(typeof (E)==="object"&&E.$$guid){delete B[E.$$guid]
}}},fire:function(){for(var R in B){var G=B[R];
var E=G.listener;
if(G.predicate&&!G.predicate(E,arguments)){continue
}try{var F=E.apply(null,arguments);
if(C&&F===false){return false
}}catch(Q){A("FireEvent received exception "+Q.message+" e "+Q+" firing to listener "+R);
throw (Q)
}}}}
};
J.model={};
J.model.copyModel=function(A,B){J.clear(A);
I.extend(true,A,B)
};
J.model.parseEL=function(A){return A.toString().split(".")
};
J.model.composePath=function(B,A){return B===""?A:B+"."+A
};
J.model.setBeanValue=function(B,E,D){var C=J.model.parseEL(E);
for(var A=0;
A<C.length-1;
A+=1){if(!B[C[A]]){B[C[A]]={}
}B=B[C[A]]
}B[C[C.length-1]]=D
};
J.model.getBeanValue=function(E,B,A){if(B===""||B===null||B===undefined){return E
}var F=J.model.parseEL(B);
for(var D=0;
D<F.length;
++D){if(!E){return E
}var C=F[D];
if(A&&A[C]){E=A[C];
A=null
}else{E=E[C]
}}return E
};
var K;
J.setLogging=function(A){if(typeof A==="boolean"){K=A
}else{K=false
}};
J.log=function(A){if(K){A=new Date().toTimeString()+":  "+A;
if(typeof (console)!=="undefined"){if(console.debug){console.debug(A)
}else{console.log(A)
}}else{if(typeof (YAHOO)!=="undefined"){YAHOO.log(A)
}else{if(typeof (opera)!=="undefined"){opera.postError(A)
}}}}};
J.dumpEl=function(C){var B;
if(!C){return"null"
}if(C.nodeType===3||C.nodeType===8){return"[data: "+C.data+"]"
}if(C.nodeType===9){return"[document: location "+C.location+"]"
}if(!C.nodeType&&typeof C.length==="number"){B="[";
for(var A=0;
A<C.length;
++A){B+=J.dumpEl(C[A]);
if(A<C.length-1){B+=", "
}}return B+"]"
}C=I(C);
B=C.get(0).tagName;
if(C.attr("id")){B+="#"+C.attr("id")
}if(C.attr("class")){B+="."+C.attr("class")
}return B
};
J.findAncestor=function(B,A){B=J.unwrap(B);
while(B){if(A(B)){return B
}B=B.parentNode
}};
J.jById=function(C,D){D=D&&D.nodeType===9?D:document;
var B=J.byId(C,D);
var A=B?I(B):[];
A.selector="#"+C;
A.context=D;
return A
};
J.byId=function(B,C){C=C&&C.nodeType===9?C:document;
var A=C.getElementById(B);
if(A){if(A.getAttribute("id")!==B){J.fail("Problem in document structure - picked up element "+J.dumpEl(A)+" for id "+B+" without this id - most likely the element has a name which conflicts with this id")
}return A
}else{return null
}};
J.getId=function(A){return J.unwrap(A).getAttribute("id")
};
J.allocateSimpleId=function(A){A=J.unwrap(A);
if(!A.id){A.id="fluid-id-"+(N++)
}return A.id
};
J.transform=function(D){var E=[];
for(var A=0;
A<D.length;
++A){var C=D[A];
for(var B=0;
B<arguments.length-1;
++B){C=arguments[B+1](C,A)
}E[E.length]=C
}return E
};
J.find=function(E,A,D){for(var B=0;
B<E.length;
++B){var C=A(E[B],B);
if(C!==null&&C!==undefined){return C
}}return D
};
J.accumulate=function(C,D,B){for(var A=0;
A<C.length;
++A){B=D(C[A],B,A)
}return B
};
J.remove_if=function(B,C){for(var A=0;
A<B.length;
++A){if(C(B[A],A)){B.splice(A,1);
--A
}}return B
};
J.formatMessage=function(B,A){if(!A){return B
}if(typeof (A)==="string"){A=[A]
}for(var C=0;
C<A.length;
++C){B=B.replace("{"+C+"}",A[C])
}return B
};
J.messageLocator=function(A){return function(C,B){if(typeof (C)==="string"){C=[C]
}for(var F=0;
F<C.length;
++F){var D=C[F];
var E=A[D];
if(E===undefined){continue
}return J.formatMessage(E,B)
}return"[Message string for key "+C[0]+" not found]"
}
};
J.stringTemplate=function(D,B){var E=D;
for(var A in B){if(B.hasOwnProperty(A)){var C="%"+A;
E=E.replace(C,B[A])
}}return E
}
})(jQuery,fluid_1_1);