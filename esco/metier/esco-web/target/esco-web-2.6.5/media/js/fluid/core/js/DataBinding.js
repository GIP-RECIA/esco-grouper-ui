fluid_1_1=fluid_1_1||{};
(function(B,A){A.VALUE={};
A.BINDING_ROOT_KEY="fluid-binding-root";
A.findData=function(G,I){while(G){var H=B.data(G,I);
if(H){return H
}G=G.parentNode
}};
A.bindFossils=function(G,H,I){B.data(G,A.BINDING_ROOT_KEY,{data:H,fossils:I})
};
A.findForm=function(G){return A.findAncestor(G,function(H){return H.nodeName.toLowerCase()==="form"
})
};
A.value=function(K,H){var I=A.unwrap(K);
var N=false;
if(I.nodeType===undefined&&I.length>1){I=I[0];
N=true
}var J=B(I);
if("input"!==I.nodeName.toLowerCase()||!/radio|checkbox/.test(I.type)){return B(I).val(H)
}var G=I.name;
if(G===undefined){A.fail("Cannot acquire value from node "+A.dumpEl(I)+" which does not have name attribute set")
}var O;
if(N){O=K
}else{var O=document.getElementsByName(G);
var M=A.findForm(I);
O=B.grep(O,function(P){if(P.name!==G){return false
}return !M||A.dom.isContainer(M,P)
})
}if(H!==undefined){if(typeof (H)==="boolean"){H=(H?"true":"false")
}B.each(O,function(){this.checked=(H instanceof Array?B.inArray(this.value,H)!==-1:H===this.value)
})
}else{var L=B.map(O,function(P){return P.checked?P.value:null
});
return I.type==="radio"?L[0]:L
}};
A.applyChange=function(H,G,L){H=A.unwrap(H);
if(G===undefined){G=A.value(H)
}if(H.nodeType===undefined&&H.length>0){H=H[0]
}var I=A.findData(H,A.BINDING_ROOT_KEY);
if(!I){A.fail("Bound data could not be discovered in any node above "+A.dumpEl(H))
}var J=H.name;
var M=I.fossils[J];
if(!M){A.fail("No fossil discovered for name "+J+" in fossil record above "+A.dumpEl(H))
}if(typeof (M.oldvalue)==="boolean"){G=G[0]?true:false
}var K=I.fossils[J].EL;
if(L){L.fireChangeRequest({path:K,value:G,source:H.id})
}else{A.model.setBeanValue(I.data,K,G)
}};
A.pathUtil={};
var D=function(L,H,J){var G=null;
if(L){G=""
}var K=false;
var I=H.length;
for(;
J<I;
++J){var M=H.charAt(J);
if(!K){if(M==="."){break
}else{if(M==="\\"){K=true
}else{if(G!==null){G+=M
}}}}else{K=false;
if(G!==null){L+=M
}}}if(G!==null){L[0]=G
}return J
};
var E=[];
A.pathUtil.getPathSegment=function(H,G){D(E,H,G);
return E[0]
};
A.pathUtil.getHeadPath=function(G){return A.pathUtil.getPathSegment(G,0)
};
A.pathUtil.getFromHeadPath=function(H){var G=D(null,H,0);
return G===H.length?null:H.substring(G+1)
};
function C(G){return G.lastIndexOf(".")
}A.pathUtil.getToTailPath=function(H){var G=C(H);
return G==-1?null:H.substring(0,G)
};
A.pathUtil.getTailPath=function(H){var G=C(H);
return A.pathUtil.getPathSegment(H,G+1)
};
var F=function(G,J){for(var I=0;
I<J.length;
++I){var H=J.charAt(I);
if(H==="."||H==="\\"||H==="}"){G+="\\"
}G+=H
}return G
};
A.pathUtil.composePath=function(G,H){if(G.length!==0){G+="."
}return F(G,H)
};
A.pathUtil.matchPath=function(I,G){var K="";
while(true){if(!I){break
}if(!G){return null
}var J=A.pathUtil.getHeadPath(I);
var H=A.pathUtil.getHeadPath(G);
if(J!=="*"&&J!==H){return null
}K=A.pathUtil.composePath(K,H);
I=A.pathUtil.getFromHeadPath(I);
G=A.pathUtil.getFromHeadPath(G)
}return K
};
A.model.applyChangeRequest=function(J,H){if(H.type==="ADD"){A.model.setBeanValue(J,H.path,H.value)
}else{if(H.type==="DELETE"){var K=A.pathUtil.getToTailPath(H.path);
var I=A.pathUtil.getTailPath(H.path);
var G=A.model.getBeanValue(J,G);
delete G[I]
}}};
A.makeChangeApplier=function(J){var K={guards:A.event.getEventFirer(false,true),modelChanged:A.event.getEventFirer(false,false)};
var G={model:J};
function H(L,M){return function(P,N){var O=N[M];
return A.pathUtil.matchPath(P[L],O.path)
}
}function I(M,L,P,O){var N=H(P,O);
M[L]={addListener:function(Q,S,R){S[P]=Q;
K[L].addListener(S,R,N)
},removeListener:function(Q){K[L].removeListener(Q)
}}
}I(G,"guards","guardedPathSpec",1);
I(G,"modelChanged","triggerPathSpec",2);
G.fireChangeRequest=function(M){if(!M.type){M.type="ADD"
}var L=K.guards.fire(J,M);
if(L===false){return 
}var N={};
A.model.copyModel(N,J);
A.model.applyChangeRequest(J,M);
K.modelChanged.fire(J,N,M)
};
G.requestChange=function(O,N,L){var M={path:O,value:N,type:L};
G.fireChangeRequest(M)
};
return G
};
A.makeSuperApplier=function(){var H=[];
var G={};
G.addSubApplier=function(I,J){H.push({path:I,subApplier:J})
};
G.fireChangeRequest=function(M){for(var K=0;
K<H.length;
++K){var L=H[K].path;
if(M.path.indexOf(L)===0){var J=M.path.substring(L.length+1);
var I=A.copy(M);
I.path=J;
H[K].subApplier.fireChangeRequest(I)
}}};
return G
};
A.attachModel=function(I,G,L){var K=A.model.parseEL(G);
for(var H=0;
H<K.length-1;
++H){var J=K[H];
var M=I[J];
if(!M){I[J]=M={}
}I=M
}I[K[K.length-1]]=L
};
A.assembleModel=function(I){var J={};
var G=A.makeSuperApplier();
var K={model:J,applier:G};
for(path in I){var H=I[path];
A.attachModel(J,path,H.model);
if(H.applier){G.addSubApplier(path,H.applier)
}}return K
}
})(jQuery,fluid_1_1);