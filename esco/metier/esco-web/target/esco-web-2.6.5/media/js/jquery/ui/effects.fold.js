(function(A){A.effects.fold=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var M=A.effects.setMode(J,B.options.mode||"hide");
var G=B.options.size||15;
var F=!(!B.options.horizFirst);
var L=B.duration?B.duration/2:A.fx.speeds._default/2;
A.effects.save(J,C);
J.show();
var I=A.effects.createWrapper(J).css({overflow:"hidden"});
var N=((M=="show")!=F);
var K=N?["width","height"]:["height","width"];
var H=N?[I.width(),I.height()]:[I.height(),I.width()];
var O=/([0-9]+)%/.exec(G);
if(O){G=parseInt(O[1],10)/100*H[M=="hide"?0:1]
}if(M=="show"){I.css(F?{height:0,width:G}:{height:G,width:0})
}var E={},D={};
E[K[0]]=M=="show"?H[0]:G;
D[K[1]]=M=="show"?H[1]:0;
I.animate(E,L,B.options.easing).animate(D,L,B.options.easing,function(){if(M=="hide"){J.hide()
}A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(J[0],arguments)
}J.dequeue()
})
})
}
})(jQuery);