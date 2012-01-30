(function(A){A.effects.bounce=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var O=A.effects.setMode(J,B.options.mode||"effect");
var E=B.options.direction||"up";
var H=B.options.distance||20;
var I=B.options.times||5;
var L=B.duration||250;
if(/show|hide/.test(O)){C.push("opacity")
}A.effects.save(J,C);
J.show();
A.effects.createWrapper(J);
var K=(E=="up"||E=="down")?"top":"left";
var G=(E=="up"||E=="left")?"pos":"neg";
var H=B.options.distance||(K=="top"?J.outerHeight({margin:true})/3:J.outerWidth({margin:true})/3);
if(O=="show"){J.css("opacity",0).css(K,G=="pos"?-H:H)
}if(O=="hide"){H=H/(I*2)
}if(O!="hide"){I--
}if(O=="show"){var M={opacity:1};
M[K]=(G=="pos"?"+=":"-=")+H;
J.animate(M,L/2,B.options.easing);
H=H/2;
I--
}for(var N=0;
N<I;
N++){var F={},D={};
F[K]=(G=="pos"?"-=":"+=")+H;
D[K]=(G=="pos"?"+=":"-=")+H;
J.animate(F,L/2,B.options.easing).animate(D,L/2,B.options.easing);
H=(O=="hide")?H*2:H/2
}if(O=="hide"){var M={opacity:0};
M[K]=(G=="pos"?"-=":"+=")+H;
J.animate(M,L/2,B.options.easing,function(){J.hide();
A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}})
}else{var F={},D={};
F[K]=(G=="pos"?"-=":"+=")+H;
D[K]=(G=="pos"?"+=":"-=")+H;
J.animate(F,L/2,B.options.easing).animate(D,L/2,B.options.easing,function(){A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}})
}J.queue("fx",function(){J.dequeue()
});
J.dequeue()
})
}
})(jQuery);