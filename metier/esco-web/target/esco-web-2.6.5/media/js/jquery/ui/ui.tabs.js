(function(B){B.widget("ui.tabs",{_init:function(){this._tabify(true)
},_setData:function(D,A){if((/^selected/).test(D)){this.select(A)
}else{this.options[D]=A;
this._tabify()
}},_tabId:function(A){return A.title&&A.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+B.data(A)
},_sanitizeSelector:function(A){return A.replace(/:/g,"\\:")
},_cookie:function(){var A=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+B.data(this.list[0]));
return B.cookie.apply(null,[A].concat(B.makeArray(arguments)))
},_ui:function(A,D){return{tab:A,panel:D,index:this.$tabs.index(A)}
},_tabify:function(R){this.list=this.element.is("div")?this.element.children("ul:first, ol:first").eq(0):this.element;
this.$lis=B("li:has(a[href])",this.list);
this.$tabs=this.$lis.map(function(){return B("a",this)[0]
});
this.$panels=B([]);
var Q=this,V=this.options;
var c=/^#.+/;
this.$tabs.each(function(E,G){var F=B(G).attr("href");
if(c.test(F)){Q.$panels=Q.$panels.add(Q._sanitizeSelector(F))
}else{if(F!="#"){B.data(G,"href.tabs",F);
B.data(G,"load.tabs",F.replace(/#.*$/,""));
var C=Q._tabId(G);
G.href="#"+C;
var D=B("#"+C);
if(!D.length){D=B(V.panelTemplate).attr("id",C).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(Q.$panels[E-1]||Q.list);
D.data("destroy.tabs",true)
}Q.$panels=Q.$panels.add(D)
}else{V.disabled.push(E+1)
}}});
if(R){if(this.element.is("div")){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
}this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.$lis.addClass("ui-state-default ui-corner-top");
this.$panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(V.selected===undefined){if(location.hash){this.$tabs.each(function(C,D){if(D.hash==location.hash){V.selected=C;
return false
}})
}else{if(V.cookie){V.selected=parseInt(Q._cookie(),10)
}else{if(this.$lis.filter(".ui-tabs-selected").length){V.selected=this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
}else{V.selected=0
}}}}else{if(V.selected===null){V.selected=-1
}}V.selected=((V.selected>=0&&this.$tabs[V.selected])||V.selected<0)?V.selected:0;
V.disabled=B.unique(V.disabled.concat(B.map(this.$lis.filter(".ui-state-disabled"),function(C,D){return Q.$lis.index(C)
}))).sort();
if(B.inArray(V.selected,V.disabled)!=-1){V.disabled.splice(B.inArray(V.selected,V.disabled),1)
}this.$panels.addClass("ui-tabs-hide");
this.$lis.removeClass("ui-tabs-selected ui-state-active");
if(V.selected>=0&&this.$tabs.length){this.$panels.eq(V.selected).removeClass("ui-tabs-hide");
var a=["ui-tabs-selected ui-state-active"];
if(V.deselectable){a.push("ui-tabs-deselectable")
}this.$lis.eq(V.selected).addClass(a.join(" "));
var W=function(){Q._trigger("show",null,Q._ui(Q.$tabs[V.selected],Q.$panels[V.selected]))
};
if(B.data(this.$tabs[V.selected],"load.tabs")){this.load(V.selected,W)
}else{W()
}}if(V.event!="mouseover"){var d=function(C,D){if(D.is(":not(.ui-state-disabled)")){D.toggleClass("ui-state-"+C)
}};
this.$lis.bind("mouseover.tabs mouseout.tabs",function(){d("hover",B(this))
});
this.$tabs.bind("focus.tabs blur.tabs",function(){d("focus",B(this).parents("li:first"))
})
}B(window).bind("unload",function(){Q.$lis.add(Q.$tabs).unbind(".tabs");
Q.$lis=Q.$tabs=Q.$panels=null
})
}else{V.selected=this.$lis.index(this.$lis.filter(".ui-tabs-selected"))
}if(V.cookie){this._cookie(V.selected,V.cookie)
}for(var Y=0,S;
S=this.$lis[Y];
Y++){B(S)[B.inArray(Y,V.disabled)!=-1&&!B(S).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(V.cache===false){this.$tabs.removeData("cache.tabs")
}var A,X;
if(V.fx){if(B.isArray(V.fx)){A=V.fx[0];
X=V.fx[1]
}else{A=X=V.fx
}}function b(D,C){D.css({display:""});
if(B.browser.msie&&C.opacity){D[0].style.removeAttribute("filter")
}}var U=X?function(D,C){C.hide().removeClass("ui-tabs-hide").animate(X,500,function(){b(C,X);
Q._trigger("show",null,Q._ui(D,C[0]))
})
}:function(D,C){C.removeClass("ui-tabs-hide");
Q._trigger("show",null,Q._ui(D,C[0]))
};
var T=A?function(D,E,C){E.animate(A,A.duration||"normal",function(){E.addClass("ui-tabs-hide");
b(E,A);
if(C){U(D,C)
}})
}:function(D,E,C){E.addClass("ui-tabs-hide");
if(C){U(D,C)
}};
function Z(E,C,G,D){var F=["ui-tabs-selected ui-state-active"];
if(V.deselectable){F.push("ui-tabs-deselectable")
}C.removeClass("ui-state-default").addClass(F.join(" ")).siblings().removeClass(F.join(" ")).addClass("ui-state-default");
T(E,G,D)
}this.$tabs.unbind(".tabs").bind(V.event+".tabs",function(){var C=B(this).parents("li:eq(0)"),F=Q.$panels.filter(":visible"),D=B(Q._sanitizeSelector(this.hash));
if((C.hasClass("ui-state-active")&&!V.deselectable)||C.hasClass("ui-state-disabled")||B(this).hasClass("ui-tabs-loading")||Q._trigger("select",null,Q._ui(this,D[0]))===false){this.blur();
return false
}V.selected=Q.$tabs.index(this);
if(V.deselectable){if(C.hasClass("ui-state-active")){V.selected=-1;
if(V.cookie){Q._cookie(V.selected,V.cookie)
}C.removeClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").addClass("ui-state-default");
Q.$panels.stop();
T(this,F);
this.blur();
return false
}else{if(!F.length){if(V.cookie){Q._cookie(V.selected,V.cookie)
}Q.$panels.stop();
var E=this;
Q.load(Q.$tabs.index(this),function(){C.addClass("ui-tabs-selected ui-state-active ui-tabs-deselectable").removeClass("ui-state-default");
U(E,D)
});
this.blur();
return false
}}}if(V.cookie){Q._cookie(V.selected,V.cookie)
}Q.$panels.stop();
if(D.length){var E=this;
Q.load(Q.$tabs.index(this),F.length?function(){Z(E,C,F,D)
}:function(){C.addClass("ui-tabs-selected ui-state-active").removeClass("ui-state-default");
U(E,D)
})
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(B.browser.msie){this.blur()
}return false
});
if(V.event!="click"){this.$tabs.bind("click.tabs",function(){return false
})
}},destroy:function(){var A=this.options;
this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.unbind(".tabs").removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeData("tabs");
this.$tabs.each(function(){var F=B.data(this,"href.tabs");
if(F){this.href=F
}var E=B(this).unbind(".tabs");
B.each(["href","load","cache"],function(D,C){E.removeData(C+".tabs")
})
});
this.$lis.unbind(".tabs").add(this.$panels).each(function(){if(B.data(this,"destroy.tabs")){B(this).remove()
}else{B(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-tabs-deselectable ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
}});
if(A.cookie){this._cookie(null,A.cookie)
}},add:function(O,A,L){if(L==undefined){L=this.$tabs.length
}var R=this,M=this.options;
var K=B(M.tabTemplate.replace(/#\{href\}/g,O).replace(/#\{label\}/g,A));
K.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var N=O.indexOf("#")==0?O.replace("#",""):this._tabId(B("a:first-child",K)[0]);
var Q=B("#"+N);
if(!Q.length){Q=B(M.panelTemplate).attr("id",N).data("destroy.tabs",true)
}Q.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(L>=this.$lis.length){K.appendTo(this.list);
Q.appendTo(this.list[0].parentNode)
}else{K.insertBefore(this.$lis[L]);
Q.insertBefore(this.$panels[L])
}M.disabled=B.map(M.disabled,function(C,D){return C>=L?++C:C
});
this._tabify();
if(this.$tabs.length==1){K.addClass("ui-tabs-selected ui-state-active");
Q.removeClass("ui-tabs-hide");
var P=B.data(this.$tabs[0],"load.tabs");
if(P){this.load(0,function(){R._trigger("show",null,R._ui(R.$tabs[0],R.$panels[0]))
})
}}this._trigger("add",null,this._ui(this.$tabs[L],this.$panels[L]))
},remove:function(F){var H=this.options,G=this.$lis.eq(F).remove(),A=this.$panels.eq(F).remove();
if(G.hasClass("ui-tabs-selected")&&this.$tabs.length>1){this.select(F+(F+1<this.$tabs.length?1:-1))
}H.disabled=B.map(B.grep(H.disabled,function(C,D){return C!=F
}),function(C,D){return C>=F?--C:C
});
this._tabify();
this._trigger("remove",null,this._ui(G.find("a")[0],A[0]))
},enable:function(D){var A=this.options;
if(B.inArray(D,A.disabled)==-1){return 
}this.$lis.eq(D).removeClass("ui-state-disabled");
A.disabled=B.grep(A.disabled,function(C,F){return C!=D
});
this._trigger("enable",null,this._ui(this.$tabs[D],this.$panels[D]))
},disable:function(F){var A=this,E=this.options;
if(F!=E.selected){this.$lis.eq(F).addClass("ui-state-disabled");
E.disabled.push(F);
E.disabled.sort();
this._trigger("disable",null,this._ui(this.$tabs[F],this.$panels[F]))
}},select:function(A){if(typeof A=="string"){A=this.$tabs.index(this.$tabs.filter("[href$="+A+"]"))
}this.$tabs.eq(A).trigger(this.options.event+".tabs")
},load:function(N,V){var U=this,P=this.options,Q=this.$tabs.eq(N),W=Q[0],A=V==undefined||V===false,S=Q.data("load.tabs");
V=V||function(){};
if(!S||!A&&B.data(W,"cache.tabs")){V();
return 
}var T=function(E){var D=B(E),C=D.find("*:last");
return C.length&&C.is(":not(img)")&&C||D
};
var R=function(){U.$tabs.filter(".ui-tabs-loading").removeClass("ui-tabs-loading").each(function(){if(P.spinner){T(this).parent().html(T(this).data("label.tabs"))
}});
U.xhr=null
};
if(P.spinner){var X=T(W).html();
T(W).wrapInner("<em></em>").find("em").data("label.tabs",X).html(P.spinner)
}var O=B.extend({},P.ajaxOptions,{url:S,success:function(D,E){B(U._sanitizeSelector(W.hash)).html(D);
R();
if(P.cache){B.data(W,"cache.tabs",true)
}U._trigger("load",null,U._ui(U.$tabs[N],U.$panels[N]));
try{P.ajaxOptions.success(D,E)
}catch(C){}V()
}});
if(this.xhr){this.xhr.abort();
R()
}Q.addClass("ui-tabs-loading");
U.xhr=B.ajax(O)
},url:function(A,D){this.$tabs.eq(A).removeData("cache.tabs").data("load.tabs",D)
},length:function(){return this.$tabs.length
}});
B.extend(B.ui.tabs,{version:"1.6rc6",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,deselectable:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"Loading&#8230;",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});
B.extend(B.ui.tabs.prototype,{rotation:null,rotate:function(A,I){var H=this,J=this.options.selected;
function G(){clearTimeout(H.rotation);
H.rotation=setTimeout(function(){J=++J<H.$tabs.length?J:0;
H.select(J)
},A)
}if(A){this.element.bind("tabsshow",G);
this.$tabs.bind(this.options.event+".tabs",!I?function(C){if(C.clientX){clearTimeout(H.rotation);
H.element.unbind("tabsshow",G)
}}:function(C){J=H.options.selected;
G()
});
G()
}else{clearTimeout(H.rotation);
this.element.unbind("tabsshow",G);
this.$tabs.unbind(this.options.event+".tabs",stop)
}}})
})(jQuery);