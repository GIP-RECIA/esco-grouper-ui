(function(A){A.widget("ui.tabs",{_init:function(){this._tabify(true)
},_setData:function(B,C){if((/^selected/).test(B)){this.select(C)
}else{this.options[B]=C;
this._tabify()
}},_tabId:function(B){return B.title&&B.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+A.data(B)
},_sanitizeSelector:function(B){return B.replace(/:/g,"\\:")
},_cookie:function(){var B=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+A.data(this.list[0]));
return A.cookie.apply(null,[B].concat(A.makeArray(arguments)))
},_ui:function(C,B){return{tab:C,panel:B,index:this.$tabs.index(C)}
},_tabify:function(B){this.list=this.element.is("div")?this.element.children("ul:first, ol:first").eq(0):this.element;
this.$lis=A("li:has(a[href])",this.list);
this.$tabs=this.$lis.map(function(){return A("a",this)[0]
});
this.$panels=A([]);
var C=this,M=this.options;
var F=/^#.+/;
this.$tabs.each(function(S,Q){var R=A(Q).attr("href");
if(F.test(R)){C.$panels=C.$panels.add(C._sanitizeSelector(R))
}else{if(R!="#"){A.data(Q,"href.tabs",R);
A.data(Q,"load.tabs",R.replace(/#.*$/,""));
var U=C._tabId(Q);
Q.href="#"+U;
var T=A("#"+U);
if(!T.length){T=A(M.panelTemplate).attr("id",U).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(C.$panels[S-1]||C.list);
T.data("destroy.tabs",true)
}C.$panels=C.$panels.add(T)
}else{M.disabled.push(S+1)
}}});
if(B){if(this.element.is("div")){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
}this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.$lis.addClass("ui-state-default ui-corner-top");
this.$panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(M.selected===undefined){if(location.hash){this.$tabs.each(function(R,Q){if(Q.hash==location.hash){M.selected=R;
return false
}})
}else{if(M.cookie){M.selected=parseInt(C._cookie(),10)
}else{if(this.$lis.filter(".ui-tabs-selected").length){M.selected=this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
}else{M.selected=0
}}}}else{if(M.selected===null){M.selected=-1
}}M.selected=((M.selected>=0&&this.$tabs[M.selected])||M.selected<0)?M.selected:0;
M.disabled=A.unique(M.disabled.concat(A.map(this.$lis.filter(".ui-state-disabled"),function(R,Q){return C.$lis.index(R)
}))).sort();
if(A.inArray(M.selected,M.disabled)!=-1){M.disabled.splice(A.inArray(M.selected,M.disabled),1)
}this.$panels.addClass("ui-tabs-hide");
this.$lis.removeClass("ui-tabs-selected ui-state-active");
if(M.selected>=0&&this.$tabs.length){this.$panels.eq(M.selected).removeClass("ui-tabs-hide");
var H=["ui-tabs-selected ui-state-active"];
if(M.deselectable){H.push("ui-tabs-deselectable")
}this.$lis.eq(M.selected).addClass(H.join(" "));
var L=function(){C._trigger("show",null,C._ui(C.$tabs[M.selected],C.$panels[M.selected]))
};
if(A.data(this.$tabs[M.selected],"load.tabs")){this.load(M.selected,L)
}else{L()
}}if(M.event!="mouseover"){var E=function(R,Q){if(Q.is(":not(.ui-state-disabled)")){Q.toggleClass("ui-state-"+R)
}};
this.$lis.bind("mouseover.tabs mouseout.tabs",function(){E("hover",A(this))
});
this.$tabs.bind("focus.tabs blur.tabs",function(){E("focus",A(this).parents("li:first"))
})
}A(window).bind("unload",function(){C.$lis.add(C.$tabs).unbind(".tabs");
C.$lis=C.$tabs=C.$panels=null
})
}else{M.selected=this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
}if(M.cookie){this._cookie(M.selected,M.cookie)
}for(var J=0,P;
P=this.$lis[J];
J++){A(P)[A.inArray(J,M.disabled)!=-1&&!A(P).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(M.cache===false){this.$tabs.removeData("cache.tabs")
}var D,K;
if(M.fx){if(A.isArray(M.fx)){D=M.fx[0];
K=M.fx[1]
}else{D=K=M.fx
}}function G(Q,R){Q.css({display:""});
if(A.browser.msie&&R.opacity){Q[0].style.removeAttribute("filter")
}}var N=K?function(Q,R){R.hide().removeClass("ui-tabs-hide").animate(K,500,function(){G(R,K);
C._trigger("show",null,C._ui(Q,R[0]))
})
}:function(Q,R){R.removeClass("ui-tabs-hide");
C._trigger("show",null,C._ui(Q,R[0]))
};
var O=D?function(R,Q,S){Q.animate(D,D.duration||"normal",function(){Q.addClass("ui-tabs-hide");
G(Q,D);
if(S){N(R,S)
}})
}:function(R,Q,S){Q.addClass("ui-tabs-hide");
if(S){N(R,S)
}};
function I(S,U,Q,T){var R=["ui-tabs-selected ui-state-active"];
if(M.deselectable){R.push("ui-tabs-deselectable")
}U.removeClass("ui-state-default").addClass(R.join(" ")).siblings().removeClass(R.join(" ")).addClass("ui-state-default");
O(S,Q,T)
}this.$tabs.unbind(".tabs").bind(M.event+".tabs",function(){var T=A(this).parents("li:eq(0)"),Q=C.$panels.filter(":visible"),S=A(C._sanitizeSelector(this.hash));
if((T.hasClass("ui-state-active")&&!M.deselectable)||T.hasClass("ui-state-disabled")||A(this).hasClass("ui-tabs-loading")||C._trigger("select",null,C._ui(this,S[0]))===false){this.blur();
return false
}M.selected=C.$tabs.index(this);
if(M.deselectable){if(T.hasClass("ui-state-active")){M.selected=-1;
if(M.cookie){C._cookie(M.selected,M.cookie)
}T.removeClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").addClass("ui-state-default");
C.$panels.stop();
O(this,Q);
this.blur();
return false
}else{if(!Q.length){if(M.cookie){C._cookie(M.selected,M.cookie)
}C.$panels.stop();
var R=this;
C.load(C.$tabs.index(this),function(){T.addClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").removeClass("ui-state-default");
N(R,S)
});
this.blur();
return false
}}}if(M.cookie){C._cookie(M.selected,M.cookie)
}C.$panels.stop();
if(S.length){var R=this;
C.load(C.$tabs.index(this),Q.length?function(){I(R,T,Q,S)
}:function(){T.addClass("ui-tabs-selected ui-state-active").removeClass("ui-state-default");
N(R,S)
})
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(A.browser.msie){this.blur()
}return false
});
if(M.event!="click"){this.$tabs.bind("click.tabs",function(){return false
})
}},destroy:function(){var B=this.options;
this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.unbind(".tabs").removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeData("tabs");
this.$tabs.each(function(){var C=A.data(this,"href.tabs");
if(C){this.href=C
}var D=A(this).unbind(".tabs");
A.each(["href","load","cache"],function(E,F){D.removeData(F+".tabs")
})
});
this.$lis.unbind(".tabs").add(this.$panels).each(function(){if(A.data(this,"destroy.tabs")){A(this).remove()
}else{A(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-tabs-deselectable ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
}});
if(B.cookie){this._cookie(null,B.cookie)
}},add:function(H,D,B){if(B==undefined){B=this.$tabs.length
}var E=this,J=this.options;
var C=A(J.tabTemplate.replace(/#\{href\}/g,H).replace(/#\{label\}/g,D));
C.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var I=H.indexOf("#")==0?H.replace("#",""):this._tabId(A("a:first-child",C)[0]);
var F=A("#"+I);
if(!F.length){F=A(J.panelTemplate).attr("id",I).data("destroy.tabs",true)
}F.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(B>=this.$lis.length){C.appendTo(this.list);
F.appendTo(this.list[0].parentNode)
}else{C.insertBefore(this.$lis[B]);
F.insertBefore(this.$panels[B])
}J.disabled=A.map(J.disabled,function(L,K){return L>=B?++L:L
});
this._tabify();
if(this.$tabs.length==1){C.addClass("ui-tabs-selected ui-state-active");
F.removeClass("ui-tabs-hide");
var G=A.data(this.$tabs[0],"load.tabs");
if(G){this.load(0,function(){E._trigger("show",null,E._ui(E.$tabs[0],E.$panels[0]))
})
}}this._trigger("add",null,this._ui(this.$tabs[B],this.$panels[B]))
},remove:function(D){var B=this.options,C=this.$lis.eq(D).remove(),E=this.$panels.eq(D).remove();
if(C.hasClass("ui-tabs-selected")&&this.$tabs.length>1){this.select(D+(D+1<this.$tabs.length?1:-1))
}B.disabled=A.map(A.grep(B.disabled,function(G,F){return G!=D
}),function(G,F){return G>=D?--G:G
});
this._tabify();
this._trigger("remove",null,this._ui(C.find("a")[0],E[0]))
},enable:function(B){var C=this.options;
if(A.inArray(B,C.disabled)==-1){return 
}this.$lis.eq(B).removeClass("ui-state-disabled");
C.disabled=A.grep(C.disabled,function(E,D){return E!=B
});
this._trigger("enable",null,this._ui(this.$tabs[B],this.$panels[B]))
},disable:function(B){var D=this,C=this.options;
if(B!=C.selected){this.$lis.eq(B).addClass("ui-state-disabled");
C.disabled.push(B);
C.disabled.sort();
this._trigger("disable",null,this._ui(this.$tabs[B],this.$panels[B]))
}},select:function(B){if(typeof B=="string"){B=this.$tabs.index(this.$tabs.filter("[href$="+B+"]"))
}this.$tabs.eq(B).trigger(this.options.event+".tabs")
},load:function(C,G){var H=this,M=this.options,L=this.$tabs.eq(C),F=L[0],D=G==undefined||G===false,J=L.data("load.tabs");
G=G||function(){};
if(!J||!D&&A.data(F,"cache.tabs")){G();
return 
}var I=function(N){var O=A(N),P=O.find("*:last");
return P.length&&P.is(":not(img)")&&P||O
};
var K=function(){H.$tabs.filter(".ui-tabs-loading").removeClass("ui-tabs-loading").each(function(){if(M.spinner){I(this).parent().html(I(this).data("label.tabs"))
}});
H.xhr=null
};
if(M.spinner){var E=I(F).html();
I(F).wrapInner("<em></em>").find("em").data("label.tabs",E).html(M.spinner)
}var B=A.extend({},M.ajaxOptions,{url:J,success:function(O,N){A(H._sanitizeSelector(F.hash)).html(O);
K();
if(M.cache){A.data(F,"cache.tabs",true)
}H._trigger("load",null,H._ui(H.$tabs[C],H.$panels[C]));
try{M.ajaxOptions.success(O,N)
}catch(P){}G()
}});
if(this.xhr){this.xhr.abort();
K()
}L.addClass("ui-tabs-loading");
H.xhr=A.ajax(B)
},url:function(C,B){this.$tabs.eq(C).removeData("cache.tabs").data("load.tabs",B)
},length:function(){return this.$tabs.length
}});
A.extend(A.ui.tabs,{version:"1.6rc6",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,deselectable:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"Loading&#8230;",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});
A.extend(A.ui.tabs.prototype,{rotation:null,rotate:function(F,C){var D=this,B=this.options.selected;
function E(){clearTimeout(D.rotation);
D.rotation=setTimeout(function(){B=++B<D.$tabs.length?B:0;
D.select(B)
},F)
}if(F){this.element.bind("tabsshow",E);
this.$tabs.bind(this.options.event+".tabs",!C?function(G){if(G.clientX){clearTimeout(D.rotation);
D.element.unbind("tabsshow",E)
}}:function(G){B=D.options.selected;
E()
});
E()
}else{clearTimeout(D.rotation);
this.element.unbind("tabsshow",E);
this.$tabs.unbind(this.options.event+".tabs",stop)
}}})
})(jQuery);