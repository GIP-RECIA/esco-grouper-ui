(function(P){var S={},Y,W,U,Z=P.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),T=false;
P.tooltip={blocked:false,defaults:{delay:200,fade:false,showURL:true,extraClass:"",top:15,left:15,id:"tooltip"},block:function(){P.tooltip.blocked=!P.tooltip.blocked
}};
P.fn.extend({tooltip:function(A){A=P.extend({},P.tooltip.defaults,A);
b(A);
return this.each(function(){P.data(this,"tooltip",A);
this.tOpacity=S.parent.css("opacity");
this.tooltipText=this.title;
P(this).removeAttr("title");
this.alt=""
}).mouseover(X).mouseout(d).click(d)
},fixPNG:Z?function(){return this.each(function(){var A=P(this).css("backgroundImage");
if(A.match(/^url\(["']?(.*\.png)["']?\)$/i)){A=RegExp.$1;
P(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+A+"')"}).each(function(){var B=P(this).css("position");
if(B!="absolute"&&B!="relative"){P(this).css("position","relative")
}})
}})
}:function(){return this
},unfixPNG:Z?function(){return this.each(function(){P(this).css({filter:"",backgroundImage:""})
})
}:function(){return this
},hideWhenEmpty:function(){return this.each(function(){P(this)[P(this).html()?"show":"hide"]()
})
},url:function(){return this.attr("href")||this.attr("src")
}});
function b(A){if(S.parent){return 
}S.parent=P('<div id="'+A.id+'"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
if(P.fn.bgiframe){S.parent.bgiframe()
}S.title=P("h3",S.parent);
S.body=P("div.body",S.parent);
S.url=P("div.url",S.parent)
}function R(A){return P.data(A,"tooltip")
}function c(A){if(R(this).delay){U=setTimeout(V,R(this).delay)
}else{V()
}T=!!R(this).track;
P(document.body).bind("mousemove",Q);
Q(A)
}function X(){if(P.tooltip.blocked||this==Y||(!this.tooltipText&&!R(this).bodyHandler)){return 
}Y=this;
W=this.tooltipText;
if(R(this).bodyHandler){S.title.hide();
var C=R(this).bodyHandler.call(this);
if(C.nodeType||C.jquery){S.body.empty().append(C)
}else{S.body.html(C)
}S.body.show()
}else{if(R(this).showBody){var D=W.split(R(this).showBody);
S.title.html(D.shift()).show();
S.body.empty();
for(var A=0,B;
(B=D[A]);
A++){if(A>0){S.body.append("<br/>")
}S.body.append(B)
}S.body.hideWhenEmpty()
}else{S.title.html(W).show();
S.body.hide()
}}if(R(this).showURL&&P(this).url()){S.url.html(P(this).url().replace("http://","")).show()
}else{S.url.hide()
}S.parent.addClass(R(this).extraClass);
if(R(this).fixPNG){S.parent.fixPNG()
}c.apply(this,arguments)
}function V(){U=null;
if((!Z||!P.fn.bgiframe)&&R(Y).fade){if(S.parent.is(":animated")){S.parent.stop().show().fadeTo(R(Y).fade,Y.tOpacity)
}else{S.parent.is(":visible")?S.parent.fadeTo(R(Y).fade,Y.tOpacity):S.parent.fadeIn(R(Y).fade)
}}else{S.parent.show()
}Q()
}function Q(A){if(P.tooltip.blocked){return 
}if(A&&A.target.tagName=="OPTION"){return 
}if(!T&&S.parent.is(":visible")){P(document.body).unbind("mousemove",Q)
}if(Y==null){P(document.body).unbind("mousemove",Q);
return 
}S.parent.removeClass("viewport-right").removeClass("viewport-bottom");
var E=S.parent[0].offsetLeft;
var F=S.parent[0].offsetTop;
if(A){E=A.pageX+R(Y).left;
F=A.pageY+R(Y).top;
var C="auto";
if(R(Y).positionLeft){C=P(window).width()-E;
E="auto"
}S.parent.css({left:E,right:C,top:F})
}var D=a(),B=S.parent[0];
if(D.x+D.cx<B.offsetLeft+B.offsetWidth){E-=B.offsetWidth+20+R(Y).left;
S.parent.css({left:E+"px"}).addClass("viewport-right")
}if(D.y+D.cy<B.offsetTop+B.offsetHeight){F-=B.offsetHeight+20+R(Y).top;
S.parent.css({top:F+"px"}).addClass("viewport-bottom")
}}function a(){return{x:P(window).scrollLeft(),y:P(window).scrollTop(),cx:P(window).width(),cy:P(window).height()}
}function d(B){if(P.tooltip.blocked){return 
}if(U){clearTimeout(U)
}Y=null;
var C=R(this);
function A(){S.parent.removeClass(C.extraClass).hide().css("opacity","")
}if((!Z||!P.fn.bgiframe)&&C.fade){if(S.parent.is(":animated")){S.parent.stop().fadeTo(C.fade,0,A)
}else{S.parent.stop().fadeOut(C.fade,A)
}}else{A()
}if(R(this).fixPNG){S.parent.unfixPNG()
}}})(jQuery);