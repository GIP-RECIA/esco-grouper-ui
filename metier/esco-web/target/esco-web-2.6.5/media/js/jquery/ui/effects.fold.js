(function(B){B.effects.fold=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var T=B.effects.setMode(W,A.options.mode||"hide");
var Z=A.options.size||15;
var a=!(!A.options.horizFirst);
var U=A.duration?A.duration/2:B.fx.speeds._default/2;
B.effects.save(W,Q);
W.show();
var X=B.effects.createWrapper(W).css({overflow:"hidden"});
var S=((T=="show")!=a);
var V=S?["width","height"]:["height","width"];
var Y=S?[X.width(),X.height()]:[X.height(),X.width()];
var R=/([0-9]+)%/.exec(Z);
if(R){Z=parseInt(R[1],10)/100*Y[T=="hide"?0:1]
}if(T=="show"){X.css(a?{height:0,width:Z}:{height:Z,width:0})
}var b={},P={};
b[V[0]]=T=="show"?Y[0]:Z;
P[V[1]]=T=="show"?Y[1]:0;
X.animate(b,U,A.options.easing).animate(P,U,A.options.easing,function(){if(T=="hide"){W.hide()
}B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(W[0],arguments)
}W.dequeue()
})
})
}
})(jQuery);