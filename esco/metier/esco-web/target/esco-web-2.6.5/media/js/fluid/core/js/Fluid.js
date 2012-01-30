var fluid_1_1=fluid_1_1||{};
var fluid=fluid||fluid_1_1;
(function(G,F){F.version="Infusion 1.1";
F.fail=function(H){F.setLogging(true);
F.log(H.message?H.message:H);
throw new Error(H)
};
F.wrap=function(H){return((!H||H.jquery)?H:G(H))
};
F.unwrap=function(H){return H&&H.jquery&&H.length===1?H[0]:H
};
F.keyForValue=function(I,H){for(var J in I){if(I[J]===H){return J
}}return null
};
F.findKeyInObject=F.keyForValue;
F.clear=function(I){if(I instanceof Array){I.length=0
}else{for(var H in I){delete I[H]
}}};
F.container=function(I){var H=I;
if(typeof I==="string"||I.nodeType&&(I.nodeType===1||I.nodeType===9)){H=G(I)
}if(!H||!H.jquery||H.length!==1){if(typeof (I)!=="string"){I=H.selector
}F.fail({name:"NotOne",message:"A single container element was not found for selector "+I})
}return H
};
var D={};
var C={};
F.defaults=function(){var I=0;
var K=D;
if(typeof arguments[0]==="boolean"){K=C;
I=1
}var J=arguments[I];
var H=arguments[I+1];
if(H!==undefined){K[J]=H;
return H
}return K[J]
};
F.createDomBinder=function(M,I){var H={},J={};
function K(O,N){return G.data(F.unwrap(N))+"-"+O
}function L(P,O,N){H[K(P,O)]=N
}J.locate=function(P,R){var N,O,Q;
N=I[P];
O=R?R:M;
if(!O){F.fail("DOM binder invoked for selector "+P+" without container")
}if(!N){return O
}if(typeof (N)==="function"){Q=G(N.call(null,F.unwrap(O)))
}else{Q=G(N,O)
}if(Q.get(0)===document){Q=[]
}if(!Q.selector){Q.selector=N;
Q.context=O
}Q.selectorName=P;
L(P,O,Q);
return Q
};
J.fastLocate=function(O,R){var N=R?R:M;
var P=K(O,N);
var Q=H[P];
return Q?Q:J.locate(O,R)
};
J.clear=function(){H={}
};
J.refresh=function(Q,R){var O=R?R:M;
if(typeof Q==="string"){Q=[Q]
}if(O.length===undefined){O=[O]
}for(var P=0;
P<Q.length;
++P){for(var N=0;
N<O.length;
++N){J.locate(Q[P],O[N])
}}};
return J
};
F.mergeListeners=function(I,H){if(H){for(var L in H){var M=H[L];
var N=L.indexOf(".");
var K;
if(N!==-1){K=L.substring(N+1);
L=L.substring(0,N)
}if(!I[L]){I[L]=F.event.getEventFirer()
}var J=I[L];
if(typeof (M)==="function"){J.addListener(M,K)
}else{if(M&&typeof M.length==="number"){for(var O=0;
O<M.length;
++O){J.addListener(M[O],K)
}}}}}};
F.instantiateFirers=function(I,J){I.events={};
if(J.events){for(var H in J.events){var K=J.events[H];
I.events[H]=F.event.getEventFirer(K==="unicast",K==="preventable")
}}F.mergeListeners(I.events,J.listeners)
};
F.mergeComponentOptions=function(K,J,I){var H=F.defaults(J);
K.options=F.merge(H?H.mergePolicy:null,{},H,I)
};
F.expectFilledSelector=function(H,I){if(H&&H.length===0&&H.jquery){F.fail(I+': selector "'+H.selector+'" with name '+H.selectorName+" returned no results in context "+F.dumpEl(H.context))
}};
F.initView=function(K,J,I){var H={};
F.expectFilledSelector(J,'Error instantiating component with name "'+K);
F.mergeComponentOptions(H,K,I);
if(J){H.container=F.container(J);
F.initDomBinder(H)
}F.instantiateFirers(H,H.options);
return H
};
F.COMPONENT_OPTIONS={};
F.VALUE={};
F.emptySubcomponent=function(J){var I={};
J=G.makeArray(J);
for(var H=0;
H<J.length;
++H){I[J[H]]=function(){}
}return I
};
F.initSubcomponent=function(I,H,J){return F.initSubcomponents(I,H,J)[0]
};
F.initSubcomponents=function(K,L,M){var N=K.options[L];
if(!N){return 
}var J=G.makeArray(N);
var O=-1;
var R=[];
M=G.makeArray(M);
for(var I=0;
I<M.length;
++I){if(M[I]===F.COMPONENT_OPTIONS){O=I
}}for(I=0;
I<J.length;
++I){N=J[I];
if(O!==-1&&N.options){M[O]=N.options
}if(typeof (N)!=="function"){var H=typeof (N)==="string"?N:N.type;
var P=F.defaults(true,H);
F.merge("reverse",K.options,P);
R[I]=H==="fluid.emptySubcomponent"?F.emptySubcomponent(N.options):F.invokeGlobalFunction(H,M,{fluid:F})
}else{R[I]=N.apply(null,M)
}var Q=R[I]?R[I].returnedOptions:null;
if(Q){F.merge(K.options.mergePolicy,K.options,Q);
if(Q.listeners){F.mergeListeners(K.events,Q.listeners)
}}}return R
};
F.initDomBinder=function(H){H.dom=F.createDomBinder(H.container,H.options.selectors);
H.locate=H.dom.locate
};
F.isPrimitive=function(H){var I=typeof (H);
return !H||I==="string"||I==="boolean"||I==="number"
};
function A(K,M,J,P){var N=K&&typeof (K)!=="string"?K[M]:K;
if(typeof (N)==="function"){N.apply(null,J,P);
return J
}if(N==="replace"){F.clear(J)
}for(var H in P){var O=(M?M+".":"")+H;
var L=J[H];
var I=P[H];
var Q=F.isPrimitive(L);
if(I!==undefined){if(I!==null&&typeof I==="object"&&!I.nodeType&&!I.jquery&&I!==F.VALUE){if(Q){J[H]=L=I instanceof Array?[]:{}
}A(K,O,L,I)
}else{if(L===null||L===undefined||N!=="reverse"){J[H]=I
}}}}return J
}F.merge=function(K,J){var O="";
for(var I=2;
I<arguments.length;
++I){var P=arguments[I];
if(P!==null&&P!==undefined){A(K,O,J,P)
}}if(K&&typeof (K)!=="string"){for(var M in K){var N=K[M];
if(typeof (N)==="string"&&N!=="replace"){var H=F.model.getBeanValue(J,M);
if(H===null||H===undefined){var L=F.model.getBeanValue(J,N);
F.model.setBeanValue(J,M,L)
}}}}return J
};
F.copy=function(H){if(F.isPrimitive(H)){return H
}return G.extend(true,typeof (H.length)==="number"?[]:{},H)
};
F.invokeGlobalFunction=function(K,H,J){var I=F.model.getBeanValue(window,K,J);
if(!I){F.fail("Error invoking global function: "+K+" could not be located")
}else{return I.apply(null,H)
}};
F.event={};
var B=1;
F.event.getEventFirer=function(H,I){var K=F.log;
var J={};
return{addListener:function(L,N,M){if(!L){return 
}if(H){N="unicast"
}if(!N){if(!L.$$guid){L.$$guid=B++
}N=L.$$guid
}J[N]={listener:L,predicate:M}
},removeListener:function(L){if(typeof (L)==="string"){delete J[L]
}else{if(typeof (L)==="object"&&L.$$guid){delete J[L.$$guid]
}}},fire:function(){for(var M in J){var O=J[M];
var L=O.listener;
if(O.predicate&&!O.predicate(L,arguments)){continue
}try{var P=L.apply(null,arguments);
if(I&&P===false){return false
}}catch(N){K("FireEvent received exception "+N.message+" e "+N+" firing to listener "+M);
throw (N)
}}}}
};
F.model={};
F.model.copyModel=function(I,H){F.clear(I);
G.extend(true,I,H)
};
F.model.parseEL=function(H){return H.toString().split(".")
};
F.model.composePath=function(H,I){return H===""?I:H+"."+I
};
F.model.setBeanValue=function(K,H,I){var J=F.model.parseEL(H);
for(var L=0;
L<J.length-1;
L+=1){if(!K[J[L]]){K[J[L]]={}
}K=K[J[L]]
}K[J[J.length-1]]=I
};
F.model.getBeanValue=function(H,K,L){if(K===""||K===null||K===undefined){return H
}var M=F.model.parseEL(K);
for(var I=0;
I<M.length;
++I){if(!H){return H
}var J=M[I];
if(L&&L[J]){H=L[J];
L=null
}else{H=H[J]
}}return H
};
var E;
F.setLogging=function(H){if(typeof H==="boolean"){E=H
}else{E=false
}};
F.log=function(H){if(E){H=new Date().toTimeString()+":  "+H;
if(typeof (console)!=="undefined"){if(console.debug){console.debug(H)
}else{console.log(H)
}}else{if(typeof (YAHOO)!=="undefined"){YAHOO.log(H)
}else{if(typeof (opera)!=="undefined"){opera.postError(H)
}}}}};
F.dumpEl=function(H){var I;
if(!H){return"null"
}if(H.nodeType===3||H.nodeType===8){return"[data: "+H.data+"]"
}if(H.nodeType===9){return"[document: location "+H.location+"]"
}if(!H.nodeType&&typeof H.length==="number"){I="[";
for(var J=0;
J<H.length;
++J){I+=F.dumpEl(H[J]);
if(J<H.length-1){I+=", "
}}return I+"]"
}H=G(H);
I=H.get(0).tagName;
if(H.attr("id")){I+="#"+H.attr("id")
}if(H.attr("class")){I+="."+H.attr("class")
}return I
};
F.findAncestor=function(H,I){H=F.unwrap(H);
while(H){if(I(H)){return H
}H=H.parentNode
}};
F.jById=function(I,H){H=H&&H.nodeType===9?H:document;
var J=F.byId(I,H);
var K=J?G(J):[];
K.selector="#"+I;
K.context=H;
return K
};
F.byId=function(I,H){H=H&&H.nodeType===9?H:document;
var J=H.getElementById(I);
if(J){if(J.getAttribute("id")!==I){F.fail("Problem in document structure - picked up element "+F.dumpEl(J)+" for id "+I+" without this id - most likely the element has a name which conflicts with this id")
}return J
}else{return null
}};
F.getId=function(H){return F.unwrap(H).getAttribute("id")
};
F.allocateSimpleId=function(H){H=F.unwrap(H);
if(!H.id){H.id="fluid-id-"+(B++)
}return H.id
};
F.transform=function(I){var H=[];
for(var L=0;
L<I.length;
++L){var J=I[L];
for(var K=0;
K<arguments.length-1;
++K){J=arguments[K+1](J,L)
}H[H.length]=J
}return H
};
F.find=function(H,L,I){for(var K=0;
K<H.length;
++K){var J=L(H[K],K);
if(J!==null&&J!==undefined){return J
}}return I
};
F.accumulate=function(I,H,J){for(var K=0;
K<I.length;
++K){J=H(I[K],J,K)
}return J
};
F.remove_if=function(I,H){for(var J=0;
J<I.length;
++J){if(H(I[J],J)){I.splice(J,1);
--J
}}return I
};
F.formatMessage=function(I,J){if(!J){return I
}if(typeof (J)==="string"){J=[J]
}for(var H=0;
H<J.length;
++H){I=I.replace("{"+H+"}",J[H])
}return I
};
F.messageLocator=function(H){return function(K,L){if(typeof (K)==="string"){K=[K]
}for(var M=0;
M<K.length;
++M){var J=K[M];
var I=H[J];
if(I===undefined){continue
}return F.formatMessage(I,L)
}return"[Message string for key "+K[0]+" not found]"
}
};
F.stringTemplate=function(I,K){var H=I;
for(var L in K){if(K.hasOwnProperty(L)){var J="%"+L;
H=H.replace(J,K[L])
}}return H
}
})(jQuery,fluid_1_1);