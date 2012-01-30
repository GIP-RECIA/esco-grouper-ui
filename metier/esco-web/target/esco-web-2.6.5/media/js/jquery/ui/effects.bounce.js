(function(B){B.effects.bounce=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var R=B.effects.setMode(W,A.options.mode||"effect");
var b=A.options.direction||"up";
var Y=A.options.distance||20;
var X=A.options.times||5;
var U=A.duration||250;
if(/show|hide/.test(R)){Q.push("opacity")
}B.effects.save(W,Q);
W.show();
B.effects.createWrapper(W);
var V=(b=="up"||b=="down")?"top":"left";
var Z=(b=="up"||b=="left")?"pos":"neg";
var Y=A.options.distance||(V=="top"?W.outerHeight({margin:true})/3:W.outerWidth({margin:true})/3);
if(R=="show"){W.css("opacity",0).css(V,Z=="pos"?-Y:Y)
}if(R=="hide"){Y=Y/(X*2)
}if(R!="hide"){X--
}if(R=="show"){var T={opacity:1};
T[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(T,U/2,A.options.easing);
Y=Y/2;
X--
}for(var S=0;
S<X;
S++){var a={},P={};
a[V]=(Z=="pos"?"-=":"+=")+Y;
P[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(a,U/2,A.options.easing).animate(P,U/2,A.options.easing);
Y=(R=="hide")?Y*2:Y/2
}if(R=="hide"){var T={opacity:0};
T[V]=(Z=="pos"?"-=":"+=")+Y;
W.animate(T,U/2,A.options.easing,function(){W.hide();
B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}})
}else{var a={},P={};
a[V]=(Z=="pos"?"-=":"+=")+Y;
P[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(a,U/2,A.options.easing).animate(P,U/2,A.options.easing,function(){B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}})
}W.queue("fx",function(){W.dequeue()
});
W.dequeue()
})
}
})(jQuery);