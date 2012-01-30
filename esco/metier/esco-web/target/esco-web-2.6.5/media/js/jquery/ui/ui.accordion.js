(function(B){B.widget("ui.accordion",{_init:function(){var E=this.options,A=this;
this.running=0;
if(E.collapsible==B.ui.accordion.defaults.collapsible&&E.alwaysOpen!=B.ui.accordion.defaults.alwaysOpen){E.collapsible=!E.alwaysOpen
}if(E.navigation){var F=this.element.find("a").filter(E.navigationFilter);
if(F.length){if(F.filter(E.header).length){this.active=F
}else{this.active=F.parent().parent().prev();
F.addClass("ui-accordion-content-active")
}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");
if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")
}this.headers=this.element.find(E.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){B(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){B(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){B(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){B(this).removeClass("ui-state-focus")
});
this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
this.active=this._findActive(this.active||E.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
this.active.next().addClass("ui-accordion-content-active");
B("<span/>").addClass("ui-icon "+E.icons.header).prependTo(this.headers);
this.active.find(".ui-icon").toggleClass(E.icons.header).toggleClass(E.icons.headerSelected);
if(B.browser.msie){this.element.find("a").css("zoom","1")
}this.resize();
this.element.attr("role","tablist");
this.headers.attr("role","tab").bind("keydown",function(C){return A._keydown(C)
}).next().attr("role","tabpanel");
this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")
}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")
}if(!B.browser.safari){this.headers.find("a").attr("tabIndex","-1")
}if(E.event){this.headers.bind((E.event)+".accordion",function(C){return A._clickHandler.call(A,C,this)
})
}},destroy:function(){var A=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
this.headers.find("a").removeAttr("tabindex");
this.headers.children(".ui-icon").remove();
var D=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
if(A.autoHeight||A.fillHeight){D.css("height","")
}},_setData:function(D,A){if(D=="alwaysOpen"){D="collapsible";
A=!A
}B.widget.prototype._setData.apply(this,arguments)
},_keydown:function(A){var J=this.options,K=B.ui.keyCode;
if(J.disabled||A.altKey||A.ctrlKey){return 
}var H=this.headers.length;
var L=this.headers.index(A.target);
var I=false;
switch(A.keyCode){case K.RIGHT:case K.DOWN:I=this.headers[(L+1)%H];
break;
case K.LEFT:case K.UP:I=this.headers[(L-1+H)%H];
break;
case K.SPACE:case K.ENTER:return this._clickHandler({target:A.target},A.target)
}if(I){B(A.target).attr("tabIndex","-1");
B(I).attr("tabIndex","0");
I.focus();
return false
}return true
},resize:function(){var G=this.options,H;
if(G.fillSpace){if(B.browser.msie){var F=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}H=this.element.parent().height();
if(B.browser.msie){this.element.parent().css("overflow",F)
}this.headers.each(function(){H-=B(this).outerHeight()
});
var A=0;
this.headers.next().each(function(){A=Math.max(A,B(this).innerHeight()-B(this).height())
}).height(Math.max(0,H-A)).css("overflow","auto")
}else{if(G.autoHeight){H=0;
this.headers.next().each(function(){H=Math.max(H,B(this).outerHeight())
}).height(H)
}}},activate:function(D){var A=this._findActive(D)[0];
this._clickHandler({target:A},A)
},_findActive:function(A){return A?typeof A=="number"?this.headers.filter(":eq("+A+")"):this.headers.not(this.headers.not(A)):A===false?B([]):this.headers.filter(":eq(0)")
},_clickHandler:function(P,L){var N=this.options;
if(N.disabled){return false
}if(!P.target&&N.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(N.icons.headerSelected).addClass(N.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var A=this.active.next(),M={options:N,newHeader:B([]),oldHeader:N.active,newContent:B([]),oldContent:A},O=(this.active=B([]));
this._toggle(O,A,M);
return false
}var K=B(P.currentTarget||L);
var R=K[0]==this.active[0];
if(this.running||(!N.collapsible&&R)){return false
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(N.icons.headerSelected).addClass(N.icons.header);
this.active.next().addClass("ui-accordion-content-active");
if(!R){K.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(N.icons.header).addClass(N.icons.headerSelected);
K.next().addClass("ui-accordion-content-active")
}var O=K.next(),A=this.active.next(),M={options:N,newHeader:R&&N.collapsible?B([]):K,oldHeader:this.active,newContent:R&&N.collapsible?B([]):O.find("> *"),oldContent:A.find("> *")},Q=this.headers.index(this.active[0])>this.headers.index(K[0]);
this.active=R?B([]):K;
this._toggle(O,A,M,R,Q);
return false
},_toggle:function(S,X,N,W,V){var P=this.options,T=this;
this.toShow=S;
this.toHide=X;
this.data=N;
var R=function(){if(!T){return 
}return T._completed.apply(T,arguments)
};
this._trigger("changestart",null,this.data);
this.running=X.size()===0?S.size():X.size();
if(P.animated){var O={};
if(P.collapsible&&W){O={toShow:B([]),toHide:X,complete:R,down:V,autoHeight:P.autoHeight||P.fillSpace}
}else{O={toShow:S,toHide:X,complete:R,down:V,autoHeight:P.autoHeight||P.fillSpace}
}if(!P.proxied){P.proxied=P.animated
}if(!P.proxiedDuration){P.proxiedDuration=P.duration
}P.animated=B.isFunction(P.proxied)?P.proxied(O):P.proxied;
P.duration=B.isFunction(P.proxiedDuration)?P.proxiedDuration(O):P.proxiedDuration;
var U=B.ui.accordion.animations,Q=P.duration,A=P.animated;
if(!U[A]){U[A]=function(C){this.slide(C,{easing:A,duration:Q||700})
}
}U[A](O)
}else{if(P.collapsible&&W){S.toggle()
}else{X.hide();
S.show()
}R(true)
}X.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();
S.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()
},_completed:function(D){var A=this.options;
this.running=D?0:--this.running;
if(this.running){return 
}if(A.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this._trigger("change",null,this.data)
}});
B.extend(B.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()
}},animations:{slide:function(Q,A){Q=B.extend({easing:"swing",duration:300},Q,A);
if(!Q.toHide.size()){Q.toShow.animate({height:"show"},Q);
return 
}if(!Q.toShow.size()){Q.toHide.animate({height:"hide"},Q);
return 
}var O=Q.toShow.css("overflow"),K,N={},L={},M=["height","paddingTop","paddingBottom"],P;
var R=Q.toShow;
P=R[0].style.width;
R.width(parseInt(R.parent().width(),10)-parseInt(R.css("paddingLeft"),10)-parseInt(R.css("paddingRight"),10)-(parseInt(R.css("borderLeftWidth"),10)||0)-(parseInt(R.css("borderRightWidth"),10)||0));
B.each(M,function(E,C){L[C]="hide";
var D=(""+B.css(Q.toShow[0],C)).match(/^([\d+-.]+)(.*)$/);
N[C]={value:D[1],unit:D[2]||"px"}
});
Q.toShow.css({height:0,overflow:"hidden"}).show();
Q.toHide.filter(":hidden").each(Q.complete).end().filter(":visible").animate(L,{step:function(D,C){if(C.prop=="height"){K=(C.now-C.start)/(C.end-C.start)
}Q.toShow[0].style[C.prop]=(K*N[C.prop].value)+N[C.prop].unit
},duration:Q.duration,easing:Q.easing,complete:function(){if(!Q.autoHeight){Q.toShow.css("height","")
}Q.toShow.css("width",P);
Q.toShow.css({overflow:O});
Q.complete()
}})
},bounceslide:function(A){this.slide(A,{easing:A.down?"easeOutBounce":"swing",duration:A.down?1000:200})
},easeslide:function(A){this.slide(A,{easing:"easeinout",duration:700})
}}})
})(jQuery);