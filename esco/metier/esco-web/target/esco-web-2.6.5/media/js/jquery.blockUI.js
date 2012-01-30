(function(I){if(/1\.(0|1|2)\.(0|1|2)/.test(I.fn.jquery)||/^1.1/.test(I.fn.jquery)){alert("blockUI requires jQuery v1.2.3 or later!  You are using v"+I.fn.jquery);
return 
}I.fn._fadeIn=I.fn.fadeIn;
var K=document.documentMode||0;
var F=I.browser.msie&&((I.browser.version<8&&!K)||K<8);
var G=I.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!K;
I.blockUI=function(O){E(window,O)
};
I.unblockUI=function(O){J(window,O)
};
I.growlUI=function(P,S,O,Q){var R=I('<div class="growlUI"></div>');
if(P){R.append("<h1>"+P+"</h1>")
}if(S){R.append("<h2>"+S+"</h2>")
}if(O==undefined){O=3000
}I.blockUI({message:R,fadeIn:700,fadeOut:1000,centerY:false,timeout:O,showOverlay:false,onUnblock:Q,css:I.blockUI.defaults.growlCSS})
};
I.fn.block=function(O){return this.unblock({fadeOut:0}).each(function(){if(I.css(this,"position")=="static"){this.style.position="relative"
}if(I.browser.msie){this.style.zoom=1
}E(this,O)
})
};
I.fn.unblock=function(O){return this.each(function(){J(this,O)
})
};
I.blockUI.version=2.23;
I.blockUI.defaults={message:"<h1>Please wait...</h1>",css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:null,color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:10,fadeOut:10,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onUnblock:null,quirksmodeOffsetHack:4};
var D=null;
var H=[];
function E(R,P){var a=(R==window);
var S=P&&P.message!==undefined?P.message:undefined;
P=I.extend({},I.blockUI.defaults,P||{});
P.overlayCSS=I.extend({},I.blockUI.defaults.overlayCSS,P.overlayCSS||{});
var Z=I.extend({},I.blockUI.defaults.css,P.css||{});
S=S===undefined?P.message:S;
if(a&&D){J(window,{fadeOut:0})
}if(S&&typeof S!="string"&&(S.parentNode||S.jquery)){var U=S.jquery?S[0]:S;
var Y={};
I(R).data("blockUI.history",Y);
Y.el=U;
Y.parent=U.parentNode;
Y.display=U.style.display;
Y.position=U.style.position;
if(Y.parent){Y.parent.removeChild(U)
}}var b=P.baseZ;
var X=(I.browser.msie||P.forceIframe)?I('<iframe class="blockUI" style="z-index:'+(b++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+P.iframeSrc+'"></iframe>'):I('<div class="blockUI" style="display:none"></div>');
var W=I('<div class="blockUI blockOverlay" style="z-index:'+(b++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
var T=a?I('<div class="blockUI blockMsg blockPage" style="z-index:'+b+';display:none;position:fixed"></div>'):I('<div class="blockUI blockMsg blockElement" style="z-index:'+b+';display:none;position:absolute"></div>');
if(S){T.css(Z)
}if(!P.applyPlatformOpacityRules||!(I.browser.mozilla&&/Linux/.test(navigator.platform))){W.css(P.overlayCSS)
}W.css("position",a?"fixed":"absolute");
if(I.browser.msie||P.forceIframe){X.css("opacity",0)
}I([X[0],W[0],T[0]]).appendTo(a?"body":R);
var e=F&&(!I.boxModel||I("object,embed",a?null:R).length>0);
if(G||e){if(a&&P.allowBodyStretch&&I.boxModel){I("html,body").css("height","100%")
}if((G||!I.boxModel)&&!a){var O=N(R,"borderTopWidth"),V=N(R,"borderLeftWidth");
var d=O?"(0 - "+O+")":0;
var Q=V?"(0 - "+V+")":0
}I.each([X,W,T],function(f,k){var g=k[0].style;
g.position="absolute";
if(f<2){a?g.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+P.quirksmodeOffsetHack+') + "px"'):g.setExpression("height",'this.parentNode.offsetHeight + "px"');
a?g.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):g.setExpression("width",'this.parentNode.offsetWidth + "px"');
if(Q){g.setExpression("left",Q)
}if(d){g.setExpression("top",d)
}}else{if(P.centerY){if(a){g.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
}g.marginTop=0
}else{if(!P.centerY&&a){var h=(P.css&&P.css.top)?parseInt(P.css.top):0;
var j="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+h+') + "px"';
g.setExpression("top",j)
}}}})
}if(S){T.append(S);
if(S.jquery||S.nodeType){I(S).show()
}}if((I.browser.msie||P.forceIframe)&&P.showOverlay){X.show()
}if(P.fadeIn){if(P.showOverlay){W._fadeIn(P.fadeIn)
}if(S){T.fadeIn(P.fadeIn)
}}else{if(P.showOverlay){W.show()
}if(S){T.show()
}}M(1,R,P);
if(a){D=T[0];
H=I(":input:enabled:visible",D);
if(P.focusInput){setTimeout(B,20)
}}else{C(T[0],P.centerX,P.centerY)
}if(P.timeout){var c=setTimeout(function(){a?I.unblockUI(P):I(R).unblock(P)
},P.timeout);
I(R).data("blockUI.timeout",c)
}}function J(T,U){var S=T==window;
var R=I(T);
var O=R.data("blockUI.history");
var P=R.data("blockUI.timeout");
if(P){clearTimeout(P);
R.removeData("blockUI.timeout")
}U=I.extend({},I.blockUI.defaults,U||{});
M(0,T,U);
var Q=S?I("body").children().filter(".blockUI"):I(".blockUI",T);
if(S){D=H=null
}if(U.fadeOut){Q.fadeOut(U.fadeOut);
setTimeout(function(){L(Q,O,U,T)
},U.fadeOut)
}else{L(Q,O,U,T)
}}function L(Q,P,O,R){Q.each(function(S,T){if(this.parentNode){this.parentNode.removeChild(this)
}});
if(P&&P.el){P.el.style.display=P.display;
P.el.style.position=P.position;
if(P.parent){if(I("#"+P.el.id).length==0){P.parent.appendChild(P.el)
}}I(P.el).removeData("blockUI.history")
}if(typeof O.onUnblock=="function"){O.onUnblock(R,O)
}}function M(Q,O,P){var T=O==window,S=I(O);
if(!Q&&(T&&!D||!T&&!S.data("blockUI.isBlocked"))){return 
}if(!T){S.data("blockUI.isBlocked",Q)
}if(!P.bindEvents||(Q&&!P.showOverlay)){return 
}var R="mousedown mouseup keydown keypress";
Q?I(document).bind(R,P,A):I(document).unbind(R,A)
}function A(P){if(P.keyCode&&P.keyCode==9){if(D&&P.data.constrainTabKey){var O=H;
var R=!P.shiftKey&&P.target==O[O.length-1];
var Q=P.shiftKey&&P.target==O[0];
if(R||Q){setTimeout(function(){B(Q)
},10);
return false
}}}if(I(P.target).parents("div.blockMsg").length>0){return true
}return I(P.target).parents().children().filter("div.blockUI").length==0
}function B(O){if(!H){return 
}var P=H[O===true?H.length-1:0];
if(P){try{P.focus()
}catch(P){}}}function C(U,Q,P){var O=U.parentNode,T=U.style;
var R=((O.offsetWidth-U.offsetWidth)/2)-N(O,"borderLeftWidth");
var S=((O.offsetHeight-U.offsetHeight)/2)-N(O,"borderTopWidth");
if(Q){T.left=R>0?(R+"px"):"0"
}if(P){T.top=S>0?(S+"px"):"0"
}}function N(O,P){return parseInt(I.css(O,P))||0
}})(jQuery);