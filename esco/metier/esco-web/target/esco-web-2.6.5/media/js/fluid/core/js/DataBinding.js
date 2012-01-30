fluid_1_1=fluid_1_1||{};
(function(L,G){G.VALUE={};
G.BINDING_ROOT_KEY="fluid-binding-root";
G.findData=function(C,A){while(C){var B=L.data(C,A);
if(B){return B
}C=C.parentNode
}};
G.bindFossils=function(C,B,A){L.data(C,G.BINDING_ROOT_KEY,{data:B,fossils:A})
};
G.findForm=function(A){return G.findAncestor(A,function(B){return B.nodeName.toLowerCase()==="form"
})
};
G.value=function(E,Q){var P=G.unwrap(E);
var B=false;
if(P.nodeType===undefined&&P.length>1){P=P[0];
B=true
}var F=L(P);
if("input"!==P.nodeName.toLowerCase()||!/radio|checkbox/.test(P.type)){return L(P).val(Q)
}var R=P.name;
if(R===undefined){G.fail("Cannot acquire value from node "+G.dumpEl(P)+" which does not have name attribute set")
}var A;
if(B){A=E
}else{var A=document.getElementsByName(R);
var C=G.findForm(P);
A=L.grep(A,function(M){if(M.name!==R){return false
}return !C||G.dom.isContainer(C,M)
})
}if(Q!==undefined){if(typeof (Q)==="boolean"){Q=(Q?"true":"false")
}L.each(A,function(){this.checked=(Q instanceof Array?L.inArray(this.value,Q)!==-1:Q===this.value)
})
}else{var D=L.map(A,function(M){return M.checked?M.value:null
});
return P.type==="radio"?D[0]:D
}};
G.applyChange=function(E,F,A){E=G.unwrap(E);
if(F===undefined){F=G.value(E)
}if(E.nodeType===undefined&&E.length>0){E=E[0]
}var D=G.findData(E,G.BINDING_ROOT_KEY);
if(!D){G.fail("Bound data could not be discovered in any node above "+G.dumpEl(E))
}var C=E.name;
var N=D.fossils[C];
if(!N){G.fail("No fossil discovered for name "+C+" in fossil record above "+G.dumpEl(E))
}if(typeof (N.oldvalue)==="boolean"){F=F[0]?true:false
}var B=D.fossils[C].EL;
if(A){A.fireChangeRequest({path:B,value:F,source:E.id})
}else{G.model.setBeanValue(D.data,B,F)
}};
G.pathUtil={};
var J=function(A,E,C){var F=null;
if(A){F=""
}var B=false;
var D=E.length;
for(;
C<D;
++C){var N=E.charAt(C);
if(!B){if(N==="."){break
}else{if(N==="\\"){B=true
}else{if(F!==null){F+=N
}}}}else{B=false;
if(F!==null){A+=N
}}}if(F!==null){A[0]=F
}return C
};
var I=[];
G.pathUtil.getPathSegment=function(A,B){J(I,A,B);
return I[0]
};
G.pathUtil.getHeadPath=function(A){return G.pathUtil.getPathSegment(A,0)
};
G.pathUtil.getFromHeadPath=function(A){var B=J(null,A,0);
return B===A.length?null:A.substring(B+1)
};
function K(A){return A.lastIndexOf(".")
}G.pathUtil.getToTailPath=function(A){var B=K(A);
return B==-1?null:A.substring(0,B)
};
G.pathUtil.getTailPath=function(A){var B=K(A);
return G.pathUtil.getPathSegment(A,B+1)
};
var H=function(D,A){for(var B=0;
B<A.length;
++B){var C=A.charAt(B);
if(C==="."||C==="\\"||C==="}"){D+="\\"
}D+=C
}return D
};
G.pathUtil.composePath=function(B,A){if(B.length!==0){B+="."
}return H(B,A)
};
G.pathUtil.matchPath=function(C,E){var A="";
while(true){if(!C){break
}if(!E){return null
}var B=G.pathUtil.getHeadPath(C);
var D=G.pathUtil.getHeadPath(E);
if(B!=="*"&&B!==D){return null
}A=G.pathUtil.composePath(A,D);
C=G.pathUtil.getFromHeadPath(C);
E=G.pathUtil.getFromHeadPath(E)
}return A
};
G.model.applyChangeRequest=function(B,D){if(D.type==="ADD"){G.model.setBeanValue(B,D.path,D.value)
}else{if(D.type==="DELETE"){var A=G.pathUtil.getToTailPath(D.path);
var C=G.pathUtil.getTailPath(D.path);
var E=G.model.getBeanValue(B,E);
delete E[C]
}}};
G.makeChangeApplier=function(B){var A={guards:G.event.getEventFirer(false,true),modelChanged:G.event.getEventFirer(false,false)};
var E={model:B};
function D(F,N){return function(M,R){var Q=R[N];
return G.pathUtil.matchPath(M[F],Q.path)
}
}function C(T,F,Q,R){var S=D(Q,R);
T[F]={addListener:function(O,M,N){M[Q]=O;
A[F].addListener(M,N,S)
},removeListener:function(M){A[F].removeListener(M)
}}
}C(E,"guards","guardedPathSpec",1);
C(E,"modelChanged","triggerPathSpec",2);
E.fireChangeRequest=function(P){if(!P.type){P.type="ADD"
}var F=A.guards.fire(B,P);
if(F===false){return 
}var O={};
G.model.copyModel(O,B);
G.model.applyChangeRequest(B,P);
A.modelChanged.fire(B,O,P)
};
E.requestChange=function(P,Q,F){var R={path:P,value:Q,type:F};
E.fireChangeRequest(R)
};
return E
};
G.makeSuperApplier=function(){var A=[];
var B={};
B.addSubApplier=function(D,C){A.push({path:D,subApplier:C})
};
B.fireChangeRequest=function(N){for(var D=0;
D<A.length;
++D){var C=A[D].path;
if(N.path.indexOf(C)===0){var E=N.path.substring(C.length+1);
var F=G.copy(N);
F.path=E;
A[D].subApplier.fireChangeRequest(F)
}}};
return B
};
G.attachModel=function(D,F,A){var B=G.model.parseEL(F);
for(var E=0;
E<B.length-1;
++E){var C=B[E];
var N=D[C];
if(!N){D[C]=N={}
}D=N
}D[B[B.length-1]]=A
};
G.assembleModel=function(C){var B={};
var E=G.makeSuperApplier();
var A={model:B,applier:E};
for(path in C){var D=C[path];
G.attachModel(B,path,D.model);
if(D.applier){E.addSubApplier(path,D.applier)
}}return A
}
})(jQuery,fluid_1_1);