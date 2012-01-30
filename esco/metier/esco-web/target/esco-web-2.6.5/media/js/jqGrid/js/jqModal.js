(function(O){O.fn.jqm=function(F){var A={overlay:50,overlayClass:"jqmOverlay",closeClass:"jqmClose",trigger:".jqModal",ajax:J,ajaxText:"",target:J,modal:J,toTop:J,onShow:J,onHide:J,onLoad:J};
return this.each(function(){if(this._jqm){return I[this._jqm].c=O.extend({},I[this._jqm].c,F)
}K++;
this._jqm=K;
I[K]={c:O.extend(A,O.jqm.params,F),a:J,w:O(this).addClass("jqmID"+K),s:K};
if(A.trigger){O(this).jqmAddTrigger(A.trigger)
}})
};
O.fn.jqmAddClose=function(A){return G(this,A,"jqmHide")
};
O.fn.jqmAddTrigger=function(A){return G(this,A,"jqmShow")
};
O.fn.jqmShow=function(A){return this.each(function(){A=A||window.event;
O.jqm.open(this._jqm,A)
})
};
O.fn.jqmHide=function(A){return this.each(function(){A=A||window.event;
O.jqm.close(this._jqm,A)
})
};
O.jqm={hash:{},open:function(L,H){var T=I[L],U=T.c,S="."+U.closeClass,V=(parseInt(T.w.css("z-index"))),V=(V>0)?V:3000,R=O("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":V-1,opacity:U.overlay/100});
if(T.a){return J
}T.t=H;
T.a=true;
T.w.css("z-index",V);
if(U.modal){if(!M[0]){E("bind")
}M.push(L)
}else{if(U.overlay>0){T.w.jqmAddClose(R)
}else{R=J
}}T.o=(R)?R.addClass(U.overlayClass).prependTo("body"):J;
if(P){O("html,body").css({height:"100%",width:"100%"});
if(R){R=R.css({position:"absolute"})[0];
for(var A in {Top:1,Left:1}){R.style.setExpression(A.toLowerCase(),"(_=(document.documentElement.scroll"+A+" || document.body.scroll"+A+"))+'px'")
}}}if(U.ajax){var Q=U.target||T.w,F=U.ajax,Q=(typeof Q=="string")?O(Q,T.w):O(Q),F=(F.substr(0,1)=="@")?O(H).attr(F.substring(1)):F;
Q.html(U.ajaxText).load(F,function(){if(U.onLoad){U.onLoad.call(this,T)
}if(S){T.w.jqmAddClose(O(S,T.w))
}D(T)
})
}else{if(S){T.w.jqmAddClose(O(S,T.w))
}}if(U.toTop&&T.o){T.w.before('<span id="jqmP'+T.w[0]._jqm+'"></span>').insertAfter(T.o)
}(U.onShow)?U.onShow(T):T.w.show();
D(T);
return J
},close:function(F){var A=I[F];
if(!A.a){return J
}A.a=J;
if(M[0]){M.pop();
if(!M[0]){E("unbind")
}}if(A.c.toTop&&A.o){O("#jqmP"+A.w[0]._jqm).after(A.w).remove()
}if(A.c.onHide){A.c.onHide(A)
}else{A.w.hide();
if(A.o){A.o.remove()
}}return J
},params:{}};
var K=0,I=O.jqm.hash,M=[],P=O.browser.msie&&(O.browser.version=="6.0"),J=false,C=O('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),D=function(A){if(P){if(A.o){A.o.html('<p style="width:100%;height:100%"/>').prepend(C)
}else{if(!O("iframe.jqm",A.w)[0]){A.w.prepend(C)
}}}B(A)
},B=function(F){try{O(":input:visible",F.w)[0].focus()
}catch(A){}},E=function(A){O()[A]("keypress",N)[A]("keydown",N)[A]("mousedown",N)
},N=function(A){var F=I[M[M.length-1]],H=(!O(A.target).parents(".jqmID"+F.s)[0]);
if(H){B(F)
}return !H
},G=function(F,H,A){return F.each(function(){var L=this._jqm;
O(H).each(function(){if(!this[A]){this[A]=[];
O(this).click(function(){for(var Q in {jqmShow:1,jqmHide:1}){for(var R in this[Q]){if(I[this[Q][R]]){I[this[Q][R]].w[Q](this)
}}}return J
})
}this[A].push(L)
})
})
}
})(jQuery);