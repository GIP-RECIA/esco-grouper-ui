(function(B){B.effects.shake=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var R=B.effects.setMode(W,A.options.mode||"effect");
var b=A.options.direction||"left";
var Y=A.options.distance||20;
var X=A.options.times||3;
var U=A.duration||A.options.duration||140;
B.effects.save(W,Q);
W.show();
B.effects.createWrapper(W);
var V=(b=="up"||b=="down")?"top":"left";
var Z=(b=="up"||b=="left")?"pos":"neg";
var T={},a={},P={};
T[V]=(Z=="pos"?"-=":"+=")+Y;
a[V]=(Z=="pos"?"+=":"-=")+Y*2;
P[V]=(Z=="pos"?"-=":"+=")+Y*2;
W.animate(T,U,A.options.easing);
for(var S=1;
S<X;
S++){W.animate(a,U,A.options.easing).animate(P,U,A.options.easing)
}W.animate(a,U,A.options.easing).animate(T,U/2,A.options.easing,function(){B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}});
W.queue("fx",function(){W.dequeue()
});
W.dequeue()
})
}
})(jQuery);