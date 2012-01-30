jQuery.effects||(function(B){B.effects={version:"1.7.2",save:function(F,G){for(var H=0;
H<G.length;
H++){if(G[H]!==null){F.data("ec.storage."+G[H],F[0].style[G[H]])
}}},restore:function(F,G){for(var H=0;
H<G.length;
H++){if(G[H]!==null){F.css(G[H],F.data("ec.storage."+G[H]))
}}},setMode:function(F,G){if(G=="toggle"){G=F.is(":hidden")?"show":"hide"
}return G
},getBaseline:function(I,F){var G,H;
switch(I[0]){case"top":G=0;
break;
case"middle":G=0.5;
break;
case"bottom":G=1;
break;
default:G=I[0]/F.height
}switch(I[1]){case"left":H=0;
break;
case"center":H=0.5;
break;
case"right":H=1;
break;
default:H=I[1]/F.width
}return{x:H,y:G}
},createWrapper:function(H){if(H.parent().is(".ui-effects-wrapper")){return H.parent()
}var I={width:H.outerWidth(true),height:H.outerHeight(true),"float":H.css("float")};
H.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
var G=H.parent();
if(H.css("position")=="static"){G.css({position:"relative"});
H.css({position:"relative"})
}else{var F=H.css("top");
if(isNaN(parseInt(F,10))){F="auto"
}var J=H.css("left");
if(isNaN(parseInt(J,10))){J="auto"
}G.css({position:H.css("position"),top:F,left:J,zIndex:H.css("z-index")}).show();
H.css({position:"relative",top:0,left:0})
}G.css(I);
return G
},removeWrapper:function(F){if(F.parent().is(".ui-effects-wrapper")){return F.parent().replaceWith(F)
}return F
},setTransition:function(I,G,H,F){F=F||{};
B.each(G,function(K,J){unit=I.cssUnit(J);
if(unit[0]>0){F[J]=unit[0]*H+unit[1]
}});
return F
},animateClass:function(J,K,H,G){var F=(typeof H=="function"?H:(G?G:null));
var I=(typeof H=="string"?H:null);
return this.each(function(){var P={};
var N=B(this);
var O=N.attr("style")||"";
if(typeof O=="object"){O=O.cssText
}if(J.toggle){N.hasClass(J.toggle)?J.remove=J.toggle:J.add=J.toggle
}var M=B.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(J.add){N.addClass(J.add)
}if(J.remove){N.removeClass(J.remove)
}var L=B.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(J.add){N.removeClass(J.add)
}if(J.remove){N.addClass(J.remove)
}for(var Q in L){if(typeof L[Q]!="function"&&L[Q]&&Q.indexOf("Moz")==-1&&Q.indexOf("length")==-1&&L[Q]!=M[Q]&&(Q.match(/color/i)||(!Q.match(/color/i)&&!isNaN(parseInt(L[Q],10))))&&(M.position!="static"||(M.position=="static"&&!Q.match(/left|top|bottom|right/)))){P[Q]=L[Q]
}}N.animate(P,K,I,function(){if(typeof B(this).attr("style")=="object"){B(this).attr("style")["cssText"]="";
B(this).attr("style")["cssText"]=O
}else{B(this).attr("style",O)
}if(J.add){B(this).addClass(J.add)
}if(J.remove){B(this).removeClass(J.remove)
}if(F){F.apply(this,arguments)
}})
})
}};
function A(I,H){var F=I[1]&&I[1].constructor==Object?I[1]:{};
if(H){F.mode=H
}var J=I[1]&&I[1].constructor!=Object?I[1]:(F.duration?F.duration:I[2]);
J=B.fx.off?0:typeof J==="number"?J:B.fx.speeds[J]||B.fx.speeds._default;
var G=F.callback||(B.isFunction(I[1])&&I[1])||(B.isFunction(I[2])&&I[2])||(B.isFunction(I[3])&&I[3]);
return[I[0],F,J,G]
}B.fn.extend({_show:B.fn.show,_hide:B.fn.hide,__toggle:B.fn.toggle,_addClass:B.fn.addClass,_removeClass:B.fn.removeClass,_toggleClass:B.fn.toggleClass,effect:function(I,H,F,G){return B.effects[I]?B.effects[I].call(this,{method:I,options:H||{},duration:F,callback:G}):null
},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"show"))
}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"hide"))
}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(B.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"toggle"))
}},addClass:function(I,H,G,F){return H?B.effects.animateClass.apply(this,[{add:I},H,G,F]):this._addClass(I)
},removeClass:function(I,H,G,F){return H?B.effects.animateClass.apply(this,[{remove:I},H,G,F]):this._removeClass(I)
},toggleClass:function(I,H,G,F){return((typeof H!=="boolean")&&H)?B.effects.animateClass.apply(this,[{toggle:I},H,G,F]):this._toggleClass(I,H)
},morph:function(H,J,I,G,F){return B.effects.animateClass.apply(this,[{add:J,remove:H},I,G,F])
},switchClass:function(){return this.morph.apply(this,arguments)
},cssUnit:function(H){var F=this.css(H),G=[];
B.each(["em","px","%","pt"],function(I,J){if(F.indexOf(J)>0){G=[parseFloat(F),J]
}});
return G
}});
B.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(G,F){B.fx.step[F]=function(H){if(H.state==0){H.start=C(H.elem,F);
H.end=E(H.end)
}H.elem.style[F]="rgb("+[Math.max(Math.min(parseInt((H.pos*(H.end[0]-H.start[0]))+H.start[0],10),255),0),Math.max(Math.min(parseInt((H.pos*(H.end[1]-H.start[1]))+H.start[1],10),255),0),Math.max(Math.min(parseInt((H.pos*(H.end[2]-H.start[2]))+H.start[2],10),255),0)].join(",")+")"
}
});
function E(G){var F;
if(G&&G.constructor==Array&&G.length==3){return G
}if(F=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(G)){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)]
}if(F=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(G)){return[parseFloat(F[1])*2.55,parseFloat(F[2])*2.55,parseFloat(F[3])*2.55]
}if(F=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(G)){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)]
}if(F=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(G)){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)]
}if(F=/rgba\(0, 0, 0, 0\)/.exec(G)){return D.transparent
}return D[B.trim(G).toLowerCase()]
}function C(G,H){var F;
do{F=B.curCSS(G,H);
if(F!=""&&F!="transparent"||B.nodeName(G,"body")){break
}H="backgroundColor"
}while(G=G.parentNode);
return E(F)
}var D={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
B.easing.jswing=B.easing.swing;
B.extend(B.easing,{def:"easeOutQuad",swing:function(I,J,H,G,F){return B.easing[B.easing.def](I,J,H,G,F)
},easeInQuad:function(I,J,H,G,F){return G*(J/=F)*J+H
},easeOutQuad:function(I,J,H,G,F){return -G*(J/=F)*(J-2)+H
},easeInOutQuad:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J+H
}return -G/2*((--J)*(J-2)-1)+H
},easeInCubic:function(I,J,H,G,F){return G*(J/=F)*J*J+H
},easeOutCubic:function(I,J,H,G,F){return G*((J=J/F-1)*J*J+1)+H
},easeInOutCubic:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J+H
}return G/2*((J-=2)*J*J+2)+H
},easeInQuart:function(I,J,H,G,F){return G*(J/=F)*J*J*J+H
},easeOutQuart:function(I,J,H,G,F){return -G*((J=J/F-1)*J*J*J-1)+H
},easeInOutQuart:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J*J+H
}return -G/2*((J-=2)*J*J*J-2)+H
},easeInQuint:function(I,J,H,G,F){return G*(J/=F)*J*J*J*J+H
},easeOutQuint:function(I,J,H,G,F){return G*((J=J/F-1)*J*J*J*J+1)+H
},easeInOutQuint:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J*J*J+H
}return G/2*((J-=2)*J*J*J*J+2)+H
},easeInSine:function(I,J,H,G,F){return -G*Math.cos(J/F*(Math.PI/2))+G+H
},easeOutSine:function(I,J,H,G,F){return G*Math.sin(J/F*(Math.PI/2))+H
},easeInOutSine:function(I,J,H,G,F){return -G/2*(Math.cos(Math.PI*J/F)-1)+H
},easeInExpo:function(I,J,H,G,F){return(J==0)?H:G*Math.pow(2,10*(J/F-1))+H
},easeOutExpo:function(I,J,H,G,F){return(J==F)?H+G:G*(-Math.pow(2,-10*J/F)+1)+H
},easeInOutExpo:function(I,J,H,G,F){if(J==0){return H
}if(J==F){return H+G
}if((J/=F/2)<1){return G/2*Math.pow(2,10*(J-1))+H
}return G/2*(-Math.pow(2,-10*--J)+2)+H
},easeInCirc:function(I,J,H,G,F){return -G*(Math.sqrt(1-(J/=F)*J)-1)+H
},easeOutCirc:function(I,J,H,G,F){return G*Math.sqrt(1-(J=J/F-1)*J)+H
},easeInOutCirc:function(I,J,H,G,F){if((J/=F/2)<1){return -G/2*(Math.sqrt(1-J*J)-1)+H
}return G/2*(Math.sqrt(1-(J-=2)*J)+1)+H
},easeInElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I)==1){return J+H
}if(!G){G=I*0.3
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}return -(K*Math.pow(2,10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G))+J
},easeOutElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I)==1){return J+H
}if(!G){G=I*0.3
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}return K*Math.pow(2,-10*L)*Math.sin((L*I-M)*(2*Math.PI)/G)+H+J
},easeInOutElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I/2)==2){return J+H
}if(!G){G=I*(0.3*1.5)
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}if(L<1){return -0.5*(K*Math.pow(2,10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G))+J
}return K*Math.pow(2,-10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G)*0.5+H+J
},easeInBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}return G*(J/=F)*J*((K+1)*J-K)+H
},easeOutBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}return G*((J=J/F-1)*J*((K+1)*J+K)+1)+H
},easeInOutBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}if((J/=F/2)<1){return G/2*(J*J*(((K*=(1.525))+1)*J-K))+H
}return G/2*((J-=2)*J*(((K*=(1.525))+1)*J+K)+2)+H
},easeInBounce:function(I,J,H,G,F){return G-B.easing.easeOutBounce(I,F-J,0,G,F)+H
},easeOutBounce:function(I,J,H,G,F){if((J/=F)<(1/2.75)){return G*(7.5625*J*J)+H
}else{if(J<(2/2.75)){return G*(7.5625*(J-=(1.5/2.75))*J+0.75)+H
}else{if(J<(2.5/2.75)){return G*(7.5625*(J-=(2.25/2.75))*J+0.9375)+H
}else{return G*(7.5625*(J-=(2.625/2.75))*J+0.984375)+H
}}}},easeInOutBounce:function(I,J,H,G,F){if(J<F/2){return B.easing.easeInBounce(I,J*2,0,G,F)*0.5+H
}return B.easing.easeOutBounce(I,J*2-F,0,G,F)*0.5+G*0.5+H
}})
})(jQuery);