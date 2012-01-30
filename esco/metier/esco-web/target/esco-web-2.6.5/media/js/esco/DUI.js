(function(A){DUI={isClass:function(D,B){B=B===undefined?null:Boolean(B);
try{if(D._ident.library=="DUI.Class"){if(B===null||(B===false&&D._ident.dynamic)||(B===true&&!D._ident.dynamic)){return true
}}}catch(C){}return false
},global:function(B,C){if(B.constructor==Array){var D=B[1]||undefined;
B=B[0]
}return DUI.Class.prototype.ns.apply(D?D:window,[B,C])
}};
DUI.Class=function(){return this.constructor.prototype._bootstrap.apply(this.constructor,arguments)
};
A.extend(DUI.Class.prototype,{_dontEnum:["prototype","_dontEnum","_ident","_bootstrap","init","create","ns","each"],_ident:{library:"DUI.Class",version:"1.0.0",dynamic:true},_bootstrap:function(){var B=function(){return function(){this.init.apply(this,arguments)
}
}.apply(B);
A.extend(true,B.prototype,this.prototype);
return B.prototype.create.apply(B,arguments)
},init:function(){},create:function(){var D=this;
var B=Array.prototype.slice.apply(arguments).reverse()[0]||null;
B=B!==null&&B.constructor==Boolean?B:false;
var C=B?D:D.prototype;
if(arguments.length>0&&arguments[0].constructor==String){var F=Array.prototype.slice.call(arguments);
var E=F.shift();
D[E]=D.create.apply(D,F);
return D[E]
}if(B){D.prototype._ident.dynamic=false
}A.each(["_dontEnum","_ident","create","ns","each"],function(){D[this]=D.prototype[this]
});
A.each(arguments,function(){var G=this;
if(G.constructor==Object||DUI.isClass(G)){var H=DUI.isClass(G,false)?G.prototype:G;
A.each(H,function(I,J){if(I=="dontEnum"&&J.constructor==Array){C._dontEnum=A.merge(C._dontEnum,J);
return 
}C[I]=J
})
}});
return D
},ns:function(){if(arguments.length==0){throw new Error("DUI.Class.ns should probably have some arguments passed to it.")
}var F=arguments[0];
var E=null;
var H=(arguments.length==1||arguments[1]===undefined)&&F.constructor!=Object?true:false;
if(F.constructor==String){var G={};
G[F]=arguments[1]?arguments[1]:undefined;
F=G
}if(F.constructor==Object){var C=this,B=false,D=this;
A.each(F,function(L,I){var J=C;
var K=L.split(".");
A.each(K,function(M,N){if(H&&typeof J[N]=="undefined"){B=true;
return false
}else{if(M==K.length-1&&I){J[N]=I
}else{if(typeof J[N]=="undefined"){J[N]=new DUI.Class(true)
}}}D=J=J[N]
})
});
return B?undefined:D
}},each:function(D){if(!A.isFunction(D)){throw new Error("DUI.Class.each must be called with a function as its first argument.")
}var E=this;
for(var B in E){if(A.inArray(B,E._dontEnum)==-1){var C=E[B];
D.apply(C,[B,C])
}}}});
DUI=new DUI.Class(DUI,true)
})(jQuery);