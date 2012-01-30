(function(D){var A={},J,L,N,I=D.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),O=false;
D.tooltip={blocked:false,defaults:{delay:200,fade:false,showURL:true,extraClass:"",top:15,left:15,id:"tooltip"},block:function(){D.tooltip.blocked=!D.tooltip.blocked
}};
D.fn.extend({tooltip:function(P){P=D.extend({},D.tooltip.defaults,P);
G(P);
return this.each(function(){D.data(this,"tooltip",P);
this.tOpacity=A.parent.css("opacity");
this.tooltipText=this.title;
D(this).removeAttr("title");
this.alt=""
}).mouseover(K).mouseout(E).click(E)
},fixPNG:I?function(){return this.each(function(){var P=D(this).css("backgroundImage");
if(P.match(/^url\(["']?(.*\.png)["']?\)$/i)){P=RegExp.$1;
D(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+P+"')"}).each(function(){var Q=D(this).css("position");
if(Q!="absolute"&&Q!="relative"){D(this).css("position","relative")
}})
}})
}:function(){return this
},unfixPNG:I?function(){return this.each(function(){D(this).css({filter:"",backgroundImage:""})
})
}:function(){return this
},hideWhenEmpty:function(){return this.each(function(){D(this)[D(this).html()?"show":"hide"]()
})
},url:function(){return this.attr("href")||this.attr("src")
}});
function G(P){if(A.parent){return 
}A.parent=D('<div id="'+P.id+'"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
if(D.fn.bgiframe){A.parent.bgiframe()
}A.title=D("h3",A.parent);
A.body=D("div.body",A.parent);
A.url=D("div.url",A.parent)
}function B(P){return D.data(P,"tooltip")
}function F(P){if(B(this).delay){N=setTimeout(M,B(this).delay)
}else{M()
}O=!!B(this).track;
D(document.body).bind("mousemove",C);
C(P)
}function K(){if(D.tooltip.blocked||this==J||(!this.tooltipText&&!B(this).bodyHandler)){return 
}J=this;
L=this.tooltipText;
if(B(this).bodyHandler){A.title.hide();
var Q=B(this).bodyHandler.call(this);
if(Q.nodeType||Q.jquery){A.body.empty().append(Q)
}else{A.body.html(Q)
}A.body.show()
}else{if(B(this).showBody){var P=L.split(B(this).showBody);
A.title.html(P.shift()).show();
A.body.empty();
for(var S=0,R;
(R=P[S]);
S++){if(S>0){A.body.append("<br/>")
}A.body.append(R)
}A.body.hideWhenEmpty()
}else{A.title.html(L).show();
A.body.hide()
}}if(B(this).showURL&&D(this).url()){A.url.html(D(this).url().replace("http://","")).show()
}else{A.url.hide()
}A.parent.addClass(B(this).extraClass);
if(B(this).fixPNG){A.parent.fixPNG()
}F.apply(this,arguments)
}function M(){N=null;
if((!I||!D.fn.bgiframe)&&B(J).fade){if(A.parent.is(":animated")){A.parent.stop().show().fadeTo(B(J).fade,J.tOpacity)
}else{A.parent.is(":visible")?A.parent.fadeTo(B(J).fade,J.tOpacity):A.parent.fadeIn(B(J).fade)
}}else{A.parent.show()
}C()
}function C(U){if(D.tooltip.blocked){return 
}if(U&&U.target.tagName=="OPTION"){return 
}if(!O&&A.parent.is(":visible")){D(document.body).unbind("mousemove",C)
}if(J==null){D(document.body).unbind("mousemove",C);
return 
}A.parent.removeClass("viewport-right").removeClass("viewport-bottom");
var Q=A.parent[0].offsetLeft;
var P=A.parent[0].offsetTop;
if(U){Q=U.pageX+B(J).left;
P=U.pageY+B(J).top;
var S="auto";
if(B(J).positionLeft){S=D(window).width()-Q;
Q="auto"
}A.parent.css({left:Q,right:S,top:P})
}var R=H(),T=A.parent[0];
if(R.x+R.cx<T.offsetLeft+T.offsetWidth){Q-=T.offsetWidth+20+B(J).left;
A.parent.css({left:Q+"px"}).addClass("viewport-right")
}if(R.y+R.cy<T.offsetTop+T.offsetHeight){P-=T.offsetHeight+20+B(J).top;
A.parent.css({top:P+"px"}).addClass("viewport-bottom")
}}function H(){return{x:D(window).scrollLeft(),y:D(window).scrollTop(),cx:D(window).width(),cy:D(window).height()}
}function E(Q){if(D.tooltip.blocked){return 
}if(N){clearTimeout(N)
}J=null;
var P=B(this);
function R(){A.parent.removeClass(P.extraClass).hide().css("opacity","")
}if((!I||!D.fn.bgiframe)&&P.fade){if(A.parent.is(":animated")){A.parent.stop().fadeTo(P.fade,0,R)
}else{A.parent.stop().fadeOut(P.fade,R)
}}else{R()
}if(B(this).fixPNG){A.parent.unfixPNG()
}}})(jQuery);