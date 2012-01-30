(function(Y){var R={};
var a={};
var S={};
var X=[];
var O;
jQuery.fn.jBreadCrumb=function(A){R=Y.extend({},Y.fn.jBreadCrumb.defaults,A);
return this.each(function(){a=Y(this);
U()
})
};
function U(){S=jQuery(a).find("li");
jQuery(a).find("ul").wrap('<div style="overflow:hidden; width: '+jQuery(a).css("width")+';"><div>');
if(S.length>0){jQuery(S[S.length-1]).addClass("last");
jQuery(S[0]).addClass("first");
if(S.length>R.minimumCompressionElements){Q()
}}}function Q(){var B=jQuery(S[S.length-1]);
if(jQuery(B).width()>R.maxFinalElementLength){if(R.beginingElementsToLeaveOpen>0){R.beginingElementsToLeaveOpen--
}if(R.endElementsToLeaveOpen>0){R.endElementsToLeaveOpen--
}}if(jQuery(B).width()<R.maxFinalElementLength&&jQuery(B).width()>R.minFinalElementLength){if(R.beginingElementsToLeaveOpen>0){R.beginingElementsToLeaveOpen--
}}var A=S.length-1-R.endElementsToLeaveOpen;
jQuery(S[S.length-1]).css({background:"none"});
S.each(function(D,C){if(D>R.beginingElementsToLeaveOpen&&D<A){var E={width:jQuery(C).width()+15};
jQuery(C).find("a").attr("tabindex","0").wrap("<span></span>").width(jQuery(C).find("a").width()+15);
jQuery(C).append(jQuery(R.overlayClass+".main").clone().removeClass("main").css({display:"block"}));
E=Y.extend({},E,{id:D,listElement:jQuery(C).find("span"),isAnimating:false,element:jQuery(C).find("span"),expand:false});
jQuery(C).bind("mouseover",E,T).bind("mouseout",E,b);
jQuery(C).find("a").unbind("mouseover",T).unbind("mouseout",b);
jQuery(C).find("a").bind("focus",E,T);
jQuery(C).find("a").bind("blur",E,b);
jQuery(C).find("a").bind("click",E,W);
jQuery(C).find("a").bind("keydown",function(F){if(F.which==13){Y(this).trigger("click");
return false
}});
C.autoInterval=setInterval(function(){clearInterval(C.autoInterval);
jQuery(C).find("span").animate({width:R.previewWidth},R.timeInitialCollapse,R.easing)
},(150*(D-2)))
}else{E=Y.extend({},E,{id:D,listElement:jQuery(C).find("span"),isAnimating:false,element:jQuery(C).find("span"),expand:false});
jQuery(C).find("a").attr("tabindex","0").bind("click",E,W);
jQuery(C).find("a").bind("focus",E,function(F){Y(this).css("backgroundColor","#e7f4f9").css("border","1px solid #d8f0fa")
});
jQuery(C).find("a").bind("blur",E,function(F){Y(this).css("backgroundColor","").css("border","")
});
jQuery(C).find("a").bind("keydown",function(F){if(F.which==13){Y(this).trigger("click");
return false
}})
}})
}function T(C){var A=C.data.id;
var B=C.data.width;
jQuery(C.data.element).stop();
jQuery(C.data.element).addClass("over");
jQuery(C.data.element).animate({width:B},{duration:R.timeExpansionAnimation,easing:R.easing,queue:false});
return false
}function W(A){var B=A.data.id;
A.data.expand=true;
if(O!=null&&O.expand){jQuery(O.element).animate({width:R.previewWidth},{duration:R.timeCompressionAnimation,easing:R.easing,queue:false});
O.element.removeClass("selected");
O.expand=false
}A.data.element.addClass("selected");
O=A.data;
if(B=="root"){}R.callback.onclick.call(null,A)
}function Z(A){return O
}function b(A){jQuery(A.data.element).removeClass("over");
if(O==null||(O!=null&&A.data.id!=O.id)){var B=A.data.id;
jQuery(A.data.element).stop();
jQuery(A.data.element).animate({width:R.previewWidth},{duration:R.timeCompressionAnimation,easing:R.easing,queue:false});
return false
}else{}}function V(){var A=Y.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
return A
}function P(B){var A;
if(jQuery(B).is("img")){A=jQuery(B).attr("src")
}else{A=Y(B).css("backgroundImage");
A.match(/^url\(["']?(.*\.png)["']?\)$/i);
A=RegExp.$1
}Y(B).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='"+A+"')"})
}jQuery.fn.jBreadCrumb.defaults={maxFinalElementLength:40,minFinalElementLength:0,minimumCompressionElements:0,endElementsToLeaveOpen:1,beginingElementsToLeaveOpen:0,minElementsToCollapse:0,timeExpansionAnimation:800,timeCompressionAnimation:500,timeInitialCollapse:600,easing:"easeOutQuad",overlayClass:".chevronOverlay",previewWidth:8,callback:{onclick:function(A){Y("#searchPathHidden").attr("value",A.target.name);
if(A.target.id=="RootBread"){Y("a[id=RootBread]").addClass("selected");
Y("a[class=lastBread]").css("color","black");
Y("a[class=lastBread]").css("text-decoration","none");
Y("a[id=bread]").css("color","black");
Y("a[id=bread]").css("text-decoration","none")
}else{Y("a[id=bread]").css("color","black");
Y("a[id=bread]").css("text-decoration","none");
Y("a[id=RootBread]").removeClass("selected");
Y("a[name="+A.target.name+"]").css("color","#50A029");
Y("a[name="+A.target.name+"]").css("text-decoration","underline")
}}}}
})(jQuery);