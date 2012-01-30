(function(B){DUI={isClass:function(A,F){F=F===undefined?null:Boolean(F);
try{if(A._ident.library=="DUI.Class"){if(F===null||(F===false&&A._ident.dynamic)||(F===true&&!A._ident.dynamic)){return true
}}}catch(E){}return false
},global:function(F,E){if(F.constructor==Array){var A=F[1]||undefined;
F=F[0]
}return DUI.Class.prototype.ns.apply(A?A:window,[F,E])
}};
DUI.Class=function(){return this.constructor.prototype._bootstrap.apply(this.constructor,arguments)
};
B.extend(DUI.Class.prototype,{_dontEnum:["prototype","_dontEnum","_ident","_bootstrap","init","create","ns","each"],_ident:{library:"DUI.Class",version:"1.0.0",dynamic:true},_bootstrap:function(){var A=function(){return function(){this.init.apply(this,arguments)
}
}.apply(A);
B.extend(true,A.prototype,this.prototype);
return A.prototype.create.apply(A,arguments)
},init:function(){},create:function(){var H=this;
var J=Array.prototype.slice.apply(arguments).reverse()[0]||null;
J=J!==null&&J.constructor==Boolean?J:false;
var I=J?H:H.prototype;
if(arguments.length>0&&arguments[0].constructor==String){var A=Array.prototype.slice.call(arguments);
var G=A.shift();
H[G]=H.create.apply(H,A);
return H[G]
}if(J){H.prototype._ident.dynamic=false
}B.each(["_dontEnum","_ident","create","ns","each"],function(){H[this]=H.prototype[this]
});
B.each(arguments,function(){var D=this;
if(D.constructor==Object||DUI.isClass(D)){var C=DUI.isClass(D,false)?D.prototype:D;
B.each(C,function(F,E){if(F=="dontEnum"&&E.constructor==Array){I._dontEnum=B.merge(I._dontEnum,E);
return 
}I[F]=E
})
}});
return H
},ns:function(){if(arguments.length==0){throw new Error("DUI.Class.ns should probably have some arguments passed to it.")
}var J=arguments[0];
var K=null;
var A=(arguments.length==1||arguments[1]===undefined)&&J.constructor!=Object?true:false;
if(J.constructor==String){var I={};
I[J]=arguments[1]?arguments[1]:undefined;
J=I
}if(J.constructor==Object){var M=this,N=false,L=this;
B.each(J,function(C,F){var E=M;
var D=C.split(".");
B.each(D,function(H,G){if(A&&typeof E[G]=="undefined"){N=true;
return false
}else{if(H==D.length-1&&F){E[G]=F
}else{if(typeof E[G]=="undefined"){E[G]=new DUI.Class(true)
}}}L=E=E[G]
})
});
return N?undefined:L
}},each:function(F){if(!B.isFunction(F)){throw new Error("DUI.Class.each must be called with a function as its first argument.")
}var A=this;
for(var H in A){if(B.inArray(H,A._dontEnum)==-1){var G=A[H];
F.apply(G,[H,G])
}}}});
DUI=new DUI.Class(DUI,true)
})(jQuery);