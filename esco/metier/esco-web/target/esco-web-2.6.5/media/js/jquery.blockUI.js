(function(X){if(/1\.(0|1|2)\.(0|1|2)/.test(X.fn.jquery)||/^1.1/.test(X.fn.jquery)){alert("blockUI requires jQuery v1.2.3 or later!  You are using v"+X.fn.jquery);
return 
}X.fn._fadeIn=X.fn.fadeIn;
var V=document.documentMode||0;
var a=X.browser.msie&&((X.browser.version<8&&!V)||V<8);
var Z=X.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!V;
X.blockUI=function(A){b(window,A)
};
X.unblockUI=function(A){W(window,A)
};
X.growlUI=function(D,A,E,C){var B=X('<div class="growlUI"></div>');
if(D){B.append("<h1>"+D+"</h1>")
}if(A){B.append("<h2>"+A+"</h2>")
}if(E==undefined){E=3000
}X.blockUI({message:B,fadeIn:700,fadeOut:1000,centerY:false,timeout:E,showOverlay:false,onUnblock:C,css:X.blockUI.defaults.growlCSS})
};
X.fn.block=function(A){return this.unblock({fadeOut:0}).each(function(){if(X.css(this,"position")=="static"){this.style.position="relative"
}if(X.browser.msie){this.style.zoom=1
}b(this,A)
})
};
X.fn.unblock=function(A){return this.each(function(){W(this,A)
})
};
X.blockUI.version=2.23;
X.blockUI.defaults={message:"<h1>Please wait...</h1>",css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:null,color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:10,fadeOut:10,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onUnblock:null,quirksmodeOffsetHack:4};
var O=null;
var Y=[];
function b(I,K){var h=(I==window);
var H=K&&K.message!==undefined?K.message:undefined;
K=X.extend({},X.blockUI.defaults,K||{});
K.overlayCSS=X.extend({},X.blockUI.defaults.overlayCSS,K.overlayCSS||{});
var A=X.extend({},X.blockUI.defaults.css,K.css||{});
H=H===undefined?K.message:H;
if(h&&O){W(window,{fadeOut:0})
}if(H&&typeof H!="string"&&(H.parentNode||H.jquery)){var F=H.jquery?H[0]:H;
var B={};
X(I).data("blockUI.history",B);
B.el=F;
B.parent=F.parentNode;
B.display=F.style.display;
B.position=F.style.position;
if(B.parent){B.parent.removeChild(F)
}}var g=K.baseZ;
var C=(X.browser.msie||K.forceIframe)?X('<iframe class="blockUI" style="z-index:'+(g++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+K.iframeSrc+'"></iframe>'):X('<div class="blockUI" style="display:none"></div>');
var D=X('<div class="blockUI blockOverlay" style="z-index:'+(g++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
var G=h?X('<div class="blockUI blockMsg blockPage" style="z-index:'+g+';display:none;position:fixed"></div>'):X('<div class="blockUI blockMsg blockElement" style="z-index:'+g+';display:none;position:absolute"></div>');
if(H){G.css(A)
}if(!K.applyPlatformOpacityRules||!(X.browser.mozilla&&/Linux/.test(navigator.platform))){D.css(K.overlayCSS)
}D.css("position",h?"fixed":"absolute");
if(X.browser.msie||K.forceIframe){C.css("opacity",0)
}X([C[0],D[0],G[0]]).appendTo(h?"body":I);
var M=a&&(!X.boxModel||X("object,embed",h?null:I).length>0);
if(Z||M){if(h&&K.allowBodyStretch&&X.boxModel){X("html,body").css("height","100%")
}if((Z||!X.boxModel)&&!h){var L=S(I,"borderTopWidth"),E=S(I,"borderLeftWidth");
var N=L?"(0 - "+L+")":0;
var J=E?"(0 - "+E+")":0
}X.each([C,D,G],function(l,c){var i=c[0].style;
i.position="absolute";
if(l<2){h?i.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+K.quirksmodeOffsetHack+') + "px"'):i.setExpression("height",'this.parentNode.offsetHeight + "px"');
h?i.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):i.setExpression("width",'this.parentNode.offsetWidth + "px"');
if(J){i.setExpression("left",J)
}if(N){i.setExpression("top",N)
}}else{if(K.centerY){if(h){i.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
}i.marginTop=0
}else{if(!K.centerY&&h){var e=(K.css&&K.css.top)?parseInt(K.css.top):0;
var d="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+e+') + "px"';
i.setExpression("top",d)
}}}})
}if(H){G.append(H);
if(H.jquery||H.nodeType){X(H).show()
}}if((X.browser.msie||K.forceIframe)&&K.showOverlay){C.show()
}if(K.fadeIn){if(K.showOverlay){D._fadeIn(K.fadeIn)
}if(H){G.fadeIn(K.fadeIn)
}}else{if(K.showOverlay){D.show()
}if(H){G.show()
}}T(1,I,K);
if(h){O=G[0];
Y=X(":input:enabled:visible",O);
if(K.focusInput){setTimeout(Q,20)
}}else{P(G[0],K.centerX,K.centerY)
}if(K.timeout){var f=setTimeout(function(){h?X.unblockUI(K):X(I).unblock(K)
},K.timeout);
X(I).data("blockUI.timeout",f)
}}function W(B,A){var C=B==window;
var D=X(B);
var G=D.data("blockUI.history");
var F=D.data("blockUI.timeout");
if(F){clearTimeout(F);
D.removeData("blockUI.timeout")
}A=X.extend({},X.blockUI.defaults,A||{});
T(0,B,A);
var E=C?X("body").children().filter(".blockUI"):X(".blockUI",B);
if(C){O=Y=null
}if(A.fadeOut){E.fadeOut(A.fadeOut);
setTimeout(function(){U(E,G,A,B)
},A.fadeOut)
}else{U(E,G,A,B)
}}function U(B,C,D,A){B.each(function(F,E){if(this.parentNode){this.parentNode.removeChild(this)
}});
if(C&&C.el){C.el.style.display=C.display;
C.el.style.position=C.position;
if(C.parent){if(X("#"+C.el.id).length==0){C.parent.appendChild(C.el)
}}X(C.el).removeData("blockUI.history")
}if(typeof D.onUnblock=="function"){D.onUnblock(A,D)
}}function T(D,F,E){var A=F==window,B=X(F);
if(!D&&(A&&!O||!A&&!B.data("blockUI.isBlocked"))){return 
}if(!A){B.data("blockUI.isBlocked",D)
}if(!E.bindEvents||(D&&!E.showOverlay)){return 
}var C="mousedown mouseup keydown keypress";
D?X(document).bind(C,E,R):X(document).unbind(C,R)
}function R(C){if(C.keyCode&&C.keyCode==9){if(O&&C.data.constrainTabKey){var D=Y;
var A=!C.shiftKey&&C.target==D[D.length-1];
var B=C.shiftKey&&C.target==D[0];
if(A||B){setTimeout(function(){Q(B)
},10);
return false
}}}if(X(C.target).parents("div.blockMsg").length>0){return true
}return X(C.target).parents().children().filter("div.blockUI").length==0
}function Q(B){if(!Y){return 
}var A=Y[B===true?Y.length-1:0];
if(A){try{A.focus()
}catch(A){}}}function P(A,E,F){var G=A.parentNode,B=A.style;
var D=((G.offsetWidth-A.offsetWidth)/2)-S(G,"borderLeftWidth");
var C=((G.offsetHeight-A.offsetHeight)/2)-S(G,"borderTopWidth");
if(E){B.left=D>0?(D+"px"):"0"
}if(F){B.top=C>0?(C+"px"):"0"
}}function S(B,A){return parseInt(X.css(B,A))||0
}})(jQuery);