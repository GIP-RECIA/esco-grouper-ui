(function(A){A.effects.shake=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var O=A.effects.setMode(J,B.options.mode||"effect");
var E=B.options.direction||"left";
var H=B.options.distance||20;
var I=B.options.times||3;
var L=B.duration||B.options.duration||140;
A.effects.save(J,C);
J.show();
A.effects.createWrapper(J);
var K=(E=="up"||E=="down")?"top":"left";
var G=(E=="up"||E=="left")?"pos":"neg";
var M={},F={},D={};
M[K]=(G=="pos"?"-=":"+=")+H;
F[K]=(G=="pos"?"+=":"-=")+H*2;
D[K]=(G=="pos"?"-=":"+=")+H*2;
J.animate(M,L,B.options.easing);
for(var N=1;
N<I;
N++){J.animate(F,L,B.options.easing).animate(D,L,B.options.easing)
}J.animate(F,L,B.options.easing).animate(M,L/2,B.options.easing,function(){A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}});
J.queue("fx",function(){J.dequeue()
});
J.dequeue()
})
}
})(jQuery);