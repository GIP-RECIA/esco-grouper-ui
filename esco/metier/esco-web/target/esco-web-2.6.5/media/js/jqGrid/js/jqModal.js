(function(Q){Q.fn.jqm=function(C){var B={overlay:50,overlayClass:"jqmOverlay",closeClass:"jqmClose",trigger:".jqModal",ajax:U,ajaxText:"",target:U,modal:U,toTop:U,onShow:U,onHide:U,onLoad:U};
return this.each(function(){if(this._jqm){return V[this._jqm].c=Q.extend({},V[this._jqm].c,C)
}T++;
this._jqm=T;
V[T]={c:Q.extend(B,Q.jqm.params,C),a:U,w:Q(this).addClass("jqmID"+T),s:T};
if(B.trigger){Q(this).jqmAddTrigger(B.trigger)
}})
};
Q.fn.jqmAddClose=function(B){return W(this,B,"jqmHide")
};
Q.fn.jqmAddTrigger=function(B){return W(this,B,"jqmShow")
};
Q.fn.jqmShow=function(B){return this.each(function(){B=B||window.event;
Q.jqm.open(this._jqm,B)
})
};
Q.fn.jqmHide=function(B){return this.each(function(){B=B||window.event;
Q.jqm.close(this._jqm,B)
})
};
Q.jqm={hash:{},open:function(K,M){var E=V[K],D=E.c,G="."+D.closeClass,C=(parseInt(E.w.css("z-index"))),C=(C>0)?C:3000,I=Q("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":C-1,opacity:D.overlay/100});
if(E.a){return U
}E.t=M;
E.a=true;
E.w.css("z-index",C);
if(D.modal){if(!S[0]){X("bind")
}S.push(K)
}else{if(D.overlay>0){E.w.jqmAddClose(I)
}else{I=U
}}E.o=(I)?I.addClass(D.overlayClass).prependTo("body"):U;
if(L){Q("html,body").css({height:"100%",width:"100%"});
if(I){I=I.css({position:"absolute"})[0];
for(var B in {Top:1,Left:1}){I.style.setExpression(B.toLowerCase(),"(_=(document.documentElement.scroll"+B+" || document.body.scroll"+B+"))+'px'")
}}}if(D.ajax){var J=D.target||E.w,N=D.ajax,J=(typeof J=="string")?Q(J,E.w):Q(J),N=(N.substr(0,1)=="@")?Q(M).attr(N.substring(1)):N;
J.html(D.ajaxText).load(N,function(){if(D.onLoad){D.onLoad.call(this,E)
}if(G){E.w.jqmAddClose(Q(G,E.w))
}A(E)
})
}else{if(G){E.w.jqmAddClose(Q(G,E.w))
}}if(D.toTop&&E.o){E.w.before('<span id="jqmP'+E.w[0]._jqm+'"></span>').insertAfter(E.o)
}(D.onShow)?D.onShow(E):E.w.show();
A(E);
return U
},close:function(C){var B=V[C];
if(!B.a){return U
}B.a=U;
if(S[0]){S.pop();
if(!S[0]){X("unbind")
}}if(B.c.toTop&&B.o){Q("#jqmP"+B.w[0]._jqm).after(B.w).remove()
}if(B.c.onHide){B.c.onHide(B)
}else{B.w.hide();
if(B.o){B.o.remove()
}}return U
},params:{}};
var T=0,V=Q.jqm.hash,S=[],L=Q.browser.msie&&(Q.browser.version=="6.0"),U=false,F=Q('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),A=function(B){if(L){if(B.o){B.o.html('<p style="width:100%;height:100%"/>').prepend(F)
}else{if(!Q("iframe.jqm",B.w)[0]){B.w.prepend(F)
}}}H(B)
},H=function(C){try{Q(":input:visible",C.w)[0].focus()
}catch(B){}},X=function(B){Q()[B]("keypress",R)[B]("keydown",R)[B]("mousedown",R)
},R=function(B){var D=V[S[S.length-1]],C=(!Q(B.target).parents(".jqmID"+D.s)[0]);
if(C){H(D)
}return !C
},W=function(D,C,B){return D.each(function(){var E=this._jqm;
Q(C).each(function(){if(!this[B]){this[B]=[];
Q(this).click(function(){for(var I in {jqmShow:1,jqmHide:1}){for(var G in this[I]){if(V[this[I][G]]){V[this[I][G]].w[I](this)
}}}return U
})
}this[B].push(E)
})
})
}
})(jQuery);