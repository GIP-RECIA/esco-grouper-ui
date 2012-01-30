(function(A){A.widget("ui.accordion",{_init:function(){var C=this.options,D=this;
this.running=0;
if(C.collapsible==A.ui.accordion.defaults.collapsible&&C.alwaysOpen!=A.ui.accordion.defaults.alwaysOpen){C.collapsible=!C.alwaysOpen
}if(C.navigation){var B=this.element.find("a").filter(C.navigationFilter);
if(B.length){if(B.filter(C.header).length){this.active=B
}else{this.active=B.parent().parent().prev();
B.addClass("ui-accordion-content-active")
}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");
if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")
}this.headers=this.element.find(C.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){A(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){A(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){A(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){A(this).removeClass("ui-state-focus")
});
this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
this.active=this._findActive(this.active||C.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
this.active.next().addClass("ui-accordion-content-active");
A("<span/>").addClass("ui-icon "+C.icons.header).prependTo(this.headers);
this.active.find(".ui-icon").toggleClass(C.icons.header).toggleClass(C.icons.headerSelected);
if(A.browser.msie){this.element.find("a").css("zoom","1")
}this.resize();
this.element.attr("role","tablist");
this.headers.attr("role","tab").bind("keydown",function(E){return D._keydown(E)
}).next().attr("role","tabpanel");
this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")
}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")
}if(!A.browser.safari){this.headers.find("a").attr("tabIndex","-1")
}if(C.event){this.headers.bind((C.event)+".accordion",function(E){return D._clickHandler.call(D,E,this)
})
}},destroy:function(){var C=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
this.headers.find("a").removeAttr("tabindex");
this.headers.children(".ui-icon").remove();
var B=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
if(C.autoHeight||C.fillHeight){B.css("height","")
}},_setData:function(B,C){if(B=="alwaysOpen"){B="collapsible";
C=!C
}A.widget.prototype._setData.apply(this,arguments)
},_keydown:function(G){var D=this.options,C=A.ui.keyCode;
if(D.disabled||G.altKey||G.ctrlKey){return 
}var F=this.headers.length;
var B=this.headers.index(G.target);
var E=false;
switch(G.keyCode){case C.RIGHT:case C.DOWN:E=this.headers[(B+1)%F];
break;
case C.LEFT:case C.UP:E=this.headers[(B-1+F)%F];
break;
case C.SPACE:case C.ENTER:return this._clickHandler({target:G.target},G.target)
}if(E){A(G.target).attr("tabIndex","-1");
A(E).attr("tabIndex","0");
E.focus();
return false
}return true
},resize:function(){var C=this.options,B;
if(C.fillSpace){if(A.browser.msie){var D=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}B=this.element.parent().height();
if(A.browser.msie){this.element.parent().css("overflow",D)
}this.headers.each(function(){B-=A(this).outerHeight()
});
var E=0;
this.headers.next().each(function(){E=Math.max(E,A(this).innerHeight()-A(this).height())
}).height(Math.max(0,B-E)).css("overflow","auto")
}else{if(C.autoHeight){B=0;
this.headers.next().each(function(){B=Math.max(B,A(this).outerHeight())
}).height(B)
}}},activate:function(B){var C=this._findActive(B)[0];
this._clickHandler({target:C},C)
},_findActive:function(B){return B?typeof B=="number"?this.headers.filter(":eq("+B+")"):this.headers.not(this.headers.not(B)):B===false?A([]):this.headers.filter(":eq(0)")
},_clickHandler:function(G,B){var I=this.options;
if(I.disabled){return false
}if(!G.target&&I.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(I.icons.headerSelected).addClass(I.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var D=this.active.next(),J={options:I,newHeader:A([]),oldHeader:I.active,newContent:A([]),oldContent:D},H=(this.active=A([]));
this._toggle(H,D,J);
return false
}var C=A(G.currentTarget||B);
var E=C[0]==this.active[0];
if(this.running||(!I.collapsible&&E)){return false
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(I.icons.headerSelected).addClass(I.icons.header);
this.active.next().addClass("ui-accordion-content-active");
if(!E){C.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(I.icons.header).addClass(I.icons.headerSelected);
C.next().addClass("ui-accordion-content-active")
}var H=C.next(),D=this.active.next(),J={options:I,newHeader:E&&I.collapsible?A([]):C,oldHeader:this.active,newContent:E&&I.collapsible?A([]):H.find("> *"),oldContent:D.find("> *")},F=this.headers.index(this.active[0])>this.headers.index(C[0]);
this.active=E?A([]):C;
this._toggle(H,D,J,E,F);
return false
},_toggle:function(J,E,C,F,G){var M=this.options,I=this;
this.toShow=J;
this.toHide=E;
this.data=C;
var K=function(){if(!I){return 
}return I._completed.apply(I,arguments)
};
this._trigger("changestart",null,this.data);
this.running=E.size()===0?J.size():E.size();
if(M.animated){var B={};
if(M.collapsible&&F){B={toShow:A([]),toHide:E,complete:K,down:G,autoHeight:M.autoHeight||M.fillSpace}
}else{B={toShow:J,toHide:E,complete:K,down:G,autoHeight:M.autoHeight||M.fillSpace}
}if(!M.proxied){M.proxied=M.animated
}if(!M.proxiedDuration){M.proxiedDuration=M.duration
}M.animated=A.isFunction(M.proxied)?M.proxied(B):M.proxied;
M.duration=A.isFunction(M.proxiedDuration)?M.proxiedDuration(B):M.proxiedDuration;
var H=A.ui.accordion.animations,L=M.duration,D=M.animated;
if(!H[D]){H[D]=function(N){this.slide(N,{easing:D,duration:L||700})
}
}H[D](B)
}else{if(M.collapsible&&F){J.toggle()
}else{E.hide();
J.show()
}K(true)
}E.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();
J.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()
},_completed:function(B){var C=this.options;
this.running=B?0:--this.running;
if(this.running){return 
}if(C.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this._trigger("change",null,this.data)
}});
A.extend(A.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()
}},animations:{slide:function(F,D){F=A.extend({easing:"swing",duration:300},F,D);
if(!F.toHide.size()){F.toShow.animate({height:"show"},F);
return 
}if(!F.toShow.size()){F.toHide.animate({height:"hide"},F);
return 
}var H=F.toShow.css("overflow"),C,I={},B={},J=["height","paddingTop","paddingBottom"],G;
var E=F.toShow;
G=E[0].style.width;
E.width(parseInt(E.parent().width(),10)-parseInt(E.css("paddingLeft"),10)-parseInt(E.css("paddingRight"),10)-(parseInt(E.css("borderLeftWidth"),10)||0)-(parseInt(E.css("borderRightWidth"),10)||0));
A.each(J,function(M,L){B[L]="hide";
var K=(""+A.css(F.toShow[0],L)).match(/^([\d+-.]+)(.*)$/);
I[L]={value:K[1],unit:K[2]||"px"}
});
F.toShow.css({height:0,overflow:"hidden"}).show();
F.toHide.filter(":hidden").each(F.complete).end().filter(":visible").animate(B,{step:function(K,L){if(L.prop=="height"){C=(L.now-L.start)/(L.end-L.start)
}F.toShow[0].style[L.prop]=(C*I[L.prop].value)+I[L.prop].unit
},duration:F.duration,easing:F.easing,complete:function(){if(!F.autoHeight){F.toShow.css("height","")
}F.toShow.css("width",G);
F.toShow.css({overflow:H});
F.complete()
}})
},bounceslide:function(B){this.slide(B,{easing:B.down?"easeOutBounce":"swing",duration:B.down?1000:200})
},easeslide:function(B){this.slide(B,{easing:"easeinout",duration:700})
}}})
})(jQuery);