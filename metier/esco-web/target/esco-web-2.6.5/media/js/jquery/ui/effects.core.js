jQuery.effects||(function(J){J.effects={version:"1.7.2",save:function(C,B){for(var A=0;
A<B.length;
A++){if(B[A]!==null){C.data("ec.storage."+B[A],C[0].style[B[A]])
}}},restore:function(C,B){for(var A=0;
A<B.length;
A++){if(B[A]!==null){C.css(B[A],C.data("ec.storage."+B[A]))
}}},setMode:function(B,A){if(A=="toggle"){A=B.is(":hidden")?"show":"hide"
}return A
},getBaseline:function(A,D){var C,B;
switch(A[0]){case"top":C=0;
break;
case"middle":C=0.5;
break;
case"bottom":C=1;
break;
default:C=A[0]/D.height
}switch(A[1]){case"left":B=0;
break;
case"center":B=0.5;
break;
case"right":B=1;
break;
default:B=A[1]/D.width
}return{x:B,y:C}
},createWrapper:function(C){if(C.parent().is(".ui-effects-wrapper")){return C.parent()
}var B={width:C.outerWidth(true),height:C.outerHeight(true),"float":C.css("float")};
C.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
var D=C.parent();
if(C.css("position")=="static"){D.css({position:"relative"});
C.css({position:"relative"})
}else{var E=C.css("top");
if(isNaN(parseInt(E,10))){E="auto"
}var A=C.css("left");
if(isNaN(parseInt(A,10))){A="auto"
}D.css({position:C.css("position"),top:E,left:A,zIndex:C.css("z-index")}).show();
C.css({position:"relative",top:0,left:0})
}D.css(B);
return D
},removeWrapper:function(A){if(A.parent().is(".ui-effects-wrapper")){return A.parent().replaceWith(A)
}return A
},setTransition:function(A,C,B,D){D=D||{};
J.each(C,function(E,L){unit=A.cssUnit(L);
if(unit[0]>0){D[L]=unit[0]*B+unit[1]
}});
return D
},animateClass:function(B,A,D,E){var L=(typeof D=="function"?D:(E?E:null));
var C=(typeof D=="string"?D:null);
return this.each(function(){var S={};
var U=J(this);
var T=U.attr("style")||"";
if(typeof T=="object"){T=T.cssText
}if(B.toggle){U.hasClass(B.toggle)?B.remove=B.toggle:B.add=B.toggle
}var V=J.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(B.add){U.addClass(B.add)
}if(B.remove){U.removeClass(B.remove)
}var K=J.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(B.add){U.removeClass(B.add)
}if(B.remove){U.addClass(B.remove)
}for(var R in K){if(typeof K[R]!="function"&&K[R]&&R.indexOf("Moz")==-1&&R.indexOf("length")==-1&&K[R]!=V[R]&&(R.match(/color/i)||(!R.match(/color/i)&&!isNaN(parseInt(K[R],10))))&&(V.position!="static"||(V.position=="static"&&!R.match(/left|top|bottom|right/)))){S[R]=K[R]
}}U.animate(S,A,C,function(){if(typeof J(this).attr("style")=="object"){J(this).attr("style")["cssText"]="";
J(this).attr("style")["cssText"]=T
}else{J(this).attr("style",T)
}if(B.add){J(this).addClass(B.add)
}if(B.remove){J(this).removeClass(B.remove)
}if(L){L.apply(this,arguments)
}})
})
}};
function F(B,C){var E=B[1]&&B[1].constructor==Object?B[1]:{};
if(C){E.mode=C
}var A=B[1]&&B[1].constructor!=Object?B[1]:(E.duration?E.duration:B[2]);
A=J.fx.off?0:typeof A==="number"?A:J.fx.speeds[A]||J.fx.speeds._default;
var D=E.callback||(J.isFunction(B[1])&&B[1])||(J.isFunction(B[2])&&B[2])||(J.isFunction(B[3])&&B[3]);
return[B[0],E,A,D]
}J.fn.extend({_show:J.fn.show,_hide:J.fn.hide,__toggle:J.fn.toggle,_addClass:J.fn.addClass,_removeClass:J.fn.removeClass,_toggleClass:J.fn.toggleClass,effect:function(A,B,D,C){return J.effects[A]?J.effects[A].call(this,{method:A,options:B||{},duration:D,callback:C}):null
},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"show"))
}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"hide"))
}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(J.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"toggle"))
}},addClass:function(A,B,C,D){return B?J.effects.animateClass.apply(this,[{add:A},B,C,D]):this._addClass(A)
},removeClass:function(A,B,C,D){return B?J.effects.animateClass.apply(this,[{remove:A},B,C,D]):this._removeClass(A)
},toggleClass:function(A,B,C,D){return((typeof B!=="boolean")&&B)?J.effects.animateClass.apply(this,[{toggle:A},B,C,D]):this._toggleClass(A,B)
},morph:function(C,A,B,D,E){return J.effects.animateClass.apply(this,[{add:A,remove:C},B,D,E])
},switchClass:function(){return this.morph.apply(this,arguments)
},cssUnit:function(A){var C=this.css(A),B=[];
J.each(["em","px","%","pt"],function(E,D){if(C.indexOf(D)>0){B=[parseFloat(C),D]
}});
return B
}});
J.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(A,B){J.fx.step[B]=function(C){if(C.state==0){C.start=I(C.elem,B);
C.end=G(C.end)
}C.elem.style[B]="rgb("+[Math.max(Math.min(parseInt((C.pos*(C.end[0]-C.start[0]))+C.start[0],10),255),0),Math.max(Math.min(parseInt((C.pos*(C.end[1]-C.start[1]))+C.start[1],10),255),0),Math.max(Math.min(parseInt((C.pos*(C.end[2]-C.start[2]))+C.start[2],10),255),0)].join(",")+")"
}
});
function G(A){var B;
if(A&&A.constructor==Array&&A.length==3){return A
}if(B=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(A)){return[parseInt(B[1],10),parseInt(B[2],10),parseInt(B[3],10)]
}if(B=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(A)){return[parseFloat(B[1])*2.55,parseFloat(B[2])*2.55,parseFloat(B[3])*2.55]
}if(B=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(A)){return[parseInt(B[1],16),parseInt(B[2],16),parseInt(B[3],16)]
}if(B=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(A)){return[parseInt(B[1]+B[1],16),parseInt(B[2]+B[2],16),parseInt(B[3]+B[3],16)]
}if(B=/rgba\(0, 0, 0, 0\)/.exec(A)){return H.transparent
}return H[J.trim(A).toLowerCase()]
}function I(B,A){var C;
do{C=J.curCSS(B,A);
if(C!=""&&C!="transparent"||J.nodeName(B,"body")){break
}A="backgroundColor"
}while(B=B.parentNode);
return G(C)
}var H={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
J.easing.jswing=J.easing.swing;
J.extend(J.easing,{def:"easeOutQuad",swing:function(B,A,C,D,E){return J.easing[J.easing.def](B,A,C,D,E)
},easeInQuad:function(B,A,C,D,E){return D*(A/=E)*A+C
},easeOutQuad:function(B,A,C,D,E){return -D*(A/=E)*(A-2)+C
},easeInOutQuad:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A+C
}return -D/2*((--A)*(A-2)-1)+C
},easeInCubic:function(B,A,C,D,E){return D*(A/=E)*A*A+C
},easeOutCubic:function(B,A,C,D,E){return D*((A=A/E-1)*A*A+1)+C
},easeInOutCubic:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A+C
}return D/2*((A-=2)*A*A+2)+C
},easeInQuart:function(B,A,C,D,E){return D*(A/=E)*A*A*A+C
},easeOutQuart:function(B,A,C,D,E){return -D*((A=A/E-1)*A*A*A-1)+C
},easeInOutQuart:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A*A+C
}return -D/2*((A-=2)*A*A*A-2)+C
},easeInQuint:function(B,A,C,D,E){return D*(A/=E)*A*A*A*A+C
},easeOutQuint:function(B,A,C,D,E){return D*((A=A/E-1)*A*A*A*A+1)+C
},easeInOutQuint:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A*A*A+C
}return D/2*((A-=2)*A*A*A*A+2)+C
},easeInSine:function(B,A,C,D,E){return -D*Math.cos(A/E*(Math.PI/2))+D+C
},easeOutSine:function(B,A,C,D,E){return D*Math.sin(A/E*(Math.PI/2))+C
},easeInOutSine:function(B,A,C,D,E){return -D/2*(Math.cos(Math.PI*A/E)-1)+C
},easeInExpo:function(B,A,C,D,E){return(A==0)?C:D*Math.pow(2,10*(A/E-1))+C
},easeOutExpo:function(B,A,C,D,E){return(A==E)?C+D:D*(-Math.pow(2,-10*A/E)+1)+C
},easeInOutExpo:function(B,A,C,D,E){if(A==0){return C
}if(A==E){return C+D
}if((A/=E/2)<1){return D/2*Math.pow(2,10*(A-1))+C
}return D/2*(-Math.pow(2,-10*--A)+2)+C
},easeInCirc:function(B,A,C,D,E){return -D*(Math.sqrt(1-(A/=E)*A)-1)+C
},easeOutCirc:function(B,A,C,D,E){return D*Math.sqrt(1-(A=A/E-1)*A)+C
},easeInOutCirc:function(B,A,C,D,E){if((A/=E/2)<1){return -D/2*(Math.sqrt(1-A*A)-1)+C
}return D/2*(Math.sqrt(1-(A-=2)*A)+1)+C
},easeInElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D)==1){return C+E
}if(!N){N=D*0.3
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}return -(B*Math.pow(2,10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N))+C
},easeOutElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D)==1){return C+E
}if(!N){N=D*0.3
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}return B*Math.pow(2,-10*A)*Math.sin((A*D-P)*(2*Math.PI)/N)+E+C
},easeInOutElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D/2)==2){return C+E
}if(!N){N=D*(0.3*1.5)
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}if(A<1){return -0.5*(B*Math.pow(2,10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N))+C
}return B*Math.pow(2,-10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N)*0.5+E+C
},easeInBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}return E*(B/=L)*B*((A+1)*B-A)+D
},easeOutBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}return E*((B=B/L-1)*B*((A+1)*B+A)+1)+D
},easeInOutBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}if((B/=L/2)<1){return E/2*(B*B*(((A*=(1.525))+1)*B-A))+D
}return E/2*((B-=2)*B*(((A*=(1.525))+1)*B+A)+2)+D
},easeInBounce:function(B,A,C,D,E){return D-J.easing.easeOutBounce(B,E-A,0,D,E)+C
},easeOutBounce:function(B,A,C,D,E){if((A/=E)<(1/2.75)){return D*(7.5625*A*A)+C
}else{if(A<(2/2.75)){return D*(7.5625*(A-=(1.5/2.75))*A+0.75)+C
}else{if(A<(2.5/2.75)){return D*(7.5625*(A-=(2.25/2.75))*A+0.9375)+C
}else{return D*(7.5625*(A-=(2.625/2.75))*A+0.984375)+C
}}}},easeInOutBounce:function(B,A,C,D,E){if(A<E/2){return J.easing.easeInBounce(B,A*2,0,D,E)*0.5+C
}return J.easing.easeOutBounce(B,A*2-E,0,D,E)*0.5+D*0.5+C
}})
})(jQuery);