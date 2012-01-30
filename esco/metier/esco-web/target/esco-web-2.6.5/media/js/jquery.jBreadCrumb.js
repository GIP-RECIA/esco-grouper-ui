(function(H){var A={};
var F={};
var N={};
var I=[];
var D;
jQuery.fn.jBreadCrumb=function(O){A=H.extend({},H.fn.jBreadCrumb.defaults,O);
return this.each(function(){F=H(this);
L()
})
};
function L(){N=jQuery(F).find("li");
jQuery(F).find("ul").wrap('<div style="overflow:hidden; width: '+jQuery(F).css("width")+';"><div>');
if(N.length>0){jQuery(N[N.length-1]).addClass("last");
jQuery(N[0]).addClass("first");
if(N.length>A.minimumCompressionElements){B()
}}}function B(){var O=jQuery(N[N.length-1]);
if(jQuery(O).width()>A.maxFinalElementLength){if(A.beginingElementsToLeaveOpen>0){A.beginingElementsToLeaveOpen--
}if(A.endElementsToLeaveOpen>0){A.endElementsToLeaveOpen--
}}if(jQuery(O).width()<A.maxFinalElementLength&&jQuery(O).width()>A.minFinalElementLength){if(A.beginingElementsToLeaveOpen>0){A.beginingElementsToLeaveOpen--
}}var P=N.length-1-A.endElementsToLeaveOpen;
jQuery(N[N.length-1]).css({background:"none"});
N.each(function(R,S){if(R>A.beginingElementsToLeaveOpen&&R<P){var Q={width:jQuery(S).width()+15};
jQuery(S).find("a").attr("tabindex","0").wrap("<span></span>").width(jQuery(S).find("a").width()+15);
jQuery(S).append(jQuery(A.overlayClass+".main").clone().removeClass("main").css({display:"block"}));
Q=H.extend({},Q,{id:R,listElement:jQuery(S).find("span"),isAnimating:false,element:jQuery(S).find("span"),expand:false});
jQuery(S).bind("mouseover",Q,M).bind("mouseout",Q,E);
jQuery(S).find("a").unbind("mouseover",M).unbind("mouseout",E);
jQuery(S).find("a").bind("focus",Q,M);
jQuery(S).find("a").bind("blur",Q,E);
jQuery(S).find("a").bind("click",Q,J);
jQuery(S).find("a").bind("keydown",function(T){if(T.which==13){H(this).trigger("click");
return false
}});
S.autoInterval=setInterval(function(){clearInterval(S.autoInterval);
jQuery(S).find("span").animate({width:A.previewWidth},A.timeInitialCollapse,A.easing)
},(150*(R-2)))
}else{Q=H.extend({},Q,{id:R,listElement:jQuery(S).find("span"),isAnimating:false,element:jQuery(S).find("span"),expand:false});
jQuery(S).find("a").attr("tabindex","0").bind("click",Q,J);
jQuery(S).find("a").bind("focus",Q,function(T){H(this).css("backgroundColor","#e7f4f9").css("border","1px solid #d8f0fa")
});
jQuery(S).find("a").bind("blur",Q,function(T){H(this).css("backgroundColor","").css("border","")
});
jQuery(S).find("a").bind("keydown",function(T){if(T.which==13){H(this).trigger("click");
return false
}})
}})
}function M(O){var Q=O.data.id;
var P=O.data.width;
jQuery(O.data.element).stop();
jQuery(O.data.element).addClass("over");
jQuery(O.data.element).animate({width:P},{duration:A.timeExpansionAnimation,easing:A.easing,queue:false});
return false
}function J(P){var O=P.data.id;
P.data.expand=true;
if(D!=null&&D.expand){jQuery(D.element).animate({width:A.previewWidth},{duration:A.timeCompressionAnimation,easing:A.easing,queue:false});
D.element.removeClass("selected");
D.expand=false
}P.data.element.addClass("selected");
D=P.data;
if(O=="root"){}A.callback.onclick.call(null,P)
}function G(O){return D
}function E(P){jQuery(P.data.element).removeClass("over");
if(D==null||(D!=null&&P.data.id!=D.id)){var O=P.data.id;
jQuery(P.data.element).stop();
jQuery(P.data.element).animate({width:A.previewWidth},{duration:A.timeCompressionAnimation,easing:A.easing,queue:false});
return false
}else{}}function K(){var O=H.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
return O
}function C(O){var P;
if(jQuery(O).is("img")){P=jQuery(O).attr("src")
}else{P=H(O).css("backgroundImage");
P.match(/^url\(["']?(.*\.png)["']?\)$/i);
P=RegExp.$1
}H(O).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='"+P+"')"})
}jQuery.fn.jBreadCrumb.defaults={maxFinalElementLength:40,minFinalElementLength:0,minimumCompressionElements:0,endElementsToLeaveOpen:1,beginingElementsToLeaveOpen:0,minElementsToCollapse:0,timeExpansionAnimation:800,timeCompressionAnimation:500,timeInitialCollapse:600,easing:"easeOutQuad",overlayClass:".chevronOverlay",previewWidth:8,callback:{onclick:function(O){H("#searchPathHidden").attr("value",O.target.name);
if(O.target.id=="RootBread"){H("a[id=RootBread]").addClass("selected");
H("a[class=lastBread]").css("color","black");
H("a[class=lastBread]").css("text-decoration","none");
H("a[id=bread]").css("color","black");
H("a[id=bread]").css("text-decoration","none")
}else{H("a[id=bread]").css("color","black");
H("a[id=bread]").css("text-decoration","none");
H("a[id=RootBread]").removeClass("selected");
H("a[name="+O.target.name+"]").css("color","#50A029");
H("a[name="+O.target.name+"]").css("text-decoration","underline")
}}}}
})(jQuery);